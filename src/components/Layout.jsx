import { useEffect, useState } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import LiveBackground from './LiveBackground'
import CommandPalette from './CommandPalette'
import { Menu, Search, Home, FolderKanban, Cpu, Network, Mail, Moon, Sun, X, ArrowUp } from 'lucide-react'
import { profile, socialLinks, nav } from '../data/profile'
import { useTheme } from '../hooks/useTheme'
const items = nav.map(([id, label]) => [id === 'home' ? '/' : `/${id}`, label])
export default function Layout() {
  const [theme, toggle] = useTheme()
  const [open, setOpen] = useState(false)
  const [cmd, setCmd] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  useEffect(() => { const f = () => setScrolled(scrollY > 24); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f) }, [])
  useEffect(() => { const k = (e) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setCmd((v) => !v) } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k) }, [])
  useEffect(() => { const m = (e) => { document.documentElement.style.setProperty('--mx', e.clientX + 'px'); document.documentElement.style.setProperty('--my', e.clientY + 'px') }; addEventListener('mousemove', m); return () => removeEventListener('mousemove', m) }, [])
  return (<>
    <LiveBackground dark={theme === 'dark'} strength={pathname === '/' ? 1 : 0.4} /><CommandPalette open={cmd} setOpen={setCmd} /><div className="spot" aria-hidden="true" /><motion.div className="progress" style={{ scaleX: bar }} />
    <a className="sr" href="#main">Skip to content</a>
    <header className={`nav ${scrolled ? 'shrunk' : ''}`}><div className="wrap">
      <Link className="brand" to="/">{profile.name}<small>{profile.role}</small></Link>
      <nav className={`links ${open ? 'open' : ''}`} aria-label="Main" onClick={() => setOpen(false)}>
        {items.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>{({ isActive }) => <>{isActive && <motion.span layoutId="pill" className="pill-bg" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}<span>{label}</span></>}</NavLink>)}
      </nav>
      <button className="btn cmdbtn" onClick={() => setCmd(true)} aria-label="Open quick navigation"><Search size={14} />Search<kbd>Ctrl K</kbd></button>
      <button className="ib" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
      <button className="ib burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? <X size={18} /> : <Menu size={18} />}</button>
    </div></header>
    <main id="main"><motion.div key={pathname} initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: .5 }}><Outlet context={{ theme }} /></motion.div></main>
    <nav className="bottom" aria-label="Quick navigation">{[['/', Home, 'Home'], ['/projects', FolderKanban, 'Projects'], ['/skills', Cpu, 'Skills'], ['/architecture', Network, 'Design'], ['/contact', Mail, 'Contact']].map(([to, I, l]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'on' : '')}><I size={20} /><span>{l}</span></NavLink>)}</nav>
    <footer className="foot"><div className="wrap">
      <div><strong>{profile.name}</strong><p>{profile.role}</p><small>© {new Date().getFullYear()} {profile.name}</small></div>
      <nav aria-label="Footer">{items.map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}</nav>
      <nav aria-label="Social">{socialLinks.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}</nav>
      <button className="btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowUp size={16} />Top</button>
    </div></footer>
  </>)
}
