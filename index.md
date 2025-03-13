---
layout: default
---

Welcome to my website! My topics of interest are distributed systems,
storage/databases, compilers, and programming languages. I also dabble in
generative art from time to time. You can find my blog [here]({{ '/blog' |
relative_url }}) where I will write about my professional/research interests. My
newer personal website and personal blog are at
<https://moontowercomputer.club/~aneesh> and
<https://moontowercomputer.club/~aneesh/blog> respectively.

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
