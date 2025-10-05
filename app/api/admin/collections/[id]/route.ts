import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const collection = await prisma.collection.findUnique({
      where: { id: params.id },
      include: {
        products: {
          include: {
            product: {
              include: {
                images: true,
                variants: true
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
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const updates = await req.json();
    const { productIds, ...collectionUpdates } = updates;
    
    // Start a transaction to handle products
    const collection = await prisma.$transaction(async (tx) => {
      // Update collection basic info
      const updatedCollection = await tx.collection.update({
        where: { id: params.id },
        data: collectionUpdates
      });

      // Handle product updates if provided
      if (productIds !== undefined) {
        // Delete existing product relationships
        await tx.collectionProduct.deleteMany({
          where: { collectionId: params.id }
        });

        // Create new product relationships
        if (productIds.length > 0) {
          await tx.collectionProduct.createMany({
            data: productIds.map((productId: string) => ({
              collectionId: params.id,
              productId
            }))
          });
        }
      }

      // Return updated collection with products
      return await tx.collection.findUnique({
        where: { id: params.id },
        include: {
          products: {
            include: {
              product: {
                include: {
                  images: true,
                  variants: true
                }
              }
            }
          }
        }
      });
    });

    return Response.json(collection);
  } catch (error) {
    console.error('Collection update error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    await prisma.collection.delete({
      where: { id: params.id }
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Collection deletion error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
