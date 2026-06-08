import { motion } from 'framer-motion'
import { Code2, Mail, MapPin, Network, Send } from 'lucide-react'
import MotionPage from '../components/MotionPage'
import SectionHeader from '../components/SectionHeader'
import { portfolio } from '../data/portfolio'

const ContactPage = () => {
  const { person, conversion } = portfolio

  return (
    <MotionPage>
      <section className="page-hero contact-hero">
        <SectionHeader
          eyebrow="Contact"
          title="Let us talk about full-stack engineering roles"
          description={`${person.name} brings Java, Spring Boot, React, DevOps awareness, and production debugging experience into software engineering interviews.`}
        />
        <motion.div className="contact-card" whileHover={{ y: -8 }}>
          <a href={`mailto:${person.email}`}>
            <Mail aria-hidden="true" size={18} />
            {person.email}
          </a>
          <span>
            <MapPin aria-hidden="true" size={18} />
            {person.location}
          </span>
          <a href={person.githubUrl} target="_blank" rel="noreferrer">
            <Code2 aria-hidden="true" size={18} />
            GitHub
          </a>
          <a href={person.linkedinUrl} target="_blank" rel="noreferrer">
            <Network aria-hidden="true" size={18} />
            LinkedIn
          </a>
        </motion.div>
      </section>

      <section className="content-section contact-grid">
        <div>
          <SectionHeader
            eyebrow="Interview fit"
            title="What a recruiter can verify quickly"
            description="The portfolio is designed to make these signals clear without forcing someone to dig."
          />
          <div className="conversion-grid">
            {conversion.map((item) => (
              <article className="conversion-card" key={item}>
                {item}
              </article>
            ))}
          </div>
        </div>

        <form className="contact-form" action={`mailto:${person.email}`} method="post" encType="text/plain">
          <label>
            Name
            <input name="name" placeholder="Recruiter or company name" />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" placeholder="Role, interview details, or project discussion" />
          </label>
          <button type="submit">
            <Send aria-hidden="true" size={18} />
            Send inquiry
          </button>
        </form>
      </section>
    </MotionPage>
  )
}

export default ContactPage
