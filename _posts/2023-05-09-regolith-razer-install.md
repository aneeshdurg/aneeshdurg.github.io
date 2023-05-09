---
layout: post
title: Installing Regolith on a Razer Blade 14 (2020)
permalink: /posts/2023-05-09-regolith-razer-install/
---

I *love* reinstalling the OS on my machines. I absolutely can't imagine a
better way to spend my time than hunting down right nvidia driver.

---

I haven't updated my personal laptop in a while. Until yesterday it was still
running ubuntu 18.04, and using i3-gnome as the WM, with a bunch of weird
arcane scripts I wrote to provide various parts of the full desktop experience.

However, on my work laptop, I'd been convinced to run
[regolith](https://regolith-desktop.com/), and was running
regolith2 on ubuntu22.04. It was a really nice experience, and I wanted to
migrate my configuration from that laptop to my personal one as well. And so, I
found a USB stick that had a regolith installer on it and I proceeded to run
it. I quickly became aware that the USB stick had a rather old build of
regolith on it - the version built on ubuntu 20.04. That didn't really bother
me, and I thought I could just upgrade to 22.04 after it finished installing.
That turned out to be mildly problematic as many parts of the system seemed to
be mysteriously broken. The solution to most of my problems turned out to be
upgrading regolith, but I thought I'd share some of the problems I encountered
here so that someone else might stumble across this page if they have the same
symptoms I did.

### Problem 1 - bluetooth not found

When navigating to the bluetooth panel of gnome-control-center, it would say
"Bluetooth not found - plug in a dongle". However, running `bluetoothctl`
allowed me to discover and pair with bluetooth devices, so my laptop's bluetooth
card was clearly working.

### Problem 2 - displays panel in gnome-control-center not rendering

When navigating to the displays panel, I wouldn't see the display configuration
tool render. In my terminal, I could see a few error messages, one of which
said:

```
g_variant_get_type assertion value != NULL
```

### Problem 3 - gnome volume control seems to be missing

No matter what I did, I could not get the gnome volume control OSD to show up
(the little volume indicator that normally comes up when you increase/decrease
the volume).
Audio itself seemed to work fine, and from the control center it was perfectly
functional, but the OSD just would not pop up no matter what I did.

## The solution

Just upgrade regolith to the latest version. Upgrading ubuntu will not also
upgrade regolith. Some of these issues are bugs fixed by regolith, and others
might be due to incompatibility between regolith 1.6 and whatever version of
gnome that's in ubuntu 22.04. You can find instructions to installing the latest
regolith via apt on the official website.


## Multiple monitor madness

Additionally, I had a bunch of weird stuff happen while trying to use multiple
monitors. I run two monitors through a Dell dock that uses DisplayLink to allow
my laptop to connect to them over USB. So, I first had to install the
[DisplayLink
driver](https://www.synaptics.com/products/displaylink-graphics/downloads/ubuntu),
but then ran into an issue where my second monitor would render nothing but my
cursor. I've had weird stuff like that happen when using the nvidia GPU on this
laptop before, so I decided to install the proprietary nvidia driver to turn off
the GPU. I saw that the "recommended" driver was `nvidia-driver-530-open`, but
installing it caused the XServer to fail to start and left me with only the TTY
login screen. The driver that worked for me was `nvidia-driver-530`. Once I had
it installed, everything seemed to just work. I didn't have to disable the GPU,
and leaving it in "on-demand" mode was sufficient.

## Conclusion

Installing all this stuff and trying to understand where different components
failed to interact correctly was a pain. There's a few lessons I've learnt
though:

+ Upgrade chains can be perilous. If you can just throw everything away
and start directly at the final version you want to end at, it'll probably be
easier to do so.
+ The first instinct should always be to check the version of what you're
  running and compare it to the latest released version
+ Buy hardware that makes the most sense for you. Why do I have a gaming laptop?
  I don't even play any "real" games. I don't need this GPU. I should've spent
  the money on a laptop with an i9 instead of an i7. This is a really nice
  laptop, but maybe not the one most suited to my use cases. My next laptop will
  be one that already has a large community of linux users.
