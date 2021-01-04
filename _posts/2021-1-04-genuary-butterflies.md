---
layout: post
title: Genuary 2021 - day 4
permalink: /posts/Genuary 2021/
---

I saw #genuary2021 on twitter and wanted in on the fun.

---

<script src="{{ '/static/genuary2021/day4/script.js' | relative_url }}" type="text/javascript"></script>

Genuary is a series of prompts to inspire generated art in the month of January.
You can find a list of the prompts here:
[https://genuary2021.github.io/prompts](https://genuary2021.github.io/prompts)

The prompt for today was `"Small areas of symmetry"`. The first thought I had was
that butterflies are symmetrical, so I generated a bunch of them.

Here's the finished product:
<script>
document.addEventListener("DOMContentLoaded", function() {
main(document.getElementById("mycanvas"));
});
</script>
<canvas id="mycanvas" style="width: 100%"></canvas>

The way it works is by generating half the butterfly first:
<script>
document.addEventListener("DOMContentLoaded", function() {
window.example_butterfly = new RGButterfly([100, 100]);
document.getElementById("container").appendChild(window.example_butterfly.wings);
});
</script>
<div id="container"></div>

Which is done by draw randomly colored squares into the the top half of a
canvas, and then drawing randomly colored squares in the top half of the bottom
half of the canvas.

Then, I just draw the piece I generated twice, flipping it once to get the
classic butterfly shape.

<script>
document.addEventListener("DOMContentLoaded", function() {
const canvas = document.getElementById("examplecanvas");
canvas.width = 100;
canvas.height = 100;
const ctx = canvas.getContext("2d");
window.example_butterfly.position = [50, 0];
window.example_butterfly.draw(ctx);
window.example_butterfly.position[1] = 0;
document.getElementById("flap").onclick=function() {
ctx.clearRect(0, 0, 100, 100);
window.example_butterfly.draw(ctx);
window.example_butterfly.position[1] = 0;
};
});
</script>
<canvas id="examplecanvas"></canvas>
<button id="flap">Step through flapping animation</button>

To get the flapping motion, I just scale the canvas' widths while drawing them.
Click the button above to see it in action.

Overall, I'm pretty happy with this result, and I hope I can keep coming up with
creations for genuary!
