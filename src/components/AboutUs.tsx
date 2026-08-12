/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CMSAboutUs } from '../lib/cms';
import { useTheme } from '../context/ThemeContext';
import { getFitClass, getPositionClass } from '../lib/imageUtils';

interface AboutUsProps {
  aboutData?: CMSAboutUs | null;
}

export default function AboutUs({ aboutData }: AboutUsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [yearFounded, setYearFounded] = useState(0);
  const [sisterConcerns, setSisterConcerns] = useState(0);
  const [sectorsActive, setSectorsActive] = useState(0);

  const targetYear = aboutData?.yearFounded ?? 1983;
  const targetSisters = aboutData?.sisterConcernsCount ?? 19;
  const targetSectors = aboutData?.sectorsActiveCount ?? 11;

  useEffect(() => {
    // Simple pure React animation counters mimicking the anime.js behaviour
    let startTimestamp: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      setYearFounded(Math.floor(progress * targetYear));
      setSisterConcerns(Math.floor(progress * targetSisters));
      setSectorsActive(Math.floor(progress * targetSectors));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setYearFounded(targetYear);
        setSisterConcerns(targetSisters);
        setSectorsActive(targetSectors);
      }
    };

    window.requestAnimationFrame(step);
  }, [targetYear, targetSisters, targetSectors]);

  return (
    <section id="legacy" className={`relative py-28 overflow-hidden border-t border-b transition-colors duration-500 ${
      isDark 
        ? 'bg-[#161617] border-white/10' 
        : 'bg-[#FAF6EE] border-stone-200/80'
    }`}>
      {/* Structural blueprint grid lines */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(216,216,214,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(216,216,214,0.05)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-40 ${
        isDark ? 'mix-blend-normal' : 'mix-blend-multiply opacity-25'
      }`}></div>

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Industrial Legacy Media Card */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`relative aspect-[4/5] w-full overflow-hidden border group ${
              isDark ? 'border-white/10' : 'border-stone-300'
            }`}
          >
            <img 
              src={aboutData?.imageUrl || "https://images.unsplash.com/photo-1609867271967-a82f85c48531?fm=jpg&q=70&w=1400&auto=format&fit=crop"} 
              alt="Construction site with scaffolding and cranes" 
              loading="lazy"
              className={`w-full h-full filter grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out ${getFitClass(aboutData?.imageFit)} ${getPositionClass(aboutData?.imagePosition)}`}
            />
            {/* Corner accent vectors */}
            <div className="absolute w-8 h-8 border-t-2 border-l-2 border-[#EE1B24] top-5 left-5"></div>
            <div className="absolute w-8 h-8 border-b-2 border-r-2 border-[#EE1B24] bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="absolute left-0 bottom-0 bg-[#EE1B24] text-[#0B0B0C] font-mono text-xs font-bold tracking-widest uppercase py-3 px-5">
              ON SITE — DHAKA
            </div>
          </motion.div>

          {/* Right Column: Narrative Copy */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#EE1B24]"></span>
              <span className="font-mono text-xs tracking-[0.2em] text-[#FF4A4F] uppercase font-bold">
                {aboutData?.tagline || "A Legacy Since 1983"}
              </span>
            </div>

            <h2 className={`font-serif text-5xl sm:text-6xl leading-[0.95] tracking-tight whitespace-pre-line transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-[#2B251F]'
            }`}>
              {aboutData?.title || "FOUR DECADES OF\nBUILDING TRUST."}
            </h2>

            <div className={`space-y-6 text-base leading-relaxed font-light transition-colors duration-300 ${
              isDark ? 'text-[#D8D8D6]' : 'text-stone-600'
            }`}>
              <p>
                {aboutData?.paragraph1 || "Moon Builders is the construction and real estate arm of Moon Group of Industries, founded in 1983 under the visionary leadership of Al-haj Mizanur Rahman."}
              </p>
              {aboutData?.paragraph2 && (
                <p>
                  {aboutData.paragraph2}
                </p>
              )}
            </div>

            {/* Micro-stats row */}
            <div className={`grid grid-cols-3 gap-4 pt-10 border-t ${
              isDark ? 'border-white/10' : 'border-stone-200'
            }`}>
              <div className={`pr-4 border-r ${isDark ? 'border-white/10' : 'border-stone-200'}`}>
                <b className="block font-serif text-4xl sm:text-5xl text-[#FF4A4F] leading-none">
                  {yearFounded > 0 ? yearFounded : (aboutData?.yearFounded ?? 1989)}
                </b>
                <span className={`block mt-2 font-mono text-[10px] uppercase tracking-wider ${
                  isDark ? 'text-[#6B6B6A]' : 'text-stone-500'
                }`}>
                  Year Founded
                </span>
              </div>

              <div className={`px-2 pr-4 border-r ${isDark ? 'border-white/10' : 'border-stone-200'}`}>
                <b className="block font-serif text-4xl sm:text-5xl text-[#FF4A4F] leading-none">
                  {sisterConcerns > 0 ? sisterConcerns : (aboutData?.sisterConcernsCount ?? 19)}
                </b>
                <span className={`block mt-2 font-mono text-[10px] uppercase tracking-wider ${
                  isDark ? 'text-[#6B6B6A]' : 'text-stone-500'
                }`}>
                  Sister Concerns
                </span>
              </div>

              <div className="pl-2">
                <b className="block font-serif text-4xl sm:text-5xl text-[#FF4A4F] leading-none">
                  {sectorsActive > 0 ? sectorsActive : (aboutData?.sectorsActiveCount ?? 11)}+
                </b>
                <span className={`block mt-2 font-mono text-[10px] uppercase tracking-wider ${
                  isDark ? 'text-[#6B6B6A]' : 'text-stone-500'
                }`}>
                  Sectors Active
                </span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
