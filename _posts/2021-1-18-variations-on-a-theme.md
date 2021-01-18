---
layout: post
title: Variations on a theme 
permalink: /posts/2021-01-18-variations/
---

Some looping animations made with my [video synthesizer]({{ '/video-synth' | relative_url }})
that have common properties.

---

Here's are a collection of some synth patches that are all:
+ Fractals
+ Perfect loops
+ Have rgb values of 1 or 0
+ Rotate

There's only slight changes in the stages for each patch. I reworked the way the
synth can be embedded into the blog and I now "compile" the saved patch and the
entire synth source into one file which makes it super easy to use everywhere!

Hover your mouse or touch each canvas to see the animation!

<script src="{{ '/static/20210118/alchemy.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/20210118/colorswirl.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/20210118/fractalcolor.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/20210118/fractalswirl.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/20210118/galaxysquares.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/20210118/script.js' | relative_url }}" type="text/javascript"></script>

<div id="target" style="width: 100%; border: solid 1px; padding: 0.5em;"></div>
