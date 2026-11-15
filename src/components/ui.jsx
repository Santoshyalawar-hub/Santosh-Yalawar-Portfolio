import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
export const Head = ({ eyebrow, title, text }) => (
  <motion.div className="head" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
    <span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}
  </motion.div>
)
export const Badge = ({ status }) => <span className={`badge b-${status}`}>{status.replace('-', ' ')}</span>
export const Chips = ({ items }) => <div className="chips">{items.map((t) => <span className="chip" key={t}>{t}</span>)}</div>
export const Tilt = ({ children, className = '', as: T = 'div', ...rest }) => {
  const ref = useRef(null)
  const move = (e) => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.setProperty('--sx', `${e.clientX - r.left}px`); ref.current.style.setProperty('--sy', `${e.clientY - r.top}px`)
    ref.current.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(6px)`
  }
  return <T ref={ref} className={`glass tilt ${className}`} onMouseMove={move} onMouseLeave={() => { ref.current.style.transform = '' }} {...rest}>{children}</T>
}

// Generated project thumbnail: hue from id, floating stack labels, animated sheen.
export const Thumb = ({ p }) => {
  const h = [...p.id].reduce((a, c) => a + c.charCodeAt(0), 0) % 360
  return (
    <div className="thumb" style={{ '--h': h }} aria-hidden="true">
      <span className="thumb-name">{p.name}</span>
      {p.stack.slice(0, 4).map((t, i) => <em key={t} style={{ '--i': i }}>{t}</em>)}
    </div>
  )
}

export const CountUp = ({ to }) => {
  const [v, setV] = useState(0)
  useEffect(() => {
    let raf, t0
    const step = (t) => { t0 ??= t; const k = Math.min((t - t0) / 900, 1); setV(Math.round(to * (1 - (1 - k) ** 3))); if (k < 1) raf = requestAnimationFrame(step) }
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf)
  }, [to])
  return <>{v}</>
}
export const Ring = ({ done, total }) => (
  <div className="ring" role="img" aria-label={`${done} of ${total} features implemented`}>
    <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18" pathLength="100" className="r-bg" />
      <motion.circle cx="22" cy="22" r="18" pathLength="100" className="r-fg" initial={{ strokeDashoffset: 100 }} animate={{ strokeDashoffset: 100 - (done / total) * 100 }} transition={{ duration: 1.1, ease: 'easeOut' }} /></svg>
    <strong>{done}/{total}</strong><small>implemented</small>
  </div>
)
const BR = { Java: '#e76f00', 'Spring Boot': '#6db33f', React: '#22b8d6', MySQL: '#4479a1', Docker: '#2496ed', 'Apache Kafka': '#9aa4b2', Redis: '#dc382d', PostgreSQL: '#336791', JavaScript: '#f7df1e', GCP: '#4285f4', Vercel: '#888', Railway: '#a855f7' }
export const Logo = ({ name }) => {
  const c = BR[name] ?? '#64748b', t = name.split(/[\s/]+/).map((w) => w[0]).join('').slice(0, 2)
  return <span className="logo" style={{ '--c': c }} aria-hidden="true">{t}</span>
}

export const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: .6, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>
)
export const Skeleton = () => <div className="wrap page" aria-busy="true"><div className="skel" style={{ height: 22, width: 120 }} /><div className="skel" style={{ height: 48, width: '50%', margin: '16px 0' }} /><div className="grid">{[0, 1, 2].map((i) => <div key={i} className="skel" style={{ height: 180 }} />)}</div></div>
