'use client';

import { useState } from 'react';

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
};

export default function AfterDarkImage({ fallbackSrc = '/images/hero.svg', src, alt = '', ...rest }: ImgProps) {
  const initialSrc = typeof src === 'string' && src.length > 0 ? src : fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(initialSrc);

  return (
    <img
      {...rest}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
