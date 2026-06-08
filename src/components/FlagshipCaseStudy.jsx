import { motion } from 'framer-motion'
import { ArrowUpRight, Database, KeyRound, Layers3, Server, Workflow } from 'lucide-react'
import { Link } from 'react-router-dom'
import ChipList from './ChipList'
import SectionHeader from './SectionHeader'
import { portfolio } from '../data/portfolio'

const icons = [Layers3, Server, KeyRound, Database, Workflow]

const FlagshipCaseStudy = ({ compact = false }) => {
  const { flagship } = portfolio

  return (
    <section className={compact ? 'content-section flagship compact' : 'content-section flagship'}>
      <SectionHeader
        eyebrow={flagship.label}
        title={flagship.headline}
        description="A concise project view covering purpose, implementation, architecture, and stack."
      />

      <div className="case-study">
        <motion.div className="project-summary-card" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="project-type">Modules</span>
          <h3>{flagship.name}</h3>
          <div className="module-grid">
            {flagship.modules.map((module) => (
              <span key={module}>{module}</span>
            ))}
          </div>
          <ChipList items={portfolio.projects[0].stack.slice(0, 8)} />
        </motion.div>

        <div className="case-copy">
          {[
            ['Problem', flagship.problem],
            ['Solution', flagship.solution],
            ['Outcome', flagship.outcome],
          ].map(([label, text]) => (
            <motion.article className="story-card" whileHover={{ y: -6 }} key={label}>
              <span>{label}</span>
              <p>{text}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="architecture-map">
        {flagship.architecture.map((item, index) => {
          const Icon = icons[index] ?? Layers3

          return (
            <motion.article
              className="architecture-node"
              key={item.layer}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Icon aria-hidden="true" size={20} />
              <span>{item.layer}</span>
              <p>{item.detail}</p>
            </motion.article>
          )
        })}
      </div>

      {!compact && (
        <div className="decision-panel">
          <div>
            <span className="project-type">Technical decisions</span>
            <h3>Engineering choices that make the project feel production-aware</h3>
          </div>
          <ul>
            {flagship.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
          <ChipList items={portfolio.projects[0].stack} />
          <Link className="inline-link" to="/contact">
            Discuss this project
            <ArrowUpRight aria-hidden="true" size={16} />
          </Link>
        </div>
      )}
    </section>
  )
}

export default FlagshipCaseStudy
