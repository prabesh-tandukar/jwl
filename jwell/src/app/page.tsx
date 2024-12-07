// src/app/page.tsx
import { createClient } from "@supabase/supabase-js";
import HeroSlider from "@/components/home/HeroSlider";
import FeaturedProducts from "@/components/home/FeaturedProducts";
// import CraftsmanshipSection from "@/components/home/CraftsmanshipSection";
// import CategoryShowcase from "@/components/home/CategoryShowcase";
// import CustomDesign from "@/components/home/CustomDesign";
// import Testimonials from "@/components/home/Testimonials";
// import InstagramFeed from "@/components/home/InstagramFeed";
// import Footer from "@/components/layout/Footer";
import type { Database } from "@/types/supabase";

export default async function Home() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);

  return (
    <main className="min-h-screen">
      <HeroSlider />

      {/* Featured Products */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
            Featured Collection
          </h2>
          <FeaturedProducts products={products || []} />
        </div>
      </section>

      {/* Categories Showcase */}
      <CategoryShowcase />

      {/* Craftsmanship Section */}
      <section className="py-20 bg-neutral-50">
        <CraftsmanshipSection />
      </section>

      {/* Custom Design Service */}
      <CustomDesign />

      {/* Testimonials */}
      <section className="py-20 bg-neutral-50">
        <Testimonials />
      </section>

      {/* Instagram Feed */}
      <section className="py-20">
        <InstagramFeed />
      </section>

      <Footer />
    </main>
  );
}
