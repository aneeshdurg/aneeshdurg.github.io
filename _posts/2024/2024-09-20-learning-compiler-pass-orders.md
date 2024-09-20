---
layout: post
title: Paper Review 13 - Learning Compiler Pass Orders using Coreset and Normalized Value Prediction
permalink: /posts/2024/09/20-thoughts-on-learning-compiler-pass-orders/
---

My thoughts on [Learning Compiler Pass Orders using Coreset and Normalized Value Prediction](https://dl.acm.org/doi/10.5555/3618408.3619263)

---

Today's paper appeared in ICML ’23.


## Overview

Ordering optimizations passes for a compiler is a hard problem. Real world
compilers generally don't attempt to find the most optimal set of passes for a
given input, since that would be time consuming, and in many cases, provide
little benefit over the default pass ordering. It is possible to convert code to
some IR, and manually apply passes (e.g. compile to LLVM IR, and then use `opt`
to apply passes), but as far as I know, no real-world project invests time in
doing this - mainly because it's hard to beat the default passes unless you're
able to exploit a specific structure in your code. This poses the question, can
AI do better?

This paper attempts to explore this area by introducing an additional layer that
they call a `coreset`, which encapsulates a pass sequence as opposed to
individual passes, and then show that they were able to design and train a model
(leveraging `GNN`s and using `ProGraML` to represent the program as a graph with
sufficient features). Their findings show significant improvement in code size
reduction, and they evaluated their system on a variety of benchmarks and a few
real world large code bases (e.g. Linux). In order to bound the "vocabulary" (I
assume this means vertex labels?), they also extended `ProGraML` to break down
composite types into multiple nodes.

## Thoughts

- Does this system generalize to optimization as well? My gut instinct says that
  it might not.
- Research in this area seems to be focused on representing programs as
  annotated IR graphs for learning. I wonder how it might look to have
  representations with higher level operators - combining "common" structures
  into a single node/edge. Maybe even retaining some aspects of the AST?
- I wonder how well this technique applies to other domains, such as relational
  algebra rewriting. In many DBMS' latency is critical, so it's important for
  the compiler to both be optimal and fast. Another domain that might be
  interesting to look at is tool paths for 3D printers/CNC machines. From what I
  understand, it seems like there's a similar phase of optimization/compilation
  that could benefit from AI assisted pass ordering.

AI assisted compilation is a very interesting field. I think it opens the door
to building better compiler infrastructure more easily for specific domains, and
I'm interested to see if there's better results possible if the problem space is
restricted to programs modeling a specific domain.
