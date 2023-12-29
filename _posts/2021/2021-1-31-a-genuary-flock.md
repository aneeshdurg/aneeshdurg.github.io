---
layout: post
title: Genuary 2021 - day 30
permalink: /posts/Genuary 2021-day30/
---

Flocks using [day4's butterflies]({{ '/posts/Genuary 2021' | relative_url }}) for [#genuary2021](https://genuary2021.github.io/)

---

<script src="{{ '/static/genuary2021/day4/script.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/genuary2021/day30/script.js' | relative_url }}" type="text/javascript"></script>

Genuary is a series of prompts to inspire generated art in the month of January.
You can find a list of the prompts here:
[https://genuary2021.github.io/prompts](https://genuary2021.github.io/prompts)

You can see all of my genuary art and more by following me on twitter:
[https://twitter.com/ad29111](https://twitter.com/ad29111)

Today's prompt was `Replicate a natural concept`. I'm a bit late to the game, so
I just made this flocking simulation. It's a bit buggy, but whatever.

<script>
document.addEventListener("DOMContentLoaded", function() {
day30_main(document.getElementById("mycanvas"));
});
</script>
<div id="container" style="width: 100%; border: solid 1px; padding: 0.5em;">
<canvas id="mycanvas" style="width: 100%"></canvas>
</div>
