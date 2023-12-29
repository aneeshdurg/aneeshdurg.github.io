---
layout: post
title: Genuary 2021 - day 14
permalink: /posts/Genuary 2021-day14/
---

Revisiting [day4's butterflies]({{ '/posts/Genuary 2021' | relative_url }}) for [#genuary2021](https://genuary2021.github.io/)

---

<script src="{{ '/static/genuary2021/day4/script.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/genuary2021/day14/script.js' | relative_url }}" type="text/javascript"></script>

Genuary is a series of prompts to inspire generated art in the month of January.
You can find a list of the prompts here:
[https://genuary2021.github.io/prompts](https://genuary2021.github.io/prompts)

You can see all of my genuary art and more by following me on twitter:
[https://twitter.com/ad29111](https://twitter.com/ad29111)

Today's prompt was `Subdividion`. I took the butterfly generator from day 4 and
used it to create a tiled grid of subdivided squares for today. I also played
with the colors and flapping animation a bit.

<script>
document.addEventListener("DOMContentLoaded", function() {
day14_main(document.getElementById("container"));

document.getElementById("start").addEventListener('click', function() {
day14_main(document.getElementById("container"));
});
});
</script>
<div id="container" style="width: 100%; border: solid 1px; padding: 0.5em;"></div>
<button id="start">Regenerate</button>
