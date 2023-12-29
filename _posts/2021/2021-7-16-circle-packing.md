---
layout: post
title: real time circle packing - now with WebGL!
permalink: /posts/2021-07-16-circle-packing/
---

I totally ignored my plan from the previous post, and tried to parallelize
things with WebGL. Read more to find out what happened!

---

<link rel="stylesheet" href="{{ '/static/pi_digits/style.css' | relative_url }}">
<style>
canvas {
width: 100%;
}
</style>
<script src="{{ '/static/circle_packing/post.js' | relative_url }}" type="text/javascript"></script>
<script src="https://aneeshdurg.me/webgl-common/common.js"></script>
<script src="{{ '/static/circle_packing/common.js' | relative_url }}" type="text/javascript"></script>
<script>
const img_path = "{{ '/static/circle_packing/image.jpeg' | relative_url }}";
const shader_path = "{{ '/static/circle_packing/ver2/compute.frag.c' | relative_url }}";
</script>
<script src="{{ '/static/circle_packing/ver2/script.js' | relative_url }}" type="text/javascript"></script>

Using WebGL I've brought the render time down to ~9s! Check out the demo here:

<div id="container2" style="width: 100%; border: solid 1px; padding: 0.5em;">
<button id="start2">Start!</button>
</div>
<script>
document.addEventListener("DOMContentLoaded", async function() {
await loadTwgl();
const btn2 = document.getElementById("start2");
btn2.onclick = () => {
ver2_main(document.getElementById("container2"), img_path, shader_path);
};
});
</script>

If you haven't read my
[previous post]({{ '/posts/2021-07-15-circle-packing' | relative_url}})
please do that first!

Last time I planned to optimize the selection of candidates for circles to avoid
having to retry as often. However, the more I thought about the problem,
something bothered me - the lack of parallelism. It occurred to me that if we
had some set of \\(k\\) candidate circles where we know that none of the circles
intersect with each other, we should be able to check if they can each be added
to our final set in parallel.
nitially I wanted to try using `OffscreenCanvas` or do something clever
`SharedArrayBuffer`s, but both of those approaches might not be suitable here.
For starters, `OffscreenCanvas` is currently only implemented on chrome, and not
firefox (I only target the latest versions of those two browsers for this blog).
Also, using `OffscreenCanvas` would have been messy - my initial sketch of the
idea was to divide the total canvas into a grid and have multiple `Web Worker`s
where each worker manages a single cell of the grid by rendering it in an
`OffscreenCanvas`. The issue would be that points that extended into multiple
cells would need to be communicated across multiple workers appropriately. The
`SharedArrayBuffer` idea wasn't fully formed, but what killed it for me was the
need to have specifc CORS headers set to enable it. Since I don't host this
blog's contents myself, I can't really control that, and beyond requiring
`https` for some APIs, I don't want the content of this blog to be at the mercy
of where I'm hosting it (as much as possible - the "mirror" of this site on my
sourcehut page is pretty broken because it can't make cross origin requests for
images/libraries).

After giving it some thought I came up with a solution that could be implemented
using `WebGL`. The basic idea is as follows:

+ Randomly select \\(k\\) circles
+ Load the positions and radius of each circle into \\(C\\) a texture of
  dimensions \\((k, 1)\\)
  + one pixel per circle, writing \\(x, y, radius\\) into the \\(r, g, b\\)
    channels respectively.
+ Load previously drawn circles into \\(D\\) a texture of dimensions
  \\((n, n)\\)
  + Where \\(n\\) is the same dimensions as the actual output canvas we want to
    draw to
+ Using WebGL for each candidate circle, check if it intersects with a
  previously drawn circle and render into \\(C'\\) a texture of dimensions
  \\((k, 1)\\)
  + Where iff out pixel \\(C'\_{(i, 0)}\\) has an alpha value of \\(1\\), pixel
    \\(C\_{(i, 0)}\\) correponds to a valid circle.
+ For each valid circle identified in \\(C'\\) draw that circle onto \\(D\\)

In the implementation above \\(k = 200\\). It was emperically selected to be the
most efficient value on my machine. Since this approach renders a batch of
points at once, the old retry rejected circles loop was removed and replaced
with error accounting that tracks how many failures we've encountered total. As
a result, the number of drawn circles counted by the new version is more
accurate, but I had to add an explicit check to end the run when the number of
errors is greater than some threshold (a function of the `draw_limit` and
`attempt_limit`). I found that this method usually renders around 36,000 circles
per run before hitting the error limit, which prompted me to add more logging to
the old versions. To my surprise the previous version only renders around
32,000 circles but has a similar number of errors. This indicates that I really
do need to work on optimizing selection of candidates next!!!
