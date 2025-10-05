import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return new Response("Unauthorized", { status: 401 });

  const collections = await prisma.collection.findMany({
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
    },
    orderBy: { createdAt: 'desc' }
  });
  
  return Response.json(collections);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session || (session.role !== "ADMIN" && session.role !== "EDITOR")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { title, handle, description, status, heroImage, productIds } = body || {};
  
  if (!title || !handle) {
    return new Response("Missing required fields", { status: 400 });
  }

  try {
    const collectionData: any = {
      title,
      handle,
      description: description || "",
      status: status || 'DRAFT',
      heroImage: heroImage || null
    };

    if (productIds && productIds.length > 0) {
      collectionData.products = {
        create: productIds.map((productId: string) => ({
          productId
        }))
      };
    }

    const collection = await prisma.collection.create({
      data: collectionData,
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    });

    return Response.json(collection);
  } catch (error) {
    console.error('Collection creation error:', error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
