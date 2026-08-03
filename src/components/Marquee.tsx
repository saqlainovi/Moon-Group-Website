"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import { company } from "@/data/company";

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    anime({
      targets: track,
      translateX: ["0%", "-50%"],
      duration: 30000,
      easing: "linear",
      loop: true,
    });
  }, []);

  const items = [...company.values, ...company.values];

  return (
    <div className="relative py-5 bg-moon-gold overflow-hidden border-y border-moon-gold-light/20">
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        {items.map((value, i) => (
          <span
            key={i}
            className="inline-flex items-center mx-8 text-moon-navy font-semibold text-sm tracking-widest uppercase"
          >
            {value}
            <span className="ml-8 text-moon-navy/40">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
