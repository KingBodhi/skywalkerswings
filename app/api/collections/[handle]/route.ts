import { prisma } from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { handle: string } }) {
  try {
    const collection = await prisma.collection.findUnique({
      where: { handle: params.handle },
      include: {
        products: {
          include: {
            product: {
              include: {
                images: true,
                variants: {
                  include: {
                    inventory: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!collection) {
      return new Response('Collection not found', { status: 404 });
    }

    return Response.json(collection);
  } catch (error) {
    console.error('Collection fetch error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
