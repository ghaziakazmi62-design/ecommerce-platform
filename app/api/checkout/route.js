import { stripe } from "../../../lib/stripe";
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

// This runs when the "Checkout" button is clicked on the Cart page.
// It creates a Stripe test-mode payment page and a matching "pending" order in our DB.
export async function POST(request) {
  const { items, email } = await request.json();

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 1. Create the order in our database first, status = pending
  const order = await prisma.order.create({
    data: {
      customerEmail: email || "guest@example.com",
      totalAmount,
      status: "pending",
      items: {
        create: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  // 2. Ask Stripe to create a hosted checkout page (test mode)
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100), // Stripe wants cents
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?order_id=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
    metadata: { orderId: order.id },
  });

  // 3. Remember which Stripe session belongs to which order
  await prisma.order.update({
    where: { id: order.id },
    data: { stripeSessionId: session.id },
  });

  return NextResponse.json({ url: session.url });
}
