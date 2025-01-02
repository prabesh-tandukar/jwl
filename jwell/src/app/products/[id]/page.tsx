// src/app/products/[id]/page.tsx
import { createClient } from "@supabase/supabase-js";
import ProductDetails from "@/components/product/ProductDetails";
import { notFound } from "next/navigation";
import type { Database } from "@/types/supabase";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
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

  // Fetch related products (same category)
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(4);

  return (
    <ProductDetails product={product} relatedProducts={relatedProducts || []} />
  );
}
