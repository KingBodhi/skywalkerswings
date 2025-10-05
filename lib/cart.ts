import { prisma } from "./prisma";
import { cookies } from "next/headers";
const COOKIE = "wr_cart";
export async function getOrCreateCart(){
  const id = cookies().get(COOKIE)?.value;
  if(id){
    const cart = await prisma.cart.findUnique({ 
      where: { id }, 
      include: { 
        items: { 
          include: { 
            variant: {
              include: {
                product: true
              }
            }
          } 
        } 
      } 
    });
    if(cart) return cart;
  }
  const cart = await prisma.cart.create({ 
    data: {},
    include: {
      items: {
        include: {
          variant: {
            include: {
              product: true
            }
          }
        }
      }
    }
  });
  cookies().set(COOKIE, cart.id, { httpOnly: true, sameSite: "lax", path: "/" });
  return cart;
}
