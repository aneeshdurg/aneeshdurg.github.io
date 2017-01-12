---
layout: post
title: Haskell Game of Life
permalink: /HaskellGameofLife/ 
---
Hello, my possibly (probably) nonexistant readers! It's been a while since I've written anything. For starters, happy new year!

I've spent my winter holidays playing around with functional programming, with Haskell as my language of choice. While it's not my first time using the language, it is my first serious attempt at actually learning it well. 

To test the knowledge I gathered, I made this simple implementation of Conway's Game of Life. You can find my code [here](https://github.com/aneeshdurg/haskellGameofLife). 

Because I'm reasonably comfortable in Javascript (and d3.js) now, I thought it would be cool to try making my implementation have a Haskell server powering a html5 frontend.

The logic powering my backend is pretty simple. It takes in a string representing a 1-d model of the 2-d grid of cells as well as a number indicating the dimension of the grid.

Then for each cell it checks the surrouding cells to determine what the next state should be and sends a string of what the new grid should look like as a 1-d array.

Probably not the best implementation in the world, but I'm still learning and I really enjoyed learning a new language and a new programming paradigm. My latest Haskell project is considerably more exciting though, and I hope to have a post up about that soon enough.