import { motion } from 'framer-motion'

const MotionPage = ({ children, className = '' }) => (
  <motion.div
    className={`page ${className}`}
    initial={{ opacity: 0, y: 22, filter: 'blur(10px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -14, filter: 'blur(8px)' }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
)

export default MotionPage
