---
layout: post
title: interactive real time circle packing
permalink: /posts/2022-06-29-circle-packing/
---

Try out my circle packing project with your webcam!

---

Since my [last post](../2022-06-23-circle-packing), I've integrated my circle
packing implementation with my [video synth](/video-synth), and now you can run
circle packing with you webcam! I've included some nice effects with the
implementation here to make it look better!

<link rel="stylesheet" href="{{ '/static/pi_digits/style.css' | relative_url }}">
<style>
canvas {
width: 100%;
}
</style>
<script src="{{ '/static/circle_packing/synth_webcam/circlepacking.standalone.js' | relative_url }}"></script>
<script src="{{ '/static/circle_packing/synth_webcam/post.js' | relative_url }}"></script>

<div id="container" style="width: 100%; border: solid 1px; padding: 0.5em;">
<button id="start"> Start! </button>
<div id="synthcontainer" style="display: none;">
<canvas id="synth"></canvas>
<label for="randomize">Re-solve circles</label>
<input type="checkbox" id="randomize" checked />
</div>
</div>
