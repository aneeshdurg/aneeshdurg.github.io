---
layout: post
title: Things I wish I'd learned in school
permalink: /posts/things-i-wish-id-learned-in-school/
---

It's been about 1.5 years since I graduated! Here are some things that I wish
I'd learned, or that I wish were taught in school.

---

{% assign baseurl = "/static/images/2020-12-23-things-i-wish-id-learned" | relative_url %}

It still occasionally feels surreal that I'm no longer a full time student,
but there's definitely still a huge component of my current life and career that
revolves around learning. Over the last year, I've had a chance to reflect on my
formal education and I've come up with a short list of things I wish I'd learned
as a student, or things that I would reccomend someone who is in school now to
brush up on if it's not already a part of their curriculum. Broadly, I'll be
dividing this list into two sections - one on technical knowledge and one for
more general, or more broadly applicable items.

Note that these lists are from my perspective and speak to the experiences I had
in college and the perspectives I've gained since. I am fortunate to have gone
to a really good school that did a pretty good job of preparing me for the real
world (in terms of technical skills), but these lists are things that are more
important than I thought as a student.

## Non-technical knowledge

### 1. Software as a career isn't explosions and unicorns.

It's honestly not that cool. That's not to say it isn't cool at all, but it's a
very different experience from being a computer science student. "Assignments"
don't have strict deadlines, but the level of responsibility is a lot higher.
You can't just not do a task, or do a task badly just because you want to move
on to the next thing. Similarly not every project is interesting. Sometimes work
just is boring, and it's good to have a strategy for making it less boring when
that happens. I've learned that when I get bored, it's a good sign that either
I'm working on something tedious that I can make better (and consequently I can
spend some of my time and effort trying to actively make it better), or it's
something tedious that can't be made better (in which case I try to balance out
my boredom by making other, previously tedious things, less boring). This
strategy is something that really works for me, as keeping myself interested in
my work greately enhances my productivity.

### 2. How to pace yourself
<img src="{{ '/pace.jpg' | prepend: baseurl }}"/><br>
_[https://www.pexels.com/photo/wall-clock-at-5-50-707582/](https://www.pexels.com/photo/wall-clock-at-5-50-707582/)_

Univerity was a pretty constant workload for me. I got used to just being in a
high-stress environment where there was also some work that needed to be done.
However, in the real world I have clearer boundries between my work and my life.
This has been a mixed bag over the last year, as I managed to exhaust myself by
trying to work on a ton of side projects outside of work. Learning to take
breaks when they're not just given to you as they are in university, and to
allow yourself to explore things outside your comfort zone is a luxury that
takes some getting used to in the real world.

### 3. Learning how to discover
<img src="{{ '/AneeshDurg-LakeValhalla.jpg' | prepend: baseurl }}"/><br>
_Image taken by me_

University taught me how to learn things related to software development, but it
didn't really tell me how to learn things totally unrelated to my field. Being
able to take a step back and look at life with a broader perspective was
difficult, but was also a very welcome paradigm shift.

### 4. Fitness

Taking care of your body is important. I definitely did learn this in school,
but it's something I re-learn every so often.


## Technical Knowledge

### 1. Unicode

<img src="{{ '/common-additions-v2.jpg' | prepend: baseurl }}"/><br>
_[https://www.unicode.org/reports/tr51/images/other/common-additions-v2.png](http://clipart-library.com/clipart/812547.htm)_

One of my first tasks as a full time engineer was to write some tests of a
unicode validator. It really hit me how text encoding is so important to build
software that works not just for english speaking humans, but to enable users
from all around the world to use character sets that help them express
themselves best (also, emojis). It really made me reflect how I was so familiar
with ASCII, to the point where I instanstly know things like, `65 === 'A'`, but
wasn't really exposed to other text encoding schemes. Of course, knowing how
ASCII works is great! It is a subset of `utf-8`, perhaps the most widely used
unicode dialect, after all. Still, it would have been nice if my formal
education had more of an emphasis on modern developments in text encoding.

It's also just a really cool topic to read about, especially for the historic
context.

### 2. Accessibility
<img src="{{ '/a11y.png' | prepend: baseurl }}"/><br>
_[https://www.a11yproject.com/](https://www.a11yproject.com/)_

I must confess that I've never taken a course on UI design or HCI, so it's
likely that my ignorance in this area is a product of my own doing. Still, there
were a few classes, like intro to CS, and software design studio, where this
topic wouldn't have been out of place. Through my job, I've learnt about the web
content accessibility guidelines (`WCAG`) and the tools around then (`axe`) to
help us make our software accessible to more people. As the saying goes, unused
software is just tech debt, thus, inaccessible software must
also be tech debt.

When looking at this topic next to unicode, I see a pattern relating to writing
software that takes into account a broader userbase that isn't centered around
the experiences that prevail in the US.

### 3. How to write good tests
<img src="{{ '/tests.png' | prepend: baseurl }}"/><br>
_Image taken by me_

While university did expose me to the concept of writing tests, the real value
and art of it was still unclear to me until I had completed a few internships.
One of the biggest problems in this area is that it's hard to convince a student
with tight deadlines to write code for an assignment that will really only be
run in "production" once, that writing tests is a very valuable use of time.
While some classes get around this by grading the tests themselves as well,
this doesn't capture other aspects of good test writing, such as writing tests
that serve as documentation for expected behvaior, or writing tests that serve
as good examples for future developers, or even just writing tests that are easy
to reason about. 

I think in an ideal world, a software design class would involve the class
working in teams on a shared repository that is maintained across semesters that
builds a piece of software used by the univeristy. Maybe an autograder or
something.

### 4. Writing design documents

Universities aren't the best settings to explore software design practices in my
opinion. It's definitely something that's easier learned through real experience
in the industry. However, it would be super cool to see more of an introduction
at the univeristy level to thinking about processes related to software
development. Among them, writing a clear design document as you would to present
a proposed feature to an engineering team, or to a manager, would be a really
good exercise. This would not only prepare students for the real world, but also
help students understand how to tackle large problems. Some of my classes did
present opportunities for me to learn how to communicate technical ideas
effectively, but I never thought about creating design documents to help myself
structure my approach to development as a student.

### 5. Writing portable software
<img src="{{ '/os.jpg' | prepend: baseurl }}"/><br>
_[http://clipart-library.com/clipart/812547.htm](http://clipart-library.com/clipart/812547.htm)_

Most of my university projects only worked on linux. I don't really have much
experience writing code that runs on the BSDs, MacOS, or windows. I certainly
don't have any experience writing code that runs on all of the above. While I
haven't been asked to do anything like this so far in my professional career,
I've dabbled in learning bits and pieces about it outside of work and I think
it's a really cool topic.

## Conclusion

It's been a great journey experiencing and learning all the things in that list
above. There's definitely more things that I could add to both of these lists,
but these are the big ones. Hope y'all enjoyed reading it!
