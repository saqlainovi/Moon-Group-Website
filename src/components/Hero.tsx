"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import dynamic from "next/dynamic";
import { company } from "@/data/company";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), {
  ssr: false,
});

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-bg-image", {
        scale: 1.2,
        duration: 2,
        ease: "power2.out",
      })
        .from(
          titleRef.current,
          { y: 80, opacity: 0, duration: 1.2 },
          "-=1.4"
        )
        .from(
          subtitleRef.current,
          { y: 40, opacity: 0, duration: 1 },
          "-=0.8"
        )
        .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(scrollRef.current, { opacity: 0, duration: 0.6 }, "-=0.3");

      gsap.to(scrollRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-end overflow-hidden"
    >
      <div className="hero-bg-image absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80"
          alt="Moon Group construction skyline"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-moon-navy/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-moon-navy via-moon-navy/50 to-transparent" />
      </div>

      <ThreeBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-24 md:pb-32 pt-32 w-full">
        <p className="text-moon-gold text-sm tracking-[0.3em] uppercase mb-4 font-medium">
          {company.tagline}
        </p>
        <h1
          ref={titleRef}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] max-w-4xl mb-6"
        >
          {company.heroTitle.split(" ").map((word, i) => (
            <span key={i}>
              {i === 2 ? (
                <span className="text-gradient-gold">{word} </span>
              ) : (
                `${word} `
              )}
            </span>
          ))}
        </h1>
        <p
          ref={subtitleRef}
          className="text-white/70 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
        >
          {company.heroSubtitle}
        </p>
        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="px-8 py-4 bg-moon-gold text-moon-navy font-semibold rounded-sm hover:bg-moon-gold-light transition-all hover:scale-105"
          >
            Explore Projects
          </a>
          <a
            href="#about"
            className="px-8 py-4 border border-white/30 text-white font-semibold rounded-sm hover:border-moon-gold hover:text-moon-gold transition-all"
          >
            Our Legacy
          </a>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-moon-gold to-transparent" />
      </div>
    </section>
  );
}
