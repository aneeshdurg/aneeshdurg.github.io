---
layout: post
title: Handling references to __main__ in a python debugging tool
series: chkpt
---

As I continue to build an automatic checkpointing solution for python scripts,
I ran into an interesting issue involving references to `__main__`.

---

I've modified my [chkpt](https://github.com/aneeshdurg/chkpt) library to have a
new API for explicitly registering objects to be tracked, and explicitly
controlling when snapshots are taken. This is a bit against the spirit of doing
these things automatically, but I think in many cases, the finer grained control
can be appreciated. However, when I ran the following script I ran into a
curious issue:

```python
import sys
import random
from time import sleep
from dataclasses import dataclass, field

from chkpt import Checkpoint


@dataclass
class State:
    x: list[int] = field(default_factory=list)

print('usr.__main__', sys.modules['__main__'])
print(State.__module__)


state = State()

try:
    chkpt = Checkpoint.get_global_singleton()
    # Prevent automatic snapshottinfrequencyg
    chkpt.frequency = -1
    chkpt.min_obj_size = -1
except AssertionError:
    # We're not running the script with chkpt, but continue anyway
    chkpt = None
if chkpt:
    # Explicitly request that `state` be tracked by chkpt
    chkpt.track(state)

for i in range(1000):
    state.x.append(random.randint(1, 1000))
    if (i % 100) == 0:
        # Manually trigger a snapshot
        if chkpt:
            chkpt.snapshot(f"iter{i}")
    sleep(0.05)
```

I saved this as `example.py` and ran it with `python -m chkpt -z -1 -f -1 -v
./example.py`, to get the following error:

```
_pickle.PicklingError: Can't pickle <class '__main__.State'>: attribute lookup State on __main__ failed
```

What's happening here is that pickle tries to save the instance of `state` by
finding a reference to the class based on `type(state).__module__` which gives
the name of the module `State` should be importable from. In this case `State`
thinks that it should be importable from `__main__` - the main module being
executed. However, the main module that's actually being executed is
`chkpt.__main__`, and the user supplied code is being executed under an `exec`
statement with an isolated global environment. The code being executed isn't
attached to any module at all - it's being dynamically evaluated by `exec`.
There's a few hacky workarounds to tricking the `pickle` call in `chkpt` into
seeing the right definitions for `State`, but this led me to another question -
what happens if the user code itself attempts to pickle something?

```python
from dataclasses import dataclass, field
import pickle


@dataclass
class State:
    x: list[int] = field(default_factory=list)

print(pickle.dumps(State([0])))
```

Running the above code with `chkpt` gave me the same error as before, but this
time I was able to confirm that the error was not originating from `chkpt`
itself, but rather the `pickle.dumps` call from the usercode. Since I had
~~stolen~~ learned how to execute code in this way from `cProfile` I decided to
run this script with `cProfile` instead of `chkpt` and sure enough:

```
Traceback (most recent call last):
  File "<frozen runpy>", line 198, in _run_module_as_main
  File "<frozen runpy>", line 88, in _run_code
  File "/usr/lib/python3.12/cProfile.py", line 195, in <module>
    main()
  File "/usr/lib/python3.12/cProfile.py", line 184, in main
    runctx(code, globs, None, options.outfile, options.sort)
  File "/usr/lib/python3.12/cProfile.py", line 21, in runctx
    return _pyprofile._Utils(Profile).runctx(statement, globals, locals,
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "/usr/lib/python3.12/profile.py", line 64, in runctx
    prof.runctx(statement, globals, locals)
  File "/usr/lib/python3.12/cProfile.py", line 102, in runctx
    exec(cmd, globals, locals)
  File "./repro.py", line 9, in <module>
    print(pickle.dumps(State([0])))
          ^^^^^^^^^^^^^^^^^^^^^^^^
_pickle.PicklingError: Can't pickle <class '__main__.State'>: attribute lookup State on __main__ failed
```

So even `cProfile` doesn't do the right thing! I poked around the python docs to
see what my options were and eventually found some code that worked:

```python
    spec = importlib.machinery.ModuleSpec(name="__main__", loader=None, origin=progname)
    loader = importlib.machinery.SourceFileLoader("__main__", progname)
    spec.loader = loader
    module = importlib.util.module_from_spec(spec)

    chkpt = Checkpoint(
        progname,
        args.min_obj_size,
        args.output_dir,
        args.frequency,
        args.verbose,
    )
    chkpt.install()

    # Execute the code within it's own __main__ module - this allows libraries
    # like pickle to resolve imports against __main__ in the context of the
    # usercode, and not this shim.
    # Note that sys.modules["__main__"] in the user code will still point to the
    # chkpt main module which could still have some issues.
    sys.modules["__main__"] = module
    spec.loader.exec_module(module)
```

Basically, we create a new module, name it `__main__`, then replace the old
definition of `__main__` in `sys.modules`. After you do this, things will behave
like I injected code into the user's application instead of having a boundry
between `chkpt` and the usercode. This isn't ever going to impact usercode, but
it could create issues in `chkpt`. However, there is a simple solution - make
sure that nothing accessed by `chkpt` lives in `chkpt.__main__`. This is easy to
accomplish by moving everything to `chkpt.__init__` and importing the references
required to start the checkpointing tool in `chkpt.__main___`.

This was pretty fun to hack on, and it's pretty satisfying to have something
that works better than a standard library tool! I'm not sure why `cProfile`
doesn't do this. My best guess is that either they tried and found that it
messes with parts of their application (which `chkpt` doesn't deal with since it
doesn't execute much outside of the usercode, but `cProfile` does some pretty
non-trivial report at the end of execution), or they simply went with the more
obvious solution `exec`'ing code. It's also possible that `cProfile` was just
written before `importlib` was standardized, and also totally possible that
there's something super unsafe and dangerous about the way I'm doing things.
Either way, working on this improved my understanding of python internals yet
again, and the dream of automatically checkpointed python applications looms
ahead!
