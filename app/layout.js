import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Link from "next/link";

export const metadata = {
  title: "MyShop — E-Commerce Platform",
  description: "A full-stack e-commerce store built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 32px", borderBottom: "1px solid #eee" }}>
            <Link href="/" style={{ fontWeight: "bold", fontSize: 20, textDecoration: "none", color: "#111" }}>MyShop</Link>
            <nav style={{ display: "flex", gap: 20 }}>
              <Link href="/">Products</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/orders">Orders</Link>
            </nav>
          </header>
          <main style={{ maxWidth: 1100, margin: "0 auto", padding: "24px" }}>
            {children}
          </main>
        </CartProvider>
      </body>
    </html>
  );
}
