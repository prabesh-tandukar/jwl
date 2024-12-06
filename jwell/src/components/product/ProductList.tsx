// src/components/product/ProductList.tsx
"use client";

import { Product } from "@/types/database.types";
import ProductCard from "./ProductCard";
import { useState } from "react";

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const [cart, setCart] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    // You can add a toast notification here
    console.log("Added to cart:", product.name);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
