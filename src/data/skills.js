// u(name, projectIds) = used in shipped work; l(...) = upskilled (applied in an in-progress project).
// `proof` powers the evidence matrix on the Skills page. No percentages anywhere.
const u = (name, proof = []) => ({ name, level: 'used', proof })
const l = (name, proof = []) => ({ name, level: 'upskilled', proof })
export const skillCategories = [
  { id: 'lang', title: 'Languages', items: [u('Java', ['samayahr', 'fraudshield', 'nexora']), u('JavaScript', ['samayahr', 'medcore']), l('SQL', ['samayahr'])] },
  { id: 'backend', title: 'Backend', items: [u('Spring Boot', ['samayahr', 'fraudshield', 'nexora']), u('Spring Security', ['samayahr']), u('Hibernate / JPA', ['samayahr']), u('REST APIs', ['samayahr', 'nexora']), u('JWT', ['samayahr', 'fraudshield']), l('Microservices', ['fraudshield'])] },
  { id: 'messaging', title: 'Messaging', items: [l('Apache Kafka', ['fraudshield']), l('Event-driven architecture', ['fraudshield'])] },
  { id: 'data', title: 'Databases', items: [u('MySQL', ['samayahr', 'nexora']), l('PostgreSQL', ['fraudshield']), l('Redis', ['fraudshield'])] },
  { id: 'obs', title: 'Observability', items: [l('Prometheus'), l('Grafana'), l('SLF4J / Logback')] },
  { id: 'devops', title: 'DevOps & Cloud', items: [u('Docker', ['samayahr', 'fraudshield']), u('Docker Compose', ['samayahr']), u('GitHub Actions', ['samayahr']), u('GCP', ['samayahr']), u('Railway', ['samayahr']), u('Vercel', ['samayahr'])] },
  { id: 'tools', title: 'Frontend & Tools', items: [u('React', ['samayahr', 'medcore', 'nexora']), u('Vite', ['samayahr', 'medcore']), u('Axios', ['samayahr']), u('React Router', ['samayahr']), u('Git & GitHub', ['samayahr', 'nexora']), u('Postman', ['samayahr'])] },
]
// Interactive stack map (x,y in %). `skill` links a node to the matrix/proof data.
export const techMap = {
  nodes: [
    { id: 'react', name: 'React + Vite', skill: 'React', x: 8, y: 30, status: 'used', does: 'Role-aware UI and protected routes.' },
    { id: 'axios', name: 'Axios', skill: 'Axios', x: 8, y: 72, status: 'used', does: 'API client with auth headers.' },
    { id: 'sec', name: 'Spring Security + JWT', skill: 'Spring Security', x: 32, y: 50, status: 'used', does: 'Stateless auth, roles and CORS.' },
    { id: 'boot', name: 'Spring Boot REST', skill: 'Spring Boot', x: 54, y: 50, status: 'used', does: 'Controllers and service layer.' },
    { id: 'jpa', name: 'Hibernate / JPA', skill: 'Hibernate / JPA', x: 76, y: 24, status: 'used', does: 'Entities and repositories.' },
    { id: 'mysql', name: 'MySQL', skill: 'MySQL', x: 94, y: 24, status: 'used', does: 'Relational, tenant-aware data.' },
    { id: 'kafka', name: 'Apache Kafka', skill: 'Apache Kafka', x: 76, y: 76, status: 'upskilled', does: 'Event streaming between services.' },
    { id: 'redis', name: 'Redis', skill: 'Redis', x: 94, y: 76, status: 'upskilled', does: 'Caching and idempotency keys.' },
    { id: 'docker', name: 'Docker', skill: 'Docker', x: 54, y: 90, status: 'used', does: 'Containerised services.' },
    { id: 'cloud', name: 'Railway / Vercel / GCP', skill: 'GCP', x: 32, y: 90, status: 'used', does: 'Cloud deployment and env config.' },
  ],
  edges: [['react', 'axios'], ['axios', 'sec'], ['sec', 'boot'], ['boot', 'jpa'], ['jpa', 'mysql'], ['boot', 'kafka'], ['kafka', 'redis'], ['boot', 'docker'], ['docker', 'cloud']],
}
