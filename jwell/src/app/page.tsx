// src/app/page.tsx
import { createClient } from "@supabase/supabase-js";
import HeroSlider from "@/components/home/HeroSlider";
import FeaturedProductsSlider from "@/components/home/FeaturedProductsSlider";

import CategoryShowcase from "@/components/home/CategoryShowcase";

import Footer from "@/components/layout/Footer";
import type { Database } from "@/types/supabase";
import Navbar from "@/components/layout/Navbar";

export default async function Home() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fetch only featured products
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSlider />

      {/* Featured Products */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-blue-800">
            Featured Jwells
          </h2> */}
          <div className="mt-8">
            <FeaturedProductsSlider products={products || []} />
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <CategoryShowcase />

      <Footer />
    </main>
  );
}
