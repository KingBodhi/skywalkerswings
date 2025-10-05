import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import * as bcrypt from "bcryptjs";
import { setSession } from "@/lib/auth";
import { withRateLimit } from '@/lib/with-rate-limit';
import { withValidation } from '@/lib/validate';
import { LoginSchema } from '@/lib/schemas';
import { logAuthEvent, loggers } from '@/lib/logger';

async function handleLogin(req: NextRequest & { validated: any }) {
  const { email, password } = req.validated;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      logAuthEvent('login_failed', null, email, req);
      return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok) {
      logAuthEvent('login_failed', user.id, email, req);
      return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }

    await setSession({ userId: user.id, role: (user.role as any) || "EDITOR", email: user.email });
    logAuthEvent('login_success', user.id, email, req);

    loggers.auth.info({
      userId: user.id,
      email: user.email,
      role: user.role,
      ip: req.headers.get('x-forwarded-for') || 'unknown'
    }, 'User login successful');

    return NextResponse.json({ ok: true });
  } catch (error) {
    loggers.auth.error({ error: error instanceof Error ? error.message : 'Unknown error', email }, 'Login error');
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

// Apply validation and rate limiting to login endpoint
const validatedHandler = withValidation(LoginSchema, 'body')(handleLogin);
const rateLimitedLogin = withRateLimit({
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many login attempts. Please try again in 15 minutes.'
})(validatedHandler);

export const POST = rateLimitedLogin;
