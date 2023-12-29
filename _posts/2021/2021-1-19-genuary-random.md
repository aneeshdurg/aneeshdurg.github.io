---
layout: post
title: Genuary 2021 - day 19
permalink: /posts/Genuary 2021-day19/
---

Exploring randomness for [#genuary2021](https://genuary2021.github.io/)

---

<script src="{{ '/static/genuary2021/day19/script.js' | relative_url }}" type="text/javascript"></script>

Genuary is a series of prompts to inspire generated art in the month of January.
You can find a list of the prompts here:
[https://genuary2021.github.io/prompts](https://genuary2021.github.io/prompts)

You can see all of my genuary art and more by following me on twitter:
[https://twitter.com/ad29111](https://twitter.com/ad29111)

Today's prompt was `Increase the randomness along the y-axis`. For this prompt,
I thought a lot about what would be visually interesting and settled on the idea
of drawing a tree. To make things more interesting I decided to bend the prompt
a little bit and increase randomness along the r-axis in polar coordinates.

<script>
document.addEventListener("DOMContentLoaded", function() {
main(document.getElementById("mycanvas"));
document.getElementById("start").addEventListener("click", function() {
main(document.getElementById("mycanvas"));
});
});
</script>
<div id="container" style="width: 100%; border: solid 1px; padding: 0.5em;">
<canvas id="mycanvas" style="width: 100%"></canvas>
<button id="start">Re-draw</button>
</div>

There's no relation between the colors and the `r`, which makes me slightly sad,
but I'm happy enough with the result to call it done.
