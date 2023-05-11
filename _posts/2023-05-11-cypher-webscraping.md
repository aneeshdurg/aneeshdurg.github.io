---
layout: post
title: Using openCypher as a webscraper
permalink: /posts/2023-05-11-cypher-webscraper/
---

[openCypher](https://opencypher.org) is a query language for property graph
databases. If you squint slightly, an HTML document describes a property graph.
Can we use `openCypher` for webscraping?

---

I've spent the last two years professionally working on building a query engine
that supports `openCypher`. Over those two years, I've come to really like a few
things about the language. It's very visual, and that makes it relatively easy
for non-technical folks to get started using it. It's also pretty ergonomic to
write - especially when you want to query relationships between objects.
Oftentimes, when I'm working on something involving webscraping, what I really
care about is to query against the structure of the webpage. I'm sometimes
looking for a specific descendant within a `div` of some class, or maybe I want to
extract all elements of a certain tag and then get their children. These are
tasks that could be expressed easily within `openCypher`. We could maybe imagine
something like this:

```cypher
// Get all links within a `foo` div.
MATCH (parent:div {class: "foo"})-[*]->(link:a) RETURN link.href

// Get children of all `code` elements and concatenate their contents
MATCH (parent:code)-->(child) RETURN sum(child.innerText)
```

Expressing the same thing in javascript or python is also possible, but tedious,
and the syntax isn't as intuitive in my opinion.

Before I started thinking about this problem, I was already writing my own open
source implementation of `openCypher` in python. The project is called
[sPyCy](https://aneeshdurg.me/spycy) and it supports most of the language. One
of `sPyCy`'s key features is that it allows easily swapping out components of
the engine such as the underlying graph representation, the pattern matcher, and
even the expression evaluator. This means that rather than just being a database
engine, it's more of a library for integrating `openCypher` as a frontend to
whatever you want. In the context of webscraping, this means that we could, in
theory, write a high performance, low memory overhead, graph backend that parses
HTML documents, and doesn't require explicit preprocessing steps/overhead (in
the example we will implement in this blog post, we won't achieve better
efficiency than preprocessing, but it's just a proof of concept).  

## Implementing a webscraper using sPyCy

The entry point to `sPyCy` is a class called `CypherExecutorBase`. This class is
responsible for interpreting the query and invoking relevant subcomponents.
Here's a salient snippet from it's definition:

```python
@dataclass
class CypherExecutorBase(Generic[NodeType, EdgeType]):
    graph: Graph[NodeType, EdgeType]
    table: pd.DataFrame = field(
        default_factory=lambda: CypherExecutorBase._default_table()
    )

    expr_eval: type[
        ExpressionEvaluator[NodeType, EdgeType]
    ] = ConcreteExpressionEvaluator[NodeType, EdgeType]
    matcher: type[Matcher[NodeType, EdgeType]] = DFSMatcher[NodeType, EdgeType]
```

In this definition, `Graph`, `ExpressionEvaluator`, and `Matcher` are all
abstract base clases. `expr_eval` and `matcher` are not instances of a class but
rather the class type itself, and are instantiated during runtime. `Graph` is
an instance itself. One thing to note is that the whole class is parameterized
on `NodeType` and `EdgeType` which are the types that the underlying `Graph`
will use to represent nodes and edges respectively.

Let's take a look at a `Graph` implementation that will enable webscraping:

```python
from dataclasses import dataclass, field
from typing import Any, Dict, List, Mapping, Tuple

from bs4 import BeautifulSoup

from spycy.graph import Graph

NodeType = int
EdgeType = Tuple[int, int]


@dataclass
class SoupGraph(Graph[NodeType, EdgeType]):
    """A Graph implementation that maps graph access to a HTML DOM"""

    soup: BeautifulSoup
    node_map: Dict[int, Any] = field(default_factory=dict)
    edge_map: Dict[Tuple[int, int], Any] = field(default_factory=dict)

    def __post_init__(self):
        self.node_map = {
            hash(s): {
                "labels": [s.name],
                "properties": {"attrs": s.attrs, "text": s.text},
                "obj": s,
            }
            for s in self.soup.find_all()
        }

        for n, node in self.node_map.items():
            for c in node["obj"].children:
                self.edge_map[(n, hash(c))] = {"type": "child", "properties": {}}

    @property
    def nodes(self) -> Mapping[NodeType, Any]:
        return self.node_map

    @property
    def edges(self) -> Mapping[EdgeType, Any]:
        return self.edge_map

    def out_edges(self, node: NodeType) -> List[EdgeType]:
        el = self.node_map[node]["obj"]
        return [(node, hash(child)) for child in el.children if child.name is not None]

    def in_edges(self, node: NodeType) -> List[EdgeType]:
        el = self.node_map[node]["obj"]
        return [(node, hash(el.parent))]

    ...
```

This implementation is using `BeautifulSoup4` to do the actual parsing of HTML,
and then creating maps to represent nodes and edges. Strictly speaking, this
isn't actually necessary. All we really need is a way to provide a unique
identifier for nodes and edges, but this makes the example simpler. This is made
possible because the return types of `Graph.nodes()` and `Graph.edges()` is set
to be `Mapping` instead of `Dict` - this allows the returned object to not
actually materialize all nodes or edges, and instead could return an object that
defines `__getitem__` to allow only loading nodes or edges that are actually
accessed.

Some other methods are ommitted here for brevity, but a link to the full code is
availible below.

Next, we need to actually create an implementation of `CypherExecutorBase`.

```python
from spycy.spycy import CypherExecutorBase


class SoupCypherExecutor(CypherExecutorBase[NodeType, EdgeType]):
    """Enable openCypher queries against a SoupGraph"""

    def __init__(self, input_: Path):
        """input_ should be a Path to an HTML document"""
        with input_.open() as f:
            soup = BeautifulSoup(f.read(), features="html5lib")
        soup_graph = SoupGraph(soup)
        super().__init__(graph=soup_graph)
```

And that's it! Now we can load a file and run queries against it, like so:

```python
exe = SoupCypherExecutor(args.filename)
all_div_children: List[NodeType] = list(exe.exec("match (a:div)-->(b) return a")["a"])
```

The full code for this example, can be found
[here](https://github.com/aneeshdurg/spycy/blob/main/examples/spycy_dom.py).

## Future work?

It blows my mind that with `sPyCy` this was achievable in less than 100 lines of
python. I think this could be even extended to do so much more. For example, I
can imagine that one could write a custom `Graph` implementation that could
support webcrawling as well. There's still work to be done on `sPyCy` itself,
but I think it has potential to be actually useful!
