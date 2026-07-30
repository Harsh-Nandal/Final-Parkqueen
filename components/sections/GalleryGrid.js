import Image from "next/image";
import { GALLERY_IMAGES } from "@/lib/data/gallery";

export default function GalleryGrid({ images = GALLERY_IMAGES }) {
  return (
    <div className="grid grid-cols-2 gap-4.5 md:grid-cols-3 lg:grid-cols-4">
      {images.map((item) => (
        <div key={item.image} className="group relative aspect-square overflow-hidden shadow-luxury">
          <Image
            src={item.image}
            alt={item.caption}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.08]"
          />
        </div>
      ))}
    </div>
  );
}
