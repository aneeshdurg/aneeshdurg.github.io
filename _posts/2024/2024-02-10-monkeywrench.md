---
layout: post
title: MonkeyWrench - Integrating AI with browser devtools
permalink: /posts/2024/02/10-monkeywrench/
---

Introducing [MonkeyWrench](https://github.com/aneeshdurg/monkeywrench) an
AI-powered plugin for Firefox's devtools.

---

I've been using the devtools console for a long time. It was a huge part of how
I learned how to program, and my first experience working with a REPL. While I
find it easy to use and frequently use the console to augment my browsing
experience (hiding annoying elements, bulk downloading files, extract text from
tables, etc), I am also aware that to the majority of users, it's a scary panel
that they accidentally invoked once or twice, and the idea that it could serve
any purpose for day-to-day use seems obscure. With the advent of AI-assisted
coding tools, such as [github copilot](https://github.com/features/copilot), the
barrier to entry for working with unfamiliar tools has dramatically decreased.
While these tools are far from perfect, a common workflow for users of such
tools is to describe the desired code in a comment, and iteratively refine parts
of the prompt, either by modifying variable names/comments or debugging the
generated code. By integrating these AIs into browser devtools, one could
imagine an environment where the current page is passed as part of the prompt so
that the AI can provide completions that refer to visible elements.

To that end, I've built
[MonkeyWrench](https://github.com/aneeshdurg/monkeywrench). Which brings copilot
into a devtools panel. There were a few interesting challenges along the way
which I wanted to write about.

### Reverse Engineering the Copilot Prompts

The first challenge was to understand how copilot's API works. I found a few
details online from previous work, but the most useful resource was to add code
to the fetching function used by the vim plugin and log all requests made. I was
then able to understand how context is passed to the API. I don't know if this
violates the terms of service, but I would imagine it's okay since this is
essential a copilot plugin for a very specialized editor.

### Building a Coding Environment in the Browser

My initial tests just had a `textarea` and a button to trigger completion. This
was a great choice for rapid testing, but was a terrible user experience. For a
code editor, I went with [`CodeMirror`](https://codemirror.net/) which has a lot
of customization points such as custom autocomplete plugins. This saved a ton of
time and effort, and makes the whole project very ergonomic to use.

### Passing in Large Pages as Context

This is arguably the hardest challenge of this whole project. Copilot has
limitations on the maximum prompt size that you can supply. Many popular
webpages rely on frameworks and libraries that generate large HTML documents.
Since most webpages are larger than can be used as context, the plugin requires
users to pass in a `querySelector` that's used to initially filter the document.
This is still potentially too big, and requires some additional processing. My
initial approach was to just truncate the content based on length, but the
biggest drawback was that salient nodes were missing from the context, harming
the quality of suggestions. The current implementation has 3 mechanisms to
combat this:

+ Truncate `svg` path elements

We don't need all the data of `svg` elements to effectively provide completions,
so just retaining the structure should be sufficient for many applications

+ Truncate large data attributes

Many frameworks inject large `data` attributes to the `HTML` nodes constructed.
In most cases these attributes are not relevant, so a combination of randomly
deleting attributes and truncating attributes with large contents is used to
reduce context size.

+ Randomly sampling nodes

To reduce the document size, some nodes are randomly removed, and some nodes are
replaced with their child nodes (which recursively have the sampling process
applied to them). All top level nodes returned by the user requested selector
are retained, but their children are randomly pruned with a probability that
decreases with depth.

These techniques are by no means perfect, but provide a good enough experience
to experiment with the possibilities of such interfaces.

## What's Next?

AI powered tools are becoming more and more common, and more and more powerful.
This is becoming a very active field of development and many developers, such as
the team at [UMass's PLASMA](https://github.com/plasma-umass), have built a
pretty wide variety of AI assisted tools that make development and debugging
easier. With some polish, `MonekyWrench` could probably a place among these
other emerging tools.

In the coming weeks/months, I intend to improve the context selection (possibly
using rendered size/visibility as a factor?), support chrome, provide an easier
mechanism for evaluating code, integrate with other popular AI assistants, and
generally make the project easier to use. On that front, I think trying trying
to provide completions for CSS could be huge in terms of usefulness.
