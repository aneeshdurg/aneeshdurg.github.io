---
layout: post
title: Injecting Kernel Controlled Threads to Userspace Processes
---

Linux lacks a mechanism for injecting a kernel-controlled thread into a userspace process.
Recently, I implemented a hacky solution (involving process brain surgery) and wanted to write about it.
Implementation code can be found at <https://github.com/aneeshdurg/atexec>.

---

Operating Systems typically provide a kernel that manages resources and performs privileged operations on behalf of userspace processes.
Some kernel APIs perform actions in userspace address spaces.
For example, in linux, `exec` replaces the address space with a new process image.
However, linux lacks the ability to perform arbitrary userspace actions within a process's address space.
The kernel can easily modify the address space, and execute actions in the kernel, but executing an operation that relies on userspace libraries is difficult.
This kind of operation is typically called an _upcall_.

Linux has existing mechanisms to perform upcall.
`call_usermodehelper` allows the kernel to launch a userspace binary which it can then communicate with via character devices or sockets to perform `RPC`-like methods.
However, like any other process, usermode helpers run in their own isolated address space.
While a usermode helper could use features like `ptrace` or `mmap`-ing another process's `/proc/<PID>/mem` file, it is difficult to reliably invoke a method inside another process's address space.

Recently, my research has led me to exploring situations where the kernel provides a userspace process with code to execute.
This is not without precedent, with existing features like [vDSO](https://man7.org/linux/man-pages/man7/vdso.7.html) having been in mainline linux for quite some time.
The kernel module I am developing allows userspace libraries to hold and manipulate state for kernel
objects.
However, the kernel must be able to access this state on demand.
To give the userspace libraries flexibility, the state must be serializable, but can be a complex in-memory object until the kernel requests access.
Ensuring availability of this state makes reusing existing userspace threads difficult.
For example, during `exec` we must obtain the serialized state before the userspace process address
space is replaced.
To solve this, I began to investigate thread injection.

The goal is to spawn a thread within another process' address space.
This is not a novel idea, and other OSes like Windows, provide APIs (e.g.
[CreateRemoteThread](https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-createremotethread))
that achieve this.
Linux can be modified to provide an API that just creates a new thread within an existing process,
but the requisite APIs are not exposed to kernel modules.
For now, I'll outline how this can be done in a hacky (but functional) way without modifying the
mainline linux kernel.

The steps are as follows:

+ In the original process, using a "vDSO"-like library, inform the kernel of a function address that
  serializes state.
+ In the module, using `kprobe` intercept `exec` and store a reference to the memory mappings and copy all process
  state (file descriptor table, attributes, etc).
+ Use `call_usermodehelper` to establish a userspace binary controlled by the kernel.
+ In the usermode helper, call a special `ioctl` on a device controlled by the module.
+ In the module, when the ioctl call is received, swap the memory mapping from the usermode helper
  and the orignal process! This is the brain surgery bit.
+ Copy over all other process state to the usermodehelper process.
+ Before returning from the ioctl, set the instruction pointer of the userspace thread to the
  function pointer we saved intially.
+ Usermode helper now resumes inside of the address space of the original process and begins
  executing the serialization method.

Note that this isn't specific to `exec` - any event that can invoke the kernel module can be used to
initiate thread injection, making this upcall mechanism highly flexible at the cost of having the
overhead of spawning an entire sacrificial helper process.

I've made my implementation of this method open source at <https://github.com/aneeshdurg/atexec>.
AI *was* used to write *some* of the code.
I couldn't find any existing implementations of this idea in the wild, but if you know of any I'd
love to hear about it!
Hope this helps some other kernel hackers in the future. 
