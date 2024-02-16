+ [rainbow](https://github.com/aneeshdurg/rainbow)
   * ![rainbow]({{ '/static/images/rainbow.png' | relative_url }})
      * <span style="font-size-adjust: 0.4"> The picture above shows rainbow detecting semantic errors in a C++ program </span><br><br>
   * Static analysis tool for C/C++ to reject invalid callgraphs, powered by `clang` and `Cypher`
   * Some example usecases are:
       * Prevent functions that assume locks are held from being called without a lock
       * Prevent functions using collective `MPI` operations from being called during another collective operation
       * Prevent secure functions from being called from insecure contexts
