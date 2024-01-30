---
layout: post
title: Using ParamSpec in Python
permalink: /posts/2024/01/28-paramspec/
---

`ParamSpec` allows for binding the arguments of a function to a variable for
typing purposes. We can use that to improve type signatures of decorators!

---

A big source of frustration that I encounter on a day-to-day basis at work is a
lack of types on some `numba` interfaces. In particular, I use
`numba.core.extending.intrinsic` a lot (a function that allows adding a new
compiler intrinsic to `numba`), and it has some pretty interesting behavior.

Concretely, `intrinsic` takes in a function that takes as arguments a "typing
context", followed by any arguments or keyword arguments that you'd like as the
API to the function. It then returns a `Callable` object that has the API
specified (omitting the typing context parameter). Typical code that uses
`intrinsic` may look like this:

```python
from numba import jit
from numba.core.extending import intrinsic

@intrinsic()
def myIntrinsic(typingctx, a, b):
    ...


# Call the intrinsic in a jit'ed function
@jit
def myFastFunction():
  myIntrinsic(1, 2)
```

The issue is that most typecheckers, or LSP engines (e.g. `pyright`), will
complain that `myIntrinsic(1, 2)` is missing a parameter. This is because they
assume that the decorator does not change the function signature, and use the
type inferred from the definition of `myIntrinsic`. To fix this, we need to add
a type signature to `intrinsic` that communicates that it will be returning a
function without the `typingctx` argument.

This can be achieved with the combination of `ParamSpec` and `Concatenate`, two
interfaces that are present in python 3.10's `typing` module. Let's take a look
at the required type signature for `intrinsic`.

```python
from typing import Callable, Concatenate, ParamSpec, TypeVar

P = ParamSpec("P")
R = TypeVar("R")
def intrinsic(*args, **kwargs) -> Callable[
        [Callable[Concatenate[object, P], R]],
        Callable[P, R]
    ]:
  ...
```

This signature is a bit complex since intrinsic returns the decorator when
called, so let's look at a simpler example below:

```python
class Logger:
  def __call__(self, s: str):
    print(s)

global_logger = Logger()

def myAdd(log: Logger, a: int, b: int):
  c = a + b
  log(f"{a} + {b} = {c}")
  return c

myAdd(global_logger, 1, 2)
myAdd(global_logger, 3, 4)
```

Let's say that I'm working on some library where every method takes in a logger
and logs something about what it's computing. However, suppose that the logging
infrastructure is a private component of the API, and we don't want to expose it
to users, or allow users to change the logger between operations. To enable
this, we can define a decorator:

<details style="margin-left:1em; border: solid; padding: 0.5em;">
<summary>
This is a weird example...
</summary>
  yes, this is contrived, but in general, the technique being described here
  isn't something that is useful in a lot of cases - arguably, the only "good"
  use of it is specifically for `numba`, where the existence of the typing
  context is only relevant for the compiler and isn't accessible for the user at
  all
</details>

```python
def supplyFirstArgument(fn):
  def wrapped(*args, **kwargs):
    return fn(global_logger, *args, **kwargs)

@supplyFirstArgument
def myAdd(log: Logger, a: int, b: int):
  ...

myAdd(1, 2) # This is valid, but some tools may complain about a missing arg
myAdd(3, 4)
```

This works, but now our tooling doesn't quite understand that `myAdd` only takes
two arguments, and is unable to verify this code as correct. This is where
`ParamSpec` comes into play. With `ParamSpec`, we can create functions that are
generic over a function argument, and can create type variables that bind to all
of a function's arguments. This is the type annotations we need to add to the
code above:

```python
from typing import Callable, Concatenate, ParamSpec, TypeVar

P = ParamSpec("P")
R = TypeVar("R")

def supplyFirstArgument(
    fn: Callable[Concatenate[Logger, P], R]) -> Callable[P, R]:
  def wrapped(*args: P.args, **kwargs: P.kwargs) -> R:
    return fn(global_logger, *args, **kwargs)

```

Here by using `Concatenate` we're telling python that we're specifying the type
of the first argument, and binding to all remaining arguments. Here's a smaller
example:

```python
P = ParamSpec("P")
def f(a: int, b: str, c: boolean = False) -> float:
  ...

g: Callable[P, R] = f
# P is bound to (args: [int, str], kwargs: {"c": boolean})
# R is bound to float


h: Callable[Concatenate[int, P], R] = f
# P is bound to (args: [str], kwargs: {"c": boolean})

j: Callable[Concatenate[str, P], R] = f
# Fails to type check, first arg of `f` is not str
```

Combining all this, I was able to create a [pull request](https://github.com/numba/numba/pull/9401)
 to `numba` with this change included. It's not merged yet, but hopefully I'll
 find time to get it in a good state soon. If not, hopefully this helps other
 `numba` users understand how to resolve this issue for their own purposes
 instead!
