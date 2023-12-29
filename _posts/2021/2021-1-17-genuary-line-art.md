---
layout: post
title: Genuary 2021 - day 17
permalink: /posts/Genuary 2021-day17/
---

Drawing some art with lines for [#genuary2021](https://genuary2021.github.io/)

---

<script src="{{ '/static/genuary2021/day17/script.js' | relative_url }}" type="text/javascript"></script>

Genuary is a series of prompts to inspire generated art in the month of January.
You can find a list of the prompts here:
[https://genuary2021.github.io/prompts](https://genuary2021.github.io/prompts)

You can see all of my genuary art and more by following me on twitter:
[https://twitter.com/ad29111](https://twitter.com/ad29111)

Today's prompt was `Draw a line, pick a color move a bit`.  I was inspired by
the pixelator stuff I made recently and wanted to make more stuff that draws
pictures. So I made a small tool that drawing a picture only using colored
lines.

<script>
document.addEventListener("DOMContentLoaded", function() {
main(document.getElementById("container"));
});
</script>
<div id="container" style="width: 100%; border: solid 1px; padding: 0.5em;"></div>
