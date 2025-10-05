import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'EDITOR')) {
    return new Response('Unauthorized', { status: 401 });
  }

  // For now, return empty array since we don't have a jobs table yet
  // In the future, this would query a jobs/careers table
  return Response.json([]);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'EDITOR')) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const jobData = await req.json();
    
    // TODO: Create job posting in database
    // For now, just return success
    console.log('Job posting data:', jobData);
    
    return Response.json({ 
      success: true,
      message: 'Job posting functionality coming soon'
    });
  } catch (error) {
    console.error('Job creation error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
