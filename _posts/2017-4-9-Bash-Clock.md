---
layout: post
title: Bash Clock
permalink: /posts/BashClock/ 
---

Hi all, it's been a while since my last post. (Un)fortunately this isn't a post about my [more exciting Haskell project](http://www.browserhaskell.tk/editor), but about a quick terminal enhancement I cooked up today! 

![clock](https://raw.githubusercontent.com/aneeshdurg/aneeshdurg.github.io/master/images/2017-4-9-Bash-Clock/clock.png)

For starters, here's the code:

```bash
function checkFg()
{
  ps -O stat | grep "S+" | (while read line
  do
    name=$(echo $line | cut -d' ' -f6)
    if [[ $name != "bash" ]] && [[ $name != "grep" ]]; then
      [ -e ~/.clocktmp ] && rm ~/.clocktmp 
    fi
  done)
}
function wallClock()
{
   touch ~/.clocktmp
   checkFg
    [ -e ~/.clocktmp ] &&\
      [ -e ~/.clocktoggle ] &&\
        echo -ne "\033[s\033[0;0H\033[2K\033[37;40m$($(cat ~/.clocktoggle))\033[0m\033[u" &&\
          rm ~/.clocktmp;
  sleep 1;
  wallClock;
}
[ -e ~/.clocktoggle ] && echo '\n'
alias 'clockon'='echo "date" > ~/.clocktoggle'
alias 'clockoff'='[ -e ~/.clocktoggle ] && rm ~/.clocktoggle'
function clockcmd()
{ 
  [ -e ~/.clocktoggle ] && echo "$1" > ~/.clocktoggle;
}

wallClock &
```

This is placed at the end of my `.bashrc` file, so it runs on each terminal window I open. 

The display is handled entirely by the line:

`echo -ne "\033[s\033[0;0H\033[2K\033[37;40m$($(cat ~/.clocktoggle))\033[0m\033[u"`

The first part of the echo string has some ANSI escape codes which:

- Save the cursor position

- Moves cursor to 0,0

- Clears line

- Sets colorscheme to black background, white text

then it executes the contents of the file `~/.clocktoggle` as bash commands and places it's output into the echo command. 

Finally, it uses more escape codes to reset the text color and restore the saved cursor position.

My initial approach was the following code:

```bash
function wallClock()
{
   echo -ne "\033[s\033[0;0H\033[2K\033[37;40m$(date)\033[0m\033[u";
  sleep 1;
  wallClock;
}

wallClock &
```


But I realized that I had no way of turning the clock off when I didn't want it. So I had it check for the existence of the file `~/.clocktoggle` and added some aliases to make things easier. 

```bash
function wallClock()
{
   [ -e ~/.clocktoggle ] &&\
        echo -ne "\033[s\033[0;0H\033[2K\033[37;40m$($(cat ~/.clocktoggle))\033[0m\033[u";
  sleep 1;
  wallClock;
}
[ -e ~/.clocktoggle ] && echo '\n' #Just so that when the terminal launches 
                                   #the cursor isnt' obscured by the output
alias 'clockon'='echo "date" > ~/.clocktoggle'
alias 'clockoff'='[ -e ~/.clocktoggle ] && rm ~/.clocktoggle'
function clockcmd()
{ 
  [ -e ~/.clocktoggle ] && echo "$1" > ~/.clocktoggle;
}

wallClock &
```

Now that I had a file, I decided to make things interesting by making the function use the contents of `~/.clocktoggle` to determine what to display. This is nice because now I can put in a message or reminder instead of the date, or ever some other command, like fortune or even ps, display at the top. 

This was nice and worked for all of five minutes before I realized that when I opened up any other program that uses ncurses or otherwise has it's own "full screen" display (e.g. vim), the clock would get in the way and cause some graphical glitches. This had me stumped for a minute before I thought about using ps to determine the current foreground process. 

A quick stackoverflow search revealed that `ps -O stat` would list all the information I needed, with foregrounded processes having a status of `S+`. So, I completed the clock to get the final iteration which is:

```bash
function checkFg()
{
  ps -O stat | grep "S+" | (while read line
  do
    name=$(echo $line | cut -d' ' -f6)
    if [[ $name != "bash" ]] && [[ $name != "grep" ]]; then
      [ -e ~/.clocktmp ] && rm ~/.clocktmp 
    fi
  done)
}
function wallClock()
{
   touch ~/.clocktmp
   checkFg
    [ -e ~/.clocktmp ] &&\
      [ -e ~/.clocktoggle ] &&\
        echo -ne "\033[s\033[0;0H\033[2K\033[37;40m$($(cat ~/.clocktoggle))\033[0m\033[u" &&\
          rm ~/.clocktmp;
  sleep 1;
  wallClock;
}
[ -e ~/.clocktoggle ] && echo '\n'
alias 'clockon'='echo "date" > ~/.clocktoggle'
alias 'clockoff'='[ -e ~/.clocktoggle ] && rm ~/.clocktoggle'
function clockcmd()
{ 
  [ -e ~/.clocktoggle ] && echo "$1" > ~/.clocktoggle;
}

wallClock &  
```

As shown above.

The function checkFg requires the file `~/.clocktmp` to exist, then it greps the output of ps to find all foregrounded proceses, and checks their names (extracted from the output of grep using cut) against processes which shouldn't interfere with the display. If it finds a program that might interefere, it deletes `~/.clocktmp` and so the echo command won't be run. 

While I would have preferred to use the return value of checkFg instead of checking it's side-effect of it deleting a file, namely `~/.clocktmp`,  this seemed to allow for the cleanest code. 

So there you have it! A fully functional, self-updating terminal clock. Hope you all liked it!
