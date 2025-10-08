import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
export async function GET(){
  try {
    const sess = await getSession();
    if(!sess) {
      console.log('No session found for admin products request');
      return new Response("Unauthorized",{status:401});
    }
    console.log('Session found:', sess.email, sess.role);
    
    const products = await prisma.product.findMany({ 
      include:{ 
        variants: {
          include: {
            inventory: true
          }
        }, 
        images: true, 
        collections: { 
          include: { 
            collection: true 
          } 
        } 
      } 
    });
    
    console.log(`Found ${products.length} products`);
    return Response.json(products);
  } catch (error) {
    console.error('Admin products API error:', error);
    return new Response("Internal Server Error", {status: 500});
  }
}
export async function POST(req:Request){
  const sess = await getSession();
  if(!sess || (sess.role!=="ADMIN" && sess.role!=="EDITOR")) return new Response("Unauthorized",{status:401});
  const body = await req.json();
  const { title, handle, description, status, images, metadata } = body || {};
  if(!title || !handle) return new Response("Missing fields",{status:400});
  
  const productData: any = { 
    title, 
    handle, 
    description: description || "",
    status: status || 'DRAFT',
    metadata: metadata ?? null
  };

  if (images && images.length > 0) {
    productData.images = {
      create: images.map((img: any, index: number) => ({
        url: img.url,
        alt: img.alt || `${title} - Image ${index + 1}`,
        sort: index
      }))
    };
  }

  const p = await prisma.product.create({ 
    data: productData,
    include: { images: true, variants: true }
  });
  return Response.json(p);
}
