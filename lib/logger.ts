import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  redact: {
    paths: [
      'password',
      'token',
      'secret',
      'authorization',
      'cookie',
      'req.headers.authorization',
      'req.headers.cookie',
      'res.headers["set-cookie"]'
    ],
    remove: true
  },
  formatters: {
    level: (label) => ({ level: label })
  },
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    pid: process.pid,
    hostname: process.env.HOSTNAME || 'localhost',
    service: 'skyfox-api'
  }
});

// Helper functions for common logging patterns
export const loggers = {
  auth: logger.child({ component: 'auth' }),
  api: logger.child({ component: 'api' }),
  upload: logger.child({ component: 'upload' }),
  contact: logger.child({ component: 'contact' }),
  admin: logger.child({ component: 'admin' }),
  security: logger.child({ component: 'security' })
};

// Security event logging
export function logSecurityEvent(
  event: string,
  details: Record<string, any> = {},
  req?: Request
) {
  loggers.security.warn({
    event,
    details,
    ip: req?.headers.get('x-forwarded-for') || 'unknown',
    userAgent: req?.headers.get('user-agent') || 'unknown',
    timestamp: new Date().toISOString()
  }, `Security Event: ${event}`);
}

// Authentication event logging
export function logAuthEvent(
  event: 'login_success' | 'login_failed' | 'logout' | 'session_expired',
  userId: string | null,
  email?: string,
  req?: Request
) {
  loggers.auth.info({
    event,
    userId,
    email,
    ip: req?.headers.get('x-forwarded-for') || 'unknown',
    userAgent: req?.headers.get('user-agent') || 'unknown',
    timestamp: new Date().toISOString()
  }, `Auth Event: ${event}`);
}

// Rate limit event logging
export function logRateLimitEvent(
  endpoint: string,
  identifier: string,
  req?: Request
) {
  loggers.security.warn({
    event: 'rate_limit_exceeded',
    endpoint,
    identifier,
    ip: req?.headers.get('x-forwarded-for') || 'unknown',
    userAgent: req?.headers.get('user-agent') || 'unknown',
    timestamp: new Date().toISOString()
  }, `Rate limit exceeded: ${endpoint}`);
}
