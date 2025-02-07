'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AssetImage({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      className={`object-contain transition-opacity duration-500 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      loading="eager"
    />
  );
} 