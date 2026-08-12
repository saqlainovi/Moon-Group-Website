/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  MapPin,
  Maximize2,
  Bed,
  Bath,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  Compass,
  Phone,
  Mail,
  User,
  Shield,
  Briefcase,
  Play,
  ArrowRight,
  Download,
  ExternalLink,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Property } from '../types';
import { getFitClass, getPositionClass } from '../lib/imageUtils';
import FloorPlanZoomModal from './FloorPlanZoomModal';

interface PropertyDetailViewProps {
  property: Property;
  onBack: () => void;
  onBookTour: (property: Property) => void;
}

export default function PropertyDetailView({ property, onBack, onBookTour }: PropertyDetailViewProps) {
  const [activeFloorIndex, setActiveFloorIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const galleryImages = property.gallery && property.gallery.length > 0 
    ? property.gallery 
    : [property.imageUrl];
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Auto-swap effect
  useEffect(() => {
    if (galleryImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [galleryImages]);

  const handlePrevImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleNextImg = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % galleryImages.length);
  };

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [property]);

  // Map coordinate dynamic URLs based on location
  const getMapEmbedUrl = (loc: string) => {
    const defaultEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8753235639145!2d90.44390317589578!3d23.751336478673324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7ded071d701%3A0x6e9f19ca01283d7a!2sAftab%20Nagar%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1703115312345";
    if (loc.toLowerCase().includes("gulshan")) {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.137459197607!2d90.4132!3d23.7915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7aef52994e7%3A0xc48c1e7a5c777!2sGulshan%202%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1625000000000";
    }
    if (loc.toLowerCase().includes("banani")) {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.100000000000!2d90.400000!3d23.790000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7aeb1277c0b%3A0x8805f77893a9d9b6!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1625000000000";
    }
    return defaultEmbed;
  };

  // Predefined gorgeous blueprints/floor sketches for realistic presentation
  const floorPlanImages = [
    "https://lh3.googleusercontent.com/d/1MzBr64Y8DJJNG2q_tKa1R-b3ol3rGdgD",
    "https://lh3.googleusercontent.com/d/1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6c",
    "https://lh3.googleusercontent.com/d/1HfsvkjF_R57oo_rlVDG0lCzB4uSCvJtN",
    "https://lh3.googleusercontent.com/d/18WMuVx9H2CWyO2ZlW5N9vbIGt70cG73S",
    "https://lh3.googleusercontent.com/d/1Hf0dC0-dzgk4r5yLOvfhJc3ZbD3MyXtN",
    "https://lh3.googleusercontent.com/d/1JLtIalfp49hPq57qAKKE-4Ezraaw7asU",
    "https://lh3.googleusercontent.com/d/1JG0sjCKULHmz4JpmfwfFs6tZc2Wl-Hjt"
  ];

  const effectiveFloorLayouts = (property.floorLayouts && property.floorLayouts.length > 0)
    ? property.floorLayouts
    : [
        {
          levelName: `${property.title} - Floor Plan Layout`,
          sizeSqft: 2200,
          imageUrl: floorPlanImages[0],
          rooms: [
            { name: 'Drawing & Dining Room', x: 5, y: 5, w: 45, h: 40, type: 'living' as const },
            { name: 'Master Bedroom', x: 55, y: 5, w: 35, h: 35, type: 'bed' as const },
            { name: 'Kitchen Area', x: 5, y: 50, w: 25, h: 35, type: 'kitchen' as const },
            { name: 'Veranda Balcony', x: 35, y: 50, w: 20, h: 35, type: 'balcony' as const }
          ]
        },
        {
          levelName: `${property.title} - Executive Suite Layout`,
          sizeSqft: 2850,
          imageUrl: floorPlanImages[1],
          rooms: [
            { name: 'Grand Living Hall', x: 5, y: 5, w: 50, h: 45, type: 'living' as const },
            { name: 'Presidential Master Suite', x: 60, y: 5, w: 35, h: 35, type: 'bed' as const },
            { name: 'Gourmet Kitchen', x: 5, y: 55, w: 30, h: 35, type: 'kitchen' as const },
            { name: 'Sky Terrace', x: 40, y: 55, w: 20, h: 35, type: 'balcony' as const }
          ]
        }
      ];

  const safeActiveIndex = activeFloorIndex < effectiveFloorLayouts.length ? activeFloorIndex : 0;
  const currentFloor = effectiveFloorLayouts[safeActiveIndex];

  const getVideoEmbedUrl = (url?: string) => {
    const defaultEmbed = "https://www.youtube.com/embed/S2p8E5Y97eE?autoplay=1";
    if (!url) return defaultEmbed;
    
    if (url.includes("youtube.com/watch") || url.includes("youtu.be") || url.includes("youtube.com/embed")) {
      let videoId = "";
      if (url.includes("v=")) {
        videoId = url.split("v=")[1]?.split("&")[0] || "";
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
      } else if (url.includes("embed/")) {
        videoId = url.split("embed/")[1]?.split("?")[0] || "";
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      }
    }
    
    if (url.includes("vimeo.com")) {
      const parts = url.split("/");
      const videoId = parts[parts.length - 1]?.split("?")[0];
      if (videoId && !isNaN(Number(videoId))) {
        return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
      }
    }
    
    return url;
  };

  const getVideoThumbnailUrl = (url?: string, fallbackUrl?: string) => {
    if (url) {
      let videoId = "";
      if (url.includes("v=")) {
        videoId = url.split("v=")[1]?.split("&")[0] || "";
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
      } else if (url.includes("embed/")) {
        videoId = url.split("embed/")[1]?.split("?")[0] || "";
      }
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    }
    return fallbackUrl || "";
  };

  // Derive long high-fidelity details for "At a Glance" table
  const getAtGlanceValues = (prop: Property) => {
    const isSkyline = prop.id.includes('skyline');
    const isImperial = prop.id.includes('imperial');
    const isPlaza = prop.id.includes('corporate');
    const isHaven = prop.id.includes('haven') || prop.title.toLowerCase().includes('haven') || prop.title.toLowerCase().includes('heaven');

    return {
      address: prop.address || (isHaven
        ? "House: 15 Heaven Tower, Road: 126/127, Gulshan 1, Dhaka"
        : isSkyline 
          ? "Plot # 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55 & 56 Road: 54, Sector: 1, Block: F, Gulshan 2, Dhaka"
          : isImperial 
            ? "Plot # 12, Road: 11, Block: H, Banani, Dhaka"
            : isPlaza 
              ? "Plot # 88, Kamal Ataturk Avenue, Banani, Dhaka"
              : `Plot # 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55 & 56 Road: 5 & 6, Sector: 1, Block: F Aftab Nagar, Dhaka`),
      landArea: prop.landArea || (isSkyline ? "35 Katha" : isImperial ? "18 Katha" : isPlaza ? "45 Katha" : "28 Katha"),
      floorsCount: `G+${prop.floorsCount - 1} (${prop.floorsCount} Storied)`,
      aptPerFloor: (isHaven && prop.aptPerFloor && (prop.aptPerFloor.includes("Heaven Tower") || prop.aptPerFloor.includes("126"))) ? "4 Units / Floor (A, B, C, D)" : (prop.aptPerFloor || (isHaven ? "4 Units / Floor (A, B, C, D)" : isPlaza ? "Grade-[#A] Commercial Floors" : "2 Units / Floor")),
      totalUnits: prop.totalUnits || (isHaven ? "96 Luxury Units" : isPlaza ? "48 Office Suites" : `${(prop.floorsCount - 1) * 2} Luxury Units`),
      aptSize: isHaven ? "A- 4293 Sft | B- 3000 Sft | C- 3000 Sft | D- 3770 Sft" : prop.sizeRange ? (prop.sizeRange.toLowerCase().includes('sft') ? prop.sizeRange : `${prop.sizeRange} Sft`) : "2,150 Sft - 3,600 Sft",
      beds: prop.beds ? `${prop.beds} Bedrooms` : "4 Bedrooms",
      baths: prop.baths ? `${prop.baths} Bathrooms` : "4 Bathrooms",
      balconies: prop.balconies ? (typeof prop.balconies === 'number' ? `${prop.balconies} Balconies` : String(prop.balconies)) : "3 Balconies (Verandahs)",
      facing: prop.facing || "South Facing (Open Panoramic View)",
      parking: prop.parking || "1 - 2 Dedicated Basement Car Parking",
      launchDate: prop.launchDate || (isHaven ? "July 2026" : "October 2023"),
      handoverDate: prop.handoverDate || (isHaven ? "December 2028" : prop.completionYear ? `Completed ${prop.completionYear}` : "May 2028")
    };
  };

  const info = getAtGlanceValues(property);

  const renderSizeBoxes = (sizeStr: string) => {
    if (!sizeStr) return null;
    const items = sizeStr.split(/[|\n]/).map(s => s.trim()).filter(Boolean);

    if (items.length > 1 || items.some(item => item.includes('-') && /[ABCD]/.test(item))) {
      return (
        <div className="flex flex-col gap-1.5 my-1">
          {items.map((item, idx) => {
            let label = "";
            let val = item;
            if (item.includes("-")) {
              const parts = item.split("-");
              label = parts[0].trim();
              val = parts.slice(1).join("-").trim();
            } else if (item.includes(":")) {
              const parts = item.split(":");
              label = parts[0].trim();
              val = parts.slice(1).join(":").trim();
            }
            return (
              <div key={idx} className="bg-[#141416] border border-[#FF4A4F]/30 hover:border-[#FF4A4F]/60 rounded px-2.5 py-1.5 flex items-center justify-between shadow-sm transition-all">
                {label ? (
                  <>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF4A4F]" />
                      <span className="font-mono font-bold text-[#FF4A4F] text-xs uppercase tracking-wider">
                        Type {label}
                      </span>
                    </div>
                    <span className="font-semibold text-white text-xs sm:text-sm font-mono">{val}</span>
                  </>
                ) : (
                  <span className="font-semibold text-white text-xs sm:text-sm">{item}</span>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    return <span className="font-semibold text-[#FF4A4F] text-sm">{sizeStr}</span>;
  };

  // Inquiry Form state handling
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I am interested in your property named "${property.title}".`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please provide your Name and Phone Number.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: `I am interested in your property named "${property.title}".`
      });
      // Auto-clear success message
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-slate-300 font-sans pb-28">
      {/* Top Banner Navigation */}
      <div className="py-6 px-6 sm:px-10 max-w-[1360px] mx-auto flex justify-between items-center border-b border-white/5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#FF4A4F] hover:text-white transition-colors uppercase cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </button>
        <span className="text-[10px] tracking-[0.3em] text-gold-400 font-mono uppercase font-bold hidden sm:inline">
          {property.type === 'commercial' ? 'Commercial Landmark' : 'Luxury Residential'}
        </span>
      </div>

      {/* Main Structural Columns Grid */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Detail & Presentation Blocks (Matches Image exactly!) */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Majestic Photo Gallery Slideshow */}
          <div className="relative w-full aspect-[16/10] overflow-hidden rounded-lg border border-white/10 bg-[#0A0B0D] group select-none cursor-zoom-in">
            {/* Soft Ambient Blurred Background to prevent side gaps while showing 100% full uncropped image */}
            <img
              src={galleryImages[currentImgIndex]}
              alt="Ambient blur"
              className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-25 scale-110 pointer-events-none"
            />

            {/* Image swap container */}
            <div className="absolute inset-0 w-full h-full z-10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImgIndex}
                  src={galleryImages[currentImgIndex]}
                  alt={`${property.title} showcase photo ${currentImgIndex + 1}`}
                  initial={{ opacity: 0, scale: 1.01 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className={`w-full h-full cursor-pointer p-1.5 drop-shadow-2xl ${getFitClass(property.imageFit)} ${getPositionClass(property.imagePosition)}`}
                  onClick={() => setLightboxImage(galleryImages[currentImgIndex])}
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>

            {/* Gradient Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-10" />

            {/* Navigation Arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImg}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-[#FF4A4F] text-white flex items-center justify-center border border-white/10 hover:border-transparent transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImg}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-[#FF4A4F] text-white flex items-center justify-center border border-white/10 hover:border-transparent transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Pagination Indicators / Dots */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/5">
                {galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      currentImgIndex === idx ? 'bg-[#FF4A4F] w-4' : 'bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Floating Index Counter */}
            <div className="absolute top-4 right-4 bg-black/60 border border-white/10 px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider text-white z-10">
              Photo {currentImgIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Title & Description Block */}
          <div className="space-y-4">
            {/* Highlights: Booking/Selling Status & Location */}
            <div className="flex flex-wrap items-center gap-3">
              {property.status === 'ongoing' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold font-mono tracking-wider uppercase bg-red-600 text-white shadow-md animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-ping"></span>
                  🔥 বুকিং ও বিক্রয় চলছে • Booking Open
                </span>
              )}
              {property.status === 'under-construction' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold font-mono tracking-wider uppercase bg-orange-600 text-white shadow-md animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-ping"></span>
                  🧱 নির্মাণাধীন ও বিক্রয় চলছে • Under Construction
                </span>
              )}
              {property.status === 'upcoming' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold font-mono tracking-wider uppercase bg-blue-600 text-white shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse"></span>
                  ✨ প্রি-বুকিং চলছে • Pre-Booking Open
                </span>
              )}
              {property.status === 'proposed' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold font-mono tracking-wider uppercase bg-purple-600 text-white shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse"></span>
                  🗺️ প্রস্তাবিত প্রকল্প • Proposed Project
                </span>
              )}
              {property.status === 'completed' && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold font-mono tracking-wider uppercase bg-emerald-600 text-white shadow-md">
                  🔑 সরাসরি বিক্রয় চলছে • Ready to Buy
                </span>
              )}

              {/* Highlighted Location Tag */}
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-widest font-bold border bg-amber-400/10 text-amber-300 border-amber-500/30 shadow-sm shadow-amber-500/5 transition-all">
                <MapPin className="w-3.5 h-3.5 text-red-500 animate-bounce shrink-0" />
                <span>{property.location}</span>
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl text-white tracking-tight leading-[1.05]">
              {property.title}
            </h1>
            <p className="text-slate-400 text-[15px] leading-relaxed font-light max-w-3xl">
              {property.description}
            </p>
          </div>
        </div>

        {/* Right Side: Sidebar Cards (At a Glance & Elite Quality Guarantee) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* At a Glance Section */}
          <div className="bg-[#161617]/80 border border-white/5 p-6 rounded-md space-y-6">
            <div className="space-y-2">
              <h4 className="font-serif text-xl text-white font-medium">At a Glance</h4>
              <div className="h-[1px] w-full bg-white/10" />
            </div>

            {/* Custom styled specs table */}
            <div className="border border-white/10 rounded overflow-hidden text-xs font-light">
              
              {/* Address */}
              <div className="grid grid-cols-12 border-b border-white/10">
                <div className="col-span-4 bg-black/40 p-3 font-semibold text-slate-300 flex items-center gap-1.5 border-r border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-[#FF4A4F] shrink-0" />
                  <span>Address</span>
                </div>
                <div className="col-span-8 p-3 text-white leading-relaxed font-light">
                  {info.address}
                </div>
              </div>

              {/* Land Area */}
              <div className="grid grid-cols-12 border-b border-white/10">
                <div className="col-span-4 bg-black/40 p-3 font-semibold text-slate-300 flex items-center gap-1.5 border-r border-white/10">
                  <Layers className="w-3.5 h-3.5 text-[#FF4A4F] shrink-0" />
                  <span>Land Area</span>
                </div>
                <div className="col-span-8 p-3 text-white">
                  {info.landArea}
                </div>
              </div>

              {/* No. of Floors */}
              <div className="grid grid-cols-12 border-b border-white/10">
                <div className="col-span-4 bg-black/40 p-3 font-semibold text-slate-300 flex items-center gap-1.5 border-r border-white/10">
                  <Briefcase className="w-3.5 h-3.5 text-[#FF4A4F] shrink-0" />
                  <span>No. of Floors</span>
                </div>
                <div className="col-span-8 p-3 text-white">
                  {info.floorsCount}
                </div>
              </div>

              {/* Apartment/Floor & Total Units */}
              <div className="grid grid-cols-12 border-b border-white/10">
                <div className="col-span-4 bg-black/40 p-3 font-semibold text-slate-300 flex items-center gap-1.5 border-r border-white/10">
                  <Maximize2 className="w-3.5 h-3.5 text-[#FF4A4F] shrink-0" />
                  <span>Apt. / Floor</span>
                </div>
                <div className="col-span-8 p-3 text-white">
                  {info.aptPerFloor} ({info.totalUnits})
                </div>
              </div>

              {/* Apartment Size (SFT) */}
              <div className="grid grid-cols-12 border-b border-white/10">
                <div className="col-span-4 bg-black/40 p-3 font-semibold text-slate-300 flex items-center gap-1.5 border-r border-white/10">
                  <Compass className="w-3.5 h-3.5 text-[#FF4A4F] shrink-0" />
                  <span>Size (SFT)</span>
                </div>
                <div className="col-span-8 p-2.5 text-white">
                  {renderSizeBoxes(info.aptSize)}
                </div>
              </div>

              {/* Bedrooms */}
              <div className="grid grid-cols-12 border-b border-white/10">
                <div className="col-span-4 bg-black/40 p-3 font-semibold text-slate-300 flex items-center gap-1.5 border-r border-white/10">
                  <Bed className="w-3.5 h-3.5 text-[#FF4A4F] shrink-0" />
                  <span>Bedrooms</span>
                </div>
                <div className="col-span-8 p-3 text-white">
                  {info.beds}
                </div>
              </div>

              {/* Bathrooms */}
              <div className="grid grid-cols-12 border-b border-white/10">
                <div className="col-span-4 bg-black/40 p-3 font-semibold text-slate-300 flex items-center gap-1.5 border-r border-white/10">
                  <Bath className="w-3.5 h-3.5 text-[#FF4A4F] shrink-0" />
                  <span>Bathrooms</span>
                </div>
                <div className="col-span-8 p-3 text-white">
                  {info.baths}
                </div>
              </div>

              {/* Balconies / Verandahs */}
              <div className="grid grid-cols-12 border-b border-white/10">
                <div className="col-span-4 bg-black/40 p-3 font-semibold text-slate-300 flex items-center gap-1.5 border-r border-white/10">
                  <Maximize2 className="w-3.5 h-3.5 text-[#FF4A4F] shrink-0" />
                  <span>Balconies (C)</span>
                </div>
                <div className="col-span-8 p-3 text-white">
                  {info.balconies}
                </div>
              </div>

              {/* Facing */}
              <div className="grid grid-cols-12 border-b border-white/10">
                <div className="col-span-4 bg-black/40 p-3 font-semibold text-slate-300 flex items-center gap-1.5 border-r border-white/10">
                  <Compass className="w-3.5 h-3.5 text-[#FF4A4F] shrink-0" />
                  <span>Facing</span>
                </div>
                <div className="col-span-8 p-3 text-white">
                  {info.facing}
                </div>
              </div>

              {/* Car Parking */}
              <div className="grid grid-cols-12 border-b border-white/10">
                <div className="col-span-4 bg-black/40 p-3 font-semibold text-slate-300 flex items-center gap-1.5 border-r border-white/10">
                  <Briefcase className="w-3.5 h-3.5 text-[#FF4A4F] shrink-0" />
                  <span>Car Parking</span>
                </div>
                <div className="col-span-8 p-3 text-white">
                  {info.parking}
                </div>
              </div>

              {/* Launch Date */}
              <div className="grid grid-cols-12 border-b border-white/10">
                <div className="col-span-4 bg-black/40 p-3 font-semibold text-slate-300 flex items-center gap-1.5 border-r border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-[#FF4A4F] shrink-0" />
                  <span>Launch Date</span>
                </div>
                <div className="col-span-8 p-3 text-white">
                  {info.launchDate}
                </div>
              </div>

              {/* Completion date */}
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-black/40 p-3 font-semibold text-slate-300 flex items-center gap-1.5 border-r border-white/10">
                  <Clock className="w-3.5 h-3.5 text-[#FF4A4F] shrink-0" />
                  <span>Completion</span>
                </div>
                <div className="col-span-8 p-3 text-white">
                  {info.handoverDate}
                </div>
              </div>

            </div>

            {/* Action Buttons: Construction Status & Brochure */}
            <div className="flex gap-4">
              <button
                onClick={() => alert("Construction Progress: Currently on track! Concrete core structure has been completed with BUET certification approval.")}
                className="flex-1 bg-white/10 hover:bg-[#FF4A4F] hover:text-white text-white font-mono text-[10px] font-bold uppercase tracking-wider py-3 px-2 rounded-full border border-white/5 shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Construction Status</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => alert("Brochure Download Started! Detailed blueprints and brochure package for " + property.title + " are downloading.")}
                className="flex-1 bg-white/10 hover:bg-[#FF4A4F] hover:text-white text-white font-mono text-[10px] font-bold uppercase tracking-wider py-3 px-2 rounded-full border border-white/5 shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Brochure</span>
              </button>
            </div>
          </div>

          {/* Secure Asset Guarantee Panel */}
          <div className="bg-[#161617]/50 border border-white/5 p-6 rounded-sm space-y-4">
            <div className="flex gap-3 text-gold-500">
              <Shield className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs font-mono font-bold tracking-wider uppercase text-white">Elite Quality Guarantee</span>
                <p className="text-xs text-[#6B6B6A] leading-relaxed mt-1 font-light">
                  100% genuine steel, first-class concrete testing, BUET and professional earthquake-resistant structural certifications verified for every signature project.
                </p>
              </div>
            </div>
          </div>

        </div> {/* Closes Right Side lg:col-span-4 */}
      </div> {/* Closes Main Structural Columns Grid */}

      {/* Full-Width Presentation Sections */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 mt-16 space-y-16">
        
        {/* Premium Layout Plan Specifications Showcase */}
        {property.hideVirtualConfigurator !== true && effectiveFloorLayouts.length > 0 && (
          <div className="space-y-6 pt-12 border-t border-white/5">
            <div className="space-y-2 text-left">
              <h3 className="font-serif text-3xl text-white font-medium uppercase tracking-tight">Floor Plan</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                Explore our high-fidelity structural layouts. Select a blueprint thumbnail to view the floor plan details below.
              </p>
            </div>

            {/* 1. Floor Plan Mini Image Gallery (Thumbnails) */}
            <div className="flex flex-wrap gap-2 pb-2">
              {effectiveFloorLayouts.map((layout, idx) => {
                const miniImg = layout.imageUrl || floorPlanImages[idx % floorPlanImages.length];
                const isActive = safeActiveIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setActiveFloorIndex(idx);
                    }}
                    className={`relative cursor-pointer overflow-hidden rounded border transition-all duration-300 bg-[#161617] p-1 w-16 h-16 sm:w-20 sm:h-20 flex flex-col items-center justify-center select-none ${
                      isActive 
                        ? 'border-[#FF4A4F] ring-1 ring-[#FF4A4F]/50 shadow-lg shadow-[#FF4A4F]/10' 
                        : 'border-white/10 hover:border-[#FF4A4F]/50 hover:bg-[#1C1C1E]'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="relative w-full h-full overflow-hidden rounded bg-neutral-900">
                      <img 
                        src={miniImg} 
                        alt={layout.levelName} 
                        className={`w-full h-full object-cover object-center transition-transform duration-500 ${
                          isActive ? 'scale-110 opacity-100' : 'opacity-60 hover:opacity-100'
                        }`}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay" />
                      
                      {/* Overlay label */}
                      <div className="absolute bottom-0 inset-x-0 bg-black/80 py-0.5 px-1 text-center truncate">
                        <span className="font-mono text-[8px] font-bold text-white uppercase block leading-none">
                          {(layout.levelName || '').split(' - ')[0].replace('Floor', 'F')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* 2. Full-Width Blueprint Layout Viewer */}
            <div className="border border-white/10 bg-[#0E0E0F] rounded-lg p-6 flex flex-col justify-between space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div className="space-y-1 text-left">
                  <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-widest text-[#FF4A4F]">
                    Selected Floor Layout Design
                  </span>
                  <h4 className="font-serif text-2xl text-white font-medium uppercase tracking-tight">
                    {currentFloor?.levelName}
                  </h4>
                </div>
                
                <div className="flex items-center gap-6 text-xs font-mono">
                  <div>
                    <span className="block text-slate-500 uppercase tracking-wider text-[9px] text-left">Allocated Size</span>
                    <span className="text-[#FF4A4F] font-bold text-base">
                      {currentFloor?.sizeSqft ? currentFloor.sizeSqft.toLocaleString() : '2,200'} SFT
                    </span>
                  </div>
                  <div className="h-8 w-[1px] bg-white/10" />
                  <div>
                    <span className="block text-slate-500 uppercase tracking-wider text-[9px] text-left">Layout Rooms</span>
                    <span className="text-white font-bold text-base">
                      {currentFloor?.rooms ? currentFloor.rooms.length : 4} Spaces
                    </span>
                  </div>
                </div>
              </div>

              {/* Big Blueprint Viewport - Stretched Wide Landscape */}
              <div 
                className="relative w-full aspect-[16/9] bg-[#0A0B0D] border border-white/10 rounded-lg overflow-hidden flex items-center justify-center group shadow-2xl cursor-zoom-in flex-1"
                onClick={() => setLightboxImage(currentFloor?.imageUrl || floorPlanImages[safeActiveIndex % floorPlanImages.length])}
              >
                {/* Compass Decor */}
                <div className="absolute bottom-4 left-4 font-serif text-[10px] tracking-wider text-slate-500/20 pointer-events-none select-none flex flex-col items-center z-10">
                  <span className="font-bold">N</span>
                  <div className="w-4 h-4 border-t border-r border-slate-500/25 rotate-45 my-1" />
                  <span>S</span>
                </div>

                <div className="absolute bottom-4 right-4 font-mono text-[9px] text-slate-500/40 pointer-events-none select-none z-10">
                  SCALE 1:120 | MOON DRAFTING
                </div>

                <img
                  src={currentFloor?.imageUrl || floorPlanImages[safeActiveIndex % floorPlanImages.length]}
                  alt={`${property.title} blueprint plan design`}
                  className="w-full h-full object-contain transition-all duration-500 brightness-95 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle draft overlay */}
                <div className="absolute inset-0 bg-blue-900/5 mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-[size:40px_40px] bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                
                {/* Hover prompt */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="px-4 py-2 bg-[#FF4A4F] text-white font-bold uppercase text-[10px] tracking-widest rounded shadow-lg">
                    Click to Enlarge
                  </span>
                </div>
              </div>

              {/* Instant Inquiry CTA Link */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => onBookTour(property)}
                  className="px-6 py-3 bg-[#FF4A4F] hover:bg-[#D63539] text-white font-bold uppercase text-[10px] tracking-widest rounded transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Inquire About This Layout</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Property Video & Quick Inquiry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
          {/* Left Part: Property Video (Smaller, say col-span-8) */}
          <div className="lg:col-span-8 space-y-4">
            <h3 className="font-serif text-2xl text-white font-medium">
              Property Video{property.videos && property.videos.length > 0 ? 's' : ''}
            </h3>
            
            {/* Primary Video / YouTube Link */}
            {property.videoUrl && (
              <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/10 rounded bg-black/50 group">
                <img
                  src={getVideoThumbnailUrl(property.videoUrl, property.imageUrl)}
                  alt="Property video poster cinematic frame render"
                  loading="lazy"
                  onError={(e) => {
                    if (property.imageUrl && (e.target as HTMLImageElement).src !== property.imageUrl) {
                      (e.target as HTMLImageElement).src = property.imageUrl;
                    }
                  }}
                  className={`w-full h-full object-cover filter brightness-75 group-hover:scale-102 transition-all duration-700 ease-out`}
                />
                <div className="absolute top-6 left-6 flex flex-col text-white select-none">
                  <span className="font-mono text-[9px] tracking-[0.3em] text-[#FF4A4F] uppercase font-bold">A Home To Love</span>
                  <span className="font-serif text-xl sm:text-2xl font-bold uppercase mt-1 tracking-wide">{property.title}</span>
                  <span className="font-mono text-[9px] tracking-widest text-slate-300 uppercase mt-0.5">{property.area}</span>
                </div>
                <button
                  onClick={() => setVideoOpen(true)}
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white text-[#FF4A4F] flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl cursor-pointer hover:bg-[#FF4A4F] hover:text-white"
                >
                  <Play className="w-6 h-6 fill-current ml-1" />
                </button>
              </div>
            )}

            {/* Direct Uploaded Videos Grid */}
            {property.videos && property.videos.length > 0 && (
              <div className={`grid gap-4 ${property.videos.length === 1 && !property.videoUrl ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                {property.videos.map((vidUrl, idx) => (
                  <div key={idx} className="relative aspect-[16/9] w-full overflow-hidden border border-white/10 rounded bg-black">
                    <video 
                      src={vidUrl} 
                      className="w-full h-full object-cover"
                      controls 
                      controlsList="nodownload"
                      preload="metadata"
                      poster={property.imageUrl}
                    />
                  </div>
                ))}
              </div>
            )}
            
            {!property.videoUrl && (!property.videos || property.videos.length === 0) && (
               <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/10 rounded bg-black/50 flex items-center justify-center">
                  <span className="text-slate-500 font-mono text-xs">Video coming soon</span>
               </div>
            )}
          </div>

          {/* Right Part: Direct Consultation / Inquiry Form Card (col-span-4) */}
          <div id="quick-inquiry-video-form" className="lg:col-span-4 border border-white/10 bg-[#0E0E0F] rounded-lg p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="bg-white/5 border border-white/10 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-widest text-[#FF4A4F]">
                Direct Consultation
              </span>
              <h4 className="font-serif text-lg text-white font-medium uppercase tracking-tight">I am interested in this property</h4>
              <div className="h-[1px] w-full bg-white/10" />
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Name */}
                <div className="space-y-1">
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF4A4F]/60 font-light"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF4A4F]/60 font-light"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF4A4F]/60 font-light"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <textarea
                    rows={3}
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#FF4A4F]/60 font-light resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* Submit Button & Feedback */}
              <div className="space-y-3 pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-neutral-900 hover:bg-[#FF4A4F] hover:text-white font-mono text-[10px] font-bold uppercase tracking-widest py-3 px-6 rounded transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg cursor-pointer disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Sending...' : 'Submit Inquiry'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="p-3 bg-green-950/40 border border-green-500/20 text-green-400 rounded flex items-center gap-2"
                    >
                      <Check className="w-4 h-4 shrink-0" />
                      <span className="text-[10px]">Inquiry sent successfully!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>

        {/* Location Section */}
        <div className="space-y-4">
          <h3 className="font-serif text-2xl text-white font-medium">
            Location
          </h3>
          <div className="relative h-[420px] w-full overflow-hidden border border-white/10 rounded bg-black/30">
            
            {/* Dynamic Map Iframe */}
            <iframe
              src={getMapEmbedUrl(property.location)}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(110%)' }}
              allowFullScreen={false}
              loading="lazy"
              title={`${property.title} dynamic maps location guide`}
            ></iframe>

            {/* Open in maps trigger button */}
            <div className="absolute top-4 left-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-[#FF4A4F] hover:text-white text-neutral-900 font-mono text-[10px] font-bold uppercase tracking-wider py-2 px-3 rounded shadow-lg flex items-center gap-1.5 transition-all"
              >
                <span>Open In Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Float address box with building image */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:left-6 sm:bottom-6 max-w-sm bg-[#161617]/95 border border-white/10 rounded p-4 flex gap-3 text-xs text-white shadow-2xl backdrop-blur-md">
              <div className="w-16 h-16 rounded border border-white/5 shrink-0 overflow-hidden relative bg-[#0B0B0C]">
                <img
                  src={property.imageUrl}
                  alt={property.title}
                  className={`w-full h-full ${getFitClass(property.imageFit)} ${getPositionClass(property.imagePosition)}`}
                />
              </div>
              <div className="space-y-1">
                <span className="block font-bold text-[#FF4A4F] uppercase font-mono tracking-wider text-[10px]">Address:</span>
                <p className="text-slate-300 leading-relaxed font-light text-[11px]">
                  {info.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Project Features & Architecture Section */}
        <div className="space-y-6 pt-6 border-t border-white/5">
          <h3 className="font-serif text-2xl text-white uppercase tracking-wider font-bold">Project Features & Architecture</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {property.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-[#161617]/40 border border-white/5 rounded-sm">
                <CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <span className="text-sm font-light text-slate-200 leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Interactive Floorplan Zoom & Pan Modal */}
      <FloorPlanZoomModal
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        imageUrl={lightboxImage || ''}
        title={`${property.title} - ${effectiveFloorLayouts[safeActiveIndex]?.levelName || 'Floor Blueprint'}`}
        floorLayouts={effectiveFloorLayouts}
        activeFloorIndex={safeActiveIndex}
        onSelectFloor={(idx) => {
          setActiveFloorIndex(idx);
          if (effectiveFloorLayouts && effectiveFloorLayouts[idx]) {
            setLightboxImage(effectiveFloorLayouts[idx].imageUrl || floorPlanImages[idx % floorPlanImages.length]);
          }
        }}
      />

      {/* Cinematic Drone Video Tour Overlay Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-10"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl aspect-[16/9] bg-black rounded overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src={getVideoEmbedUrl(property.videoUrl)}
                title={`${property.title} cinematic drone virtual exhibition tour`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-4 right-4 bg-black/80 hover:bg-white hover:text-black text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-lg cursor-pointer"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

