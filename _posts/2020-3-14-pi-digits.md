---
layout: post
title: Computing digits of Pi
permalink: /posts/computing-digits-of-pi/
---

Happy \\( \pi \\) day! In the spirit of \\( \pi \\) day, I wanted to compute the
millionth digit of \\( \pi \\) using my GPU! 

---

<link rel="stylesheet" href="{{ '/static/pi_digits/style.css' | relative_url }}">
<script src="{{ '/static/pi_digits/src/script.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/pi_digits/post.js' | relative_url }}" type="text/javascript"></script>
<script>
const root = "{{ '/static/pi_digits/src' | relative_url }}";
</script>

## Computing the millionth digit of Pi

To start things off, we need an actual method of computing digits of \\( \pi
\\). For that I used the
[Bailey-Borwein-Plouffe formula](https://en.wikipedia.org/wiki/Bailey–Borwein–Plouffe_formula)
as given below:

\\[
\pi = \sum\_{k=0}^{\infty} \left[
    \frac{1}{16^k} \left(
        \frac{4}{8k + 1} - \frac{2}{8k + 4} - \frac{1}{8k + 5} - \frac{1}{8k + 6}
    \right)
\right]
\\]

Note that this formula will compute values in base 16 (hexadecimal) for us.

From here we can obtain a
[spigot algorithm](https://en.wikipedia.org/wiki/Spigot_algorithm)
for computing the \\( n^{th} \\) term:

\\[
\sum\_{k=0}^{n} \left[
    16^{(n - k)} \left(
        \frac{4}{8k + 1} - \frac{2}{8k + 4} - \frac{1}{8k + 5} - \frac{1}{8k + 6}
    \right)
\right] + 
\sum\_{k=n+1}^{\infty} \left[
    \frac{1}{16^{(k - n)}} \left(
        \frac{4}{8k + 1} - \frac{2}{8k + 4} - \frac{1}{8k + 5} - \frac{1}{8k + 6}
    \right)
\right] 
\\]

By taking only a few terms of the infinite sum, we should have a pretty good
approximation to the value of the \\(n^{th}\\) digit.

## WebGL implementation

Here's the final result. I computed the actual millionth digit to be \\(C\\).

<div class="isa_error" onclick="this.remove()">
Computing digits around 1,000,000 will take around a minute. At significantly
higher values, your browser may hang. In some cases this may even cause your
entire OS to crash. This seems to be a bug in Firefox on MacOSX.
<br>
<br>
Click this message to dismiss.
</div>

<input id="pi_input" value="1600"/>
<button onclick="get_pi_digit()">Compute!</button>
<script>
document.addEventListener('DOMContentLoaded', get_pi_digit);
</script>
<div id="container"></div>

I intend to eventually fill in more details about how this works and what the
colors are, but for now, the results are above. If you open the console there's
some information about how long each step of the process took.
