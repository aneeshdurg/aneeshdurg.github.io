---
layout: post
title: building a fractal - episode 1
permalink: /posts/2021-12-29-building-a-fractal/
---

Let's try to construct some fractals!

---

<link rel="stylesheet" href="{{ '/static/pi_digits/style.css' | relative_url }}">
<style>
canvas {
width: 100%;
}
</style>
<script src="{{ '/static/20211228_fractal/script.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/20211228_fractal/post.js' | relative_url }}" type="text/javascript"></script>

<div style="width:100%">
<canvas id="canvas1" style="width:33%"></canvas>
<canvas id="canvas2" style="width:33%"></canvas>
<canvas id="canvas3" style="width:32%"></canvas>
<p><i>These aren't static images - they're computed on the fly!</i></p>
</div>
<br>

It's no secret that I [love](/posts/dragon-fractal)
[fractals](/posts/visualizing-mandelbrot). Today we're going to try to build our
a fractal with nothing more than some regular polygons you might have lying
around. However, there's a slight twist. I'm not just interested in drawing this
fractal, but instead finding a general representation for a class of fractals.
Let's start with defining the fractals I'm trying to find.

## the problem

The basic construction for this fractal is that we construct a regular
polygon, then on every vertex of that polygon, We construct a smaller version
of the same polygon, and then on the verticies of the smaller polygon, I want
even smaller polygons and so on. The catch is that no polygon should intersect a
polygon of the same size. While this defines *a* class of fractals, what I want
is a slight refinement. I want to find, for a given \\(n\\) where \\(n\\) is the
number of sides of the polygon, what is the largest scaling factor \\(f\\), that
the size of the polygon needs to reduce by such that the resulting fractal has
the non-intersection property.

We know that for \\(n = 4\\), \\(f = \frac{1}{2}\\). Here's an animation
showing the construction of this fractal.

<div style="width: 100%; border: solid 1px; padding: 0.5em">
<button id="start1">Start animation</button>
<canvas id="canvas4"></canvas>
<script>
document.addEventListener("DOMContentLoaded", async function() {

});
</script>
</div>

We can convince ourselves that a factor of \\(0.5\\) is in fact the largest
possible factor by noting that \\(\sum_{n=1}^{\infty} \left(\frac{1}{2}\right)^n = 1\\)
, so anything larger that \\(0.5\\) would intersect before infinite iterations.

## so what is the factor for an arbitrary \\(n\\)?

I don't know yet - a future post will cover my work so far.
But, to help approach this problem, I made a visualization that we can play with
different values of \\(n\\) and \\(f\\) for to see what happens.

<div style="display:none;">
\\(a_b\\)
</div>

<div style="width: 100%; border: solid 1px; padding: 0.5em">
<canvas id="canvas5"></canvas>

<label for="enable-animation">Enable animation:</label>
<input type="checkbox" id="enable-animation" checked/>
<br>

<label for="f-input">f:</label>
<input type="number" min="0" max="1" value="0.5" step="0.01" id="f-input"/>
<br>
<label for="n-input">n:</label>
<input type="number" min="3" value="4" step="1" id="n-input"/>
<br>
<label for="level-input">Levels to render:</label>
<input type="number" min="0" value="5" step="1" id="level-input"/>
</div>

This tool has helped me explore some different factors and I've found some good
upper/lower bounds on \\(f\\) for various values of \\(n\\) (see the art at the
top of the post). The tools has also just been a good way to find some aesthetic
patterns like this one:

<div style="width: 100%; border: solid 1px; padding: 0.5em">
<canvas id="canvas6"></canvas>
</div>

## what's next?

So I've done some math and come up with various hypothesis that turned out to be
false. In my next post, I hope to detail those approaches. For now, I'm probably
just going to let the problem set in my head, and maybe this will all turn out
to be some painfully obvious thing.

The rest of this post will talk about how I rendered the fractals above.

## visualization tricks

So my first approach to visualizing this was painfully slow. It was basically
the following:

```
for i in range(0, lvl):
    draw_level(i)

def draw_level(i, location):
  if i == 0:
     draw a n-gon at location
     return
  
  for each vertex v of a n-gon centered at location:
     draw_level(i - 1, v)
```

this is \\(O(n^{lvl})\\) which gets slow fast! So I changed it to this:

```
for i in range(0, lvl):
    draw_level(i)

def draw_level(i, location):
  if i == 0:
     create a offscreen buffer b
     s = 1 / (1 - f)
     resize b to (3s, 3s) # 2 * s is probably enough
     draw a n-gon at (1.5s, 1.5s) on b
     return b
  
  b = draw_level(i - 1, v)
  for each vertex v of a n-gon centered at location:
    draw b centered at v
```

which is \\(O(n * lvl)\\). This makes it fast enough to draw hundreds of levels
in milliseconds!

It might seem strange that I redo a lot of work because I only
draw one level at a time, instead of drawing all levels while iterating, but
that was so that I could view a single level and inspect it to see if it had the
properties I was looking for without as much noise.
