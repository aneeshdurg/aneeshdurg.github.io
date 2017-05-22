---
layout: post
title: MangareaderFS and my life 
permalink: /posts/mangareaderfs
---

Hi everyone! Today's post is going to be a little different from most of my posts because I'm going to also write a short update about myself! Yay!!!

If you don't want to hear about me, click [here](#mangareader-fs) to only read about my new project. 

---

It's been exactly a year since I started this blog, which is pretty cool although I wish I had more time to post stuff. For starters, I'd like to write about that cool Haskell project I keep promising you guys, but it's a bit of a long story, and I'm too lazy to write it out. 

Breifly, it was supposed to be an online repl for haskell, that also acted as a chrome extension allowing newbies (i.e. me) to try out snippets of haskell code they find on the internet (i.e. stackoverflow). Currently, I have an extension, and the repl, but neither are as good as I want them to be (can any software project ever be considered done?), but for the time being, you can try it out [here](http://www.browserhaskell.tk/editor). If you like it, be sure to drop those stars on github and/or contribute to the project. If you've got any ideas for things you'd like to see, shoot me an email.

I've also been meaning to give this website a bit of a makeover. I don't really like the current layout too much, and I'd like to make it feel a bit more...professional. Maybe add my resume somewhere here or something. 

Lately, I've been killing time and learning category theory (You can only imagine the loneliness and bordem that lead to that decision (jk, category theory is pretty rad)). Quite honestly, it's been slow progress. Part of it is because I keep getting distracted by stupid things, and part of it is because I'm having a hard time getting the intuition behind a couple concepts. I suspect that this would be easier if I tried focusing a bit more and maybe doing more excersices from the textbook I'm referencing. Either way, I hope to gain more familiarity with the concepts and paradaigms of category theory before the fall semester starts. Perhaps I'll use this blog to post about my progress/share things I found interesting while learning.

Aside from that I've been watching a lot of anime (which will explain the project portion of this post), and a lot of Wes Anderson films, and I've gone back to writing fiction. I'm writing a series of short stories this time, and while they don't connect directly to each other, the over-arching narrative is a lot grander than anything I've written before. I've also spent some time going over my old writing, and quite honestly that was a good laugh. I feel like you can really see a sense of childishness from my older writing, which I don't particularly mind, since it's comforting to know that I've grown enough to identify where I could have done things better in some of my stories. For the time being, I don't think I'm embarassed enough by my stories to take the link to them off of my "about me" post. My newer writing is a lot less "philosophical" in that I'm not aiming to preach about my views about life and death or anything edgy like that. 

I really want to start reading books again. It's been a while since I last read one. I'm still about halfway through "Robot stories" by Isaac Asimov, but I have an implicit rule of only reading those on flights. The most recent book(s) I finished was the first (and currently only) two books of the Kingkiller chronicles. I was honestly not impressed, especially by the quality of the second book, and might not even care to read the third. Quite a few people have reccomended the book "Gödel, Escher, Bach" to me, although I've heard it's quite taxing to read. Perhaps I will have the energy to start it someday.

School has been going pretty well. This semester was super busy, but I kinda liked the grind. Grades turned out decent (like software projects, they can always be better), and I think I have more of a direction as to what I want to do/study from here on out. Of course, I'm still exploring different things and trying to see more of the world, but my path is gradually convering. 

So yeah, that's how things have been for me lately. I'm sure none of that was particularly interesting, but maybe if someone reads this they might be interested to see what kind of life I lead aside from the sparse posts I make here.

## Mangareader FS

Earlier this year, I learned about FUSE (filesystem in user space), a library that makes writing your own filesystem rather simple. At the least, you won't be dealing with kernel code. Since then, I'd wanted to do some kind of project wiht it, but I hadn't known what to do. To paint the other half of the picture, I enjoy reading manga (Japanese comics) on a weekly basis, but hate the websites they're hosted on just because there's a ton of ads and it's often very slow to use (especially back in India). So, I decided to make mangareader FS.

I chose to use python and fusepy, just to get back into the swing of coding in python. Although one of my classes had me writing some code in python over the semester, I'd mostly been coding in C and Haskell, and I missed hacking in python. 

As always, you can find the code on github [here](https://github.com/aneeshdurg/mangareaderfs)

Essentially the way it works is by loading in a set of inital manga title from a provided file and creating a "directory" for each one. Upon entering the directory, the website mangareader.net (and the namesake of the project) is scraped (usings python's wonderful requests library and BeautifulSoup) to find the number of chapters associated with that particular manga. 

Each chapter is then displayed as a subdirectory. Entering one of those directories will then cause the program scrape mangareader again to find the number of pages for that chapter. Each page is then displayed as a file.

Trying to open any page will cause some worker threads to each download the images associated with all the images in the chapter, and storing those images only in memory, so that the user can freely browse through the pages of the manga as though they had downloaded the entire series. There are 20 worker threads by default, which works out nicely since most series have roughly 20 pages per chapter. This number can be changed with a command line argument.

All the data used by the filesystem (i.e. the number of chapters/pages, the image files, etc.) are all stored in a dictionary. A cleaner thread periodically checks the dictionary for chapters that have remained inactive for sustained periods of time and removes them, thus mainting a relatively low memory footprint. I've pasted my cleaner function below to illustrate. (n -> names, c -> chapter)

```python
def cleanCache(fs, cv):
    while 1:
        sleep(300)
        cv.acquire()
        for n in fs.filecache:
            for c in fs.filecache[n]:
                if time() - fs.filecache[n][c]['timestamp'] > 300:
                    print("Deleting chapter", c, "of", n)
                    del fs.filecache[n][c]
            if len(fs.filecache[n].keys()) == 0:
                print("Deleting", n)
                del fs.filecache[n]
        cv.notifyAll()
        cv.release()
```

Although the names of manga are loaded in from a file to start with, manga can be further added and removed by using the standard mkdir and rm. These operations will also update the file, and the only real purpose of the file is to save the names of manga the user is reading across various runs of the filesystem. 

Another feature which I thought was quite useful was the ability to use alternate names of the series. For example, the manga commonly known (in the english speaking world) as Tokyo Ghoul is listed as "Toukyou Kushu" on mangareader. "Tokyo Ghoul" is listed as an alternate name. Since I (and I presume, many other people) am more comfortable with the english name, I thought it would be nice to allow users to enter in alternate forms of the name. This required me to add a bit more error checking, and to scrape search results of the name specified by the user to see if it showed up as an "exact" (there is some preprocessing done first, spaces removed, lowercased, etc.) match in the alternate names of the manga returned by the search. (E.g. searching for Tokyo Ghoul on mangareader has search results of Tokyo Ghoul:re, the sequel, and Toukyo Kushu. Tokyo Ghoul by itself is only an exact match in the alternate names of Toukyo Kushu, so the right manga is found). The code for this is as follows:

```python
  manga_name = "-".join(title.lower().split(" "))
  url = "http://www.mangareader.net/"+manga_name
  req = get(url)
  
  if not req.ok and req.status_code==404:
    url = "http://www.mangareader.net/search/?w="+manga_name.replace('-', '+')
    req = get(url)
    soup = BeautifulSoup(req.text, 'html.parser')
    links = soup.find_all('div', {"class":"manga_name"})
    links = list(map(lambda x: x.find('a').get('href'), links))
    souplinks = list(map(lambda x: BeautifulSoup(get("http://www.mangareader.net"+x).text, 'html.parser'), links))
    souplinks = list(map(lambda x: x.find_all('td'), souplinks))
    
    names = []
    for i in range(len(souplinks)):
      j = 0
      for j in range(len(souplinks[j])):
        if souplinks[i][j].get_text() == "Alternate Name:":
          j+=1
          break
      names.append(split(',|;', souplinks[i][j].get_text().lower().replace(" ", "")))

    for i in range(len(names)):
      if title.replace(" ", "") in names[i]:
        alt_title[title] = links[i][1:].replace("-", " ")
        title = alt_title[title]
        manga_name = "-".join(title.lower().split(" "))
        url = "http://www.mangareader.net/"+manga_name
        req = get(url)
        break
```

This code is found in `getData.py`

You may notice my use of filter/map. After tasting Haskell and the function paradaigm, I don't think I can code without these powerful tools. I was quite daunted by them when I first came across them in python (back when I was a freshman and had virtually no programming experience), but now the tables have turned. I probably abused the `list()` function though, and I'm not sure if that was entirely necessary. I'll probably try to clean that up, although not having the result of a map or a filter be a list really irks me (Why, python? Why?!).

Normally, I include a TODO list at the end of my posts, but this time the project in question has a lot of TODOs, so I won't bother. If you are interested in the project, feel free to clone/fork it and drop a star if you liked it. Feel free to contact me or raise an issue if you come across something weird, or raise a pull request if you make something better.