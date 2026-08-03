"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { company } from "@/data/company";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(contentRef.current?.children ?? [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-moon-navy">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
                alt="Moon Group construction excellence"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="image-overlay" />
            </div>
            <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-moon-gold p-6 md:p-8 rounded-sm">
              <p className="font-display text-4xl md:text-5xl font-bold text-moon-navy">
                25+
              </p>
              <p className="text-moon-navy/70 text-sm mt-1 uppercase tracking-wider">
                Years of Trust
              </p>
            </div>
          </div>

          <div ref={contentRef}>
            <p className="text-moon-gold text-sm tracking-[0.3em] uppercase mb-4">
              About Us
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 leading-tight">
              A Legacy of{" "}
              <span className="text-gradient-gold">Excellence</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-6">
              {company.description}
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              {company.legacy}
            </p>

            <div className="border-l-2 border-moon-gold pl-6 mb-8">
              <p className="text-white/50 text-sm uppercase tracking-wider mb-1">
                Chairman
              </p>
              <p className="font-display text-xl text-moon-gold">
                {company.chairman}
              </p>
              <p className="text-white/40 text-sm mt-1">{company.legalName}</p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-moon-gold hover:text-moon-gold-light transition-colors group"
            >
              <span className="font-semibold">Partner With Us</span>
              <span className="group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
