---
layout: post
title: Circle Packing With Compute Shaders
series: circle-packing
---

I revisit an old artistic exploration with some new tools. The circles speak to
me once again.

---

Recently, I've been working with compute shaders to run computation on the GPU.
As I learn more about the WebGPU landscape, I realized that some of my prior
art projects would have been easier to develop with these new tools. This
inspired me to work on a new effect that uses pixel intensity values to simulate
forces on particles within a grid. The result looks like this:

<video src="/static/meshdeformation/raindrop_small.mp4" controls="true"></video>

Here's the same but on a larger scale and without the edges:

<video src="/static/meshdeformation/raindrop_large_no_edge.mp4" controls="true"></video>

This works in real-time and looks super cool when it's using a webcam feed for
input. As you move, you can see the particles cluster around regions of low
intensity in the image. Unfortunately, browser support for WebGPU is still very
new, and none of my personal devices run browsers that support running this
directly. I had to do all of my development using Firefox nightly. As such, I'm
not including an interactive demo on this page, but the code can be found
[here](https://github.com/aneeshdurg/meshdeformation).

The desired effect was to simulate a mesh being distorted by attractive forces
defined by some image, where low intensity pixels exert an attractive force.
Here, `intensity` is defined to be the perceived brightness of every pixel. The
formula I used for this was:

\\[ intensity = 0.2126 * \frac{r}{256} + 0.7152 * \frac{g}{256} + 0.0722 * \frac{b}{256} \\]

Where \\(r,g,b \in [0,255]\\).

This gives a value between 1 and 0. To get the multiplier for the force, I also
used the alpha channel;

\\[ f = \frac{\alpha}{256} * (1 - intensity) \\]

My initial intuition was to model an attractive force from each "particle" to
pixels with low intensity values, then add an attractive force for every edge
in the mesh, and finally, a repulsive force between particles to prevent
collisions. This didn't look super interesting - if the forces were too small,
the grid would only deform slightly and was too subtle to tell what was moving
in the underlying image. If the forces were too large, the constraints would
eventually create knots in the mesh. To avoid this I tried a few different
things, such as adding an attractive force back to the original location for
each particle, adding limits on how far each particle could move, adding some
random motion to help particles get "unstuck" when in a knot, etc. However, the
best look (in my opinion) was achieved by removing most constraints and instead
just displacing each particle based on the attractive force from the particle at
it's original location to regions of low intensity in the image.

My initial approach was to build a basic prototype without any shaders - just 2D
canvas drawing. This initial implementation was too slow for real-time
rendering, but it gave me an idea of what the visual effect would look like.
Satisfied that it seemed promising, I then reimplemented everything using WGSL.
My recent experience with building parsers on the GPU really helped me figure
out how to setup the WebGPU pipeline and build compute shaders. It was
definitely easier than using WebGL for simulation. Initially, I ran just the
force simulation on the GPU, and then read the buffers storing particle
positions on the CPU, and drew using the 2D canvas API. This was still too slow.
To get realtime performance, I had to move my draw loop on the GPU as well. I
found that the best way to do this was to setup an output render buffer, have an
additional compute pass that takes the particle position data and does all the
drawing (logically, this allows me to have 1 thread per particle), and then in
my fragment shader pass, I simply copy the render buffer to the output pixels.
This was fast enough to allow webcam data to deform the mesh in real time!

The final step was to find a good way to record the output in high quality. I
used [h264-mp4-encoder](https://www.npmjs.com/package/h264-mp4-encoder), which
made this easy, but reading the frames introduces enough overhead to where the
webcam input version doesn't look smooth when recorded - you'll have to build
the project yourself to experience the full effect!

## Thoughts/Conclusions

+ Switching between wgsl and TypeScript was painful - mainly because the level
  of available tooling differs so vastly!
    + I'd like to just code in TypeScript and have it compile to WGSL...
+ I'd like to explore a new circle packing idea using similar techniques - the
  key idea is that I'd like to first check avg intensity over 16x16 regions, and
  for sufficiently low/high intensity, draw a circle with r=16. Then check 8x8,
  4x4, etc.
