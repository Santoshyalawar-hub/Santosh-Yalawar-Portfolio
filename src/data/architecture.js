// Edit diagrams here: nodes and edges only. x,y are % of the canvas.
// FraudShield is a company project: keep it GENERALIZED (no proprietary names/details).
const fraud = {
  id: 'fraudshield', confidential: true,
  title: 'FraudShield: generalized event-driven flow',
  nodes: [
    { id: 'client', name: 'Client', x: 8, y: 50, status: 'planned', does: 'Web or API client submitting transactions.', apis: ['POST /api/transactions'], produces: [], consumes: [], owns: '-', deps: ['auth', 'transaction'] },
    { id: 'auth', name: 'Auth Service', x: 36, y: 10, status: 'in-progress', does: 'Issues JWTs and enforces role-based access.', apis: ['POST /auth/login'], produces: [], consumes: [], owns: 'users DB (PostgreSQL)', deps: [] },
    { id: 'transaction', name: 'Transaction Service', x: 36, y: 50, status: 'in-progress', does: 'Accepts transactions, enforces idempotency and publishes events.', apis: ['POST /api/transactions'], produces: ['transactions.created'], consumes: ['decisions.made'], owns: 'transactions DB (PostgreSQL)', deps: ['redis', 'kafka'] },
    { id: 'kafka', name: 'Apache Kafka', x: 64, y: 50, status: 'in-progress', does: 'Event backbone with consumer groups per service.', apis: [], produces: [], consumes: [], owns: 'topics', deps: [] },
    { id: 'fraud', name: 'Fraud Detection', x: 64, y: 30, status: 'planned', does: 'Evaluates transactions against rules and risk profiles.', apis: [], produces: ['fraud.scored'], consumes: ['transactions.created'], owns: 'rules store', deps: ['risk', 'redis'] },
    { id: 'risk', name: 'Risk Profile', x: 92, y: 10, status: 'planned', does: 'Maintains per-customer risk profile.', apis: ['GET /risk/{id}'], produces: [], consumes: ['transactions.created'], owns: 'risk DB', deps: [] },
    { id: 'decision', name: 'Decision Service', x: 64, y: 70, status: 'planned', does: 'Turns scores into ALLOW / HOLD / REJECT.', apis: [], produces: ['decisions.made'], consumes: ['fraud.scored'], owns: 'decisions DB', deps: [] },
    { id: 'alert', name: 'Alert & Notification', x: 92, y: 30, status: 'planned', does: 'Notifies on HOLD / REJECT decisions.', apis: [], produces: [], consumes: ['decisions.made'], owns: '-', deps: [] },
    { id: 'investigation', name: 'Investigation', x: 92, y: 50, status: 'planned', does: 'Lets analysts review held transactions.', apis: ['GET /cases'], produces: [], consumes: ['decisions.made'], owns: 'cases DB', deps: [] },
    { id: 'audit', name: 'Audit & Reporting', x: 92, y: 70, status: 'planned', does: 'Immutable audit trail and reports.', apis: ['GET /reports'], produces: [], consumes: ['decisions.made'], owns: 'audit DB', deps: [] },
    { id: 'redis', name: 'Redis', x: 36, y: 90, status: 'planned', does: 'Idempotency keys and hot-path caching.', apis: [], produces: [], consumes: [], owns: 'cache', deps: [] },
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
    { id: 'filter', name: 'JWT Filter + CORS', x: 36, y: 50, status: 'implemented', does: 'Validates JWT, applies Spring Security roles and CORS.', apis: [], produces: [], consumes: [], owns: '-', deps: ['api'] },
    { id: 'api', name: 'Spring Boot REST API', x: 64, y: 50, status: 'implemented', does: 'Controllers and service layer for users, tickets, attendance and leave.', apis: ['/api/users'], produces: [], consumes: [], owns: '-', deps: ['jpa'] },
    { id: 'jpa', name: 'JPA / Hibernate', x: 92, y: 30, status: 'implemented', does: 'Entities and repositories with company-scoped queries.', apis: [], produces: [], consumes: [], owns: 'entities', deps: ['mysql'] },
    { id: 'mysql', name: 'MySQL', x: 92, y: 70, status: 'implemented', does: 'Tenant-aware records isolated per company.', apis: [], produces: [], consumes: [], owns: 'all HR data', deps: [] },
  ],
  edges: [['react', 'filter'], ['filter', 'api'], ['api', 'jpa'], ['jpa', 'mysql']],
}
const persona = {
  id: 'personaai', title: 'PersonaAI: multi-tenant AI assistant',
  nodes: [
    { id: 'visitor', name: 'Website Visitor', x: 8, y: 10, status: 'planned', does: 'Asks questions through a customer website.', apis: [], produces: [], consumes: [], owns: '-', deps: ['widget'] },
    { id: 'widget', name: 'Chat Widget (JS embed)', x: 36, y: 10, status: 'planned', does: 'Embeddable JavaScript chat widget for portfolio and company websites.', apis: ['Widget embed script'], produces: [], consumes: [], owns: '-', deps: ['gateway'] },
    { id: 'gateway', name: 'API Gateway', x: 64, y: 10, status: 'planned', core: true, does: 'Checks API keys, domain allowlists and rate limits.', apis: ['POST /api/chat'], produces: [], consumes: [], owns: 'tenant API keys', deps: ['chat', 'kafka'] },
    { id: 'chat', name: 'Chat Service', x: 92, y: 10, status: 'planned', core: true, does: 'Orchestrates tenant-scoped retrieval, guardrails and streamed assistant responses.', apis: ['POST /api/chat'], produces: ['conversation events'], consumes: [], owns: 'conversation context', deps: ['guardrails', 'retriever', 'llm', 'redis', 'postgres', 'analytics'] },
    { id: 'guardrails', name: 'Guardrails', x: 64, y: 30, status: 'planned', does: 'Filters prompt injection attempts and redacts personally identifiable information.', apis: [], produces: [], consumes: [], owns: 'safety policies', deps: [] },
    { id: 'llm', name: 'LLM Provider', x: 92, y: 30, status: 'planned', does: 'Generates grounded answers through Claude or OpenAI.', apis: ['Claude / OpenAI API'], produces: [], consumes: [], owns: '-', deps: [] },
    { id: 'retriever', name: 'Retriever', x: 64, y: 50, status: 'planned', does: 'Retrieves relevant chunks scoped to the active tenant and returns source citations.', apis: [], produces: [], consumes: [], owns: '-', deps: ['vector'] },
    { id: 'vector', name: 'Vector DB (pgvector)', x: 92, y: 50, status: 'planned', core: true, does: 'Stores tenant-scoped document embeddings for semantic search.', apis: [], produces: [], consumes: [], owns: 'document vectors', deps: [] },
    { id: 'redis', name: 'Redis', x: 64, y: 70, status: 'planned', does: 'Caches common responses and tracks rate limits.', apis: [], produces: [], consumes: [], owns: 'cache and counters', deps: [] },
    { id: 'postgres', name: 'PostgreSQL', x: 36, y: 70, status: 'planned', does: 'Stores tenants, conversations, sources and configuration.', apis: [], produces: [], consumes: [], owns: 'tenant and conversation records', deps: [] },
    { id: 'analytics', name: 'Analytics & Audit', x: 36, y: 30, status: 'planned', does: 'Records usage, feedback and auditable assistant activity.', apis: [], produces: [], consumes: ['conversation events'], owns: 'usage and audit records', deps: [] },
    { id: 'admin', name: 'Tenant Admin Dashboard', x: 8, y: 90, status: 'planned', does: 'Lets each tenant manage sources, domains, leads and analytics.', apis: ['Admin APIs'], produces: ['document upload events'], consumes: [], owns: '-', deps: ['gateway', 'kafka'] },
    { id: 'kafka', name: 'Apache Kafka', x: 36, y: 90, status: 'planned', core: true, does: 'Queues document ingestion events for asynchronous processing.', apis: [], produces: [], consumes: ['document upload events'], owns: 'ingestion topics', deps: ['ingestion'] },
    { id: 'ingestion', name: 'Ingestion Service', x: 64, y: 90, status: 'planned', does: 'Parses and chunks tenant documents and URLs before embedding.', apis: [], produces: ['document chunks'], consumes: ['document upload events'], owns: 'ingestion jobs', deps: ['embedding'] },
    { id: 'embedding', name: 'Embedding Model', x: 92, y: 90, status: 'planned', does: 'Converts document chunks into vectors for semantic retrieval.', apis: ['Embedding API'], produces: ['document vectors'], consumes: ['document chunks'], owns: '-', deps: ['vector'] },
  ],
  edges: [
    ['visitor', 'widget'], ['widget', 'gateway'], ['gateway', 'chat'], ['chat', 'guardrails'],
    ['chat', 'retriever'], ['retriever', 'vector'], ['chat', 'llm'], ['chat', 'redis'],
    ['chat', 'postgres'], ['admin', 'gateway'], ['admin', 'kafka'], ['kafka', 'ingestion'],
    ['ingestion', 'embedding'], ['embedding', 'vector'], ['chat', 'analytics'],
  ],
}
const payflow = {
  id: 'payflow', title: 'PayFlow: secure payment gateway',
  nodes: [
    { id:'merchant',name:'Merchant App',x:6,y:45,status:'planned',does:'Creates and manages payment requests.',apis:[],produces:[],consumes:[],owns:'-',deps:['gateway'] },
    { id:'gateway',name:'API Gateway',x:23,y:45,status:'planned',core:true,does:'Authenticates merchant API keys and applies rate limits.',apis:[],produces:[],consumes:[],owns:'merchant keys',deps:['payment'] },
    { id:'payment',name:'Payment Service',x:41,y:45,status:'planned',core:true,does:'Creates, confirms, captures and cancels idempotent payments.',apis:[],produces:['payment events'],consumes:[],owns:'payment state',deps:['redis','postgres','provider','kafka'] },
    { id:'redis',name:'Redis',x:40,y:15,status:'planned',does:'Stores idempotency keys and rate limit counters.',apis:[],produces:[],consumes:[],owns:'keys and counters',deps:[] },
    { id:'postgres',name:'PostgreSQL',x:60,y:15,status:'planned',does:'Stores ACID payment and ledger records.',apis:[],produces:[],consumes:[],owns:'payments and ledger',deps:[] },
    { id:'provider',name:'Payment Provider',x:60,y:40,status:'planned',does:'Processes payments in Razorpay test mode.',apis:[],produces:[],consumes:[],owns:'-',deps:[] },
    { id:'kafka',name:'Apache Kafka',x:60,y:68,status:'planned',core:true,does:'Carries payment events and webhook retry jobs.',apis:[],produces:[],consumes:['payment events'],owns:'event topics',deps:[] },
    { id:'webhook',name:'Webhook Service',x:79,y:18,status:'planned',does:'Signs callbacks with HMAC and retries delivery.',apis:[],produces:[],consumes:[],owns:'delivery attempts',deps:['merchant'] },
    { id:'refund',name:'Refund Service',x:79,y:38,status:'planned',does:'Processes full and partial refunds safely.',apis:[],produces:[],consumes:[],owns:'refund state',deps:['postgres'] },
    { id:'ledger',name:'Ledger & Reconciliation',x:79,y:59,status:'planned',does:'Reconciles payment events against ledger entries.',apis:[],produces:[],consumes:[],owns:'ledger entries',deps:['dashboard'] },
    { id:'notify',name:'Notification Service',x:79,y:80,status:'planned',does:'Sends payment status notifications.',apis:[],produces:[],consumes:[],owns:'-',deps:[] },
    { id:'dashboard',name:'Merchant Dashboard',x:96,y:59,status:'planned',does:'Shows transactions, filters and revenue statistics.',apis:[],produces:[],consumes:[],owns:'-',deps:[] },
  ],
  edges:[['merchant','gateway'],['gateway','payment'],['payment','redis'],['payment','postgres'],['payment','provider'],['payment','kafka'],['kafka','webhook'],['webhook','merchant'],['kafka','refund'],['refund','postgres'],['kafka','ledger'],['ledger','dashboard'],['kafka','notify']],
}
export const diagrams = [samaya, fraud, persona, payflow]
