---
layout: post
title: There's a CoW holding up my HugePages
---

Hugepages can lead to performance issues when mapped in Copy-on-Write (CoW)
mode. In this post, I'll describe the problem with some benchmarks.

---

CoW is a great technique that helps concurrent programs share data
transparently - which is especially important to UNIX programs that rely on
[fork](https://man7.org/linux/man-pages/man2/fork.2.html). `fork` works by
duplicating a process and all of it's memory mappings to create a new process
with the only difference being that the return value of `fork` is different (`0`
in the parent, `pid` of the current process in the child). when a
process forks, all of it's writeable pages are marked both shared and read-only,
and a flag is set to note that it should be considered for CoW. When a process
writes to a shared page, it triggers a write-fault, which causes the OS to copy
the contents of the page to a new location and update the mapping for the
writing process, while the original page is marked writeable and exclusive.
This allows the write to only be visible to the process that wrote, while also
allowing the other process to retain it's view of the page. For shared pages
that never get written (or shared pages that are only written to by the parent
after the child exits), CoW allows the OS to save on both memory usage and time,
since unnecessary copies are avoided.

While fork isn't the best abstraction for all workloads (see
[this](https://www.cs.utexas.edu/~witchel/380L/papers/baumann19hotos-fork.pdf)),
it's particularly well-suited for checkpoint/restore workloads.

## Checkpointing

In many programs there's a need for a mechanism that can save the current state
of the program in some way that can be resumed or examined later. For example,
video games (where there is an explicit notion of "saving"), machine learning
(where intermediate model weights are checkpointed for either resuming training -
perhaps when compute is sufficiently inexpensive, or for debugging), or even
  entire operating systems (see [CRIU](https://criu.org/Main_Page) or [VM
  migration](https://en.wikipedia.org/wiki/Live_migration)). Regular readers of
  my blog (who probably don't really exist tbh) probably know that this is an
  area that I've been interested in [recently]({{ '/posts/2025/02/21-chkpt' |
  relative_url }}).

  For a concrete example, let's take a look at [redis](https://redis.io) (an
  in-memory key-value store). `redis` has a checkpointing command called
  [BGSAVE](https://redis.io/docs/latest/commands/bgsave/) which works by forking
  the process, then more or less dumping memory to disk.

## HugePages

`fork`-based checkpointing tends to perform poorly in the presence of HugePages.
For a quick recap, in linux, every process has a unique virtual address space
that is mapped to physical memory with the help of a hardware TLB (translation
lookaside buffer). By default every mapping is for a 4KB "page". However, this
has some drawbacks. For programs that will map large sections of memory, 4KB
mappings will lead to many Page Table Entries which can make fault handling
slower, and worse, for large objects, there's no guarantees that contiguous
regions of virtual address space are actually contiguous physically beyond 4KB
chunks.

HugePages are a relatively new addition to the linux-kernel that allows for
having memory mappings that address a region of physical memory that are larger
than 4KB. By default a hugepage is 2MB, but it can be configured to be 1GB.
Linux has a mode that enables hugepages "transparently", but for a plethora of
reasons, this is disabled by default and allocating hugepages needs to be
explicitly requested by the process today.

As far as other popular OSes go,  Windows also has a similar feature called
large pages. MacOS has a similar feature it calls superpages, though MacOS also
uses 16KB pages by default instead of 4KB.

## Why are HugePages problematic for checkpointing?

HugePages come with some huge tradeoffs. In terms of checkpointing, the child
will usually never write to any pages from the parent. However, the parent may
continue writing. For a 4KB page, this would trigger a 4KB copy. However, for a
HugePage of 2MB, this will trigger a 2MB copy - even if the write only changed a
single byte! This can introduce huge latency spikes during the copies, and also
results in increased memory pressure. For this reason `redis`
[recommends](https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/latency/#latency-induced-by-transparent-huge-pages)
disabling transparent huge pages.

## How can we verify this for ourselves?

I wanted to see if I could observe the latency spikes reported by `redis` for
myself, so I built a simple test program:

```c++
// This benchmark can be configured to either use HugePages or use regular
// (small) pages with `-DUSE_SMALLPAGES` at compile time.
...

// This can be modified during compilation to deteremine how different numbers
// of allocated hugepages affects latency
#ifndef NPAGES
#define NPAGES 1
#endif

constexpr size_t HUGEPAGESIZE = 2048 * 1024;
constexpr size_t PAGESIZE = 4 * 1024;
constexpr size_t TESTSIZE = NPAGES * HUGEPAGESIZE;

int main() {
#ifndef USE_SMALLPAGES
  // Not strictly necessary, but I was using memfd_create here so that I could
  // more easily see the huge pages in the memory mapping
  int hpfd = memfd_create("hugememfd", MFD_HUGETLB);
  ftruncate(hpfd, TESTSIZE);
  auto *hp_ptr = mmap(NULL, TESTSIZE, PROT_READ | PROT_WRITE,
                      MAP_PRIVATE | MAP_HUGETLB, hpfd, 0);
#else
  auto *hp_ptr = mmap(NULL, TESTSIZE, PROT_READ | PROT_WRITE,
                      MAP_ANONYMOUS | MAP_PRIVATE, -1, 0);
#endif

  // Setting up some pipes so I can control where I take measurements
  int fds0[2];
  int fds1[2];
  if (pipe(fds0) != 0) {
    std::cerr << "Error creating pipe\n";
    exit(1);
  }
  if (pipe(fds1) != 0) {
    std::cerr << "Error creating pipe\n";
    exit(1);
  }

  // I don't actually have to write to every byte here, but I want to ensure
  // that in the regular pages setting that every page is actually mapped into
  // memory.
  for (size_t i = 0; i < TESTSIZE; i++) {
    ((char *)hp_ptr)[i] = i;
  }

  // This shows stats on how many HugePages are allocated
  // system("cat /proc/meminfo | grep ^Huge");
  pid_t p = fork();
  if (p == 0) {
    close(fds0[1]);
    close(fds1[0]);

    char b = '\0';
    read(fds0[0], &b, 1);

    std::cout << "got byte " << b << std::endl;
    // trigger a huge page write - note that this *should* be a lot cheaper in
    // the regular pages setting because we should only copy NPAGES*4KB instead
    // of NPAGES*2MB
    for (size_t i = 0; i < TESTSIZE; i += HUGEPAGESIZE) {
      ((char *)hp_ptr)[i] = b;
    }
    std::cout << "in mem: " << (int)*(char *)hp_ptr << std::endl;

    // This is useful when not benchmarking to confirm that the HugePage really
    // did double.
    // system("cat /proc/meminfo | grep ^Huge");

    // let the child exit
    write(fds1[1], &b, 1);
    std::cout << "parent done\n";
  } else {
    close(fds0[0]);
    close(fds1[1]);

    std::cout << "child in mem: " << (int)*(char *)hp_ptr << std::endl;
    char b = 'a';
    // Inform the parent that the child has spawned
    write(fds0[1], &b, 1);
    // Wait until the parent signals to exit (ensures that hp_ptr's page is
    // mapped shared until we're ready)
    read(fds1[0], &b, 1);
    std::cout << "child done\n";
  }
}

```

I setup the following makefile to build all my test configurations:

```
all: test_small test

test: test.cpp
	clang++ test.cpp -o test
	clang++ test.cpp -D NPAGES=128 -o test_128
	clang++ test.cpp -D NPAGES=256 -o test_256
	clang++ test.cpp -D NPAGES=512 -o test_512

test_small: test.cpp
	clang++ test.cpp -D USE_SMALLPAGES -o test_small
	clang++ test.cpp -D USE_SMALLPAGES -D NPAGES=128 -o test_small_128
	clang++ test.cpp -D USE_SMALLPAGES -D NPAGES=256 -o test_small_256
	clang++ test.cpp -D USE_SMALLPAGES -D NPAGES=512 -o test_small_512

enable_hugepages:
    # By default there are no huge pages available for allocation on my system
    # This can be persisted by setting it in a config file, but I don't want to.
	sudo sysctl -w vm.nr_hugepages=1024
```

I ran all the benchmarks with [hyperfine](https://github.com/sharkdp/hyperfine)
and got the following measurements:

```
Benchmark 1: ./test
  Time (mean ± σ):      10.3 ms ±   3.1 ms    [User: 7.1 ms, System: 2.2 ms]
  Range (min … max):     2.3 ms …  17.0 ms    317 runs
 
Benchmark 1: ./test_small
  Time (mean ± σ):      10.3 ms ±   3.1 ms    [User: 6.2 ms, System: 3.7 ms]
  Range (min … max):     2.2 ms …  15.5 ms    298 runs
 
Benchmark 1: ./test_128
  Time (mean ± σ):     276.7 ms ±  21.7 ms    [User: 234.0 ms, System: 18.0 ms]
  Range (min … max):   245.0 ms … 316.6 ms    12 runs
 
Benchmark 1: ./test_small_128
  Time (mean ± σ):     200.0 ms ±   4.2 ms    [User: 141.8 ms, System: 57.2 ms]
  Range (min … max):   194.2 ms … 206.5 ms    14 runs
 
Benchmark 1: ./test_256
  Time (mean ± σ):     563.2 ms ±  33.6 ms    [User: 481.4 ms, System: 35.3 ms]
  Range (min … max):   513.4 ms … 614.3 ms    10 runs
 
Benchmark 1: ./test_small_256
  Time (mean ± σ):     383.6 ms ±   8.4 ms    [User: 277.8 ms, System: 104.6 ms]
  Range (min … max):   361.4 ms … 390.0 ms    10 runs
 
Benchmark 1: ./test_512
  Time (mean ± σ):      1.161 s ±  0.091 s    [User: 1.002 s, System: 0.068 s]
  Range (min … max):    1.023 s …  1.329 s    10 runs
 
Benchmark 1: ./test_small_512
  Time (mean ± σ):     773.3 ms ±   9.2 ms    [User: 560.5 ms, System: 210.4 ms]
  Range (min … max):   761.3 ms … 788.0 ms    10 runs
```

This confirms that CoW for hugepages is a significant source of latency!

However, I'd like to got a step further to confirm that my benchmark doesn't
have any other sources of latency. To check, I modified the test program in the
small pages setting to trigger a write to every mapped page, and got the
following numbers:

```
Benchmark 1: ./test
  Time (mean ± σ):      12.2 ms ±   4.7 ms    [User: 9.4 ms, System: 1.9 ms]
  Range (min … max):     2.8 ms …  20.2 ms    298 runs
 
Benchmark 1: ./test_small
  Time (mean ± σ):      15.1 ms ±   4.1 ms    [User: 9.2 ms, System: 3.5 ms]
  Range (min … max):     5.1 ms …  22.4 ms    166 runs
 
Benchmark 1: ./test_128
  Time (mean ± σ):     369.3 ms ±   6.3 ms    [User: 323.7 ms, System: 20.8 ms]
  Range (min … max):   362.5 ms … 382.0 ms    10 runs
 
Benchmark 1: ./test_small_128
  Time (mean ± σ):     392.4 ms ±   6.1 ms    [User: 268.4 ms, System: 56.4 ms]
  Range (min … max):   384.2 ms … 400.8 ms    10 runs
 
Benchmark 1: ./test_256
  Time (mean ± σ):     732.2 ms ±   7.7 ms    [User: 647.6 ms, System: 37.5 ms]
  Range (min … max):   724.2 ms … 747.8 ms    10 runs
 
Benchmark 1: ./test_small_256
  Time (mean ± σ):     784.4 ms ±  10.7 ms    [User: 541.9 ms, System: 107.3 ms]
  Range (min … max):   766.0 ms … 803.4 ms    10 runs
 
Benchmark 1: ./test_512
  Time (mean ± σ):      1.467 s ±  0.010 s    [User: 1.300 s, System: 0.076 s]
  Range (min … max):    1.452 s …  1.487 s    10 runs
 
Benchmark 1: ./test_small_512
  Time (mean ± σ):      1.577 s ±  0.008 s    [User: 1.080 s, System: 0.225 s]
  Range (min … max):    1.567 s …  1.589 s    10 runs
``` 

Here we see that the `small` tests take slightly longer than the HugePage tests
which is probably because we're triggering more faults, though the dominant
factor is probably still the time spent copying page contents so the number are
roughly similar between the two variants.

## Conclusion

If you're using `fork` and HugePages, the latency of copying over pages during a
CoW fault can be expensive, but as the second benchmark shows above, it's only
significant if your writes are sparse. If you were going to touch every 4KB
sub-region of a given HugePage, it's probably slightly better than using regular
sized pages. However, for checkpointing, I think that it's pretty common for the
checkpointing child process to be short-lived and only require a read-only view
of the parent memory at a snapshot in time, so the cost imposed by HugePages is
probably significant.

## Interested in solving this problem?

This is a problem that I am actively working on and hope to address soon! I've
already got some work in progress towards this, so if you're also interested in
this area, or would like to collaborate, please contact me either below or at
`aneeshd (at) cs.utexas.edu` and I would love to talk!
