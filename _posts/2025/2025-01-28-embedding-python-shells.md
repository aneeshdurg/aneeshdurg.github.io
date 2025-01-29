---
layout: post
title: Sharing variables across interpreted langauges - a quest to make my shell more ergonomic
series: pysh
---

I've been daydreaming about seamless integration between Python and shells (e.g. Bash).
Existing solutions like Xonsh never seem to work the way I expect. In this post, I aim to outline
what I want, and some little mad-science style experiments I've done to try out some ideas.

---

Bash is great and powerful. I'd say my Bash-fu is above average, though I am no expert. However,
Bash is so painful to work with for manipulating data. This makes sense, because you're really
encouraged to use other tools, but sometimes, those other tools just aren't the ones that I'm
already good at. In a lot of cases, the tools I want already exist as Python libraries that I
already know well.

So what does my ideal world look like? Maybe something like this:

```bash
export x=1
export y=2

py {
  print(TERM)
  assert x==1
  assert y==1
  z = 3
  print(f"[python] {x=} {y=} {z=}")
}

echo [bash] x=$x y=$y z=$z

seq 0 10 | py {
  while len(l := sys.stdout.readline()):
    print(int(l) + 1)
} | grep 11

cat smth.json | py {
  data = sys.stdout.read()
  j = json.parse(data)
  print(j['field0'][0])
}

cat smth.jsonl | py {
  for l in lines():
    j = json.parse(l)
    print(j['field0'][0])
}
```

While some of the above can be accomplished in bash by replacing `py` with something like:

```bash
python <(cat <<EOF
    # python code here
EOF
)
```

It doesn't share variable state, and the only way to output values to the calling shell is via
consuming the output of the python call.

To further complicate my desires, I don't want this feature for just bash, I actually want it for
`fish`, and more generally, I don't want this feature to depend on the shell I'm using at all. I
want to freely switch to whatever language is the best task for the moment - when I'm chaining
together existing programs, I want my shell to bash, and when I'm manipulating data, I want my
current shell session to BECOME python, and for all of my local state to be preserved as I swap
between language. What I really want is for interpreted languages to have some common interface by
which they can share local state. 

In my mind, this is similar to environment variables. The OS already provides a key-value store that
applications can share and use to export information to each other. While it mildly sucks that this
information is just strings, it's there for free. At least for most shell languages (fish, bash,
etc) this is also fine because the language only has a string type anyway. The only problem with
using the environment is that it only works one way - parents can set values to be consumed by child
processes, but child processes can't automatically send values back up to the parent. If I could
solve that problem, I could build some kind of shim that I can install into any language I want to
embed in my shell which imports and exports variables through the environment.

Here's an example of what that shim might look like in python

```python
import sys
from types import CodeType
from typing import Any
import inspect
import os
import atexit


# We set this atexit handler to spawn a new instance of the shell so we can get a feel for what it
# would be like if we could export variables back into our main shell
def exec_shell():
    shell = os.environ["SHELL"]
    os.execvp(shell, [shell])
atexit.register(exec_shell)


def handler(code: CodeType, *args) -> Any:
    if code.co_name == "hello":
        cf = inspect.currentframe()
        assert cf
        # print("start", cf.f_back.f_globals, cf.f_back.f_locals)
        for n in code.co_names:
            if n in os.environ:
                print("  setting (global)", n)
                cf.f_globals[n] = os.environ[n]
        # We don't need to check for local variables here, because there can't
        # be any at the start of the function


def ret_handler(code: CodeType, *args) -> Any:
    if code.co_name == "hello":
        cf = inspect.currentframe()
        assert cf
        assert cf.f_back
        for n in code.co_names:
            if n in os.environ:
                print("  collecting (global)", n)
                os.environ[n] = str(cf.f_back.f_globals[n])
        for n in code.co_varnames:
            print("  collecting (local)", n)
            os.environ[n] = str(cf.f_back.f_locals[n])


sys.monitoring.use_tool_id(sys.monitoring.OPTIMIZER_ID, "dbg")
sys.monitoring.set_events(
    sys.monitoring.OPTIMIZER_ID,
    sys.monitoring.events.PY_START | sys.monitoring.events.PY_RETURN,
)
sys.monitoring.register_callback(
    sys.monitoring.OPTIMIZER_ID, sys.monitoring.events.PY_START, handler
)
sys.monitoring.register_callback(
    sys.monitoring.OPTIMIZER_ID, sys.monitoring.events.PY_RETURN, ret_handler
)


# The following is the "user code" that we would execute with the shims above
def hello():
    # These variables are "imported" from the environment
    print(TERM)
    assert x == "1"
    assert y == "2"
    # z should be 'exported' to the environment
    z = 3
    print(f"hello {x=} {y=} {z=}")


r = hello()

sys.monitoring.free_tool_id(sys.monitoring.OPTIMIZER_ID)
```

And I can run the above code as follows:

```console
aneesh@earth:~/pysh$ x=1 y=2 python env_shim.py
  setting (global) TERM
  setting (global) x
  setting (global) y
xterm-256color
hello x='1' y='2' z=3
  collecting (global) TERM
  collecting (global) x
  collecting (global) y
  collecting (local) z
aneesh@earth:~/pysh$ echo $z
3
aneesh@earth:~/pysh$ exit # we're actually in a new shell now unfortunately
aneesh@earth:~/pysh$ # back in the original shell
```

This feels pretty good to use. In theory we could avoid this and just let python read and set the
environment explicitly, but that adds friction to the usecase I want. The real problem is that we
were unable to actually modify the parent shell's environment. Since I want this to work for any
shell, I need to find a way to share this environment without some kind of custom plugin, or
shell-specific configuration.

When exploring my options, I came up with two possible methods - the first was to use `ptrace` and
create some mechanism for trusted children to execute arbitrary code in the parent. The second was
to use signals to trigger a signal handler installed by an `LD_PRELOAD`'ed shared object. For the
unfamiliar, `LD_PRELOAD` is a way to specify some shared object that should be loaded before the
program starts. I figured I could try to write some kind of library here that would start a python
shell when `SIGUSR1` was received. Here's some Rust code I wrote to implement such a shared library:

```rust
use ctor::{ctor, dtor};

use nix::sys::signal::{self, Signal};
use nix::unistd::Pid;
use once_cell::sync::OnceCell;
use pyo3::ffi::c_str;
use pyo3::prelude::*;
use signal_hook::{consts::SIGUSR1, iterator::Signals};
use std::ffi::CString;
use std::process;
use std::process::Command;
use std::sync::atomic::AtomicBool;
use std::sync::atomic::Ordering;
use std::thread;

static STOP: AtomicBool = AtomicBool::new(false);
static mut TID: OnceCell<std::thread::JoinHandle<()>> = OnceCell::new();

#[ctor]
#[allow(static_mut_refs)]
fn init() {
    eprintln!("Hello from shared obj! pid={}", process::id());
    let mut signals = Signals::new(&[SIGUSR1]).unwrap();
    unsafe {
        TID.set(thread::spawn(move || {
            for _ in signals.forever() {
                if STOP.load(Ordering::Acquire) {
                    break;
                }

                let pypath_out = Command::new("python")
                    .arg("-c")
                    .arg("import sys; print(sys.path)")
                    .output()
                    .expect("failed to get python path");
                assert!(pypath_out.status.success());
                let pypath =
                    String::from_utf8(pypath_out.stdout).expect("failed to parse python path");

                let py_res = Python::with_gil(|py| {
                    let path = py.eval(&CString::new(pypath.clone())?, None, None)?;
                    let sys = py.import("sys")?;
                    sys.setattr("path", path)?;
                    Python::run(
                        py,
                        c_str!(
                            r#"
# We have to use cffi here instead of ctypes, because ctypes and pyo3 seem to have some
# compatibility issues.
from cffi import FFI
ffi = FFI()
import code
code.InteractiveConsole(locals=globals()).interact()
                    "#
                        ),
                        None,
                        None,
                    )?;
                    PyResult::Ok(())
                });
                if let Err(ref x) = py_res {
                    Python::with_gil(|py| {
                        x.print_and_set_sys_last_vars(py);
                    });
                }
                eprintln!("handler finished");
            }
        }))
        .unwrap();
    }
}

#[dtor]
#[allow(static_mut_refs)]
fn deinit() {
    eprintln!("Setting stop flag");
    STOP.store(true, Ordering::Release);
    eprintln!("Waking handler");
    signal::kill(Pid::from_raw(process::id() as i32), Signal::SIGUSR1).unwrap();

    unsafe {
        TID.take().unwrap().join().unwrap();
    }
    eprintln!("Thread killed");
}
```

To test this, I wrote the following `c` program:

```c
#include <stdint.h>
#include <stdio.h>
#include <unistd.h>

int main() {
  pid_t pid = getpid();
  printf("Process ID: %d\n", pid);
  // volatile to prevent compiler from optimizing the loop away completely
  volatile int32_t x = 0;
  printf("x: %p, x=%d\n", &x, x);
  while (!x)
    ;
  printf("Value of x changed, will exit! x=%d\n", x);

  return 0;
}
```

This program will check the value at some memory address and continue looping until it has been
changed. Here's how I was able to use the embedded python shell to change the value at that address.

```console
aneesh@orion:~/t/looper$ LD_PRELOAD=/home/aneesh/embedpy/target/debug/libembedpy.so ./loops
Hello from shared obj! pid=85132
Process ID: 85132
x: 0x7ffc43e582b4, x=0

<I ran kill -SIGUSR1 85132 in a separate shell at this point>

Python 3.12.3 (main, Jan 17 2025, 18:03:48) [GCC 13.3.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
(InteractiveConsole)
>>> ffi.buffer(ffi.cast("int*", 0x7ffc43e582b4), 4)[0] = b'\x01'                                                      
Value of x changed, will exit! x=1
Setting stop flag
Waking handler
>>> 
now exiting InteractiveConsole...
handler finished
Thread killed
```

Pretty cool! Now, I just need to combine the environment shim with this method and find some way of
sending the code that I want to the shell process that should execute it. There's also some other
challenges. For example, the python shell will run in it's own thread, but I actually want the
parent thread to pause while the python code executes. This is pretty unsafe and unsecure at the
moment, but it's just a proof of concept to help play around with this idea of shared local state
across languages. Who knows, maybe at end of this journey I'll step away feeling like sharing local
state wasn't as useful of an idea as I often think it is. At any rate, I really enjoy doing cursed
things like what I've documented here today, and I hope my next post is equally horrifying. Happy
hacking!
