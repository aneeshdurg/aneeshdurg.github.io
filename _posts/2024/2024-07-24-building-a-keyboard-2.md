---
layout: post
title: Building a keyboard (part 2)
permalink: /posts/2024/07/building-a-keyboard-2/
---

From beyond the grave, I hear it's call.... 4 years later, I return to a
project with a renewed fire.

---

{% assign baseurl = "/static/images/2024-07-24-building-a-keyboard" | relative_url %}

<style>
.myimg { max-width: 50%; }
.myimgctr { text-align: center; }
</style>

Four years ago, I started build a keyboard. I [wrote about
it](../building-a-keyboard/) back then. At the time, I thought I'd finish the
project in a month or two, and I started by ordering some custom 3D printed
plates to mount the project to instead of cardboard. The plates arrived, I
realized I had the dimensions of the switches wrong, and figured that I should
probably figure out how to do this right way, and maybe start by modifying
existing designs instead of trying to speedrun it. Naturally, I figured that the
next step was to buy a 3D printer. This added sufficient friction to the process
that I dropped the project for the next 4 years, and kept the original cardboard
prototype as a bookshelf decoration (until my partner made me take it down since
it didn't fit the "vibe").

Recently, I noticed that I had an unbuilt kit for a [kyria
rev1](https://github.com/splitkb/kyria) and realized that I could just use that
instead of punting this project infinitely down the line. So, I made a version 2
of the prototype:

<div class=myimgctr>
    <img class=myimg src="{{ '/finished.jpg' | prepend: baseurl }}"/>
</div>

Words can't describe how cool this feels. It looks way better than anything I
could have imagined.

It felt a little weird taking apart the old prototype to reuse the
microcontroller and a few switches. Very "ship of Theseus"-core.

<div class=myimgctr>
    <img class=myimg src="{{ '/oldandnew.jpg' | prepend: baseurl }}"/>
</div>

Unfortunately I couldn't free the controller from the perfboard I used for the
first prototype:

<div class=myimgctr>
    <img class=myimg src="{{ '/perfboard.jpg' | prepend: baseurl }}"/>
</div>

This was done in the spirit of using the resources I had available instead of
pushing the project further down the line - I knew that adding any delay to this
project simply meant that it won't happen. Unfortunately I forgot to put in the
TTRS jack and the reset switch first, so it's impossible to install those
now...oops. The next step is going to be working on the firmware (I've got QMK
reading the joystick pins, but it doesn't use those to do anything at the
moment), and getting rid of the perf board. I think I'm going to just use some
wire cutters or a rotary saw and cut off the old board and pins. Hopefully the
next update for this project will be sometime before 2028 :)
