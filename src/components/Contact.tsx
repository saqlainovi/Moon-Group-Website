"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { company } from "@/data/company";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 bg-moon-navy-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <p className="contact-item text-moon-gold text-sm tracking-[0.3em] uppercase mb-4">
              Get in Touch
            </p>
            <h2 className="contact-item font-display text-3xl md:text-5xl font-bold mb-6">
              Let&apos;s Build{" "}
              <span className="text-gradient-gold">Together</span>
            </h2>
            <p className="contact-item text-white/60 leading-relaxed mb-10">
              Ready to find your dream home or partner on your next project?
              Reach out to Moon Group — we&apos;re here to help.
            </p>

            <div className="space-y-6">
              {[
                { label: "Hotline", value: company.contact.hotline },
                { label: "Phone", value: company.contact.phone },
                { label: "Email", value: company.contact.email },
                { label: "Address", value: company.contact.address },
              ].map((item) => (
                <div key={item.label} className="contact-item flex gap-4">
                  <div className="w-10 h-10 rounded-full border border-moon-gold/30 flex items-center justify-center shrink-0">
                    <span className="text-moon-gold text-xs">&#9679;</span>
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-white/90 mt-1">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="contact-item space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-5 py-4 bg-moon-navy border border-white/10 rounded-sm text-white placeholder:text-white/30 focus:border-moon-gold focus:outline-none transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full px-5 py-4 bg-moon-navy border border-white/10 rounded-sm text-white placeholder:text-white/30 focus:border-moon-gold focus:outline-none transition-colors"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full px-5 py-4 bg-moon-navy border border-white/10 rounded-sm text-white placeholder:text-white/30 focus:border-moon-gold focus:outline-none transition-colors"
            />
            <select
              className="w-full px-5 py-4 bg-moon-navy border border-white/10 rounded-sm text-white/70 focus:border-moon-gold focus:outline-none transition-colors appearance-none"
              defaultValue=""
            >
              <option value="" disabled>
                Interested In
              </option>
              <option value="residential">Residential Property</option>
              <option value="commercial">Commercial Space</option>
              <option value="investment">Investment Opportunity</option>
              <option value="partnership">Business Partnership</option>
            </select>
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-5 py-4 bg-moon-navy border border-white/10 rounded-sm text-white placeholder:text-white/30 focus:border-moon-gold focus:outline-none transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full py-4 bg-moon-gold text-moon-navy font-semibold rounded-sm hover:bg-moon-gold-light transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
