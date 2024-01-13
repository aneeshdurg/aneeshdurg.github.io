---
layout: default
---

Welcome to my website! I mostly use it for posting about various projects I've
been working on. You can find my blog [here]({{ '/blog' | relative_url }}).


## projects

+ [sPyCy]({{ '/spycy' | relative_url }})
   * A python implementation of graph database with an openCypher frontend for
     testing openCypher tools, or for embedding openCypher in other projects.
   * Try the in-browser demo at the link above! Or try a demo of sPyCy being
     used to implement a webscraper [here]({{ '/posts/2023-05-11-cypher-webscraper/' | relative_url }})!
<br>
+ [video-synth]({{ '/video-synth' | relative_url }})
   * ![video-synth]({{ '/static/images/video-synth.gif' | relative_url }})
   *  A synthesizer for visual effects! Chain together various filters and
      transformations and build temporal functions to animate them. The UI is
      definitely a work in progress and is hard to use.
   * Supported browsers:
     * Firefox (Desktop and mobile)
     * Chrome (Desktop and mobile)
<br>
+ [what is a filesystem?]({{ '/what_is_a_filesystem' | relative_url }})
   * ![what is a filesystem]({{ '/static/images/what_is_a_filesystem.png' | relative_url }})
   * An interactive book based of the corresponding content from the [cs241 coursebook](http://cs241.cs.illinois.edu/coursebook/Filesystems)
   * Features a visualization of disk blocks in a ext2/minix-like filesystem and has a command line simulator with
     support for commands like `ls`, `cat`, `hexdump` and many more!
   * Supported browsers:
     * Firefox (Desktop and Mobile)
     * Chrome (Desktop and Mobile)
<br>
<!-- Hard-coding the url here because it needs https -->
+ [camera theremin](https://aneeshdurg.me/CameraTheremin/) \| [Blog post]({{ '/posts/CameraTheremin' | relative_url }})
   * An online theremin that turns your webcam into a musical instrument!
   * Supported browsers:
     * Firefox (Desktop and Mobile)
     * Chrome (Desktop and Mobile)

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
