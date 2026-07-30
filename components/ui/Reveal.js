"use client";

import { motion } from "framer-motion";

export default function Reveal({ children, delay = 0, className = "", as = "div" }) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 0.8, 0.24, 1] }}
    >
      {children}
    </MotionTag>
  );
}
