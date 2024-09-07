---
layout: post
title: PyLLVMPass
---

Ever wanted to write LLVM passes in python? With [PyLLVMPass](https://github.com/aneeshdurg/pyllvmpass) you can! 

---

Recently, I've been working with `LLVM` passes for a few projects, and whenever
I'm working in unfamiliar territory, I like to reach for python. Some may call
this a bad habit, but the interactive nature of python makes it perfect for
rapid prototyping and exploration. I often throw in a `breakpoint` or work from
the `REPL` to learn about methods and fields on objects and to understand how to
approach the problem I'm solving. While I definitely love `C++` (and `Rust`) for
building and debugging larger programs, python is still a valuable tool in my
kit.

It seemed to me like python could be easily supported by having a small shim
library which allows users to specify some python module, then passing the LLVM
objects to that python module during the pass. To build the shim, I used `Rust`
and the [llvm-plugin](https://github.com/jamesmth/llvm-plugin-rs) library. I
choose to use `Rust` instead of `C++` in part because the build process seemed
very straightforward, and `PyO3`'s python interface is pretty good (also, I
just wanted an excuse to write some `Rust` lol).

While python can definitely receive raw pointers from the shim, it's not very
useful unless we can actually invoke the LLVM API against the pointers. LLVM
does not officially release python bindings, however, there are a few different
libraries that do. The one I chose to go with is
[llvmcpy](https://github.com/revng/llvmcpy) which dynamically generates python
bindings for whatever LLVM version you have installed by parsing the headers.
There are some downsides - the generated code lacks typing information which
means you won't get any autocompletion/docstrings provided by LSP engines. There
is a workaround for this! You can copy the generated code to the path where your
LSP engine would look for typestubs. I use pyright, so for me this is
accomplished by doing:
```bash
mkdir -p typings/llvmcpy
ln -s ~/.cache/llvmcpy/**/llvmcpyimpl.py typings/llvmcpy/llvm.pyi
```
Despite this, `llvmcpy` is still the most flexible and complete solution that I
could find out there and provides access to any API exposed by LLVM's C bindings
(which isn't the full set of APIs that the C++ library has access to. Some
things, such as reading the values of non-string constant globals, isn't
directly supported. You can dump the LLVM IR for the value though, and re-parse
the value of the constant yourself).

Putting all of this together, I have an implementation of this at
[PyLLVMPass](https://github.com/aneeshdurg/pyllvmpass). It works surprisingly
well, and opens the door to using any existing python library as a tool to build
LLVM passes! To use it, you need to first build the library (`cargo build` after
cloning the repo), then run the following:

```bash
# Set the path for `LLVM_CONFIG` (this is required by llvmcpy iff `llvm-config` is not on your PATH already)
export LLVM_CONFIG=llvm-config-18

opt-18 --load-pass-plugin=./target/build/libpyllvmpass.so --passes=pyllvmpass[my_pass] main.ll -S
```

In this example it's assumed that `my_pass` is a python module that can be
imported from the current working directory. This means that at least one of
`./my_pass.py`, or `./my_pass/__init__.py` or `<python site-packages
dir>/my_pass...` exists. Additionally, the module must have a top level
declaration for `run_on_module`. If you do try it, please let me know or open
github issues if you have any feedback. Happy hacking!
