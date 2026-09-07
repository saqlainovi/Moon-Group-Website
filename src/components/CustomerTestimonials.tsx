/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, Award } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { getCMSTestimonials, CMSTestimonial } from '../lib/cms';

export default function CustomerTestimonials() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [testimonials, setTestimonials] = useState<CMSTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileIndex, setMobileIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchReviews = async () => {
      try {
        const list = await getCMSTestimonials();
        if (isMounted) {
          setTestimonials(list);
          setIsLoading(false);
        }
      } catch (err) {
        console.warn('Could not load testimonials:', err);
        if (isMounted) setIsLoading(false);
      }
    };
    fetchReviews();

    // Listen for storage changes if user updates in CMS
    const handleStorageChange = () => {
      fetchReviews();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      isMounted = false;
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Split testimonials into Row 1 and Row 2 for marquee effect
  const row1 = testimonials.filter((_, idx) => idx % 2 === 0);
  const row2 = testimonials.filter((_, idx) => idx % 2 === 1);

  // Helper to multiply short lists so marquee infinite loop looks smooth
  const multiplyForLoop = (arr: CMSTestimonial[]) => {
    if (arr.length === 0) return [];
    if (arr.length === 1) return [arr[0], arr[0], arr[0], arr[0], arr[0], arr[0]];
    if (arr.length === 2) return [...arr, ...arr, ...arr];
    return [...arr, ...arr];
  };

  const repeatedRow1 = multiplyForLoop(row1.length > 0 ? row1 : testimonials);
  const repeatedRow2 = multiplyForLoop(row2.length > 0 ? row2 : testimonials);

  const handlePrevMobile = () => {
    if (testimonials.length === 0) return;
    setMobileIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNextMobile = () => {
    if (testimonials.length === 0) return;
    setMobileIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentMobile = testimonials[mobileIndex] || null;

  const renderStars = (ratingCount: number = 5) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < ratingCount ? 'text-amber-400 fill-amber-400' : 'text-stone-300 dark:text-stone-700'
          }`}
        />
      );
    }
    return <div className="flex items-center space-x-1">{stars}</div>;
  };

  return (
    <section id="testimonials" className={`py-20 relative overflow-hidden border-t select-none transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-white border-white/5' : 'bg-[#FAF6EE] text-[#2B251F] border-stone-300/60'
    }`}>
      {/* Dynamic atmospheric backdrops */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-[#FF4A4F]/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[500px] h-[500px] bg-amber-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 mb-12 relative z-10">
        <span className="font-mono text-xs text-[#FF4A4F] uppercase tracking-[0.25em] font-bold block mb-3">
          TRUSTED BY BANGLADESH'S ELITE
        </span>
        <h2 className={`font-serif text-3xl sm:text-5xl font-medium tracking-tight ${isDark ? 'text-white' : 'text-stone-900'}`}>
          What do our customers say?
        </h2>
        <p className={`font-light text-sm sm:text-base mt-3 max-w-2xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
          Read genuine feedback and star ratings from our residential homeowners, joint-venture landowners, commercial partners, and industrial clients.
        </p>
      </div>

      {isLoading ? (
        <div className="max-w-md mx-auto py-12 text-center relative z-10">
          <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-400 font-mono">Loading reviews & ratings...</p>
        </div>
      ) : testimonials.length === 0 ? (
        /* Empty state when demo reviews are removed and no admin reviews are uploaded yet */
        <div className="max-w-2xl mx-auto px-6 relative z-10">
          <div className={`p-8 sm:p-12 rounded-2xl border text-center shadow-xl backdrop-blur-sm ${
            isDark ? 'bg-[#141416]/90 border-white/10 text-white' : 'bg-white/90 border-stone-300 text-stone-900'
          }`}>
            <Award className="w-12 h-12 text-amber-500 mx-auto mb-4 animate-bounce" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2">
              গ্রাহকের মতামত ও রেটিং সেকশন
            </h3>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-lg mx-auto mb-6 ${
              isDark ? 'text-slate-300' : 'text-stone-600'
            }`}>
              ডেমো রিভিউসমূহ সরিয়ে দেওয়া হয়েছে। অ্যাডমিন সিএমএস (Admin CMS)-এর <span className="font-bold text-[#EE1B24]">"Customer Reviews (রিভিউ ও রেটিং)"</span> ট্যাবে গিয়ে নতুন গ্রাহকদের ছবি, রিভিউ বক্তব্য ও রেটিং যুক্ত করুন।
            </p>
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-500 text-xs font-mono font-semibold">
              <Star className="w-4 h-4 fill-amber-500" />
              <span>Admin CMS Available for Customer Reviews</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* MOBILE VIEW: Mini Touch Slider (Block on Mobile, Hidden on Desktop) */}
          {currentMobile && (
            <div className="block md:hidden px-4 relative z-10">
              <div className={`p-6 rounded-xl border shadow-xl transition-all duration-300 ${
                isDark ? 'bg-[#161618] border-white/10 text-white' : 'bg-white border-stone-300 text-stone-900'
              }`}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#FF4A4F] uppercase">
                    {currentMobile.category || 'CUSTOMER REVIEW'}
                  </span>
                  <span className={`text-[9px] font-mono font-semibold ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                    {mobileIndex + 1} / {testimonials.length}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <Quote className="w-6 h-6 text-amber-500 rotate-180 shrink-0" />
                  {renderStars(currentMobile.rating || 5)}
                </div>

                {/* Framed picture inside card */}
                {currentMobile.image && (
                  <div className="relative aspect-[16/10] w-full mb-4 overflow-hidden rounded-lg border border-neutral-300 bg-neutral-200 shadow-sm">
                    <img
                      src={currentMobile.image}
                      alt={currentMobile.author}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter contrast-[1.02] brightness-95"
                    />
                  </div>
                )}

                <p className={`text-xs sm:text-sm leading-relaxed italic mb-5 ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
                  "{currentMobile.quote}"
                </p>

                <div className={`border-t pt-3 flex items-center justify-between ${isDark ? 'border-white/10' : 'border-stone-200'}`}>
                  <div>
                    <h4 className={`font-serif text-sm font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      {currentMobile.author}
                    </h4>
                    <p className={`text-[11px] font-sans font-medium mt-0.5 ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                      {currentMobile.role} {currentMobile.project ? `— ${currentMobile.project}` : ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Controls */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={handlePrevMobile}
                  className={`p-2.5 rounded-full border shadow-md flex items-center justify-center transition-all cursor-pointer ${
                    isDark ? 'bg-white/10 text-white border-white/10 hover:bg-white/20' : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Bullet dots */}
                <div className="flex gap-1.5 overflow-x-auto max-w-[200px] px-2 py-1">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setMobileIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer shrink-0 ${
                        mobileIndex === idx ? 'w-5 bg-[#FF4A4F]' : `w-2 ${isDark ? 'bg-white/20' : 'bg-stone-300'}`
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextMobile}
                  className={`p-2.5 rounded-full border shadow-md flex items-center justify-center transition-all cursor-pointer ${
                    isDark ? 'bg-white/10 text-white border-white/10 hover:bg-white/20' : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* DESKTOP VIEW: Testimonials Marquee Rows Grid Container (Hidden on Mobile, Block on MD+) */}
          <div className="hidden md:block space-y-8 relative z-10 overflow-hidden w-full">
            
            {/* ROW 1: LEFT-TO-RIGHT (LTR) Auto-scrolling */}
            {repeatedRow1.length > 0 && (
              <div className="relative w-full overflow-hidden py-2">
                <div className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r ${isDark ? 'from-[#0B0B0C]' : 'from-[#FAF6EE]'} to-transparent z-20 pointer-events-none`} />
                <div className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l ${isDark ? 'from-[#0B0B0C]' : 'from-[#FAF6EE]'} to-transparent z-20 pointer-events-none`} />

                <div className="flex whitespace-nowrap gap-6 animate-ltr hover-pause">
                  {repeatedRow1.map((t, idx) => (
                    <div
                      key={`r1-${t.id}-${idx}`}
                      className="w-[300px] sm:w-[350px] shrink-0 inline-block bg-[#F8F9FA] text-neutral-900 border border-neutral-200 rounded-lg p-5 sm:p-6 whitespace-normal shadow-md hover:shadow-xl hover:border-[#FF4A4F]/30 hover:scale-[1.01] transition-all duration-300"
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-mono font-bold tracking-widest text-[#FF4A4F] uppercase truncate max-w-[180px]">
                              {t.category || 'CUSTOMER REVIEW'}
                            </span>
                            {renderStars(t.rating || 5)}
                          </div>

                          <Quote className="w-5 h-5 text-amber-500 rotate-180 shrink-0 mb-2" />

                          {t.image && (
                            <div className="relative aspect-[16/10] w-full mb-4 overflow-hidden rounded border border-neutral-300 bg-neutral-200">
                              <img
                                src={t.image}
                                alt={t.author}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover filter contrast-[1.02] brightness-95"
                              />
                            </div>
                          )}

                          <p className="text-[12px] leading-relaxed text-neutral-700 font-light italic mb-4">
                            "{t.quote}"
                          </p>
                        </div>

                        <div className="border-t border-neutral-200 pt-3 mt-auto">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-serif text-[13px] font-bold text-neutral-900">
                                {t.author}
                              </h4>
                              <p className="text-[10px] font-sans font-medium text-neutral-500 mt-0.5">
                                {t.role} {t.project ? `— ${t.project}` : ''}
                              </p>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-neutral-900 text-amber-400 flex items-center justify-center text-[9px] font-bold shadow shrink-0">
                              M
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ROW 2: RIGHT-TO-LEFT (RTL) Auto-scrolling if enough items or duplicated */}
            {repeatedRow2.length > 0 && (
              <div className="relative w-full overflow-hidden py-2">
                <div className={`absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r ${isDark ? 'from-[#0B0B0C]' : 'from-[#FAF6EE]'} to-transparent z-20 pointer-events-none`} />
                <div className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l ${isDark ? 'from-[#0B0B0C]' : 'from-[#FAF6EE]'} to-transparent z-20 pointer-events-none`} />

                <div className="flex whitespace-nowrap gap-6 animate-rtl hover-pause">
                  {repeatedRow2.map((t, idx) => (
                    <div
                      key={`r2-${t.id}-${idx}`}
                      className="w-[300px] sm:w-[350px] shrink-0 inline-block bg-[#F8F9FA] text-neutral-900 border border-neutral-200 rounded-lg p-5 sm:p-6 whitespace-normal shadow-md hover:shadow-xl hover:border-amber-500/40 hover:scale-[1.01] transition-all duration-300"
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-mono font-bold tracking-widest text-amber-600 uppercase truncate max-w-[180px]">
                              {t.category || 'VERIFIED FEEDBACK'}
                            </span>
                            {renderStars(t.rating || 5)}
                          </div>

                          <Quote className="w-5 h-5 text-amber-500 rotate-180 shrink-0 mb-2" />

                          {t.image && (
                            <div className="relative aspect-[16/10] w-full mb-4 overflow-hidden rounded border border-neutral-300 bg-neutral-200">
                              <img
                                src={t.image}
                                alt={t.author}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover filter contrast-[1.02] brightness-95"
                              />
                            </div>
                          )}

                          <p className="text-[12px] leading-relaxed text-neutral-700 font-light italic mb-4">
                            "{t.quote}"
                          </p>
                        </div>

                        <div className="border-t border-neutral-200 pt-3 mt-auto">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-serif text-[13px] font-bold text-neutral-900">
                                {t.author}
                              </h4>
                              <p className="text-[10px] font-sans font-medium text-neutral-500 mt-0.5">
                                {t.role} {t.project ? `— ${t.project}` : ''}
                              </p>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-neutral-900 text-[#FF4A4F] flex items-center justify-center text-[9px] font-bold shadow shrink-0">
                              M
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </>
      )}

      {/* Styled custom infinite scrolling animation classes */}
      <style>{`
        @keyframes marquee-ltr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }

        @keyframes marquee-rtl {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .animate-ltr {
          animation: marquee-ltr 42s linear infinite;
        }

        .animate-rtl {
          animation: marquee-rtl 42s linear infinite;
        }

        .hover-pause:hover {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  );
}
