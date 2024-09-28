---
layout: post
title: Debugging STDIN issues with MPI_Comm_Spawn on MPICH
---

At work we encountered a strange issue where reading from `STDIN` on a process
that calls `MPI_Comm_Spawn` causes the program to crash. The solution was
non-obvious, so I thought I'd share my fix here for other `MPICH` users.

---

Recently, at my day job I've been onboarding onto a project to introduce a new
mode of execution that uses `MPI_Comm_Spawn` to run a program in parallel.
`MPI_Comm_Spawn` spawns a MPI process from an MPI process - creating two MPI
process groups - and then creates a communicator (called an intercommunicator)
which allows you to send messages between two groups. For our use case, we
wanted users to be able to write/run a script without using `mpirun/mpiexec` and
then use `MPI_Comm_Spawn` to create a group of child processes (that could be
distributed) to do the heavy lifting. We use `MPICH` as our MPI implementation
on MacOS.

We noticed that when running our code in an interactive shell (e.g. `ipython`),
we would see errors like the following and then the shell would crash:

```
[proxy:0:0HOSTNAME] HYDU_sock_write (lib/utils/sock.c:250): write error (Bad file descriptor)
[proxy:0:0@0HOSTNAME] HYD_pmcd_pmip_control_cmd_cb (proxy/pmip_cb.c:521): unable to write to downstream stdin
[proxy:0:0@0HOSTNAME] HYDT_dmxu_poll_wait_for_event (lib/tools/demux/demux_poll.c:76): callback returned error status
[proxy:0:0@0HOSTNAME] main (proxy/pmip.c:127): demux engine error waiting for event fish: Job 1, 'ipython' terminated by signal SIGKILL (Forced quit)
```

One workaround was to do `mpiexec -n 1 ipython`, but this wasn't acceptable, as
it made interactivity poor (MPI doesn't handle interactive `ioctl`s well). In
order to solve this issue, we had to close `STDIN` right before spawning the
child communicator. See the end of this post for a code example.

I wanted to make this blog post since googling around didn't help, and I ended
up having to read the [MPICH source code](https://github.com/pmodels/mpich/) to
understand how Hydra (the launcher used by `MPICH`) handles IO events.

## Debugging

At first, we didn't understand why it was crashing. I tried a bunch of things to
try to get for information. I added sleeps in the parent, sleeps in the child,
logging everywhere. We didn't know if it was an issue with our code in the spawn
process being incorrect, or maybe the parent process having some bug.
Mysteriously, the crash would go away if we ran the parent process with `mpiexec
-n 1`. Eventually, I noticed that after the spawn operation, if I spammed the
shell with the enter key, it would crash before doing any other work. This led
me to believe that the issue was reading from `STDIN`. From there, I looked at
the MPICH source code, where I found the following:

```c
HYD_status HYD_pmcd_pmip_control_cmd_cb(int fd, HYD_event_t events, void *userp)
{
    ...
    } else if (hdr.cmd == CMD_STDIN) {
            ...
            status = HYDU_sock_write(p->in, buf, hdr.buflen, &count, &closed, HYDU_SOCK_COMM_NONE);
            HYDU_ERR_POP(status, "unable to write to downstream stdin\n");
            ...
```

This seemed to match the error message above (though the line numbers were
different). It was coming from an `STDIN` event! This aligned well with the
hypothesis that the crash was happening when `STDIN` was read, but only when the
parent process was run without `mpiexec`. So how can we
prevent `STDIN` from being read. As far as I can tell, Hydra does not provide a
mechanism to disable reading `STDIN`. We looked through the code for a while,
and eventually found `HYDT_dmxu_poll_stdin_valid` which checks if the stdin file
descriptor supports `poll` (we're using the default `poll` as the `demux`
implementation). If this function marks `STDIN` as invalid, then `Hydra` will
not listen for events from `STDIN`.


## Reproducer/Fix
The following script (when saved as `repro.py`) will reproduce the issue. Note
that you will need to use [this version of
mpi4py](https://pypi.org/project/mpi4py-mpich/).

```python
import os
import sys

from mpi4py import MPI


def parent():
    num_procs = 1

    errcodes = [0] * num_procs
    comm_world = MPI.COMM_WORLD
    intercomm = comm_world.Spawn(
        "python",
        ["repro.py", "child"],
        num_procs,
        MPI.INFO_NULL,
        0,
        errcodes
    )
    intercomm.barrier()


def child():
    print("Hello from child")
    comm_world = MPI.COMM_WORLD
    comm_world.barrier()

    intercomm = comm_world.Get_parent()
    intercomm.barrier()

if __name__ == "__main__":
    if len(sys.argv) >= 2 and sys.argv[1] == "child":
        child()
    else:
        parent() 

```

The fix was to do the following:


```python
...
import contextlib

@contextlib.contextmanager
def no_stdin():
    """Temporarily close stdin and execute a block of code"""
    # Save a refence to the original stdin
    stdin_dup = os.dup(0)
    # Close stdin
    os.close(0)
    try:
        yield 1
    finally:
        # Restore the saved fd
        os.dup2(stdin_dup, 0)



def parent():
    ...
    with no_stdin():
        intercomm = comm_world.Spawn(
            "python",
            ["repro.py", "child"],
            num_procs,
            MPI.INFO_NULL,
            0,
            errcodes
        )
    ...
...
```

## Is this the right fix?

I wasn't satisfied with this. It felt rather hacky and I felt like the
appropriate fix would be a level deeper, as an option one could pass to `MPICH`.
So, I forked the repo and started adding a new flag to close STDIN in the child
processes. Along the way, I've learned the following:

+ the `hydra_pmi_proxy` process needs a valid STDIN. I don't know exactly why,
  but it seems to use it to send control messages to the spawning MPI process.
+ When `MPI_Comm_Spawn` is called from a non-MPI process, it first creates an
  MPI child process, which then spawn a new group. If the caller is an MPI
  process, this step can be skipped.

Putting this together - we actually do want the child processes to have valid
STDIN's but this STDIN is not connected to the STDIN of the parent process at
all - it's always a pipe. Instead, we need to ensure that if an intermediate
`mpiexec` process is spawned, it should have an invalid STDIN. With that
knowledge, I feel more confident about the fix above. I think it is the right
fix, and it is in the right place. Maybe it could be nice to have an option for
`MPI_Comm_Spawn` to close `STDIN` when it creates a `mpiexec` process, but I
think such an option would likely be more confusing and difficult to use
correctly in the common case. Anyway, this was a fun adventure and I
definitely gained a deeper understanding of `MPICH`'s internals! Hopefully I'll
have more opportunities to play around with this code in the future.
