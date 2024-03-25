---
layout: post
title: Paper Review 08 - Degrading Data to Save the Planet
permalink: /posts/2024/03/25-thoughts-on-degrading-data/
---

My thoughts on [Degrading Data to Save the Planet](https://sigops.org/s/conferences/hotos/2023/papers/zuck.pdf)

---

Today's paper appeared in `HotOS'23` and deals with storing data with looser
guarantees around durability in order to prolong the lifespan of flash storage
devices.

It's generally understood that most consumers don't have the same expectations
of durability for all of their data. For example, while there are documents and
files that I care deeply about the integrity of, there's also tons of throw away
pictures and videos on my phone that I view as ephemeral. However, few users
regularly categorize and delete media from their personal devices. Creating and
storing this media contributes to the wear on the flash storage within our
devices. The authors claim that by 2030 the carbon footprint of flash
manufacturing will account for 1.7% of the world's carbon emissions. The paper
then goes on to sketch a solution that exploits variability in expectations
around data durability to reduce wear on flash devices.

The paper's pretty short and most of it is setting up context about the state of
flash media production today, so I'll just dive straight into my thoughts after
a really quick summary:

- Content can be stored in blocks that are less reliable, or without any error
  correction/redundancy.
- An ML system can detect files that are likely to be acceptable for loss, and
  additional policies can be applied to request that some files are only stored
  in the safe partition (e.g. all files in some directory)
- Some file types (e.g. MPEG) already have mechanisms to correct against
  corruption, and it isn't infeasible to imagine more error correction being
  done at the software level for non-critical usage.

## Thoughts

- If this was deployed on the personal computing devices of today, would we
  really see an impact?
    - It's been years since I've seen storage related issues on my phone. As the
      article indicates, flash storage manufacturing accounts for 12-31% of the
      carbon footprints of the iPhone, an impressive number, but the majority of
      carbon impact will come from premature retirement of the device as a
      whole - a topic that has been written about and explored recently.
    - This would probably have a much larger impact when applied to datacenters
      and larger scale clusters.
- This could be a cool approach for building something like `tmpfs`, where data
  becomes rapidly less relevant the older it is.
- This could have a lot of applications in the IOT space for non-critical
  applications (e.g. environmental monitoring for agriculture)
- The paper claims that device re-use is impractical, but I'm not sure I agree.
  The paper backs up this claim by showing that consumers are unlikely to
  repurpose or recycle devices, but I think it's somewhat feasible that devices
  could be collected from users and repurposed into applications like CDNs, or
  other caching layers, where having more distributed low powered devices could
  actually be useful (similar to [junkyard computing]({{ '/posts/2024/02/28-thoughts-on-junkyard-computing/' | relative_url }}).
- Another interesting avenue for exploration could be filesystems that are aware
  of both their content and their underlying storage device. That is, if we had
  flash drivers that could store content in "degraded" mode, maybe we could also
  apply compression based on content type at the filesystem level before passing
  it along to the device. The rationale here is that smaller files could mean
  lower chance of catastrophic errors during read.

This paper proposes some interesting approaches to improving the situation
around the carbon impact of flash manufacturing. There's clearly a lot of scope
for innovation in this space, but I remain convinced that the biggest
opportunities lie in finding a way to repurpose e-waste into fulfilling large
scale distributed computing applications.
