import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { withRateLimit } from '@/lib/with-rate-limit';
import { withValidation } from '@/lib/validate';
import { ContactSchema } from '@/lib/schemas';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function handleContact(req: NextRequest & { validated: any }) {
  try {
    const { name, email, company, message } = req.validated;

    // Send email
    await transporter.sendMail({
      from: `"SkyFox Swings" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `New Contact: ${name}${company ? ` - ${company}` : ''}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    const { loggers } = await import('@/lib/logger');
    loggers.contact.info({
      name,
      email,
      company: company || undefined,
      ip: req.headers.get('x-forwarded-for') || 'unknown'
    }, 'Contact form submitted successfully');

    return NextResponse.json({ ok: true });
  } catch (error) {
    const { loggers } = await import('@/lib/logger');
    loggers.contact.error({
      error: error instanceof Error ? error.message : 'Unknown error',
      email: req.validated?.email,
      ip: req.headers.get('x-forwarded-for') || 'unknown'
    }, 'Contact form submission failed');
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

// Apply validation and rate limiting to contact endpoint
const validatedHandler = withValidation(ContactSchema, 'body')(handleContact);
const rateLimitedContact = withRateLimit({
  maxRequests: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many contact form submissions. Please try again in 1 hour.'
})(validatedHandler);

export const POST = rateLimitedContact;
export const runtime = 'nodejs';