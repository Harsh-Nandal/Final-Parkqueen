"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FAQS } from "@/lib/data/faqs";

export default function FaqAccordion({ items = FAQS }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((faq, i) => {
        const open = openIndex === i;
        return (
          <div key={faq.question}>
            <button
              onClick={() => setOpenIndex(open ? -1 : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 py-5.5 text-left"
            >
              <span className="font-display text-[14px] font-medium text-black">{faq.question}</span>
              <FiPlus
                className={`h-4.5 w-4.5 flex-none text-gold transition-transform duration-300 ${
                  open ? "rotate-45" : ""
                }`}
              />
            </button>
            {open ? <p className="pb-5.5 text-[14px] text-grey">{faq.answer}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
