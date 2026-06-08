import { motion } from 'framer-motion'
import { Cloud, Container, ExternalLink } from 'lucide-react'
import ChipList from '../components/ChipList'
import FlagshipCaseStudy from '../components/FlagshipCaseStudy'
import MotionPage from '../components/MotionPage'
import SectionHeader from '../components/SectionHeader'
import { portfolio } from '../data/portfolio'

const supportingProjects = portfolio.projects.slice(1)
const icons = [Container, Cloud]

const ProjectsPage = () => (
  <MotionPage>
    <section className="page-hero project-hero">
      <SectionHeader
        eyebrow="Projects"
        title="Project work"
        description="Valid project and repository details focused on full-stack development, deployment, and backend practice."
      />
      <div className="project-hero-panel">
        <span>Main project</span>
        <strong>{portfolio.flagship.name}</strong>
        <p>{portfolio.projects[0].description}</p>
      </div>
    </section>

    <FlagshipCaseStudy />

    <section className="content-section">
      <SectionHeader
        eyebrow="Related work"
        title="DevOps and deployment exposure"
        description="Supporting experience connected to build, deployment, Docker, and cloud configuration."
      />
      <div className="supporting-grid">
        {supportingProjects.map((project, index) => {
          const Icon = icons[index] ?? Container

          return (
            <motion.article
              className="supporting-card"
              key={project.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
            >
              <Icon aria-hidden="true" size={28} />
              <span className="project-type">{project.type}</span>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <ul>
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <ChipList items={project.stack} />
            </motion.article>
          )
        })}
      </div>
    </section>

    <section className="content-section">
      <SectionHeader
        eyebrow="GitHub repositories"
        title="Public code samples"
        description="Selected repositories from Santosh's GitHub profile."
      />
      <div className="repo-grid">
        {portfolio.repositories.map((repo, index) => (
          <motion.article
            className="repo-card"
            key={repo.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -6 }}
          >
            <div>
              <span className="project-type">{repo.visibility}</span>
              <h3>{repo.name}</h3>
              <p>{repo.description}</p>
            </div>
            <div className="repo-meta">
              <span>{repo.language}</span>
              <a href={repo.url} target="_blank" rel="noreferrer">
                View repository
                <ExternalLink aria-hidden="true" size={15} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  </MotionPage>
)

export default ProjectsPage
