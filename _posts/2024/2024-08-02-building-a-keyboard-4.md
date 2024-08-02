---
layout: post
title: Building a keyboard (part 4)
permalink: /posts/2024/08/building-a-keyboard-2/
---

Finishing assembly! This was not as easy as I expected...

---

{% assign baseurl = "/static/images/2024-08-02-building-a-keyboard" | relative_url %}

<style>
.myimg { max-width: 50%; }
@media (orientation: portrait) {
  .myimg {
    max-width: 85%;
  }
}
.myimgctr { text-align: center; }
</style>

The assembly is complete! Here's how it currently looks:

<div class=myimgctr>
    <img class=myimg src="{{ '/finished.jpg' | prepend: baseurl }}"/>
</div>

The first step was to find the appropriate keys for the right side, since I'd
been using some placeholders:

<div class=myimgctr>
    <img class=myimg src="{{ '/fix_keys_right.jpg' | prepend: baseurl }}"/>
</div>

This greatly reduced the level of anxiety I felt while looking at the project.
Next, I soldered on the keys/reset switch/TRRS jack while waiting for another
microcontroller to show up in the mail:

<div class=myimgctr>
    <img class=myimg src="{{ '/assemble_left.jpg' | prepend: baseurl }}"/>
</div>

It was pretty cool to see the left half with all the keys on it. You can see
that not much remains of the original prototype. 

<div class=myimgctr>
    <img class=myimg src="{{ '/halves_without_mc.jpg' | prepend: baseurl }}"/>
</div>

Eventually, the second Elite-C was delivered, and I soldered it on, flashed the
firmware to both halves and plugged it in. However, upon plugging it in, I
discovered something pretty strange - the left side would work, but not the
right. If I plugged in the right half instead, the right half would work but not
the left. The only additional clue I had was that the light on the side that
wasn't plugged it was blinking instead of being constantly on. This was
perplexing. I tried a couple software fixes first - setting `EE_HANDS` and
explicitly telling each microcontroller whether it was the left or right side
(and correspondingly whether it was the host device or not), but that didn't
help. I got out a multimeter and checked that each pin of the trrs jack was
connected to the corresponding ring on the cable, but that seemed correct. In a
fit of desperation, I even took apart an old split keyboard I had to harvest the
4.7k resistors to try to enable I2C. However, the Kyria only uses I2C as a local
protocol to talk to the OLED display if present, or other peripherals that one
might want to attach. Disheartened and questioning my abilities as an engineer,
I gave up.

When I woke up this morning, I couldn't stop thinking about it. I figured it was
better to spend a few minutes debugging this and show up to work a bit late than
think about this all day and not get any work done, so I got out the multimeter,
found the Kyria's wiring diagram and started checking that the TRRS jack was
connected to the pins that it should have been. On the left half - no issues. On
the right half, VCC was not connected to the jack. This doesn't seem to
unreasonable since the board was pretty scuffed up from removing the perfboard
and freeing the original MC. To fix it, I added this hack:

<div class=myimgctr>
    <img class=myimg src="{{ '/hack_vcc.jpg' | prepend: baseurl }}"/>
</div>

Maybe I'm not a terrible engineer after all ;)

It's such an amazing feeling to have the assembly for this project complete.
Only took me four years. I've already started playing around with the firmware
and I have a basic mode working where the joystick emulates a mouse, and pushing
select on the joystick switches the mode to have it emulate keys instead.
However, I'm hitting a bit of an issue there where the range and accuracy of the
joystick isn't great. I tried to correct this in software, but quickly realized
that while I can get it usable, I can't get it to a state where I'd want to use
it. I've ordered some other joysticks that had better reviews to see if that can
fix the problem. Overall, pretty pleased with the progress, and I've definitely
gained some new hardware hacking skills. Really looking forward to hacking on
the firmware!
