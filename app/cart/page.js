"use client";

import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, total } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart, email }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.url) {
      window.location.href = data.url; // send them to Stripe's test payment page
    } else {
      alert(data.error || "Something went wrong.");
    }
  }

  if (cart.length === 0) {
    return <p>Your cart is empty. Go add some products!</p>;
  }

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.map((item) => (
        <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0", borderBottom: "1px solid #eee" }}>
          <img src={item.imageUrl} alt={item.name} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }} />
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: "bold" }}>{item.name}</p>
            <p style={{ margin: 0, color: "#666" }}>${item.price.toFixed(2)}</p>
          </div>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
            style={{ width: 60 }}
          />
          <button onClick={() => removeFromCart(item.id)} style={{ background: "#e33" }}>Remove</button>
        </div>
      ))}

      <h2 style={{ marginTop: 24 }}>Total: ${total.toFixed(2)}</h2>

      <input
        placeholder="Your email (for order confirmation)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", margin: "12px 0" }}
      />

      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Redirecting..." : "Checkout"}
      </button>
    </div>
  );
}
