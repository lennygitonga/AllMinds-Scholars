# AllMinds Scholars
### Scholarships for Minds That Work Differently

---

## The Idea

AllMinds Scholars is a scholarship discovery platform built for all including two groups that existing platforms have consistently ignored — neurodivergent students (ADHD, Autism, Dyslexia) and adult learners (career switchers, parents, and workers over 30 going back to school). The name says it clearly: all minds belong here.

The problem is simple. Every major scholarship search engine was built for the traditional 18-year-old student. Neurodivergent students get overwhelmed by cluttered interfaces and long-form essay requirements. Adult learners can't find a single filter that speaks to their situation. AllMinds Scholars fixes both.

---

## Who It Is For
**All Students** - Students who are done with their senior secondary education.

**Neurodivergent Students** - students with ADHD, Autism, Dyslexia or other learning differences who need a calmer interface, no-essay scholarship options, and accessibility features that actually work.

**Adult Learners** - career switchers, parents, and workers over 30 who need part-time and flexible scholarships and a way to filter by how long an application actually takes.

---

## What It Does

- Search and filter scholarships by field of study, funding type, application type (No Essay, Video, Quick Apply), audience, and time commitment
- Save scholarships to a personal dashboard and track deadlines
- Toggle a dyslexic-friendly font (OpenDyslexic) and high contrast mode from any page
- Create an account and return to saved scholarships across sessions
- Click directly through to official scholarship application pages

---

## The JavaScript

The platform is built around four core JS features:

**Dynamic Filtering Engine** - real-time filtering using filter() and map() on a locally loaded JSON dataset. No page reloads. Results update instantly as the user adjusts any filter.

**Accessibility Toggle System** - JS toggles CSS classes on the root element to switch font and contrast modes. Preferences are written to localStorage and restored on every page load.

**Fetch API + Async/Await** - scholarship data lives in a scholarships.json file and is fetched asynchronously on page load, parsed, and stored in memory for all filtering operations.

**localStorage Auth & Persistence** - user registration, login, saved scholarships, and accessibility settings all persist across sessions without a backend.

---

## Pages

Home, Scholarships (with filters), Scholarship Detail, About, Login/Register, Dashboard

---

## Stack

HTML5, CSS3, JavaScript ES6+, JSON, localStorage, Fetch API, GitHub Pages