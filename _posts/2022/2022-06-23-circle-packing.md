---
layout: post
title: real time circle packing - animated edition!
permalink: /posts/2022-06-23-circle-packing/
---

In which the author finally "finishes" a project. We finally have real time
circle packing!

---

<link rel="stylesheet" href="{{ '/static/pi_digits/style.css' | relative_url }}">
<style>
canvas {
width: 100%;
}
</style>
<script src="{{ '/static/circle_packing/post.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/circle_packing/webgl-common/common.js' | relative_url }}"></script>
<script src="{{ '/static/circle_packing/common.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/circle_packing/twgl-full.min.js' | relative_url }}" type="text/javascript"></script>
<script>
const img_path = "{{ '/static/circle_packing/image.jpeg' | relative_url }}";
const shader_path = "{{ '/static/circle_packing/ver8/compute.frag.c' | relative_url }}";
</script>
<script src="{{ '/static/circle_packing/ver8/script.js' | relative_url }}" type="text/javascript"></script>

While the [last post](../2022-06-17-circle-packing) had good performance, it had
one fundamental limitation - it was absolutely hammering the GPU with render
requests. A single run could make approximately 200 render calls! This was
leading to times of around 500ms per full render. The new version takes 10ms (on
my weaker laptop), and it can be run
in a loop as shown in the demo below!

Note that while the box below displays the initial render time, the code does
not use the previous rendered state to speed up future renders - the only
difference between the first and following renders is time spent allocating
framebuffers, which is negligible.

<div class="isa_error" onclick="(() => { fadeOutEl(this); })()">
I don't know if this is "flashy" enough to be a problem for some users, but
please use caution before pressing "Start Animation!"
</div>

<div id="container1" style="width: 100%; border: solid 1px; padding: 0.5em;">
<button id="start1">Start Animation!</button>
<button id="stop1" disabled>Stop Animation!</button>
<br>
</div>
<script>
let cancel_animation = false;
let finished_promise = null;
let finished_cb = null;
document.addEventListener("DOMContentLoaded", async function() {
const container = document.getElementById("container1");

const stats = document.createElement("code");
container.appendChild(stats);
const draw = await ver8_main(container, img_path, shader_path);
const start = performance.now();
draw();
const time = performance.now() - start;
stats.innerText = "Initial render in " + time + "ms";

const loop = () => {
draw();
if (cancel_animation) {
finished_cb();
} else {
requestAnimationFrame(loop);
}
};

const btn_stop = document.getElementById("stop1");
const btn_start = document.getElementById("start1");

btn_start.onclick = () => {
btn_start.disabled = true;
finished_promise = new Promise((r) => {
finished_cb = r;
requestAnimationFrame(loop);
});
btn_stop.disabled = false;
};

btn_stop.onclick = async () => {
btn_stop.disabled = true;;
cancel_animation = true;
await finished_promise;
cancel_animation = false;
btn_start.disabled = false;
};
});
</script>

So how did I achieve this massive (50x) speedup? I tried a few different things,
such as implementing some radius based heuristics to improve the probability
that selected circles wouldn't conflict, thus reducing the expected number of
renders required. This had little impact. The next thing was to try precomputing
the radius' of all points to at least remove CPU latency. However, CPU was not
the bottleneck to begin with so this only had a modest impact, and wouldn't be
suitable when we switch over to using webcam input anyway.

While thinking about the problem, I realized that until now I'd been thinking
about constructing a solution set by iteratively adding new points to the
output. However, another way of looking at the problem is to start by selecting
every pixel, and remove pixels that aren't part of the solution. We also have
bounds on the max radius, so we know for every pixel, the full set of pixels
that might hold circles that could collide with the current pixel. Since every
pixel probably collides with its immediate neighbors, we also need some source
of randomness to give some notion of priority so that every circle doesn't
delete itself. This approach is also good because all of these steps can be done
on the GPU.

Thus, the algorithm implemented is as follows:

+ `img` \\(\leftarrow\\) copy input image to a webgl buffer
+ `random_buf` \\(\leftarrow\\) create a \\(n\\) x \\(n\\) gl buffer and
  initialize it with random values between \\(0\\) and \\(1\\).
+ `radius_buf` \\(\leftarrow\\) for every pixel in `img` compute the radius of
  the circle that would be drawn at that point if selected.
+ `selected_circles` \\(\leftarrow\\) for every pixel in radius buf, check every
  pixel that is up to `MAX_RADIUS` px away. If the circle at that pixel
  would not collide with the circle at the current pixel or the corresponding
  value in `random_buf` for that pixel is less than the value in `random_buf`
  for the current pixel output the current radius, otherwise output \\(0\\).
+ As output, for every pixel, check every pixel that is up to `MAX_RADIUS`
  away. If any pixel has a non-zero value and a radius large enough to include
  the current pixel in the circle, draw the circle.

Now, there's virtually no work done on the CPU! The only thing we need to do on
the CPU for every frame is initialize the random buffer, which is pretty fast!
This doesn't give us a completely optimal solution, and we could get better
solutions by this this multiple times and keeping old results around, but that's
not really necessary for this effect to look good.

The final steps will be to integrate this with my [video synth](/video-synth),
so that I can combine it with other effects and inputs (such as webcam input
:D).
