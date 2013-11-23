---
title: Test Post
author: Christalee
tags: open software, Christalee
date: 2013-10-13
---

Lorum ipsem, said the cat.

Using open hardware for this project allowed us to develop a custom datalogging solution quickly and cheaply, compared to solutions designed for industrial or educational markets. We used several kinds of open-licensed prior art in assembling this project, including online tutorials, software libraries, and the general-purpose I/O breakout board. 

- why is open hardware + education awesome
- what did we build
- what did we teach
- what next, what does it mean?

MCP3008 (ADC) chips 


Groups of 3 or 4 students decided whether their design goal was to stay warm or stay cool, and built a solar house tuned to that goal.  Each house started with the same cardboard frame, with a hole to act as a window.  Students added cups of dirt, water, or sand to store heat, one or more layers of plastic wrap over the window, and aluminum foil & black paper to cover the exterior.  One house frame was left unmodified to act as a control.

We assembled a simple sensor for each house by soldering a thermistor and matched precision resistor in series to one end of a CAT-5 cable.  A punchdown block on the roof connected power, ground, and signal lines to a trunk cable running to the school computer lab, where the ADC board was installed.

Our board connects two 8-channel ADC chips (MCP3008) to the Raspberry Pi over SPI.  We picked this chip because it had already been used in several well-documented open hardware projects.  Without much prior SPI experience, it was easy to modify code from these projects to handle two chips instead of one.

A previous version of this project used commercial dataloggers each with its own battery, temperature sensor, and flash memory.  Populating 14 houses with these loggers would be prohibitively expensive.  From prior experience collecting data in buildings, we knew we wanted hardware which could:
    * Accept arbitrary analog-voltage sensors
    * Expand to more input channels
    * Be programmed in a popular language

We wrote a Python script to sample the temperature of each house every 10 minutes, write the result to a local CSV file, and upload the data for online display.  Several online services offer APIs for embedded devices to append data to a feed, for easy display & retrieval.  This allows students to view their houses' temperature while the experiment is in progress, and to show family & friends.  It also allows early detection of problems with the logger installation.

Data was recorded for 5 days, graphed, and projected in class

The graph above shows temperatures in 4 houses constructed by one class, and the control (blue line).  Daily peaks fall in the early afternoon, except on the 6th, when clouds mostly blocked direct radiation.  All houses had at least one layer of plastic over the window, which caused them to heat up faster than the control.  We graphed the data for each class in Excel and projected it in the classroom.  This allowed zooming in when the discussion required a closer look at one day of data.  Students compared the houses' performance to each other and to original design goals.

Visual representation and interpretation of data are key literacy skills.  Using real data and computer graphing for this exercise encourages students to view their environment as something that they can model.
