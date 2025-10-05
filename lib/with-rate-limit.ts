import { NextRequest, NextResponse } from 'next/server';
import { rateLimit, getClientIdentifier, RateLimitConfig } from './rate-limit';

export function withRateLimit(config: RateLimitConfig) {
  return function rateLimitMiddleware(
    handler: (req: NextRequest) => Promise<NextResponse>
  ) {
    return async function (request: NextRequest): Promise<NextResponse> {
      const identifier = getClientIdentifier(request);
      const result = rateLimit(identifier, config);

      if (!result.success) {
        return NextResponse.json(
          {
            error: config.message || 'Too many requests',
            retryAfter: Math.ceil((result.resetTime - Date.now()) / 1000)
          },
          {
            status: 429,
            headers: {
              'Retry-After': String(Math.ceil((result.resetTime - Date.now()) / 1000)),
              'X-RateLimit-Limit': String(config.maxRequests),
              'X-RateLimit-Remaining': String(result.remaining),
              'X-RateLimit-Reset': String(Math.ceil(result.resetTime / 1000))
            }
          }
        );
      }

      const response = await handler(request);

      // Add rate limit headers to successful responses
      response.headers.set('X-RateLimit-Limit', String(config.maxRequests));
      response.headers.set('X-RateLimit-Remaining', String(result.remaining));
      response.headers.set('X-RateLimit-Reset', String(Math.ceil(result.resetTime / 1000)));

      return response;
    };
  };
}