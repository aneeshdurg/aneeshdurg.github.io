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

<div id="errors">
<div class="isa_error" onclick="(() => { fadeOutEl(this); })()">
Computing digits around 1,000,000 will take around 30s. At significantly
higher values, your browser may hang. In some cases this may even cause your
entire OS to crash. This seems to be a bug in Firefox on MacOSX.
<br><br>
Click this message to dismiss.
</div>
</div>

<input id="pi_input" value="1600"/>
<button onclick="get_pi_digit()">Compute!</button>
<script>
document.addEventListener('DOMContentLoaded', get_pi_digit);
</script>
<div id="container"></div>

The image above displays the values computed to calculate the \\(n^{th}\\) digit
of \\(\pi\\).
I intend to eventually fill in more details about how this works and what the
colors are, but for now, the results are above. If you open the console there's
some information about how long each step of the process took.

On my machine, computing the millionth digit takes around `30s`. At numbers
significantly above 1m, I saw firefox crashing OSX and strange results that
seemed innaccurate. By default the UI above disables calculating numbers above
1.2m. If you'd like to override this behavior, open the console and enter (at
your own risk):

```javascript
window.piCalcAllowLargeCalculations = true;
```

To compute this using WebGL, I created a fragment shader that converts pixel
coordinates to 1 dimensional indicies and then uses that to determine which
elements of the sum it should compute by using that index as the value for
\\(k\\).  Since we have four output channels for `RGBA` we can compute each of
the 4 terms in the formula and write the result to one of the output channels.
Then, using another shader, we compute the sum of each `16x16` block in
parallel. Finally, we take the output of that shader and sum the block sums and
multiply the scalar coefficients on the CPU.

You can tweak the value that controls the size of the block sum with with:

```javascript
window.piCalcScale = <your number here>;
```

At sizes above 32, I noticed errors in the computation (probably due to
overflow), although it was faster. I tried having the sum program run
iteratively, computing the block sums in parallel until the totaly number of
elements to sum was less than some threshold, but for 1m elements, it did not
makes things faster. I assume it would have a bigger impact for larger sizes of
\\(n\\), but they aren't supported by this calculator anyway.

You can find the source code for this project here 
[https://github.com/aneeshdurg/webgl-pi-digits](https://github.com/aneeshdurg/webgl-pi-digits).
