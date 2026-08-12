/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, Building, ShieldCheck, ChevronLeft, ChevronRight, ArrowRight, Sparkles, 
  Building2, Landmark, Plane, Anchor, Container, Hotel, X, Phone, Mail, MapPin, 
  Globe, Calendar, Award, CheckCircle2 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { CMSGroupConcern } from '../lib/cms';

interface GroupConcernsPageProps {
  onNavigateHome: () => void;
  onNavigateToContact: () => void;
  concernsList?: CMSGroupConcern[];
}

export default function GroupConcernsPage({ onNavigateHome, onNavigateToContact, concernsList }: GroupConcernsPageProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedConcern, setSelectedConcern] = useState<CMSGroupConcern | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const defaultConcerns = [
    { 
      id: 'concern-1', 
      num: '01', 
      name: 'Madina Properties & Housing Ltd', 
      desc: 'Real Estate & Land Development — Est. 1989',
      established: '1989',
      phone: '+8801713401405',
      email: 'madina.properties@moon-bd.com',
      address: 'Mizan Tower, Mirpur Road, Kallyanpur, Dhaka-1207',
      website: 'https://www.madinaproperties.com',
      aboutText: 'The foundational real estate wing of Moon Group, establishing prestigious residential projects, secure luxury apartment complexes, and high-standard gated communities across Bangladesh. For over three decades, we have shaped the modern landscape of Dhaka with visual landmarks and structural perfection.',
      gallery: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fm=jpg&q=80&w=800'
      ],
      features: ['35+ Luxury Developments Completed', 'Strategic Gated Communities', 'Fully Legal & RAJUK Approved Land', 'Eco-friendly Green Building Designs'],
      icon: Building2 
    },
    { 
      id: 'concern-2', 
      num: '02', 
      name: 'The Moon Construction', 
      desc: 'Heavy Civil Infrastructure & Engineering',
      established: '1992',
      phone: '+8801712345671',
      email: 'construction@moon-bd.com',
      address: 'Plot 12, Road 11, Block H, Banani, Dhaka',
      website: 'https://www.moonconstruction.com',
      aboutText: 'Our main heavy engineering division, constructing major roads, high-grade bridges, commercial towers, and multi-story institutional structures under BUET guidelines and rigorous government-level testing standards.',
      gallery: [
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?fm=jpg&q=80&w=800'
      ],
      features: ['State-of-the-Art Batching Plants', 'In-house Concrete Quality Labs', 'Over 150km of Highways Completed', 'Collaborations with International Consultants'],
      icon: Building 
    },
    { 
      id: 'concern-3', 
      num: '03', 
      name: 'Bidhilipi Constructions Ltd', 
      desc: 'Commercial Developments & Corporate Assets',
      established: '1998',
      phone: '+8801712345672',
      email: 'bidhilipi@moon-bd.com',
      address: 'Kamal Ataturk Avenue, Banani, Dhaka-1213',
      website: 'https://www.bidhilipi.com',
      aboutText: 'Specializes in iconic multi-tenant commercial centers, shopping complexes, and state-of-the-art office assets designed for local corporate leaders and international enterprises seeking premier Grade-A work environments.',
      gallery: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?fm=jpg&q=80&w=800'
      ],
      features: ['Grade-A Smart Workspace Towers', 'High-speed Intelligent Elevators', 'Double-height Reception Lobbies', 'LEED-certified Structural Layouts'],
      icon: Landmark 
    },
    { 
      id: 'concern-4', 
      num: '04', 
      name: 'Sun Moon Star Real Estate Int\'l', 
      desc: 'Premium Housing & Luxury Living — Est. 2003',
      established: '2003',
      phone: '+8801712345673',
      email: 'luxury@moon-bd.com',
      address: 'Road 54, Sector 1, Block F, Gulshan 2, Dhaka',
      website: 'https://www.sunmoonstar.com',
      aboutText: 'Redefining the standards of ultimate luxury residential communities. Sun Moon Star incorporates smart-home automation, high-end recreational clubhouses, infinity pools, and sustainable therapeutic botanical garden layouts.',
      gallery: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?fm=jpg&q=80&w=800'
      ],
      features: ['Premium Italian Marble Finishes', 'Rooftop Infinity Swimming Pools', '24/7 Multi-Tier Biometric Security', 'Exclusive Residents Clubhouses'],
      icon: Sparkles 
    },
    { 
      id: 'concern-5', 
      num: '05', 
      name: 'Moon Bangladesh Limited', 
      desc: 'Global Logistics, Trading & Materials — Est. 1994',
      established: '1994',
      phone: '+8801712345674',
      email: 'trading@moon-bd.com',
      address: 'Kallyanpur Bus Terminal, Mirpur Road, Dhaka',
      website: 'https://www.moonbangladesh.com',
      aboutText: 'Our international trading and chemical supply arm, supporting massive logistics networks, chemical processing, raw material imports, construction aggregates, and critical resource distribution nationwide.',
      gallery: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1578575437130-527eed3abbec?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?fm=jpg&q=80&w=800'
      ],
      features: ['National Inbound Cargo Fleet', 'Import Aggregates For Concrete Production', 'Chemical Warehousing in 4 Districts', 'Bulk Distribution Partnerships'],
      icon: Container 
    },
    { 
      id: 'concern-6', 
      num: '06', 
      name: 'Moon Int\'l Garments & Textile', 
      desc: 'High-Scale Textile Production & Exports',
      established: '2001',
      phone: '+8801712345675',
      email: 'garments@moon-bd.com',
      address: 'Savars Industrial Area, Dhaka',
      website: 'https://www.moontextiles.com',
      aboutText: 'Operating state-of-the-art manufacturing plants supplying major European and North American fashion brands, ensuring highly safe, environmentally friendly production lines and strict ethical labor compliance.',
      gallery: [
        'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1524295928322-4b986a49ad23?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?fm=jpg&q=80&w=800'
      ],
      features: ['100% Export-Oriented Operations', 'Rana Plaza Safety Compliant', 'Oeko-Tex Certified Dyeing Units', 'Annual Production of 12M+ Units'],
      icon: Layers 
    },
    { 
      id: 'concern-7', 
      num: '07', 
      name: 'Sun Moon Star Int\'l Hotel', 
      desc: 'Luxury Corporate Hospitality & Fine Dining',
      established: '2010',
      phone: '+88029881122',
      email: 'hotel@moon-bd.com',
      address: 'Road 11, Banani, Dhaka-1213',
      website: 'https://www.sms-hotel.com',
      aboutText: 'Delivering five-star business hospitality, high-end corporate banquet facilities, luxury international suites, health club centers, and fine culinary experiences for international travelers and foreign corporate delegations.',
      gallery: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?fm=jpg&q=80&w=800'
      ],
      features: ['120 Multi-room Luxury Suites', 'Rooftop Helipad & Sky Lounge', 'Fully Equipped Convention Center', 'Michelin-inspired Restaurants'],
      icon: Hotel 
    },
    { 
      id: 'concern-8', 
      num: '08', 
      name: 'South Bangla Agriculture & Commerce Bank', 
      desc: 'Banking, Trade Finance & Synergies',
      established: '2013',
      phone: '+8802223384501',
      email: 'info@sbacbank.com',
      address: 'BSCIC Bhaban, 37/A Dilkusha C/A, Dhaka-1000',
      website: 'https://www.sbacbank.com',
      aboutText: 'Strong capital and institutional investment partner, facilitating fast-track construction financing, home loan options, export-import facilities, and international trade finance operations for Moon Group developments.',
      gallery: [
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?fm=jpg&q=80&w=800',
        'https://images.unsplash.com/photo-1560518883-ce09059eeffa?fm=jpg&q=80&w=800'
      ],
      features: ['85+ Branches Across Bangladesh', 'Fast-Track Construction Finance', 'Custom Home Loan Portfolios', 'Advanced Digital Corporate Banking'],
      icon: Landmark 
    }
  ];

  const getIconForConcern = (name: string) => {
    const lowercase = name.toLowerCase();
    if (lowercase.includes('hotel') || lowercase.includes('hospitality')) return Hotel;
    if (lowercase.includes('textile') || lowercase.includes('garments')) return Layers;
    if (lowercase.includes('bank') || lowercase.includes('finance')) return Landmark;
    if (lowercase.includes('construction') || lowercase.includes('engineering')) return Building;
    if (lowercase.includes('logistics') || lowercase.includes('trading') || lowercase.includes('shipping')) return Container;
    return Building2;
  };

  const concerns = concernsList && concernsList.length > 0 ? concernsList : defaultConcerns;

  // Slide navigation helpers
  const handlePrevSlide = (gallery: string[]) => {
    setActiveSlide((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextSlide = (gallery: string[]) => {
    setActiveSlide((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={`min-h-screen pt-24 pb-20 transition-colors duration-500 relative ${isDark ? 'bg-[#0B0B0C] text-white' : 'bg-[#FAF6EE] text-[#2B251F]'}`}>
      
      {/* Custom Architectural Blueprint Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden h-[900px]">
        <img 
          src="https://lh3.googleusercontent.com/d/1hJS7jjTsKMEWK2Ki6PBHWGbRzKQGLeda" 
          alt="Group Blueprint Background" 
          className={`w-full h-full object-cover object-center transition-all duration-500 ${
            isDark ? 'opacity-[0.1] invert brightness-125' : 'opacity-[0.15] mix-blend-multiply'
          }`}
          referrerPolicy="no-referrer"
        />
        {/* Soft overlay gradient */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-b from-[#0b0b0c]/90 via-[#0b0b0c]/80 to-[#0b0b0c]' 
            : 'bg-gradient-to-b from-[#FAF6EE]/90 via-[#FAF6EE]/80 to-[#FAF6EE]'
        }`} />
      </div>

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Back Button */}
        <button 
          onClick={onNavigateHome}
          className={`group flex items-center gap-2 mb-12 font-mono text-xs uppercase tracking-widest font-bold cursor-pointer transition-colors ${
            isDark ? 'text-neutral-400 hover:text-white' : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </button>

        {/* Page Title Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-24">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#EE1B24]"></span>
              <span className="font-mono text-xs tracking-[0.2em] text-[#FF4A4F] uppercase font-bold">
                CONGLOMERATE VERTICALS
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-7xl font-bold tracking-tight uppercase leading-[0.95]">
              Moon Group of <br />
              <span className="text-[#EE1B24]">Industries</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className={`text-sm sm:text-base font-light leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
              With an active footprint since 1989 across construction, steel, banking, logistics, garments, and commercial property assets, we possess the ultimate resource and financial security in Bangladesh. Click on any company card to inspect rich gallery, about narrative, and direct contact details.
            </p>
          </div>
        </div>

        {/* Detailed Verticals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {concerns.map((item, idx) => {
            const IconComponent = (item as any).icon || getIconForConcern(item.name);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => {
                  setSelectedConcern(item);
                  setActiveSlide(0);
                }}
                className={`group relative border p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 rounded-sm hover:-translate-y-1 cursor-pointer hover:scale-[1.01] ${
                  isDark 
                    ? 'bg-[#141416]/90 border-white/5 hover:border-[#EE1B24]/40 hover:shadow-2xl hover:shadow-[#EE1B24]/5' 
                    : 'bg-[#F4EEDA]/90 border-[#2B251F]/10 hover:border-[#EE1B24]/40 hover:shadow-xl hover:shadow-stone-900/5'
                }`}
              >
                {/* Visual Accent */}
                <div className="absolute w-6 h-6 border-t-2 border-l-2 border-[#EE1B24]/0 top-4 left-4 group-hover:border-[#EE1B24] transition-all duration-500 rounded-tl-sm"></div>
                <div className="absolute w-6 h-6 border-b-2 border-r-2 border-[#EE1B24]/0 bottom-4 right-4 group-hover:border-[#EE1B24] transition-all duration-500 rounded-br-sm"></div>

                <div>
                  {/* Top line */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-4xl text-[#EE1B24]/20 group-hover:text-[#EE1B24]/30 transition-colors duration-500 font-bold">
                      {item.num || `0${idx + 1}`}
                    </span>
                    <div className={`p-3 rounded-sm transition-colors duration-500 ${
                      isDark ? 'bg-white/5 group-hover:bg-[#EE1B24]/10 text-neutral-400 group-hover:text-[#EE1B24]' : 'bg-stone-900/5 group-hover:bg-[#EE1B24]/10 text-stone-600 group-hover:text-[#EE1B24]'
                    }`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Core details */}
                  <div className="space-y-4">
                    <h3 className={`font-serif text-2xl uppercase tracking-tight font-bold group-hover:text-[#FF4A4F] transition-colors duration-300 ${isDark ? 'text-white' : 'text-[#2B251F]'}`}>
                      {item.name}
                    </h3>
                    <p className="font-mono text-xs text-[#EE1B24] uppercase tracking-widest font-semibold">
                      {item.desc}
                    </p>
                    <p className={`text-xs sm:text-sm font-light leading-relaxed mt-4 line-clamp-3 ${isDark ? 'text-neutral-400 group-hover:text-neutral-300' : 'text-stone-600 group-hover:text-stone-800'}`}>
                      {item.aboutText || (item as any).detail || 'Delivering stellar standards, strategic corporate capacity, structural security, and comprehensive engineering synergy under Al-Haj Mizanur Rahman\'s founding layout.'}
                    </p>
                  </div>
                </div>

                {/* Arrow indicator link */}
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono uppercase tracking-widest">
                  <span className={`${isDark ? 'text-neutral-500 group-hover:text-neutral-300' : 'text-stone-500 group-hover:text-stone-700'}`}>
                    VIEW DETAILS & SLIDER
                  </span>
                  <div className="flex items-center gap-1.5 text-[#EE1B24] font-bold group-hover:translate-x-1.5 transition-transform duration-300">
                    <span>INSPECT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Joint Venture CTA block */}
        <div className={`mt-24 p-8 sm:p-12 border rounded-sm flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden ${
          isDark ? 'bg-[#141416]/50 border-white/10' : 'bg-[#F4EEDA]/70 border-[#2B251F]/10'
        }`}>
          {/* Subtle decoration */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#EE1B24]/5 rounded-full filter blur-3xl pointer-events-none"></div>

          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <h3 className={`font-serif text-2xl sm:text-3xl font-bold uppercase ${isDark ? 'text-white' : 'text-[#2B251F]'}`}>
              Partner With Moon Bangladesh Limited
            </h3>
            <p className={`text-xs sm:text-sm font-light leading-relaxed ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
              Are you a landowner interested in a joint venture partnership or structural construction project? Reach out to our executive committee team today for high-yield, premium developer offerings.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <button 
              onClick={onNavigateHome}
              className={`px-6 py-3 border font-bold text-xs tracking-widest uppercase transition-colors rounded-sm text-center cursor-pointer ${
                isDark 
                  ? 'border-white/10 hover:bg-white/5 text-white' 
                  : 'border-stone-400 hover:bg-stone-900/5 text-[#2B251F]'
              }`}
            >
              Back to Home
            </button>
            <button 
              onClick={onNavigateToContact}
              className="px-6 py-3 bg-[#EE1B24] hover:bg-[#CC121A] text-white font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-sm shadow-lg text-center cursor-pointer hover:scale-[1.01]"
            >
              Contact Committee
            </button>
          </div>
        </div>

      </div>

      {/* Dynamic Detail Popup Modal with Hero Slider & Contact Details */}
      <AnimatePresence>
        {selectedConcern && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-full max-w-5xl rounded-sm border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col ${
                isDark ? 'bg-[#121214] border-white/10 text-white' : 'bg-[#FAF6EE] border-[#2B251F]/15 text-[#2B251F]'
              }`}
            >
              {/* Top sticky bar of popup */}
              <div className={`p-6 sm:p-8 flex items-center justify-between border-b shrink-0 ${
                isDark ? 'border-white/5 bg-[#121214]' : 'border-[#2B251F]/10 bg-[#FAF6EE]'
              }`}>
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-2 py-0.5 bg-[#EE1B24]/10 text-[#EE1B24] rounded-sm font-bold tracking-widest">
                      CONCERN {selectedConcern.num || '01'}
                    </span>
                    {selectedConcern.established && (
                      <span className="font-mono text-xs opacity-60 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#EE1B24]" />
                        ESTD. {selectedConcern.established}
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight mt-1">
                    {selectedConcern.name}
                  </h2>
                </div>
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedConcern(null)}
                  className={`p-3 rounded-sm border transition-all cursor-pointer ${
                    isDark 
                      ? 'border-white/5 hover:border-white/20 bg-white/5 text-neutral-400 hover:text-white' 
                      : 'border-stone-200 hover:border-stone-400 bg-stone-50 text-stone-600 hover:text-stone-900'
                  }`}
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable contents of popup */}
              <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-1">
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                  
                  {/* COLUMN 1: Image Hero Slider & Highlights (7/12 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Hero Slider Frame */}
                    {(() => {
                      const slides = selectedConcern.gallery && selectedConcern.gallery.length > 0 
                        ? selectedConcern.gallery 
                        : [
                            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=80&w=800',
                            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?fm=jpg&q=80&w=800',
                            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?fm=jpg&q=80&w=800'
                          ];
                      
                      return (
                        <div className={`relative h-[250px] sm:h-[350px] w-full overflow-hidden border rounded-sm group/slider ${
                          isDark ? 'border-white/5 bg-neutral-900' : 'border-[#2B251F]/10 bg-stone-100'
                        }`}>
                          {/* Main Slide Image */}
                          <motion.img
                            key={activeSlide}
                            src={slides[activeSlide]}
                            alt={`${selectedConcern.name} slide ${activeSlide + 1}`}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            referrerPolicy="no-referrer"
                          />

                          {/* Gradient Overlays */}
                          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                          {/* Navigation Arrows */}
                          {slides.length > 1 && (
                            <>
                              <button
                                onClick={() => handlePrevSlide(slides)}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-sm hover:bg-black/80 transition-colors opacity-0 group-hover/slider:opacity-100 cursor-pointer"
                              >
                                <ChevronLeft className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleNextSlide(slides)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 backdrop-blur-md border border-white/10 text-white rounded-sm hover:bg-black/80 transition-colors opacity-0 group-hover/slider:opacity-100 cursor-pointer"
                              >
                                <ChevronRight className="w-5 h-5" />
                              </button>
                            </>
                          )}

                          {/* Slide Indicator Number */}
                          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] uppercase tracking-widest py-1 px-2.5 rounded-sm">
                            IMAGE {activeSlide + 1} / {slides.length}
                          </div>

                          {/* Dots navigation indicator */}
                          {slides.length > 1 && (
                            <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
                              {slides.map((_, sidx) => (
                                <button
                                  key={sidx}
                                  onClick={() => setActiveSlide(sidx)}
                                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                                    activeSlide === sidx ? 'bg-[#EE1B24] w-4' : 'bg-white/40 hover:bg-white/75'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Features List */}
                    {selectedConcern.features && selectedConcern.features.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-[#EE1B24] flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          <span>Core Strengths & Features</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedConcern.features.map((feat, fidx) => (
                            <div 
                              key={fidx} 
                              className={`flex items-center gap-2.5 p-3.5 border rounded-sm ${
                                isDark ? 'bg-white/[0.02] border-white/5' : 'bg-stone-50 border-[#2B251F]/5'
                              }`}
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#EE1B24] shrink-0" />
                              <span className="text-xs font-medium">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* COLUMN 2: About Us Narrative & Contact Cards (5/12 cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    {/* About Us Narrative */}
                    <div className="space-y-3">
                      <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-[#EE1B24]">
                        Corporate Overview & History
                      </h4>
                      <p className={`text-sm sm:text-base font-light leading-relaxed font-serif ${
                        isDark ? 'text-neutral-300' : 'text-stone-800'
                      }`}>
                        {selectedConcern.aboutText || 'Delivering stellar standards, strategic corporate capacity, structural security, and comprehensive engineering synergy under Al-Haj Mizanur Rahman\'s founding layout.'}
                      </p>
                    </div>

                    {/* Contact details box */}
                    <div className={`p-6 border rounded-sm space-y-4 ${
                      isDark ? 'bg-[#18181B] border-white/5' : 'bg-[#F3EDDC] border-[#2B251F]/10'
                    }`}>
                      <h4 className="font-mono text-xs uppercase tracking-widest font-bold text-[#EE1B24] border-b pb-2 border-dashed border-[#EE1B24]/20">
                        DIRECT CONTACT INFORMATION
                      </h4>
                      
                      <div className="space-y-3.5 font-mono text-xs">
                        
                        {/* Address info */}
                        {selectedConcern.address && (
                          <div className="flex gap-3">
                            <MapPin className="w-4 h-4 text-[#EE1B24] shrink-0 mt-0.5" />
                            <div>
                              <span className="block font-bold text-[10px] uppercase tracking-wider text-[#EE1B24]">Registered Office</span>
                              <span className={`block mt-0.5 leading-relaxed ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                                {selectedConcern.address}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Phone info */}
                        {selectedConcern.phone && (
                          <div className="flex gap-3">
                            <Phone className="w-4 h-4 text-[#EE1B24] shrink-0 mt-0.5" />
                            <div>
                              <span className="block font-bold text-[10px] uppercase tracking-wider text-[#EE1B24]">Phone Helpline</span>
                              <a 
                                href={`tel:${selectedConcern.phone}`}
                                className={`block mt-0.5 hover:text-[#FF4A4F] transition-colors underline ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}
                              >
                                {selectedConcern.phone}
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Email info */}
                        {selectedConcern.email && (
                          <div className="flex gap-3">
                            <Mail className="w-4 h-4 text-[#EE1B24] shrink-0 mt-0.5" />
                            <div>
                              <span className="block font-bold text-[10px] uppercase tracking-wider text-[#EE1B24]">Corporate Email</span>
                              <a 
                                href={`mailto:${selectedConcern.email}`}
                                className={`block mt-0.5 hover:text-[#FF4A4F] transition-colors underline break-all ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}
                              >
                                {selectedConcern.email}
                              </a>
                            </div>
                          </div>
                        )}

                        {/* Website info */}
                        {selectedConcern.website && (
                          <div className="flex gap-3">
                            <Globe className="w-4 h-4 text-[#EE1B24] shrink-0 mt-0.5" />
                            <div>
                              <span className="block font-bold text-[10px] uppercase tracking-wider text-[#EE1B24]">Official Portal</span>
                              <a 
                                href={selectedConcern.website}
                                target="_blank"
                                rel="noreferrer"
                                className="block mt-0.5 text-[#EE1B24] hover:text-[#CC121A] transition-colors underline font-bold"
                              >
                                {selectedConcern.website.replace('https://', '').replace('http://', '').replace('www.', '')} ↗
                              </a>
                            </div>
                          </div>
                        )}

                      </div>
                    </div>

                  </div>

                </div>

              </div>

              {/* Bottom footer bar of popup */}
              <div className={`p-6 border-t flex items-center justify-between shrink-0 ${
                isDark ? 'border-white/5 bg-[#141416]' : 'border-[#2B251F]/10 bg-[#FAF6EE]'
              }`}>
                <span className="text-[10px] font-mono opacity-40 uppercase">
                  MOON GROUP CONGLOMERATE INTEGRATION © 2026
                </span>
                <button
                  onClick={() => setSelectedConcern(null)}
                  className="px-5 py-2 bg-[#EE1B24] hover:bg-[#CC121A] text-white font-mono text-[10px] uppercase tracking-widest font-bold rounded-sm transition-all shadow-md cursor-pointer hover:scale-[1.01]"
                >
                  Close Inspection
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
