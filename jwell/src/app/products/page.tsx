// src/app/products/page.tsx
import { createClient } from "@supabase/supabase-js";
import ProductPage from "@/components/product/ProductPage";
import type { Database } from "@/types/supabase";

export const dynamic = "force-dynamic";

export default async function Products() {
  try {
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    return <ProductPage products={products || []} />;
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-500">
          We are having trouble loading the products. Please try again later.
        </p>
      </div>
    );
  }
}
