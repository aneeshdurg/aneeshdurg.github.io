---
layout: post
title: Smart Zoom - a chrome extension using getUserMedia 
permalink: /posts/Smart-Zoom/ 
---

I recently made a chrome extension called [smartZoom](https://chrome.google.com/webstore/detail/smartzoom/edhnoodpplcedbalpigcmgojicolfdbg) which makes chrome set the browser's zoom level based off of the user's proximity to their laptop using getUserMedia.
While I wouldn't say it's entirely complete and working they way I want it to, it can definately be considered a proof of concept.

---

## Table of Contents

* [The motivation](#the-motivation)
* [Detecting Proximity](#detecting-proximity)
* [Improvimg proximity detection 1: Cropping the frame](#improving-proximity-detection-1)
* [Improvimg proximity detection 2: Largest object](#improving-proximity-detection-2)
* [Improvimg proximity detection 3: Edge detection](#improving-proximity-detection-3)
* [Improvimg proximity detection 4: Tracking the user](#improving-proximity-detection-4)
* [Determining the zoom level](#determining-the-zoom-level)
* [Putting it all together as a chrome extension](#putting-it-all-together-as-a-chrome-extension)
* [Determining Parameters automatically](#determining-parameters-automatically)

## The motivation

I was just browsing reddit on my laptop and had placed the laptop on the other end of the bed and realized that it was too far away for me to read it properly. I thought to myself "it would be so convinient if my browser zoomed in and out for me instead of having to press a few keys". And so, I stopped browsing reddit and started writing code.

## Detecting Proximity

I got the idea for this extension while I was working on my [Camera Theremin](https://aneeshdurg.github.io/CameraTheremin) and so the method for detecting proximity is the same and you can read about it [here](http://aneeshdurg.github.io/posts/CameraTheremin#proximity-detection-method-1). However, I needed to make some modifications to be able to use the value returned from this function as a way to set the browser's zoom level. 

## Improving proximity detection 1

#### Cropping the frame

The simplest method I could think of to improve the detection was to crop the frame to remove objects to the sides of the user and have a region of interest containing only the thresholded user, thus giving us a more accurate measure of proximity.
Of course, this method has it's flaws. This doesn't help us remove objects that are too close to the user and requires the user's effort to determine where to crop the frame. As a result, it is merely the first step in my efforts to improve the accuracy of detection. 
Implementing this method was quite easy. After setting up some buttons to change the boundries to which the frame should be cropped, all that needed to be done was to change loops that iterate through pixels in the image to:

```javascript
for(var i = ys; i<ye; i++){
	for(var j = xs; j<xe; j++){
		var k = i*width+j;
		//allows us to access thresholded[k]
		//which has (x,y) coordinates (j, i)
	}
}
```

Where `xs = x-start`, `xe = x-end`, `ys = y-start`, `ye = y-end`

Since this reduces the number of pixels we access, decreasing the overall area by modifing the boundries allows for faster runtime. 

## Improving proximity detection 2

#### Largest object

The next most obvious thing I could think of was to only consider the largest object. For this I used blob detection. A blob can be thought of as a collection of pixels all sharing a property that are connected.

The algorithm is as follows:

1. Choose a starting pixel, if 0, choose the next pixel until the chosen pixel has value 255
2. Initialize area counter to 0.
3. Mark the current pixel as seen (by setting it's value to 0) and update the area counter.
4. Search in all directions for another pixel of value 255. If multiple adjacent pixels have a value of 255, choose one to move to and store the remaining locations in a list.
5. Update the area counter, mark the new location and search again.
6. Repeat until there are no more 255 pixels in any direction. If the list of remaining locations is not empty, move to a location in the list.
7. Repeat until there are no more 255 pixels in any direction and the list is empty.

And thus the blob with the largest area can be found.

The code:

```javascript 
function blobDetect(data, src){
	var dir = [1, -1, width, -width, -width-1, -width+1, width+1, width-1];
	var maxArea = -1;
	maxPts = [];
	var numBlobs = 0;
	for(var i = 0; i<src.length; i++){
		var area = 0;
		var pts = [];
		if(src[i]==255){
			var done = false;
			var j = i;
			var temp = new Array();
			numBlobs++;
			while(!done){
				if(src[j]==0){
					if(temp.length==0)
						break;
					else{
						j = temp.pop();
						continue;
					}						
				}
				src[j] = 0;
				area++;
				pts.push(j);
				var changed = false;
				for(var d = 0; d<8; d++){
					if(j+dir[d]>0&&src[j+dir[d]]>0){
						if(!changed){
							j = j+dir[d];
							changed = true;
						}
						else
							temp.push(j+dir[d]);
					}
				}
				if(!changed&&temp.length==0){
					done = true;
				}
				else if(!changed){
					j = temp.pop();
				}
			}
			if(maxArea==-1||area>maxArea){
				maxArea = area;
				maxPts = pts;
			}
		}
	}
	return numBlobs, maxArea;
}
```

This improves accuracy as the user is likely to be the largest object in the frame most of the time. However, this extension is supposed to zoom the browser in as the user moves away from his/her laptop, and thus this method fails to detect the user if the user is no longer the largest blob (i.e. the user is too far away) and will always detect the closest object. 

This method is also influenced by object close to the user. For example, if the user is sitting on a chair on in front of a bed, those objects may be in the same blob as the user.

## Improving proximity detection 3

#### Edge detection

Through edge detection, we can solve the problem of blobs containing multiple objects. While there are many methods of edge detection such as finding the derivatives of the image or using canny edge detection, I chose the simplest method of considering an edge to be a location where the difference in intensities of two pixels is larger than a certain threshold. 
While this isn't the most accurate method of edge detection, it yields results within an acceptable range of error. The code is as follows.

```javascript
function EdgeDetect(data, thresh){
	//draw black edges
	var len = blur.length;
	var dir = [1, -1, width, -width, 1+width, -1+width, -1+width, -1-width];
	for(var i = ys; i<ye; i++){
		for(var j = xs; j<xe; j++){
			var k = i*width + j;
			for(var l = 0; l<8; l++){
				if(k+dir[l]>0&&k+dir[l]<len){
					if(difference(data, k, k+dir[l])>thresh){
						thresholded[k] = 0;
						//dilation
						for(var m = 0; m<8; m++){
							if(k+dir[m]>0&&k+dir[m]<len){
								thresholded[k+dir[m]] = 0;
							}
						}
					}
				}
			}
		}
	}
}
function difference(data, pos, pos2){
	var ret = 0;
	for(var i = 0; i<3; i++){
		ret+=(data[4*pos+i]-data[4*pos2+i])*(data[4*pos+i]-data[4*pos2+i]);
	}
	return Math.sqrt(ret);
}
```

I've also dilated the edges so that the blobs are more distinct and have a lower chance of being connected. 

Now that we're able to distinguish the user from his surroundings, all that's left is to ensure that we're tracking the user and not his/her surroundings.

## Improving proximity detection 4

#### Tracking the user

To track the user, I realized that I need to record the position of the user and ensure that the movement of the user is realistic. This was done by finding the centroid of each blob and selecting the largest blob that was within a certain radius of the user's old position. Of course this also has some glitches and may occasionaly track objects that aren't the user, but I have not found a better way to do this yet. Maybe I'll add something more to this section when I have.

## Determining the zoom level

All this took was to scale the obtained value from the thresholded+edge detected+blob detected image to a value between -50 and 100 (i.e. 50% to 200% zoom). The problem is that I needed to find the maximum and minimum values that I can obtain from my image. 

Experimentally, I've set 0 (i.e. 100% zoom) to be when the user occupies 1/5th of the cropped area, and the maximum area to be the total cropped area. 

Additionally, since the threshold value is constantly changing due to changes in lighting and what not, I've set a sensitivty parameter which rounds a value to the nearest mutliple of `sensitivity`, thus preventing the browser from constantly flickering and zooming in and out.


## Putting it all together as a chrome extension

Now for the real fun. I have all the code written, but I need to package it up as a chrome extension. This was my first time developing a chrome extension so it involved a lot of googling.

My extension consists of a settings page, a popup page, and a content.js script which injects itself into your current webpage. The settings page allows you to crop the frame and change the parameters for the thresholding and edge detection (and an auto configure mode which I'll talk about in a bit), while the popup only allows you to change the parameters for thresholding and the sensitivity.

Since all three of the required scripts use the same code for detecting and displaying the proximity, all relevant code was moved into it's own js file and the function inside that are called by the various scripts.

By using a background script I'm able to pass information back and forth between the various javascript functions involved, and thus the webpage is automatically zoomed in and out.

In order to allow getUserMedia to work in a chrome extension's popup I had to include a settings page which calls getUserMedia and thus requests the user's permission to access the webcam. 

When using smartZoom on a normal page however, the browser will automatically ask for permission to access the webcam. Of course, this will only work if the webpage is accessed via HTTPS due to chrome's restriction on accessing the webcam. This is actually slighting annoying and something I'm working on fixing.

## Determining Parameters automatically

In my camera theremin, I left the burden of determining the parameters for the thresholding to the user. However, since extensions are suppsosed to make your life easier and not harder, I decided to create a function to "auto-configure" and determing the best thresholds. 
This was done by merely guessing an initial value and changing that value until the area occupied by the user was approximately 1/5th of the total area. I intend to eventually change this function to perhaps even change the value of 1/5th to the best possible value for the user's lighting and environment and also have it configure other parameters.

As always, the code is on my github, and you can browse through it [here](https://github.com/aneeshdurg/smartZoom)
