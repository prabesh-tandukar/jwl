// src/components/home/FeaturedProductsSlider.tsx
"use client";

import { useState } from "react";
import ProductCard from "../product/ProductCard";
import type { Product } from "@/types/database.types";

interface FeaturedProductsSliderProps {
  products: Product[];
}

export default function FeaturedProductsSlider({
  products,
}: FeaturedProductsSliderProps) {
  const [currentGroup, setCurrentGroup] = useState(0);
  const productsPerGroup = 4;

  // Calculate number of groups
  const numberOfGroups = Math.ceil(products.length / productsPerGroup);

  // Split products into groups of 4
  const productGroups = Array.from({ length: numberOfGroups }, (_, i) =>
    products.slice(i * productsPerGroup, (i + 1) * productsPerGroup)
  );

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 overflow-hidden">
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentGroup * 100}%)` }}
          >
            {productGroups.map((group, groupIndex) => (
              <div
                key={groupIndex}
                className="min-w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
              >
                {group.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        {numberOfGroups > 1 && (
          <div className="flex justify-center space-x-2 mt-8">
            {productGroups.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentGroup(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${
                    currentGroup === index
                      ? "bg-blue-600 w-6"
                      : "bg-gray-300 hover:bg-gray-400"
                  }
                `}
                aria-label={`Product group ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
