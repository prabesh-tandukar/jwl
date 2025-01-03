// src/components/product/ProductDetails.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  RefreshCw,
  Mail,
} from "lucide-react";
import type { Product } from "@/types/database.types";
import ProductCard from "./ProductCard";

interface ProductDetailsProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetails({
  product,
  relatedProducts,
}: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="text-gray-500 hover:text-gray-900">
              Home
            </a>
          </li>
          <li>/</li>
          <li>
            <a href="/products" className="text-gray-500 hover:text-gray-900">
              {product.category}
            </a>
          </li>
          <li>/</li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Images - Left Column */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.image_url || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-cover hover:scale-105 transition-transform cursor-zoom-in"
              priority
            />
          </div>
          {/* Additional product images can be added here */}
        </div>

        {/* Product Info - Right Column */}
        <div className="flex flex-col">
          {/* Product Title & Rating */}
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm text-gray-500">(125 reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.stock <= 5 && (
              <span className="text-red-600 text-sm">
                Only {product.stock} left!
              </span>
            )}
          </div>

          {/* Options Selection */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Size
              </label>
              <div className="mt-2 flex gap-2">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <div className="mt-2 flex items-center">
              <button
                onClick={() => quantity > 1 && setQuantity((q) => q - 1)}
                className="p-2 border rounded-l-md hover:bg-gray-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-16 text-center border-t border-b py-2">
                {quantity}
              </span>
              <button
                onClick={() =>
                  quantity < product.stock && setQuantity((q) => q + 1)
                }
                className="p-2 border rounded-r-md hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button className="mt-8 w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 font-medium">
            <ShoppingBag className="w-5 h-5" />
            Add to Cart
          </button>

          {/* Product Features */}
          <div className="mt-8 space-y-4 border-t pt-8">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                Free shipping on orders over $100
              </span>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                30-day return policy
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                Contact us for any questions
              </span>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-8 border-t pt-8">
            <h3 className="text-lg font-medium text-gray-900">Description</h3>
            <div className="mt-4 prose prose-sm text-gray-600">
              {product.description}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 border-t pt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
