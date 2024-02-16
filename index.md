---
layout: default
---

Welcome to my website! My topics of interest are distributed systems,
storage/databases, compilers, and programming languages. I also dabble in
generative art from time to time. You can find my blog [here]({{ '/blog' |
relative_url }}).


## projects

{% include projects.md %}

## recent blog posts

<div class="blogpreview">
{% for i in (0..2) %}
<article class="post">
<h1><a href="{{ site.baseurl }}{{ site.posts[i].url }}">{{ site.posts[i].title }}</a></h1>
<div class="entry">
{{ site.posts[i].excerpt }}
</div>
<a href="{{ site.baseurl }}{{ site.posts[i].url }}" class="read-more">Read More</a>
</article>
{% endfor %}
</div>

see all my posts [here]({{ '/blog' | relative_url }})
