---
layout: post
title: WebGL game of life
permalink: /posts/webgl-game-of-life/
---

In my continued efforts to learn webGL, I wanted to make an engine for conway's
game of life. Click on this post for final result!

---


<script src="{{ '/static/webgl_game_of_life/game/script.js' | relative_url }}" type="text/javascript"></script>
<script>
const vertUrl = "{{ '/static/webgl_game_of_life/game/shader.vert.c' | relative_url }}";
const renderUrl = "{{ '/static/webgl_game_of_life/game/render.frag.c' | relative_url }}";
const computeUrl = "{{ '/static/webgl_game_of_life/game/compute.frag.c' | relative_url }}";
</script>
<script src="{{ '/static/webgl_game_of_life/post.js' | relative_url }}" type="text/javascript"></script>

## WebGL Game of Life Demo

You can interact with the game state (even while its running) by clicking and
dragging on the canvas.  Pressing play will automatically run the game at the
specified frame rate, which can be changed by entering a new value and pressing
the `fps` button. You can also randomize the game state or clear it entirely!

<canvas id="glcanvas"></canvas>
<button id="pause" onclick="pauseplay()">play</button>
<button id="step" style="display: none;" onclick="game.step()">step</button>
<input id="fps" value="60"/>
<button onclick="game.setFps(document.getElementById('fps').value)">fps</button>
<button onclick="game.randomize(0.25)">randomize!</button>
<button onclick="game.randomize(0.0)">clear</button>

You can find the source code for this project here: [https://github.com/aneeshdurg/webgl_game_of_life](https://github.com/aneeshdurg/webgl_game_of_life)

## What is conway's game of life?

Conway's game of life is a set of rules for a cellular automata created by
mathematician John Conway. It's got some neat properties and is possibly turing
complete, but the only important thing for this project is that it looks cool.

The rules apply to a grid of "cells" which can either be dead or alive. The
cells effectively obey the following three rules:

1. A living cell will stay alive if and only if it has 2 or three neighbors
2. A dead cell will come to life if it has 3 neighbors
3. All cells not covered by cases 1 and 2 will turn dead or remain dead.

## How does it work?

As a first step, I looked for a way to build the user interaction I wanted -
when you click it should turn a tile "on". To do this I found
[this](https://stackoverflow.com/a/47591468/5803067) stackoverflow answer that
has everything I needed, so I reimplemented the code in that answer to get a
good understanding of how it works. Essentially, we can use a `Uint8Array` in
javascript to create a texture, and by setting values in that array and
rebinding that array to the texture, we can update what is rendered. The one
tricky thing to note here is scaling. We'll need to convert the coordinates from
the canvas to coordinates in the texture, keeping in mind that a single pixel in
the texture corresponds to some "block" of pixels in the canvas. I later
found out that this process could have been done a little better had I used
`webgl2` since it exposes better functions for dealing with textures.

Next I needed some way to actually update the state of the game. Here I used a
second canvas that's hidden from the display, and by attaching a framebuffer to
that canvas I was able to implement the automaton rules as a fragment shader
using the code below:

```cpp
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
precision highp int;
#else
precision mediump float;
precision mediump int;
#endif

uniform sampler2D u_texture;

#define CANVAS_WIDTH   640.0
#define CANVAS_HEIGHT  480.0

uniform float u_tile_width;
uniform float u_tile_height;

vec2 textureSize = vec2(128.0, 128.0);

float
neighborState(int x_off, int y_off)
{
    // Can look at any channel except alpha here
    return texture2D(
        u_texture,
        (gl_FragCoord.xy + vec2(float(x_off), float(y_off))) / textureSize).r;
}

float
isGEq(float a, float b)
{
    return sign(sign(a - b) + 1.0);
}

float
isEq(float a, float b)
{
    return isGEq(a, b) * isGEq(b, a);
}

void main() {
    float gol_score =
        neighborState(-1, -1) + neighborState(0, -1) + neighborState(1, -1) +
        neighborState(-1,  0) +                        neighborState(1,  0) +
        neighborState(-1,  1) + neighborState(0,  1) + neighborState(1,  1);

    float my_state = neighborState(0, 0);
    vec4 dead = vec4(0.0, 0.0, 0.0, 1.0);
    vec4 alive = vec4(1.0, 1.0, 1.0, 1.0);

    gl_FragColor =
        my_state * (
            isGEq(gol_score, 4.0) * dead + // >= 4 neighbors => dead
            isGEq(1.0, gol_score) * dead + // <= 1 neighbors => dead
            isGEq(gol_score, 2.0) * isGEq(3.0, gol_score) * alive)
        + (1.0 - my_state) * (
            isEq(gol_score, 3.0) * alive +
            (1.0 - isEq(gol_score, 3.0)) * dead);
}
```

Then I just needed to read the pixels from the framebuffer texture back into a
javascript array and make the rendering canvas use the new pixels as input.

That's pretty much the whole story! I learned a lot about framebuffers and how
one could use multiple shaders at once. I think my implementation is still
messy and inefficient in some places. I think it's probably possible to do thing
using only one webgl instance and swapping between two framebuffers. I'm not
sure how the interaction with the DOM events would work in that case. Aside
from that I think there's a few more bells and whistles I could add, or even
customizable rule sets. Maybe I could even use what I learnt from writing a
hexel shader to generalize this to create automatons out of any tesselating
shape. For now, it's good enough and it looks pretty cool!
