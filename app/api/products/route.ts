import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { status: 'ACTIVE' },
      include: {
        images: {
          orderBy: { sort: 'asc' }
        },
        variants: {
          include: {
            inventory: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return Response.json(products);
  } catch (error) {
    console.error('Products API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
