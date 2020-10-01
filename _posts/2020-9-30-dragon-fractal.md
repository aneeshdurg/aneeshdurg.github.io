---
layout: post
title: Playing around with the dragon fractal
permalink: /posts/dragon-fractal/
---

Some experiments with my favorite fractal!

---

{% assign mediaurl = "/static/dragon_fractal/media" | relative_url %}

<link rel="stylesheet" href="{{ '/static/dragon_fractal/style.css' | relative_url }}">
<script src="{{ '/static/webgl-common/common.js' | relative_url }}"></script>
<script src="{{ '/static/dragon_fractal/src/prog.js' | relative_url }}" type="text/javascript"></script>
<script src="{{ '/static/dragon_fractal/post.js' | relative_url }}" type="text/javascript"></script>
<script>
const root = "{{ '/static/dragon_fractal/src' | relative_url }}";
</script>

Recently I've been playing around with the
[Dragon Fractal](https://en.wikipedia.org/wiki/Dragon_curve)
and wanted to make my own implementation with customizable parameters to see if
I could make some visually interesting results. You can see a basic dragon
fractal generator below - press start to start the iterations.

<div class="box">
<canvas id="glcanvas"></canvas>
<input id="customangle" value="90"/>
<button id="usecustom">Set angle</button>
<br>
<button id="stop-main">Start/Stop</button>
</div>

Some interesting looking angles to try above: \\(90\\), \\(91\\), \\(95\\), \\(85\\).
You'll need to refresh between every input.

Although the input above is in terms of degrees, for the remainder of this post
I'll be referring to angles in radians. Also, the zooming out feature isn't
perfect, so you may see artifact generated from where the camera is zooming out
slower than the fractal. You can see this especially with large angles. In
general, I'm not really happy with how the zoom looks, but it's good enough for
me to call it done.

While implementing this, I tried having non-constant angles of rotation. Below
you can see what happens when the angles of rotation are increasing multiples of
\\(\pi/3\\). Click start below to watch. [Or, click here for a video instead]({{ '/piby3.mp4' | prepend: mediaurl }}).
<div class="box">
<canvas id="glcanvas-piby3"></canvas>
<button id="stop-piby3">Start</button>
</div>

Here's the same thing for increasing multiples of \\(\pi/4\\). Click start below to watch. [Or, click here for a video instead]({{ '/piby4.mp4' | prepend: mediaurl }}).
<div class="box">
<canvas id="glcanvas-piby4"></canvas>
<button id="stop-piby4">Start</button>
</div>
