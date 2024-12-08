// src/components/home/CategoryShowcase.tsx
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Rings",
    image: "/images/collection/ring.svg",
    link: "/rings",
  },
  {
    name: "Necklaces",
    image: "/images/collection/necklace.svg",
    link: "/necklaces",
  },
  {
    name: "Earrings",
    image: "/images/collection/earrings.svg",
    link: "/earrings",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">
          Explore Our Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className="group relative h-[400px] overflow-hidden"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-serif ">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
