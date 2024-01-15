---
layout: post
title: Reflection in CPP
permalink: /posts/2023-02-23-reflection-cpp/
---

It this cursed? Is this totally valid? Only way to know is to use it in prod.

---

Recently at work, we came across an issue that felt easy, but in CPP is not. We
have a collection of classes that need to define a method to serialize
themselves to JSON, and we wanted to be sure that all fields in the class were
accounted for. Of course, we know better than to trust ourselves, so we were
trying to think of automated ways to enforce this property.Unfortunately, our
codebase is in C++, and since there's no mechanism for reflection, it's simply
impossible. In the end, we decided not to enforce it in any way, but it got my
mind churning - surely someone else has solved this problem right?

And they have - far better than the method I'm about to detail below, but
there's projects like [tsmp](https://github.com/fabian-jung/tsmp/) which are
built for exactly this. `tsmp` is implemented as a clang tool, which is cool,
but I felt like this could be done with my all time favorite C/C++ feature - the
preprocessor. So I played around with some sample programs, and it's actually
not that bad!

Before I show my solution to this, you'll need to understand a relatively common
C/C++ preprocessor technique - x lists.

## X Lists

X Lists allows one to define some ordered collection of data, and then operate
on it multiple times. It's basically a way of having a list of syntax fragments
and then running for-each over it. The trick is to refer to an undefined macro
`X` which becomes a user-suppliable callback.

For example, let's say I want to build some kind of interactive CLI interface
that controls a counter. There's three commands:

+ quit - closes the program
+ inc - increments the counter
+ get - prints the current counter value

To implement this, I could use an x-list like the following example

```c
#define CommandList \
  X(quit)           \
  X(inc)            \
  X(get)
```

Now, for each of my commands, I define a callback:

```c
size_t counter = 0;

void handle_quit() {
  exit(0);
}

void handle_inc() {
  counter++;
}

void handle_get() {
  printf("The counter is %zu\n", counter);
}
```

Finally, we get input from the user:

```c
int main() {
   while (true) {
     auto line = readline();
     // TODO get the appropriate callback
   }
}
```

Now we could write some if statements comparing every line to each of our
commands, but that's tedious (and error-prone). Instead, we can use our X list!

```c
int main() {
   while (true) {
     auto line = readline();

     if (false) {}
#define X(name) else if (line == #name) { handle_##name(); }
    CommandList;
#undef X
   }
}
```

Which expands to:
```c
int main() {
   while (true) {
     auto line = readline();

     if (false) {}
     else if (line == "quit") { handle_quit(); }
     else if (line == "inc") { handle_inc(); }
     else if (line == "get") { handle_get(); }
   }
}
```

What if we also want to introduce a new command - "help" that prints out unique
help text for each option? Well, we can go back and modify our X list:

```c
#define CommandList                          \
  X(quit, "closes the program")              \
  X(inc, "increments the counter")           \
  X(get, "prints the current counter value") \
  X(help, "list available commands")
```

And then our main function, to ignore the descriptions:
```c
...
     if (false) {}
#define X(name, _) else if (line == #name) { handle_##name(); }
...
```

And all that's left now is to add our new callback. Since `help` needs to list
all commands, we can use another X macro!

```c
void handle_help() {
  printf("Counter - a simple CLI counter program\n");
  printf("  available commands:\n");
#define X(name, desc) printf("    %s - %s", name, desc);
  CommandList;
#undef X
}
```

Which will print:
```
Counter - a simple CLI counter program
  available commands:
    quit - closes the program
    inc - increments the counter
    get - prints the current counter value
    help - list available commands
```

While this could have been done without X lists, it certainly made things
easier. For larger programs where you have many more options, the benefits of
this approach becomes more apparent.

## Using X Lists to implement Reflection

While thinking about c++'s lack of reflection, I realized that defining types
with X lists would give us exactly what we need. We can store the name of a
struct field and it's type, and then retrieve that in other places where we need to
iterate over all the members. Let's look at a small example where we print out
the name of every field:


```c
#define DefineField(name, type...) type name;

#define FooFields   \
  X(x, int)         \
  X(y, std::string) \
  X(z, float)

struct Foo {
// Variadic argument for type in case the expression is some complex template
#define X(name, type...) DefineField(name, type);
  FooFields
#undef X
};
```

Now, to print out every field, we can simply do:

```
void printFooFields(const Foo& f) {
#define X(name, _) std::cout << #name << " " << f.name << std::endl;
  FooFields;
#undef X
}
```

This way when ever you update the list of members of `Foo`, you don't need to
remember to update `printFooFields`

Using this approach, I've made a bigger example where I implement a pretty
printer for structs, [click here to see it!](https://github.com/aneeshdurg/reflection-cpp)

## Conclusion

This is a viable way to implement reflection in C++, and it's honestly not even
that cursed. However, it does restrict how you define and add member variables
to your structs, which I could see becoming messy. I'm not sure I want to
introduce this to our codebase at work, but I could see myself doing this for
smaller projects and being perfectly happy with it.
