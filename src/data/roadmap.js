// Upcoming / in-flight work. Add an object to show a new "future project" on Home and Projects. Link is optional.
// phase: 'Now' | 'Next' | 'Upskilling'. TODO: adjust titles/text to your real plans.
export const roadmap = [
  { phase: 'Now', title: 'FraudShield', status: 'in-progress', text: 'Applying Kafka, event-driven design and microservices on a professional project.', tags: ['Kafka', 'Microservices', 'PostgreSQL', 'Redis'], link: '/projects/fraudshield' },
  { phase: 'Next', title: 'PersonaAI', status: 'planned', text: "Embeddable AI assistant for any portfolio or company website, answering only from the owner's own data using RAG.", tags: ['Spring Boot', 'Spring AI', 'pgvector', 'Redis', 'Kafka', 'LLM'], link: '/projects/personaai' },
  { phase: 'Next', title: 'MedCore backend', status: 'planned', text: 'Spring Boot APIs, authentication and persistence behind the existing hospital UI.', tags: ['Spring Boot', 'MySQL', 'JWT'], link: '/projects/medcore' },
  { phase: 'Upskilling', title: 'Observability', status: 'planned', text: 'Metrics, dashboards and structured logging for backend services.', tags: ['Prometheus', 'Grafana', 'Logback'] },
]
