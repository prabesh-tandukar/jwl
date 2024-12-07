// src/components/home/FeaturedProducts.tsx
"use client";

import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import type { Database } from "@/types/supabase";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default function FeaturedProducts({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={() => {}}
        />
      ))}
    </div>
  );
}
