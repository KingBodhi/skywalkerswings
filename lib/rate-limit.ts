import { NextRequest } from 'next/server';

// In-memory store for development; use Redis in production
const rateLimitStore = new Map<string, number[]>();

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  message?: string;
}

export function rateLimit(
  identifier: string,
  config: RateLimitConfig
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  // Get or create request history for this identifier
  if (!rateLimitStore.has(identifier)) {
    rateLimitStore.set(identifier, []);
  }

  const requests = rateLimitStore.get(identifier)!;

  // Remove old requests outside the window
  const validRequests = requests.filter(time => time > windowStart);

  // Check if limit exceeded
  if (validRequests.length >= config.maxRequests) {
    const oldestRequest = Math.min(...validRequests);
    const resetTime = oldestRequest + config.windowMs;

    return {
      success: false,
      remaining: 0,
      resetTime
    };
  }

  // Add current request
  validRequests.push(now);
  rateLimitStore.set(identifier, validRequests);

  // Cleanup old entries periodically
  if (Math.random() < 0.01) { // 1% chance
    cleanup(windowStart);
  }

  return {
    success: true,
    remaining: config.maxRequests - validRequests.length,
    resetTime: now + config.windowMs
  };
}

function cleanup(before: number) {
  for (const [key, requests] of rateLimitStore.entries()) {
    const validRequests = requests.filter(time => time > before);
    if (validRequests.length === 0) {
      rateLimitStore.delete(key);
    } else {
      rateLimitStore.set(key, validRequests);
    }
  }
}

// Helper to get client identifier
export function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown';
  return ip;
}