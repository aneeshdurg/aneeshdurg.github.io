---
layout: post
title: Juggling Threads
---

Psst. Hey you, wanna see something cool? Let's juggle some threads.

---

Threads in modern computers are strange.
After my [last post](/posts/2026/01/16-threads/) on the matter, I had a cursed
thought.
What happens if you switch the thread local storage of two threads, do things
just work as intended?

So I cooked up the following code:

```c
#include <asm/prctl.h>
#include <pthread.h>
#include <stdio.h>
#include <sys/prctl.h>
#include <sys/syscall.h>
#include <sys/types.h>
#include <unistd.h>

// Shows the the THREAD-id from the kernel's perspective - not the same as PID
// in userspace.
pid_t gettid(void) { return syscall(SYS_gettid); }

// This is the key syscall for the tricks we'll do. arch_prctl gets/sets process
// state that's arch specific.
int arch_prctl(int op, unsigned long addr) {
  return syscall(SYS_arch_prctl, op, addr);
}

// Some barriers. Can't juggle without some coordination.
pthread_barrier_t barrier_first;
pthread_barrier_t barrier_second;

// Get the FS (thread local) register
unsigned long getfs(pid_t tid) {
  unsigned long fs;
  arch_prctl(ARCH_GET_FS, (unsigned long)&fs);
  unsigned long fs_base = 0;
  // Just for fun we print out the result of rdfsbase. This shows us that on my
  // arch (x86_64), rdfsbase is equivalent to ARCH_GET_FS, but doesn't require a
  // syscall. Neato.
  __asm__ volatile("rdfsbase %0\n\t" : "=r"(fs_base));
  printf("tid=%d fs=%lx fs_base=%lx\n", tid, fs, fs_base);
  return fs;
}

// The thread we'll be juggling with
#define nthreads 2
// We'll store the fs values in here before we swap them.
unsigned long fs_values[nthreads];
// p looks like a pointer, but we're really just using it as an int here. It
// should be either 0 or 1.
void *thread(void *p) {
  // Get the tid for logging.
  pid_t tid = gettid();

  // ACT I - get the fs register on each thread and save it using out thread
  // index
  unsigned long fs = getfs(tid);
  fs_values[(unsigned long)p] = fs;
  pthread_barrier_wait(&barrier_first);

  // ACT II - swap fs registers across the two threads
  arch_prctl(ARCH_SET_FS, fs_values[1 - (unsigned long)p]);
  pthread_barrier_wait(&barrier_second);

  // ACT III - log the fs registers and return the to the parent
  getfs(tid);
  return p;
}

int main() {
  // Setup the barriers for 2 threads
  pthread_barrierattr_t attr;
  pthread_barrierattr_init(&attr);
  pthread_barrier_init(&barrier_first, &attr, nthreads);
  pthread_barrier_init(&barrier_second, &attr, nthreads);

  // Create each thread
  pthread_t tids[nthreads];
  for (size_t i = 0; i < nthreads; i++) {
    // See - we're not actually passing a pointer, we're just casting the index.
    // Hope no one dereference it :poop_emoji:
    pthread_create(&tids[i], NULL, thread, (void *)i);
  }

  // If we managed to juggle and didn't drop the threads on the floor, thread 0
  // should return 1 and vice versa.
  for (size_t i = 0; i < nthreads; i++) {
    void *p;
    pthread_join(tids[i], &p);
    printf("t %lu return %p\n", i, p);
  }
}
```

So what are we really doing here (I ask myself this daily)?
By swapping the `fs` register, we're moving all the thread local state to a
different thread.
This doesn't change any thing for the thread that is executing.
In otherwords, the thread id returned by `gettid` stays constant, but we've changed 
which `struct pthread_t` is tracking the thread.
So if the parent spawns two threads, with `tids[0] -> pid(x)` and `tids[1] ->
pid(y)`, we've now swapped the mapping so that `pid(y)` will join with
`pthread_join(tids[0])` and `pid(x)` will join with `pthread_join(tids[1])`.

This is completely useless to do (and generally, a BAD idea), but a fun party
trick.
