---
layout: post
title: Visualizing the Mandelbrot Set using WebGL
permalink: /posts/visualizing-mandelbrot/
---

Can't call myself a math nerd without doing this right?

---
<link rel="stylesheet" href="{{ '/static/mandelbrot/style.css' | relative_url }}">
<script src="{{ '/static/webgl-common/common.js' | relative_url }}"></script>
<script src="{{ '/static/mandelbrot/src/script.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/mandelbrot/post.js' | relative_url }}" type="text/javascript"></script>
<script>
const root = "{{ '/static/mandelbrot/src' | relative_url }}";
</script>

<canvas id="glcanvas"></canvas>

Click/double-click on the canvas to zoom in/out!

Today I thought I'd work on a really quick vizualization of the mandelbrot set.
It's one of the most iconic images when it comes to showing of beautiful
structures in math. The mandelbrot set is defined as follows:

\\[ \\{c \text{ } \forall c \in C\text{ if }F_n\text{ is bounded as } n\rightarrow \infty \\} \\]
where \\(F_{n + 1}(c) = F_n^2(c) + c\\) with \\(F_0(c) = 0\\), \\(C\\) is all complex numbers.

In the program above, "divergence" of the sequence \\(F\\) is approximated by
whether the computation for one element of the sequence ever exceeds the maximum
value for a 32-bit float. That was sufficient to get the iconic mandelbrot
shape.

The colors visualize how quickly the series diverges. You can see the source
code for this project here:
[https://github.com/aneeshdurg/mandelbrot](https://github.com/aneeshdurg/mandelbrot).
