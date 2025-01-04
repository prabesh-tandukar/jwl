// src/components/ui/CloudinaryImage.tsx
"use client";

import { CldImage } from "next-cloudinary";

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function CloudinaryImage({
  src,
  alt,
  width = 800,
  height = 800,
  className,
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
