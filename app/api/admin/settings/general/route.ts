import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const settings = await req.json();
    
    // In a real application, you would save these settings to a database
    // For now, we'll just return success
    console.log('General settings updated:', settings);
    
    return Response.json({ 
      success: true,
      message: 'Settings saved successfully'
    });
  } catch (error) {
    console.error('Settings save error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = await getSession();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Return default settings - in real app would.come from database
  const settings = {
    storeName: 'SkyFox Swings',
    storeEmail: 'info@skyfoxswings.com',
    storePhone: '',
    currency: 'USD',
    timezone: 'America/New_York',
    storeOnline: true,
    maintenanceMode: false
  };
  
  return Response.json(settings);
}
