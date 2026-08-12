"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { stats } from "@/data/company";

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          stats.forEach((stat, index) => {
            const el = document.getElementById(`stat-${index}`);
            if (!el) return;

            const obj = { val: 0 };
            anime({
              targets: obj,
              val: stat.value,
              duration: 2000,
              delay: index * 150,
              easing: "easeOutExpo",
              update: () => {
                el.textContent = Math.round(obj.val).toString();
              },
            });
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-moon-navy-light border-y border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-4xl md:text-6xl font-bold text-moon-gold mb-2">
                <span id={`stat-${index}`}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <p className="text-white/50 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
