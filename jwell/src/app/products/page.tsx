// src/app/products/page.tsx
import { createClient } from "@supabase/supabase-js";
import ProductPage from "@/components/product/ProductPage";
import type { Database } from "@/types/supabase";

export const dynamic = "force-dynamic";

export default async function Products() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: products } = await supabase.from("products").select("*");

  return <ProductPage products={products || []} />;
}
