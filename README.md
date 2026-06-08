# Developer Portfolio

Recruiter-ready portfolio website built with React and Vite.

## Content Updates

Portfolio values are centralized in `src/data/portfolio.js`. Update that file to change profile details, stats, projects, skills, journey items, workflow notes, and contact links.

## Structure

- `src/App.jsx` defines the React Router routes.
- `src/components` contains shared layout, chips, section headers, page motion, role rotation, and the CrewSync case study.
- `src/pages` contains separate JSX pages for home, projects, skills, experience, and contact.
- `src/data/portfolio.js` contains the professional story, proof points, project architecture, technical decisions, and recruiter conversion content.

## Media

- Set `person.photoUrl` in `src/data/portfolio.js` only if you want to add your real profile image.

## Commands

```bash
npm run dev
npm run build
npm run lint
```

## Vercel Deployment

Use these settings:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

`vercel.json` is included so direct routes such as `/projects` and `/contact` load correctly.

## Docker

```bash
docker build -t portfolio .
docker run --rm -p 8080:80 portfolio
```

Open `http://localhost:8080`.
