---
layout: post
title: LLVM is a graph database - querying LLVM IR with OpenCypher
---

LLVM IR is a graph representation of a program, can we use existing graph DB
languages to build better compiler infrastructure?

---


While LLVM IR is a graph representation of a program and all optimization passes
are effective transformations on the graph, LLVM passes are written in C++,
often obscuring the intent of the transform. This also adds complexity for
developers who want to add a new custom pass to their compilation pipeline for
some project specific optimization/rewriting. For example, look at [this blog
post](https://eli.thegreenplace.net/2013/09/16/analyzing-function-cfgs-with-llvm)
which highlights that viewing the CFG (control flow graph) of some program is a
frequently asked question on StackOverflow, and proceeds to show some code to
traverse the CFG which isn't the most intuitive for users who either aren't
familiar with C++, or aren't familiar with LLVM's APIs.

I've long held that writing optimization passes should be best done by building
off of work that's been done in the graph database query space. To that end,
I spent an hour or so combining two projects I've worked on in the past - a
modular implementation of OpenCypher called
[spycy](https://github.com/aneeshdurg/spycy), and
[pyllvmpass](https://github.com/aneeshdurg/pyllvmpass) for allowing python
modules to be used as LLVM optimization passes - to produce a proof-of-concept
implementation that allows LLVM IR to be queried with
[OpenCypher](https://opencypher.org/). One notable feature of my implementation
is that it operates directly on a LLVM Module instance in an optimization pass -
this doesn't matter much since my demo doesn't support modification, but it
seems to me that extending it to support modification wouldn't be too much
effort.

Here is the full code for my demo:

```python
import sys
from dataclasses import dataclass
from typing import Any, List, Mapping, Tuple
from enum import Enum

from spycy.graph import Graph
from spycy.spycy import CypherExecutorBase

import llvmcpy.llvm as cllvm


class LLVMType(Enum):
    Function = "Function"
    BasicBlock = "BasicBlock"
    Instruction = "Instruction"


@dataclass
class LLVMNode:
    obj: Any
    obj_type: LLVMType

    def __hash__(self):
        return hash(self.obj)


NodeType = LLVMNode
EdgeType = Tuple[LLVMNode, LLVMNode]


@dataclass
class LLVMGraphNodes(Mapping[NodeType, Any]):
    module: cllvm.Module

    def make_function_node(self, fn):
        return LLVMNode(fn, LLVMType.Function)

    def make_basic_block_node(self, bb):
        return LLVMNode(bb, LLVMType.BasicBlock)

    def make_inst_node(self, inst):
        return LLVMNode(inst, LLVMType.Instruction)

    def __iter__(self):
        def iterator():
            for fn in self.module.iter_functions():
                yield self.make_function_node(fn)
                for bb in fn.iter_basic_blocks():
                    yield self.make_basic_block_node(bb)
                    for inst in bb.iter_instructions():
                        yield self.make_inst_node(inst)

        return iterator()

    def __getitem__(self, n: LLVMNode):
        props = {}
        if n.obj_type != LLVMType.BasicBlock:
            props["str"] = n.obj.print_value_to_string().decode()
        return {
            "labels": [n.obj_type.value],
            "properties": props,
        }

    def __len__(self):
        raise NotImplementedError()


@dataclass
class LLVMGraphEdges(Mapping[EdgeType, Any]):
    def __iter__(self):
        raise NotImplementedError()

    def __getitem__(self, e: EdgeType):
        type_ = None
        if e[0].obj_type == LLVMType.Function:
            assert e[1].obj_type == LLVMType.BasicBlock
            type_ = "has_block"
        elif e[0].obj_type == LLVMType.BasicBlock:
            assert e[1].obj_type == LLVMType.Instruction
            type_ = "first"
        elif e[0].obj_type == LLVMType.Instruction:
            assert e[1].obj_type == LLVMType.Instruction
            type_ = "next"

        return {"type": [type_], "properties": {}}


@dataclass
class LLVMGraph(Graph[NodeType, EdgeType]):
    """A Graph implementation that maps graph access to an LLVM Module"""

    module: cllvm.Module

    @property
    def nodes(self) -> Mapping[NodeType, Any]:
        return LLVMGraphNodes(self.module)

    @property
    def edges(self) -> Mapping[EdgeType, Any]:
        return LLVMGraphEdges()

    def add_node(self, *_) -> NodeType:
        raise Exception("LLVMGraph is read-only!")

    def add_edge(self, *_) -> EdgeType:
        raise Exception("LLVMGraph is read-only!")

    def out_edges(self, node: NodeType) -> List[EdgeType]:
        if node.obj_type == LLVMType.Function:
            return [(node, LLVMNode(bb, LLVMType.BasicBlock)) for bb in
                    node.obj.iter_basic_blocks()]
        elif node.obj_type == LLVMType.BasicBlock:
            return [(node, LLVMNode(inst, LLVMType.Instruction)) for inst in
                    node.obj.iter_instructions()]
        else:
            if node.obj.next_instruction:
                return [(node, LLVMNode(node.obj.next_instruction, LLVMType.Instruction))]
            return []

    def in_edges(self, node: NodeType) -> List[EdgeType]:
        if node.obj_type == LLVMType.Function:
            return []
        elif node.obj_type == LLVMType.BasicBlock:
            return [(LLVMNode(node.obj.get_parent(), LLVMType.Function), node)]
        else:
            if node.obj.previous_instruction:
                return [(LLVMNode(node.obj.previous_instruction, LLVMType.Instruction), node)]
            return [(LLVMNode(node.obj.instruction_parent, LLVMType.BasicBlock), node)]

    def remove_node(self, _):
        raise Exception("LLVMGraph is read-only!")

    def remove_edge(self, _):
        raise Exception("LLVMGraph is read-only!")

    def src(self, edge: EdgeType) -> NodeType:
        return edge[0]

    def dst(self, edge: EdgeType) -> NodeType:
        return edge[1]


class LLVMCypherExecutor(CypherExecutorBase[NodeType, EdgeType]):
    """Enable openCypher queries against a LLVMGraph"""

    def __init__(self, module: cllvm.Module):
        graph = LLVMGraph(module)
        super().__init__(graph=graph)


# Entry point for LLVM opt pass
def run_on_module(module: cllvm.Module):
    exe = LLVMCypherExecutor(module)
    # This query counts the number of basicblocks per function that allocate
    # space on the stack
    print(exe.exec("""
        match (fn: Function)-->(b: BasicBlock)-->(i) WHERE i.str CONTAINS 'alloca' RETURN fn, count(b)
    """),
    file=sys.stderr)
    return 0
```

The above was run using `pyllvmpass` with the command:

```bash
# main.cpp has some example program
clang -O0 -S -emit-llvm main.cpp 
# libpyllvmpass.so was built from pyllvmpass's source and copied to the current directory
# the above code was saved as spycy_llvm.py in the current directory
opt --load-pass-plugin=libpyllvmpass.so --passes=pyllvmpass[spycy_llvm] main.ll -S
```

The output looked like this:

```
                                                  fn  count(b)
0  Node(id_=LLVMNode(obj=<llvmcpyimpl.Value objec...         2
```

The object reference in the Node id isn't the prettiest representation, but for
the input source code the result of the query is correct! I tried a bunch of
other queries too, like counting the number of basic blocks per function and
number of instructions per basic block and they all seemed to work!

The most challenging part was deciding how to map the IR to a graph structure.
In the end I opted for a very simple schema, where functions have out edges to
basic blocks and basic blocks have out edges to instructions. Instructions
themselves have out edges to each other to indicate the order of execution.

Note that this model is very incomplete. For example, in order to model the CFG,
basic blocks should also have edges to their successors, but this is almost
trivial to add in the code above - we simply need to modify
`LLVMGraph.out_edges`, and for any input basic block node, we just need to also
inform the query engine of an edge to any basic block that can be obtained as a
successor (which can be found via `[bb.get_successor(i) for i in
range(bb.num_successors)]`).

For less than an hour of work I was able to start querying LLVM with OpenCypher!
Next steps would be to take some example passes, determine what interfaces are
missing from this proof of concept and add those in as node properties and new
edge types.
