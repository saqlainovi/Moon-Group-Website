/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Layers } from 'lucide-react';
import { CMSGroupConcern } from '../lib/cms';
import { useTheme } from '../context/ThemeContext';

interface GroupConcernsProps {
  concernsList?: CMSGroupConcern[];
}

export default function GroupConcerns({ concernsList }: GroupConcernsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const defaultConcerns = [
    { num: '01', name: 'Madina Properties & Housing Ltd', desc: 'Real Estate — Est. 1989' },
    { num: '02', name: 'The Moon Construction', desc: 'Infrastructure & Engineering' },
    { num: '03', name: 'Bidhilipi Constructions Ltd', desc: 'Commercial Developments' },
    { num: '04', name: 'Sun Moon Star Real Estate Int\'l', desc: 'Premium Housing — Est. 2003' },
    { num: '05', name: 'Moon Bangladesh Limited', desc: 'Global Logistics & Trading — Est. 1994' },
    { num: '06', name: 'Moon Int\'l Garments & Textile', desc: 'High-Scale Textile Production' },
    { num: '07', name: 'Sun Moon Star Int\'l Hotel', desc: 'Luxury Corporate Hospitality' },
    { num: '08', name: 'South Bangla Agriculture & Commerce Bank', desc: 'Banking & Financial Synergies' },
    { num: '09', name: 'The Daily Bartoman', desc: 'National Daily Newspaper — Est. 2013' },
    { num: '10', name: 'Moon International Printing Press Ltd', desc: 'Industrial Printing & Press — Est. 2005' },
  ];

  const concerns = concernsList && concernsList.length > 0 ? concernsList : defaultConcerns;

  return (
    <section id="verticals" className="relative py-28 bg-[#0B0B0C] border-t border-white/10 overflow-hidden">
      {/* Custom low angle perspective building drawing background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img 
          src="https://lh3.googleusercontent.com/d/1hJS7jjTsKMEWK2Ki6PBHWGbRzKQGLeda" 
          alt="Architectural Low Angle Perspective Blueprint" 
          className={`w-full h-full object-cover object-center transition-all duration-500 ${
            isDark ? 'opacity-[0.1] invert brightness-125' : 'opacity-[0.15] mix-blend-multiply'
          }`}
          referrerPolicy="no-referrer"
        />
        {/* Ambient background gradients for smooth edges */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-b from-[#0b0b0c]/95 via-[#0b0b0c]/75 to-[#0b0b0c]/95' 
            : 'bg-gradient-to-b from-[#FAF6EE]/95 via-[#FAF6EE]/75 to-[#FAF6EE]/95'
        }`} />
      </div>

      {/* Structural blueprint lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(216,216,214,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(216,216,214,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-50 z-[1]"></div>

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#EE1B24]"></span>
              <span className="font-mono text-xs tracking-[0.2em] text-[#FF4A4F] uppercase font-bold">
                The Wider Group
              </span>
            </div>
            <h2 className="font-serif text-5xl sm:text-6xl text-white leading-[0.95] tracking-tight">
              ONE CONGLOMERATE,<br />MANY CONCERNS.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#D8D8D6] text-sm sm:text-base font-light leading-relaxed">
              Moon Builders draws structural backing, financial liquidity, and material synergy from Moon Group of Industries—a massive multi-sector network serving Bangladesh since 1989.
            </p>
          </div>
        </div>

        {/* Verticals/Sister Concerns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {concerns.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-[#161617] border border-white/5 p-8 flex flex-col justify-between hover:border-[#EE1B24]/40 transition-colors duration-500 h-[200px]"
            >
              {/* Corner accent vector */}
              <div className="absolute w-4 h-4 border-t border-l border-[#EE1B24]/0 top-4 left-4 group-hover:border-[#EE1B24] transition-all duration-300"></div>

              {/* Number index and logo */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-3xl text-[#EE1B24]/30 group-hover:text-[#EE1B24] transition-colors duration-300 font-bold block">
                  {item.num}
                </span>
                <img 
                  src="https://lh3.googleusercontent.com/d/1r2nF28eVYOzAAWcsDYDo-ryA7wJ8u2QV"
                  referrerPolicy="no-referrer"
                  alt="Moon Group Logo"
                  className="h-8 w-auto object-contain shrink-0 opacity-40 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                />
              </div>

              {/* Details and Name */}
              <div className="space-y-2 mt-6">
                <h4 className="font-serif text-2xl text-white group-hover:text-[#FF4A4F] transition-colors duration-300 uppercase leading-tight font-bold">
                  {item.name}
                </h4>
                <p className="font-mono text-[10px] text-[#6B6B6A] uppercase tracking-wider">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sub-group Marquee Badge */}
        <div className="mt-20 p-8 border border-white/5 bg-[#161617]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#EE1B24]/10 border border-[#EE1B24]/20 text-[#EE1B24] rounded-sm">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="block font-serif text-lg text-white font-bold uppercase tracking-wider">Consolidated Capitalization</span>
              <span className="block font-mono text-[10px] text-[#6B6B6A] uppercase">Full legal and financial integration</span>
            </div>
          </div>
          <a
            href="#contact"
            className="font-mono text-xs text-[#FF4A4F] hover:text-white transition-colors uppercase font-bold tracking-widest flex items-center gap-2"
          >
            <span>CONTACT OUR EXECUTIVES</span>
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}
