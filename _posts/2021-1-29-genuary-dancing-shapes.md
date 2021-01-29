---
layout: post
title: Genuary 2021 - day 29
permalink: /posts/Genuary 2021-day29/
---

It's a dance party, but with polygons! (for [#genuary2021](https://genuary2021.github.io/))

---

<script src="{{ '/static/genuary2021/day29/script.js' | relative_url }}" type="text/javascript"></script>

Genuary is a series of prompts to inspire generated art in the month of January.
You can find a list of the prompts here:
[https://genuary2021.github.io/prompts](https://genuary2021.github.io/prompts)

You can see all of my genuary art and more by following me on twitter:
[https://twitter.com/ad29111](https://twitter.com/ad29111)

Today's prompt was `Any shape, none can touch`. The basic idea was to pick a
bunch of non-overlapping circles, and for each circle, pick a random set of
points on the circumfrence and connect those points to draw a polygon. By
changes which points we pick on every frame, we get this neat dancing effect. 

<script>
document.addEventListener("DOMContentLoaded", function() {
main(document.getElementById("mycanvas"));
document.getElementById("start").addEventListener("click", generate);
});
</script>
<div id="container" style="width: 100%; border: solid 1px; padding: 0.5em;">
<canvas id="mycanvas" style="width: 100%"></canvas>
<button id="start">Pick new shapes</button>
</div>
