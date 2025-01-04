// src/components/product/ProductCard.tsx
"use client";

import { CldImage } from "next-cloudinary";
import Link from "next/link";
import type { Product } from "@/types/database.types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <Link href={`/products/${product.id}`}>
        {/* Image container with Cloudinary */}
        <div className="relative w-full h-[400px] overflow-hidden rounded-lg">
          <CldImage
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
        {/* Content area */}
        <div className="mt-4 space-y-1">
          <h3 className="text-sm text-gray-700 font-medium">{product.name}</h3>
          <p className="text-sm text-gray-900 font-semibold">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
}
