---
layout: post
title: Color Reactor
permalink: /posts/2021-01-16-color-reactor/
---

A looping animation made with my [video synthesizer]({{ '/video-synth' | relative_url }})

---
<script src="{{ '/static/color_reactor/synth.build.js' | relative_url }}" type="text/javascript"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
const btn = document.getElementById("start");
btn.addEventListener('click', async function() {
await loadTwgl();
const root = "{{ '/static/color_reactor' | relative_url }}"
const savedata = "/reactor.savedata";
loadStaticSynth(document.getElementById("canvas"), root, savedata);
btn.remove();
});
});
</script>

Click start to run the program. (Better hardware will render this faster / in
higher quality - runs ok on my mid-tier android phone, but causes a noticeable
amount of lag)

<button id="start">Start</button>
<canvas id="canvas" style="width: 100%"></canvas>
