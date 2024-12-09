"use client";

import { useState, useEffect, use } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Minus, Plus } from "lucide-react";
import type { Database } from "@/types/supabase";

interface Props {
  params: {
    id: string;
  };
}

export default function ProductDetail({ params }: Props) {
  const resolvedParams = use(params);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const { addItem } = useCart();
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", resolvedParams.id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
        router.push("/products");
        return;
      }

      if (data) {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [resolvedParams.id, router, supabase]);

  const handleAddToCart = async () => {
    if (!product) return;

    setIsLoading(true);
    try {
      // Add to cart multiple times based on quantity
      for (let i = 0; i < quantity; i++) {
        await addItem(product);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-96 md:h-[600px] rounded-lg overflow-hidden">
          <Image
            src={product.image_url || "/placeholder.jpg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="text-2xl font-bold text-blue-900 mb-6">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 mb-8">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={decrementQuantity}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors disabled:bg-blue-300"
          >
            {isLoading ? "Adding to Cart..." : "Add to Cart"}
          </button>

          {/* Stock Status */}
          <div className="mt-4 text-sm text-gray-600">
            {product.stock > 0 ? (
              <span className="text-green-600">✓ In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
