---
layout: post
title: Finding the area of some semicircles
permalink: /posts/finding-the-area-of-some-semicircles/
---

I was recently shown the following statement and wanted to prove it. Given a
circle of radius \\(r\\) centered at the origin, for \\( \forall p \in (-r,
r)\\) , construct two semi circles that intersect uniquely at \\((p, 0)\\), such
that each semi circle only intersects with the circle of radius \\(r\\) exactly
twice, and each semicircle's centers are on the x-axis.
The sum of the areas of the two semicircles is half the area of the
enclosing circle (\\(\frac{\pi r^2}{2}\\)). This post is a proof with
visualizations!

---

<link rel="stylesheet" type="text/css" href="{{ '/static/semicircles/style.css' | relative_url }}">
<script src="{{ '/static/semicircles/script.js' | relative_url}}"></script>
<div class="diagram" id="p0"></div>
<script>
new SemicircleProblem(document.getElementById("p0"), true);
</script>
Click on the circle to change the intersection point!

The area of the red and blue circle together will be half the area of the clear
circle. Note that the numbers above suffer from rounding errors to make them
look pretty.

In order to solve this problem, we first need to be able to define the areas of
the semicircles in question. Being able to do so is also crucial in knowing that
the definition of our problem is sound, how do we even know that such
semicircles actually exist? For now, we know that they exist for some set
of \\(p\\) as shown above visually.

Let's add some annotations to the diagram above.

<div class="diagram" id="p1"></div>
<script>
const problem = new SemicircleProblem(document.getElementById("p1"), false, true);
problem.targetP = 100;
</script>

Let \\(\phi\\) be the radius of the red semicircle. In the above diagram,
\\(P\\), \\(X\\) and \\(R\\) denote some points with coordinates \\((p, 0)\\),
\\((x, 0)\\) and \\((x, \phi)\\). \\(X\\) is the center of the red semicircle.

What we want is to be able to express \\(x\\) and \\(\phi\\) only in terms of
\\(p\\) and \\(r\\) (which are both constants/constraints of the propostion),
thus proving that the semicircles exist, and giving us a way to find the areas
of the semicircle, hopefully in terms of \\(r\\).

To prove existance, we just need to show that for an arbitrary \\(p\\), we can
find a semicircle that touches \\(P\\) and exactly two points on the outer
circle of radius \\(r\\). This is possible iff these points of intersection
correspond to points on the semicircle, \\(0\\) (for the intersection with
\\(P\\)), \\(\pi / 2\\) and \\( -\pi / 2\\) (for the intersections with the
outer circle) radians from the origin of the semicircle (for any other angles,
we wouldn't have a semicircle, or that the origin of one of the two semicircles
is not on the same axis). This would imply that the radius of the semicircle,
\\(\phi\\) is the distance from \\(P\\) to the center of the semicircle \\(X\\).
Now the existance hinges on being able to show that \\(R\\) lies on the circle,
which we can do by finding \\(\phi\\) and \\(x\\) in terms of \\(p\\) and
\\(r\\).

Since \\(R\\) is a point on the outside circle of radius \\(r\\), we know that
the distanct from \\(R\\) to the origin is \\(r\\).

Thus,
\\[ \sqrt{x^2 + \phi^2} = r \\]
\\[ \Rightarrow x^2 + \phi^2 = r^2 \\]

We also know that the distance from \\(X\\) to \\(P\\) must be \\(\phi\\). This
means we can rewrite \\(\phi\\) as \\(\left|p - x\right|\\). We use the absolute
value here so that our argument can be extended to the blue triangle easily,
which will soon be relavant.

Plugging in our new definition of \\(\phi\\) into our equation above we get:
\\[ x^2 + \left|p - x\right|^2 = r^2 \\]
\\[ x^2 + p^2 - 2px + x^2 = r^2 \\]
\\[ 2x^2 - 2px + p^2 - r^2 = 0 \\]
\\[ \Rightarrow x = \frac{2p \pm \sqrt{\left(-2p\right)^2 - 4(2)\left(p^2 - r^2\right)}}{2(2)} \\]
\\[ x = \frac{2p \pm 2\sqrt{\left(p\right)^2 - 2\left(p^2 - r^2\right)}}{2(2)} \\]
\\[ x = \frac{p \pm \sqrt{p^2 - 2\left(p^2 - r^2\right)}}{2} \\]
\\[ x = \frac{p \pm \sqrt{2r^2 - p^2}}{2} \\]
\\[ x_1 = \frac{p + \sqrt{2r^2 - p^2}}{2}, x_2 = \frac{p - \sqrt{2r^2 - p^2}}{2} \\]

The two possible values for \\(x\\) correspond to the fact that we have two
semicircles, which each \\(x\\) either giving a semicircle to the left of, or
the right of \\(P\\). Since all values for \\(x\\) belong in \\((-r, r)\\), we
can be satisfied that the semicircles exist.

This also gives us two values for \\(\phi\\) which we can use to compute the
areas of the semicircles in terms of \\(r\\) and \\(p\\),
\\[ \phi = \left|p - x\right| \\]
\\[ \phi = \left|p - \frac{p \pm \sqrt{r^2 - p^2}}{2}\right| \\]
\\[ \phi = \left|\frac{p \mp \sqrt{2r^2 - p^2}}{2}\right| \\]
\\[ \phi_1 = \left|\frac{p - \sqrt{2r^2 - p^2}}{2}\right|, \phi_2 = \left|\frac{p + \sqrt{2r^2 - p^2}}{2}\right| \\]


Thus we find the sums of the areas of the semicircles to be:
\\[ \frac{\pi \phi_1^2}{2} + \frac{\pi \phi_1^2}{2} \\]
\\[ = \frac{\pi}{2}\left(\left|\frac{p - \sqrt{2r^2 - p^2}}{2}\right|^2 + \left|\frac{p + \sqrt{2r^2 - p^2}}{2}\right|^2\right) \\]
\\[ = \frac{\pi}{8}\left(\left|p - \sqrt{2r^2 - p^2}\right|^2 + \left|p + \sqrt{2r^2 - p^2}\right|^2\right) \\]
let \\(\alpha = \sqrt{2r^2 - p^2}\\)
\\[ = \frac{\pi}{8}\left(p^2 - 2p\alpha + \alpha^2 + p^2 + 2p\alpha + \alpha^2\right) \\]
\\[ = \frac{\pi}{8}\left(2p^2 + 2\alpha^2\right) \\]
\\[ = \frac{\pi}{4}\left(p^2 + 2r^2 - p^2\right) \\]
\\[ = \frac{\pi 2r^2}{4}\\]
\\[ = \frac{\pi r^2}{2} \\]
\\(\blacksquare\\)

## Conclusion

Pretty fun and straightforward proof! It does leave me with some lingering
questions though. What happens if we relax the problem to allow the axis of the
semicircles to be free? Does that affect the results at all? Are there even
valid pairs of semicircles when the semicircles are not on the same axis? Either
way, I hope this post was fun to read!

The code for the visualization can be found [here]({{ '/static/semicircles/script.js' | relative_url }}).
