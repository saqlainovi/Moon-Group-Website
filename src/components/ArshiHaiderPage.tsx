/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Heart, Sparkles, Milestone, GraduationCap, Building2, MapPin } from 'lucide-react';

interface ArshiHaiderPageProps {
  onNavigateToContact: () => void;
}

export default function ArshiHaiderPage({ onNavigateToContact }: ArshiHaiderPageProps) {
  const accolades = [
    {
      title: 'Architectural Consultant',
      desc: 'Advised and structuralized over 22 super-luxury high-rises across premium locations like Dhanmondi, Gulshan, and Banani.',
      icon: <Building2 className="w-5 h-5 text-[#FF4A4F]" />
    },
    {
      title: 'Safety-First Philosophy',
      desc: 'Actively monitors concrete core compressive strengths and soil compact tolerances certified under BUET structural guidelines.',
      icon: <ShieldCheck className="w-5 h-5 text-yellow-500" />
    },
    {
      title: 'Academic Credentials',
      desc: 'Prestigious BUET Alumni and proud registered member of the Institute of Architects Bangladesh (IAB).',
      icon: <GraduationCap className="w-5 h-5 text-blue-400" />
    }
  ];

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white pt-20 pb-28">
      
      {/* Page Header */}
      <div className="relative py-16 sm:py-20 bg-[#141416] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#FF4A4F]/5 rounded-full filter blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10 text-center sm:text-left">
          <span className="font-mono text-xs text-[#FF4A4F] uppercase tracking-[0.25em] font-bold block mb-3">
            Creative Leadership
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white max-w-4xl">
            Arshi Haider
          </h1>
          <p className="text-slate-400 font-light text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            Director of Architectural Design & Construction Integrity. Bridging structural safety with state-of-the-art modernist aesthetics.
          </p>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Picture and Headshot framing */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-[380px]">
              {/* Outer accent vector borders */}
              <div className="absolute -inset-2.5 border border-dashed border-white/10 group-hover:border-[#FF4A4F]/30 transition-colors pointer-events-none rounded-sm" />
              
              <div className="relative aspect-[4/5] overflow-hidden border border-white/10 rounded-sm bg-neutral-900">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" 
                  alt="Arshi Haider portrait headshot" 
                  className="w-full h-full object-cover filter contrast-[1.05] brightness-90 group-hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-[9px] font-mono tracking-widest uppercase bg-[#FF4A4F] text-black font-extrabold px-2.5 py-1 rounded-sm">
                    Registered IAB Architect
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs text-[#FF4A4F] font-mono uppercase tracking-[0.2em] font-bold block">
              DESIGN MANIFESTO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-white leading-tight">
              "Every structure must breathe and shelter generations."
            </h2>
            <p className="text-slate-300 font-light text-base sm:text-lg italic leading-relaxed">
              "Structural architecture is not merely about pouring concrete; it is the poetic balance of space, light, and safety. Every home must breathe, optimize natural cross-ventilation, and exceed standard seismic tolerances to shield the families that reside inside."
            </p>
            <div className="text-slate-400 text-xs sm:text-sm leading-relaxed space-y-4 font-light">
              <p>
                Arshi Haider coordinates the comprehensive blueprint development, layout design, and structural verification across all projects in our real estate wing. Under her direction, Moon Builders has transitioned to an offline-first architectural model optimizing daylight exposure, natural cross-ventilation flow, and dual-layer fire safety evacuations.
              </p>
              <p>
                In partnership with elite engineering consulting laboratories of the Bangladesh University of Engineering and Technology (BUET), she guarantees that each building skeleton maintains reinforced high-grade rebar support to comfortably withstand heavy seismological zones.
              </p>
            </div>
          </div>

        </div>

        {/* Accolades Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 pt-16 border-t border-white/5">
          {accolades.map((item, idx) => (
            <div key={idx} className="bg-[#141416] border border-white/5 p-6 rounded-sm">
              <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center mb-5 border border-white/10">
                {item.icon}
              </div>
              <h4 className="font-serif text-lg font-bold text-white mb-2">{item.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Portfolio Showroom */}
        <div className="mt-24 space-y-10">
          <div className="text-center sm:text-left">
            <span className="text-xs text-yellow-600 font-mono uppercase tracking-widest font-bold">
              PORTFOLIO SHOWCASE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mt-1">
              Selected Signature Projects
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-[#141416] border border-white/5 p-4 rounded overflow-hidden group">
              <div className="aspect-[4/3] rounded overflow-hidden mb-4 bg-neutral-900 border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=400&auto=format&fit=crop" 
                  alt="Skyline Horizon" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <h4 className="font-serif text-base font-bold text-white">Moon Skyline Horizon</h4>
              <p className="text-[11px] text-slate-400 mt-1">Gulshan-2 — Ultra Luxury 4BHK Sky Penthouses</p>
            </div>

            <div className="bg-[#141416] border border-white/5 p-4 rounded overflow-hidden group">
              <div className="aspect-[4/3] rounded overflow-hidden mb-4 bg-neutral-900 border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=400&auto=format&fit=crop" 
                  alt="Green Meadow" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <h4 className="font-serif text-base font-bold text-white">Moon Green Meadow</h4>
              <p className="text-[11px] text-slate-400 mt-1">Bashundhara R/A — Elite Duplex Garden Condos</p>
            </div>

            <div className="bg-[#141416] border border-white/5 p-4 rounded overflow-hidden group">
              <div className="aspect-[4/3] rounded overflow-hidden mb-4 bg-neutral-900 border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=400&auto=format&fit=crop" 
                  alt="Rose Villa" 
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
              <h4 className="font-serif text-base font-bold text-white">Moon Rose Villa</h4>
              <p className="text-[11px] text-slate-400 mt-1">Dhanmondi — Boutique High-Yield Estates</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 p-8 sm:p-12 bg-gradient-to-r from-red-950/20 to-neutral-950 rounded border border-white/10 text-center max-w-3xl mx-auto">
          <h3 className="font-serif text-xl sm:text-2xl font-bold mb-3">Request Architectural Consultation</h3>
          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed mb-6 max-w-lg mx-auto">
            Schedule a private sitting with Arshi Haider to design, verify, and project feasibility metrics for your joint-venture landowner estate.
          </p>
          <button
            onClick={onNavigateToContact}
            className="px-6 py-3 bg-[#FF4A4F] hover:bg-red-600 text-black font-bold uppercase text-xs tracking-widest rounded-sm transition-colors cursor-pointer"
          >
            Schedule Consultation Sitting
          </button>
        </div>

      </div>
    </div>
  );
}
