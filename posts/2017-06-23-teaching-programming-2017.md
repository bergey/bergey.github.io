---
title: 
author: Christalee
tags: Christalee, computer science, programming, education
---

Recently I heard from someone newly hired to teach programming/web development at a CTE (vocational) high school. His department was considering updating the curriculum. Now, there's nothing teachers like more than a zillion ideas on what they should teach, especially when they don't come with material support. So I'm going to park some of my overly optimistic ideas here, instead of laying them on this poor fellow.

Anyone teaching computer-related topics in 2017 knows that:
1. The range of skills, compensation levels, and working conditions is huge and unpredictable.
2. Trying to future-proof your students is impossible, but depending on their college/career goals, you need to strike a balance between exposing them to transferable but abstract concepts and fostering mastery of specific tools. If only for the confidence and opportunity to learn how to learn past the basic level, students should leave with some cluster of skills they show mastery in.

My advice is based on what I've observed from friends working in industry (mostly software engineer, sysadmin, and web developer roles) with and without CS bachelor's degrees; close friends helping or leading hiring processes for programming jobs; my own observations of what job ads ask for and what those jobs actually entail. Keeping an eye on the job market is essential input for your curriculum. **my limitations**

A common complaint in CS education is that students are taught too much math and abstract CS concepts that aren't applicable to their jobs. This is pretty funny for a couple of reasons: in this era of widely distributed systems, big data, and high-performance analytics and availability, you have to design systems for big N. Students complain about math, but sampling and distributions are essential to understanding what an SLA (service-level agreement) means for your system's uptime and monitoring needs. It's nice to think that mobile designers can live contentedly inside their Swift ecosystem, but working programmers need to communicate with QA, and sysadmins, and DBAs. Everything has a UI, and embedded systems and the internet affect everything. Knowing enough about topics outside your module to understand how they interact with your module is key.

So, the challenge is to contextualize and connect different computer-related roles and careers. Ideally students get a taste of multiple fields but end up clear that different job titles/paths go with different daily activities, salaries, business sectors, and educational requirements. An Oracle DBA leads a different life than a 

Websites (HTML/CSS/JavaScript/SQL/APIs) and mobile apps (App Inventor -> Java) are
(a) popular with students and potential employers
(b) let you touch on many major topics (variables/functions/loops, how the internet works, how graphics/processors/caching work, data structures & algorithms, databases, digital portfolio & resume) and practices (UI/wireframing, prototyping/design workflow, debugging & QA, documentation, version control, testing, forking/remixing, etc.)

So maybe design around two or three big projects, with smaller hardware units interspersed, like ethernet & server installation, (dis)assembling a PC, installing Linux on old hardware, playing with RasPi/Arduinos? (Is your program 1050 hrs/3 years?)

To be less pie-in-the-sky, here are CS things I taught or facilitated colleagues teaching over my 3 years:
- basic programming in Scratch, up through loops and variables (8 weeks)
- basic HTML/CSS -> build a webpage in Weebly
- students building Android apps in App Inventor
- students exploring game dev with Unity 3D
- student writing a Python app to display assignment due dates in the classroom, based on the teacher's updated Google Calendar (using OAuth & RasPi)
- students exploring basic programming with Codecademy, Code.org, and CodeCombat
- "dissecting" a broken iMac & other electronics

Biased opinions follow:
- Ditch Dreamweaver.

- If you have to cover Office, definitely include a deep look at programming with Excel (if you use Google Docs, you can add Apps Script!)

- I like Cloud9 as an editor/dev environment; Glitch is another, directly aimed at web/API scripting and remixing.

- Talk to the math teachers to make sure students can get stats/probability for monitoring/availability/SLAs, geometry & trig (and linear algebra) for graphics, and limits & induction for algorithmic analysis.

- Optional/fun topics: how do you know when your problem is Big Data or AI or machine learning or buzzword of the month? Basics of network security, threat modelling, password hygiene, & hacking ethics. Build an educational Twitterbot (historical events, procedurally generated text/images, ASCII art)!

- The AP CSP curriculum, CSTA standards, and anything drawing on computational thinking has good vocabulary on concepts and practices if you're looking for a unifying framework to support students making connections.

- I've always wanted to use Twine to do a ELA/programming interactive storytelling unit. If you try it, let me know how it goes!

- You may need to get creative to get students to differentiate between computer-related careers. Not sure if internships, field trips, or lots of career talks from working professionals are enough. Maybe do periodic "here's a resume, what sorts of jobs is it applying to?" activities? Or browsing real job ads on Craigslist, Indeed, and LinkedIn, and talking about what differences and similarities they see?

- The details of this web developer roadmap are overkill, but if you can find or create a simplified version, it could be a good way to discuss different career paths too:
https://github.com/kamranahmedse/developer-roadmap

Websites (HTML/CSS/JavaScript/SQL/APIs) and mobile apps (App Inventor -> Java) are
(a) popular with students and potential employers
(b) let you touch on many major topics (variables/functions/loops, how the internet works, how graphics/processors/caching work, data structures & algorithms, databases, digital portfolio & resume) and practices (UI/wireframing, prototyping/design workflow, debugging & QA, documentation, version control, testing, forking/remixing, etc.)

So maybe design around two or three big projects, with smaller hardware units interspersed, like ethernet & server installation, (dis)assembling a PC, installing Linux on old hardware, playing with RasPi/Arduinos? At some point students can specialize, but team up for at least one project like they would in the workplace (frontend work with backend to design a schema & API, or with a DBA for a datavis project, or two backend devs design modules to work together, tech writers & QA interpret requirements, etc.) Is your program 1050 hrs/3 years?

