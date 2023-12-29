---
layout: post
title: Arduino Keyboard Mouse 
permalink: /posts/arduino-keyboard-mouse 
---

Recently, I came across [this post](http://mitchtech.net/arduino-usb-hid-keyboard/) which I found pretty interesting as
a fellow owner of a arduino UNO. I also had a few cherry switches left over from a recent mechanical keyboard build, so
I wanted to try my hand at building a keyboard/mouse from scratch as a learning exercise. You can find my current
progress on this project over at [https://github.com/aneeshdurg/arduino-keyboard/](https://github.com/aneeshdurg/arduino-keyboard/).

Digging deeper, I was able to find an archive of the original blog detailing how to write firmware for the UNO to make
it appear as a USB HID device. You can find it
[here](https://web.archive.org/web/20131012123952/http://hunt.net.nz:80/users/darran/blog/). Luckily most of the links
to downloading the source work on the archived page! Using that I was able to grab the sources for both the arduino
keyboard and arduino mouse files. To learn more about the steps involved in making the UNO report itself as an HID, see
Darran's posts on the blog. They're really well written and informative, so I'd suggest reading them to get more context
on what I'm doing here.

After reading a couple of posts on the blog, I found the one detailing how to compile the code, and accordingly
downloaded LUFA (ver. 100807). From there, I fused some of the code from the LUFA example KeyboardMouse project and
Darran's keyboard to create a driver that would enable both keyboard and mouse input. I also improved upon Darran's
protocol slightly to allow for messages with less average overhead. To build my driver, download the LUFA source and
copy `arudino-keyboardmouse` into the `Projects` folder wherever you installed LUFA.

You can download my firmware here:

+ [arduino-keyboardmouse.hex](https://raw.githubusercontent.com/aneeshdurg/arduino-keyboard/1b7e2b5ab11b4eccae6f421de2ae3fbf13634ab9/arduino-keyboardmouse.hex)

To use it with an arduino uno, you'll need both the UNO_keyboardmouse and usb_hid_keys libraries here:

+ [arduino libraries](https://github.com/aneeshdurg/arduino-keyboard/tree/1b7e2b5ab11b4eccae6f421de2ae3fbf13634ab9/libraries)

This link also has libraries for some adafruit sensors I used to test the mouse functionality with an accelerometer. To
install the libraries, copy them into your arduino sketchbook path, or, just use the makefile I provided in my project
and modify the `TARGET` variable.

As a summary, the things I've learned so far from attempting this project have been:

+ How the USB HID protocol works.
+ How to write drivers for USB devices.
+ What arduino firmware is and how to write custom firmware.
+ Strategies for debugging device drivers.

The following things are goals for this project:

+ Rewrite the driver using the latest version of LUFA.
+ Document the protocol I'm using.
+ Enable mouse scrolling.
+ Make the accelerometer mouse usable.
+ Wire up my keys to make a macro pad.
