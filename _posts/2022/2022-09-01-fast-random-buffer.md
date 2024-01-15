---
layout: post
title: benchmarking JS random number generation
permalink: /posts/2022-09-01-fast-random-buffer/
---

What's the fastest way to fill a Float32Array with random numbers?

---

The problem is as follows - I have a
[Float32Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array) and I want to fill it up with random numbers. This array might be large! What's the fastest way to do this?

There's a few things to note - the actual values don't have to satisfy any real
properties for my usecase. It just has to be seemingly random, and the range of
numbers generated doesn't really matter.

## Benchmarking

For benchmarking we'll use the following function:

```js
{% include fast_random_buffer/bench.js %}
```
<script src="{{ '/static/fast_random_buffer/bench.js' | relative_url }}"></script>

I'll be including the results on my laptop, but will also provide a button for
you to run the benchmark yourself!

## Using Math.random

This is the naive approach. We can do the following:

```js
{% include fast_random_buffer/0.js %}
```
<button id="run_mr_bench">Run benchmark!</button>
<br>
<code id="mr_bench_res"></code>

<script src="{{ '/static/fast_random_buffer/0.js' | relative_url }}"></script>
<script>
document.getElementById("run_mr_bench").addEventListener("click", async function() {
const res = document.getElementById("mr_bench_res");
res.innerHTML = "";
for (let i = 0; i < 9; i++) {
res.innerHTML += `input: 10^${i}, time taken: ` + benchmark(usingMathRandom, Math.pow(10, i)) + "ms<br>";
}
});
</script>

## Using Crypto.getRandomValues

`Crypto.getRandomValues` takes in a buffer of length up to 65536 and populates
the whole buffer with random values. It only operates on `Uint32Array`s, but we
can share the underlying buffer between a `Float32Array` and a `Uint32Array`.


```js
{% include fast_random_buffer/crypto.js %}
```
<button id="run_crypto_bench">Run benchmark!</button>
<br>
<code id="crypto_bench_res"></code>


<script src="{{ '/static/fast_random_buffer/crypto.js' | relative_url }}"></script>
<script>

document.getElementById("run_crypto_bench").addEventListener("click", async function() {
const res = document.getElementById("crypto_bench_res");
res.innerHTML = "";
for (let i = 0; i < 9; i++) {
res.innerHTML += `input: 10^${i}, time taken: ` + benchmark(usingCryptoRandom, Math.pow(10, i)) + "ms<br>";
}
});
</script>

## Results (time in ms)

### Firefox

<div style="width: 100%; overflow: auto;" markdown="block">

| Array size | Math.random | crypto.getRandomValues |
|------------|-------------|------------------------|
| 10^1       | 1           | 0                      |
| 10^2       | 0           | 0                      |
| 10^3       | 0           | 0                      |
| 10^4       | 1           | 0                      |
| 10^5       | 0           | 2                      |
| 10^6       | 2           | 66                     |
| 10^7       | 31          | 103                    |
| 10^8       | 303         | 1098                   |

</div>

### Chromium

<div style="width: 100%; overflow: auto;" markdown="block">

| Array size | Math.random | crypto.getRandomValues |
|------------|-------------|------------------------|
| 10^1       | 0           | 0                      |
| 10^2       | 0           | 0                      |
| 10^3       | 0           | 0                      |
| 10^4       | 0           | 0                      |
| 10^5       | 3           | 0                      |
| 10^6       | 12          | 8                      |
| 10^7       | 113         | 100                    |
| 10^8       | 1139        | 917                    |

</div>

## Conclusion

I was mildly surprised to see that `Math.random` on ff is so fast. I suppose
that makes sense as it does not need to satisfy any cryptographically secure
properties, but the fact that `crypto.getRandomValues` took a buffer made me
wonder if it was more optimized for this usecase. It's interesting that on
chromium, `Crypto.getRandomValues` is faster than `Math.random`, so maybe the
right choice here depends on the browser. Either way, I'll be sticking to
`Math.random` since it's simpler.
