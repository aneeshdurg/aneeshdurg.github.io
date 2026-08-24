---
layout: default
---

Welcome to my website! I'm a second year PhD Student at UT Austin, advised by <a href="https://www.cs.utexas.edu/~rossbach/"> Chris Rossbach</a>.
My topics of interest are Operating System Design, Systems for ML, and compilers.

+ "Professional"/research Blog: [/blog]({{ '/blog' | relative_url }})
+ Personal Website: <https://moontowercomputer.club/~aneesh>
+ Personal Blog: <https://moontowercomputer.club/~aneesh/blog>

## recent blog posts

<div class="blogpreview">
{% for i in (0..2) %}
<article class="post">
<h2 class="posttitle"><a href="{{ site.baseurl }}{{ site.posts[i].url }}">{{ site.posts[i].title }}</a></h2>
<div class="excerpt">
{{ site.posts[i].excerpt }}
</div>
</article>
{% endfor %}
</div>

see all my posts [here]({{ '/blog' | relative_url }})

## projects

{% include projects.md %}
