---
title: First Prototype of Keyboard Glove
author: Daniel
tags: Daniel, wearable, keyboard, arduino
---

Around 1999, I read Gershenfeld's
_[When Things Start to Think](http://books.google.com/books?id=EU0Fh97hmksC&printsec=frontcover)_,
and got excited about wearable computers.  I've been waiting for a
mass-market chording keyboard ever since.  In the meantime, wearable
computers have become ubiquitous, and we're starting to see heads-up
displays.  I've listened as small talk has gone from "how do the kids
type with their thumbs on these cell phones" to "have you installed
swype?"  And I'm still waiting for a wearable keyboard, one that's
built into a glove, and lets me touch-type on any hard surface.

I tried to build one once (2004?).  I knew almost nothing about
electronics, PIC microcontrollers were a pain to program, especially
on a student budget, and it wasn't clear where to get soft buttons
outside of the Media Lab.  But all that's changed.  Arduino and AVRs
are a lot easier to work with, and recent Arduino's speak USB HID
(mouse and keyboard protocol) out of the box.  Sparkfun sells Leah
Buechley's sewable Arduinos, and a range of compatible materials.
Adafruit has their own line, and lots of tutorials.  And sometime in
the last 5 years, more or less by accident, I've learned enough about
Arduinos and op-amps and working with conductive thread to try again.

![](https://farm4.staticflickr.com/3788/12365712943_8a23235bd3_z_d.jpg)

So I finally have a wearable keyboard - though right now it only types
lowercase letters.  The sensor on each finger is made from a piece of
velostat sandwiched between two pieces of woven conductive fabric.

![](https://farm4.staticflickr.com/3822/12307449233_a6fae87906_z_d.jpg)

The resistance of the velostat drops with increasing pressure.  I'm
worried that the resistance of sensors made this way will vary too
much from one to the next, but 4 out of 5 I've made so far acceptably
consistent---above 20 kΩ unpressed, below 2 kΩ pressed.  I'm pretty
sure the problem with the first one is that the thumb of the glove
pictured already had conductive fibers for touchscreen use.  I have
them wired to the analog inputs of the Arduino, which is a bit of a
waste.  If I want to add more sensors, I'll need to switch to an
external comparitor or a different button design.  For now, the analog
inputs make for easy debugging.

There are variations I'd like to try.  Using two gloves would make
more characters easy to type, and many more available in total.  I
think that with a flex sensor on each finger, I could read at least
two "keys", again increasing the available keys, though not as much.
I want to build a couple more of this first design, and get more
practice typing with it, before I start those experiments.

As usual, [the code is on github](https://github.com/bergey/handwriting).
