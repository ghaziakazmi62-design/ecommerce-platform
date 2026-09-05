// Run this once with: npm run seed
// It fills your empty database with sample products so your store isn't blank.

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const products = [
  { name: "Wireless Headphones", description: "Noise-cancelling over-ear headphones", price: 59.99, category: "Electronics", imageUrl: "https://picsum.photos/seed/headphones/400/400" },
  { name: "Running Shoes", description: "Lightweight breathable running shoes", price: 79.99, category: "Footwear", imageUrl: "https://picsum.photos/seed/shoes/400/400" },
  { name: "Coffee Maker", description: "12-cup programmable coffee maker", price: 45.5, category: "Home", imageUrl: "https://picsum.photos/seed/coffee/400/400" },
  { name: "Yoga Mat", description: "Non-slip eco-friendly yoga mat", price: 25.0, category: "Fitness", imageUrl: "https://picsum.photos/seed/yoga/400/400" },
  { name: "Backpack", description: "Water-resistant 30L laptop backpack", price: 39.99, category: "Accessories", imageUrl: "https://picsum.photos/seed/backpack/400/400" },
  { name: "Bluetooth Speaker", description: "Portable waterproof speaker", price: 34.99, category: "Electronics", imageUrl: "https://picsum.photos/seed/speaker/400/400" },
  { name: "Desk Lamp", description: "LED adjustable desk lamp", price: 22.0, category: "Home", imageUrl: "https://picsum.photos/seed/lamp/400/400" },
  { name: "Water Bottle", description: "Insulated stainless steel bottle", price: 18.5, category: "Fitness", imageUrl: "https://picsum.photos/seed/bottle/400/400" },
];

async function main() {
  for (const p of products) {
    await prisma.product.create({ data: p });
  }
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
