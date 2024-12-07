// src/components/product/AddToCartButton.tsx
"use client";

import { useState } from "react";
import type { Database } from "@/types/supabase";

type Product = Database["public"]["Tables"]["products"]["Row"];

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log("Adding to cart:", { product, quantity });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <label htmlFor="quantity" className="font-medium">
          Quantity:
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border rounded-md px-2 py-1"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}
