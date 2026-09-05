"use client";

import { useEffect, useState } from "react";

const STATUS_COLORS = {
  pending: "#999",
  paid: "#0a7",
  shipped: "#06c",
  delivered: "#111",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (orders.length === 0) return <p>No orders yet.</p>;

  return (
    <div>
      <h1>Order History</h1>
      {orders.map((order) => (
        <div key={order.id} className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>Order #{order.id.slice(-8)}</strong>
            <span style={{ color: STATUS_COLORS[order.status] || "#111", fontWeight: "bold", textTransform: "uppercase" }}>
              {order.status}
            </span>
          </div>
          <p style={{ color: "#666", fontSize: 13 }}>{new Date(order.createdAt).toLocaleString()}</p>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.product.name} × {item.quantity} — ${(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p style={{ fontWeight: "bold" }}>Total: ${order.totalAmount.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}
