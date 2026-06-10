/**
 * Server-side handler for the support contact form.
 * Sends an email to the configured support address using nodemailer.
 *
 * Configuration via environment variables:
 *   SUPPORT_EMAIL        - destination address (default: help@lends.market)
 *   SMTP_HOST            - SMTP server host
 *   SMTP_PORT            - SMTP server port (default: 587)
 *   SMTP_USER            - SMTP auth username
 *   SMTP_PASS            - SMTP auth password
 *   SMTP_FROM            - sender address (default: noreply@lends.market)
 */

const nodemailer = require('nodemailer');

const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'help@lends.market';
const SMTP_FROM = process.env.SMTP_FROM || 'noreply@lends.market';

const createTransporter = () => {
  // If SMTP credentials are configured, use them
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: parseInt(process.env.SMTP_PORT || '587', 10) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Fallback: log to console (dev mode / no SMTP configured)
  return null;
};

module.exports = async (req, res) => {
  const { email, message } = req.body || {};

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required.' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address.' });
  }

  if (message.trim().length < 10) {
    return res.status(400).json({ error: 'Message is too short.' });
  }

  const mailOptions = {
    from: SMTP_FROM,
    to: SUPPORT_EMAIL,
    replyTo: email,
    subject: `Lends Support Request from ${email}`,
    text: `You have received a support message via lends.market/support.\n\nFrom: ${email}\n\n---\n\n${message}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ff6600;">New Support Request – Lends</h2>
        <p><strong>From:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr style="border: 1px solid #eee;" />
        <h3>Message:</h3>
        <p style="background: #f9f9f9; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${message}</p>
        <hr style="border: 1px solid #eee;" />
        <p style="color: #999; font-size: 12px;">Sent via lends.market/support</p>
      </div>
    `,
  };

  const transporter = createTransporter();

  if (!transporter) {
    // Dev mode: log and respond success so the form still works locally
    console.log('[Support Email - DEV MODE] Would send:', mailOptions);
    return res.status(200).json({ success: true, dev: true });
  }

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[Support Email] Failed to send:', err);
    return res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
};
