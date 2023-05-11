---
layout: default
---

Welcome to my website! I mostly use it for posting about various projects I've
been working on. You can find my blog [here]({{ '/blog' | relative_url }}).


## projects

+ [sPyCy]({{ '/spycy' | relative_url }})
   * A python implementation of graph database with an openCypher frontend for
     testing openCypher tools, or for embedding openCypher in other projects.
   * Try the in-browser demo at the link above!
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

+ [visual malloc]({{ '/visual-malloc' | relative_url }})
   * ![visual malloc]({{ '/static/images/visual_malloc.png' | relative_url }})
   * A visual representation of a memory allocator
   * This project was designed to help students of [cs241](http://cs241.cs.illinois.edu/) with their malloc MP.
   * Supported browsers:
     * Firefox (Desktop)
     * Chrome (Desktop)

+ [webgl-playground]({{ '/webgl-playground' | relative_url }})
   * A collection of interesting visual effects presented in a hand-written
     staticly generated site.
   * Check out this [kaleidoscope]({{ '/webgl-playground/kaleidoscope' | relative_url }})
   that features a variety of input sources, including your [webcam]({{ '/webgl-playground/kaleidoscope?provider=Webcam' | relative_url }})!
   * Supported browsers:
     * Firefox (Desktop and mobile - not all GPUs work perfectly on the desktop version)
     * Chrome (Desktop and mobile)
<br>
<!-- Hard-coding the url here because it needs https -->
+ [camera theremin](https://aneeshdurg.me/CameraTheremin/) \| [Blog post]({{ '/posts/CameraTheremin' | relative_url }})
   * An online theremin that turns your webcam into a musical instrument!
   * Supported browsers:
     * Firefox (Desktop and Mobile)
     * Chrome (Desktop and Mobile)
<br>
+ [arduino keyboard/mouse](https://github.com/aneeshdurg/arduino-keyboard/) \| [Blog post]({{ '/posts/arduino-keyboard-mouse' | relative_url }})
   * Use your arduino UNO as a keyboard/mouse combo!
   * This project really just tacks on reporting mouse data to an existing
     driver for using UNOs as keyboards.

## recent blog posts

<div style="border: 1px dashed; padding: 0.1em">
{% for i in (0..2) %}
<article class="post" style="margin-left: 2em">
<h1><a href="{{ site.baseurl }}{{ site.posts[i].url }}">{{ site.posts[i].title }}</a></h1>
<div class="entry">
{{ site.posts[i].excerpt }}
</div>
<a href="{{ site.baseurl }}{{ site.posts[i].url }}" class="read-more">Read More</a>
</article>
{% endfor %}
</div>

see all my posts [here]({{ '/blog' | relative_url }})
