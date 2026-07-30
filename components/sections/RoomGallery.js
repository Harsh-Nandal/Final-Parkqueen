"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";

export default function RoomGallery({ images, alt }) {
  const [index, setIndex] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:h-[520px] lg:grid-cols-2">
        {images[0] && (
          <button
            type="button"
            onClick={() => setIndex(0)}
            className="relative aspect-16/11 cursor-pointer overflow-hidden shadow-luxury lg:aspect-auto lg:h-full"
          >
            <Image src={images[0]} alt={alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </button>
        )}
        {images.length > 1 && (
          <div className="grid grid-cols-2 grid-rows-2 gap-4 lg:h-full">
            {images.slice(1, 5).map((src, idx) => (
              <button
                type="button"
                key={src}
                onClick={() => setIndex(idx + 1)}
                className="relative aspect-square cursor-pointer overflow-hidden shadow-luxury lg:aspect-auto"
              >
                <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <Lightbox images={images} alt={alt} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </>
  );
}
