import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email,.company, message } = body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return new Response('Missing required fields', { status: 400 });
    }

    // Send email
    await transporter.sendMail({
      from: `"SkyFox Swings" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Contact: ${name}$.company ? ` - $.company}` : ''}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        $.company ? `<p><strong>Company:</strong> $.company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response('Failed to send message', { status: 500 });
  }
}

export const runtime = 'nodejs';