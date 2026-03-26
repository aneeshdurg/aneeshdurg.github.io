---
layout: post
title: A Tale of Two DTVs
---

It was the best of times, it was the worst of times, it was the age of elegant solutions, it was the age of cursed hacks. 

---

My journeys have brought me to the strange and unforgiving lands of `GLIBC` internals.
As I've alluded to in previous posts, my research has led me to building a system where I have multiple copies of `GLIBC` in the same process.
This is because within a single process, I need to manage two process contexts, which need to remain isolated from each other - mostly.
`GLIBC` does a few things that make this difficult, but the most obvious one is heap management.

When `GLIBC` allocates from the heap, it uses the syscall [brk](https://manpages.debian.org/unstable/manpages-dev/brk.2.en.html) for a pool of small allocations.
`brk` changes the end of the heap pointer from the entire process, which means that calling it without coordinating with the allocator in `GLIBC` can cause the allocator to get confused about which regions of memory it owns.
This is relatively easy to avoid for me as I can configure my second context to use a different allocator, namely, [jemalloc](https://jemalloc.net/) which only manages memory it acquires via `mmap`.
However, since the process as a whole is now using two allocators, special care needs to be taken to avoid corrupting the Dynamic Thread Vector (DTV). 

In the case of a dynamically linked process, the DTV is a part of the Thread Control Block (TCB), a per-thread structure that is used by `ld.so` to provide a unique Thread Local Storage (TLS) region per-module.
You can learn slightly more about TCBs (and possibly question ~your~ my sanity by reading my [previous post](/posts/2026/02/23-juggling-threads/).
When reading or writing to TLS, the module must first look up the TCB by accessing the FS register.
Then, from the TCB, the appropriate DTV can be looked up by an index, yielding the base location for the module specific TLS.
Then, an offset can be added to the TLS base to get the actual location to read or write from.
The TLS region itself for each dynamically loaded library is allocated by the global allocator and freed on thread exit.
This poses a challenge, as the second context will register DTV entries for modules it loads, and allocate the TLS regions with `jemalloc`.
This can cause memory corruption (and usually a segfault) on thread exit as the TLS was allocated with a different allocator than the rest of the allocation.

![DTV Corruption]({{ '/static/images/2026-03-26-tale-of-two-dtvs/alloc_err.jpg' | relative_url }})

To avoid this, when my second context detects a thread it has not encountered before, it allocates a new TCB and swaps it with the current TCB, using the technique I outline in [previous post](/posts/2026/02/23-juggling-threads/).
When TLS allocation occurs, it will update the DTV in the new TCB instead of the original TCB.
Before a method from the second context returns to the application, it restores the original TCB.

![TCB Swap]({{ '/static/images/2026-03-26-tale-of-two-dtvs/tcbswap.jpg' | relative_url }})

It turns out this technique in general has a name - stackless threads!
A stackless thread is a lightweight thread context that can be used in cooperatively scheduled environments to manage multiple execution contexts without explicit stacks.
This does enforce that handing off scheduling between these threads must be done at a function call boundary.
In effect, my second context creates a stackless thread to execute in.
This does not incur any context switches, and on `x86\_64`, the TCB swap can be done with just two unprivileged instructions, `RDFSBASE` and `WRFSBASE`.

The larger work that this is part of is now under submission!
Fingers crossed that it make it through to publication so I can write more about it here soon.
