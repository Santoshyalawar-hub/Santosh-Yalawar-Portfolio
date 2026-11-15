import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll } from 'framer-motion'
import { roadmap } from '../data/roadmap'
import { Badge, Chips, Tilt, Reveal } from './ui'
export default function Roadmap() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  return (
    <div className="road" ref={ref}>
      <div className="road-line"><motion.i style={{ scaleY: scrollYProgress }} /></div>
      {roadmap.map((r, i) => (
        <Reveal key={r.title} delay={i * 0.08} className="road-item">
          <span className="road-dot" /><span className="eyebrow">{r.phase}</span>
          <Tilt as={r.link ? Link : 'div'} {...(r.link ? { to: r.link } : {})}>
            <div className="row"><h3>{r.title}</h3><Badge status={r.status} /></div><p>{r.text}</p><div style={{ marginTop: 12 }}><Chips items={r.tags} /></div>
          </Tilt>
        </Reveal>
      ))}
    </div>
  )
}
