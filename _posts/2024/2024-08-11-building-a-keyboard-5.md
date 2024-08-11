---
layout: post
title: Building a keyboard (part 5)
series: building-a-keyboard
permalink: /posts/2024/08/building-a-keyboard-5/
---

Strengthening the assembly and programming!

---

{% assign baseurl = "/static/images/2024-08-11-building-a-keyboard" | relative_url %}

<style>
.myimg { max-width: 50%; }
@media (orientation: portrait) {
  .myimg {
    max-width: 85%;
  }
}
.myimgctr { text-align: center; }
</style>

Now that I can start programming the keyboard, the first challenge was to get
the two halves to send joystick data across the wire. My initial approach was to
try adding code in `matrix_scan_user` that directly performed actions based off
of the joystick pins, but this only works on the master side. By default, QMK
only sends the state of the matrix across the wire from the slave to the master,
so logic that sends reports to the host must only be performed on the master.

This led me down a mini rabbit hole where I tried to encode the joystick state
as part of the matrix, but I couldn't quite figure it out, which is just as well
because I found what I really wanted - RPCs. QMK allows arbitrary RPC messages
to be defined (with a modest maximum message size of 8 bytes) which allows the
master to invoke a function on the slave and receive a response. Here's the code
I'm using:

```c
typedef struct {
    int x;
    int y;
    bool sw;
} joystick_state;

...

void get_local_joystick_state(joystick_state* out_data) {
    out_data->x = analogReadPin(F0);
    out_data->y = analogReadPin(F1);
    out_data->sw = readPin(C7);
}

// Send data from the right half to the left
void get_joystick_state_handler(uint8_t in_buflen, const void* in_data, uint8_t out_buflen, void* out_data) {
    // const rpc_req *req = (const rpc_req*)in_data;
    get_local_joystick_state((joystick_state*)out_data);
}

void keyboard_post_init_user(void) {
    transaction_register_rpc(RPC_GET_JOYSTICK_STATE, get_joystick_state_handler);
}

...
void matrix_scan_user(void) {
    if (!is_keyboard_master()) {
        return;
    }

    joystick_state new_left;
    get_local_joystick_state(&new_left);
    process_left_joystick(&new_left);

    joystick_state new_right = {0, 0, false};
    bool rpc_success = transaction_rpc_exec(
        RPC_GET_JOYSTICK_STATE, sizeof(joystick_state), &state_left,
        sizeof(joystick_state), &new_right);
    if (rpc_success) {
        process_right_joystick(&new_right);
    }
}

```

While I think this could have been made to be easier to find in the QMK docs, I
appreciate how QMK is designed in a way that writing code that incorrectly uses
parts of the internal API is difficult. Encoding the joystick state in the
matrix would have been a weird use of the default infrastructure and the RPC
approach is much more flexible and allows me to supply my own logic outside of
QMK's APIs.

To hook the joystick up to button presses, I added some nice interfaces that
allows me to define an action and it's "inverse" so I can have a virtual button
"held down" when the joystick is in some location, and "released" when the
joystick moves next. However, the joysticks that I have installed were pretty
bad in terms of resolution, and the solution to mount them was a modest amount
of hot glue. I'm not against using hot glue, but if used in large quantity, it's
hard to remove later. I'd like to be able to swap out the joysticks to try
different profiles, different positions, and maybe even try some other input
mechanisms besides joysticks at some point. In light of that, what I really
wanted was some kind of platform that the joysticks could sit on that made
replacement easy. My first approach was to try molding something that would use
the slots for where a switch would have gone out of hot glue.

<div class=myimgctr>
    <img class=myimg src="{{ '/hotglueartisan.jpg' | prepend: baseurl }}"/>
</div>

Pictured above is me trying to cure such a casting with a piece of ice in a
ziploc bag. Almost needless to say, but this didn't work at all, and was a huge, so
mess. I was about to throw in the towel and resign myself to learning how to 3D
print at my local library before I remembered that my brother had given me a 3D
printing pen a few years ago. At the time, I didn't really know what to do with
one, and the few ideas I had quickly met the reality that using a 3D pen was a
skill that I hadn't grown yet. However, it seemed like a good tool to try using
on my current problem.

<div class=myimgctr>
    <img class=myimg style="max-width: 30%;" src="{{ '/penpart1.jpg' | prepend: baseurl }}"/>
    <img class=myimg style="max-width: 30%;" src="{{ '/penpart2.jpg' | prepend: baseurl }}"/>
    <img class=myimg style="max-width: 30%;" src="{{ '/penpart3.jpg' | prepend: baseurl }}"/>
</div>

This worked better than I expected! It took a few attempts to get one I was
happy with (the one pictured above is one of the early attempts), but once I had
something reasonable, I swapped out the tip on my soldering iron to a flat tip
that I could then smooth and cleanup the part with.

Next, I got a replacement joystick, but the PCB it came with was too large to
mount in the existing assembly, so I made a small hand-wired circuit instead.

<div class=myimgctr>
    <img class=myimg style="max-width: 45%;" src="{{ '/newjoystick1.jpg' | prepend: baseurl }}"/>
    <img class=myimg style="max-width: 45%;" src="{{ '/newjoystick2.jpg' | prepend: baseurl }}"/>
</div>

To attach the joystick to the 3D printed part, I used a bit of hot glue.
However, this revealed that moving the joystick would pull the platform out of
the switch slots, so I ended up adding a bit of a brace on the other side to
really hold things down.

<div class=myimgctr>
    <img class=myimg src="{{ '/reinforced.jpg' | prepend: baseurl }}"/>
</div>

This isn't ideal since I wanted something I could just pull out and mess around
with, but it's simple enough to remove the backplate, cut the brace, and then
add the braces back when I'm ready to close things up again.

The project is really coming together! This entire post was typed exclusive on
the new keybaord. I don't really like the 3 row layout so far - when I revisit
designing the layout itself, I'll probably do a 4x6 style matrix. So far, the
joysticks don't seem super useful. This is a combination of the joystick
positioning being a bit awkward, but also the joysticks not being mapping to
anything super interesting. I think I'll probably need to explore moving the
joysticks further down. Having unlocked the 3D pen as a tool feels super
empowering though, and I think it'll give me greater freedom in figuring out
where the joystick will live!
