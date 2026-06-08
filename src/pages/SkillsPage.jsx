import { motion } from 'framer-motion'
import ChipList from '../components/ChipList'
import MotionPage from '../components/MotionPage'
import SectionHeader from '../components/SectionHeader'
import { portfolio } from '../data/portfolio'

const capabilityCopy = {
  Frontend: 'Builds responsive React interfaces, integrates APIs through Axios, and structures navigation with React Router.',
  Backend: 'Creates Spring Boot APIs with authentication, authorization, service-layer logic, and database integration.',
  Database: 'Works with MySQL-backed application data and JPA/Hibernate persistence patterns.',
  'DevOps / Tools': 'Uses Docker, Docker Compose, GitHub, CI/CD workflows, and Postman to support delivery and debugging.',
  Cloud: 'Understands practical cloud deployment across GCP, Railway, and Vercel with environment configuration.',
}

const SkillsPage = () => (
  <MotionPage>
    <section className="page-hero">
      <SectionHeader
        eyebrow="Technical expertise"
        title="A capability map for production-style full-stack work"
        description="Skills are presented as practical engineering capabilities, not a disconnected keyword list."
      />
    </section>

    <section className="content-section skill-dashboard">
      {portfolio.skillGroups.map((group, index) => (
        <motion.article
          className="skill-card"
          key={group.title}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ y: -8 }}
        >
          <div className="skill-meter" aria-hidden="true">
            <span style={{ '--meter': `${74 + index * 4}%` }} />
          </div>
          <h3>{group.title}</h3>
          <p>{capabilityCopy[group.title]}</p>
          <ChipList items={group.skills} />
        </motion.article>
      ))}
    </section>
  </MotionPage>
)

export default SkillsPage
