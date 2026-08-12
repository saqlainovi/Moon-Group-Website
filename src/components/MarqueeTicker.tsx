/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ChevronLeft, ChevronRight, BellRing, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MarqueeTicker({ siteSettings }: { siteSettings?: any }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const havenNoticeBangla = "📢 বিশেষ বিজ্ঞপ্তি: হেভেন টাওয়ার (HEAVEN TOWER) উদ্বোধন হয়েছে - বুকিং ও সেল চলছে! 🏢 ✦";
  const havenNoticeEnglish = "🔥 HEAVEN TOWER INAUGURATED - BOOKING & SALES NOW OPEN! ✦";

  const defaultItems = [
    havenNoticeBangla,
    havenNoticeEnglish,
    "REAL ESTATE ✦",
    "HOUSING ✦",
    "CONSTRUCTION ✦",
    "INTERIORS ✦",
    "COMMERCIAL SPACES ✦",
    "SINCE 1989 ✦",
  ];

  let rawTickerText = siteSettings?.tickerText || '';
  
  let items: string[];
  if (rawTickerText) {
    items = rawTickerText.split('✦').map((t: string) => t.trim()).filter((t: string) => t.length > 0).map((t: string) => t + ' ✦');
    const hasHaven = items.some((item: string) => item.toLowerCase().includes('heaven tower') || item.toLowerCase().includes('haven tower') || item.includes('হেভেন টাওয়ার'));
    if (!hasHaven) {
      items = [havenNoticeBangla, havenNoticeEnglish, ...items];
    }
  } else {
    items = defaultItems;
  }

  // Clean items for mobile view (remove trailing ✦ and spaces)
  const mobileCleanItems = items.map(t => (typeof t === 'string' ? t.replace(/✦$/, '').trim() : ''));

  // Repeated items for seamless scrolling marquee on PC
  const repeatedItems = Array(12).fill(items).flat();
  const duration = siteSettings?.tickerSpeed || 28;

  // State for mobile slider
  const [currentMobileIdx, setCurrentMobileIdx] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentMobileIdx(prev => (prev + 1) % mobileCleanItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [mobileCleanItems.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentMobileIdx(prev => (prev + 1) % mobileCleanItems.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentMobileIdx(prev => (prev - 1 + mobileCleanItems.length) % mobileCleanItems.length);
  };

  // Variants for slide-in animations
  const slideVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        y: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -30 : 30,
      opacity: 0,
      scale: 0.95,
      transition: {
        y: { type: "spring", stiffness: 300, damping: 25 },
        opacity: { duration: 0.25 }
      }
    })
  };

  return (
    <div id="marquee-ticker" className="relative w-full overflow-hidden border-t border-b z-10 select-none shadow-sm">
      {/* 💻 DESKTOP VIEW: Continuous Horizontal Marquee */}
      <div className="hidden md:block py-3">
        <div 
          className="marquee-wrapper flex whitespace-nowrap hover:[animation-play-state:paused] active:[animation-play-state:paused]"
          style={{ animationDuration: `${duration}s` }}
        >
          <div className="flex gap-4 items-center">
            {repeatedItems.map((text, idx) => {
              const isNotice = text.includes('HEAVEN TOWER') || text.includes('HAVEN TOWER') || text.includes('হেভেন টাওয়ার');
              return (
                <span
                  key={idx}
                  className={`font-mono text-xs tracking-widest uppercase mx-3 px-3 py-1 rounded-md transition-all inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    isNotice
                      ? 'marquee-notice-badge font-extrabold animate-pulse'
                      : 'marquee-standard-text font-extrabold'
                  }`}
                >
                  {text}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* 📱 MOBILE VIEW: Premium Thicker Animated Live Announcement Board */}
      <div className="block md:hidden py-4 px-4 bg-gradient-to-r from-red-600/5 via-transparent to-red-600/5">
        <div className={`relative p-4 rounded-xl border flex flex-col gap-4 shadow-lg backdrop-blur-md overflow-hidden ${
          isDark 
            ? 'bg-stone-900/90 border-red-500/20 shadow-red-500/5' 
            : 'bg-white/95 border-red-200 shadow-stone-200/50'
        }`}>
          {/* Top Row: Glowing badge & manual controllers */}
          <div className="flex items-center justify-between">
            {/* Pulsing Alert Live Badge with high visual priority */}
            <div className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-md shadow-red-600/25">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <BellRing className="w-3.5 h-3.5 animate-bounce" />
              <span>বিজ্ঞপ্তি • Live Alert</span>
            </div>

            {/* Quick action controllers */}
            <div className={`flex items-center gap-2 px-2 py-1 rounded-full border ${
              isDark ? 'bg-stone-950/80 border-stone-800' : 'bg-stone-100/80 border-stone-200'
            }`}>
              <button 
                onClick={handlePrev}
                className={`p-1 rounded-full transition-all active:scale-90 ${
                  isDark ? 'text-stone-400 hover:text-white hover:bg-stone-800' : 'text-stone-600 hover:text-black hover:bg-stone-200'
                }`}
                title="Previous Announcement"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className={`text-[10px] font-mono tracking-widest font-black ${
                isDark ? 'text-stone-400' : 'text-stone-600'
              }`}>
                {currentMobileIdx + 1}/{mobileCleanItems.length}
              </span>
              <button 
                onClick={handleNext}
                className={`p-1 rounded-full transition-all active:scale-90 ${
                  isDark ? 'text-stone-400 hover:text-white hover:bg-stone-800' : 'text-stone-600 hover:text-black hover:bg-stone-200'
                }`}
                title="Next Announcement"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Core Text Section: Thicker design with Framer Motion slide-in animations */}
          <div className="relative min-h-[56px] flex items-center justify-center px-1">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentMobileIdx}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full text-center"
              >
                {(() => {
                  const text = mobileCleanItems[currentMobileIdx];
                  const isNotice = text.includes('HEAVEN TOWER') || text.includes('HAVEN TOWER') || text.includes('হেভেন টাওয়ার');
                  return (
                    <p className={`text-[13px] leading-relaxed font-sans font-bold tracking-wide select-none ${
                      isNotice 
                        ? 'text-red-500 font-black drop-shadow-[0_1px_10px_rgba(239,68,68,0.1)] px-2' 
                        : isDark ? 'text-stone-100' : 'text-stone-900'
                    }`}>
                      {text}
                    </p>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Row: Minimalist Slide Progress Indicators (Dots) */}
          <div className="flex justify-center gap-1.5 pt-1">
            {mobileCleanItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentMobileIdx ? 1 : -1);
                  setCurrentMobileIdx(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentMobileIdx
                    ? 'w-5 bg-red-500'
                    : `w-1.5 ${isDark ? 'bg-stone-700 hover:bg-stone-600' : 'bg-stone-300 hover:bg-stone-400'}`
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .marquee-wrapper {
          animation: marquee linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
