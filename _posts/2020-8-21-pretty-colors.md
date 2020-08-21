---
layout: post
title: Pretty Colors
permalink: /posts/pretty-colors/
---

Playing around with the illusion of color

---
<link rel="stylesheet" href="{{ '/static/mandelbrot/style.css' | relative_url }}">
<script src="{{ '/static/pretty_colors/script.js' | relative_url }}" type="text/javascript"></script>

Today's post is pretty simple, I just wanted to see what kind of colors you get
when you fill up a canvas with two colors in various configurations. You can
change the two colors being mixed below and also the ratios in which they are
mixed. If you make the number of pixels for the ratio high enough (or if you
zoom _way_ in) you can see what's really going on. There's just alternating
diagonal stripes of the two colors which fools our eyes into seeing a color
which isn't actually present in the image. Although to be fair, all colors that
we see on a screen (aside from red, blue and green) are all illusions anyway. I
probably could have done this in plain JS but it's in WebGL because it's just
more fun to play around with.

Nevertheless, I found this little toy fun to play around with and I hope you do
too!

<canvas id="glcanvas"></canvas>
<br>
<form id="inputs">
<label for="ratio_a">Ratio a</label>
<input id="ratio_a" type="number" value="1" />
&nbsp;
<label for="color_a">Color a</label>
<input type="color" id="color_a" value="#ff0000">
<br>
<label for="ratio_b">Ratio b</label>
<input id="ratio_b" type="number" value="1" />
&nbsp;
<label for="color_b">Color b</label>
<input type="color" id="color_b" value="#0000ff">
</form>

Here's the GLSL fragment shader:

```c
uniform int u_ratio_a;
uniform int u_ratio_b;
uniform vec3 u_color_a;
uniform vec3 u_color_b;

out vec4 color_out;

void main() {
    int total = u_ratio_a + u_ratio_b;
    int x = int(gl_FragCoord.x + gl_FragCoord.y) % total;
    if (x < u_ratio_a)
        color_out = vec4(u_color_a, 1.0);
    else
        color_out = vec4(u_color_b, 1.0);
}
```
