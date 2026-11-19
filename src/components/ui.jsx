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
    <div className={`thumb thumb-${p.id}`} style={{ '--h': h }} aria-hidden="true">
      <div className="thumb-chrome"><span className="thumb-lights"><i /><i /><i /></span><span>{p.subtitle}</span><b>↗</b></div>
      <div className="thumb-art">
        {p.id === 'samayahr' && <><div className="art-sidebar"><i /><i /><i /><i /></div><div className="art-dashboard"><small>PEOPLE OVERVIEW</small><strong>Team dashboard</strong><div className="art-metrics"><i><b>248</b><small>Employees</small></i><i><b>12</b><small>On leave</small></i></div><div className="art-bars"><i /><i /><i /><i /><i /><i /><i /></div></div></>}
        {p.id === 'fraudshield' && <><div className="art-orb"><i /><i /><i /></div><div className="art-feed"><small>TRANSACTION STREAM</small><i><b>₹ 24,500</b><em>ALLOW</em></i><i><b>₹ 8,200</b><em>REVIEW</em></i><i><b>₹ 1,840</b><em>ALLOW</em></i></div></>}
        {p.id === 'medcore' && <><div className="art-patient"><i className="art-avatar">+</i><small>PATIENT OVERVIEW</small><strong>Health dashboard</strong><div className="art-vitals"><i><b>98.6°</b><small>Temperature</small></i><i><b>72 bpm</b><small>Heart rate</small></i></div></div><div className="art-pulse"><i /><i /><i /><i /><i /><i /><i /></div></>}
        {p.id === 'nexora' && <><div className="art-network"><i className="art-node">SY</i><i className="art-node">JD</i><i className="art-node">AK</i><i className="art-node">+</i><svg viewBox="0 0 240 100"><path d="M35 50 108 24 195 46M35 50 115 78 195 46" /></svg></div><div className="art-community"><small>BUILD TOGETHER</small><strong>Ideas become impact.</strong><span>12 contributors online</span></div></>}
        {!['samayahr', 'fraudshield', 'medcore', 'nexora'].includes(p.id) && <><div className="art-orb"><i /><i /><i /></div><div className="art-feed"><small>PROJECT OVERVIEW</small><strong>{p.name}</strong><i><b>{p.stack[0]}</b><em>ACTIVE</em></i><i><b>{p.stack[1]}</b><em>READY</em></i></div></>}
      </div>
      <div className="thumb-footer"><span className="thumb-name">{p.name}</span><span>{p.stack.slice(0, 2).join(' · ')}</span></div>
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
