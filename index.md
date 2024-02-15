---
layout: default
---

Welcome to my website! I mostly use it for posting about various projects I've
been working on. You can find my blog [here]({{ '/blog' | relative_url }}).


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
