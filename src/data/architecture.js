// Edit diagrams here: nodes and edges only. x,y are % of the canvas.
// FraudShield is a company project: keep it GENERALIZED (no proprietary names/details).
const fraud = {
  id: 'fraudshield', confidential: true,
  title: 'FraudShield: generalized event-driven flow',
  nodes: [
    { id: 'client', name: 'Client', x: 6, y: 50, status: 'planned', does: 'Web or API client submitting transactions.', apis: ['POST /api/transactions'], produces: [], consumes: [], owns: '-', deps: ['auth', 'transaction'] },
    { id: 'auth', name: 'Auth Service', x: 24, y: 14, status: 'in-progress', does: 'Issues JWTs and enforces role-based access.', apis: ['POST /auth/login'], produces: [], consumes: [], owns: 'users DB (PostgreSQL)', deps: [] },
    { id: 'transaction', name: 'Transaction Service', x: 24, y: 50, status: 'in-progress', does: 'Accepts transactions, enforces idempotency and publishes events.', apis: ['POST /api/transactions'], produces: ['transactions.created'], consumes: ['decisions.made'], owns: 'transactions DB (PostgreSQL)', deps: ['redis', 'kafka'] },
    { id: 'kafka', name: 'Apache Kafka', x: 44, y: 50, status: 'in-progress', does: 'Event backbone with consumer groups per service.', apis: [], produces: [], consumes: [], owns: 'topics', deps: [] },
    { id: 'fraud', name: 'Fraud Detection', x: 62, y: 20, status: 'planned', does: 'Evaluates transactions against rules and risk profiles.', apis: [], produces: ['fraud.scored'], consumes: ['transactions.created'], owns: 'rules store', deps: ['risk', 'redis'] },
    { id: 'risk', name: 'Risk Profile', x: 80, y: 8, status: 'planned', does: 'Maintains per-customer risk profile.', apis: ['GET /risk/{id}'], produces: [], consumes: ['transactions.created'], owns: 'risk DB', deps: [] },
    { id: 'decision', name: 'Decision Service', x: 62, y: 50, status: 'planned', does: 'Turns scores into ALLOW / HOLD / REJECT.', apis: [], produces: ['decisions.made'], consumes: ['fraud.scored'], owns: 'decisions DB', deps: [] },
    { id: 'alert', name: 'Alert & Notification', x: 80, y: 38, status: 'planned', does: 'Notifies on HOLD / REJECT decisions.', apis: [], produces: [], consumes: ['decisions.made'], owns: '-', deps: [] },
    { id: 'investigation', name: 'Investigation', x: 80, y: 66, status: 'planned', does: 'Lets analysts review held transactions.', apis: ['GET /cases'], produces: [], consumes: ['decisions.made'], owns: 'cases DB', deps: [] },
    { id: 'audit', name: 'Audit & Reporting', x: 62, y: 84, status: 'planned', does: 'Immutable audit trail and reports.', apis: ['GET /reports'], produces: [], consumes: ['decisions.made'], owns: 'audit DB', deps: [] },
    { id: 'redis', name: 'Redis', x: 44, y: 84, status: 'planned', does: 'Idempotency keys and hot-path caching.', apis: [], produces: [], consumes: [], owns: 'cache', deps: [] },
  ],
  edges: [
    ['client', 'transaction'], ['client', 'auth'], ['transaction', 'kafka'], ['transaction', 'redis'],
    ['kafka', 'fraud'], ['fraud', 'risk'], ['fraud', 'decision'], ['kafka', 'decision'],
    ['decision', 'alert'], ['decision', 'investigation'], ['decision', 'audit'],
  ],
}

const samaya = {
  id: 'samayahr', title: 'SamayaHR: multi-tenant request flow',
  nodes: [
    { id: 'react', name: 'React + Vite UI', x: 8, y: 50, status: 'implemented', does: 'Role-aware screens and protected routes.', apis: ['Axios calls'], produces: [], consumes: [], owns: '-', deps: ['filter'] },
    { id: 'filter', name: 'JWT Filter + CORS', x: 32, y: 50, status: 'implemented', does: 'Validates JWT, applies Spring Security roles and CORS.', apis: [], produces: [], consumes: [], owns: '-', deps: ['api'] },
    { id: 'api', name: 'Spring Boot REST API', x: 56, y: 50, status: 'implemented', does: 'Controllers and service layer for users, tickets, attendance and leave.', apis: ['/api/users'], produces: [], consumes: [], owns: '-', deps: ['jpa'] },
    { id: 'jpa', name: 'JPA / Hibernate', x: 78, y: 22, status: 'implemented', does: 'Entities and repositories with company-scoped queries.', apis: [], produces: [], consumes: [], owns: 'entities', deps: ['mysql'] },
    { id: 'mysql', name: 'MySQL', x: 78, y: 78, status: 'implemented', does: 'Tenant-aware records isolated per company.', apis: [], produces: [], consumes: [], owns: 'all HR data', deps: [] },
  ],
  edges: [['react', 'filter'], ['filter', 'api'], ['api', 'jpa'], ['jpa', 'mysql']],
}
export const diagrams = [samaya, fraud]
