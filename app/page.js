"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);

    fetch(`/api/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [search, category]);

  const categories = ["Electronics", "Footwear", "Home", "Fitness", "Accessories"];

  return (
    <div>
      <h1>Products</h1>

      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1 }}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <div className="card" key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <h3 style={{ margin: "10px 0 4px" }}>{product.name}</h3>
              <p style={{ color: "#666", fontSize: 13, margin: "0 0 8px" }}>{product.description}</p>
              <p style={{ fontWeight: "bold" }}>${product.price.toFixed(2)}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}