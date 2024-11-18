---
layout: post
title: Oxidizing argparsh
series: argparsh
---

`argparsh` has too much overhead for some usecases - in this post, I will examine why and use Rust
to build a better solution.

---

`python` is slow. Here's a comparison of `python` start time vs `bash`.

```shell
[I] (base) aneesh@earth:~/a/_/2024$ hyperfine -N 'python -c ""'
Benchmark 1: python -c ""
  Time (mean ± σ):      14.1 ms ±   4.9 ms    [User: 10.6 ms, System: 3.3 ms]
  Range (min … max):     5.9 ms …  28.3 ms    207 runs
 
[I] (base) aneesh@earth:~/a/_/2024$ hyperfine -N 'bash -c ""'
Benchmark 1: bash -c ""
  Time (mean ± σ):       2.8 ms ±   0.4 ms    [User: 0.8 ms, System: 1.9 ms]
  Range (min … max):     1.9 ms …   4.2 ms    744 runs
``` 

This shows that the overhead of just starting python is almost `7x` of starting `bash`. Why is this
a problem? Because the argument parser I built in the [last post]() is written in python. This means
that every invocation of `argparsh` will add (on average) at least `14ms` to the script, before
accounting for any time spent executing real logic within `argparsh`. Consider the example from the
end of the previous post:

```bash
# Create a parser program
parser=$({
  argparsh new $0 -d "argparsh example" -e "bye!"
  argparsh add_arg "a" -- \
    --choices "['a', 'b', 'c']"\
    --help "single letter arg"
  argparsh add_arg -i --interval -- --type int --default 10
  argparsh add_arg -f -- --action store_true

  argparsh subparser_init --required true
  argparsh subparser_add foo
  argparsh subparser_add bar

  argparsh add_arg --subparser foo qux
  argparsh set_defaults --subparser foo --myarg foo

  argparsh add_arg --subparser bar baz
  argparsh set_defaults --subparser bar --myarg bar
})
```

There are 11 `argparsh` calls! This means that before any "real" script logic is executed we need to
wait for python to initialize 11 times, and then create the argument parsing state. To quantify the
impact of this, I wrote a small benchmark that simulates running a script that uses `argparsh`:

```bash
# run as PARSER=argparsh bench.sh - later in the post we will be use "other" parsers
parser=$({
  $PARSER new $0
  $PARSER new $0
  $PARSER new $0
  $PARSER new $0
  $PARSER new $0
  $PARSER new $0
  $PARSER new $0
  $PARSER new $0
  $PARSER new $0
  $PARSER new $0
})

echo $parser
```

Running this benchmark I see:
```shell
[I] (base) aneesh@earth:~/a/r/argparsh$ hyperfine 'env PARSER=argparsh bash bench.sh'
Benchmark 1: env PARSER=argparsh bash bench.sh
  Time (mean ± σ):     262.4 ms ±  11.1 ms    [User: 222.2 ms, System: 40.4 ms]
  Range (min … max):   253.0 ms … 283.4 ms    10 runs
```

Since we expect python to take around 140ms to just start in this benchmark, this means that `120ms`
is spent running the actual code.

## Rewrite It In Rust

Rewrite It In Rust (or RIIR) is something of a meme in the software development community. As a
sucker for memes - I hopped on the bandwagon and began rewriting my slow python script as a fast
rust program.

In seriousness, beyond Rust's reputation for being a more humane way to write high performance
programs than C or C++, my [prior experiences]() using `PyO3` left a lasting impression on me. The
python/Rust boundary is far more pleasant to work with than the C++/python combination (and I'm no
stranger to working with codebases that mix C++ and python! I've been doing so professionally for a
few years).

Working in Rust was very fun, and I think I would have only been marginally faster in C++. I think
this is largely because of the awesome ecosystem of third party libraries. Being able to easily
change what format I was serializing/deserializing to during development was very convenient.

Here's how my rewrite performs:

```shell
[I] (base) aneesh@earth:~/a/r/argparsh$ hyperfine 'env PARSER=./target/release/argparsh bash bench.sh'
Benchmark 1: env PARSER=./target/release/argparsh bash bench.sh
  Time (mean ± σ):      68.9 ms ±   4.5 ms    [User: 16.8 ms, System: 53.0 ms]
  Range (min … max):    55.0 ms …  76.7 ms    43 runs
```

About `4x` faster than the python version! Here's some of the fun things I
encountered during development:

### Embedding code in PyO3
The final steps of assembling the parser and parsing the CLI args is still done
in python. This is because python's `argparse` allows for easy untyped access to
all parsed values - something that `clap` and other Rust parsers don't easily
allow. I think there is a future where I could rewrite this to not rely on any
python, but it requires more time than I wanted to spend on this project for
this week. `PyO3` made it super easy to embed parts of the original python code
in my `Rust` program. I think that incrementally upgrading a codebase from
`python` to `Rust` might be far easier than going from `python` to `C++`, or even
`C++` to `Rust`!

### Finding a fast serialization format
My initial implementation used [serde-qs](https://crates.io/crates/serde_qs/) to
serialize the arguments. However, `serde-qs` will fail to serialize/deserialize
structs where all fields are `Option`s that are set to `None`. However, I
realized that similar to the python implementation I could instead use any
binary serialization format, then encode the bytes as a query string. I found
[this benchmark](https://github.com/djkoloski/rust_serialization_benchmark)
comparing a bunch of different serialization formats. I chose
[bitcode](https://crates.io/crates/bitcode/0.6.3) since it did well on the
benchmark. Along the way I tried a few others though, and I like how easy it was
to try different formats quickly. This was mainly because modifying the
dependencies of the program was super easy - this would have been a nightmare to
do in `C++`.

### Flushing buffers

One of the issues I ran into was that my existing test suite was failing when running the new
binary! In particular, in cases where the test suite was supposed to detect `argparsh` emitting a
`exit` command after invalid argument were parsed, no output was detected on stdout. After poking
around a bit I was able to determine that the issue was that the python interpreter was buffering
stdout/stderr, but was unable to flush the buffer before the program exited. I tried to find a
`PyO3` equivalent to `python -u`, but in the end, I solved this by using explicit calls to
`stdout.flush()`.

## Conclusions

Here's some of my overall thoughts from this process.

+ Python startup time is atrocious.
+ Python isn't that slow for short programs
+ Python is great for prototyping but there isn't an easy way to go from python program to a fast
  native program.
    + Existing python compilers focus solely on numerical/data science workloads, but not general
    programs
+ Rust's strong ecosystem makes it a good choice for rewriting
+ Command line interfaces are interfaces - if the interface is well designed
  it's not too hard to change the implementation. (I've always been vaguely
  aware of this idea, but gained a greater appreciation for it during this
  project)
