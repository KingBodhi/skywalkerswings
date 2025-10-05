import { getOrCreateCart } from '@/lib/cart';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cart = await getOrCreateCart();
    return Response.json(cart);
  } catch (error) {
    console.error('Cart API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
