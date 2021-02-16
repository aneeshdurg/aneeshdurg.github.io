---
layout: post
title: my woes with windows
permalink: /posts/2021-02-15-woes-with-windows/
---

I tried switching back to windows, it was an adventure.

---

I've been using ubuntu on my personal laptop for a while. When I started
programming as a freshmen in university, I mainly worked on windows, and had a
nice collection of batch scripts that made me feel pretty efficient working in
command prompt.  However, I didn't really know about how to effectively use
version control systems, and I accidentally deleted all my config files over my
first winter break. Dismayed, I decided it was time to try out this whole linux
thing if I was going to start from scratch anyway. I never looked back.


Over time I've built up a little system that I've grown fond of. It involves
ubuntu, i3, and some random scripts and services I've come to rely on. The one
downside of my setup is that it is a waste of power. Thanks to sketchy support
for discrete graphics cards in linux, I have my laptop set to constantly power
my GPU. The battery life sucks, the fact that it uses tons of power sucks, and
the loud fans audible over zoom unless I adjust my gain sucks. So I thought,
maybe I'll give windows another shot. There's this whole `wsl` thing people have
been talking about, maybe it's not just hype.

So to start with the conclusion, I hate it. It's just not for me. I think I can
acknowledge that `wsl` is a cool feature, and you can do a lot more than I
expected on it, but it's got some rough edges that I don't want to deal with.

Windows and I got off on a bad start today. I found that the only way to
customize the key repeat delay to less than 300ms is via editing some registry
keys. Why those options aren't just presented in the UI is beyond me. It's
definitely a step back since even windows 7 had that feature. But I pressed on,
installed `wsl2`, installed `vcxsrv`, installed the `pulseaudio` server for
windows, installed ubuntu for wsl, installed `i3` on ubuntu, and installed a
minimal subset of all the other random dependencies my `i3` config needs. I
really wanted to give wsl the best shot it could have. And to my surprise, it
wasn't that bad!

Sure, I needed to disable some windows shortcuts so that I could just use the
same i3 keybindings, but - it worked. That is until I tried to follow some
tutorial to get `snap` to work and borked my init scripts. No problem, I'll just
edit the script from windows and be back on track right? 

To make a long story short, there doesn't seem to be an easy way to fix this. I
thought about throwing my progress away and starting over, but what stopped me
was the realization that it's just too easy to get into this state with no clear
way out. If something like this happened on my laptop, it's no big deal, I'll
just mount a live usb and fix it. The process here is murkier. The closest thing
to a solution that I've found is to mount my windows partition in ubuntu, find
the `ext4.vhd` file backing my wsl vm, modify the broken script and then copy it
back to windows. I'm not 100% sure if that would work, but the process doesn't
inspire confidence.

I think the biggest issue here is that I am not using wsl as intended. I think
it's a great tool for windows developers who want to use linux tools, or windows
developers who want to test cross-platform functionality. It is not for linux
developers who want the best of both worlds. Still, it's nice to know how the
world of windows has changed since the last time I used it, and it's interesting
to see what muscle memory I've developed in the years since.
