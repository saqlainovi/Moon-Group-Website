/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MapPin, Building, ChevronLeft, ChevronRight, Search, Calendar, Home } from 'lucide-react';
import { CMSHeroSlide } from '../lib/cms';
import { getFitClass, getPositionClass } from '../lib/imageUtils';

interface HeroSliderProps {
  onSearchProperties: (filters: { type: string; status: string; area: string }) => void;
  onExploreProperties: () => void;
  slidesList?: CMSHeroSlide[];
}

const defaultSlides: any[] = [
  {
    id: 'haven-tower',
    title: 'Heaven Tower',
    subtitle: 'Newly Inaugurated - Main Flagship Landmark',
    location: 'Plot 01, Section 12, Mirpur, Dhaka',
    area: 'Mirpur, Dhaka',
    type: 'residential',
    status: 'ongoing',
    description: '★ MAIN ATTRACTION - HEAVEN TOWER INAUGURATED! Moon Group’s flagship architectural masterpiece featuring double-height atrium lobby, rooftop sky infinity pool, high-speed elevators, Zone-4 earthquake resistance, and smart home luxury. Booking & sales now open!',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    tag: '🔥 FLAGSHIP PROJECT - NOW OPEN FOR BOOKING',
    price: 'Tk 2.2 - 5.5 Crore',
    stats: { beds: '4 Beds', baths: '4 Baths', size: '1,850 - 3,600 Sft' }
  },
  {
    id: 'moon-skyline-horizon',
    title: 'Moon Skyline Horizon',
    subtitle: 'Redefining Urban Majesty',
    location: 'Road 54, Gulshan 2, Dhaka',
    area: 'Gulshan, Dhaka',
    type: 'residential',
    status: 'ongoing',
    description: 'An architectural masterwork soaring into the Dhaka skyline. Moon Skyline Horizon redefines urban luxury with towering architectural grandeur, cantilevered garden terraces, and majestic 270-degree views of Gulshan Lake.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1ipWRwMZ9rmEX0zlwXwZKj-AsRRipCuim',
    tag: 'Flagship Residential',
    price: 'Tk 6.5 - 9.8 Crore',
    stats: { beds: '4 Beds', baths: '5 Baths', size: '3,250 - 4,800 Sft' }
  },
  {
    id: 'moon-imperial-residence',
    title: 'Moon Imperial Residence',
    subtitle: 'Crafted Interior Masterpiece',
    location: 'Road 11, Banani, Dhaka',
    area: 'Banani, Dhaka',
    type: 'residential',
    status: 'completed',
    description: 'An oasis of refined luxury. Designed by internationally acclaimed architects, Moon Imperial Residence merges premium marble finishing, expansive floor-to-ceiling panoramic glass, and a boutique community ambiance in the heart of Banani.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1z0rDLW4oNG-6S1PgrPxw0sIJXjUy22il',
    tag: 'Completed Masterpiece',
    price: 'Tk 5.8 - 8.2 Crore',
    stats: { beds: '3 Beds', baths: '4 Baths', size: '2,800 - 3,600 Sft' }
  },
  {
    id: 'moon-corporate-plaza',
    title: 'Moon Corporate Plaza',
    subtitle: 'Grade-A Smart Office Tower',
    location: 'Kamal Ataturk Avenue, Banani, Dhaka',
    area: 'Banani, Dhaka',
    type: 'commercial',
    status: 'ongoing',
    description: 'The future of corporate excellence. Moon Corporate Plaza is a highly sophisticated, Grade-A smart office tower offering multi-tiered structural redundancy, high-speed capsule elevators, and spectacular double-height commercial lobbies.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1XwSyxMxjuTIj8IDAoAjfwv1o_pbAVvMV',
    tag: 'Premium Commercial',
    price: 'Price on Request',
    stats: { levels: '30 Floors', parking: '5 Basements', size: '4,500 - 15,000 Sft' }
  },
  {
    id: 'moon-garden-penthouse',
    title: 'Moon Garden Penthouse',
    subtitle: 'Botanical Sky Sanctuaries',
    location: 'Diplomatic Zone, Baridhara, Dhaka',
    area: 'Baridhara, Dhaka',
    type: 'residential',
    status: 'upcoming',
    description: 'Indulge in ultra-exclusive residential living. Set in the highly secured Baridhara Diplomatic Zone, these select luxury penthouses boast private lap pools, vast botanical sky gardens, and state-of-the-art security integration.',
    imageUrl: 'https://lh3.googleusercontent.com/d/1xZ7UnlKaachkZH2D6LWhAm_fNZrfKTYx',
    tag: 'Upcoming Signature',
    price: 'Tk 12.0 - 18.5 Crore',
    stats: { beds: '4 Beds', baths: '5 Baths', size: '4,500 - 6,200 Sft' }
  }
];

export default function HeroSlider({ onSearchProperties, onExploreProperties, slidesList }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterArea, setFilterArea] = useState('all');
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);

  const slides = slidesList !== undefined ? slidesList : defaultSlides;

  // Automatic slide rotation (resets whenever activeIndex updates)
  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex, slides.length]);

  const nextSlide = () => {
    if (slides.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) {
    return (
      <section className="relative w-full h-[60vh] min-h-[400px] bg-[#0B0B0C] flex items-center justify-center text-white">
        <div className="text-center p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-md max-w-md mx-4">
          <Building className="w-12 h-12 mx-auto text-red-500 mb-4 animate-pulse" />
          <h2 className="text-xl font-bold tracking-wider mb-2 uppercase">No Carousel Slides</h2>
          <p className="text-gray-400 text-sm">No slides available in the system. Add slides from the Admin Portal to display them here.</p>
        </div>
      </section>
    );
  }

  const handleHeroCtaClick = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative w-full h-[115vh] lg:h-[120vh] min-h-[750px] sm:min-h-[880px] lg:min-h-[960px] bg-[#0B0B0C] overflow-hidden flex items-center">
      {/* Background Slides and Image Cross-Fade Engine */}
      <div className="absolute inset-0 w-full h-full z-0 select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeIndex}-${slides[activeIndex]?.id || 'slide'}-${slides[activeIndex]?.imageUrl || ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Subtle Ken Burns Zoom Animation */}
            {slides[activeIndex]?.imageUrl && (
              <motion.img
                src={slides[activeIndex].imageUrl}
                alt={slides[activeIndex].title}
                className={`absolute inset-0 w-full h-full ${getFitClass(slides[activeIndex].imageFit)} ${getPositionClass(slides[activeIndex].imagePosition)} filter brightness-[1.05] contrast-[1.05] saturate-[1.05]`}
                initial={{ scale: 1.06 }}
                animate={{ scale: 1.0 }}
                transition={{ duration: 6, ease: 'easeOut' }}
                referrerPolicy="no-referrer"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modern Crystal Clear Low-Contrast Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0E]/75 via-[#0C0C0E]/30 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-black/20 z-10 pointer-events-none" />

      {/* Mini Progress Sidebar Tracker on Right Side */}
      <div className={`absolute right-8 lg:right-16 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col ${slides.length > 7 ? 'gap-2 max-h-[85vh] overflow-y-auto pr-2 scrollbar-none' : 'gap-6'}`}>
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setActiveIndex(idx)}
            className="flex items-center gap-4 group text-right focus:outline-none"
          >
            <div className="transition-all duration-300">
              <span className={`block text-xs font-mono tracking-widest ${activeIndex === idx ? 'text-[#FF4A4F] font-bold' : 'text-white/40 group-hover:text-white/80'}`}>
                {idx < 9 ? `0${idx + 1}` : idx + 1}
              </span>
              {slides.length <= 7 && (
                <span className={`block text-[10px] font-sans tracking-wide uppercase ${activeIndex === idx ? 'text-white' : 'text-white/20 group-hover:text-white/60'}`}>
                  {(slide.title || '').replace('Moon ', '')}
                </span>
              )}
            </div>
            <div className={`w-1 ${slides.length > 7 ? 'h-5' : 'h-12'} rounded-full transition-all duration-300 relative overflow-hidden ${activeIndex === idx ? 'bg-white/10' : 'bg-white/5'}`}>
              {activeIndex === idx && (
                <motion.div
                  className="absolute top-0 left-0 w-full bg-[#EE1B24]"
                  initial={{ height: 0 }}
                  animate={{ height: '100%' }}
                  transition={{ duration: 6, ease: 'linear' }}
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Main Narrative Elements & Staggered Typography Overlays */}
      <div className="max-w-[1360px] mx-auto w-full px-6 sm:px-10 relative z-20 h-full flex items-center lg:items-center pt-28 sm:pt-32 lg:pt-36 pb-[160px] sm:pb-40 lg:pb-44">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center">
          
          {/* Carousel text content */}
          <div className="lg:col-span-12 space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                {/* Accent Highlight Tag - Positioned location here in place of the previous tag */}
                <div className="flex items-center gap-2 text-[#FF4A4F] bg-black/50 border border-[#EE1B24]/20 rounded-full px-4 py-1.5 w-fit shadow-lg backdrop-blur-sm">
                  <MapPin className="w-3.5 h-3.5 text-[#EE1B24] shrink-0 animate-bounce" />
                  <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#FF4A4F] uppercase font-black">
                    {slides[activeIndex].location || 'Dhaka, Bangladesh'}
                  </span>
                </div>

                {/* Main Heading styled elegantly with red color */}
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#EE1B24] leading-[1.05] tracking-tight uppercase font-extrabold">
                  {(slides[activeIndex]?.title || '').split(' ').map((word, i, arr) => {
                    const isLast = i === arr.length - 1;
                    return (
                      <span key={i} className="inline-block sm:block text-[#EE1B24] mr-1.5 sm:mr-0">
                        {isLast ? (
                          <span className="text-[#EE1B24] font-black">
                            {word}.
                          </span>
                        ) : (
                          word + ' '
                        )}
                      </span>
                    );
                  })}
                </h1>

                {/* Narrative Paragraph */}
                <p className="text-white/95 text-xs sm:text-sm lg:text-base leading-relaxed font-normal max-w-xl line-clamp-3 sm:line-clamp-none drop-shadow-md">
                  {slides[activeIndex].description}
                </p>

                {/* Specification Sheet overlay - Hidden on mobile to prioritize gallery view */}
                {slides[activeIndex].stats && Object.keys(slides[activeIndex].stats).length > 0 && (
                  <div className="hidden sm:flex flex-wrap gap-x-6 gap-y-3 text-white font-mono text-xs border-y border-white/10 py-4 max-w-xl">
                    {Object.entries(slides[activeIndex].stats).map(([key, value], idx) => (
                      <div key={key} className={`flex items-center gap-2 ${idx !== 0 ? 'border-l border-white/10 pl-4' : ''}`}>
                        <span className="text-white/60 capitalize">{key}:</span>
                        <span className="font-bold text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Custom-styled Luxury CTAs - Hidden on mobile to prioritize gallery view */}
                <div className="hidden sm:flex sm:flex-row gap-4 pt-2">
                  <a
                    href="#properties"
                    onClick={(e) => handleHeroCtaClick(e, 'properties')}
                    className="group px-8 py-3.5 bg-[#EE1B24] hover:bg-[#CC121A] text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-sm"
                  >
                    <span>EXPLORE PORTFOLIO</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-white" />
                  </a>
                  <a
                    href="#visit-booker"
                    onClick={(e) => handleHeroCtaClick(e, 'visit-booker')}
                    className="px-8 py-3.5 border border-white/20 hover:border-[#FF4A4F] text-white hover:text-white font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded-sm"
                  >
                    <span>SCHEDULE PRIVATE TOUR</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* Elegant Translucent Search Finder Widget Floating at the bottom */}
      <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-[#121214]/90 backdrop-blur-xl border border-white/10 p-4 sm:p-5 rounded-sm shadow-2xl transition-all duration-300">
            {/* Collapsible Trigger Header for Mobile */}
            <div 
              onClick={() => setIsMobileSearchExpanded(!isMobileSearchExpanded)}
              className="flex items-center justify-between cursor-pointer md:hidden pb-2 border-b border-white/5 mb-3"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-[#FF4A4F]" />
                <span className="font-mono text-[10px] font-bold text-white tracking-widest">FIND PROPERTIES</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono text-[#FF4A4F] bg-[#FF4A4F]/10 px-2 py-0.5 rounded-full font-bold">
                  {isMobileSearchExpanded ? 'COLLAPSE' : 'TAP TO FILTER'}
                </span>
                <motion.div
                  animate={{ rotate: isMobileSearchExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-white/40"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </div>
            </div>

            <div className={`${isMobileSearchExpanded ? 'block space-y-4' : 'hidden md:grid'} md:grid-cols-4 md:gap-4 md:items-center transition-all duration-300`}>
              {/* Select Location */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono text-[#6B6B6A] tracking-wider uppercase flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#FF4A4F]" /> Location
                </label>
                <select
                  value={filterArea}
                  onChange={(e) => setFilterArea(e.target.value)}
                  className="bg-black/50 border border-white/10 text-white text-xs rounded px-3 py-2.5 focus:outline-none focus:border-[#FF4A4F] transition-colors cursor-pointer w-full"
                >
                  <option value="all">All Locations</option>
                  <option value="Gulshan, Dhaka">Gulshan, Dhaka</option>
                  <option value="Banani, Dhaka">Banani, Dhaka</option>
                  <option value="Baridhara, Dhaka">Baridhara, Dhaka</option>
                </select>
              </div>

              {/* Select Type */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono text-[#6B6B6A] tracking-wider uppercase flex items-center gap-1.5">
                  <Building className="w-3 h-3 text-[#FF4A4F]" /> Property Type
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-black/50 border border-white/10 text-white text-xs rounded px-3 py-2.5 focus:outline-none focus:border-[#FF4A4F] transition-colors cursor-pointer w-full"
                >
                  <option value="all">All Types</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              {/* Select Status */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-[10px] font-mono text-[#6B6B6A] tracking-wider uppercase flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#FF4A4F]" /> Project Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-black/50 border border-white/10 text-white text-xs rounded px-3 py-2.5 focus:outline-none focus:border-[#FF4A4F] transition-colors cursor-pointer w-full"
                >
                  <option value="all">All Statuses</option>
                  <option value="completed">Completed</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>

              {/* Search button */}
              <div className="pt-2 md:pt-4">
                <button
                  onClick={() => {
                    onSearchProperties({ type: filterType, status: filterStatus, area: filterArea });
                    setIsMobileSearchExpanded(false);
                  }}
                  className="w-full bg-[#EE1B24] hover:bg-[#CC121A] text-white font-mono text-xs font-bold tracking-widest uppercase py-3 rounded-sm transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>FIND PROPERTIES</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
