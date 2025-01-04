---
layout: post
title: Paper Review 14 - The Unbearable Slowness of Being
---

My thoughts on [The Unbearable Slowness of Being: Why do we live at 10 bits/s?](https://arxiv.org/abs/2408.10234)

Note: I am not super well informed about this subject! My summary of the paper
presented in this post could be very wrong.

---

Today's paper isn't about computing, but about human cognition.

As a kid, I hated writing essays in school by hand. I always felt like the pen
just couldn't move as fast as I thought. As I grew up a little and gained
proficiency with a keyboard, I found that it felt slightly more possible for the
words to keep pace with my ideas. Today, I like to play around with new keyboard
layouts and input mechanisms to get closer to the ideal world of being able to
have my thoughts manifest at the same rate I experience them. But how fast do I
experience my thoughts? And how much slower is typing compared to that rate?
This paper proposes that the throughput of the human brain is actually only
around 10 bits per second.

The paper authors acknowledge that this is a surprisingly low number and draw
comparisons to the bandwidth available via current networking equipment and
highlight that network bandwidth is often several orders of magnitude larger.
But what does 10 bits per second actually mean in this context, and how was it
measured?

The authors provide a few examples of how they arrive at this number. First they
examine typing speeds of professional typists, and show that the rate of
characters being outputted corresponds to 10 bits per second. Note that bits
here is not used in the sense of the number of bits required to represent the
character, but rather the number of bits of new information gained within the
context of the task (that is to say, a single character could be 1 bit or less
and ignoring the fact that modeling the choice of a single character out of the
set of possible output characters would require more than a single bit. In a
sense, a bit is more like a single action, or a single decision taken by the
brain - my understanding of this is definitely a bit sketchy and it took me a
while to realize that it doesn't literally mean 10 binary digits - or equivalent
\- streaming in and out of our neural pathways). This seems to hold across any
output mechanism - even talking, and some back of the napkin math on my part
seems to show that this even holds true for stenography.

However the paper also claims that it's not just our output rate that's capped
at \\(10b/s\\), but also our input rate as well. This was demonstrated by memory
games, such as showing a string of digits and measuring the number of memorized
digits after a set interval. My initial reaction to this was to dismiss the
claim - after all, my own memories of scenes are far more detailed than what 10
bits could afford. The paper addresses this by citing work on "subjective
inflation", a phenomenon where we perceive that we are perceiving far more
information than we actually are. For example, when we take in a scene, we are
normally only focused on a single object at a time, yet we feel as though we are
perceiving the entire scene. While it's true that we are aware of our peripheral
vision, the amount of information gained is far less than our focus.

The paper also has a brief section on the theoretical capacity of our memories
versus the amount of information that we could theoretically absorb at
\\(10b/s\\). In short, they claim that the brain can store at most \\(50TB\\),
but we can only input at most \\(40GB\\) over the course of a single lifetime.
Another section I found interesting was on whether or not the brain can
multitask. The paper cites prior work that shows that while processing incoming
information is done via massively parallel computation, actual though processes
are serial. This means that the \\(10b/s\\) limit cannot be enhanced by doing
multiple things at once.

## Thoughts

Again, I am not necessarily the intended audience for this publication. It took
me a while to realize that my first read of this paper gave me an incorrect
understanding of the claims presented. These thoughts are not well informed, but
more like a collection of questions/thoughts that I hope will guide any future
exploration I may attempt in this domain.

+ Maybe the human brain isn't good at acting as a bus that moves information from
  our perception to some action - maybe the processing capability is about
  understanding abstract concepts. How many bits represent the platonic ideal of
  something? The ability to absorb and synthesize information seems to be
  unrelated to pure information throughput, and could explain why humans are so
  biologically successful beyond the paper's proposed idea that \\(10b/s\\) is
  simply more than sufficient for survival.
+ It also seems to be that the human brain is amazingly good at compressing
  information into an efficient representation. I think I've read things before
  about how much information the brain filters out before delivering it to our
  consciousness, and it's something I'd like to read more about in detail.
+ We've established that 10b/s seems to hold for a single modality of
  information, but can that barrier be exceeded by combining multiple input
  modes? E.g. if we use multiple senses does that change how much information we
  perceive? It's possible that perception is more than just the sum of our
  senses too - I've read about studies on improved recall in the presence of
  some stimulus like a memorable taste, or music, so maybe there's some special
  processes involved with combining multiple modalities that allow for higher
  bandwidth?
+ Is the rate adaptive? When I play games on an emulator with overclocking, my
  (perceived) reaction time increases as I adjust to the new speed - with
  repeated instances of testing at faster paces, do human improve at absorbing
  and replicating info? 
  + from re-reading the paper, I think the answer to this is no. It's more
    likely that even when things are "faster", we might just be finding more
    efficient ways to only extract 10 salient bits of information.

