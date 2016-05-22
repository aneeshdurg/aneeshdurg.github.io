---
layout: post
title: Camera Theremin 
permalink: /posts/CameraTheremin
---

This post details how I made the [CameraTheremin](https://aneeshdurg.github.io/CameraTheremin/). I hope you find it useful.

## The motivation

I've always thought that one of the coolest instruments in the world is the Theremin. What other instrument can you play without touching? Howevver, Theremins cost around $300 and as a non-musician who just wants to try it out for the sake of novelty, that's a bit pricey. 
That being said, I still wanted to try one and decided to recreate the experience in my browser using JavaScript and getUserMedia (my initlal approach was to use python and openCV+pyo, but I later abandonded that for a variety of reasons, most noteably the fact that it required a user to install python and all the required packages, as opposed to opening a url).

So, what do we really need to recreate a theremin like experience? We need:

* Something to control the pitch
* Something to control the volume.

I felt like proximity to the camera would be a rather novel and fun experience to play with, so I decided to use that to control the pitch, while volume would be controlled by the horizontal movement.

## Getting webcam input with getUserMedia

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

## Image processing using canvas

In order to modify and edit the image data, I had to first draw the obtained frame from the video to a canvas element. To do this, I used added the line `requestAnimationFrame(draw)` at the end of my `startStream` function which tells the browser to call the function `draw` before refreshing the display.

The function `draw` does the following:

1. A function which converts the video to canvas data
2. Function calls which handle the image processing
3. Put the image data back into the canvas
4. call `requestAnimationFrame(draw)` so that the next frame can be processed.

To accomplish (1), I have the following function:

```javascript
function readFrame(){
    try{
        context.save();
        context.scale(-1, 1);
        context.drawImage(video, -width, 0, width, height);
        context.restore();
    } catch(e){
        console.log(e);
        return null;
    }
    return context.getImageData(0, 0, width, height);
}
```
This return an array of the image data. By using `context.scale(-1, 1)`, I am able to mirror the video input so that the displayed feed seems more natural to the user.
///////

In order to detect proximity, I first seperated the foreground from the background and then used the area of the foreground as a measure of distance. This works because as objects are moved closer to or further from the camera, they take more and less area respectively as shown below with my finger as the object:

### closer

![closer to the camera](https://raw.githubusercontent.com/aneeshdurg/aneeshdurg.github.io/master/images/2016-5-22-Camera-Theremin/closer.png)

### further

![further from the camera](https://raw.githubusercontent.com/aneeshdurg/aneeshdurg.github.io/master/images/2016-5-22-Camera-Theremin/further.png)

In order to seperate the foreground from the background, I created two methods, which you can switch between, depending on which is more suitable for you lighting and surrounding conditions.

In both methods, the obatined frame was first converted to gray scale:

```javascript
function bgr2gray(data){
    for(var i = ys; i<ye; i++){
        for(var j = xs; j<xe; j++){
	    var k = i*4*width+4*j
	    var lumin = 0.21*data[k]+0.72*data[k+1]+0.07*data[k+2];
	    data[k] = lumin;
	    data[k+1] = lumin;
	    data[k+2] = lumin;
        }
    }
}
```
then blurred to improve accuracy by convolving a hardcoded blur kernel with the image data.

### Method 1: Thresholding

This method is rather simple and uses the following function:

```javascript
function threshold(data, thresh, a, b){
    xavg = 0;
    counter = 0;
    for(var i = ys; i<ye; i++){
        for(var j = xs; j<xe; j++){
	     var k = i*4*width+4*j
             if(data[k]>thresh){
                 data[k] = a;
                 data[k+1] = a;
                 data[k+2] = a;
             }		
             else{
                data[k] = b;
                data[k+1] = b;
                data[k+2] = b;
                xavg+=(k/4)%width;
                counter++;
	    }	
        }
    }
    xavg/=counter;
    document.getElementById("xavg").innerHTML = xavg;
}
``` 

This function assumes that if the intensity of a certain point is greater than a certain threshold, it must be part of the background, and thus transforms the grayscale image into a binary image. Since `data` is my canvas data, the indicies access the RGBA channels which is why `k` has to be multiplied by 4.
