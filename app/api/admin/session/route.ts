import { getSession } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getSession();
    
    if (!session) {
      return Response.json({ 
        authenticated: false,
        message: 'No session found'
      });
    }

    if (session.role !== 'ADMIN' && session.role !== 'EDITOR') {
      return Response.json({ 
        authenticated: false,
        message: 'Insufficient permissions'
      });
    }

    return Response.json({
      authenticated: true,
      user: {
        email: session.email,
        role: session.role,
        userId: session.userId
      }
    });
  } catch (error) {
    console.error('Session check error:', error);
    return Response.json({ 
      authenticated: false,
      message: 'Session verification failed'
    });
  }
}
