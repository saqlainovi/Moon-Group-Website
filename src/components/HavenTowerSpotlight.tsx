/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, Sparkles, MapPin, CheckCircle2, Phone, Calendar, 
  ChevronRight, Award, Shield, Waves, ArrowRight, Image as ImageIcon,
  Flame, Check, Star, Download, Maximize2
} from 'lucide-react';
import { Property } from '../types';
import FloorPlanZoomModal from './FloorPlanZoomModal';
import { useTheme } from '../context/ThemeContext';
import { CMSSiteSettings } from '../lib/cms';

interface HavenTowerSpotlightProps {
  havenProperty?: Property | null;
  siteSettings?: CMSSiteSettings | null;
  onSelectProperty?: (propertyId: string) => void;
  onOpenBookingModal?: () => void;
  showBanner?: boolean;
}

export default function HavenTowerSpotlight({ havenProperty, siteSettings, onSelectProperty, onOpenBookingModal, showBanner = true }: HavenTowerSpotlightProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (showBanner === false) {
    return null;
  }

  const defaultStaticImages = [
    { url: '/haven_tower/img_4.jpg', caption: 'Panoramic Front Elevation & Architectural Skyline View' },
    { url: '/haven_tower/img_1.jpg', caption: 'Front Tower Elevation & Modern Facade' },
    { url: '/haven_tower/img_6.jpg', caption: 'Rooftop Sky Deck & Architectural Lighting Perspective' },
    { url: '/haven_tower/img_2.jpg', caption: 'Luxury Exterior Architecture & Glass Facade' },
    { url: '/haven_tower/img_7.jpg', caption: 'Wide Landscape Perspective & Surrounding Greenery' },
    { url: '/haven_tower/img_3.jpg', caption: 'Grand Double-Height Entrance Atrium Lobby' },
    { url: '/haven_tower/img_8.jpg', caption: 'Executive Suite Balcony & Panoramic Vistas' },
    { url: '/haven_tower/img_5.jpg', caption: 'Detailed Architectural Craftsmanship' },
    { url: '/haven_tower/img_9.jpg', caption: 'Aerial Tower Elevation View' },
    { url: '/haven_tower/img_10.jpg', caption: 'Night Architectural Illumination View' },
    { url: '/haven_tower/img_11.jpg', caption: 'Comprehensive Site Masterplan Render' }
  ];

  // Dynamically compile havenImages using uploaded images from Admin/Firestore if present
  const dynamicGallery = havenProperty?.gallery && havenProperty.gallery.length > 0
    ? havenProperty.gallery.map((url, i) => ({
        url,
        caption: `Heaven Tower Gallery View ${i + 1}`
      }))
    : [];

  const spotlightImage = siteSettings?.havenTowerBannerImage || havenProperty?.imageUrl;

  const dynamicCover = spotlightImage
    ? [{ url: spotlightImage, caption: 'Heaven Tower Primary Architectural Elevation' }]
    : [];

  // Combine dynamic images from CMS with static fallbacks
  const mergedImages = [
    ...dynamicCover,
    ...dynamicGallery,
    ...defaultStaticImages
  ].filter((img, index, self) => self.findIndex(t => t.url === img.url) === index);

  const havenImages = mergedImages.length > 0 ? mergedImages : defaultStaticImages;

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <section id="haven-tower-spotlight" className={`relative py-16 overflow-hidden border-t border-b transition-colors duration-500 ${
      isDark ? 'bg-[#0B0B0C] text-white border-[#222225]' : 'bg-[#FAF6EE] text-[#2B251F] border-stone-300/60'
    }`}>
      {/* Ambient background glow */}
      <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${isDark ? 'bg-amber-500/10' : 'bg-amber-500/15'}`} />
      <div className={`absolute bottom-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none ${isDark ? 'bg-red-600/10' : 'bg-red-600/15'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-xs md:text-sm font-bold tracking-wider uppercase mb-4 shadow-lg ${
              isDark 
                ? 'bg-gradient-to-r from-red-600/20 via-amber-500/20 to-red-600/20 border border-amber-500/40 text-amber-300 shadow-amber-500/10' 
                : 'bg-red-100/90 border border-red-300 text-red-700 shadow-red-500/10'
            }`}
          >
            <Flame className="w-4 h-4 text-red-600 animate-pulse" />
            <span>MAIN ATTRACTION • INAUGURATION ANNOUNCEMENT</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-3xl md:text-5xl font-serif font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-stone-900'}`}
          >
            {siteSettings?.havenTowerTitle || havenProperty?.title || 'HEAVEN TOWER by Moon Group'}
          </motion.h2>

          <p className={`text-base md:text-lg leading-relaxed ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
            {siteSettings?.havenTowerDescription || havenProperty?.description || '📢 হেভেন টাওয়ার (HEAVEN TOWER) এর উদ্বোধন সম্পন্ন হয়েছে - বর্তমানে বুকিং এবং সেল চলছে! আকর্ষণীয় আর্কিটেকচার, ডাবল-হাইট এট্রিয়াম লবি, রুফটপ ইনফিনিটি পুল এবং Zone-4 ভূমিকম্প প্রতিরোধী স্ট্রাকচার বিশিষ্ট মুন গ্রুপের ফ্ল্যাগশিপ প্রজেক্ট।'}
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div 
              className={`relative aspect-[16/10] rounded-2xl overflow-hidden border shadow-2xl group cursor-zoom-in ${
                isDark ? 'border-amber-500/30 bg-neutral-950' : 'border-stone-300/80 bg-stone-100'
              }`}
              onClick={() => setLightboxImage(havenImages[activeImageIndex].url)}
            >
              {/* Soft Ambient Blurred Background */}
              <img
                src={havenImages[activeImageIndex].url}
                alt="Ambient blur"
                className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-25 scale-110 pointer-events-none"
              />

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={havenImages[activeImageIndex].url}
                  alt={havenImages[activeImageIndex].caption}
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 w-full h-full object-contain p-2 drop-shadow-2xl"
                />
              </AnimatePresence>

              {/* Status Ribbon */}
              <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-red-600 to-amber-600 text-white font-mono text-xs font-bold px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1.5 uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-white text-white" />
                <span>OFFICIALLY INAUGURATED</span>
              </div>

              {/* Zoom Fullscreen Badge */}
              <div className={`absolute top-4 right-4 z-20 font-mono text-[10px] font-bold px-2.5 py-1.5 rounded-md border flex items-center gap-1.5 shadow-lg transition-all cursor-pointer ${
                isDark ? 'bg-black/70 hover:bg-amber-500 hover:text-black text-amber-300 border-amber-500/30' : 'bg-white/90 hover:bg-red-600 hover:text-white text-stone-800 border-stone-300'
              }`}>
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">100% UNCROPPED ZOOM</span>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 sm:p-6 text-white">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-mono mb-1">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Image {activeImageIndex + 1} of {havenImages.length} • 100% Full View</span>
                </div>
                <p className="text-sm md:text-base font-medium text-neutral-200">
                  {havenImages[activeImageIndex].caption}
                </p>
              </div>
            </div>

            {/* Thumbnail Navigation Carousel */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-500/40">
              {havenImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    isDark ? 'bg-neutral-950' : 'bg-stone-200'
                  } ${
                    activeImageIndex === idx 
                      ? 'border-amber-500 ring-2 ring-amber-500/40 scale-105 opacity-100' 
                      : 'border-neutral-700/50 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-contain p-0.5" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Project Highlights & Features (5 Cols) */}
          <div className={`lg:col-span-5 rounded-2xl p-6 md:p-8 border space-y-6 flex flex-col justify-between shadow-xl ${
            isDark ? 'bg-neutral-900/80 border-neutral-800 text-white' : 'bg-white/95 border-stone-300 text-stone-800'
          }`}>
            <div>
              <div className={`flex items-center justify-between border-b pb-4 mb-6 ${isDark ? 'border-neutral-800' : 'border-stone-200'}`}>
                <div>
                  <span className={`text-xs font-mono uppercase tracking-wider ${isDark ? 'text-amber-400' : 'text-[#EE1B24]'}`}>
                    {siteSettings?.havenTowerStatusLabel || 'Project Status'}
                  </span>
                  <h3 className={`text-xl font-bold flex items-center gap-2 mt-0.5 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    {siteSettings?.havenTowerStatusValue || 'Booking & Sales Open'}
                  </h3>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-mono uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>
                    {siteSettings?.havenTowerPriceLabel || 'Launch Rate'}
                  </span>
                  <p className={`text-lg font-bold ${isDark ? 'text-amber-300' : 'text-[#EE1B24]'}`}>
                    {siteSettings?.havenTowerPriceValue || 'Tk 2.2 - 5.5 Cr'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-amber-400' : 'text-[#EE1B24]'}`} />
                  <p className={`text-sm ${isDark ? 'text-neutral-200' : 'text-stone-700'}`}>
                    <strong className={isDark ? 'text-white' : 'text-stone-900'}>Location:</strong> {siteSettings?.havenTowerLocation || 'Plot 01, Section 12, Mirpur / Prime Location, Dhaka'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Building className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-amber-400' : 'text-[#EE1B24]'}`} />
                  <p className={`text-sm ${isDark ? 'text-neutral-200' : 'text-stone-700'}`}>
                    <strong className={isDark ? 'text-white' : 'text-stone-900'}>Apartment Sizes:</strong> {siteSettings?.havenTowerSizes || '1,850 Sft - 3,600 Sft (Single & Duplex)'}
                  </p>
                </div>
              </div>

              <h4 className={`text-sm font-mono font-bold tracking-wider uppercase mb-3 ${isDark ? 'text-amber-400' : 'text-[#EE1B24]'}`}>
                Key Architectural Highlights
              </h4>

              <ul className={`space-y-2.5 text-sm ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                {(siteSettings?.havenTowerHighlights
                  ? siteSettings.havenTowerHighlights.split('\n').map(s => s.trim()).filter(Boolean)
                  : [
                      '25-Story Iconic Landmark Architecture',
                      'Grand Double-Height Entrance Atrium Lobby',
                      'Rooftop Sky Infinity Pool & Botanical Lounge',
                      'Zone-4 Earthquake Resistant Certified Structure',
                      'High-Speed Intelligent Elevators & 100% Power Backup',
                      'Smart Home Automation with Biometric Security'
                    ]
                ).map((highlight, index) => (
                  <li key={index} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className={`pt-4 border-t space-y-3 ${isDark ? 'border-neutral-800' : 'border-stone-200'}`}>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => onSelectProperty && onSelectProperty('haven-tower')}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10 cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenBookingModal ? onOpenBookingModal() : window.location.href = 'tel:+8801313401405'}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-red-600/10 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Visit</span>
                </button>
              </div>

              <a
                href="tel:+8801313401405"
                className={`w-full font-mono text-[11px] sm:text-xs py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-all flex items-center justify-center gap-1.5 border ${
                  isDark 
                    ? 'bg-neutral-800 hover:bg-neutral-700 text-amber-300 border-amber-500/30' 
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-900 border-stone-300'
                }`}
              >
                <Phone className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isDark ? 'text-amber-400' : 'text-[#EE1B24]'}`} />
                <span>Hotline: +88 01313-401405</span>
              </a>
            </div>

          </div>

        </div>

      </div>

      {/* Interactive High-Fidelity 100% Uncropped Zoom Modal */}
      <FloorPlanZoomModal
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        imageUrl={lightboxImage || ''}
        title={`HEAVEN TOWER by Moon Group - ${havenImages[activeImageIndex]?.caption || 'Full Uncropped View'}`}
      />
    </section>
  );
}
