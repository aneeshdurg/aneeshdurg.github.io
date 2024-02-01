---
layout: post
title: Multi-versioning in Python
permalink: /posts/2024/02/01-multiversionpython/
---

Oftentimes, two python libraries may be incompatible due to conflicting
dependencies. Phrased another way, we want to support having multiple versions
of the same package available to a single project. Can we solve this problem
with some creative uses of `venv`?

---

Many python devs have been in this situation before. You find a poorly
maintained library that doesn't work well with newer versions of some
sub-dependency (e.g. `pandas`), but your project either depends on a newer
version of that sub-dependency, or perhaps depends on another library which
in turn requests a newer version of the sub-dependency. If you're a more visual
person, here's a dependency graph illustrating the issue:

```
           my_app
             |
    +--------+--------+
    |                 |
    v                 v 
  dep_a             dep_b
    |                 |
    v                 v
pandas==2.2.0     pandas==2.0.3
```

The current state of python tooling has no clear answer to this problem. While
the _right_ thing to do in this case might be to go update code to work with
newer versions, that might not always be feasible - either due to time
constraints or a lack of familiarity with the area (e.g. Libraries that make
guarantees about cryptographic properties of their output and execution). An
interim solution that allows multiple versions would help unblock use cases, and
prevent rewriting of functionality provided by libraries for the sake of
completing a project. I'm not the only one who holds this viewpoint. While this
is a problem I'd been contemplating for a while, I was inspired to take a stab
at solving it because of [this
issue](https://github.com/mitsuhiko/rye/issues/523) against the
[rye](https://github.com/mitsuhiko/rye) project.

I've created a [repo](https://github.com/aneeshdurg/multiversionpython) with a
proof of concept for supporting this. This post aims to document some of the
thought process behind my solution, and also some approaches that didn't work.

## Defining the problem: Multi-versioning and `venv`

When I initially thought about this problem, I realized that in some sense,
`venv` addresses a related problem for system-wide packages. It could be
leveraged to solve this problem, provided that we can somehow maintain one
`venv` per dependency. We then need our top-level project to be capable of
importing across `venv`s, but that alone isn't sufficient, because we also need
to ensure that all `import` calls originating from a `venv` are done within
their isolated environment only. This is slightly trickier to solve for a
language that's as dynamic as python, since there's no static analysis or
transformation of library code that we can do to easily guarantee that the
correct packages are being imported.

## Redirecting imports

There's a couple different ways of redirecting `import`s in python. [PEP
302](https://peps.python.org/pep-0302/) defines a way to hook into the importing
system at various levels. This has a lot of different layers of abstraction,
since part of the intended usage is to allow importing from non-text files (e.g.
compressed archives, encrypted sources, etc.). We won't be touching those
layers, since we're still going to be installing dependencies into a `venv` via
normal means - we just need to be able to simulate entering and exiting a `venv`
between imports. In someways, this can be achieved without any hooks at all:

```
# Suppose pandas is only installed within a venv
sys.path.append(VENV_PATH)
import pandas
sys.path.pop()
```

This falls short when invoking the library would trigger future imports. It's
even messier when you start juggling multiple environments as you need to ensure
that the path is appropriately set depending on the origin of the `import`
request. So we can instead define a `PathFinder` that can be installed as a
hook. `PathFinder`s are responsible for finding the definition of a module given
just the module name. You can view the default finders by inspecting
`sys.meta_path`. The `import` behavior can be modified by adding finders in to
that class. The custom finder defined in my repo changes `sys.path` depending on
the stack frames present at the time of invocation. If the `import` request
comes from a library within a `venv`'s `site-packages`, then the path is
modified to include that `venv` before delegating to the default finders.

We also need to be able to handle top-level imports being redirected to the
isolated `venv`s, which need to be done at a lower level. I couldn't find a good
interface for this, so I resorted to redefining `__import__` (the function that
is called for every `import` statement - the entrypoint to the import
mechanism). This isn't ideal, but it works for now.

However, this alone is insufficient as it doesn't handle cached modules.

## `sys.modules` and `PyCapsule_Import`

Loaded modules are cached in `sys.modules`. This isn't ideal for us, as we need
different `venv`s to have different views of the cache (i.e. we don't want an
import for `pandas` from `dep_b` being influenced by the cached module for
`pandas` populated by importing `dep_a`). Initially, my plan was to have the
`PathFinder` also be responsible for managing the module cache. Depending on the
`venv`, we could swap in a per-`venv` cache (I'd even written up a prototype that
was even more automatic by creating a class extending `dict` that presented a
different view of it's contents depending on the location of the caller).
While this works amazingly for pure python dependencies, it doesn't work at all
with c-extensions. For reasons I don't fully understand the merit of,
`PyCapsule` will remember the location of `sys.modules` when it is initialized,
and will throw error about not being able to find modules if `sys.modules`'
reference ever changes. There is no way around this - you cannot change
`sys.modules` at any point in your process, you are only allowed to modify it's
entries. Since we're already hooking `__import__`, some additional logic was
added to check which `venv` the caller is in, and appropriately modify
`sys.modules` to provide the appropriate view.

## What's next?

Currently, to tie all of this together, we need a config file that tells our new
import infrastructure how to handle top-level imports. For a demo, I hacked
together a script which generates this, but it is very fragile. A more robust
solution would require inspecting the generated `venv`s, and determining all
importable modules that are directly provided by the named dependencies. Also,
while the current script creates one `venv` per dependency, it would be more
efficient to group dependencies into maximal non-conflicting sets to reduce the
number of times the import infrastructure needs to change the views. Another
concern is that determining the origin of an `import` by inspecting stack frames
might be slow, though it's unclear if this is actually problematic in real world
usage. A bigger concern is that it's not always reliable and it's unclear how
well it would work in the face of generated code (i.e. code generated by
`eval`/`exec`).

All in all, this is an interesting idea, and it's not too hard to imagine it
being integrated into python tools such as rye. The additional runtime that it
needs to inject into the system doesn't use any non-public python APIs, and it
is up to debate whether something like this should be imported by default by the
interpreter, or if it should be opt-in on a project by project basis.
Regardless, I haven't seen other implementations that solve this problem in this
way before, and I'd be interested to see how the python ecosystem evolves in
this area in the future.
