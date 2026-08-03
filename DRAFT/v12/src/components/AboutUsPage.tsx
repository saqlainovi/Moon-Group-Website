/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, Shield, Target, Users, Calendar, Briefcase, Eye } from 'lucide-react';

interface AboutUsPageProps {
  onNavigateToContact: () => void;
}

export default function AboutUsPage({ onNavigateToContact }: AboutUsPageProps) {
  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white pt-20">
      {/* Hero Banner Accent */}
      <div className="relative py-24 sm:py-32 bg-[#141416] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FF4A4F]/5 rounded-full filter blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10 text-center sm:text-left">
          <span className="font-mono text-xs text-[#FF4A4F] uppercase tracking-[0.25em] font-bold block mb-4">
            Established 1989
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-white max-w-4xl leading-tight">
            Our Legacy, Your Trust:<br />
            Four Decades of Excellence
          </h1>
          <p className="text-slate-400 font-light text-base sm:text-lg mt-6 max-w-2xl leading-relaxed">
            Moon Builders is the premier real estate and structural construction pioneer of Moon Group of Industries, delivering state-of-the-art residential landmarks, high-speed corporate towers, and BUET-approved industrial zones across Bangladesh.
          </p>
        </div>
      </div>

      {/* Corporate Foundation Section */}
      <section className="py-20 max-w-[1360px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs text-yellow-600 uppercase tracking-widest font-bold block">
              FOUNDING VISIONARY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
              A Legacy of Construction Leadership
            </h2>
            <div className="space-y-4 text-slate-300 font-light text-sm sm:text-base leading-relaxed">
              <p>
                Founded in 1989 under the visionary stewardship of Al-haj Mizanur Rahman, Moon Group of Industries started with a humble dream: to shape the skyline of Bangladesh with unwavering engineering precision, transparency, and architectural brilliance.
              </p>
              <p>
                Over the last 37 years, that single vision blossomed into a colossal conglomerate comprising 19 sister concerns and active representation across 11 critical sectors including steel rolling, ready-mix concrete, chemical logistics, high-density residential developments, and infrastructure leasing.
              </p>
              <p>
                Moon Builders remains the crown jewel of our group. By enforcing strict BUET structural inspections, utilizing 72-grade reinforced steel, and partnering with world-renowned design visionaries like Arshi Haider, we provide an unparalleled combination of luxury and absolute seismic-safe living.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] bg-neutral-900 border border-white/10 overflow-hidden group rounded-sm">
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=600&auto=format&fit=crop" 
                alt="Construction site" 
                className="w-full h-full object-cover filter contrast-[1.05] brightness-90 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-sm border border-white/10 rounded-sm">
                <span className="text-[10px] font-mono text-[#FF4A4F] uppercase font-bold tracking-widest">Ongoing Inspection</span>
                <p className="text-xs text-white mt-1">BUET consultants validating load capacity on our active foundation pilings in Dhaka.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Values */}
      <section className="py-20 bg-[#141416] border-y border-white/5">
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs text-[#FF4A4F] uppercase tracking-[0.2em] font-bold block mb-3">
              OUR GUIDING LIGHTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
              Mission, Vision & Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1C1C1E] border border-white/5 p-8 rounded-sm hover:border-[#FF4A4F]/20 transition-colors">
              <div className="w-12 h-12 rounded bg-[#FF4A4F]/10 flex items-center justify-center text-[#FF4A4F] mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                To build structural masterpieces that integrate smart space utilization, maximize ecological cross-ventilation, and stand as impenetrable fortresses of safety for the elite families of Bangladesh.
              </p>
            </div>

            <div className="bg-[#1C1C1E] border border-white/5 p-8 rounded-sm hover:border-yellow-500/20 transition-colors">
              <div className="w-12 h-12 rounded bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                To transform Dhaka's skylines by merging modern parametric architectural aesthetics with rigorous sustainable structural engineering, creating an unshakeable legacy of real estate trust.
              </p>
            </div>

            <div className="bg-[#1C1C1E] border border-white/5 p-8 rounded-sm hover:border-blue-500/20 transition-colors">
              <div className="w-12 h-12 rounded bg-blue-500/10 flex items-center justify-center text-blue-500 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">Engineering Integrity</h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                Zero tolerance for structural compromises. We enforce double-checked BUET civil certifications, 100% legal land acquisition, and complete regulatory clearances on every development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial Strengths & Infrastructure */}
      <section className="py-20 max-w-[1360px] mx-auto px-6 sm:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs text-[#FF4A4F] uppercase tracking-[0.2em] font-bold block mb-3">
            VERTICAL INTEGRATION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
            Our Self-Sustaining Industrial Backbone
          </h2>
          <p className="text-sm text-slate-400 font-light mt-3">
            Unlike other developers who outsource core manufacturing, Moon Group operates its own internal industrial plants, ensuring unrivaled material quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#141416] border border-white/5 p-6 rounded-sm text-center">
            <span className="font-serif text-3xl font-extrabold text-[#FF4A4F] block mb-2">01</span>
            <h4 className="font-bold text-sm text-white mb-2">Ready-Mix Concrete Plant</h4>
            <p className="text-xs text-slate-400 leading-normal">High-strength computer-batched concrete mixtures delivered on site for continuous slab casting.</p>
          </div>

          <div className="bg-[#141416] border border-white/5 p-6 rounded-sm text-center">
            <span className="font-serif text-3xl font-extrabold text-yellow-600 block mb-2">02</span>
            <h4 className="font-bold text-sm text-white mb-2">Steel Re-Rolling Mills</h4>
            <p className="text-xs text-slate-400 leading-normal">Specialized manufacturing of earthquake-resistant 72G grade high-yield deformed steel rebar.</p>
          </div>

          <div className="bg-[#141416] border border-white/5 p-6 rounded-sm text-center">
            <span className="font-serif text-3xl font-extrabold text-blue-500 block mb-2">03</span>
            <h4 className="font-bold text-sm text-white mb-2">Eco-Brick Manufacturing</h4>
            <p className="text-xs text-slate-400 leading-normal">Fully automated hollow concrete block production line reducing building load and environmental footprint.</p>
          </div>

          <div className="bg-[#141416] border border-white/5 p-6 rounded-sm text-center">
            <span className="font-serif text-3xl font-extrabold text-emerald-500 block mb-2">04</span>
            <h4 className="font-bold text-sm text-white mb-2">Logistics & Heavy Cranes</h4>
            <p className="text-xs text-slate-400 leading-normal">An extensive internal fleet of tower cranes, batch mixers, excavators, and mechanical pumps.</p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-gradient-to-r from-red-950/20 to-neutral-950 border-t border-white/5 py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h3 className="font-serif text-2xl sm:text-3xl font-semibold mb-4">Would you like to build with us?</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-8">
            Partner with Bangladesh's most trusted real estate brand today for a joint venture, land acquisition proposal, or luxury residential purchase.
          </p>
          <button
            onClick={onNavigateToContact}
            className="px-8 py-3.5 bg-[#FF4A4F] hover:bg-red-600 text-black font-bold uppercase text-xs tracking-widest rounded-sm transition-colors duration-300 cursor-pointer"
          >
            Connect With Our Executives
          </button>
        </div>
      </section>
    </div>
  );
}
