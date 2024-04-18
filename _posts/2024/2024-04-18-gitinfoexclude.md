---
layout: post
title: An ode to .git/info/exclude
permalink: /posts/2024/04/18-ode-to-git-info-exclude
---

One of my favorite features in git is ignoring files via `.git/info/exclude`. I
don't see a lot of other people talking about it, so I thought I'd change that.

---

Many times, I have files or directories inside a directory tracked as a git
repo that I don't want to ever check in. This is easy to avoid by adding a
`.gitignore` entry. However, sometimes I don't want to pollute my
coworkers/cocomitters `.gitignore`s with entries specific to my workflow. For
example, I usually create directories named `idk` where I save logs from
debugging or inputs to programs that I'm trying to test locally. I never want to
commit the `idk` directory, and adding `idk/` into `.gitignore` may be perceived
as a bit odd since many people might not share my personal naming conventions.
This is where `.git/info/exclude` takes the stage. It is a "local" `.gitignore`
that tells git to exclude patterns, but isn't itself tracked. Here's what my
`exclude` file looks like for my `$WORK` repo:

```
# git ls-files --others --exclude-from=.git/info/exclude
# Lines that start with '#' are comments.
# For a project mostly in C, the following would be a good set of
# exclude patterns (uncomment them if you want to use them):
# *.[oa]
# *~

# Ignore all files/directories starting with idk
idk*

# Ignore test.py but only if it's in the root of the repo - we have legitamate
# test.py's in other places, but /test.py is where I usually put repros of bug
# reports
/test.py

# Ignore compile_commands.json - arguably this should be in .gitignore
compile_commands.json

# Ignore some build directories - also possibly more appropriate for .gitignore
.cache/
.factorypath
```

Using `.git/info/exclude` has saved me from committing unwanted files, and given
me additional peace of mind by seeing a clean `git status` report even though I
have untracked files all over the place. I'm very glad it exists.
