---
layout: post
title: real time circle packing - now in real time!
permalink: /posts/2022-06-17-circle-packing/
---

Breathing life into what I thought was an abandonded project.

---

<link rel="stylesheet" href="{{ '/static/pi_digits/style.css' | relative_url }}">
<style>
canvas {
width: 100%;
}
</style>
<script src="{{ '/static/circle_packing/post.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/circle_packing/webgl-common/common.js' | relative_url }}"></script>
<script src="{{ '/static/circle_packing/twgl-full.min.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/circle_packing/common.js' | relative_url }}" type="text/javascript"></script>
<script>
const img_path = "{{ '/static/circle_packing/image.jpeg' | relative_url }}";
const shader_path = "{{ '/static/circle_packing/ver7/compute.frag.c' | relative_url }}";
</script>
<script src="{{ '/static/circle_packing/ver7/script.js' | relative_url }}" type="text/javascript"></script>

So it's been almost a year since my [last
post](../2021-07-16-circle-packing/) in this series, but I've made some huge
improvements! The render speed is now about 500ms (18x improvement)! (on my laptop anyway)

Check out the demo here:

<div id="container" style="width: 100%; border: solid 1px; padding: 0.5em;">
<button id="start">Start!</button>
<code id="stats"></code>
<br>
</div>
<script>
document.addEventListener("DOMContentLoaded", async function() {
const btn = document.getElementById("start");
btn.onclick = async () => {
const start = performance.now();
const container = document.getElementById("container");
for (let elem of container.getElementsByTagName("canvas")) {
elem.remove();
}
ver7_main(document.getElementById("container"), img_path, shader_path);
};
});
</script>

So fast :o

How did we get here? The biggest change was to realize that copying data
between the GPU and CPU is very slow. `readPixels` in particular is a bad thing
to call in a loop as it forces the GPU to perform a sync every time, and ruins
the normally pipelined GPU performance. This was avoided by just implementing
the final step of drawing circles to also happen on the GPU - thereby
eliminating the need to call `readPixels`.

Additionally, I decided to sacrifice quality for speed. Instead of outputting a
1000x1000px image, it's now a 500x500px image. Additionally, the circle radius
parameters were tweaked, and the number of desired circles was dropped.

A really unexpected find was that `canvas.width/height` is very slow to access.
I gained approximately a 2x speedup just by caching those values.

The final improvement was to try to use typed arrays where possible, and if not
possible, to at least not use arrays of objects, preferring multiple arrays of
numeric types instead. This hsa to do with the JS engine's optimizations of
more efficiently representing arrays of simple types as vectors of that type. I
guess current JS compilers don't try to turn objects into structs (tested on ff
and chrome). Interestingly preallocating arrays had no real performance impact.
That might in part be that these arrays are too small to benefit from that, but
it might also be that js uses a well performing vector implementation when it
can.

When I intially made this post, I thought I was getting render speeds of <30ms,
which was my goal all along, but I realized that my timing info actually didn't
account for the time taken to perform all the render calls I was making. I
discovered this when trying to run this in a loop, and noticed abysmal
framerates (2fps). Throwing in a `gl.finish` revealed that generating all the
content I wanted took 500ms, matching the observed 2fps. However, hope was not
lost, working on this gave me a an idea for a better implemention. See you in
the next post!
