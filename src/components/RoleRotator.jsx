import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const RoleRotator = ({ roles }) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % roles.length)
    }, 2200)

    return () => window.clearInterval(timer)
  }, [roles.length])

  return (
    <span className="role-rotator" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default RoleRotator
