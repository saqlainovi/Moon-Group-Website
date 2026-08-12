/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { properties } from '../data/properties';
import { Property } from '../types';
import { Compass, Building, ChevronLeft, ChevronRight, MapPin, ZoomIn, Sparkles, Tag, X, ArrowUpRight, ShieldCheck, Hammer } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CMSSiteSettings } from '../lib/cms';
import gsap from 'gsap';

interface InteractiveTourProps {
  propertiesList?: Property[];
  siteSettings?: CMSSiteSettings | null;
}

export default function InteractiveTour({ propertiesList = [], siteSettings }: InteractiveTourProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Master property repository (fallback to default properties if empty)
  const tourProperties = propertiesList && propertiesList.length > 0 ? propertiesList : properties;
  const [activePropIndex, setActivePropIndex] = useState(0);
  const selectedProperty = tourProperties[activePropIndex];

  // Selected image index within the active property gallery
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Lightbox overlay state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Image ref for high-end GSAP 3D transformations
  const imageRef = useRef<HTMLDivElement>(null);

  // Fallback to primary imageUrl if gallery is empty
  const galleryImages = selectedProperty.gallery && selectedProperty.gallery.length > 0 
    ? selectedProperty.gallery 
    : [selectedProperty.imageUrl];

  // Reset image index when switching property
  useEffect(() => {
    setActiveImgIndex(0);
  }, [activePropIndex]);

  // GSAP 3D hardware-accelerated transformation when changing photos or properties
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { 
          opacity: 0, 
          scale: 0.95, 
          rotateY: 12,
          rotateX: 4,
          z: -60,
          filter: 'blur(8px)' 
        },
        { 
          opacity: 1, 
          scale: 1, 
          rotateY: 0,
          rotateX: 0,
          z: 0,
          filter: 'blur(0px)',
          duration: 0.7, 
          ease: 'power3.out' 
        }
      );
    }
  }, [activePropIndex, activeImgIndex]);

  const handlePrevImage = () => {
    setActiveImgIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImgIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  // Splitting properties for left and right columns (Symmetrical Layout)
  const half = Math.ceil(tourProperties.length / 2);
  const leftProperties = tourProperties.slice(0, half);
  const rightProperties = tourProperties.slice(half);

  // Helper to render vertical tab buttons with spring dynamics and layouts
  const renderTabButton = (prop: Property, globalIndex: number) => {
    const isSelected = activePropIndex === globalIndex;
    const formattedIndex = String(globalIndex + 1).padStart(2, '0');
    const isLeftColumn = globalIndex < half;

    return (
      <motion.button
        key={prop.id}
        onClick={() => setActivePropIndex(globalIndex)}
        whileHover={{ 
          scale: 1.03, 
          x: isLeftColumn ? 5 : -5,
          boxShadow: isDark 
            ? '0 10px 20px -10px rgba(238, 27, 36, 0.25)' 
            : '0 10px 20px -10px rgba(43, 37, 31, 0.15)'
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, x: isLeftColumn ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className={`w-full text-left px-4 py-4 rounded-xl text-xs transition-all duration-300 relative overflow-hidden flex flex-col gap-2.5 cursor-pointer border ${
          isSelected
            ? isDark
              ? 'bg-gradient-to-br from-[#1c1c1f] to-[#0c0c0d] text-white border-[#EE1B24] shadow-xl shadow-[#EE1B24]/10'
              : 'bg-gradient-to-br from-white to-stone-100 text-stone-950 border-[#EE1B24] font-bold shadow-md shadow-[#EE1B24]/5'
            : isDark
              ? 'bg-[#121214] text-slate-400 border-white/[0.04] hover:text-white hover:border-white/10 hover:bg-[#18181b]'
              : 'bg-white text-stone-600 border-stone-200 hover:text-stone-900 hover:border-stone-300 hover:bg-stone-50/80 hover:shadow-sm'
        }`}
      >
        {/* Animated Active Background Highlight */}
        {isSelected && (
          <motion.div
            layoutId="activeTabGlow"
            className="absolute inset-0 bg-gradient-to-r from-[#EE1B24]/8 via-[#EE1B24]/2 to-transparent z-0 pointer-events-none"
            initial={false}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
        
        {/* Symmetrical Vertical Glow Brackets flanking the central Gallery */}
        {isSelected && (
          <motion.div
            layoutId="activeTabBar"
            className={`absolute top-0 bottom-0 w-[3px] bg-[#EE1B24] z-10 shadow-[0_0_10px_rgba(238,27,36,0.5)] ${
              isLeftColumn ? 'right-0' : 'left-0'
            }`}
            initial={false}
          />
        )}

        <div className="relative z-10 w-full">
          {/* Header row with sequence index and custom status light indicator */}
          <div className="flex items-center justify-between w-full mb-1">
            <div className="flex items-center gap-1.5">
              <span className={`font-mono text-[9px] tracking-widest px-1.5 py-0.5 rounded font-black ${
                isSelected 
                  ? 'bg-[#EE1B24] text-white' 
                  : isDark 
                    ? 'bg-white/5 text-[#EE1B24]' 
                    : 'bg-stone-100 text-[#EE1B24]'
              }`}>
                #{formattedIndex}
              </span>
              <span className={`text-[8px] font-mono tracking-widest uppercase font-semibold ${
                isSelected ? 'text-[#EE1B24]' : 'opacity-50'
              }`}>
                {prop.type === 'commercial' ? 'Commercial' : 'Luxury'}
              </span>
            </div>

            {/* Micro Status Beacon */}
            <div className="flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full ${
                prop.status === 'ongoing' 
                  ? 'bg-emerald-500 animate-pulse' 
                  : prop.status === 'completed'
                  ? 'bg-blue-500'
                  : 'bg-amber-500'
              }`} />
              <span className="text-[8px] font-mono opacity-50 uppercase tracking-tight">
                {prop.status}
              </span>
            </div>
          </div>

          {/* Main Title text pairing */}
          <div className="flex flex-col items-start min-w-0 mt-2">
            <span className={`font-serif text-[13px] font-bold tracking-wide truncate w-full transition-colors ${
              isSelected ? 'text-[#EE1B24]' : isDark ? 'text-slate-200' : 'text-stone-850'
            }`}>
              {(prop.title || '').replace('Moon ', '')}
            </span>
            <span className={`text-[10px] font-sans truncate w-full mt-0.5 opacity-60`}>
              {(prop.location || '').split(',')[0]}
            </span>
          </div>

          {/* Decorative specs footer inside the button to enrich details */}
          <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/[0.03] dark:border-white/[0.03] border-stone-100">
            <span className="text-[9px] font-mono opacity-40">
              {prop.sizeRange?.split(' ')[0] || 'Premium'}
            </span>
            <Compass className={`w-3 h-3 transition-transform duration-700 ${
              isSelected ? 'rotate-45 text-[#EE1B24]' : 'opacity-20'
            }`} />
          </div>
        </div>
      </motion.button>
    );
  };

  return (
    <section id="interactive-tour" className={`py-24 transition-colors duration-500 relative overflow-hidden ${isDark ? 'bg-[#0B0B0C] text-white' : 'bg-[#FAF6EE] text-[#2B251F]'}`}>
      
      {/* Background Blueprint Aesthetics */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80" 
          alt="Section Background" 
          className={`w-full h-full object-cover object-center transition-all duration-500 ${
            isDark ? 'opacity-[0.02] invert brightness-125' : 'opacity-[0.05] mix-blend-multiply'
          }`}
          referrerPolicy="no-referrer"
        />
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-b from-[#0B0B0C]/90 via-[#0B0B0C]/85 to-[#0B0B0C]' 
            : 'bg-gradient-to-b from-[#FAF6EE]/90 via-[#FAF6EE]/85 to-[#FAF6EE]'
        }`} />
      </div>

      {/* Grid Overlay Lines */}
      <div className={`absolute inset-0 bg-[size:30px_30px] pointer-events-none select-none ${
        isDark 
          ? 'bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)]' 
          : 'bg-[linear-gradient(rgba(43,37,31,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(43,37,31,0.012)_1px,transparent_1px)]'
      }`} />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] tracking-[0.45em] text-[#EE1B24] font-black uppercase block mb-3 font-mono">
              {siteSettings?.portfolioSubheading || '★ CINEMATIC PORTFOLIO SHOWCASE'}
            </span>
            <h2 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight transition-colors ${isDark ? 'text-white' : 'text-[#2B251F]'}`}>
              {siteSettings?.portfolioHeading || 'Interactive Master Gallery'}
            </h2>
          </div>
        </div>

        {/* Mobile/Tablet Swipeable Tab Selector (Hidden on Desktop) */}
        <div className="lg:hidden mb-8">
          <span className="text-[10px] font-mono opacity-60 block uppercase mb-3 text-[#EE1B24] font-bold">
            Select Project ({tourProperties.length})
          </span>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-3 snap-x scrollbar-thin scrollbar-thumb-[#EE1B24]/30">
            {tourProperties.map((prop, index) => {
              const isSelected = activePropIndex === index;
              return (
                <button
                  key={prop.id}
                  onClick={() => setActivePropIndex(index)}
                  className={`px-4.5 py-2.5 rounded-full text-[11px] uppercase font-bold tracking-wider shrink-0 snap-center border transition-all duration-300 ${
                    isSelected
                      ? 'bg-[#EE1B24] text-white border-[#EE1B24] shadow-lg shadow-[#EE1B24]/20'
                      : isDark
                        ? 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {(prop.title || '').replace('Moon ', '')}
                </button>
              );
            })}
          </div>
        </div>

        {/* Symmetry Grid Layout (Flanked Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Projects List (First Half) - Hidden on Mobile */}
          <div className="hidden lg:block lg:col-span-2 space-y-2.5 max-h-[660px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-stone-400/20 scrollbar-track-transparent">
            <span className={`block text-[10px] tracking-wider uppercase font-black mb-3.5 flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
              <Building className="w-4 h-4 text-[#EE1B24]" /> PROJ (01 - {half})
            </span>
            <div className="space-y-2.5">
              {leftProperties.map((prop, idx) => renderTabButton(prop, idx))}
            </div>
          </div>

          {/* Center Column: Grand Cinematic Showcase Gallery (Only Images + Sleek Overlay Controls) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className={`p-3 sm:p-4.5 rounded-2xl shadow-2xl relative border transition-all duration-500 flex flex-col justify-between h-full ${
              isDark ? 'bg-[#0F0F10] border-white/5' : 'bg-white border-stone-200'
            }`}>
              
              {/* Minimal Showcase Header */}
              <div className="flex items-center justify-between gap-3 mb-4.5 px-1">
                <div>
                  <h3 className={`font-serif text-xl sm:text-2xl font-bold tracking-tight transition-colors flex items-center gap-2.5 ${isDark ? 'text-white' : 'text-[#2B251F]'}`}>
                    <Building className="w-5 h-5 text-[#EE1B24]" /> {selectedProperty.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#EE1B24] shrink-0" />
                    <span className={`font-sans text-[11px] font-light transition-colors ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                      {selectedProperty.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {selectedProperty.floorsCount && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/5 dark:border-white/5 text-slate-400">
                      <Hammer className="w-3 h-3 text-[#EE1B24]" /> {selectedProperty.floorsCount} Stories
                    </span>
                  )}
                  <span className={`text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full border ${
                    selectedProperty.status === 'ongoing' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : selectedProperty.status === 'completed'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    {selectedProperty.status}
                  </span>
                </div>
              </div>

              {/* Massive Cinematic Main Image Container */}
              <div style={{ perspective: '1200px' }} className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-[#0c0d12] border border-white/5 rounded-xl overflow-hidden group shadow-xl">
                
                {/* Image Wrap Container for 3D GSAP animation */}
                <div ref={imageRef} style={{ transformStyle: 'preserve-3d' }} className="w-full h-full transform-gpu origin-center">
                  <img
                    src={galleryImages[activeImgIndex]}
                    alt={`${selectedProperty.title} frame`}
                    className="w-full h-full object-cover cursor-pointer hover:brightness-105 transition-all duration-700"
                    onClick={() => setIsLightboxOpen(true)}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Elegant Vignette/Overlay for cinematic look */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20 pointer-events-none" />

                {/* Floating Overlay Info inside the Gallery */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white bg-black/75 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-lg">
                    Frame {activeImgIndex + 1} / {galleryImages.length}
                  </span>
                  {selectedProperty.sizeRange && (
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white bg-black/75 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full shadow-lg">
                      {selectedProperty.sizeRange}
                    </span>
                  )}
                </div>

                {/* Zoom view trigger */}
                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 hover:bg-[#EE1B24] hover:scale-105 backdrop-blur-md text-white border border-white/10 shadow-lg transition-all duration-300 cursor-pointer"
                  title="Enlarge Screen Frame"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {/* Left/Right Circular Navigation Arrows (Show on Hover) */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-5 top-1/2 -translate-y-1/2 z-10 p-3.5 rounded-full bg-black/60 hover:bg-[#EE1B24] hover:scale-110 text-white border border-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg backdrop-blur-sm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-5 top-1/2 -translate-y-1/2 z-10 p-3.5 rounded-full bg-black/60 hover:bg-[#EE1B24] hover:scale-110 text-white border border-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer shadow-lg backdrop-blur-sm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Beautiful dynamic floating caption banner at bottom of image overlay */}
                <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pointer-events-none">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4.5 py-3 rounded-xl text-white max-w-xl pointer-events-auto shadow-2xl">
                    <span className="text-[9px] font-mono tracking-widest text-[#EE1B24] font-black block uppercase mb-1">
                      Architectural Vision
                    </span>
                    <p className="text-xs font-light leading-relaxed opacity-90">
                      {selectedProperty.description}
                    </p>
                  </div>
                  
                  <a
                    href="#contact"
                    className="bg-[#EE1B24] hover:bg-[#D0141C] text-white px-5 py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-all duration-300 cursor-pointer shadow-lg shadow-[#EE1B24]/20 pointer-events-auto hover:scale-105 flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span>Inquire Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

              </div>

              {/* Sub-Gallery Filmstrip Thumbnails Row */}
              <div className="mt-5 px-1">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono tracking-wider uppercase opacity-70 ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
                    EXPLORE ROOM FRAMES ({galleryImages.length})
                  </span>
                  <span className="text-[9px] font-mono opacity-55">Click thumbnail to slide frame</span>
                </div>
                <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-stone-400/20 scrollbar-track-transparent">
                  {galleryImages.map((imgUrl, idx) => {
                    const isActive = idx === activeImgIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => setActiveImgIndex(idx)}
                        className={`relative aspect-[16/10] w-24 sm:w-28 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                          isActive 
                            ? 'border-[#EE1B24] scale-95 shadow-lg shadow-[#EE1B24]/25' 
                            : 'border-transparent opacity-50 hover:opacity-100 hover:scale-[1.02]'
                        }`}
                      >
                        <img 
                          src={imgUrl} 
                          alt={`Thumbnail ${idx + 1}`} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-gradient-to-t from-[#EE1B24]/20 to-transparent pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Projects List (Second Half) - Hidden on Mobile */}
          <div className="hidden lg:block lg:col-span-2 space-y-2.5 max-h-[660px] overflow-y-auto pl-2 scrollbar-thin scrollbar-thumb-stone-400/20 scrollbar-track-transparent">
            <span className={`block text-[10px] tracking-wider uppercase font-black mb-3.5 flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
              <Building className="w-4 h-4 text-[#EE1B24]" /> PROJ ({half + 1} - {tourProperties.length})
            </span>
            <div className="space-y-2.5">
              {rightProperties.map((prop, idx) => renderTabButton(prop, half + idx))}
            </div>
          </div>

        </div>
      </div>

      {/* Lightbox full-screen Overlay */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 sm:p-8"
          >
            {/* Close button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-[#EE1B24] text-white border border-white/10 transition-all duration-300 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev image */}
            <button
              onClick={handlePrevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-[#EE1B24] text-white border border-white/10 transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next image */}
            <button
              onClick={handleNextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-[#EE1B24] text-white border border-white/10 transition-all duration-300 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Large Image Showcase */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative max-w-5xl w-full aspect-[16/10] rounded-lg overflow-hidden shadow-2xl border border-white/10"
            >
              <img
                src={galleryImages[activeImgIndex]}
                alt={`${selectedProperty.title} zoom`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Title Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/85 to-transparent text-white">
                <span className="font-mono text-xs text-[#EE1B24] uppercase font-bold">{selectedProperty.location}</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1">{selectedProperty.title}</h3>
                <p className="text-xs text-white/80 mt-1 max-w-xl font-light">{selectedProperty.description}</p>
              </div>
            </motion.div>

            {/* Pagination numbers */}
            <div className="text-white/60 text-xs font-mono mt-4">
              Image {activeImgIndex + 1} of {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
