
# AllMinds Scholars 

### Scholarships for minds that work differently.

AllMinds Scholars is a scholarship discovery platform built for students who are consistently overlooked by traditional scholarship search engines — neurodivergent students (ADHD, Autism, Dyslexia) and adult learners (career switchers, parents, and workers over 30 returning to education). It is also open to all students looking for worldwide scholarship opportunities.

## Live Demo
[View on GitHub Pages]()

## Features

- **Search & Filter** — search scholarships by name, country, field of study, funding type, audience and application type
- **Specialized Filters** — No Essay, Quick Apply, Video Submission filters for neurodivergent students
- **Time Commitment Filter** — filter by how long an application takes
- **Save Scholarships** — save scholarships to a personal dashboard
- **Deadline Countdown** — see how much time is left before each deadline
- **Accessibility Toggles** — dyslexic-friendly font and high contrast mode on every page
- **Google Sign In** — authentication powered by Firebase
- **Responsive Design** — works on all screen sizes

---

## Pages

| Page | Description |
|---|---|
| Home | Hero section, featured scholarships, who it is for |
| Scholarships | Full listing with search and filters |
| About | Platform story, mission and goals |
| Join Us | Login and registration with Google Sign In |
| Dashboard | Saved scholarships with deadline countdown |

---

## Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling, accessibility themes, responsive design |
| JavaScript ES6+ | Filtering, DOM manipulation, event handling |
| Firebase Auth | Google Sign In authentication |
| localStorage | User accounts, saved scholarships, accessibility preferences |
| Fetch API | Loading scholarship data from JSON |
| JSON | Scholarship data storage |
| GitHub Pages | Deployment |

---

## Project Structure

```
allminds-scholars/
├── index.html
├── scholarships.html
├── about.html
├── join-us.html
├── dashboard.html
├── firebase.js
├── scripts.js
├── css/
│   ├── style.css
│   ├── about.css
│   └── join-us.css
├── json/
│   └── scholarships.json
└── assets/
    └── images
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/yourusername/allminds-scholars.git

# Open in browser
open index.html
```

> No build tools or installations needed for the core project. Firebase is loaded via CDN.

---

## Scholarship Data

The platform includes 20 real, verified scholarships including:

- Chevening Scholarship — UK, Fully Funded
- Gates Cambridge Scholarship — UK, Fully Funded
- DAAD Scholarship — Germany, Fully Funded
- Mastercard Foundation Scholars Program — Africa, Fully Funded
- Neurodiversity Alliance Scholarship — USA, Neurodivergent
- ADHD Scholarship Award — USA, Neurodivergent
- Jeannette Rankin Foundation Scholarship — USA, Adult Learner
- Be Bold No-Essay Scholarship — USA, No Essay
- And more...

---

## Accessibility

AllMinds Scholars is built with accessibility as a core feature:

- **OpenDyslexic Font Toggle** — switch to a font designed for dyslexic readers
- **High Contrast Mode** — increases contrast across the entire site

---

## Author

Built by **Lenny Gitonga**

---