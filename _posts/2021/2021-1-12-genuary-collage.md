---
layout: post
title: Genuary 2021 - day 12
permalink: /posts/Genuary 2021-day10-12/
---

Making a collage using picsum for [#genuary2021](https://genuary2021.github.io/)

---

<script src="{{ '/static/genuary2021/day12/script.js' | relative_url }}" type="text/javascript"></script>

Genuary is a series of prompts to inspire generated art in the month of January.
You can find a list of the prompts here:
[https://genuary2021.github.io/prompts](https://genuary2021.github.io/prompts)

You can see all of my genuary art and more by following me on twitter:
[https://twitter.com/ad29111](https://twitter.com/ad29111)

Today's prompt was to use an external API. I saw a lot of people using
[picsum](https://picsum.photos/), so I decided to use it as well. This script
downloads `100` random images and uses them to draw another random image.


Click `draw image` below to see it in action! (You can click it multiple times)

<script>
document.addEventListener("DOMContentLoaded", function() {

document.getElementById("start").addEventListener('click', function() {
main(document.getElementById("container"));
document.getElementById("choose").style.display = "";
});
document.getElementById("choose").addEventListener('click', function() {
datas=[];
main(document.getElementById("container"));
});

});
</script>
<div id="container" style="width: 100%; border: solid 1px; padding: 0.5em;"></div>
<button id="start">Draw image</button>
<button id="choose" style="display: none;">Choose new "pixels"</button>
