---
layout: post
title: MangareaderFS
permalink: /posts/mangareaderfs
---

Building a FUSE filesystem interface to mangareader

---

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

UPDATE:

So there was an issue with the cleaner, namely that you're not supposed to delete entries of a dictionary while enumerating it...oops. I've fixed that and the code is now:

```python
def cleanCache(fs, cv):
    while 1:
        sleep(300)
        cv.acquire()
        oldNames = []
        for n in fs.filecache:
            oldChapters = []
            for c in fs.filecache[n]:
                if time() - fs.filecache[n][c]['timestamp'] > 300:
                    print("Deleting chapter", c, "of", n)
                    oldChapters.append(c)
            for c in oldChapters:
                del fs.filecache[n][c]
            if len(fs.filecache[n].keys()) == 0:
                print("Deleting", n)
                oldNames.append(n)
        for n in oldNames:
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
