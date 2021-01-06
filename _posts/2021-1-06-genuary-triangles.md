---
layout: post
title: Genuary 2021 - day 6
permalink: /posts/Genuary 2021-day6/
---

Drawing triangles for [#genuary2021](https://genuary2021.github.io/)

---

<script src="{{ '/static/genuary2021/day6/script.js' | relative_url }}" type="text/javascript"></script>

Genuary is a series of prompts to inspire generated art in the month of January.
You can find a list of the prompts here:
[https://genuary2021.github.io/prompts](https://genuary2021.github.io/prompts)

The prompt for today was `"Triangle subdivision"`. Triangles make me think of
meshes, so after some experimentation I made this triangluar mesh that distorts
when it detects some microphone input!

Here's the finished product - click one of the buttons below to start the
animation:

<script>
document.addEventListener("DOMContentLoaded", function() {
main(document.getElementById("mycanvas"));
document.getElementById("start-mic").addEventListener("click",function() {
start_microphone();
});
document.getElementById("start-nomic").addEventListener("click",function() {
start_no_microphone();
});
});
</script>
<canvas id="mycanvas" style="width: 100%"></canvas>
<button id="start-mic">Start with the microphone</button>
<button id="start-nomic">Start without the microphone</button>
