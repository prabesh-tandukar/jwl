// src/app/products/[id]/page.tsx
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/product/AddToCartButton";
import type { Database } from "@/types/supabase";

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductDetail({ params }: Props) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
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
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="mt-4 text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </div>

          <div className="mt-4 bg-gray-100 rounded-lg p-4">
            <h2 className="font-semibold text-lg">Description</h2>
            <p className="mt-2 text-gray-600">{product.description}</p>
          </div>

          <div className="mt-4 bg-gray-100 rounded-lg p-4">
            <h2 className="font-semibold text-lg">Details</h2>
            <div className="mt-2 space-y-2">
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-gray-600">Stock: {product.stock} units</p>
            </div>
          </div>

          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
