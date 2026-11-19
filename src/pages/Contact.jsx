import { useState } from 'react'
import { Mail, Copy } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, socialLinks } from '../data/profile'
import { sendMessage } from '../services/contact'
import { Head, Tilt } from '../components/ui'
const validate = (v) => {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your name.'
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email.'
  if (v.subject.trim().length < 3) e.subject = 'Enter a subject.'
  if (v.message.trim().length < 10) e.message = 'Message must be at least 10 characters.'
  return e
}
export default function Contact() {
  const [v, setV] = useState({ name: '', email: '', subject: '', message: '' })
  const [err, setErr] = useState({}), [state, setState] = useState('')
  const [toast, setToast] = useState('')
  const copy = async () => { try { await navigator.clipboard.writeText(profile.email); setToast('Email copied') } catch { setToast('Copy failed') } setTimeout(() => setToast(''), 2000) }
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value })
  const submit = async (ev) => {
    ev.preventDefault(); const e = validate(v); setErr(e); if (Object.keys(e).length) return
    try { await sendMessage(v); setState('ok') } catch { setState('fail') }
  }
  const F = ({ k, label, area }) => { const T = area ? 'textarea' : 'input'; return <label>{label}<T value={v[k]} onChange={set(k)} rows={5} type={k === 'email' ? 'email' : 'text'} aria-invalid={!!err[k]} />{err[k] && <span className="err" role="alert">{err[k]}</span>}</label> }
  return (<div className="wrap page">
    <Head eyebrow="Contact" title="Let's talk" text="Send a message or reach out directly." />
    <div className="two">
      <Tilt><form onSubmit={submit} noValidate>{F({ k: 'name', label: 'Name' })}{F({ k: 'email', label: 'Email' })}{F({ k: 'subject', label: 'Subject' })}{F({ k: 'message', label: 'Message', area: true })}
        <button className="btn p" type="submit"><Mail size={16} />Send message</button>
        {state === 'ok' && <p className="ok" role="status">Message sent successfully. Thank you for reaching out.</p>}{state === 'fail' && <p className="err" role="alert">Could not send your message. Please email me directly.</p>}</form></Tilt>
      <Tilt className="stack"><h3>Direct</h3><a href={`mailto:${profile.email}`}>{profile.email}</a><button className="btn" type="button" onClick={copy}><Copy size={14} />Copy email</button><p>{profile.location}</p>{socialLinks.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label} ↗</a>)}</Tilt>
    </div>
    <AnimatePresence>{toast && <motion.div className="toast" role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{toast}</motion.div>}</AnimatePresence>
  </div>)
}
