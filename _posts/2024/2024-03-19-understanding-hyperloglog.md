---
layout: post
title: Understanding HyperLogLog
permalink: /posts/2024/03/19-understanding HyperLogLog
---

[HyperLogLog](https://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf) is an
algorithm for estimating cardinality of multisets. Notably, the algorithm only
uses \\(O(1)\\) space. Join me on a journey to understand it by implementing it!

---

Estimating the number of unique elements in a set/stream has many applications,
especially in the field of databases. For example, if getting such estimates is
faster or cheaper than computing the true value, it can be used as part of
join ordering where the cost of tables is derived from the estimated row count.
[This paper](https://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf)
describes the `HyperLogLog` algorithm - an algorithm that only uses \\(O(1)\\)
space, and is only \\(O(n)\\) in runtime. It's a very cool algorithm, and I
recommend reading the original paper, though there were definitely aspects of it
that I struggled to get an intuition for, so I decided to implement it myself as
a learning exercise.

## The HyperLogLog Algorithm

I highly recommend reading [this
write-up](https://engineering.fb.com/2018/12/13/data-infrastructure/hyperloglog/)
by Meta about how `HyperLogLog` works. It helped me get a lot of intuition for
the process, but here's my short summary:

`HyperLogLog` works by mapping elements into a roughly uniformly distributed space
by using a hash function. If this space was between 0 and 1, we could use the
inverse of the lowest element as an approximation of the number of elements (if
you have \\(n\\) elements evenly distributed in \\((0, 1)\\), then the lowest
element will be \\(\frac{1}{n}\\)). We can get a value in \\((0, 1)\\) by
counting the number of leading 0's (\\(k\\)) in every hashed value and then
using \\(\frac{1}{2^{k}}\\) as our value - we only care about the lowest value,
so we look for the element that maximizes \\(k\\). However, this would only give us
coarse, power-of-two sized estimates, so we could do better by using many
different hash functions and averaging the values estimated by each function.
This is computationally expensive, so instead, we take some number of bit
\\(b\\) from the prefix of the hashed value, and use that as an identifier to
split the input into \\(m = 2^{b}\\) streams. The remaining bits are used as
before to estimate the cardinality.

One interesting property to note is that `HyperLogLog` "remembers" seen elements
by virtue of it's usage of `max`. The key idea is that `max` is commutative, and
\\(max(x, x) = x\\), which means that adding the same element twice is the same
as adding it once. Since the commutativity means that order of operations
doesn't matter, the order in which repeated elements are present doesn't matter
either. This is mainly relevant to this discussion in terms of testing, since it
simplifies the kind of test data I'll need to produce.

## Writing my implementation

Once I'd read the initial paper, I set about trying to implement it myself. The
algorithm itself is very straightforward, but was even cooler was that Github's
Copilot seemed to understand what I was doing and suggested almost exactly what
I wanted! However, I was a little weary of relying on the auto-complete too
heavily since I wanted the experience of writing things out myself to learn
better. For my choice of hash function, I went with python's built in `hash`.
Since most of the paper relied on manipulating bits, the actual function I used
was: `bin(abs(hash(x)))[2:]` which takes the absolute value of the hash,
converts it to a binary string, and removes the `0b` prefix. However, running
my initial code produced wildly inaccurate results. Commence debugging!

## Debugging my implementation

My first step in the debugging process was to find a reference implementation to
compare against. I quickly found [this
repo](https://github.com/svpcom/hyperloglog) and began comparing. This repo
seems to include a lot of optimizations that the original paper doesn't mention,
so I tried ignoring most of those, since this exercise is mostly about getting
the core ideas down. Scrolling through the code seemed to indicate that I was
generally on the right track, which was encouraging.

The most obvious difference to me was that the reference implementation tried to
ignore registers that didn't have any elements (empty streams ignored), however,
that didn't affect this implementation since every register was being filled. I
added a debug assert to ensure that I wasn't hitting that cast to be safe.

My first suspicion was the choice of hash function. At work we'd seen strange
behavior with the distribution of python's hash function, albeit only on older
python versions. Looking at the reference implementation, they used `sha1`
instead. Could that really make a difference in the computation? To verify this,
I injected code into the reference and my own implementation to produce a
histogram of results from calls to the `rho` function, which was responsible for
computing length of the 0 prefix of hashed data. 

Here's what my `rho` function looked like with this additional collection:
```python
class HyperLogLog:
    ...

    observed_ps = {}
    def rho(self, s: str) -> int:
        v = s.index('1') + 1
        self.observed_ps[v] = self.observed_ps.get(v, 0) + 1
        return v
...

h = HyperLogLog()
# Simulate 100_000 unique values
for x in range(100000):
    h.hyperloglog(f"foobar{x}")

print({k: h.observed_ps[k] for k in sorted(h.observed_ps.keys())})
```


And here's some sample values produced:

```
{
    1: 50102,
    2: 25102,
    3: 12383,
    4: 6265,
    5: 3093,
    6: 1465,
    7: 779,
    8: 387,
    9: 210,
    10: 105,
    11: 53,
    12: 37,
    13: 9,
    14: 3,
    15: 4,
    16: 2,
    18: 1
}
```

Similar modifications were done to the reference implementation. This turned out
to be a great idea, and confirmed that my hash function was producing values
that closely matched the distribution in the reference implementation. I was
also concerned that the bit width of values I was working with not being large
enough, but the histogram seemed to show that having at least 20 bits was more
than sufficient for the error rate desired. This makes sense since the
probability of encountering values with a specific 0-prefix length is
exponentially inversely related to the length.

After some more poking around and comparing intermediate values from my solution
vs the reference, I stumbled upon the bug. For some reason, copilot had
implemented the sum term in the harmonic mean as \\(2^{\sum{2^{-M_j}}}\\)
instead of \\(\sum{2^{-M_j}}\\). It goes to show that trusting AIs in domains
where I'm not already well-informed is a bad idea. Lessons learned.

While this brought the estimates to a more reasonable value, it still seemed to
be underestimating by a factor of 2. This seemed suspiciously consistent and the
algorithm already includes a constant factor adjustment, so I concluded that the
general steps of the algorithm must be mostly correct. After reviewing the
reference solution again, I realized that my implementation of `rho` was off by
1, which made sense, and it was easy to prove by looking at the original
equation that this would cause the estimate to be divided by 2 overall.

The working code is presented below:

## My code

Here's the final code I ended up with, including some comments.

```python
import math
from typing import List

class HyperLogLog:
    error_rate = 0.1
    # Determine the number of "buckets" based on the error_rate
    b = int(math.ceil(math.log((1.04 / error_rate) ** 2, 2)))
    m = 2**b
    # Registers storing Max-values for each "bucket"
    M: List[float]

    def __init__(self) -> None:
        # Initialize registers to 0 (-inf in the paper)
        self.M = [0] * self.m

    def rho(self, s: str) -> int:
        """Find the first 1 bit"""
        v = s.index('1') + 1
        return v

    def h(self, s: str) -> str:
        """Compute the hash of s and return it as a binary string"""
        x = abs(hash(s))
        s = bin(x)[2:]
        # pad to 32 bits
        while len(s) < 32:
            s = '0' + s
        # truncate to 32 bits
        s = s[-32:]
        return s

    def add(self, s: str):
        """Add an element to the estimator"""
        x = self.h(s)
        j = int(x[:self.b], 2)
        w = x[self.b:]
        self.M[j] = max(self.M[j], self.rho(w))

    def z(self) -> float:
        """The sum portion (denominator) of the harmonic mean"""
        return sum(2**-x for x in self.M)

    def get_alpha(self):
        """Constant factor to weight results"""
        # This is copied from https://github.com/svpcom/hyperloglog
        if self.b == 4:
            return 0.673

        if self.b == 5:
            return 0.697

        if self.b == 6:
            return 0.709

        return 0.7213 / (1.0 + 1.079 / self.m)


    def estimate(self):
        """Estimate the cardinality of all elements seen so far"""
        # constant * m * harmonic mean of 2**-M
        return self.get_alpha() * (self.m**2) / self.z()

h = HyperLogLog()
for x in range(100000):
    h.add(f"foobar{x}")

# The implementation above doesn't handle unvisited registers well
# assert h.M.count(0) == 0, f"num registers/0 regs = {len(h.M)}/{h.M.count(0)}"
print("Estimate:", h.estimate())
```

## Playing with HyperLogLog
Once I had a working implementation, I was able to experiment with a few
things. I tried using `k` hash functions instead of partition the input into `k`
streams. This was done by using the following logic:

```
for i in range(len(M)):
    M[i] = max(M[i], rho(hash(f'hash_{i}: {s}')))
```

This performed worse (and was insanely slow), tending to overestime far more
than the original implementation. I want to continue exploring this, and see if
maybe it's just a matter of adjusting the constants involved.

I also tried taking inspiration from older algorithms like `LogLog` and I wanted
to see what would happen if I only took the 70% lowest values instead of all
values for the harmonic mean (bias away from outliers), this was done by
changing the `z` function to:

```python
def z(self) -> float:
    def getLower70Percent():
        return sorted(self.M)[:int(self.m * 0.7)]
    return sum(2**-x for x in getLower70Percent())
```

and multiplying by \\(0.7\\) in the final computation. This performed way worse
than the original implementation, but if I removed the \\(0.7\\) multiplied at
the end, it only slightly underestimated compared to the original. 

## Thoughts

This was a fun exercise, and implementing my own version of this algorithm
greatly improved my understanding of the concepts involved. There's definitely
parts of the proof that invoke concepts from statistics that I'm not super
familiar with anymore, but brushing up on some of those was also a good
experience. I'm glad I got something working, and being able to tweak the
algorithm and see how things change was also interesting. I would definitely
recommend this process to anyone exploring a new area!
