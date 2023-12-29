---
layout: post
title: Pixelator
permalink: /posts/2021-01-14-pixelator/
---

A quick tool to pixelate images with a limited color palette

---

This is essentially a cleanup/simplified version of my
[collage generator]({{ '/posts/Genuary 2021-day10-12/' | relative_url }})

<script src="{{ '/static/pixelator/script.js' | relative_url }}" type="text/javascript"></script>

<script>
document.addEventListener("DOMContentLoaded", function() {
main(document.getElementById("container"));
});
</script>
<div id="container" style="width: 100%; border: solid 1px; padding: 0.5em;"></div>
