---
layout: post
title: Six Months of Isolation
permalink: /posts/six-months-of-isolation/
---

It's been 6 months since I entered the "new normal", what have I been up to?

---

Since quarantine has started I've had a lot more time to myself. The title of
this post is a bit of a misnomer, because I have been meeting friends IRL
(following social distancing protocols), but not very frequently. Still, not
having to commute to work has freed up a lot of my time and energy which I've
been pouring into my personal projects. I thought it might be nice to step back
and catalogue my progress here since not all of my projects get their own posts.
It's also just nice for me to reflect and what I've learned over this time span.

What follows is a (approximately) chronological summary of what I've least
recently worked on since somewhere around early March.


## A Conway's Game of Life simulator
[https://github.com/aneeshdurg/webgl_game_of_life](https://github.com/aneeshdurg/webgl_game_of_life)

I first heard of Conway's Game of Life in middle school and I loved the visual
aspect of it. I've implemented it in various languages before, but never on a
GPU. I'd never really played around with framebuffers in WebGL so implementing
this simulator was a good chance to learn a bunch about it. The code is kinda
messy since I didn't really know what I was doing, but the end result was
decent.


## A Pi Calculator
[https://github.com/aneeshdurg/webgl-pi-digits](https://github.com/aneeshdurg/webgl-pi-digits)

This was my pi-day (March 14th) project where I wanted to try using WebGL to
implement an algorithm for computing digits of PI. I'd never really used WebGL
for computation before, so this involved learning a lot about the various
internal formats for the framebuffers and how to pull data out of the GPU. I
also took what I learned from the game of life project to make a much cleaner
implementation using the library `twgl`. I also added some tests.

## YATDG - yet another tower defense game
[https://github.com/aneeshdurg/YATDG](https://github.com/aneeshdurg/YATDG)

[https://aneeshdurg.me/YATDG/demo](https://aneeshdurg.me/YATDG/demo)

Unfortunately, this project isn't exactly complete, but there's a working demo
linked above. The actual goal was to make a multiplayer tower defense game where
the player could build their own tracks and purchase waves of enemies to send to
the other player.

While I did put it down, I still learned a bunch about game development using
web APIs.

## Snake99
[https://github.com/aneeshdurg/snakeBattleRoyale](https://github.com/aneeshdurg/snakeBattleRoyale)

[https://aneeshdurg.me/snakeBattleRoyale](https://aneeshdurg.me/snakeBattleRoyale)

This was the main reason I stopped working on `YATDG`. I wanted to enter in
ludum dare 46, so I need to start a new project during the contest. As a kid I
loved playing the games that came out of game jams like ludum dare, and I'd
always wanted to enter. This game is a multiplayer version of snake that works a
bit like Tetris99. You play a regular game of snake but can shed some of your
length and send it to another player, hoping to trap them. For the multiplayer
features, I used `peerJS`. I probably spent more time on the networking features
than the actual gameplay/default AIs (I literally finished a hour before the
deadline), so it isn't a super fun game to play. It was a really good learning
experience, and making the game preform well over the network was a fun
exercise. I especially enjoyed playing around with peer-to-peer communication in
the browser.

## CameraTheremin-gl and some other related work
[https://github.com/aneeshdurg/cameraTheremin-gl](https://github.com/aneeshdurg/cameraTheremin-gl)

[https://github.com/aneeshdurg/FastMattingPortrait](https://github.com/aneeshdurg/FastMattingPortrait)

This is another unfinished project, but it took me down some fun rabbit holes. I
wanted to make a more performant version of my
[CameraTheremin](https://aneeshdurg.me/CameraTheremin/), so I turned to WebGL.
This isn't a new idea, and I've actually had a branch on the camera theremin
fromm all the way back in 2017 that tried to do this. At the time however, I
didn't really understand WebGL well enough to make it work. The code for the
original camera theremin was also terrible so I tried to rewrite the whole thing
instead. After implementing the WebGL version, I found it to not be that much
better than my old implemention. Of course, it performed at a much higher
framerate, but it didn't solve any of the real issues that plauged the theremin,
namely noise. I decided that using an image matting or image segmentation
approach might be a lot better in terms of reducing noise. I poked around and
read a bunch of papers on how to do fast image matting, and decided that the
best approach might be to using either onnx or tensorflow's browser support to
run some neural networks in the browser (with GPU acceleration!). I found a
paper that seemed promising, but couldn't find any working open source
implementations of it. I forked a repo that had an incomplete implementation and
finished it myself. I'd never used pyTorch before, and I found it pretty easy to
pick up. I ended up emailing the authors of the paper for some clarifications
and created a trained model. However, without a good dataset I couldn't get the
results presented in the paper.

Slightly discouraged, I instead found a pretrained model for a different network
online, and compiled it to the format that the web version of tensorflow
expects. However when I tried to run it, it crashed firefox, and made OSX lock
up until I rebooted it. I'd seen a similar thing happen when reserving large
buffers and doing heavy computation in my pi calculator project, but at this
point I had lost interest in pursuing the project further (there's a common
theme amongst a lot of these projects isn't there...). I might come back to
this someday.

## compy
[https://github.com/aneeshdurg/compy](https://github.com/aneeshdurg/compy)

This was supposed to be part of a larger project that I'll probably do
eventually. However, unlike a lot of my other projects on here, `compy` itself
is actually functionally complete. It's a rust implementation of bash's
`compgen` utility. Along the way I also made a few rust crates for parsing
`/etc/hosts` and `/etc/services`. I had a lot of fun working on this and got to
try my hand at some rust-fu while also getting the experience of publishing my
work on crates.io.

The larger project I wanted to integrate this into is a shell that has a lot of
graphical features, like capture stdout/stderr of child processes and displaying
it in a "box" and having "windows" for applications like `vim` that implement a
tui.

## peerrs-binarypack
[https://github.com/aneeshdurg/peerrs-binarypack](https://github.com/aneeshdurg/peerrs-binarypack)

This is a rust port of `peerjs-binarypack`. Not much to say about it. Eventually
I want to make a rust client that follows the `peerjs` protocol, but I'm waiting
for good support of `WebRTC` in rust. Maybe if I have more energy someday I'll
look into actually filling in some of those gaps, but `WebRTC` is huge and super
daunting.

## ephemeral
[https://aneeshdurg.me/ephemeral/](https://aneeshdurg.me/ephemeral/)

[https://github.com/aneeshdurg/ephemeral](https://github.com/aneeshdurg/ephemeral)

This project is still WIP, and I'll probably write a full post about it someday,
so I won't say too much here. It's a social network built on top of `peerJS`.
I've been working on it to learn more about distributed systems and and
peer-to-peer protocols. The goal is to have something that feels a
bit like twitter. I've learnt a lot so far, not just about peer-to-peer
protocols and implement, but also about typescript, setting up a
project with npm and webpack, and about frontend development in general.

## frugen

[https://github.com/aneeshdurg/frugen](https://github.com/aneeshdurg/frugen)

This is technically something I was doing for my actual job. We needed the
ability to edit a fru dump, and so I added that feature to frugen. This project
helped push me out of my comfort zone by contributing to a real open source
project with it's own style. I'm still working on getting my PR through.

## Building my own keyboard

[https://aneeshdurg.me/posts/building-a-keyboard/](https://aneeshdurg.me/posts/building-a-keyboard/)

I decided to build a custom keyboard. I've got a post up on this blog detailing
my progress so far. Unfortunately, this project is currently on hold because
it's expensive! I've already spent around $150, and I think the best way forward
is to buy a 3d-printer. I'll probably make another post talking about what's
going on when I think I've made some interesting progress.

## mandelbrot

[https://github.com/aneeshdurg/mandelbrot](https://github.com/aneeshdurg/mandelbrot)

A pretty basic mandelbrot implementation in WebGL. It was intersting to see how
the math behind the pretty colors work.

## This blog!

Since quarantine I've made 7 posts including this one! Considering that this
entire blog only has 18 posts, that's a lot! In general, I've made more posts in
2020 than any other year, which isn't saying much considering how there's
no posts at all in 2019. Not all the projects above got their own post, but
there's also a few posts that aren't big enough for me to consider them as their
own project.

## What's next?

It was pretty fun putting together this list and seeing how I've grown. I'm
definitely way more comfortable with WebGL now and I think I've grown a fair bit
as a frontend dev. I've also learnt a lot about how WebRTC works, how the mp4
file format works and bunch of stuff about video stream that I read up on while
working on `ephemeral`. It really does feel like systems programming in the
browser is a reality these days! I've also learnt a fair bit about putting
together bigger projects. 

To be honest, I think I've pushed myself pretty close to burning out. I'd
actually like to make more smaller blog posts that just explore a simple idea or
documents some piece of learning instead of pushing myself to take on larger
projects. I'd also like to actually finish the projects I'm working on. Maybe
that's a transformation this blog will see, who knows?
