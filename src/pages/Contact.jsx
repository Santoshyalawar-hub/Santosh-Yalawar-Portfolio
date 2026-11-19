import { useState } from 'react'
import { Mail, Copy } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, socialLinks } from '../data/profile'
import { Head, Tilt } from '../components/ui'

export default function Contact() {
  const [toast, setToast] = useState('')
  const gmailHref = `https://mail.google.com/mail/?${new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: profile.email,
    su: "Let's connect",
    body: `Hi ${profile.name},\n\nI'd like to connect with you.`,
  })}`
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setToast('Email copied') }
    catch { setToast('Copy failed') }
    setTimeout(() => setToast(''), 2000)
  }

  return (<div className="wrap page">
    <Head eyebrow="Contact" title="Let's connect" text="Have an opportunity or want to connect? Send me an email directly." />
    <Tilt className="contact-card contact-card-single">
      <section className="contact-profile" aria-label="Contact details">
        <div className="contact-avatar" aria-hidden="true"><span>SY</span><i /></div>
        <span className="eyebrow">JAVA FULL STACK DEVELOPER</span>
        <h3>{profile.name}</h3>
        <p>Open to Java full stack opportunities</p>
        <a href={gmailHref} target="_blank" rel="noreferrer" className="gmail-link"><Mail size={18} /><strong>Send a connection email</strong><span>Opens Gmail addressed to {profile.email}</span></a>
        <button className="btn copy-email" type="button" onClick={copy}><Copy size={14} />Copy email</button>
        <div className="contact-socials">{socialLinks.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label} ↗</a>)}</div>
      </section>
    </Tilt>
    <AnimatePresence>{toast && <motion.div className="toast" role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{toast}</motion.div>}</AnimatePresence>
  </div>)
}
