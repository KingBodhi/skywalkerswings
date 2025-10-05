import { NextRequest, NextResponse } from 'next/server';
import { ZodSchema, ZodError } from 'zod';

export function withValidation<T>(
  schema: ZodSchema<T>,
  source: 'body' | 'query' = 'body'
) {
  return function(handler: (req: NextRequest & { validated: T }) => Promise<NextResponse>) {
    return async function(request: NextRequest): Promise<NextResponse> {
      try {
        let data: any;

        if (source === 'body') {
          data = await request.json();
        } else {
          const { searchParams } = new URL(request.url);
          data = Object.fromEntries(searchParams.entries());
        }

        const validated = schema.parse(data);
        (request as any).validated = validated;

        return handler(request as NextRequest & { validated: T });
      } catch (error) {
        if (error instanceof ZodError) {
          return NextResponse.json(
            {
              error: `Invalid ${source} data`,
              details: error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message
              }))
            },
            { status: 400 }
          );
        }

        if (source === 'body' && error instanceof SyntaxError) {
          return NextResponse.json(
            { error: 'Invalid JSON format' },
            { status: 400 }
          );
        }

        return NextResponse.json(
          { error: 'Invalid request data' },
          { status: 400 }
        );
      }
    };
  };
}