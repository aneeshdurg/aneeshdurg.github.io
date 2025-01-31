---
layout: post
title: Cleaning out some old tabs
---

On my phone I've got waay to many open tabs because I use my tabs as a "read
later" list. Well, later is now, so it's time to read and summarize every open
tab I have.

---

This post is an exercise to determine the following:

+ What's in all these tabs that I've been saving for later?
+ Was it worth saving these tabs for so long?
+ How can I better organize information that I want to revisit later?

Closing tabs makes me anxious because I'm worried that there was some reason I kept the tab open,
and that if I close it, I'll never stumble upon it again. Writing this post and summarizing the
content of every open tab will probably make it easier, and act as a forcing function to make me at
least skim every tab that I have open.

I've sorted them roughly by category.

## Papers

+ [https://bernsteinbear.com/assets/img/moon-gc.pdf](https://bernsteinbear.com/assets/img/moon-gc.pdf)
    + A 1984 publication about garbage collection techniques for "large virtual memory systems", in
      particular, the Symbolics 3600.
    + I'm glad I read the semi-space collector tab first, it gave me some good context and
      terminology since I'm not super informed on GC techniques.
    + I wonder if more modern GC implementations do something more granular - the paper mentions
      that slow paging adds latency to GC and should be avoided - what if for small objects, GC was
      done on a per-page basis, and only done when a particular page was in memory? For large
      objects that span multiple pages, maybe the allocator could align the allocation size to a
      page boundary at the cost of potentially wasting up to a page of memory? I'm sure that there's
      better ways to handle that wasted memory, but I wonder how what I sketched here would perform.
+ [https://sigmodrecord.org/publications/sigmodRecord/2412/pdfs/08_OpenForum_Bonifati.pdf](https://sigmodrecord.org/publications/sigmodRecord/2412/pdfs/08_OpenForum_Bonifati.pdf)
    + A record of a Q&A panel about the state and future of Graph DBs/Graph computing APIs
    + The key things that stood out to me the most is that scalability for graph processing systems
      is not a solved problem, and that work on dynamic graphs is especially missing.
    + I think a key barrier here is that it's harder to find good workloads for realistic dynamic
      graph usecases. I think it's worth the effort to build a "streaming" graph benchmark that
      interleaves updates and analytics.
+ [https://research.nvidia.com/sites/default/files/pubs/2016-03_Single-pass-Parallel-Prefix/nvr-2016-002.pdf](https://research.nvidia.com/sites/default/files/pubs/2016-03_Single-pass-Parallel-Prefix/nvr-2016-002.pdf)
    + Parallel prefix sum algorithm that improves on time spent waiting on memoryA
+ [https://penberg.org/papers/penberg-edgesys24.pdf](https://penberg.org/papers/penberg-edgesys24.pdf)
    + A framework to bring `SQLite` to serverless platforms by abstracting the IO interface to allow
      for asynchronous IO.
    + Might be cool for environments like the browser too - I've seen a few projects that use SQLite
      compiled to WASM.
+ [https://dl.acm.org/doi/pdf/10.1145/3528416.3530249](https://dl.acm.org/doi/pdf/10.1145/3528416.3530249)
    + Feasibility study for compilation on the GPU. I've written about it on this blog before.
+ [https://arxiv.org/pdf/2411.13704](https://arxiv.org/pdf/2411.13704)
    + An approach to decoupling query optimization from the rest of the engine to build a common
      optimization layer that is portable across underlying engines
+ [https://dl.acm.org/doi/abs/10.1145/3687997.3695639](https://dl.acm.org/doi/abs/10.1145/3687997.3695639)
    + Transpiler to go from `C` (or a subset of it anyway) to `bash`
    + This is so cursed - the authors claim that this has use in bootstrapping toolchains.
+ [https://pdos.csail.mit.edu/papers/sigmaos:sosp24.pdf](https://pdos.csail.mit.edu/papers/sigmaos:sosp24.pdf)
    + Another approach to fast start times for serverless applications, this time by providing a
      pared down interface for IO, and not providing any local file storage
+ [https://arxiv.org/pdf/2302.05417](https://arxiv.org/pdf/2302.05417)
    + A mathematical model of package management systems
    + I only skimmed this and a lot of it went over my head. Package management is a pretty tricky
      problem, and I wonder if this mathematical model will help provide more tools to unify package
      management across different implementations?
+ [https://www.sciencedirect.com/science/article/abs/pii/S1389128614004435](https://www.sciencedirect.com/science/article/abs/pii/S1389128614004435)
    + A survey of different methods to achieve multi-path transmission of packets.
+ [https://arxiv.org/pdf/1706.03762](https://arxiv.org/pdf/1706.03762)
    + The infamous "Attention is All You Need"
    + The key insight here seems to be that the attention operator allows models to better classify
      tokens based on surrounding context.
+ [https://arxiv.org/pdf/2410.00907](https://arxiv.org/pdf/2410.00907)
    + This paper proposes approximating multiplication with additions to save on energy costs for
      training large neural networks.
+ [https://arxiv.org/pdf/2409.14252](https://arxiv.org/pdf/2409.14252)
    + Some new method for collaborative text editing/CRDT.
    + I skimmed it, but ultimately I didn't really see anything that really caught my interest. It
      seems like it exists as a way of improving the experience for the common cases in
      collaborative editing.
+ [https://www.vldb.org/pvldb/vol11/p2209-kersten.pdf](https://www.vldb.org/pvldb/vol11/p2209-kersten.pdf)
    + A comparison of vectorized vs compiled database queries
    + Something interesting to me is how much slower productions systems were compared to the
      authors' implementations. One must assume that the author's implementation was correct, but
      the paper makes no mention of correctness checks.
    + I think this does highlight to me that database engines should sit on top of a common storage
      layer, and the query optimizer should be able to select a different engine for each query.
    + Would be interesting to see how vectorized execution's time would scale with decreases in
      memory latency.
    + The authors only benchmark against TPCH-SF1, which is pretty small. Bigger datasets might have
      revealed more about how each approach performs when faced with out of core workloads.
+ [https://storage.googleapis.com/gweb-research2023-media/pubtools/5486.pdf](https://storage.googleapis.com/gweb-research2023-media/pubtools/5486.pdf)
    + using learning based memory allocator
    + I should write a blog post about this
    + What if you applied the model to the source code during compilation and had it insert hints
      about lifetime at compile time?
      + Related - using LLMs to automatically fix memory leaks, and avoid needing to think about it.
        Could be useful for embedding C in places?
    + For a random workload doesn't this mean all huge pages will eventually be promoted to the
      largest LC?
    + Training based on stack traces is pretty cool
    + Getting Mesh to work on huge pages would be really interesting. Combining Llama and Mesh would
      also be pretty cool - especially with some scheme where on some pages you keep the longest
      lived objects at the start of the page, and in others you try to keep long lived objects at
      the end of the page. By meshing pages, you can get pages with only long lived objects (or only
      short lived objects if you're near the end of the deadlines)
+ [https://ds.jpeg.org/whitepapers/jpeg-xl-whitepaper.pdf](https://ds.jpeg.org/whitepapers/jpeg-xl-whitepaper.pdf)
    + Whitepaper describing the new JPEGXL format
    + Lots of cool things like progressive decoding and encoding "image features" - repeating
      patterns in the image.
+ [https://www.piumarta.com/papers/colas-whitepaper.pdf](https://www.piumarta.com/papers/colas-whitepaper.pdf)
    + Describes COLA, my tenuous understanding is that this describes a systems where user code can
      extend and modify the compiler/environment it runs on because the compiler is implemented as a
      collection of dynamic objects with a pre-defined messaging protocol. The writing style was
      also very edgy.
    + Personally, I didn't really get how this solves the problem of the environment/OS being not
      malleable? In the conclusion there's some handwavy mention of things being C-ABI compatible -
      but compatibility doesn't automatically mean 0 impedance... I do think it has some cool ideas,
      and maybe I should see if those ideas were ever implemented.
+ [https://arxiv.org/pdf/2405.20869](https://arxiv.org/pdf/2405.20869)
    + A paper examining demand-aware vs demand-oblivious network reconfiguration and understanding
      throughput bounds on reconfigurable networks
    + The regularity of the ML demand matrices was interesting. It makes me wonder if network-aware
      ML training pipelines could have better performance.
    + I think topology-aware distributed computing is an under explored topic.
+ [https://arxiv.org/pdf/2211.09029](https://arxiv.org/pdf/2211.09029)
    + A paper attempting to define what problems multicast is a good solution for.
    + I've never worked with multicast streams, so this was an informative read for me
    + I wonder if multicast is used by libraries like MPI to save bandwidth on broadcasts
+ [https://www.researchgate.net/profile/Damien-Magoni/publication/221056912_Influence_of_Network_Topology_on_Protocol_Simulation/links/0fcfd50ba69ab569ff000000/Influence-of-Network-Topology-on-Protocol-Simulation.pdf](https://www.researchgate.net/profile/Damien-Magoni/publication/221056912_Influence_of_Network_Topology_on_Protocol_Simulation/links/0fcfd50ba69ab569ff000000/Influence-of-Network-Topology-on-Protocol-Simulation.pdf)
    + Shows that network topology has an effect on protocol simulation
    + The paper's conclusion states that this highlights the importance of good topology models for
      analyzing internet-scale protocols, but to me it further highlights the need for
      topology-aware protocols.
+ [https://open.library.ubc.ca/media/stream/pdf/24/1.0065519/1](https://open.library.ubc.ca/media/stream/pdf/24/1.0065519/1)
    + A thesis on generating and simulating topologies for large scale distributed systems.
    + I skimmed through it, found the section on `RealNet` which generates topologies modeling the
      internet to be pretty interesting.
+ [https://about.att.com/ecms/dam/sites/labs_research/content/publications/AI_A_Graph_Database_for_a_Virtualized_Network_Infrastructure.pdf](https://about.att.com/ecms/dam/sites/labs_research/content/publications/AI_A_Graph_Database_for_a_Virtualized_Network_Infrastructure.pdf)
    + I was really excited when I saw the title because I thought it might be about building a
      general graph DB service on top of virtualized networks, but it's actually about modeling
      virtualized networks as a new graph DB.
+ [https://research.google/blog/scaling-hierarchical-agglomerative-clustering-to-trillion-edge-graphs/](https://research.google/blog/scaling-hierarchical-agglomerative-clustering-to-trillion-edge-graphs/)
    + A summary of Google'S TeraHAC paper which is a parallel algorithm for approximate clustering
      for graphs that are much larger than available main memory.
    + How does this algorithm perform on smaller graphs with small machines? How does that compare
      to the performance on a larger machine that doesn't require out-of-core processing?
    + The intuition behind parallel clustering was interesting to me.
+ [https://www.vldb.org/pvldb/vol10/p781-Wu.pdf](https://www.vldb.org/pvldb/vol10/p781-Wu.pdf)
    + A comparison of a bunch of different MVCC implementations
+ [https://arxiv.org/pdf/2312.11514](https://arxiv.org/pdf/2312.11514)
    + Optimizing out-of-core LLM inferencing. The paper employs a three-fold approach - reducing the
      overall data needed to be read by taking advantage of sparsity and also introducing a new
      predictor that determines which elements are required, managing in-memory data structures
      better to avoid reallocations, and reading contiguous data with optimal chunk sizes.
    + I wonder if some of this work can be done ahead of time at the expense of more storage - I
      imagine that one could assemble page aligned regions of data that could be accessed, and
      create some kind of indexing system that identifies each page with it's contents, which can
      then be loaded at runtime.
+ [https://15721.courses.cs.cmu.edu/spring2024/papers/14-optimizer2/neumann-btw2015.pdf](https://15721.courses.cs.cmu.edu/spring2024/papers/14-optimizer2/neumann-btw2015.pdf)
    + Proof and method that any dependent query can be decorrelated 
+ [https://www.vldb.org/pvldb/vol16/p99-yu.pdf](https://www.vldb.org/pvldb/vol16/p99-yu.pdf)
    + Is there any work on moving hot records to the same page?
    + The paper presents three key ideas - a record cache (essentially a cache to keep writes in
      memory to try to do larger sequential writes), page grouping (keeping pages with adjecent key
      spaces together on disk), and insert forecasting (predicting how many inserts will happen on a
      given page). Together these ideas take better advantage of SSD characteristics.
    + Idea related to page grouping - don't explicitly colocate pages, but instead have a second
      disk. In the background, write pages in sorted order to the second disk (effectively remapping
      pages). When the background process is complete, use the second disk for reads/writes and use
      the first disk to write to. If bandwidth becomes a problem, use a third disk as a staging area
      (replicate writes to disks 1 and 2, background copy/defragment from disk 2 to 3, make disk 3
      the main disk)
+ [https://dl.acm.org/doi/pdf/10.1145/3591264](https://dl.acm.org/doi/pdf/10.1145/3591264)
    + A grammar specification for parsing file formats
    + Supposedly grammars that can't be expressed as DAGs are omitted. What about file formats that
      are unbounded linked lists? I guess those are simply unrepresentable since termination can't
      be proven?
    + This is a neat way to specify formats though - if I was designing a file format I'd consider
      using this.
+ [https://www.usenix.org/system/files/conference/fast17/fast17-vangoor.pdf](https://www.usenix.org/system/files/conference/fast17/fast17-vangoor.pdf)
    + Exploration and analysis of FUSE's overhead
    + The paper focuses on comparing FUSE's performance when compared with the underlying fs on
      different storage media, but I think it would have been better to also compare FUSE with an
      in-memory filesystem to better isolate effects from FUSE's implementation alone.
    + Would be fun to compare FUSE to a program that exposes an NFS server to do a userspace FS.
+ [https://www.vldb.org/pvldb/vol16/p2090-haas.pdf](https://www.vldb.org/pvldb/vol16/p2090-haas.pdf)
    + Looks at the gap between SSD performance and DB performance and attempts to address it
    + The key idea here seems to be that SSDs require high parallelism to achieve their maximum
      throughput, but most databases don't have sufficient sustained IO demand.
    + I wonder if there's any work on having GPUs talking directly to SSD controllers.
    + Another alternative - what about DBs where each core acts as an independent participant and
      submits it's own IO requests?
+ [https://stefan-marr.de/downloads/oopsla23-larose-et-al-ast-vs-bytecode-interpreters-in-the-age-of-meta-compilation.pdf](https://stefan-marr.de/downloads/oopsla23-larose-et-al-ast-vs-bytecode-interpreters-in-the-age-of-meta-compilation.pdf)
    + Comparing AST vs Bytecode based interpreters
    + This is pretty dense so I just skimmed it. My very high-level takeaway is that I should
      revisit this work if I ever need to implement a fast interpreter
    + Some of the results do seem to indicate that AST based interpreters are not necessarily slower
      than bytecode interpreters, which was somewhat unexpected for me.
+ [https://arxiv.org/pdf/2311.02206](https://arxiv.org/pdf/2311.02206)
    + Implementing Datalog on the GPU
    + A key part of this was introducing a new datastructure that makes evaluating Joins on the GPU
      efficient.
+ [https://www.cs.purdue.edu/homes/rompf/papers/xhebraj-ecoop22.pdf](https://www.cs.purdue.edu/homes/rompf/papers/xhebraj-ecoop22.pdf)
    + This paper explores a programming model where values on the stack can be returned, and will
      keep the stack alive until a non-stack value is returned.
    + This sounds a bit like an alternative way to do what inlining does.
    + Automatically transforming programs to do destination passing style for stack returned values
      sounds like another option, though it doesn't necessarily work in all cases unlike the
      approach here.
+ [https://www.vldb.org/pvldb/vol16/p670-moti.pdf](https://www.vldb.org/pvldb/vol16/p670-moti.pdf)
    + A novel method for indexing geospatial data

## Blogs/Articles

+ [https://wingolog.org/archives/2022/12/10/a-simple-semi-space-collector](https://wingolog.org/archives/2022/12/10/a-simple-semi-space-collector)
    + A blog post about semi-space collector (GC)
    + Partition memory into "from" space and "to" space. During GC, copy objects from "from" to
      "to". Then swap the from/to pointers.
    + At the cost of halving your available memory you get a very elegant GC implementation.
+ [https://www.argmin.net/p/monster-models](https://www.argmin.net/p/monster-models)
    + A blog post that applies concepts from systems engineering to biology
    + The (flawed) diagram of human circulation was super cool, even if it fails to accurately model
      circulation.
    + I think understanding biological systems is a good candidate for things that could be improved
      by techniques from AI. But I don't know much about biology or AI.
+ [https://opensource.microsoft.com/blog/2024/11/07/introducing-hyperlight-virtual-machine-based-security-for-functions-at-scale/](https://opensource.microsoft.com/blog/2024/11/07/introducing-hyperlight-virtual-machine-based-security-for-functions-at-scale/)
    + A microsoft hypervisor/runtime library for creating VMs with millisecond scale latency -
      useful for serverless applications.
    + In a way this seems to shift what we normally use containers for down one level to be at the
      level of the hypervisor - however, the VMs you get seem to be a bit more limited in capability
      than something like a full containers running in an existing VM, though the benefits are
      different.
+ [https://explaining.software/archive/the-death-of-the-architect/](https://explaining.software/archive/the-death-of-the-architect/)
    + An article musing on how software design has changed over time, and how in the present day,
      design is a bit more high level (if done at all), and is more of an emergent property of the
      code
    + I think the world yearns for literate programming. Comments are not enough
      - We should be inlining design documents and diagrams into the place developers are already
        looking.
+ [https://typesanitizer.com/blog/rethink-optimizers.html](https://typesanitizer.com/blog/rethink-optimizers.html)
    + A blog post listing what the author wishes optimizers could evolve to provide to aid in
      debugging regressions or better understanding the choices made by an optimizer in cases were
      performance is unexpectedly bad.
    + For a while I've had an idea bouncing around my head to build a language which exposes more of
      the compiler's optimization phases to the user. Let users decide what optimizations passes
      should be applied, and even allow scoping optimizations at the block level. You could even add
      asserts to assert that a particular pass does modify the IR or something.
+ [https://techcommunity.microsoft.com/blog/windowsosplatform/openhcl-the-new-open-source-paravisor/4273172](https://techcommunity.microsoft.com/blog/windowsosplatform/openhcl-the-new-open-source-paravisor/4273172)
    + Msft's open source paravisor. I'd never heard of a paravisor before, but it seems like it's
      sort of like a userspace hypervisor that runs within some host OS, and provides services to a
      guest VM. It seems to be needed in cases where the VM doesn't trust the hypervisor. 
+ [https://cacm.acm.org/research/knowledge-graphs/](https://cacm.acm.org/research/knowledge-graphs/)
    + A high-level definition and summary of what knowledge graphs are and what challenges exist in
      working with them
+ [https://wingolog.org/archives/2024/09/07/conservative-gc-can-be-faster-than-precise-gc](https://wingolog.org/archives/2024/09/07/conservative-gc-can-be-faster-than-precise-gc)
    + An article about some of the benefits of _conservative_ GC - scanning the stack for any
      integer that when treated as an address, points to a mapped segment of the heap to find live
      references.
+ [https://eli.thegreenplace.net/2013/09/16/analyzing-function-cfgs-with-llvm](https://eli.thegreenplace.net/2013/09/16/analyzing-function-cfgs-with-llvm)
    + A short blog post on traversing the CFG in LLVM. 
    + It does really seem like a missed opportunity to me that compilers aren't built on top of
      graph query languages. I've been meaning to write more about that for a while...
+ [http://www.chriswarbo.net/blog/2024-02-25-sk_logic_in_egglog_1.html](http://www.chriswarbo.net/blog/2024-02-25-sk_logic_in_egglog_1.html)
    + Implementing `SK` logic using `egglog`, which is a language built around equality saturation
    + Equality saturation is really cool - I think it's a really powerful tool for building
      compilers and being able to understand how various rules are being applied.
+ [https://jamesg.blog/2024/05/09/new-research/](https://jamesg.blog/2024/05/09/new-research/)
    + The author mentions their methods for finding new research in their field, and goes on to ask
      readers about what they do.
    + This is something I'd like to do more of as well - I think I'm _okay_ at finding papers and
      work related to things I'm working on, but I need to get better at increasing my breadth, and
      keeping up to date with the latest things happening in my areas of interest.
+ [https://www.mikeash.com/pyblog/friday-qa-2015-07-31-tagged-pointer-strings.html](https://www.mikeash.com/pyblog/friday-qa-2015-07-31-tagged-pointer-strings.html)
    + An exploration into how tagged pointer strings are implemented in Objective-C
    + Tagged pointers are a really cool idea - being able to look at the prefix of a string without
      dereferencing sounds like a pretty useful thing
+ [https://yosefk.com/blog/a-100x-speedup-with-unsafe-python.html](https://yosefk.com/blog/a-100x-speedup-with-unsafe-python.html)
    + Speeding up resizing images in python by lying to OpenCV about the data layout of a buffer
      from SDL. I love cursed things like this, but it really seems like a missed optimization in
      OpenCV/numpy to not do this safely.
+ [https://vorpus.org/blog/timeouts-and-cancellation-for-humans/](https://vorpus.org/blog/timeouts-and-cancellation-for-humans/)
    + The pitfalls of using timeouts, a proposed ideal solution, and a library that approximates the
      ideal world within the constraints of reality.
    + Timeouts/cancellation is hard to get right and the approach here is neat, but not super novel?
      `trio` provides some implementations of complex behavior within itself, but now you need to
      use `trio` instead of whatever other libraries you might already want to use, so it's not the
      most satisfactory solution. IMO, this can only truly be solved by having languages implement
      timeout mechanisms on blocking IO operations by default.
    + I think I yearn for a language that has more powerful APIs for controlling threads/async tasks
      in general. Why is it so hard to cancel or suspend a specific thread?!
+ [https://fzakaria.com/2024/05/03/speeding-up-elf-relocations-for-store-based-systems.html](https://fzakaria.com/2024/05/03/speeding-up-elf-relocations-for-store-based-systems.html)
    + Optimizing ELF relocation (filling in references depending on where code is loaded in memory)
      by caching all the shared-object locations which can only be done in store-based systems -
      ones where the set of shared objects is immutable.
    + Cool, but how many symbols does a real large program have? Python seems to have 53k. Not
      saying that this isn't a worthwhile endeavor, but it's good to know the real-world impact it
      might have.
+ [https://transformer-circuits.pub/2024/qualitative-essay/index.html](https://transformer-circuits.pub/2024/qualitative-essay/index.html)
    + An essay on qualitative science from the perspective of AI interpretability research
    + I think cases where qualitative studies miss the mark highlights issues in what academia
      optimizes for. It's easy to fall into the trap of wanting to present some measurable,
      easy-to-digest metric because it satisfies the goal of wanting publications that are broadly
      consumed.
+ [https://adam.nels.onl/blog/maybe-everything-is-a-coroutine/](https://adam.nels.onl/blog/maybe-everything-is-a-coroutine/)
    + The author muses about a language where all functions are coroutines by default
    + Neat idea, shows how algebraic effects can be naturally added.
+ [https://google.github.io/tcmalloc/rseq.html](https://google.github.io/tcmalloc/rseq.html)
    + How TCMalloc uses restartable sequences
    + I've never seen rseq used in the wild, so it was interesting to see how it can be used to
      avoid the overhead of atomics in some cases.
+ [https://liorsinai.github.io/mathematics/2023/09/30/polygon-clipping.html](https://liorsinai.github.io/mathematics/2023/09/30/polygon-clipping.html)
    + An algorithm with visualizations to explain how to determine if two polygons overlap
    + I needed this for a side-project, but for my usecases it should be sufficient to draw one of
      the polygons to a buffer and then test points in that buffer.
+ [https://wasmgroundup.com/blog/wasm-compiler-in-a-tweet/](https://wasmgroundup.com/blog/wasm-compiler-in-a-tweet/)
    + Codegolf'd webassembly compiler

## Videos

+ [https://www.youtube.com/watch?app=desktop&v=g5u3zW4SLow](https://www.youtube.com/watch?app=desktop&v=g5u3zW4SLow)
    + The Genius of the N64's CACHE instruction - Kaze Emanuar
    + I love Kaze's videos. I never have, and may never write code for the N64,
      but it's so fun to hear about all the weird quirks it had.
    + If I had found Kaze and Ben Eater's youtube channels when I was taking
      Computer Architecture in University, I probably would have paid way more
      attention in class...
+ [https://www.youtube.com/watch?app=desktop&v=wqOb5n3BIn0](https://www.youtube.com/watch?app=desktop&v=wqOb5n3BIn0)
    + Truly secret secret santa
    + Fun watch, recommend to any math nerds
+ [https://futureofcoding.org/episodes/069.html](https://futureofcoding.org/episodes/069.html)
    + This sounds cool, but it's almost 3hrs long so I probably won't listen to it. It's a podcast
      discussing a paper about what a programming language is.
+ [https://www.youtube.com/watch?app=desktop&v=NIJtZ0yUDX0](https://www.youtube.com/watch?app=desktop&v=NIJtZ0yUDX0)
    + Refinement types for Rust - a way of encoding additional invariants into Rust's types
+ [https://www.youtube.com/watch?app=desktop&v=KSs0v2Fmnhc](https://www.youtube.com/watch?app=desktop&v=KSs0v2Fmnhc)
    + A stream of a kernel dev, but tbh I didn't and don't plan on watching it - it's 1hr and the
      title gives me no indication whether there's anything I'd actually find interesting.

## Open Source Software

+ [https://github.com/abbbi/sshcont](https://github.com/abbbi/sshcont)
    + Allows you to SSH into a throwaway container
    + The container is created on login
    + The username is used to determine the container type
    + Cool, but idk if I have a need for it.
+ [https://github.com/tracel-ai/cubecl](https://github.com/tracel-ai/cubecl)
    + A Rust interface for programming GPUs
    + This is really cool, kinda wish I heard about this earlier. It seems like rust-cuda but better
      (and actively maintained)
+ [https://github.com/plasma-umass/bigO](https://github.com/plasma-umass/bigO)
    + A research project from UMass's PLASMA group on emperically determining big-O by analyzing the
      real world runtime of some code
    + I think for non-recursive code that only uses iterators/ranges, symbolically determining the
      exact runtime should be possible - and could at least be a useful teaching tool.
    + This is cool, but I'm not sure I really see how useful it is for the domain they've
      implemented it for. I think it would be really useful in context where there's non-trivial
      code rewriting happening by a compiler to where the compiled code's runtime complexity might
      not match the code written. 
+ [https://gnpy.readthedocs.io/en/master/concepts.html](https://gnpy.readthedocs.io/en/master/concepts.html)
    + A library for simulating networks
+ [https://github.com/mogenson/PaperWM.spoon](https://github.com/mogenson/PaperWM.spoon)
    + Something similar to PaperWM for MacOS, not really relevant to me anymore because I don't have
      a mac, and I stopped using PaperWM in favor of Regolith/i3 on all my linux machines anyway.
+ [https://github.com/tigerbeetle/tigerbeetle](https://github.com/tigerbeetle/tigerbeetle)
    + A db optimized for financial transactions
+ [https://github.com/stanford-oval/storm](https://github.com/stanford-oval/storm)
    + LLM powered tool to generate wikipedia style articles by finding sources on the internet
      related to your query.
    + I like this - it seems like a better way to use LLMs since it sounds like it also gives you
      all the references it used? Sounds better than google's AI summaries at least...
+ [https://github.com/kneasle/sapling?tab=readme-ov-file#quick-startplay-with-sapling](https://github.com/kneasle/sapling?tab=readme-ov-file#quick-startplay-with-sapling)
    + AST based structured editor
    + Structured editing is pretty neat, but it also seems cumbersome, and prior research seems to
      agree. I think this is a huge motivation behind things like tree-sitter which gives you the
      best of both worlds.
+ [https://shady-gang.github.io/vcc/](https://shady-gang.github.io/vcc/)
    + C/C++ to Vulkan compiler

## Generative Art

+ [https://mathr.co.uk/blog/2021-05-14_deep_zoom_theory_and_practice.html](https://mathr.co.uk/blog/2021-05-14_deep_zoom_theory_and_practice.html)
    + The optimizations behind zooming in on a Mandelbrot set
    + Key takeaways - use a few reference values and perturbations to avoid many expensive
      calculations. Additional steps are needed to prevent issues caused by values underflowing.
    + Someday I'll write a more respectable Mandelbrot implementation than my first, which
      recomputes EVERYTHING on zoom.
+ [https://github.com/altunenes/rusty_art/blob/master/shaders/mandelbulb.wgsl](https://github.com/altunenes/rusty_art/blob/master/shaders/mandelbulb.wgsl)
    + Rust code that does 3D fragment shader animation
    + Inspiration for some possible future gen-art projects
+ [https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/?ck_subscriber_id=2669647738](https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/?ck_subscriber_id=2669647738)
    + Techniques for writing shaders that apply a "painting" effect
+ [https://github.com/AUTOMATIC1111/stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui)
    + A UI for stable diffusion
    + I'm not the biggest fan of AI generated art, but it looks fun to use...
+ [https://github.com/continue-revolution/sd-webui-animatediff#how-to-use](https://github.com/continue-revolution/sd-webui-animatediff#how-to-use)
    + A plugin for stable-diffusion-webui to build animations
+ [https://github.com/Mikubill/sd-webui-controlnet](https://github.com/Mikubill/sd-webui-controlnet)
    + 3D models for stable diffusion
+ [https://www.google.com/search?q=distance%20of%20each%20planet%20from%20the%20sun&ie=utf-8&oe=utf-8&client=firefox-b-1-m](https://www.google.com/search?q=distance%20of%20each%20planet%20from%20the%20sun&ie=utf-8&oe=utf-8&client=firefox-b-1-m)
    + Distance of every planet from the Sun
    + I want to do a visualization related to orbits of planets and visualize what those orbits look
      like from the perspective of each planet (e.g. geocentrism but for other planets)


## Misc.

+ [https://www.google.com/search?q=tougen%20anki%20manga&ie=utf-8&oe=utf-8&client=firefox-b-1-m](https://www.google.com/search?q=tougen%20anki%20manga&ie=utf-8&oe=utf-8&client=firefox-b-1-m)
    + Search results for a manga called `tougen anki` that was recommended to me recently. It looks
      cool.
    + I read the first few chapters. It was okay, seems like the kind of thing I would have enjoyed
      a lot more as a teenager.
+ [https://lettinggo.bandcamp.com/album/limits-of-control](https://lettinggo.bandcamp.com/album/limits-of-control)
    + A post-hardcore album a friend of mine put out with his band recently!
+ [https://github.com/OpenInterpreter/open-interpreter](https://github.com/OpenInterpreter/open-interpreter)
    + Uses LLMs with the capability to execute code on your machine to allow using natural language
      to control your computer and the data on it.
    + This sort of this is really awesome to help non-technical users take ownership over their
      data.
    + I have not tried it, I probably won't try it either. I like to use tools, and I like to build
      tools, so this sort of solution just doesn't sound that fun to me.
+ [https://www.scattered-thoughts.net/writing/hytradboi-2025/](https://www.scattered-thoughts.net/writing/hytradboi-2025/)
    + I should sign up to attend.
+ [https://www.lexaloffle.com/picotron.php](https://www.lexaloffle.com/picotron.php)
    + A fantasy console that I'd like to try messing around with when I have some spare cycles
+ [http://acs.pub.ro/~cpop/SMPA/Computer%20Architecture%20A%20Quantitative%20Approach%20(5th%20edition).pdf](http://acs.pub.ro/~cpop/SMPA/Computer%20Architecture%20A%20Quantitative%20Approach%20(5th%20edition).pdf)
    + A book on comp arch that I should get around to reading some day
+ [https://nownownow.com/about](https://nownownow.com/about)
    + A /now page to tell readers what you're upto. I like the idea and want to put one on here
      someday.
+ [https://courses.csail.mit.edu/6.851/spring14/](https://courses.csail.mit.edu/6.851/spring14/)
    + An MIT course on advanced datastructures. Could be fun to skim the material some time.
+ [https://greenteapress.com/wp/semaphores/](https://greenteapress.com/wp/semaphores/)
    + A book on concurrency primitives. I'm book marking it to recommend to others.
+ [https://pages.cs.wisc.edu/~paris/cs784-f19/lectures/lecture4.pdf](https://pages.cs.wisc.edu/~paris/cs784-f19/lectures/lecture4.pdf)
    + Lecture notes on acyclic conjunctive queries. I only skimmed it.
+ [http://web.mit.edu/~simsong/www/ugh.pdf](http://web.mit.edu/~simsong/www/ugh.pdf)
    + A very cynical book about unix concepts. I read a few chapters and it was fun to challenge
      some of my assumption on what operating systems should look like.


# Conclusion

Many tabs later, my phone has nothing open! So what have I learned?

+ Most of the thing I save for later usually are worth reading later
+ Things I put of reading because I think they're too hard to digest usually aren't as high effort
  as I expect
+ Writing summaries of what I read is incredibly useful both for immediate retention, and
  remembering things later by reading my own summaries.
+ I choose to not use AI, and that was absolutely the right choice. Often times I would get
  interesting ideas or gain key insights in the middle of seriously reading a paragraph, not from
  just skimming.
+ I need a better system for tagging and organizing information.
+ Just keeping tabs open is not useful, better to skim it and write a short summary for future
  reference so that I know WHY I want to revisit it.
+ I greatly prefer reading an article to watching a video.
+ There's still room for innovation when using SSDs with relational databases.
+ I should implement a garbage collector, it sounds fun.

I think this exercise helped me get way better at reading papers. At the start I thought the tabs I
opened first would have more detailed summaries than the tabs I opened towards the end, but that
wasn't true - the more I read, the better I got at finding things that interest me and filtering
things that don't. I also got more comfortable recognizing when I was reading things that I didn't
have much context on and deciding to just absorb some high-level ideas and move on.

Overall, this was a fun experience and it's nice to start of the new year by dusting off my browser.
I plan to not repeat this exercise, and to get better at immediately reading and saving information
for later!
