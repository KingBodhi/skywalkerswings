import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { handle: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { handle: params.handle },
      include: {
        images: true,
        variants: {
          include: {
            inventory: true
          }
        }
      }
    });

    if (!product) {
      return new Response('Product not found', { status: 404 });
    }

    return Response.json(product);
  } catch (error) {
    console.error('Product fetch error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
