# Santosh Yalawar: Portfolio

React 19 + Vite multi-page portfolio (Home, About, Experience, Skills, Projects, Project detail, Architecture, Contact) with dark/light theme and a lazy-loaded 3D hero (Three.js / React Three Fiber).

## Update content (edit only `src/data/*`)
- `profile.js`: name, role, tagline, email, resume path, social links, About text, education
- `experience.js`: add an object to add a job; set `company` when you want it shown
- `skills.js`: `u('Name')` = used in projects, `l('Name')` = upskilled
- `projects.js`: add one object = new card + detail page (`status`: implemented / in-progress / planned; `confidential: true` shows the confidentiality note)
- `architecture.js`: edit nodes/edges of each diagram. Keep company projects generalized.
- Resume: put your PDF at `public/resume.pdf`
- Search the code for `TODO` for items still to confirm.

## Commands
`npm install`, `npm run dev`, `npm run build`, `npm run lint`

Deploy: Vercel (`vercel.json`) or Docker (`docker build -t portfolio . && docker run -p 8080:80 portfolio`).

## Roadmap / upcoming projects
Edit `src/data/roadmap.js`: each object appears on Home and at the bottom of Projects (phase: Now / Next / Upskilling).

## Contact form email (Vercel)
The contact form sends through Gmail SMTP using the serverless function at `api/contact.js`. In Vercel, add these environment variables under **Project Settings → Environment Variables**, then redeploy:
- `SMTP_USER`: Gmail address used to send messages
- `SMTP_PASS`: a Gmail App Password (not your regular Gmail password)
- `CONTACT_TO`: address that should receive contact form messages

Keep these values in Vercel environment variables. Do not commit them or add them to `VITE_*` variables, which are exposed to the browser. For local development, use `.env.local` based on `.env.example` and run `vercel dev` so the API function is available.
