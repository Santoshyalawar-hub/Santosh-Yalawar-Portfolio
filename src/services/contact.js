import { profile } from '../data/profile'

export async function sendMessage(payload) {
  // Reserve a tab during the click gesture so popup blockers allow the Gmail fallback.
  const composeWindow = window.open('about:blank', '_blank')

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) throw new Error('SMTP delivery unavailable.')
    const result = await response.json()
    composeWindow?.close()
    return { ...result, method: 'smtp' }
  } catch {
    const { name, email, subject, message } = payload
    const body = `${message}\n\nFrom: ${name} (${email})`
    const params = new URLSearchParams({ view: 'cm', fs: '1', to: profile.email, su: subject, body })
    const gmailCompose = `https://mail.google.com/mail/?${params.toString()}`
    if (composeWindow) composeWindow.location.href = gmailCompose
    else window.location.href = gmailCompose
    return { ok: true, method: 'gmail' }
  }
}
