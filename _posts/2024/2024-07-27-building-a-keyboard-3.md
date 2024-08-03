---
layout: post
title: Building a keyboard (part 3)
series: building-a-keyboard
permalink: /posts/2024/07/building-a-keyboard-3/
---

Fixing up the board and writing some basic firmware

---

{% assign baseurl = "/static/images/2024-07-27-building-a-keyboard" | relative_url %}

<style>
.myimg { max-width: 50%; }
@media (orientation: portrait) {
  .myimg {
    max-width: 85%;
  }
}
.myimgctr { text-align: center; }
</style>

Last time, an ugly hack got the board up and running, but left it in a state
where I couldn't finish assembly. In order to be able to use the keyboard, I
needed to regain access to the TRRS jack pads, the reset switch, and remove the
pcb from the bottom so that the case could be assembled. To achieve this, I
started by first breaking the perfboard apart until I could cut off the pins
from the microcontroller. Then, I heated up each of the remaining junk in the
slots until I had a clean PCB again:

<div class=myimgctr>
    <img class=myimg src="{{ '/disassembled.jpg' | prepend: baseurl }}"/>
</div>

This process was horrible. I felt very accomplished when I finally got it, but
I've learned my lessons - In the future, for an initial prototype, I'll be
either socketing my MCUs, or I'll try to keep the pins exposed so I can cut them
more easily to allow reuse. MCUs aren't cheap, but more than the cost, it was
frustrating to have the component I needed, but not be able to use it. I can
live with sinking 20-30 bucks on a new controller, but not having the parts I
need when I have time to work on something might mean that I'll never actually
do it.

I also bought a new elite-c to use as the controller, since I scratched the
original one up pretty badly in this process. With the new controller, I
soldered the pins pretty high up so I'd have room for the joystick. This
revealed that I scratched off one of the pads on the underside of the PCB so I
needed the following hack:

<div class=myimgctr>
    <img class=myimg src="{{ '/hack.jpg' | prepend: baseurl }}"/>
</div>

However, once this was done, I could slide the joystick under the
microcontroller and hook it up by using some jumper cables, no soldering
required. This is because the joysticks I'm using here aren't amazing, and I
think that I might try to replace them in the future for nicer parts, so being
able to swap it out easily seems prudent. I am still hot gluing it down, but
maybe eventually I'll come up with a better way to hold it in place. For now,
it's a relatively small amount of hot glue - one corner is held down by the
microcontroller, so a small drop of glue in the center just makes it so that the
joystick doesn't shift around when I'm using it.


<div class=myimgctr>
    <img class=myimg src="{{ '/finished.jpg' | prepend: baseurl }}"/>
</div>

Now, time to move on to the part I'm actually okay at - writing code.

The QMK documentation is a bit terse, so I'm not sure if I'm using the best APIs
for this (though reading the source code was actually really helpful), but I
added a custom `matrix_scan_user` which reads the joystick pins and triggers
various actions. Currently, the only action it triggers is a macro to dump the
state of the joystick. I couldn't find an API to submit user keycodes to, so I
think I'll need to write my own wrappers around this so I can handle submitting
events, but then submitting the inverse event when the joystick returns to rest
(e.g. keydown when the joystick enters a trigger zone, keyup when returning to
center - for layers I'll need to call `layer_on` and `layer_off` and for custom
actions I need to directly invoke `process_record_user`). I also began
implementing a custom mouse driver so that the joystick can be used as a mouse.
It's pretty cool, and I can't wait to put the other half together and start
using this for real! Here's the code I've added so far:

```c
#include "analog.h"
void matrix_init_user(void) {
    // Select button on joystick
    setPinInputHigh(C7);
    // F0 and F1 are the x and y pins respectively
}

int x, y;
int sw_state = false;
keyrecord_t record;
uint16_t js_keycode;
bool had_js_event = false;
bool enable_mouse = true;
void matrix_scan_user(void) {
    int new_x = analogReadPin(F0);
    int new_y = analogReadPin(F1);
    int new_sw_state = readPin(C7);

    if (x != new_x || y != new_y) {
        x = new_x;
        y = new_y;

        if (!enable_mouse) {
            if (x == 0 && y == 0) {
                record.event = MAKE_EVENT(0, 0, true, KEY_EVENT);
                js_keycode = LOL;
                // process_action(&record, action_for_keycode(js_keycode));
                process_record_user(js_keycode, &record);
                had_js_event = true;
            } else if (x == 507 && y == 514) {
                if (had_js_event) {
                    record.event.pressed = false;
                    process_record_user(js_keycode, &record);
                    // process_action(&record, action_for_keycode(js_keycode));
                }
                had_js_event = false;
            }
        }
    }

    if (new_sw_state != sw_state) {
        sw_state = new_sw_state;
        if (sw_state == 0) {
            enable_mouse = !enable_mouse;
        }
    }
}


void           pointing_device_driver_init(void) {}
report_mouse_t pointing_device_driver_get_report(report_mouse_t mouse_report) {
    if (enable_mouse) {
        int xval = ((x - 507) / 2);
        mouse_report.h = 0;
        mouse_report.v = 0;
        mouse_report.x = xval == 0 ? 0 : ((x > 0) ? -1 : 1);
        mouse_report.y = y == 514 ? 0 : ((y > 514) ? 1 : -1);
    }

    return mouse_report;
}
uint16_t       pointing_device_driver_get_cpi(void) { return 1; }
void           pointing_device_driver_set_cpi(uint16_t cpi) {}

bool process_record_user(uint16_t keycode, keyrecord_t *record) {
    char string[100];

    switch (keycode) {
    case LOL:
        if (record->event.pressed) {
            // when keycode QMKBEST is pressed
            //SEND_STRING("QMK is the best thing ever!")
            if (sprintf(string, "x: %d, y: %d s: %d", x, y, sw_state) > 0)
                send_string(string);
        } else {
            // when keycode QMKBEST is released
        }
        break;
    }
    return true;
};
```
