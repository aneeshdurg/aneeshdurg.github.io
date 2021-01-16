---
layout: post
title: Real time pixelator
permalink: /posts/2021-01-15-real-time-pixelator/
---

A faster version of my [pixelator]({{ '/posts/2021-01-14-pixelator/' | relative_url }})

---

<script>
const root = "{{ '/static/vsynth/src/' | relative_url }}"
</script>

<script src="{{ '/static/vsynth/src/synth.build.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/vsynth/pixelator.js' | relative_url }}" type="text/javascript"></script>

Here's the final product, you can either use your webcam or a static image.

<div id="container" style="width: 100%; border: solid 1px; padding: 0.5em;">
<div id="start">
<button id="start-webcam">Start with webcam</button>
<button id="start-picture">Start with picture</button>
</div>
</div>

The default picture is one that I took at Lake Valhalla in Washington.

I really liked the visual effect of my pixelator, but I wanted a version that
was a lot faster and more suitable for implementing a real time effect over
webcam input. So, I used webgl. I'm actually using one of my ongoing projects, a
[video sythesizer]({{ '/video-synth' | relative_url }}) to implement the effect.

The one tricky part was passing an arbitrary list of colors to the fragment
shader, which I addressed by shoving the list of colors into a 1-D texture and
passing in a length to the shader to tell it how many values it should look up
in the texture. It's probably possible to get better preformance by sorting the
list of colors, but the performance of this implementation is good enough for
me.
