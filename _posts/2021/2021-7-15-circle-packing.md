---
layout: post
title: the journey towards real time circle packing
series: circle-packing
permalink: /posts/2021-07-15-circle-packing/
---

a journey for aesthetics and speed

---

<link rel="stylesheet" href="{{ '/static/pi_digits/style.css' | relative_url }}">
<style>
canvas {
width: 100%;
}
</style>
<script src="{{ '/static/circle_packing/post.js' | relative_url }}" type="text/javascript"></script>

Order and chaos are often two sides of the same coin. We find satisfaction in
order emerging from chaos and from order dissolving into chaos. Circle packing
is a good example of something in between. There's a lot of different version of
circle packing out there, but specifically I like the look of almost randomly
placed circles forming an image. So, I set out to implement an idea - a real
time image processing program that would give me the look I wanted, random
circles of different sizes forming the original image.

To achieve this look, first we need to ascribe order to the chaos. How are
random circles going to form an image? I thought it would be interesting to only
use outlines of circles and use the empty space to represent brighter sections
of the original image, which led to the following goal: pick a distinct set of
points from the image  \\(P\\), such that for every point \\(p \in P\\) let
\\(c_p\\) be the circle of radius \\(r(p)\\) centered at \\(p\\), then:

\\(\forall q \in P\\), \\(q \neq p\\),  \\(c_p\\) does not intersect \\(c_q\\)

where \\(r(p)\\) is some function that makes the radius proportional to the
brightness of the pixel.

I think it would be extra satisfying if this could work in real time against a
webcam stream, so the goal is to get this to work at the rate of at least 20FPS,
which is totally arbitrary, but I think it's a good enough framerate to look
decent. Ideally we could get to 30+. With the problem defined, we can get to
implementing!

<script src="{{ '/static/circle_packing/common.js' | relative_url }}" type="text/javascript"></script>

## laying down a baseline

<script>
const img_path = "{{ '/static/circle_packing/image.jpeg' | relative_url }}";
</script>
<script src="{{ '/static/circle_packing/ver0/script.js' | relative_url }}" type="text/javascript"></script>

To start with, we're going to need to come up with a basic approach that
satisfies the problem statement. I don't really know how to approach the
problem, and I want this to be a challenge, so I'm not going to look up other
popular methods to solve this until I feel like I've done the best I can. Since
we just want to get something working so that we can iterate on an algorithm,
we'll want to start simple. To that end, I'm going to be using the simplest
tools, no fancy WebGL today, just plain old canvas 2d rendering.

Since speed is not a concern for this implementation, we'll just go with a brute
force solution, we'll generate a point, find it's radius, if it intersects with
any previous point we generated, discard it, otherwise draw a circle and save
the point. Here's a demo (open the browser console to see timing logs!):

<div class="isa_error" onclick="(() => { fadeOutEl(this); })()">
Warning: Running this version may slow down your browser as it's computationally
expensive.
<br><br>
Click this message to dismiss.
</div>


<div id="container0" style="width: 100%; border: solid 1px; padding: 0.5em;">
<button id="start0">Start!</button>
</div>
<script>
document.addEventListener("DOMContentLoaded", function() {
const btn0 = document.getElementById("start0");
btn0.onclick = () => {
ver0_main(document.getElementById("container0"), img_path);
};
});
</script>


```js
const previous = [];
const draw_limit = 100000;
const draw_batch_size = 250;
const draw_timeout = 0;
const attempt_limit = 10;

console.time("draw");
let draw_count = 0;
const draw = () => {
  for (let batch_i = 0; batch_i < draw_batch_size; batch_i ++) {
    draw_count++;
    if (draw_count > draw_limit) {
      console.timeEnd("draw");
      return;
    }

    let num_attempts = 0;
    while (true) {
      const x = Math.floor(Math.random() * img.canvas.width);
      const y = Math.floor(Math.random() * img.canvas.height);

      const idx = 4 * (y * img.canvas.width + x);
      const r = imgdata.data[idx];
      const g = imgdata.data[idx + 1];
      const b = imgdata.data[idx + 2];
      const gray_value = 0.3 * r + 0.59 * g + 0.11 * b;
      const radius = gray_value / 255 * 5;

      let failed = false;
      for (let prev of previous) {
        const dx = prev[0] - x;
        const dy = prev[1] - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= (prev[2] + radius)) {
          failed = true;
          break;
        }
      }

      if (failed) {
        num_attempts++;
        if (num_attempts > attempt_limit) {
          break;
        }
        continue;
      }

      const current = [x, y, radius];

      ctx.beginPath();
      ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.arc(...current, 0, Math.PI * 2);
      ctx.stroke();

      previous.push(current);
      break;
    }
  }

  console.log(draw_count, draw_limit);

  if (draw_timeout) {
    setTimeout(()=> { requestAnimationFrame(draw); }, draw_timeout);
  } else {
    requestAnimationFrame(draw);
  }
}
```

omitted is the part that initializes the canvas and loads the original image.

Overall this method takes a while. Almost 2.5min to draw 100000 circles. Time to
make it faster!

## implementing the first major optimization

<script src="{{ '/static/circle_packing/ver1/script.js' | relative_url }}" type="text/javascript"></script>

The first thing to note is that the old method relies on an \\(O(n^2)\\)
algorithm. I thought about trying to use some clever datastructures (maybe a
`k-d tree`?), but I came up with something much simpler. By drawing circles on
the canvas, we're already storing information about what space is occupied. The
canvas `2d` API is also pretty optimized, so we can think about drawing as a
very fast operation.

The method I came up with was inspired by reading about how early version Gnome
3 tested for mouse click events. My hazy summary of it is that it worked by
assigning each window ID a color (just cast the 32 bit window id into a 32 bit
RGBA value), and then rendering all windows' bounding rectangles in their unique
color to an offscreen buffer in z-index order. Then the color underneath the
mouse coordinates was looked up, letting the window manager know which window to
forward the mouse event to. Here, we just draw every circle that in the set to
an offscreen buffer, and for a new point with a given radius, just read the
pixels that would be overwritten and check that no pixels are set. I did cheat a
bit here and read the pixels from the bounding square of the new circle, but in
practice that doesn't affect the visual quality by much. Here's the demo:

<div class="isa_error" onclick="(() => { fadeOutEl(this); })()">
For best results please make sure the old version above isn't running. You can
verify this either by checking the logs in your browser's console or by just
refreshing the page.
<br><br>
Click this message to dismiss.
</div>

<div id="container1" style="width: 100%; border: solid 1px; padding: 0.5em;">
<button id="start1">Start!</button>
</div>
<script>
document.addEventListener("DOMContentLoaded", function() {
const btn1 = document.getElementById("start1");
btn1.onclick = () => {
ver1_main(document.getElementById("container1"), img_path);
};
});
</script>



And here's the code:
```js
  // create offscreen canvas
  // - don't parent it to a visible element!
  const hitcanvas = document.createElement("canvas");
  const hitctx = hitcanvas.getContext("2d");

  ...

  const draw = () => {
      ...

        const ra = Math.ceil(radius);
        const d = 2 * ra;
        const hitdata = hitctx.getImageData(
            x - ra, y - ra, d, d);
        for (let px = 0; px < hitdata.data.length; px += 4) {
          const h_b = hitdata.data[px + 2];
          if (h_b > 0) {
            failed = true;
            break;
          }
        }

        ...

        hitctx.beginPath();
        hitctx.arc(...current, 0, 2 * Math.PI, false);
        hitctx.fill();

        break;
   ...
```

With that we've taken the \\(O(n^2)\\) algorithm and turned it into an
\\(O(1)\\) (since the maximum radius size is bounded by `5`) algorithm at the
cost of extra memory required to maintain the offscreen buffer. The runtime is
now around `13s`. This is a huge improvement, but it's still not close to the
requirements of running this in real time.

## Conclusion

There's still a lot more that can be done! The next step I have in mind is to
examine the random generation of points. If we have more information about where
we've already generated points, maybe we can be more likely to select points
that can be succesfully added to the set. Another possible approach can be
change the way points are chose to do some kind of BFS-like exploration,
building up a set of points by only looking at unexplored regions.

The first step to doing that is going to be to find out how many randomly select
points are reject per run on average to find out if that really is problematic.
Gathering data is really important!

Anyway for now, I'm celebrating the progress made so far! I hope this post was
fun to read, and I hope I can add more exciting updates to this blog as I try
new things!
