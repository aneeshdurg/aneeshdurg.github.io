---
layout: post
title: Transactional Shell Scripts
---

Many shell scripts in the wild are not transactional, leading to broken systems and unintended system
states. In this post I'll describe the issue and present a possible method for making shell scripts
transactional with respect to the filesystem level to cover a wide variety of possible failures.

---

Imagine this - you are a developer attempting to install the hot new tool that everyone's been
talking about. Unfortunately, it's so hot and new that it's not in any of your favorite package
managers yet. Fear not, when you got to `hot.new.tool.website` it tells you that you can install it
via `curl hot.new.tool.website/download | sh`. You know that this isn't "best practices", but the
only people who complain about "best practices" don't know how to have any *fun*. So you copy and
paste the command into your terminal, and sit back to watch the text scroll. However, a few minutes
into the install, your cat decides to come sit on your keyboard and just so happens to hit `Ctrl-C`.
After a brief petting session for the cat, you return to the task at hand only to find that the
software has been partially installed - if you're lucky, maybe it fails gracefully when you try to
start it. If you're unlucky, maybe it's incredibly broken in a way that also resists being installed
again correctly.

The above pattern is all too common, and I've definitely been bitten once or twice by unlucky
issues. However, this kind of issue has been solved in other software context already by
implementing transactions.

## What is a transaction?

A transaction can be thought of as a program that either succeeds and modifies the system, or fails
and leaves the system in it's original state. The key detail is that intermediate states of the
transaction are not visible by other programs.

Transactions often come up in the context of databases where you might want some query to not commit
it's modifications if other modifications have occurred during the execution of the program. Atomic
instructions can be thought of as a transaction as well, and the property that we're after here can
also be referred to at `atomicity`.

## What are the challenges preventing transactions in a shell script?

Making shell scripts transactional requires two abilities:

1. isolate effects to the system to only be visible to a subset of processes
2. rolling back system modifications executed during the script

The first can be difficult to achieve because shell scripts may involve creating many processes and
relying on many different tools that aren't in the programmers control. For example, a script may
install some packages via the system package manager (e.g. `apt` on an `ubuntu` distro) before
installing some other application that depends on the installed package. In order to allow full
functionality we need to be able to access and modify the entire system, which can make isolating
modifications difficult.

## A possible method for transactionality at the filesystem level

I believe that the tools we need for a "good enough" version of transactions for shell scripts
already exist. In *most* cases (e.g. installing software), we don't need full OS transactions, but
just transactions over the filesystem. This can be achieved via an
[overlay filesystem](https://docs.kernel.org/filesystems/overlayfs.html). Overlay filesystems allow
creating an editable layer on top some other directory but in a way where all edits are made to a
copy so that the original directory is never modified. We can build something similar to
transactions by creating an overlay over the entire root filesystem, running the script, then
determine whether or not to "commit" the changes from the overlay to the real root filesystem. The
other piece of the puzzle that make this possible is
[chroot](https://man7.org/linux/man-pages/man2/chroot.2.html) which allows one to change the root
directory for a process (and all of it's children). In our case, we'd like the root to be an overlay
on top of the real root filesystem. To decide whether to commit the transaction or not, we can just
check the exit status of the script being run. Here's some annotated code that accomplishes this.


```bash
#!/usr/bin/bash

# Transaction entrypoint
transaction() {
  # Path to the script being executed
  SELF=$(realpath "${BASH_SOURCE[0]}")

  # Create temporary directories for the overlay and the location where we'll mount the overlay
  STAGING=$(mktemp -d)
  MOUNTPT=$(mktemp -d)
  UPPER="$STAGING"/upper
  WORK="$STAGING"/work
  mkdir -p "$UPPER" "$WORK"

  # Create the overlay filesystem
  sudo mount -t overlay overlay -o lowerdir=/,upperdir="$UPPER",workdir="$WORK" "$MOUNTPT"

  # Bind virtual filesystems necessary to make most programs run correctly
  sudo mount --make-rslave --rbind /proc "$MOUNTPT"/proc/
  sudo mount --make-rslave --rbind /dev "$MOUNTPT"/dev/
  sudo mount --make-rslave --rbind /sys "$MOUNTPT"/sys/

  # Note that we don't bind the full /etc here to allow the transactions to modify /etc
  # For completeness maybe this should be bound a read only
  sudo mount --make-rslave --rbind /etc/resolv.conf "$MOUNTPT"/etc/resolv.conf

  # Set the overlay as root for the command being run
  if sudo chroot "$MOUNTPT"/ "$SELF" activate "$PWD" "$USER" "$@";
  then
    # commit transaction
    sudo rsync -av "$UPPER"/ /
  else
    # abort transaction
    true;
  fi

  # Unmount the overlay and delete the overlay directories
  sudo umount -R --lazy "$MOUNTPT" && {
    # We always want to do this delete - if the transaction has committed,
    # these changes are on the root filesystem. If the transaction was aborted,
    # then we don't want these directories anymore.
    sudo rm -rf "$MOUNTPT"
    sudo rm -rf "$STAGING"
  }
}

# Convinience wrapper for inside the chroot that navigates back to whereever the 
# transaction was invoked from but with respect to the new root.
# We also switch users back to the original user who started the transaction.
activate() {
  path="$1"
  shift
  user="$1"
  shift

  cd "$path"
  sudo -u "$user" "$@"
}

# Check if we should start a transaction of if we're in the isolated environment
if [ "$1" = "activate" ]; then
  shift
  activate "$@"
else
  transaction "$@"
fi
```

Try this out (at your own risk)! Copy this code to `transaction.sh`, mark it executable with `chmod
+x transaction.sh`, and run any command/script you want to with `./transaction.sh <command goes
here>`. So in my initial example, we'd simply need to modify the command to `curl
hot.new.tool.website | ./transaction.sh sh`! To test this script out, I wrote the following in `test.sh`:

```bash
#!/usr/bin/bash
set -x # echos every command to the terminal before running it

sudo apt install ghc
ghc --version
exit $1
```

I then ran the following:

```bash
aneesh@earth:~/t/test$ chmod +x test.sh
aneesh@earth:~/t/test$ ghc --version
Command 'ghc' not found, but can be installed with:
sudo apt install ghc
aneesh@earth:~/t/test$ ./transaction.sh ./test.sh 1
mount: No such file or directory
+ sudo apt install ghc
[sudo] password for aneesh: 
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Suggested packages:
  ghc-prof ghc-doc
The following NEW packages will be installed:
  ghc
0 upgraded, 1 newly installed, 0 to remove and 141 not upgraded.
Need to get 79.0 MB of archives.
After this operation, 684 MB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu noble/universe amd64 ghc amd64 9.4.7-3 [79.0 MB]
Fetched 79.0 MB in 4s (20.1 MB/s)
Selecting previously unselected package ghc.
(Reading database ... 599417 files and directories currently installed.)
Preparing to unpack .../archives/ghc_9.4.7-3_amd64.deb ...
Unpacking ghc (9.4.7-3) ...
Setting up ghc (9.4.7-3) ...
update-alternatives: using /usr/bin/runghc to provide /usr/bin/runhaskell (runhaskell) in auto mode
update-alternatives: using /usr/bin/ghc to provide /usr/bin/haskell-compiler (haskell-compiler) in auto mode
Processing triggers for man-db (2.12.0-4build2) ...
+ ghc --version
The Glorious Glasgow Haskell Compilation System, version 9.4.7
+ exit 1
aneesh@earth:~/t/test$ ghc --version
Command 'ghc' not found, but can be installed with:
sudo apt install ghc
aneesh@earth:~/t/test$ ./transaction.sh ./test.sh 0
mount: No such file or directory
+ sudo apt install ghc
[sudo] password for aneesh: 
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
Suggested packages:
  ghc-prof ghc-doc
The following NEW packages will be installed:
  ghc
0 upgraded, 1 newly installed, 0 to remove and 141 not upgraded.
Need to get 79.0 MB of archives.
After this operation, 684 MB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu noble/universe amd64 ghc amd64 9.4.7-3 [79.0 MB]
Fetched 79.0 MB in 2s (36.9 MB/s)
Selecting previously unselected package ghc.
(Reading database ... 599417 files and directories currently installed.)
Preparing to unpack .../archives/ghc_9.4.7-3_amd64.deb ...
Unpacking ghc (9.4.7-3) ...
Setting up ghc (9.4.7-3) ...
update-alternatives: using /usr/bin/runghc to provide /usr/bin/runhaskell (runhaskell) in auto mode
update-alternatives: using /usr/bin/ghc to provide /usr/bin/haskell-compiler (haskell-compiler) in auto mode
Processing triggers for man-db (2.12.0-4build2) ...
+ ghc --version
The Glorious Glasgow Haskell Compilation System, version 9.4.7
+ exit 0
sending incremental file list
...
sent 757,021,176 bytes  received 70,172 bytes  1,514,182,696.00 bytes/sec
total size is 759,212,894  speedup is 1.00
[sudo] password for aneesh: 
[I] (base) aneesh@earth:~/t/fullfsoverlay$ ghc --version
The Glorious Glasgow Haskell Compilation System, version 9.4.7
```

Here we can control whether or not the transaction "succeeds" with the parameter to `test.sh`. On
the first run we install `ghc` but set the transaction to fail, and at the end of execution, my
system doesn't have `ghc` installed. But on the second run when we set `test.sh` to succeed, the
transaction is commited and `ghc` is present on my actual system.

Note that this isn't *truly* transactional because during the `rsync` call, external programs could
view an intermediate state where some of the changes of the script has been commited, but other
changes have not been copied over yet. I think that in the majority of cases, this isn't a problem.
Especially in the original motivation of installing software, it's unlikely that concurrent
processes would access the partially installed changes.

There's also some overhead of using overlay filesystems, however, in practice  installation scripts
mostly write new files instead of editing existing files, so the overhead is minimal.

## Prior Approaches

Many have walked this path before. For example:

+ [TxOS](https://www.cs.unc.edu/~porter/pubs/sosp063-porter.pdf)

`TxOS` attempts to isolate a larger surface area and provide transactional semantics for the OS in
general. This requires a modified kernel, and would need to be reimplemented on recent linux
versions since this paper is move than 15 years old. While it's a very cool idea, I think full
transactional semantics are overkill for many common usecases. Additionally, `TxOS` imposes a higher
overhead due to it's stricter definition of transaction.

+ `set -e`

Not exactly a transaction but many shell script set the `errexit` flag, where the first error exits
the entire script.

+ containers

A common way to side-step this issue is to either distribute applications as containers (which can
be done ergonomically via container-based application platforms e.g. [snap](https://snapcraft.io/)/[appimage](https://appimage.org/)), or install
applications in a container as a user. However, this either adds friction for developers who must
package and distribute their applications in a specific way, or requires users to manage containers
and figure out how to integrate them into their normal workflow.

## Conclusion

By leveraging `overlay` filesystems I've been able to build a transactional system that 
is sufficient for enabling safe (from the perspective of desired filesystem state by the installer)
installation of software via shell scripts. By relaxing the semantics of transactionality I was
able to build this sufficient example without using any utilities that aren't present on default
installations of most popular linux distros. I think a more robust version of this tool should be
built and packaged along with most distributions to encourage users and script authors to use
transactions to protect against partial system modification.
