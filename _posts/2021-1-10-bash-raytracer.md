---
layout: post
title: Making a raytracer - but in bash
permalink: /posts/bash-raytracer/
---

Inspired by the [CMake raytracer](https://github.com/64/cmake-raytracer), I ported it to [bash](https://github.com/aneeshdurg/bash-raytracer).

---

You find see my code here: [https://github.com/aneeshdurg/bash-raytracer](https://github.com/aneeshdurg/bash-raytracer)

Here's the final product, a `64x64` render of a sphere on a checkerboard:

![raytraced scene in bash]({{ '/static/images/bash-raytracer.png' | relative_url }})

I'm pretty amazed that this is even possible! To learn more, you should read the
blog post about the CMake version by the original author:
[https://64.github.io/cmake-raytracer/](https://64.github.io/cmake-raytracer/).

In my post, I'll be covering the few interesting bash specific tricks I had to
learn to make this work. One of the biggest challenges was not reaching for
coreutils and sticking only to pure bash constructs!

## The general approach to porting

I really just went line by line for the most part. The sections below will talk
about some of the changes I had to make to use pure bash in a sane way. For some
functions, I would stop, source it into my shell and then try some test
cases which I would compare against the output of the CMake version for the same
inputs. I would also diff the `ppm` file my code produced against the one
produced by the `CMake` version. I wish I had been more consistent with my
testing, or that I had documented my test cases, because that would have made
things a lot smoother. I spent a lot of time just debugging because I had some
typos in my implementation of `to_fp`. Always test your code!!!

## Bash tricks I learned along the way

Here are some things I used to implement the raytracer.

### String manipulation

Bash has some builtin string manipulation syntax. Here's some stuff I found
useful:

```bash
> x="string a. string b"
>
> # Print the length of a string
> echo ${#x}
18
>
> # Print a substring starting from the 0th char of lenth 3
> echo ${x:0:3}
str
>
> # Remove just the last character of a string
> len=${#x}
> echo ${x:0:$(( len - 1 ))}
string a. string 
>
># Remove a prefix (*. = match any char until .)
> echo ${x#*.}
string b
>
> # Remove a suffix (.* = match . and then any char)
> echo ${x%.*}
string a
```

### Arrays

Arrays/maps in bash are pretty weird. Honestly you should avoid them if you
don't need them. They're especially weird because they're not very intuitive
when you pass them around or create subshells.

```bash
> # Create an array
> arr=('a' 'b' 'c')
>
> # Accessing an array prints the first element
> echo $arr
a
>
> # To print all values use [@]
> echo ${arr[@]}
a b c
> # this actually expands the array, so echo got three arguments
> # 'a', 'b', and 'c' seperately
>
> # To get the length use the following syntax
> echo ${#arr[@]}
3
>
> # Accessing specific elements is pretty easy
> echo ${a[1]}
b
>
> # To copy an array use the expansion syntax in the array
> # constructor
> arr_copy=(${a[@]})
```

### Indirect parameters

Indirect parameters are kinda like pointers, use the syntax `${!var}` to
dereference for reading. For writing, you'll need `eval`, see below.

```bash
> f() {
>     local x="hello world"
>     local y
>     g x y
>     echo $y
> }
>
> g() {
>     local input=$1
>     local output=$2
>     # $input stores the parameter 'x', "dereference" it.
>     local value=${!input}
>     local result=${value:0:5}
>     eval $output="$result" # evaluates 'y="hello"'
> }
>
> f
hello
> echo $x

> echo $y

```

Notice that since `x` and `y` are defined as local in `f`, they are not
availible in global scope at the end of the function. Using indirect variables
relies on the fact that g has not defined a local variable of the same name, so
it's a pretty dangerous construct.

### Passing arrays as indirect parameters

While indirect parameters are pretty dangerous, their most compelling use case
is to pass around arrays. One way to pass an array would be to pass in all
arguments, but that makes it hard to pass multiple arrays to a single function.

```bash
> f() {
>     local x=(1 2 3)
>     local y
>     g x y
>     echo ${y[@]}
> }
>
> g() {
>     local input=$1
>     local output=$2
>     local value=(${!input})
>     value[1]=$(( ${value[1]} + 1 ))
>     eval $output="($result[@])"
> }
>
> f
1 3 3
```

## Possible future improvements to the raytracer
+ Performance

The performance could probably be improve since I used the same idea for
parallelizing as the `CMake` version. To get better performance I could
implement some kind of work stealing approach, but that requires some `IPC`. I
think it's possible to create a tcp socket in pure bash, so that might be one
possiblity.

+ Not using bash

Kind of a cop-out answer, but the biggest limitation of this project was using
bash. I think it would also be fun to actually learn how a good raytracer is
implemented and/or try to actually optimize it's performance.
