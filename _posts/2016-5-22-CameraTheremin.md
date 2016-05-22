---
layout: post
title: Camera Theremin 
permalink: /post/
---

##The motivation
I've always thought that one of the coolest instruments in the world is the Theremin. What other instrument can you play without touching? Howevver, Theremins cost around $300 and as a non-musician who just wants to try it out for the sake of novelty, that's a bit pricey. 
That being said, I still wanted to try one and decided to recreate the experience in my browser using JavaScript and getUserMedia (my initlal approach was to use python and openCV+pyo, but I later abandonded that for a variety of reasons, most noteably the fact that it required a user to install python and all the required packages, as opposed to opening a url).

So, what do we really need to recreate a theremin like experience? We need:

* Something to control the pitch
* Something to control the volume.

I felt like proximity to the camera would be a rather novel and fun experience to play with, so I decided to use that to control the pitch, while volume would be controlled by the horizontal movement.

##Getting webcam input with getUserMedia

Getting webcam input with getUserMedia is a snap. All it took was the following lines:

```javascript
var video = document.getElementById("vid");
var constraints = {
    video: {
        mandatory: {
	    maxWidth: 320,
	    maxHeight: 180
	}
    }
} 
navigator.getUserMedia(constraints, startStream, function(){});
function startStream(stream){
    video.src = URL.createObjectURL(stream);
    video.play();
}
```

The call to getUserMedia takes 3 arguments, the constraints, a success callback, and a error callback.

You can see here that I've not actually defined a error callback, but instead left an empty function in its place.

On succsesfully obtaining the webcam stream, this is sent to the startStream function which puts my webcam stream into an HTML video object.

Now it's time to start processing the obtained frames.



