import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'EDITOR')) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
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
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || (session.role !== 'ADMIN' && session.role !== 'EDITOR')) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const updates = await req.json();
    const { images, ...productUpdates } = updates;
    
    // Start a transaction to handle images
    const product = await prisma.$transaction(async (tx) => {
      // Update product basic info
      const updatedProduct = await tx.product.update({
        where: { id: params.id },
        data: productUpdates
      });

      // Handle image updates if provided
      if (images !== undefined) {
        // Delete existing images
        await tx.productImage.deleteMany({
          where: { productId: params.id }
        });

        // Create new images
        if (images.length > 0) {
          await tx.productImage.createMany({
            data: images.map((img: any, index: number) => ({
              productId: params.id,
              url: img.url,
              alt: img.alt || `${updatedProduct.title} - Image ${index + 1}`,
              sort: index
            }))
          });
        }
      }

      // Return updated product with images
      return await tx.product.findUnique({
        where: { id: params.id },
        include: {
          images: true,
          variants: {
            include: {
              inventory: true
            }
          }
        }
      });
    });

    return Response.json(product);
  } catch (error) {
    console.error('PATCH error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    await prisma.product.delete({
      where: { id: params.id }
    });

    return Response.json({ success: true });
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
}