---
layout: post
title: real time circle packing - now in real time!
permalink: /posts/2022-06-17-circle-packing/
---

In which the author finally "finishes" a project. (okay, this wasn't actually
the end goal, but it's like 90% done, i swear)

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
const shader_path = "{{ '/static/circle_packing/ver7/compute.frag.c' | relative_url }}";
</script>
<script src="{{ '/static/circle_packing/ver7/script.js' | relative_url }}" type="text/javascript"></script>

The render speed is <30ms! (on my laptop anyway)

Check out the demo here:

<div id="container" style="width: 100%; border: solid 1px; padding: 0.5em;">
<button id="start">Start!</button>
<code id="stats"></code>
<br>
</div>
<script>
document.addEventListener("DOMContentLoaded", async function() {
await loadTwgl();
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

TODO - write something about the journey/learning along the way!

To summerize:
 - avoid calling canvas.width/canvas.height in tight loops
 - use typed arrays when possible, and if not, try to only pack lists with POD
   types (object lists suck).

