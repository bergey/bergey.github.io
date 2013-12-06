Earlier this year I decided to learn OpenGL, as part of a project to
add 3D capabilities to the Haskell library [Diagrams][].  Never having
used OpenGL before, I didn't know quite what I was getting into.
Finding good tutorials for OpenGL in Haskell is a lot harder than it
needs to be.  The rest of this post is about why that is, and what I
mean by *good* tutorials.  Shorter: I'm starting to write the example
code I wish I'd had, and
[posting it on github](https://github.com/bergey/haskell-OpenGL-examples).

The problem:

* multiple styles / versions of OpenGL
* multiple C wrappers around OpenGL
* multiple levels of abstraction in the Haskell bindings

OpenGL has been around
[forever](https://en.wikipedia.org/wiki/Opengl#History) and it's
changed a lot over the years.  Many tutorials, in C and in Haskell,
use old deprecated functionality.  This works, but it's not what I
want to learn or write, especially in Haskell.  The new style is
faster, more flexible, and higher level.  Haskell does a great job
expressing data parallelism, and I'd like that to carry over into how
we talk about embarrassingly parallel operations on the GPU.

Practically, that means passing all the data to OpenGL in arrays of
one sort or another, rather than calls to `glVertex`, `glColor` and
friends.  The story about custom shaders versus the fixed-function
pipeline isn't as clear-cut, but I'm assuming it's worth the modest
effort to use them also.

Did I mention that OpenGL is a low-level hardware interface?  In order
to display a window, you need some other library, and you need to pick
one.  The good news is that Haskell has bindings for all the popular C
libraries that do this.  The bad news is that doesn't help the choice.
Most tutorials still use [GLUT][freeglut], I think because it requires
a little less code for simple examples.  It seems that most folks
recommend the [GLFW-b][] package in Haskell, though.  See for instance
[this recent post from the author of one of the other packages][Liu].

So much for picking C libraries.  But the decisions aren't over yet!
OpenGL is full of void pointers, integers used as pointer offsets, and
variable "names" which are actually integers.  The [OpenGLRaw][]
package brings this API directly into Haskell, `Ptr`s and all.  It's
the most complete option, and it's pretty easy to follow tutorials
written in C/C++, because all of the names are the same.

The [OpenGL][] package wraps this madness in a thin layer of type
safety.  It's still imperative, and we still need lots error-prone
boilerplate, but there's some hope that the type checker will dissuade
me from using my fragment shader as a vertex buffer.  Most of the
OpenGL code that I've written so far has been with this package.

Clearly Haskell can do better.  There are a couple of promising
libraries from Anthony Cowley that build on `OpenGL`.  [GLUtil][]
factors out most of the obvious repetition, so we can mostly forget
the details of compiling and linking shaders, or converting vectors to
void pointers.  [vinyl-gl][] ([tutorial][]) goes farther, using
extensible records to model the input variables to each shader.  I'm
looking forward to learning these libraries and porting the tutorial
code to use them.

Someday, I hope to be able to write shaders in Haskell using
[accelerate][], and tie them in too.  But I'm not sure anyone's
actually done that yet.

[Diagrams]: http://projects.haskell.org/diagrams/
[GLFW-b]: http://hackage.haskell.org/package/GLFW-b
[freeglut]: http://freeglut.sourceforge.net/
[Liu]:
http://www.haskell.org/pipermail/haskell-cafe/2013-September/110498.html
[OpenGLRaw]: http://hackage.haskell.org/package/OpenGLRaw
[OpenGL]: http://hackage.haskell.org/package/OpenGL
[GLUtil]: http://hackage.haskell.org/package/GLUtil
[vinyl-gl]: http://hackage.haskell.org/package/vinyl-gl
[tutorial]: http://www.arcadianvisions.com/blog/?p=388
[accelerate]: http://hackage.haskell.org/package/accelerate
