---
layout: post
title: Paper Review 12 - Refined Input, Degraded Output
permalink: /posts/2024/08/19-thoughts-on-rido/
---

My thoughts on [Refined Input, Degraded Output](https://dl.acm.org/doi/pdf/10.1145/3656404)

---

Today's paper appeared in PLDI ’24.


## Overview

This paper explores cases in which providing additional hints to popular
compilers produced worse outputs - specifically the paper looked at dead code
elimination and the elimination of branches based on known bounds for values.
This was achieved by generating sample programs, then adding markers - calls to
some specially named functions - in branches/blocks that should be eliminated.
Through this method, the authors found regressions in recent GCC and Clang
versions where an older version would produce code that did not contain an
instruction to call the markers, but newer versions did. The work done in this
paper helped compiler developers identify and fix those regressions, and
provided a way to better track such behavior in the future.

## Thoughts

- The instrumented markers are interesting. I don't know how GCC handles it's
  optimization internally, but I could imagine this being incorporate into
  compilers themselves. Passes could insert markers to mark a block as safe to
  delete, and then enforce that all such branches are pruned at the end of
  compilation.

- It would have been nice to see whether or not this caused actual regressions
  in real world programs such as the linux kernel, or maybe browsers like
  firefox/chrome since these are codebases that impact millions of users.

- Are modern compilers too complicated? Would the industry be better served by
  modular compilers that allow projects to define the optimization passes they
  want to run so that these kinds of regressions are less likely to have an
  impact? It might be interesting to see if a more optimal ordering of clang
  passes can be found for a specific program than what clang chooses by default.

- I wonder if a similar technique can be applied to SQL queries - some systems
  show a sufficiently detailed "EXPLAIN" output to allow one to determine if the
  query is effectively using provided filters/hints/known metadata about the
  columns. This might be much harder to study because unlike GCC/Clang which
  output inspectable assembly, the output of many SQL compilers is internal to
  the system, and even then, the runtime may be so high level that the
  information needed to do this kind of regression analysis is not available.
