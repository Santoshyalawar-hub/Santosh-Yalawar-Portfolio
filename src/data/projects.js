// status: 'implemented' | 'in-progress' | 'planned'. Add a project by adding one object here.
export const projects = [
  {
    id: 'fraudshield', name: 'FraudShield', subtitle: 'Real-time payment fraud detection',
    description: 'Professional event-driven fraud detection platform (high-level view): transactions flow through Kafka, are evaluated by a fraud service and resolved to ALLOW / HOLD / REJECT decisions.',
    stack: ['Java', 'Spring Boot', 'Apache Kafka', 'PostgreSQL', 'Redis', 'Docker', 'JWT'],
    status: 'in-progress',
    confidential: true,
    note: 'This is a professional (company) project. Only high-level information is shown; internal code, data and company details are intentionally omitted.',
    contribution: 'Contributing to backend development as part of a team. TODO: refine wording.',
    problem: 'Payment platforms must evaluate transactions in real time and decide quickly whether to allow, hold or reject them.',
    solution: 'An event-driven design where transaction events flow through Kafka to fraud evaluation and decision stages. TODO: confirm wording.',
    decisions: ['Kafka consumer groups so services can scale independently.', 'Idempotent transaction handling to prevent duplicate processing.'],
    screenshots: [],
    features: [
      { text: 'Microservice decomposition (auth, transaction, fraud, decision, alerts, audit)', status: 'in-progress' },
      { text: 'Kafka producers/consumers with consumer groups', status: 'in-progress' },
      { text: 'Idempotent transaction handling', status: 'planned' },
      { text: 'ALLOW / HOLD / REJECT decision workflow', status: 'planned' },
      { text: 'JWT + role-based access', status: 'planned' },
      { text: 'Monitoring and logging', status: 'planned' },
    ], // TODO: set each status to match reality
    github: '', demo: '',
  },
  {
    id: 'samayahr', name: 'SamayaHR', subtitle: 'Multi-tenant HR management',
    description: 'Full-stack HRMS with JWT authentication, role-based access, company-level tenant isolation, users, tickets, attendance and leave workflows.',
    stack: ['Java', 'Spring Boot', 'Spring Security', 'JWT', 'MySQL', 'React', 'Vite', 'Axios', 'Docker', 'GitHub Actions', 'Railway', 'Vercel'],
    status: 'implemented',
    contribution: 'Built the Spring Boot API, security layer, React integration and deployment.',
    features: [
      { text: 'JWT authentication and Spring Security', status: 'implemented' },
      { text: 'Roles: Admin, Employee, Global Admin', status: 'implemented' },
      { text: 'Multi-tenant company isolation', status: 'implemented' },
      { text: 'User management APIs (/api/users)', status: 'implemented' },
      { text: 'Tickets, attendance and leave workflows', status: 'implemented' }, // TODO: verify each
      { text: 'Docker Compose + CI/CD, split Railway/Vercel deploy', status: 'implemented' },
    ],
    problem: "HR teams need a secure way to manage employees, tickets, attendance and leave while keeping each company's data isolated and access controlled.",
    solution: 'A Spring Boot + React platform with JWT authentication, role-based access, multi-tenant company isolation and protected APIs, deployable as separate frontend and backend.',
    decisions: ['JWT-based stateless authentication for API security.', 'Role-aware access paths for Admin, Employee and Global Admin.', 'Company-based isolation to model SaaS multi-tenancy.', 'Docker Compose for repeatable environments.', 'Separate Railway (backend) and Vercel (frontend) deploys to control hosting cost.'],
    challenge: { issue: 'CORS errors and deployment failures between the hosted frontend and backend.', fix: 'Configured production CORS rules and per-environment variables.' },
    outcome: 'Delivered practical full-stack work: API design, authentication, JPA/Hibernate persistence, Docker workflows and cloud deployment.',
    screenshots: [], // TODO: add paths like '/screens/samayahr-1.png' (files in public/screens)
    github: 'https://github.com/Santoshyalawar-hub/crewsync', demo: '',
  },
  {
    id: 'medcore', name: 'MedCore', subtitle: 'Hospital management UI',
    description: 'Hospital management frontend with role-based experience, dashboards and patient management screens. Backend is not yet implemented.',
    stack: ['React', 'Vite', 'JavaScript'], // TODO: confirm
    status: 'in-progress',
    contribution: 'Frontend component architecture and UI. TODO: confirm.',
    features: [
      { text: 'Responsive dashboard and patient management UI', status: 'in-progress' },
      { text: 'Role-based user experience', status: 'in-progress' },
      { text: 'Backend APIs and persistence', status: 'planned' },
    ],
    github: '', demo: '',
  },
  {
    id: 'nexora', name: 'Nexora Hub', subtitle: 'Collaborative developer platform',
    description: 'Community platform where developers without company experience contribute real features and showcase skills.',
    stack: ['Java', 'Spring Boot', 'React', 'MySQL', 'GitHub'],
    status: 'in-progress', contribution: 'TODO: confirm.',
    features: [{ text: 'GitHub-based collaboration workflow', status: 'in-progress' }],
    github: 'https://github.com/Santoshyalawar-hub/NexoraHub', demo: '',
  },
]
