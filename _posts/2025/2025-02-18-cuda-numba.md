---
layout: post
title: Using Python on the GPU
---

I recently had a slow python script that seemed like a good workload to
accelerate on the GPU. This post goes over some of my thoughts regarding that
experience!

---

A while ago, I saw a youtube recording of a talk some nvidia engineers gave on how
they've been able to integrate CUDA and Python. This seemed like an interesting
tool, but at the time I didn't really have a need for it. Yesterday, I was
frustrated with some slow python scripts I wrote to simulate the performance of
some recorded packet captures of distributed applications when run with various
network topologies. I realized that this problem explores a very large search
space, but each simulation is completely independent of others in terms of
writes to memory. Further, each simulation only needs a small amount of data -
summaries of traffic at each timestamp (which was already preprocessed and
extracted from the raw packet captures) which was at most a few megabytes. This
seemed like the perfect workload to accelerate with a GPU!

Here's what my original code looked like (details omitted/simplified for
brevity)

```python
# Parameters based on collected data
n_nodes = ...
n_timestamps = ...

# This reads on-disk summaries of the application and provides a traffic matrix
# for a given timestamp
def read_summary_at_time(timestamp: int) -> np.matrix:
    ...

@dataclass
class Node:
    """A single node in the network"""
    ...

@dataclass
class Topology:
    ...
    # This represents the 'next-hop' for every path, i.e.:
    # paths[(i, j)] = k means that traffic from i -> j will be first routed to k
    paths: dict[tuple[Node, Node], tuple[list[Node], float]]
    # This is computable based off of some input parameters
    n_configs: int = ...

    def set_config(self, config_id: int):
        # We have a way to enumerate all the topologies we'd like to test, but
        # even better, this enumeration is a very simple mapping that also
        # allows starting with a number and generating the topology at that
        # index
        ...
        self.paths = ...

tp = Topology(...)

# Compute some metric based on the traffic_matrix and a network topology
def simulate(tp, traffic_matrix, config_id) -> int:
    paths = tp
    # The expensive step of this simulation is projecting the traffic on to the
    # paths to find the total number of bytes transferred over the network
    ...

def process_ts(perm, ts):
    tp = Topology(ocs)

    matrix = read_summary_at_time(ts)
    # Permute the positions of nodes
    permuted_matrix = np.zeros((n_nodes, n_nodes))
    for i in range(n_nodes):
        for j in range(n_nodes):
            permuted_matrix[i][j] = matrix[perm[i], perm[j]]

    ms = []
    for i in range(tp.n_configs):
        m = simulate(tp, permuted_matrix, i)
        ms.append(m)
    return [ms]


# My original implementation had some basic parallelization
with mp.Pool(processes=32) as pool:
    for p in itertools.permutations(range(n_nodes)):
        ts_costs = pool.starmap(process_ts, ((p, i) for i in range(n_timestamps)))
        # Do some processing with the collected data...
```

And the GPU accelerated version only required a few tweaks:

```python

# Parameters based on collected data
n_nodes = ...
n_timestamps = ...

# This reads on-disk summaries of the application and provides a traffic matrix
# for a given timestamp
def read_summary_at_time(timestamp: int) -> np.matrix:
    ...

@dataclass
class Node:
    """A single node in the network"""
    ...

@dataclass
class Topology:
    ...
    # This represents the 'next-hop' for every path, i.e.:
    # paths[(i, j)] = k means that traffic from i -> j will be first routed to k
    paths: dict[tuple[Node, Node], tuple[list[Node], float]]
    # This is computable based off of some input parameters
    n_configs: int = ...

    def set_config(self, config_id: int):
        # We have a way to enumerate all the topologies we'd like to test, but
        # even better, this enumeration is a very simple mapping that also
        # allows starting with a number and generating the topology at that
        # index
        ...
        self.paths = ...

tp = Topology(...)

# Pre-compute all next-hop matrices for all configurations
adjacencies = []
for p in range(tp.n_configs):
    tp.set_config(p)
    paths = tp.paths

    matrix = np.zeros((num_groups, num_groups), dtype=np.uint64)
    for i in range(num_groups):
        for j in range(num_groups):
            if i == j:
                matrix[i, j] = i
            else:
                matrix[i, j] = paths[(i, j)]
    adjacencies.append(matrix)
adjacencies = np.array(adjacencies)


# Read all the summaries upfront
with mp.Pool(processes=32) as pool:
    traffic_per_ts = pool.map(read_summary_at_time, range(n_timestamps))
traffic_per_ts = np.array(traffic_per_ts)


def factorial(x: int) -> int:
    if x <= 1:
        return 1
    total = 1
    for i in range(2, x + 1):
        total *= i
    return total

# Enable calling `factorial` on the GPU
cu_factorial = cast(Callable[[int], int], cuda.jit(factorial))


# Find the n'th permutation of [0,...,num_groups-1]
@cuda.jit
def get_permutation(n: int, output):
    numbers = cuda.local.array(num_groups, dtype=np.uint32)
    for i in range(num_groups):
        numbers[i] = i + 1

    curr = n
    for i in range(num_groups - 1, -1, -1):
        v = cu_factorial(i)
        skip = curr // v
        d = 0
        pick = 0`
        while True:
            if numbers[pick]:
                if skip == 0:
                    d = numbers[pick]
                    numbers[pick] = 0
                    break
                skip -= 1
            pick = (pick + 1) % num_groups
        output[num_groups - (i + 1)] = d
        curr %= v

    for i in range(6):
        output[i] -= 1


@cuda.jit
def simulate(output, adjacencies, traffic_per_ts):
    ts: int = cuda.blockIdx.x
    perm_id: int = cuda.blockIdx.y
    config_id: int = cuda.blockIdx.z

    perm = cuda.local.array(num_groups, dtype=np.uint32)
    get_permutation(perm_id, perm)

    # The body of my original `simulate` function, but the paths come from
    # adjacencies[config_id]
    # The traffic from i->j needs to be accessed as:
    #   traffic_per_ts[ts][perm[i], perm[j]]
    # Since we don't have an explicit traffic permutation step before
    ...

    output[ts][perm_id][ocs_state] = total_bytes

d_traffic_per_ts = cuda.to_device(traffic_per_ts)
d_adjacencies = cuda.to_device(adjacencies)

b_dim = (n_timestamps, factorial(n_nodes), tp.n_configs)

output = np.zeros(b_dim, dtype=np.uint64)
d_output = cuda.to_device(output)

simulate[b_dim, (1, 1)](d_output, d_adjacencies, d_traffic_per_ts)
output = d_output.copy_to_host()
# Analysis can now be done by accessing output[timestamp][permutation_id][config_id]
```

The code changes were small but significant. The way CUDA in python works is by
using [numba](https://github.com/numba/numba/), a python JIT compilation
library. `numba` can only compile a subset of python, so using things like
`dataclasses` is tricky, and generally not advisable (unless you really have a
lot of spare time to figure out how to get things to work right). To work around
that, I had to precompute all the configurations I cared about and pack them
into a numpy array. This worked pretty well for me since my data types were all
easily representable as a matrix. To take full advantage of the parallel
capabilities of this execution model, I also had to be able to take some kind of
execution id and turn it into the permutation list I wanted instead of serially
generating permutations via `itertools`. There's some combinatorial tricks in
there, and while I derived the implementation myself, it also seems like the
sort of thing that's readily available online, or easily generated by an AI. The
final piece is to avoid the need for IO, and I was able to just read all the
timestamped summaries in one go and pack that into an array of matrices for the
GPU. My GPU accelerated implementation was almost 100x faster, which greatly
improves my ability to try new parameters/applications with this script.

The best part about using python in this way was the easy interoperability with
`numpy`. The worst part was `numba`'s compiler errors. `numba` cannot provide
good error reporting, and so you need to stare at a messy traceback and a
message about data type mismatches and try to correlate that with the code being
compiled to figure out what needs to change. This was pretty painful even though
the code that I was porting wasn't super complicated.

## Thoughts/Conclusions

Overall, using `numba.cuda` is a nice way to accelerate python scripts,
however, it isn't really feasible to have zero code changes unless your initial
code was incredibly trivial. I think it's a good choice for the kind of script I
was accelerating in this post, but I think for some larger projects I'd want to
either use CUDA directly, or even use other languages/compilers targeting
SPIR-V. The main reason for me is that it's frustrating to be restricted to a
relatively narrow subset of python with a lot of friction when trying to use
other existing code infrastructure. Additionally, `numba`'s funky error
reporting just seems more painful to work with than just using CUDA C++, not to
mention the fact that a lot of `numba`'s code is missing type information,
making the developer experience significantly worse than CUDA's C++ libraries,
which just work (tm) with `clangd` (and presumably any other LSP/code
intelligence implementations).

That being said, I think `numba.cuda` is really cool. I think if you can
decompose your problem into small relatively simple kernels, using `numba.cuda`
might be a decent experience, and for small one-off scripts, it's really
powerful. I'm definitely happy to add this tool to my toolbox.
