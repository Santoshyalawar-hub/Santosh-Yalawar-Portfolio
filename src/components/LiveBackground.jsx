import { useEffect, useRef } from 'react'
// Live "video-like" background: connected node network + falling code. Pauses when tab is hidden; off for reduced motion.
const CH = '{}();<>/=+01JavaSpringKafkaReact'
export default function LiveBackground({ dark, strength = 1 }) {
  const ref = useRef(null)
  useEffect(() => {
    const c = ref.current
    if (!c || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = c.getContext('2d'), d = Math.min(devicePixelRatio || 1, 1.5), small = innerWidth < 700
    let w, h, raf, pts, cols, mx = -999, my = -999; const packets = []
    const [r, g, b] = dark ? [45, 212, 191] : [13, 148, 136], [r2, g2, b2] = dark ? [129, 140, 248] : [99, 102, 241]
    const init = () => {
      w = c.width = innerWidth * d; h = c.height = innerHeight * d
      pts = Array.from({ length: small ? 32 : 75 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .5 * d, vy: (Math.random() - .5) * .5 * d }))
      cols = Array.from({ length: Math.floor(w / (28 * d)) }, () => Math.random() * h)
    }
    const frame = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.font = `${13 * d}px monospace`
      cols.forEach((y, i) => { ctx.fillStyle = `rgba(${r},${g},${b},${dark ? .16 : .1})`; ctx.fillText(CH[(Math.random() * CH.length) | 0], i * 28 * d, y); cols[i] = y > h + 40 || Math.random() > .995 ? 0 : y + 2.2 * d })
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.beginPath(); ctx.arc(p.x, p.y, 2 * d, 0, 7); ctx.fillStyle = `rgba(${r2},${g2},${b2},.8)`; ctx.fill()
        for (let j = i + 1; j < pts.length; j++) { const q = pts[j], dist = Math.hypot(p.x - q.x, p.y - q.y); if (dist < 150 * d) { ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - dist / (150 * d)) * .35})`; ctx.lineWidth = d; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke() } }
        const md = Math.hypot(p.x - mx, p.y - my); if (md < 190 * d) { ctx.strokeStyle = `rgba(${r2},${g2},${b2},${(1 - md / (190 * d)) * .6})`; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my); ctx.stroke() }
      })
      if (packets.length < 6 && Math.random() < .04) { const a = pts[(Math.random() * pts.length) | 0], q = pts[(Math.random() * pts.length) | 0]; if (a !== q && Math.hypot(a.x - q.x, a.y - q.y) < 150 * d) packets.push({ a, q, t: 0 }) }
      for (let k = packets.length - 1; k >= 0; k--) { const k2 = packets[k]; k2.t += .03; if (k2.t >= 1) { packets.splice(k, 1); continue } const x = k2.a.x + (k2.q.x - k2.a.x) * k2.t, y = k2.a.y + (k2.q.y - k2.a.y) * k2.t; ctx.beginPath(); ctx.arc(x, y, 3 * d, 0, 7); ctx.fillStyle = `rgba(${r},${g},${b},1)`; ctx.shadowBlur = 12 * d; ctx.shadowColor = `rgb(${r},${g},${b})`; ctx.fill(); ctx.shadowBlur = 0 }
      raf = requestAnimationFrame(frame)
    }
    const mv = (e) => { mx = e.clientX * d; my = e.clientY * d }
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden) frame() }
    init(); frame()
    addEventListener('resize', init); addEventListener('mousemove', mv); document.addEventListener('visibilitychange', vis)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', init); removeEventListener('mousemove', mv); document.removeEventListener('visibilitychange', vis) }
  }, [dark])
  return <canvas ref={ref} className="live-bg" style={{ opacity: strength }} aria-hidden="true" />
}
