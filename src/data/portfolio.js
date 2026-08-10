export const portfolio = {
  person: {
    name: 'Santosh Yalawar',
    role: 'Java Full Stack Developer',
    specialty: 'Java + Spring Boot + React + MySQL',
    experience: '2 years hands-on project experience',
    location: 'India',
    email: 'santoshmyrohit@gmail.com',
    photoUrl: '',
    githubUrl: 'https://github.com/Santoshyalawar-hub/',
    linkedinUrl: 'https://www.linkedin.com/in/santosh-yalawar-2454ba407/',
    resumeUrl: '#resume',
  },
  hero: {
    eyebrow: 'Java Full Stack Developer',
    title: 'Java Full Stack Developer building secure, API-driven web applications.',
    summary:
      '2 years of focused hands-on experience building Java full-stack features with Spring Boot, React, REST APIs, JWT authentication, MySQL, Docker, CI/CD, and cloud deployment.',
    highlights: ['Java + Spring Boot', 'REST API design', 'JWT security', 'React + Vite', 'MySQL + JPA', 'Docker deploys'],
    roles: ['Java Full Stack Developer', 'Spring Boot API Developer', 'React Frontend Builder', 'Deployment-aware Engineer'],
    imageUrl: 'https://images.pexels.com/photos/4974912/pexels-photo-4974912.jpeg?auto=compress&cs=tinysrgb&w=1600',
    imageCredit: 'Photo by olia danilevich on Pexels',
    flow: [
      { title: 'Backend', text: 'Spring Boot APIs, JWT, MySQL' },
      { title: 'Frontend', text: 'React, Vite, Axios integration' },
      { title: 'Deployment', text: 'Docker, CI/CD, cloud hosting' },
    ],
  },
  stats: [
    { value: '2 yrs', label: 'Hands-on project experience' },
    { value: '3+', label: 'Cloud platforms used' },
    { value: '12+', label: 'Core technologies' },
    { value: '1', label: 'Flagship Java full-stack project' },
  ],
  proofPoints: [
    {
      title: 'Secure backend systems',
      text: 'Built Spring Boot REST APIs with Spring Security, JWT authentication, role checks, service-layer logic, and CORS rules for frontend-backend communication.',
    },
    {
      title: 'Product-minded frontend',
      text: 'Built React + Vite interfaces around real workflows such as user management, tickets, attendance, and leave operations.',
    },
    {
      title: 'Recruiter-ready project proof',
      text: 'Shows practical Java full-stack ability through public repositories, deployed workflow knowledge, debugging notes, and clear project architecture.',
    },
  ],
  homeOverview: [
    {
      title: 'Backend foundation',
      text: 'Java, Spring Boot, REST APIs, Spring Security, JWT, Hibernate/JPA, and MySQL.',
    },
    {
      title: 'Frontend integration',
      text: 'React, Vite, Axios, routing, protected views, and API-driven UI workflows.',
    },
    {
      title: 'Deployment exposure',
      text: 'Docker, Docker Compose, GitHub workflows, Railway, Vercel, GCP, and environment configuration.',
    },
  ],
  projectTeaser: {
    title: 'Main project: CrewSync HRMS',
    text: 'A Java full-stack HRMS platform covering authentication, roles, tenant isolation, users, tickets, attendance, and leave workflows.',
    linkText: 'Open project case study',
  },
  summary: [
    'Java full-stack developer with practical backend exposure in Spring Boot, REST APIs, Spring Security, JWT authentication, JPA/Hibernate, and MySQL.',
    'Skilled in frontend development using React, Vite, Axios, routing, protected screens, and API integration workflows.',
    'Hands-on exposure to Docker, Docker Compose, CI/CD pipelines, Git, GitHub, Postman, GCP, Railway, and Vercel.',
    'Comfortable debugging production issues including CORS errors, deployment failures, environment variables, and API failures.',
  ],
  experience: {
    title: 'Java Full Stack Developer',
    meta: '2 years experience',
    responsibilities: [
      'Built Java full-stack features using Spring Boot, React, MySQL, and REST API architecture.',
      'Designed and implemented RESTful APIs with JWT authentication, role-based access control, and Spring Security.',
      'Created React + Vite screens connected to backend APIs through Axios and protected route flows.',
      'Worked with JPA/Hibernate entities, repositories, service layers, and MySQL-backed data models.',
      'Used Docker and Docker Compose for containerized development and deployment workflows.',
      'Created CI/CD pipelines for automated build and deployment.',
      'Tested APIs using Postman and used Git/GitHub for version control and collaboration.',
      'Deployed applications on GCP, Railway, and Vercel while managing production configs.',
      'Solved production issues such as CORS errors, deployment failures, and API integration defects.',
    ],
  },
  projects: [
    {
      name: 'CrewSync HRMS Platform',
      type: 'Main project',
      description:
        'A Java full-stack Human Resource Management System with secure authentication, multi-tenant data isolation, user management, attendance, leave, and ticket workflows.',
      features: [
        'JWT authentication system',
        'Role-based access for Admin, Employee, and Global Admin',
        'Multi-tenant company-based isolation',
        'User management APIs under /api/users',
        'Spring Boot service layer, JPA/Hibernate persistence, and MySQL integration',
        'Secure Spring Security backend with production CORS configuration',
        'Production deployment experience',
      ],
      stack: [
        'Java',
        'Spring Boot',
        'Spring Security',
        'JWT',
        'MySQL',
        'React',
        'Vite',
        'Axios',
        'Docker',
        'Docker Compose',
        'GitHub Actions',
        'Railway',
        'Vercel',
        'GCP',
      ],
    },
    {
      name: 'Nexora Hub',
      type: 'Collaborative platform',
      description:
        'A large community-driven platform where developers without company experience can contribute, build real features, and showcase their skills through open project work.',
      features: [
        'Open contribution workflow for developers to practice real collaboration',
        'Skill showcase space for frontend, backend, full-stack, and DevOps contributors',
        'Project modules designed for learning through practical feature development',
        'GitHub-based collaboration with issues, pull requests, and code review practice',
        'Built to help freshers and self-taught developers prove ability through contribution',
      ],
      stack: ['Java', 'Spring Boot', 'React', 'MySQL', 'REST APIs', 'GitHub', 'Open Source Collaboration'],
    },
    {
      name: 'DevOps & CI/CD Pipeline Experience',
      type: 'Engineering workflow',
      description:
        'Automated deployment workflows connecting GitHub, Dockerized services, and cloud platforms for consistent releases.',
      features: [
        'Automated backend deployment pipelines',
        'GitHub workflow integration',
        'Dockerized application environments',
        'Docker Compose multi-service setup',
      ],
      stack: ['GitHub Actions', 'Docker', 'Docker Compose', 'Railway', 'GCP'],
    },
    {
      name: 'Cloud Deployment Experience',
      type: 'Production hosting',
      description:
        'Deployment experience across GCP, Railway, and Vercel, including environment variables and production configuration.',
      features: [
        'GCP deployment experience',
        'Railway backend hosting for budget-aware deployments',
        'Vercel frontend deployment',
        'Production environment variable management',
      ],
      stack: ['GCP', 'Railway', 'Vercel', 'Environment variables'],
    },
  ],
  repositories: [
    {
      name: 'crewsync',
      visibility: 'Public',
      description: 'Full-stack HRMS application built with React frontend and Spring Boot backend.',
      language: 'React + Spring Boot',
      url: 'https://github.com/Santoshyalawar-hub/crewsync',
    },
    {
      name: 'Bloggie',
      visibility: 'Public',
      description: 'ASP.NET Core MVC blog application with admin panel, authentication, posts, and tags.',
      language: 'C#',
      url: 'https://github.com/Santoshyalawar-hub/Bloggie',
    },
    {
      name: 'Nexora Hub',
      visibility: 'Public',
      description:
        'Big collaborative platform for developers to contribute, gain practical project knowledge, and showcase skills through real feature work.',
      language: 'Java + Spring Boot + React',
      url: 'https://github.com/Santoshyalawar-hub/NexoraHub',
    },
  ],
  flagship: {
    name: 'CrewSync HRMS Platform',
    label: 'Main project case study',
    headline: 'CrewSync HRMS: a full-stack HR management platform with authentication, roles, and operational workflows.',
    problem:
      'HR teams need a secure way to manage employees, tickets, attendance, and leave while keeping company data isolated and access controlled.',
    solution:
      'Built a Spring Boot + React platform with JWT authentication, role-based access, multi-tenant company isolation, protected APIs, and a deployable frontend-backend architecture.',
    outcome:
      'The project shows practical Java full-stack experience: API design, authentication, JPA/Hibernate persistence, CORS handling, deployment configuration, Docker workflows, and debugging real integration issues.',
    modules: ['Auth & roles', 'Company tenancy', 'User APIs', 'Tickets', 'Attendance', 'Leave management'],
    decisions: [
      'JWT-based stateless authentication for API security.',
      'Role-aware access paths for Admin, Employee, and Global Admin usage.',
      'Company-based isolation to model SaaS multi-tenancy.',
      'Docker Compose setup for repeatable local and deployment environments.',
      'Separate Railway/Vercel deployment strategy to control hosting cost.',
    ],
    architecture: [
      { layer: 'Client', detail: 'React, Vite, Axios, protected views' },
      { layer: 'API', detail: 'Spring Boot REST controllers and service layer' },
      { layer: 'Security', detail: 'JWT filters, Spring Security, RBAC, CORS' },
      { layer: 'Data', detail: 'MySQL, JPA/Hibernate, tenant-aware records' },
      { layer: 'Delivery', detail: 'Docker, Docker Compose, GitHub Actions, cloud deploys' },
    ],
  },
  skillGroups: [
    { title: 'Frontend', skills: ['React', 'Vite', 'JavaScript', 'Axios', 'React Router'] },
    { title: 'Backend', skills: ['Java', 'Spring Boot', 'Spring Security', 'JWT Authentication', 'Hibernate / JPA'] },
    { title: 'Database', skills: ['MySQL'] },
    { title: 'DevOps / Tools', skills: ['Docker', 'Docker Compose', 'CI/CD pipelines', 'Git & GitHub', 'Postman API Testing'] },
    { title: 'Cloud', skills: ['Google Cloud Platform', 'Railway', 'Vercel'] },
  ],
  journey: [
    'Learned Java and backend fundamentals',
    'Built REST APIs using Spring Boot',
    'Integrated JWT authentication and security',
    'Developed Java full-stack HRMS SaaS application',
    'Connected React screens with Spring Boot APIs',
    'Learned Docker and containerization',
    'Built CI/CD pipelines for automation',
    'Deployed applications on GCP, Railway, and Vercel',
    'Handled CORS, API failures, and deployment debugging',
    'Gained 2 years of hands-on Java full-stack project experience',
  ],
  workflows: [
    { label: 'API layer', value: 'Spring Boot REST services secured with JWT and role policies' },
    { label: 'Frontend layer', value: 'React + Vite UI integrated through Axios and production CORS rules' },
    { label: 'Delivery layer', value: 'Dockerized services with CI/CD automation from GitHub' },
    { label: 'Cloud layer', value: 'GCP, Railway, and Vercel deployments with environment configs' },
  ],
  conversion: [
    'Can build Spring Boot REST APIs and integrate them with React frontends.',
    'Understands Java, MySQL, JWT security, production configuration, deployment failures, and CORS debugging.',
    'Has practical project proof through CrewSync, public repositories, Dockerized delivery, and cloud-hosted workflows.',
  ],
}
