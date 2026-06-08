import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import MotionPage from '../components/MotionPage'
import SectionHeader from '../components/SectionHeader'
import { portfolio } from '../data/portfolio'

const HomePage = () => {
  const { person, hero, stats, homeOverview, projectTeaser, conversion } = portfolio
  const initials = person.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <MotionPage>
      <section className="hero-section professional-hero">
        <div className="hero-content">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {hero.eyebrow}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            {hero.title}
          </motion.h1>
          <motion.p className="hero-summary" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
            {hero.summary}
          </motion.p>
          <div className="hero-actions">
            <a className="primary-action" href={`mailto:${person.email}`}>
              <Mail aria-hidden="true" size={18} />
              Contact for job opportunity
            </a>
            <Link className="secondary-action" to="/projects">
              View main project
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>

        <aside className="hero-visual-card" aria-label="Full stack development overview">
          <img className="hero-workspace-image" src={hero.imageUrl} alt="Developer coding on a laptop" loading="eager" />
          <div className="hero-visual-overlay">
            <div className="profile-mini">
              <div className="profile-photo-box">
                {person.photoUrl ? (
                  <img src={person.photoUrl} alt={`${person.name} profile`} />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <div>
                <span className="project-type">Candidate profile</span>
                <strong>{person.name}</strong>
                <p>{person.specialty}</p>
              </div>
            </div>
            <div className="hero-flow">
              {hero.flow.map((item) => (
                <article key={item.title}>
                  <span>{item.title}</span>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="stats-grid" aria-label="Career stats">
        {stats.map((stat, index) => (
          <motion.div
            className="stat"
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
          >
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </motion.div>
        ))}
      </section>

      <section className="content-section">
        <SectionHeader
          eyebrow="Portfolio overview"
          title="What this portfolio represents"
          description="A concise view of the skills and real project exposure relevant for full-stack developer opportunities."
        />
        <div className="proof-grid">
          {homeOverview.map((item, index) => (
            <motion.article
              className="proof-card"
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -6 }}
            >
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="content-section home-project-teaser">
        <div>
          <span className="project-type">Project preview</span>
          <h2>{projectTeaser.title}</h2>
          <p>{projectTeaser.text}</p>
        </div>
        <Link className="secondary-action" to="/projects">
          {projectTeaser.linkText}
          <ArrowRight aria-hidden="true" size={18} />
        </Link>
      </section>

      <section className="content-section conversion-section">
        <SectionHeader
          eyebrow="Job readiness"
          title="Why this profile is relevant for full-stack roles"
          description="Clear, realistic signals for entry-level or junior full-stack developer opportunities."
        />
        <div className="conversion-grid">
          {conversion.map((item) => (
            <motion.article className="conversion-card" whileHover={{ y: -5 }} key={item}>
              {item}
            </motion.article>
          ))}
        </div>
      </section>
    </MotionPage>
  )
}

export default HomePage
