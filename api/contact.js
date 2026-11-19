import nodemailer from 'nodemailer'

const sendJson = (res, status, body) => res.status(status).json(body)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return sendJson(res, 405, { error: 'Method not allowed.' })
  }

  const { name, email, subject, message } = req.body || {}
  if (
    typeof name !== 'string' || name.trim().length < 2 || name.length > 100 ||
    typeof email !== 'string' || email.length > 254 || !/^\S+@\S+\.\S+$/.test(email) ||
    typeof subject !== 'string' || subject.trim().length < 3 || subject.length > 160 ||
    typeof message !== 'string' || message.trim().length < 10 || message.length > 10000
  ) {
    return sendJson(res, 400, { error: 'Please check the form fields and try again.' })
  }

  const { SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env
  if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error('Contact form is missing SMTP_USER, SMTP_PASS, or CONTACT_TO.')
    return sendJson(res, 503, { error: 'The contact form is not configured yet.' })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })

    await transporter.sendMail({
      from: `Portfolio Contact <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: email.trim(),
      subject: `Portfolio: ${subject.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`,
    })

    return sendJson(res, 200, { ok: true })
  } catch (error) {
    console.error('Contact email delivery failed:', error)
    return sendJson(res, 502, { error: 'Message delivery failed. Please email me directly.' })
  }
}
