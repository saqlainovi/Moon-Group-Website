"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "@/data/company";

export default function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 md:py-32 bg-moon-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[20rem] font-bold text-moon-gold select-none">
          &ldquo;
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <p className="text-moon-gold text-sm tracking-[0.3em] uppercase mb-4">
            Testimonials
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            What Our <span className="text-gradient-gold">Customers Say</span>
          </h2>
        </div>

        <div className="min-h-[200px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed italic mb-8">
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>
              <footer>
                <p className="font-display text-lg text-moon-gold">
                  {testimonials[active].name}
                </p>
                <p className="text-white/40 text-sm mt-1">
                  {testimonials[active].role}
                </p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === i
                  ? "w-8 bg-moon-gold"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
