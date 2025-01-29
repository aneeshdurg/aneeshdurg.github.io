---
layout: post
title: Cleaning out some old tabs
---

On my phone I've got waay to many open tabs because I use my tabs as a "read
later" list. Well, later is now, so it's time to read and summarize every open
tab I have and summarize the information contained in each for my reference.

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

## Generative Art

+ https://mathr.co.uk/blog/2021-05-14_deep_zoom_theory_and_practice.html
    + The optimizations behind zooming in on a Mandelbrot set
    + Key takeaways - use a few reference values and perturbations to avoid many
      expensive calculations. Additional steps are needed to prevent issues
      caused by values underflowing.
    + Someday I'll write a more respectable Mandelbrot implementation than my
      first, which recomputes EVERYTHING on zoom.
+ https://github.com/altunenes/rusty_art/blob/master/shaders/mandelbulb.wgsl
    + Rust code that does 3D fragment shader animation
    + Inspiration for some possible future gen-art projects
+ https://blog.maximeheckel.com/posts/on-crafting-painterly-shaders/?ck_subscriber_id=2669647738
    + Techniques for writing shaders that apply a "painting" effect

## Papers

+ https://bernsteinbear.com/assets/img/moon-gc.pdf
    + A 1984 publication about garbage collection techniques for "large
      virtual memory systems", in particular, the Symbolics 3600.
    + I'm glad I read the semi-space collector tab first, it gave me some good
      context and terminology since I'm not super informed on GC techniques.
    + I wonder if more modern GC implementations do something more granular -
      the paper mentions that slow paging adds latency to GC and should be
      avoided - what if for small objects, GC was done on a per-page basis, and
      only done when a particular page was in memory? For large objects that
      span multiple pages, maybe the allocator could align the allocation size
      to a page boundary at the cost of potentially wasting up to a page of
      memory? I'm sure that there's better ways to handle that wasted memory,
      but I wonder how what I sketched here would perform.
+ https://sigmodrecord.org/publications/sigmodRecord/2412/pdfs/08_OpenForum_Bonifati.pdf
    + A record of a Q&A panel about the state and future of Graph DBs/Graph
      computing APIs
    + The key things that stood out to me the most is that scalability for graph
      processing systems is not a solved problem, and that work on dynamic
      graphs is especially missing.
    + I think a key barrier here is that it's harder to find good workloads for
      realistic dynamic graph usecases. I think it's worth the effort to build a
      "streaming" graph benchmark that interleaves updates and analytics.
+ https://research.nvidia.com/sites/default/files/pubs/2016-03_Single-pass-Parallel-Prefix/nvr-2016-002.pdf
    + Parallel prefix sum algorithm that improves on time spent waiting on memoryA
+ https://penberg.org/papers/penberg-edgesys24.pdf
    + A framework to bring `SQLite` to serverless platforms by abstracting the
      IO interface to allow for asynchronous IO.
    + Might be cool for environments like the browser too - I've seen a few
      projects that use SQLite compiled to WASM.
+ https://dl.acm.org/doi/pdf/10.1145/3528416.3530249
    + Feasibility study for compilation on the GPU. I've written about it on
      this blog before.
+ https://arxiv.org/pdf/2411.13704
    + An approach to decoupling query optimization from the rest of the engine
      to build a common optimization layer that is portable across underlying
      engines
+ https://dl.acm.org/doi/abs/10.1145/3687997.3695639
    + Transpiler to go from `C` (or a subset of it anyway) to `bash`
    + This is so cursed - the authors claim that this has use in bootstrapping
      toolchains.
+ https://pdos.csail.mit.edu/papers/sigmaos:sosp24.pdf
    + Another approach to fast start times for serverless applications, this
      time by providing a pared down interface for IO, and not providing any
      local file storage
+ https://arxiv.org/pdf/2302.05417
    + A mathematical model of package management systems
    + I only skimmed this and a lot of it went over my head. Package management
      is a pretty tricky problem, and I wonder if this mathematical model will
      help provide more tools to unify package management across different
      implementations?
+ https://www.sciencedirect.com/science/article/abs/pii/S1389128614004435
    + A survey of different methods to achieve multi-path transmission of
      packets.
+ https://arxiv.org/pdf/1706.03762
    + The infamous "Attention is All You Need"
    + The key insight here seems to be that the attention operator allows models
      to better classify tokens based on surrounding context.
+ https://arxiv.org/pdf/2410.00907
    + This paper proposes approximating multiplication with additions to save on
      energy costs for training large neural networks.
+ https://arxiv.org/pdf/2409.14252
    + Some new method for collaborative text editing/CRDT.
    + I skimmed it, but ultimately I didn't really see anything that really
      caught my interest. It seems like it exists as a way of improving the
      experience for the common cases in collaborative editing.
+ https://www.vldb.org/pvldb/vol11/p2209-kersten.pdf
    + A comparison of vectorized vs compiled database queries
    + Something interesting to me is how much slower productions systems were
      compared to the authors' implementations. One must assume that the
      author's implementation was correct, but the paper makes no mention of
      correctness checks.
    + I think this does highlight to me that database engines should sit on top
      of a common storage layer, and the query optimizer should be able to
      select a different engine for each query.
    + Would be interesting to see how vectorized execution's time would scale
      with decreases in memory latency.
    + The authors only benchmark against TPCH-SF1, which is pretty small. Bigger
      datasets might have revealed more about how each approach performs when
      faced with out of core workloads.
+ https://storage.googleapis.com/gweb-research2023-media/pubtools/5486.pdf
    + using learning based memory allocator
    + I should write a blog post about this
    + What if you applied the model to the source code during compilation and
      had it insert hints about lifetime at compile time?
      + Related - using LLMs to automatically fix memory leaks, and avoid
        needing to think about it. Could be useful for embedding C in places?
    + For a random workload doesn't this mean all huge pages will eventually be
      promoted to the largest LC?
    + Training based on stack traces is pretty cool
    + Getting Mesh to work on huge pages would be really interesting. Combining
      Llama and Mesh would also be pretty cool - especially with some scheme
      where on some pages you keep the longest lived objects at the start of the
      page, and in others you try to keep long lived objects at the end of the
      page. By meshing pages, you can get pages with only long lived objects (or
      only short lived objects if you're near the end of the deadlines)
+ https://ds.jpeg.org/whitepapers/jpeg-xl-whitepaper.pdf
    + Whitepaper describing the new JPEGXL format
    + Lots of cool things like progressive decoding and encoding "image features" - repeating
      patterns in the image.
+ https://www.piumarta.com/papers/colas-whitepaper.pdf
    + Describes COLA, my tenuous understanding is that this describes a systems where user code can
      extend and modify the compiler/environment it runs on because the compiler is implemented as a
      collection of dynamic objects with a pre-defined messaging protocol. The writing style was also very edgy.
    + Personally, I didn't really get how this solves the problem of the environment/OS being not
      malleable? In the conclusion there's some handwavy mention of things being C-ABI compatible -
      but compatibility doesn't automatically mean 0 impedance... I do think it has some cool ideas,
      and maybe I should see if those ideas were ever implemented.
+ https://arxiv.org/pdf/2405.20869
    + A paper examining demand-aware vs demand-oblivious network reconfiguration and understanding
      throughput bounds on reconfigurable networks
    + The regularity of the ML demand matrices was interesting. It makes me wonder if network-aware
      ML training pipelines could have better performance.
    + I think topology-aware distributed computing is an under explored topic.
+ https://arxiv.org/pdf/2211.09029
    + A paper attempting to define what problems multicast is a good solution for.
    + I've never worked with multicast streams, so this was an informative read for me
    + I wonder if multicast is used by libraries like MPI to save bandwidth on broadcasts
+ https://www.researchgate.net/profile/Damien-Magoni/publication/221056912_Influence_of_Network_Topology_on_Protocol_Simulation/links/0fcfd50ba69ab569ff000000/Influence-of-Network-Topology-on-Protocol-Simulation.pdf
    + Shows that network topology has an effect on protocol simulation
    + The paper's conclusion states that this highlights the importance of good topology models for
      analyzing internet-scale protocols, but to me it further highlights the need for
      topology-aware protocols.
+ https://open.library.ubc.ca/media/stream/pdf/24/1.0065519/1
    + A thesis on generating and simulating topologies for large scale distributed systems.
    + I skimmed through it, found the section on `RealNet` which generates topologies modeling the
      internet to be pretty interesting.
+ https://about.att.com/ecms/dam/sites/labs_research/content/publications/AI_A_Graph_Database_for_a_Virtualized_Network_Infrastructure.pdf
    + I was really excited when I saw the title because I thought it might be about building a
      general graph DB service on top of virtualized networks, but it's actually about modeling
      virtualized networks as a new graph DB.
+ https://research.google/blog/scaling-hierarchical-agglomerative-clustering-to-trillion-edge-graphs/
    + A summary of Google'S TeraHAC paper which is a parallel algorithm for approximate clustering
      for graphs that are much larger than available main memory.
    + How does this algorithm perform on smaller graphs with small machines? How does that compare
      to the performance on a larger machine that doesn't require out-of-core processing?
    + The intuition behind parallel clustering was interesting to me.
+ https://www.vldb.org/pvldb/vol10/p781-Wu.pdf
    + A comparison of a bunch of different MVCC implementations

## Open Source Software

+ https://github.com/abbbi/sshcont
    + Allows you to SSH into a throwaway container
    + The container is created on login
    + The username is used to determine the container type
    + Cool, but idk if I have a need for it.
+ https://github.com/tracel-ai/cubecl
    + A Rust interface for programming GPUs
    + This is really cool, kinda wish I heard about this earlier. It seems like
      rust-cuda but better (and actively maintained)
+ https://github.com/plasma-umass/bigO
    + A research project from UMass's PLASMA group on emperically determining
      big-O by analyzing the real world runtime of some code
    + I think for non-recursive code that only uses iterators/ranges,
      symbolically determining the exact runtime should be possible - and could
      at least be a useful teaching tool.
    + This is cool, but I'm not sure I really see how useful it is for the
      domain they've implemented it for. I think it would be really useful in
      context where there's non-trivial code rewriting happening by a compiler
      to where the compiled code's runtime complexity might not match the code
      written. 
+ https://gnpy.readthedocs.io/en/master/concepts.html
    + A library for simulating networks
+ https://github.com/mogenson/PaperWM.spoon
    + Something similar to PaperWM for MacOS, not really relevant to me anymore because I don't have a mac,
      and I stopped using PaperWM in favor of Regolith/i3 on all my linux machines anyway.

## Blogs/Articles


+ https://wingolog.org/archives/2022/12/10/a-simple-semi-space-collector
    + A blog post about semi-space collector (GC)
    + Partition memory into "from" space and "to" space. During GC, copy objects
      from "from" to "to". Then swap the from/to pointers.
    + At the cost of halving your available memory you get a very elegant GC
      implementation.
+ https://www.argmin.net/p/monster-models
    + A blog post that applies concepts from systems engineering to biology
    + The (flawed) diagram of human circulation was super cool, even if it
      fails to accurately model circulation.
    + I think understanding biological systems is a good candidate for things
      that could be improved by techniques from AI. But I don't know much about
      biology or AI.
+ https://opensource.microsoft.com/blog/2024/11/07/introducing-hyperlight-virtual-machine-based-security-for-functions-at-scale/
    + A microsoft hypervisor/runtime library for creating VMs with millisecond
      scale latency - useful for serverless applications.
    + In a way this seems to shift what we normally use containers for down one
      level to be at the level of the hypervisor - however, the VMs you get seem
      to be a bit more limited in capability than something like a full
      containers running in an existing VM, though the benefits are different.
+ https://explaining.software/archive/the-death-of-the-architect/
    + An article musing on how software design has changed over time, and how in
      the present day, design is a bit more high level (if done at all), and is
      more of an emergent property of the code
    + I think the world yearns for literate programming. Comments are not enough
      - We should be inlining design documents and diagrams into the place
        developers are already looking.
+ https://typesanitizer.com/blog/rethink-optimizers.html
    + A blog post listing what the author wishes optimizers could evolve to
      provide to aid in debugging regressions or better understanding the
      choices made by an optimizer in cases were performance is unexpectedly
      bad.
    + For a while I've had an idea bouncing around my head to build a language
      which exposes more of the compiler's optimization phases to the user. Let
      users decide what optimizations passes should be applied, and even allow
      scoping optimizations at the block level. You could even add asserts to
      assert that a particular pass does modify the IR or something.
+ https://techcommunity.microsoft.com/blog/windowsosplatform/openhcl-the-new-open-source-paravisor/4273172
    + Msft's open source paravisor. I'd never heard of a paravisor before, but
      it seems like it's sort of like a userspace hypervisor that runs within
      some host OS, and provides services to a guest VM. It seems to be needed
      in cases where the VM doesn't trust the hypervisor. 
+ https://cacm.acm.org/research/knowledge-graphs/
    + A high-level definition and summary of what knowledge graphs are and what
      challenges exist in working with them
+ https://wingolog.org/archives/2024/09/07/conservative-gc-can-be-faster-than-precise-gc
    + An article about some of the benefits of _conservative_ GC - scanning the
      stack for any integer that when treated as an address, points to a mapped
      segment of the heap to find live references.
+ https://eli.thegreenplace.net/2013/09/16/analyzing-function-cfgs-with-llvm
    + A short blog post on traversing the CFG in LLVM. 
    + It does really seem like a missed opportunity to me that compilers aren't built on top of
      graph query languages. I've been meaning to write more about that for a while...
+ http://www.chriswarbo.net/blog/2024-02-25-sk_logic_in_egglog_1.html
    + Implementing `SK` logic using `egglog`, which is a language built around equality saturation
    + Equality saturation is really cool - I think it's a really powerful tool for building
      compilers and being able to understand how various rules are being applied.
+ https://jamesg.blog/2024/05/09/new-research/
    + The author mentions their methods for finding new research in their field, and goes on to ask
      readers about what they do.
    + This is something I'd like to do more of as well - I think I'm _okay_ at finding papers and
      work related to things I'm working on, but I need to get better at increasing my breadth, and
      keeping up to date with the latest things happening in my areas of interest.
+ https://www.mikeash.com/pyblog/friday-qa-2015-07-31-tagged-pointer-strings.html
    + An exploration into how tagged pointer strings are implemented in Objective-C
    + Tagged pointers are a really cool idea - being able to look at the prefix of a string without
      dereferencing sounds like a pretty useful thing
+ https://yosefk.com/blog/a-100x-speedup-with-unsafe-python.html
    + Speeding up resizing images in python by lying to OpenCV about the data layout of a buffer
      from SDL. I love cursed things like this, but it really seems like a missed optimization in
      OpenCV/numpy to not do this safely.
+ https://vorpus.org/blog/timeouts-and-cancellation-for-humans/
    + The pitfalls of using timeouts, a proposed ideal solution, and a library that approximates the
      ideal world within the constraints of reality.
    + Timeouts/cancellation is hard to get right and the approach here is neat, but not super novel?
      `trio` provides some implementations of complex behavior within itself, but now you need
      to use `trio` instead of whatever other libraries you might already want to use, so it's not
      the most satisfactory solution. IMO, this can only truly be solved by having languages
      implement timeout mechanisms on blocking IO operations by default.
    + I think I yearn for a language that has more powerful APIs for controlling threads/async tasks
      in general. Why is it so hard to cancel or suspend a specific thread?!
+ https://fzakaria.com/2024/05/03/speeding-up-elf-relocations-for-store-based-systems.html
    + Optimizing ELF relocation (filling in references depending on where code is loaded in memory)
      by caching all the shared-object locations which can only be done in store-based systems -
      ones where the set of shared objects is immutable.
    + Cool, but how many symbols does a real large program have? Python seems to have 53k. Not
      saying that this isn't a worthwhile endeavor, but it's good to know the real-world impact it
      might have.
+ https://transformer-circuits.pub/2024/qualitative-essay/index.html
    + An essay on qualitative science from the perspective of AI interpretability research
    + I think cases where qualitative studies miss the mark highlights issues in what academia
      optimizes for. It's easy to fall into the trap of wanting to present some measurable,
      easy-to-digest metric because it satisfies the goal of wanting publications that are broadly
      consumed.

## Videos

+ https://www.youtube.com/watch?app=desktop&v=g5u3zW4SLow
    + ???
    + The Genius of the N64's CACHE instruction - Kaze Emanuar
    + I love Kaze's videos. I never have, and may never write code for the N64,
      but it's so fun to hear about all the weird quirks it had.
    + If I had found Kaze and Ben Eater's youtube channels when I was taking
      Computer Architecture in University, I probably would have paid way more
      attention in class...
+ https://www.youtube.com/watch?app=desktop&v=wqOb5n3BIn0
    + ???
+ https://futureofcoding.org/episodes/069.html
    + ???
+ https://www.youtube.com/watch?app=desktop&v=NIJtZ0yUDX0&feature=youtu.be
    + ???

## Misc.

+ https://www.google.com/search?q=tougen%20anki%20manga&ie=utf-8&oe=utf-8&client=firefox-b-1-m
    + Search results for a manga called `tougen anki` that was recommended to me
      recently. It looks cool.
+ https://lettinggo.bandcamp.com/album/limits-of-control
    + A post-hardcore album a friend of mine put out with his band recently!
+ https://github.com/OpenInterpreter/open-interpreter
    + Uses LLMs with the capability to execute code on your machine to allow
      using natural language to control your computer and the data on it.
    + This sort of this is really awesome to help non-technical users take
      ownership over their data.
    + I have not tried it, I probably won't try it either. I like to use tools,
      and I like to build tools, so this sort of solution just doesn't sound
      that fun to me.
+ https://www.scattered-thoughts.net/writing/hytradboi-2025/
    + I should sign up to attend.


