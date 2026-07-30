"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "@/components/ui/Lightbox";

export default function RoomDetailGallery({ images, alt }) {
  const [index, setIndex] = useState(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {images.map((src, idx) => (
          <button
            type="button"
            key={src}
            onClick={() => setIndex(idx)}
            className={`relative aspect-3/4 cursor-pointer overflow-hidden shadow-luxury ${idx === 0 ? "translate-y-6" : ""}`}
          >
            <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 25vw, 45vw" className="object-cover" />
          </button>
        ))}
      </div>

      <Lightbox images={images} alt={alt} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </>
  );
}
