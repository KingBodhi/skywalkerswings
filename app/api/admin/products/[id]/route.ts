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
    const { images, variants: variantUpdates, ...rawProductUpdates } = updates ?? {};

    const allowedFields = ['title', 'handle', 'description', 'status', 'metadata'];
    const productUpdates = Object.fromEntries(
      Object.entries(rawProductUpdates).filter(([key]) => allowedFields.includes(key))
    );

    const product = await prisma.$transaction(async (tx) => {
      if (Object.keys(productUpdates).length > 0) {
        await tx.product.update({
          where: { id: params.id },
          data: productUpdates
        });
      }

      if (Array.isArray(variantUpdates)) {
        const existingVariants = await tx.variant.findMany({
          where: { productId: params.id },
          select: { id: true }
        });
        const submittedIds = new Set<string>();

        for (const [index, variant] of variantUpdates.entries()) {
          if (variant?.id) {
            submittedIds.add(variant.id);
            await tx.variant.update({
              where: { id: variant.id },
              data: {
                sku: variant.sku,
                price: variant.price,
                compareAt: variant.compareAt ?? null,
                size: variant.size ?? null,
                color: variant.color ?? null,
                weightG: variant.weightG ?? null,
                dims: variant.dims ?? null,
                isDefault: index === 0
              }
            });

            if (variant.inventory?.quantity !== undefined) {
              await tx.inventoryLevel.upsert({
                where: { variantId: variant.id },
                update: { quantity: variant.inventory.quantity },
                create: {
                  variantId: variant.id,
                  quantity: variant.inventory.quantity,
                  reserved: 0
                }
              });
            }
          } else {
            const createdVariant = await tx.variant.create({
              data: {
                productId: params.id,
                sku: variant?.sku || `SKU-${Date.now()}`,
                price: variant?.price ?? 0,
                compareAt: variant?.compareAt ?? null,
                size: variant?.size ?? null,
                color: variant?.color ?? null,
                weightG: variant?.weightG ?? null,
                dims: variant?.dims ?? null,
                isDefault: index === 0
              }
            });

            submittedIds.add(createdVariant.id);

            if (variant?.inventory?.quantity !== undefined) {
              await tx.inventoryLevel.create({
                data: {
                  variantId: createdVariant.id,
                  quantity: variant.inventory.quantity,
                  reserved: 0
                }
              });
            }
          }
        }

        const existingIds = new Set(existingVariants.map((variant) => variant.id));
        const toDelete = [...existingIds].filter((id) => !submittedIds.has(id));

        if (toDelete.length > 0) {
          await tx.inventoryLevel.deleteMany({ where: { variantId: { in: toDelete } } });
          await tx.variant.deleteMany({ where: { id: { in: toDelete } } });
        }
      }

      if (images !== undefined) {
        await tx.productImage.deleteMany({ where: { productId: params.id } });

        if (Array.isArray(images) && images.length > 0) {
          await tx.productImage.createMany({
            data: images.map((img: any, index: number) => ({
              productId: params.id,
              url: img.url,
              alt: img.alt || `${productUpdates.title ?? 'Product'} - Image ${index + 1}`,
              sort: index
            }))
          });
        }
      }

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
