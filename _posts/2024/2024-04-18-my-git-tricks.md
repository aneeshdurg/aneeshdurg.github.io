---
layout: post
title: My git tips/tricks
permalink: /posts/2024/04/18-my-git-tips-tricks
---

Over the years I've developed my own patterns in using git, which I thought I'd
document here.

---

I'm by no means a `git` expert, but after having using it all through college,
and for most of my professional career, I've definitely developed a few habits
and a few tools for effectively working with `git`.

## rebasing/squashing

I love rebasing. I usually prefer rebasing to merging during development. I know
that this is controversial, but rebasing makes the history so much cleaner, and
it allows for a high degree of control over the commit set, making it easy to
open PRs with clean, individually reviewable commits. `git rebase -i` has a
really nice interface, and more people should spend more time cleaning up their
commits in my opinion.

When it comes to getting changes on to `main` I'm ambivalent about squashing.

## Partial add/restore

`git add -p` and `git restore -p` allow you to go chunk by chunk and either add,
or remove changes from the repo. `git restore -p` is particularly useful to
remove log statements that I scattered across the codebase while chasing down a
bug. Note that this also work if you add `--staged`. `git restore -p` can have
downsides though, and you can end up loosing work. I usually do a `add -p`
before a `restore -p` to be safe.

## .git/info/exclude

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

## aliases

I have the following git-related aliases in my `fish` config:

```sh
alias gp='git push origin (git rev-parse --abbrev-ref HEAD)'
alias gb='git branch'
alias gd='git diff'
alias gs='git status'
# interactive search git branches and checkout, or pick the closest match and
# checkout
function gc
  set cmd "fzy"
  if test (count $argv) -gt 0
    set cmd "fzy -e \"$argv\" | head -n 1"
  end
  set branch_name (gb | rev | cut -d\  -f 1 | rev | eval $cmd)
  git checkout $branch_name
end
```

+ `gp` allows me to push to the current branch without thinking too hard about
  it
+ `gc` is pretty cool - with no arguments, it pulls up a fuzzy search of all my
  local branches, and will checkout the selected branch. With an argument, it
  will use that as the parameter to the fuzzy search and pick the top result to
  checkout. Examples:
  + To switch to `main`, `gc m` is usually sufficient
  + To switch to `aneesh/my_feature` I might do `gc feat`
