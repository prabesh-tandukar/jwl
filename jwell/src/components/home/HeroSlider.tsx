// src/components/home/HeroSlider.tsx
"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/slider/slider1.jpg", // Make sure these images exist in your public folder
    brand: "New Collection",
    title: "Elegance for Every Moment",
    link: "/collections/new",
  },
  {
    image: "/slider/slider1.jpg",
    brand: "Trending Now",
    title: "Modern Jewelry for the Bold",
    link: "/collections/trending",
  },
  {
    image: "/slider/slider1.jpg",
    brand: "Special Offer",
    title: "Timeless Pieces at Special Prices",
    link: "/collections/special",
  },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="px-4 lg:px-8 py-10">
      <div className="relative">
        <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0">
                <div className="relative h-[30rem] md:h-[calc(100vh-106px)]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute bottom-0 left-0 w-2/3 md:max-w-lg p-5 md:p-10">
                    <span className="block text-white text-sm md:text-base">
                      {slide.brand}
                    </span>
                    <span className="block text-white text-xl md:text-3xl font-medium mt-2">
                      {slide.title}
                    </span>
                    <div className="mt-5">
                      <Link
                        href={slide.link}
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-white border border-transparent text-black hover:bg-gray-100 transition-colors"
                      >
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
