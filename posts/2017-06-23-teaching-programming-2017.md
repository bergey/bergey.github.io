---
title: Teaching Programming in 2017
author: Christalee
tags: Christalee, computer science, programming, education
---

Recently I heard from someone newly hired to teach programming/web development at a CTE (vocational) high school. CTE programs vary in length and duration, but the ones I'm familiar with typically require 1080 hours of technical instruction over 3 years (alongside classes to fulfill non-CTE graduation requirements.) Instead of laying all my overly optimistic ideas on this poor fellow, I'm going to park some of them here. My advice is based on what I've observed from friends working in industry (mostly software engineer, sysadmin, and web developer roles) with and without CS bachelor's degrees; close friends helping or leading hiring processes for programming jobs; and my own observations of what job ads ask for and what those jobs actually entail. **my limitations**

Anyone teaching computer-related topics in 2017 knows that:
1. The range of skills, compensation levels, and working conditions in "tech" is huge and unpredictable.
2. Trying to future-proof your students is impossible, but depending on their college/career goals, you need to strike a balance between exposing them to transferable but abstract concepts vs. fostering mastery of specific tools. Students should leave your program showing mastery in a cluster of skills, to build their confidence and ensure that they know how to learn beyond the beginner level.

One challenge is to contextualize and connect different computer-related roles and careers. Ideally students get a taste of multiple fields but end up clear that different job titles/paths go with different daily activities, salaries, business sectors, and educational requirements. An Oracle DBA leads a different life than an iOS designer or an embedded systems engineer. Keeping an eye on the job market is essential input for your curriculum. Internships, field trips, and career talks from working professionals may not be enough to get students to distinguish between career paths. Other career exploration ideas: ask students to review a resume and suggest what jobs it would and would not be suitable for, with tips for improvement; browse real job ads on Craigslist, Indeed, and LinkedIn, and talk about what differences and similarities they see. The details of this [web developer roadmap](https://github.com/kamranahmedse/developer-roadmap) are overkill, but if you can find or create a simplified version, it could be a good visual aid.

A common complaint about CS education is that students are taught too much math and abstract CS, which isn't applicable to their future jobs. This is pretty funny to me: in this era of widely distributed systems, big data, and high-performance analytics and availability, you have to design systems for big N. Sampling and distributions are essential to understanding what an SLA (service-level agreement) means for your system's uptime and monitoring needs. Working programmers need to step outside their IDEs and communicate with QA, sysadmins, UI designers, and DBAs. Knowing enough about topics outside your module to ask the right questions is essential. A unifying framework supports students making connections as they learn. The [AP Computer Science Principles curriculum](https://apstudent.collegeboard.org/apcourse/ap-computer-science-principles), [CSTA K-12 Computer Science standards](https://www.csteachers.org/page/standards), and anything drawing on computational thinking has good vocabulary on concepts and practices of computing.

My suggestion is to build your curriculum around websites (HTML/CSS/JavaScript/SQL/APIs) and mobile apps (App Inventor -> Java). They are popular with students and potential employers, especially if they lead to a digital portfolio & resume, and touch on:

Topics
* variables/functions/loops
* how the internet works
* how graphics/processors/caching work
* data structures & algorithms
* databases

Practices
* UI/wireframing
* prototyping/design workflow
* debugging & QA
* documentation
* version control
* testing
* forking/remixing

Design the year around two or three big projects, with smaller hardware or special topics units interspersed. Ideas: 

Hardware
* ethernet & server installation
* (dis)assembling a PC
* installing Linux on old hardware
* playing with RasPi/Arduinos

Special Topics
* how do you know when your problem is Big Data or AI or machine learning or buzzword of the month? 
* basics of network security, threat modelling, password hygiene, & hacking ethics
* build an educational Twitterbot (historical events, procedurally generated text/images, ASCII art)!

At some point students will specialize, but have them team up for at least one project, like they would in the workplace. Front end can work with back end to design a schema & API, or with a DBA for a data visualization project; two backend devs can design modules to work together; tech writers & QA can interpret requirements, etc. Talk to your math faculty to find out when students learn stats & probability (monitoring/availability/SLAs), geometry/trigonometry & linear algebra (graphics), and limits & induction (algorithmic analysis). If you have to cover Office, definitely include a deep look at programming with Excel (if you use Google Docs, you can add [Apps Script](https://developers.google.com/apps-script/)!)

Resources for teaching programming abound, but here are a few tools I've used or heard good things about, in addition to those listed above. [Cloud9](https://c9.io/) is an editor/dev environment; [Glitch](https://glitch.com/) is another, directly aimed at web/API scripting and remixing. I've always wanted to use [Twine](https://twinery.org/) to do a ELA/programming interactive storytelling unit.

To be less pie-in-the-sky, here are CS activities I taught or facilitated with colleagues:
- basic programming in [Scratch](https://scratch.mit.edu/), up through loops and variables (8 weeks)
- basic HTML/CSS -> build a webpage in [Weebly](https://www.weebly.com/)
- students building Android apps in [App Inventor](http://appinventor.mit.edu/explore/)
- students exploring game dev with [Unity 3D](https://unity3d.com/)
- student writing a Python app to display assignment due dates in the classroom, based on the teacher's updated Google Calendar (using OAuth & RasPi)
- students exploring basic programming with [Codecademy](https://www.codecademy.com/), [Code.org](https://code.org/), and [CodeCombat](https://codecombat.com/)
- "dissecting" a broken iMac & other electronics
