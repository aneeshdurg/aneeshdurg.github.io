---
layout: post
title: Genuary 2021 - day 8
permalink: /posts/Genuary 2021-day8/
---

Playing around with L-Systems for [#genuary2021](https://genuary2021.github.io/)

---

<script src="{{ '/static/genuary2021/day8/generate.js' | relative_url }}" type="text/javascript"></script>

Genuary is a series of prompts to inspire generated art in the month of January.
You can find a list of the prompts here:
[https://genuary2021.github.io/prompts](https://genuary2021.github.io/prompts)

The prompt for today was `"Curve only"`.  This made me think of space filling
curves, like the [Hilbert Curve](https://en.wikipedia.org/wiki/Hilbert_curve).
One way to draw the hilbert curve is by defining a `L-System`, a notation that
defines a recursive sequence of steps. So, I made a program that can draw
L-Systems. You can select a pre-defined L-System like the hilbert curve, or my
favorite - [the dragon curve]({{ '/posts/dragon-fractal' | relative_url }})
below, or click on the random generation button to try a randomly generated
L-System.

The L-System definition can be viewed above the canvas. You can also adjust
parameters like the recursion depth and whether or not some randomness should be
introduced by the turtle on every line it draws. You can also enable or disable
animation. Warning: don't set a very high recursion limit of your browser may
freeze or experience lag.

Note that every curve starts in the center of the screen, so some curves like
the hilbert curve go out of bounds.

<script>
document.addEventListener("DOMContentLoaded", function() {
main(document.getElementById("container"));
});
</script>
<div id="container" style="width: 100%; border: solid 1px; padding: 0.5em;"></div>
