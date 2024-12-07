// src/components/product/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/database.types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${product.id}`} className="cursor-pointer">
        <div className="relative h-48">
          <Image
            src={product.image_url || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                onAddToCart(product);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
