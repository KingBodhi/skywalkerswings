import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getOrCreateCart } from "@/lib/cart";
import { logger } from "@/lib/logger";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    // Check for Stripe configuration
    const STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
    if (!STRIPE_KEY) {
      logger.error('STRIPE_SECRET_KEY not found in environment variables');
      return Response.json({
        error: 'Checkout error: Make sure STRIPE_SECRET_KEY is set in .env'
      }, { status: 500 });
    }

    const stripe = new Stripe(STRIPE_KEY, { apiVersion: "2024-06-20" });

    const cart = await getOrCreateCart();
    const items = await prisma.cartItem.findMany({
      where: { cartId: cart.id },
      include: { variant: { include: { product: true } } }
    });

    if (!items.length) {
      return Response.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const line_items = items.map(i => ({
      quantity: i.qty,
      price_data: {
        currency: "usd",
        unit_amount: i.price,
        product_data: {
          name: `${i.variant.product.title} ${i.variant.size || ""} ${i.variant.color || ""}`.trim()
        }
      }
    }));

    const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${base}/cart?success=1`,
      cancel_url: `${base}/cart?cancel=1`
    });

    return Response.json({ id: session.id, url: session.url });
  } catch (error) {
    logger.error('Checkout session creation failed');
    console.error('Checkout error:', error);
    return Response.json({
      error: 'Checkout error: Unable to create payment session'
    }, { status: 500 });
  }
}
