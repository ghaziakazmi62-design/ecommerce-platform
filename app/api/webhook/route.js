import { stripe } from "../../../lib/stripe";
import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

// Stripe calls this URL automatically when a test payment succeeds.
// It flips the order status from "pending" to "paid".
export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "paid" },
    });
  }

  return NextResponse.json({ received: true });
}
