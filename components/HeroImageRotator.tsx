'use client';

import { useEffect, useState } from 'react';
import AfterDarkImage from '@/components/AfterDarkImage';

type HeroImage = {
  src: string;
  alt?: string;
};

type Props = {
  images: HeroImage[];
  intervalMs?: number;
  className?: string;
};

export default function HeroImageRotator({ images, intervalMs = 5000, className }: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [images.length, intervalMs]);

  useEffect(() => {
    setIndex(0);
  }, [images]);

  if (!images.length) {
    return null;
  }

  return (
    <div className={`relative overflow-hidden ${className ?? ''}`}>
      {images.map((image, idx) => (
        <AfterDarkImage
          key={image.src ?? idx}
          src={image.src}
          alt={image.alt || 'SkyFox Swing'}
          fallbackSrc="/images/skyfox-placeholder.png"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
            idx === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}
