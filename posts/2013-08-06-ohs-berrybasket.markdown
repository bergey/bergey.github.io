---
title: Berrybasket Datalogger
author: Daniel & Christalee
tags: open hardware, Daniel, Christalee
---

We went to Boston for OHS.  We presented a poster.  We should write about it.

Christalee Bieber studied physics to understand how the world works; working at MIT OpenCourseWare interested her in how the world learns. Currently she focuses on creative and accessible science education. In her spare time, she enjoys building furniture & gadgets, vegetarian cooking, and brewing. She can often be found teaching & organizing at The Hacktory, Philadelphia's oldest hackerspace.

Open Hardware rewards curiosity by exposing the details of its design and operation. Easy customization and supportive community make it a powerful tool for science education. Our experiences designing & installing a temperature datalogging project based on a single-board Linux computer at a local elementary school demonstrate these benefits and point to potential challenges and rewards involved in educational usage of open hardware.

<!--more-->

This project grew out of the FOSS (Full Option Science System) solar energy curriculum, which includes a series of lab activities to investigate the concepts of thermal mass, insulation, and radiative heat transfer. At the end, students build a cardboard "solar house" with features such as aluminum foil, plastic wrap, and black paper to keep the house warm or cool. They take the houses outdoors and measure temperatures manually over several hours.

In 2012, after helping a 6th-grade class with this activity, we added multi-day temperature measurements using commercial dataloggers. Automatic logging allows more accurate and numerous measurements, revealing clear differences between day & night, and between sunny & cloudy days. The next year, we designed a datalogger with more features and scalability using open source hardware and software. An ADC board of our design connects as many as 16 thermistors to a Linux single-board computer. We wrote a Python script to sample the temperature of each house every 10 minutes, write the result to a local CSV file, and upload the data for online display.

Data was recorded for 5 days, graphed, and projected in class. When presented with these temperature graphs, students were quick to recognize patterns and begin theorizing relationships between their design choices and the observed trends. Such engagement is harder to achieve with idealized data or graphs constructed for instruction. This activity was well-received by students & school staff.

We see several clear opportunities for expanding the educational scope of this project. The hardware and software could be refined for easier reuse by others. The 5th and 6th grade students building solar houses studied circuits in 4th grade. Therefore, they are well-prepared to understand the analog (temperature-sensing) part of the circuit. Programming is not currently being taught to these classes, but the controller script is simple enough to be understood following a semester or less of instruction, and could be modified to be even more beginner-friendly. We plan to expand this project to several other schools in 2014.

Replacing black-box technology in classrooms with open hardware creates multiple teachable moments. Students see soldering, electronics, programming, and data analysis in the context of a practical project, demystifying engineering practice. Open Hardware should be designed with education in mind---reliable, simple to use, and readily understood by hackers new and old.

This work was supported by the Verizon Foundation and the University of Pennsylvania Graduate School of Education. The instructional content of this project was conceived and led by NancyLee Bergey, Associate Director of Teacher Education & Ed.D candidate at Penn GSE.


and suggests several ways that open hardware projects can bring scientific practice into the classroom.



* how much did ours cost vs. commercial loggers? We rolled our own b/c it was more flexible & we wanted to show parents/friends out of school.
* what else could we do with this project, i.e. show kids more electronics, more coding, engineering design considerations
* mention that each house was customized, and students identified how their houses performed
* the community can spread the word!
* existing closed-source hardware is expensive, quick to become obsolete, and no good
* we do plan to pub our board design


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
