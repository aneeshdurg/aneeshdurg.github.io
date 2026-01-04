---
layout: post
title: Making a Tilde Server
---

In the spirit of a new year, I've decided to finish up some old in-progress blog
posts. Here's some work I did early last year to set up a multi-user home server
that provides some basic webhosting for [Moontower Computer
Club](https://moontowercomputer.club).

---

I've been really inspired by [computer clubs](https://startacomputer.club/)
around the world, so I decided to create one for my city. Enter [Moontower
Computer Club](https://moontowercomputer.club). To embrace the spirit of the
small web, physical meetups, and personal computing, I decided to setup the
website on a raspberry pi 4 b+ that I had lying around. I also wanted to embrace
the classic hacker/unix tradition of having a tilde-server, where each member of
the club can host content at `/~USERNAME`.

Exposing a server from my home network to the public internet sounded daunting,
and I definitely wanted some safeguards to prevent malicious actors from taking
advantage of any misconfiguration I might have in my server to gain access to my
home network. Additionally, since I wanted to allow members of the club to login
to the pi and host potentially dynamic content, or run long-lived programs, I
was weary of allowing members to be able to see other devices on my home
network. While I trust my fellow club members, I don't want that level of trust
to be a requirement as we collect more computer enthusiasts. To solve these
problems I decided to somehow isolate the environment that users log into.

I initially considered container frameworks, including `docker`, `podman`, and 
`systemd-nspawn`. Since I wanted users to have access to persistent storage and
I wanted the admin to be able to persistently install packages, the
`docker/podman` approach seemed inappropriate. `systemd-nspawn` was a reasonable
option, but in the end I decided that `lxc/lxd` was a better choice for me. It
was much simpler to setup and I wanted something that just worked (tm). I
considered using a virtual machine instead of containers, but that seemed
overkill and I didn't want to run into any potential performance impacts since
the raspberry pi is already slow. The networking is setup so that packets from
the container to the local network is blocked, and the container can route
traffic to and from the internet through the host.

To make things like `ssh` work out of the box, I installed `nginx` on the host
side of the pi and forwarded traffic on port `22` to the ip of the container.
The host itself is only reachable through a different port number and from my
home network. The webserving rules are also on the host so that I only have to
configure nginx in one place. There is support for CGI, and while the host nginx
determines which script to execute, the execution is done inside the container
and executed as the user who created the script to avoid privilege escalation.

So far the website seems to have been running pretty smoothly! I even moved
earlier this year, and aside from a few days of downtime, getting everything set
up again was pretty smooth. This was a pretty fun project for me, and I learned
a lot about webserver administration. If you're in the Austin, TX area and this
sounds interesting to you, let me know and we'd be happy to welcome you to our
club!
