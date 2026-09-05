"use client";
export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "../../../context/CartContext";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const { clearCart } = useCart();

  // Empty the cart since the purchase is complete
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "60px 0" }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Your order ID is: <strong>{orderId}</strong></p>
      <p>Note: this was a Stripe TEST payment, no real money was charged.</p>
      <Link href="/orders"><button>View Order History</button></Link>
    </div>
  );
}
