"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

export default function MobileNav({ navLinks }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const menu = (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-100 overflow-y-auto bg-navy-deep"
        >
          <div className="flex justify-end p-6">
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-2xl text-ivory"
            >
              <FiX />
            </button>
          </div>
          <motion.nav
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center gap-8 pb-10 pt-10"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-display text-lg uppercase tracking-[0.2em] text-ivory hover:text-gold-soft"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="bg-gold px-8 py-4 font-body text-xs font-medium uppercase tracking-[0.3em] text-black"
            >
              Book a Stay
            </Link>
          </motion.nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <div className="lg:hidden">
      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="text-2xl text-ivory"
      >
        <FiMenu />
      </button>

      {mounted ? createPortal(menu, document.body) : null}
    </div>
  );
}
