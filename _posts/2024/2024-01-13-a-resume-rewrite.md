---
layout: post
title: Migrating my resume from latex to HTML
permalink: /posts/2024-01-13-resume-rewrite/
---

New year, new resume? Join me as I rewrite my resume in HTML instead of \\(\rm\LaTeX\\)

---

Since my sophomore year or so, my resume has been in latex. The history is a bit
murky because I apparently didn't start tracking my resume source in git until
well after college, but I have a vague recollection of how it all started. Up
until that point, I'd been making my resumes in Microsoft Word, but I always
found it to be a bit clunky, and I didn't like the way mine looked. Around that
time a bunch of my friends were all hyping up latex as the way they made their
resumes, and that there were a plethora of good templates available online. I
knew a little bit of latex at the time, so it seemed like a good idea to migrate
everything over to latex. I started off with a pretty generic looking template,
but soon got deep into customization. I played around with one and two column
layouts, but as the years went by, I eventually settled on a single column, and
also created a CV that contained every piece of experience I have (as opposed to
my resume which is only my most "relevant" experiences).

A lot has changed since I migrated my resume to latex. For starters, I'm a lot
better at latex now! But I'm also a *lot* better at HTML. You see, I'd always
wanted to have my resume be in HTML, for a number of reasons, chief among them
being that HTML seemed to offer more options for structuring data, and seemed
way easier to tweak than latex - especially since I could trial CSS changes
interactively in the browser. Editing my resume was also becoming a pain. I need
the machine I was editing on to have a \\(\rm\TeX\\) installation, and quick
tweaks couldn't be done by just changing the source on github. I can remember at
least one instance where for a few months the PDF in the repo was older than the
source files, and I didn't catch it until I'd submitted a few job apps.
Additionally, as I started maintaining my CV, my CV would frequently lack
updates to entries that were also present in my resume, or vice versa. I wanted
to move the common info to a common location, but combining the files back into
one document would require scripting, and I didn't want to deal with latex
errors that stemmed from combinations of documents - the error messages aren't
great to begin with. What held me back from migrating was that I didn't feel
comfortable writing the necessary CSS rules to make the HTML match the aesthetic
of my latex resume. But, that has changed.

My resume is now written in HTML! The only tool I need to compile it into a PDF
is any modern browser. You can view the HTML version
[here](https://aneeshdurg.me/resume). There's a few key things that makes this
approach work for me:

### CSS can specify page dimensions

Until recently, I didn't know that CSS could specify width/height for documents
in terms of inches or meters. This makes typesetting content that is intended
for print possible. My resume contains this snippet of CSS:

```css
body {
  width: 8.5in;
  height: 11in;
}
```

Which matches the dimensions of the standard US letter size (my old resume
technically was formatted for A4, and I like the dimensions of A4 better, but US
letter does make more sense since I'm in the US).

### JavaScript can fill gaps where HTML is cumbersome to write by hand

As I was migrating my resume to HTML, one thing I found myself missing was
`\url`. Which took a URL and generated a link, but also set the text of the link
to be the URL. This makes a lot of sense for links to be printed - I actually
don't want any other alt text. My solution was to just write an `a` tag with a
special class:

```html
<a class="autolink">https://github.com/aneeshdurg/resume</a><
```

And then include a bit of JavaScript to fix the link later:

```javascript
const fix_links = () => {
  for (let el of document.querySelectorAll(".autolink")) {
    el.href = el.innerText;
  }
};
```

I opted to keep the text in the element instead of in the `href` attribute as
the initial state so that the links would still render without JavaScript. Of
course, that was before I split the document up, which I talk about below

### JavaScript can enable combining documents

Since I wanted to have a common location for snippets shared by my resume and
CV, I settled on a system of having `div`s with a special class and a data
attribute and then having some JS replace the `div` with the referenced file:

```html
<div class="include" data-src="education.html"></div>
```

```javascript
await Promise.all([...document.querySelectorAll(".include")].map(el => {
  const src = "snippets/" + el.dataset.src;
  return fetch(src).then(resp => {
    resp.text().then(content => {
      el.innerHTML = content;
    });
  })
}));
```

This has one key downside which is that without JS, the document won't render. I
tried workarounds such as using `iframe`s. But the issue was that without JS I
couldn't apply CSS or get the right dimensions on the `iframe` so it didn't seem
worth it.

The biggest pro of this approach (aside from the shared data) is that editing
individual entries in my resume is super easy, and way more ergonomic since I
just need to open the appropriate file instead of finding it in a giant
document. I choose to just store plain old HTML in each snippet instead of JSON
or something so that I could have maximum flexibility.

## Conclusion

The new HTML/JS/CSS source for my resume is undoubtedly more verbose than the
latex counter part. \\(\rm\LaTeX\\) is purpose built for typesetting and it
shows. However, I now don't have to duplicate data for my resume and CV. That
combined with the ease of editing, and my greater sense of confidence in my
HTML/CSS/JS skills vs my latex skills make this change a worthwhile one for me.
The source code is available [here](https://github.com/aneeshdurg/resume) if
you're interested in browsing it. Thanks for reading!
