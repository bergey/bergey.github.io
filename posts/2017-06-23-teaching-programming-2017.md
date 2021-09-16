---
title: CTE Programming in 2017
author: Christalee
tags: Christalee, computer science, programming, education
---

Recently I spoke with someone newly hired to teach programming/web development at a career & technical education (CTE, aka vocational) high school. CTE programs vary in length and duration, but the ones I'm familiar with typically require 1080 hours of technical instruction over 3 years (alongside classes to fulfill non-CTE graduation requirements.) This response is based on what I've observed about friends working in software engineer, sysadmin, and web developer roles, with and without CS bachelor's degrees; close friends participating in or leading hiring for programming jobs; and my own observations of what job ads ask for and what those jobs actually entail. (New to teaching CS? Try my Introduction to Programming for a broader look at creative & constructivist teaching resources.)

### The Problem

Anyone teaching computer-related topics in 2017 knows that:

1. The range of skills, compensation levels, and working conditions in "tech" is huge and unpredictable.
2. Trying to future-proof your students is impossible. 

<!--more-->
Depending on their college/career goals, you need to strike a balance between exposing them to transferable but abstract concepts vs. fostering mastery of specific tools. Students should leave your program showing mastery in at least one cluster of skills, to build their confidence and ensure that they know how to learn beyond the beginner level.

One challenge is to contextualize and connect different computer-related roles and careers. Ideally students get a taste of multiple fields but end up clear that different job titles/paths go with different daily activities, salaries, business sectors, and educational requirements. An Oracle DBA leads a different life than an iOS designer or an embedded systems engineer. Keeping an eye on the job market is essential input for your curriculum. Internships, field trips, and career talks from working professionals may not be enough to get students to distinguish between career paths. Other career exploration ideas: ask students to review an anonymized resume and suggest what jobs it would and would not be suitable for, with tips for improvement; browse real job ads on Craigslist, Indeed, and LinkedIn, and talk about what differences and similarities they see. The details of this [web developer roadmap](https://github.com/kamranahmedse/developer-roadmap) are overkill, but if you can find or create a simplified version, it could be a good visual aid.

A common complaint about CS education is that students are taught too much math and abstract CS which isn't applicable to their future jobs. This is pretty funny to me: in this era of widely distributed systems, big data, and high-performance analytics and availability, you have to design systems for big N. Sampling and distributions are essential to understanding what an SLA (service-level agreement) means for your system's uptime and monitoring needs. Working programmers frequently communicate with QA, sysadmins, UI designers, and DBAs. Knowing how to ask the right questions outside your area of expertise is essential. 

A unifying framework supports students making connections as they learn. The [AP Computer Science Principles curriculum](https://apstudent.collegeboard.org/apcourse/ap-computer-science-principles), [CSTA K-12 Computer Science standards](https://www.csteachers.org/page/standards), and anything drawing on computational thinking has good vocabulary on concepts and practices of computing. (Curious about computational thinking? Here's my take on it.)

### My Suggestions
My suggestion is to build your curriculum around websites (HTML/CSS/JavaScript/SQL/APIs) and mobile apps (App Inventor -> Java). They are popular with students and potential employers, especially if they lead to a digital portfolio & resume, and touch on:

**Topics**

* variables/functions/loops
* how the internet works
* how graphics/processors/caching work
* data structures & algorithms
* databases

**Practices**

* UI/wireframing
* prototyping/design workflow
* debugging & QA
* documentation
* version control
* testing
* forking/remixing

Design the year around two or three big projects, with smaller hardware or special topics units interspersed. Ideas: 

**Hardware**

* ethernet & server installation
* (dis)assembling a PC
* installing Linux on old hardware
* playing with RasPi/Arduinos

**Special Topics**

* how do you know when your problem is Big Data or AI or machine learning or buzzword of the month? 
* basics of network security, threat modelling, password hygiene, & hacking ethics
* build an educational Twitterbot (historical events, procedurally generated text/images, ASCII art)!

At some point students will specialize, but have them team up for at least one project, like they would in the workplace. Front end can work with back end to design a schema & API, or with a DBA for a data visualization project; two backend devs can design modules to work together; tech writers & QA can interpret requirements, etc. Talk to your math faculty to find out when students learn stats & probability (monitoring/availability/SLAs), geometry/trigonometry & linear algebra (graphics), and limits & induction (algorithmic analysis). If you have to cover Office, definitely include a deep look at programming with Excel (if you use Google Docs, you can add [Apps Script](https://developers.google.com/apps-script/)!)

Resources for teaching programming abound, but here are a few tools I've used or heard good things about, in addition to those listed above. [Cloud9](https://c9.io/) is an editor/dev environment; [Glitch](https://glitch.com/) is another, directly aimed at web/API scripting and remixing. I've always wanted to use [Twine](https://twinery.org/) to do a ELA/programming interactive storytelling unit.