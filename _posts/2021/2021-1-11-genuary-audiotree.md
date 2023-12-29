---
layout: post
title: Genuary 2021 - days 10+11
permalink: /posts/Genuary 2021-day10-11/
---

Combining two prompts of [#genuary2021](https://genuary2021.github.io/) into a
audio based tree generator!

---

<script src="{{ '/static/genuary2021/day10-11/script.js' | relative_url }}" type="text/javascript"></script>

Genuary is a series of prompts to inspire generated art in the month of January.
You can find a list of the prompts here:
[https://genuary2021.github.io/prompts](https://genuary2021.github.io/prompts)

You can see all of my genuary art and more by following me on twitter:
[https://twitter.com/ad29111](https://twitter.com/ad29111)

Since I spent yesterday working on the [bash raytracer]({{ '/posts/bash-raytracer' | relative_url }}),
today I implemented something satisfying both yesterday's and today's prompts.
The prompts were `"TREE"` and `Use something other than a computer as an
autonomous process`.  

So, I made a tree generator that is controlled by the microphone input. There's
some parameters you can play around with to influence the tree growth. Honestly,
I feel like this entry is kinda low effort - I wanted to do something with the
frequency of the audio as well, so I might revisit this idea for a future prompt
or something.

Click `start` below to see it in action!

<script>
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("start").addEventListener('click', function() {
new AudioTree(document.getElementById("container"));
});
});
</script>
<div id="container" style="width: 100%; border: solid 1px; padding: 0.5em;"></div>
<button id="start">Start</button>
