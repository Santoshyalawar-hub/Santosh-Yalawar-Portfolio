import { motion } from 'framer-motion'
import { CheckCircle2, Terminal } from 'lucide-react'
import MotionPage from '../components/MotionPage'
import SectionHeader from '../components/SectionHeader'
import { portfolio } from '../data/portfolio'

const ExperiencePage = () => {
  const { experience, journey, workflows } = portfolio

  return (
    <MotionPage>
      <section className="page-hero experience-hero">
        <SectionHeader
          eyebrow="Professional experience"
          title="Two years of focused Java full-stack project delivery"
          description="Focused on building, integrating, deploying, and debugging a real HRMS platform with Java, Spring Boot, React, MySQL, and production-style workflows."
        />
        <div className="terminal-card" aria-label="Delivery signals">
          {['git push origin main', 'docker compose up', 'jwt token verified', 'cors policy resolved', 'deployment health checked'].map((line) => (
            <span key={line}>
              <Terminal aria-hidden="true" size={14} />
              {line}
            </span>
          ))}
        </div>
      </section>

      <section className="content-section split">
        <SectionHeader
          eyebrow={experience.meta}
          title={experience.title}
          description="The responsibilities below show practical readiness for junior Java full-stack developer roles."
        />
        <ul className="check-list feature-list">
          {experience.responsibilities.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <CheckCircle2 aria-hidden="true" size={18} />
              <span>{item}</span>
            </motion.li>
          ))}
        </ul>
      </section>

      <section className="content-section">
        <SectionHeader
          eyebrow="Engineering workflow"
          title="How I move work from code to deployment"
          description="A compact delivery model showing API, UI, pipeline, and cloud thinking."
        />
        <div className="workflow-strip">
          {workflows.map((workflow) => (
            <motion.article className="workflow-card" whileHover={{ y: -8 }} key={workflow.label}>
              <span>{workflow.label}</span>
              <p>{workflow.value}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section split">
        <SectionHeader
          eyebrow="Career journey"
          title="From fundamentals to production debugging"
          description="The timeline shows growth across backend, security, cloud, and deployment workflows."
        />
        <ol className="timeline">
          {journey.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
            >
              {item}
            </motion.li>
          ))}
        </ol>
      </section>
    </MotionPage>
  )
}

export default ExperiencePage
