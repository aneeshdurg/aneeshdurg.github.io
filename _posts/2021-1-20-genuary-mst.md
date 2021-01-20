---
layout: post
title: Genuary 2021 - day 20
permalink: /posts/Genuary 2021-day20/
---

Computing MSTs of planar graphs for [#genuary2021](https://genuary2021.github.io/)

---

<script src="{{ '/static/genuary2021/day20/script.js' | relative_url }}" type="text/javascript"></script>

Genuary is a series of prompts to inspire generated art in the month of January.
You can find a list of the prompts here:
[https://genuary2021.github.io/prompts](https://genuary2021.github.io/prompts)

You can see all of my genuary art and more by following me on twitter:
[https://twitter.com/ad29111](https://twitter.com/ad29111)

Today's prompt was `No loops`. This prompt made me think of my datastructures
and algorithms classes where I learned about spanning trees which can take a
graph that may have cycles and turn them into trees which by nature, cannot have
cycles. Today I wrote a program to generate a planar graph and find it's MST.
It's a bit buggy in that some of the graphs generated aren't planar and I didn't
write any code to enforce connectedness. It's close enough though. Hopefully if
you're learning about MSTs right now this is a good visual tool!

[You can find the code for this here]({{ '/static/genuary2021/day20/script.js' | relative_url }})

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
