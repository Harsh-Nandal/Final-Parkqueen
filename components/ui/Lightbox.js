"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Lightbox({ images, alt, index, onClose, onIndexChange }) {
  useEffect(() => {
    if (index === null) return;

    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndexChange((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndexChange((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [index, images.length, onClose, onIndexChange]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {index !== null ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-200 flex items-center justify-center bg-navy-deep/95 p-4 sm:p-10"
          onClick={onClose}
        >
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute right-5 top-5 text-3xl text-ivory hover:text-gold-soft"
          >
            <FiX />
          </button>

          {images.length > 1 && (
            <>
              <button
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  onIndexChange((index - 1 + images.length) % images.length);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-3xl text-ivory hover:text-gold-soft sm:left-6"
              >
                <FiChevronLeft />
              </button>
              <button
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  onIndexChange((index + 1) % images.length);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-3xl text-ivory hover:text-gold-soft sm:right-6"
              >
                <FiChevronRight />
              </button>
            </>
          )}

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative h-[80vh] w-full max-w-275"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={images[index]} alt={alt} fill sizes="90vw" className="object-contain" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
