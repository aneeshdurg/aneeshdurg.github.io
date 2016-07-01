---
layout: post
title: Pokemon .bashrc
permalink: /posts/pokemon-bashrc/ 
---

##### Recently, I've been playing around with my .bashrc file on my laptop and trying to make the time I spend at my laptop a little more exciting. Additionaly, I've been a huge fan of the pokemon franchise since I was young enough to frolick through meadows without incurring strange looks from others. I decided to bring the world of pokemon into my terminal.
---

Things I used to accomplish this:

- **Python** - Used to scrape bulbpedia to find the URLS of images to download

- **wget** - Used to download the images from bulbpedia

- **img2txt** - Command line utility for turning normal image files to ascii art. Part of caca-utils repository.

## Getting the images

In order to get the images I needed, I decided to make use of the website bulbpedia, the unofficial pokemon wikipedia. After browsing the site for a while, I looked for patterns in the URLs of the images on each Pokemon's page. While I didn't find such a pattern in the URLs of the images themselves, each image had an entry of it's own containing information about the image itself. The URLs to these images were listed in the format `bulbpedia.bulbgarden.net/wiki/File:[national pokedex number][pokemon name].png`. If I knew the number and name of a pokemon, I could use these pages to obtain the image. 

To first find the name and number, I went to the page that lists all the [Kanto region pokemon](http://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_Kanto_Pok%C3%A9dex_number) and downloaded the html source. From there I manually opened the file and deleted all of the content aside from the main table which holds the list of pokemon (yes, there are better ways of doing this, but I only needed to do this to one file once, so I didn't really try harder). 

Now that I have this table, I need to parse it to obtain only the information I need, that being the pokedex number and the name.  I considered doing this with Beautiful Soup, but decided against it as that seemed to be a bit overkill for my purposes. Each row of the table was similar to the following:

```html
<tr style="background:#FFFFFF;">
<td style="font-family:Monospace;"> #004
</td>
<td style="font-family:Monospace;"> #004
</td>
<td> <a href="/wiki/Charmander_(Pok%C3%A9mon)" title="Charmander"><img alt="Charmander" src="http://cdn.bulbagarden.net/upload/b/bb/004MS.png" width="40" height="40" /></a>
</td>
<td> <a href="/wiki/Charmander_(Pok%C3%A9mon)" title="Charmander (Pok?mon)">Charmander</a>
</td>
<td colspan="2" style="text-align:center; background:#F08030"> <a href="/wiki/Fire_(type)" title="Fire (type)"><span style="color:#FFFFFF">Fire</span></a>
</td></tr>
```
Since this table is sorted, if I only view the title of the icon and append that to an array, the array index will take care of the pokedex numbers.

In the end, all the python code I needed to do that looked something like this:

```python
pkmnTable = open("listPkmn.html", "r").readlines()
listPkmn = []
for entry in pkmnTable:
	if "title" in entry and "width" in entry:
		name = entry.replace("<", ":").replace(">",":").replace(" ","").split("title=")[1].split("::")[0].replace('"', "")
		listPkmn.append(name)

pidx = randint(0, 150)
url = "http://archives.bulbagarden.net/wiki/File:"+("0" if pidx+1<100 else "" )+("0" if pidx+1<10 else "" )+str(pidx+1)+listPkmn[pidx]+".png"
```

While that line with all the calls to replace certainly looks bad, it gets the job done. Note that when I generate the URL to the image entry, I need to increase the index by 1 as my list starts at 0, and I need to pad the pokedex number with 0s to get a 3 digit number. 

Now that I have the URL of the image entry, I need to get the URL of the image itself. A quick look at the source code showed me that the line containing the first instance of `/[pokedex number][pokemon name].png` was the line containing the URL I wanted. To do this, I used urllib2 to get the HTML source and then wrote the following code:

```python
response = urllib2.urlopen(url)
imgUrl = ""
lines = response.read().split(">")
for l in lines:
	if "/"+("0" if pidx+1<100 else "" )+("0" if pidx+1<10 else "" )+str(pidx+1)+listPkmn[pidx]+".png" in l:
		imgUrl = l
		break
open("imgUrl.txt", "w").write(imgUrl.split("=")[1].replace('"', ""))
```

Now I have the image URL written to imgURL.txt and I can set about doing something in bash to print the image. 

## Obtaining, displaying, and modifying the image

Obatining the image was a cinch thanks to `wget`. More interestingly is `img2txt` which converts images into colored ascii art. I noticed that I achieved the best quality when I set the dither to none and the gamma to 0.5. This was done with the following command:

```bash
img2txt -g 0.5 -d none ~/.pkmn/temp.jpg > temp.txt
```
While displaying this image would have been cool enough, it interfered with my existing welcome message as it took too much space. My existing welcome message looked something like:

```
ssid=$(iwget -r)
dt=$(date)
echo =================================================================
echo + Sometimes it's necessary to go a long distance out of the way +
echo + in order to come back a short distance correctly.             +
echo +                                      -Edward Albee(Zoo Story) +
echo =================================================================
echo Welcome back, $USER
echo It is now $dt
echo Connected to network: [$ssid]
echo BatteryInfo{
upower -i $(upower -e | grep 'BAT') | grep -E "state|time\ to\ empty|time\ to\ full|percentage"
echo }
```

Which looked pretty neat and minimalistic, so I didn't want it to be pushed out of view by the pokemon image.

Nor did I want my terminal to be obscenely large either. So the best solution I could think of was to somehow offset the text to the right of the image.

My first instinct was simply replace the end of the line of the image using sed. The command I had in mind was something like `sed -i "1 s/$/[my text here]/" [filename].txt` which should open filename.txt, replaces the end of the first line (as specified by the 1 preceding the replace) with my text and saves the file. However, the output was akin to the following:

![wrong sed command](https://raw.githubusercontent.com/aneeshdurg/aneeshdurg.github.io/master/images/2016-6-29-pokemon-bashrc/wrong-sed.png)

This had me stumped, but a quick look at the img2txt output with vim showed me that the lines ended with `^M` which indicated a carriage return. this means that instead of `$` I should be using `\r` in sed.

## Timeout

When I tried to use this setup for my day to day tasks, I found that downloading an image just took too long on my poor internet to render this configuration useable. So I added a timeout on my calls to my python script and to wget. This was done using the command `timeout` included in core-utils.

For the python script, the timeout is set to 3 seconds, and the timeout is set to 5 for downloading the image.

In the event that the process is killed by timeout, the exit status will contain a non zero number, which I checked with the following if statement:

```bash
#first checking for network
if [ -z "$ssid" ]
then
  if [ $ -ne 0 ]
  then 
  # process the image from wget
  # Put processed image in temp.txt 
  else
  # use a randomly chosen existing 'cached' txt file and copy that to temp.txt
  fi
else
# use a randomly chosen existing 'cached' txt file and copy that to temp.txt
fi

#use sed to append my old welcome message to the ends of lines of temp.txt
cat temp.txt 
```

And so I have the following prompt:

## Offline

![offline-1](https://raw.githubusercontent.com/aneeshdurg/aneeshdurg.github.io/master/images/2016-6-29-pokemon-bashrc/offline-1.png)

![offline-2](https://raw.githubusercontent.com/aneeshdurg/aneeshdurg.github.io/master/images/2016-6-29-pokemon-bashrc/offline-2.png)

## Online

![online](https://raw.githubusercontent.com/aneeshdurg/aneeshdurg.github.io/master/images/2016-6-29-pokemon-bashrc/online.png)


## Update 1 - Pokedex entries

I liked having the pokemon's picture and its name, but I thought it would also be really cool if I had it's pokedex entries (from the games). A quick look on bulbpedia showed me that each pokemon has a section on its wiki page that lists all its pokedex entries by game. So, I made another python script which found those entries for me and returned a dictionary with the game names as keys. By randomly selecting one of those keys, I was able to display a pokedex entry as well.

![With pkdex](https://raw.githubusercontent.com/aneeshdurg/aneeshdurg.github.io/master/images/2016-6-29-pokemon-bashrc/withpkdex.png)

## Update 2

The pokedex entries actually messed up the formatting for the image by wrapping past the edge of the terminal. To solve this, 
I added the commands:

```bash
pkdex1=${pkdex:0:50}
pkdex2=${pkdex:50:50}
pkdex3=${pkdex:100:50}
pkdex4=${pkdex:150}
```

and split the text into 4 lines. This works, but sometimes the text is split in the middle of a word which is awkward. I plan to work more on this later.

## Update 3

Since I live in India, there are days when my internet connection is insanely slow which makes open a new instance of my terminal take around 13s before all the commands timeout and all I have is a default "cached" image anyway. I decided to change my idea and display a random pokemon each day, as opposed to a random pokemon each instance of terminal. 
The code necesary to do that was similar to the following:

```bash
dt=$(date)
ssid=$(iwgetid -r)
fileDt="asdf"
if [ -f ~/.pkmn/today ]
then
fileDt=$(date --utc --reference=/home/$USER/.pkmn/today)
fi
if [ "${fileDt:0:10}" = "${dt:0:10}" ]
then
cp ~/.pkmn/today ~/.pkmn/temp.txt
else
#Get the pkmn image and pokedex data
#write the pokedex data and the quote into the img text file
#copy current img text file into ~/.pkmn/today
fi
#write the user, date, ssid, battery info into ~/.pkmn/temp.txt
#Display temp.txt
#delete temp.txt
```
Since the delay only occurs once, I changed the timeouts to be:

- 10s for getting the pokemon name and number

- 30s for getting the pokemon image

- 20s for getting the pokedex data
- 
So I have a total worst case delay of 1 min, but only once per day. 

## Todo

In the future I'd like to:

- Use the full national pokedex, not just the kanto region

- ~~Maybe have more 'cached' images~~

- Choose the best gamma value for each image instead of 0.5 by default
