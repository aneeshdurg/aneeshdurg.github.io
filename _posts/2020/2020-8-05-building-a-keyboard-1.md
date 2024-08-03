---
layout: post
title: Building a keyboard (part 1)
series: building-a-keyboard
permalink: /posts/building-a-keyboard/
---

I've built some mechanical keyboards before, but maybe it's time I built one
from scratch.

---

{% assign baseurl = "/static/images/2020-8-05-building-a-keyboard" | relative_url %}

Previously, I've followed build guides and assembled my own iris v2.

<img src="{{ '/my_iris.jpg' | prepend: baseurl }}"/>

It's been my daily driver for the last two years or so, and while I love it,
I've been itching for an upgrade.

Having seen some posts on
[r/mechanicalkeyboards](https://www.reddit.com/r/mechanicalkeyboards) about
handwiring, I decided I wanted to try my hand at making a super fancy custom
keyboard. I came up with the following layout and cut it out of a piece of
cardboard:

<img src="{{ '/idea.jpg' | prepend: baseurl }}"/>

Instead of having a thumbcluster, I wanted to use a joystick, where different
directions would correspond to different keypresses.

This initial piece had the keys too close together, so I started over on a
different piece of cardboard, but the general shape was the same.

Following the [QMK guide on handwiring](https://beta.docs.qmk.fm/using-qmk/guides/keyboard-building/hand_wire), I wired up some keys:

<img src="{{ '/wiring-0.jpg' | prepend: baseurl }}"/>

...and connected them to a PCB holding an elite-C.
I'm using an elite-C for the controller since it's got that sweet USB-C
connector and is backwards compatible with arduino pro-micro, which is very well
supported.

<img src="{{ '/wiring-1.jpg' | prepend: baseurl }}"/>

The view from the front:
<img src="{{ '/wiring-2.jpg' | prepend: baseurl }}"/>

To make sure I got everything right, I copied the `2x5keypad` firmware in QMK
([link here](https://github.com/qmk/qmk_firmware/tree/master/keyboards/handwired/2x5keypad))
into a new directory,
and modifed the files to match the pins I used and to assign the layout I
wanted. 

[Here's a quick demo of it working](https://photos.app.goo.gl/CdoANqohLjg3y4W67)

And here's a picture of what it looks like now:

<img src="{{ '/finished.jpg' | prepend: baseurl }}"/>

The next post will probably be about getting the joystick to work. Eventually,
I'd also like to build the right hand, use a TRRS cable to connect the two
halves, 3D print a case and/or get a custom PCB, and finally, use this layout
as my new daily driver.
