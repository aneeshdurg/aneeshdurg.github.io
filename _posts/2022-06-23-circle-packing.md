---
layout: post
title: real time circle packing - animated edition!
permalink: /posts/2022-06-23-circle-packing/
---

Let's make one final version of the circle packing code and verify that it works
in a real time loop!

---

<link rel="stylesheet" href="{{ '/static/pi_digits/style.css' | relative_url }}">
<style>
canvas {
width: 100%;
}
</style>
<script src="{{ '/static/circle_packing/post.js' | relative_url }}" type="text/javascript"></script>
<script src="https://aneeshdurg.me/webgl-common/common.js"></script>
<script src="{{ '/static/circle_packing/common.js' | relative_url }}" type="text/javascript"></script>
<script>
const img_path = "{{ '/static/circle_packing/image.jpeg' | relative_url }}";
const shader_path = "{{ '/static/circle_packing/ver8/compute.frag.c' | relative_url }}";
</script>
<script src="{{ '/static/circle_packing/ver8/script.js' | relative_url }}" type="text/javascript"></script>

While I thought the previous post had good performance, when I tried to run it
in a loop, it would take 500ms between calls! This was absolutely ridiculous and
it was due to a couple things - computing the radius for every pixel serially
was super slow, but computing it in parallel on the gpu and then reading it back
to memory was even slower! This is partly because the gpu/cpu bandwidth isn't
great and partly because `readPixels` is blocking and acts as a synchronization
point between the gpu pipeline and the js runtime (as far as I understand)

The new version takes 10ms (on my weaker laptop), and it can be run in a loop as
shown in the demo below!

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
await loadTwgl();
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

TODO - add some description of the new approach
