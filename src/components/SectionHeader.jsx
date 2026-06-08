import { motion } from 'framer-motion'

const SectionHeader = ({ eyebrow, title, description }) => (
  <motion.div
    className="section-header"
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.55, ease: 'easeOut' }}
  >
    <span>{eyebrow}</span>
    <h2>{title}</h2>
    {description && <p>{description}</p>}
  </motion.div>
)

export default SectionHeader
