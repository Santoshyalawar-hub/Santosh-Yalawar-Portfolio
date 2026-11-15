import { profile } from '../data/profile'
// Swap this body for fetch('/api/contact') or an email service later. Never put secrets in frontend code.
export async function sendMessage({ name, email, subject, message }) {
  const body = encodeURIComponent(`${message}\n\n- ${name} (${email})`)
  window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${body}`
  return { ok: true }
}
