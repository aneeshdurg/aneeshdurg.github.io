<div class="project">
<div class="projectimg" markdown="block">
{% capture imgurl %}{{ '/static/images/rainbow.png' | relative_url }}{% endcapture %}
[![rainbow]({{ imgurl }})]({{ imgurl }})
</div>
<div class="projectdesc" markdown="block">
+ [rainbow](https://github.com/aneeshdurg/rainbow)
   * Static analysis tool for C/C++ to reject invalid callgraphs, powered by `clang` and `Cypher`
   * Some example usecases are:
       * Prevent functions that assume locks are held from being called without a lock
       * Prevent functions using collective `MPI` operations from being called during another collective operation
       * Prevent secure functions from being called from insecure contexts
</div>
</div>
