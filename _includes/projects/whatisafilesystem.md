<div class="project">
<div class="projectimg" markdown="block">
{% capture imgurl %}{{ '/static/images/what_is_a_filesystem.png' | relative_url }}{% endcapture %}
[![what is a filesystem]({{ imgurl }})]({{ imgurl }})
</div>
<div class="projectdesc" markdown="block">
+ [what is a filesystem?]({{ '/what_is_a_filesystem' | relative_url }})
   * An interactive book based of the corresponding content from the [cs241 coursebook](http://cs241.cs.illinois.edu/coursebook/Filesystems)
   * Features a visualization of disk blocks in a ext2/minix-like filesystem and has a command line simulator with
     support for commands like `ls`, `cat`, `hexdump` and many more!
   * Supported browsers:
     * Firefox (Desktop and Mobile)
     * Chrome (Desktop and Mobile)
</div>
</div>
