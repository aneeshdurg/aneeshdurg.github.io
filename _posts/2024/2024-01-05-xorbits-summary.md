---
layout: post
title: Paper Review 01 - Xorbits
permalink: /posts/2024-01-05-thoughts-on-xorbits/
---

My thoughts on [Xorbits: Automating Operator Tiling for Distributed Data Science](https://arxiv.org/pdf/2401.00865.pdf)

---

## What is this post?

This year, one of my goals is to rekindle my academic aspirations, and I figured
a good way to do that might be to not only read more papers, but also document
my thoughts about them (and possibly even identify related problems along the
way). For this post's paper in question (linked above), I just went on
[arxiv](https://arxiv.org) and looked at recent papers in the field of
databases. I have mixed feelings about this approach to selecting papers, and
for the next few publication I intend to write about, I instead looked at papers
accepted to reputable conferences.

## What is Xorbits?

[Xorbits](https://github.com/xorbitsai/xorbits) is a open source framework that
aims to enable multicore/distributed processing for existing code targeting
dataframe APIs (e.g. `pandas`). The stated goals seem to prioritize processing
of large datasets that might be too large to process on a single machine, and to
improve speed. `Xorbits` is primarily maintained by a startup, either called
`XProbe Inc` or `Xorbits Inc`. It seems that they've renamed themselves at some
point, and I'm not sure which name represents the current entity. I'd probably
guess the former, since they seem to be branching out with a new product called
`XInference` that seems to be some kind of compatibility layer for LLMs.

The space occupied by `Xorbits` is not unique, several other companies/OSS
projects have also identified the poor scaling of python based dataframe
implementations, such as `modin`, `polars`, and `bodo` among others.

For full transparency, I am currently a full-time engineer at `bodo` - the
similarity of my employer's product to `Xorbits` is what made me click on this
paper, but the thoughts in this post are entirely my own and do not necessarily
reflect the views or intentions of my employer.

The fact that this space has so many players is definitely a sign that `Xorbits`
is attempting to solve a very real problem.


## How does Xorbits improve the state of dateframe processing in python?

The general workflow of a program accelerated with `Xorbits` is that API calls
are collected into a graph until a method that triggers computation (or an
explicit request for computation) is encountered. At that point, the `Xorbits`
runtime optimizes the graph, chunks execution (partitions input data/operators
into per-logical-thread operations), and executes. There seemed to be three main
contributions the paper focused on.

### Dynamic Tiling

Many operators that reshape data do so in a way that makes it impossible to
statically determine what the output shape of the data may be. This is
problematic for scheduling because it's hard to determine what the optimal
approach for chunking data should be. Some systems wash their hands of the
problem and rely on the user to supply a fixed chunk size, which can lead to
unexpected performance, or increases the burden on the user to try different
chunk sizes to find the optimal one.

`Xorbits`' dynamic tiling is implemented by running parts of the input graph up
until an operator that reshapes data is encountered. Such operators are assigned
some kind of initial chunking strategy, but after a few chunks are collected,
the metadata is extracted and the plan is modified to better reflect the real
state of the data. This is done by making use of python's built in
generator/coroutine mechanisms, which is a pretty clean way of implementing it.

### Operator Fusion

There's also a stage of optimization for operator fusion where nodes in the
compute graph are combined based off of a graph coloring algorithm. The paper
claims that using graph coloring to implement this is a novel contribution, and
it certainly seems like a really cool way to approach the problem.

### Storage Backends

To be honest I only skimmed this section, so my brief summary is that they
support multiple storage backends and even have some notion of tiering to use
the kind of storage mechanism that best represents how the data is being used. I
did learn about the existence of `pickle5` though, which was neat.

### Side note - a non-technical explanation

While I was initially reading the paper, my partner offhandedly asked me to
summarize what I was reading and asked for a non-technical explanation, so
here's my best non-technical explanation of how chunked processing works:

It's kinda like when you're eating a bunch of food, and if you eat too much too
fast, you choke and throw up. If you take really small bites, you probably won't throw
up (ignoring a full stomach), but you'll take a lot longer to finish the meal.
Computers can only handle computing over some maximum amount of data, and going
beyond that leads to OOMs (out-of-memory). The goal is to look at the "digestive
system" and determine how fast each part of the system can work, and then
determine what's the biggest bites you can take at any given moment to finish
your plate as fast as possible, but also not choke.

## My thoughts

When I initially read the paper I missed that this paper relates to a commercial
product. I'm not entirely sure what `Xorbits`' business model is, but the paper
definitely reads a bit like an advertisement. The benchmarks also seem slightly
cherry-picked but more on that later. I don't think that automatically makes
this a bad paper, but it does change how I interpret the results. I think some
of the contributions in this paper are really interesting. I especially liked
the elegance of using python's coroutines (`yield`) to implement dynamic tiling.
I also found the details on how graph fusion worked for them to be rather
interesting. Prior systems I've worked on/read about seem to focus more on
fusing sequences of operators to replace them with more efficient
implementations, but few seemed to focus on reduce inter-operator overheads
(which may or may not have been the goal of the implementation here, but it was
interesting to think about nonetheless). I'm a little surprised by how large the
impact of graph fusion was (I would have expected operator fusion to be more
impactful). I'd love to dive into more details about what exactly makes operator
fusion fast.

I couldn't help but compare `Xorbits` to `bodo` given my familiarity with the
latter. There's several interesting things to note about the differences in
approach to the problem. `Xorbits` seems to manage most of it's infrastructure
as a service on top of `kubernetes`, while `bodo`'s community edition relies on
users configuring `MPI`. Another interesting difference is that `Xorbits`
replaces the `pandas`/`numpy` runtimes with it's own implementation that defers
computation, which allows for extremely high compatibility with existing python
scripts, while `bodo` only supports the subset of those scripts that can be
compiled by `numba`. There's pros and cons to both of these approaches, and
choosing one comes down to whether you want to be more explicit in targeting
only the subset of workflows where your product can make a meaningful impact, or
prioritizing compatibility so that users don't need to take many actions to use
the product.

I felt like the paper was lacking details comparisons to other state of the art
systems. I think the paper's first author would agree with me on that statement,
given that they wrote [this blog post](https://luweizheng.github.io/blog/dataframe-analysis)
which compares `Xorbits` to a few other systems including `bodo`. However, this
comparison only examines differences on relatively small datasets and only
using their laptop's compute resources. But it does show that `Xorbits` is far
from perfect scaling, and it would be interesting to know more about where
bottlenecks are encountered.

Overall, cool to learn about more approaches in this space. I've already
selected the next paper I plan to write about, and hopefully I'll be able to
find time before the end of this month to finish that write-up as well!
