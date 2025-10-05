import { getOrCreateCart } from "@/lib/cart";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const cart = await getOrCreateCart();
    const body = await req.json();
    const { variantId, qty = 1, safetyAck = false } = body;

    if (!variantId) {
      return new Response("Variant ID required", { status: 400 });
    }

    const variant = await prisma.variant.findUnique({
      where: { id: variantId },
      include: { 
        product: true,
        inventory: true
      }
    });

    if (!variant) {
      return new Response("Variant not found", { status: 404 });
    }

    // Check inventory
    if (variant.inventory && variant.inventory.quantity < qty) {
      return new Response("Insufficient inventory", { status: 400 });
    }

    const item = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        variantId,
        qty,
        price: variant.price,
        metadata: JSON.stringify({ 
          safetyAck,
          productTitle: variant.product.title 
        })
      }
    });

    return Response.json(item);
  } catch (error) {
    console.error('Cart item creation error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, qty } = await req.json();
    
    if (!id || qty < 1) {
      return new Response("Invalid parameters", { status: 400 });
    }

    await prisma.cartItem.update({
      where: { id },
      data: { qty }
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Cart item update error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    
    if (!id) {
      return new Response("Item ID required", { status: 400 });
    }

    await prisma.cartItem.delete({
      where: { id }
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Cart item deletion error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
