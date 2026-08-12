/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Property } from '../types';
import { properties as staticProperties } from '../data/properties';
import { useTheme } from '../context/ThemeContext';
import { 
  Search, 
  MapPin, 
  Building, 
  Bed, 
  Bath, 
  Move, 
  ArrowRight, 
  SlidersHorizontal,
  Sparkles,
  Info
} from 'lucide-react';

import { CMSSiteSettings } from '../lib/cms';

interface PropertiesPageProps {
  propertiesList?: Property[];
  siteSettings?: CMSSiteSettings | null;
  onSelectPropertyDetail: (property: Property) => void;
  onSelectPropertyForBooking: (property: Property) => void;
  onNavigateToBooking: () => void;
}

export default function PropertiesPage({
  propertiesList,
  siteSettings,
  onSelectPropertyDetail,
  onSelectPropertyForBooking,
  onNavigateToBooking
}: PropertiesPageProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedType, setSelectedType] = useState<'all' | 'residential' | 'commercial'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'ongoing' | 'upcoming' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const finalProperties = propertiesList && propertiesList.length > 0 ? propertiesList : staticProperties;

  const havenProp = finalProperties.find(p => p.id === 'haven-tower' || p.title.toLowerCase().includes('haven tower')) || finalProperties[0];
  const havenBannerImage = siteSettings?.havenTowerBannerImage || havenProp?.imageUrl || '/haven_tower/img_4.jpg';

  // Filter Properties
  const filteredProperties = finalProperties.filter((prop) => {
    const matchesType = selectedType === 'all' || prop.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || prop.status === selectedStatus;
    const matchesSearch =
      searchQuery === '' ||
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.area.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesStatus && matchesSearch;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Ready / Handover Ready';
      case 'upcoming':
        return 'Upcoming Venture';
      case 'ongoing':
        return 'Ongoing / In Progress';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'upcoming':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ongoing':
        return 'bg-red-500/20 text-red-500 border-red-500/30';
      default:
        return 'bg-neutral-800 text-neutral-400 border-neutral-700';
    }
  };

  return (
    <div className={`min-h-screen pt-20 pb-28 transition-colors duration-500 ${isDark ? 'bg-[#0B0B0C] text-white' : 'bg-[#FAF6EE] text-[#2B251F]'}`}>
      
      {/* Page Header Header */}
      <div className={`relative py-16 sm:py-20 border-b overflow-hidden transition-colors ${isDark ? 'bg-[#141416] border-white/5' : 'bg-[#F4EEDA] border-stone-300'}`}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
          <img 
            src="https://lh3.googleusercontent.com/d/1rAPWhY9CPW0d9Yq8udS56HZhMDxNu2NN" 
            alt="Properties Header Background" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#FF4A4F]/10 rounded-full filter blur-[100px] pointer-events-none z-0" />
        
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10 text-center sm:text-left">
          <span className="font-mono text-xs text-[#FF4A4F] uppercase tracking-[0.25em] font-bold block mb-3">
            Elite Developments
          </span>
          <h1 className={`font-serif text-3xl sm:text-5xl font-medium tracking-tight max-w-4xl ${isDark ? 'text-white' : 'text-stone-900'}`}>
            Signature Properties
          </h1>
          <p className={`font-light text-sm sm:text-base mt-4 max-w-2xl leading-relaxed ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
            Browse through our portfolio of ultra-luxury residential suites, prime commercial showrooms, and ready-to-move architectural marvels built to withstand generation-level structural tolerances.
          </p>
        </div>
      </div>

      {/* Main Grid Area */}
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 mt-12">

        {/* Haven Tower Special Flagship Promotion Banner */}
        <div className={`relative rounded-2xl overflow-hidden border p-6 sm:p-8 mb-12 shadow-2xl transition-all duration-300 ${
          isDark 
            ? 'border-amber-500/40 bg-gradient-to-r from-red-950/80 via-neutral-900 to-black text-white' 
            : 'border-amber-500/50 bg-white text-stone-900 shadow-amber-500/10'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-xs font-bold uppercase ${
                isDark 
                  ? 'bg-amber-500/20 border border-amber-400/40 text-amber-300' 
                  : 'bg-red-100 border border-red-300 text-red-700'
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                <span>FLAGSHIP INAUGURATION • MAIN ATTRACTION</span>
              </div>
              <h2 className={`text-2xl sm:text-4xl font-serif font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                {siteSettings?.havenTowerTitle || havenProp?.title || 'HEAVEN TOWER by Moon Group'}
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${isDark ? 'text-neutral-300' : 'text-stone-700'}`}>
                {siteSettings?.havenTowerDescription || havenProp?.description || '📢 হেভেন টাওয়ার (HEAVEN TOWER) এর উদ্বোধন সম্পন্ন হয়েছে - বর্তমানে বুকিং এবং সেল চলছে! আকর্ষণীয় আর্কিটেকচার, ডাবল-হাইট এট্রিয়াম লবি, রুফটপ ইনফিনিটি পুল এবং Zone-4 ভূমিকম্প প্রতিরোধী স্ট্রাকচার বিশিষ্ট মুন গ্রুপের ফ্ল্যাগশিপ প্রজেক্ট।'}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => {
                    const havenProp = finalProperties.find(p => p.id === 'haven-tower') || finalProperties[0];
                    onSelectPropertyDetail(havenProp);
                  }}
                  className="bg-amber-400 hover:bg-amber-300 text-black font-bold py-2.5 px-5 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-400/20"
                >
                  <span>Explore Heaven Tower Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const havenProp = finalProperties.find(p => p.id === 'haven-tower') || finalProperties[0];
                    onSelectPropertyForBooking(havenProp);
                    onNavigateToBooking();
                  }}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 px-5 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-red-600/20"
                >
                  <span>Book Haven Unit Now</span>
                </button>
              </div>
            </div>
            <div className={`lg:col-span-5 relative aspect-[16/10] rounded-xl overflow-hidden border shadow-xl group ${
              isDark ? 'border-amber-500/30 bg-neutral-900' : 'border-stone-300 bg-stone-100'
            }`}>
              <img
                src={havenBannerImage}
                alt="Haven Tower Flagship"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
                <span className="text-amber-300 font-mono text-xs font-semibold">★ Mirpur Section 12, Dhaka • Inauguration Offer Currently Open</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Search and Filters Bar */}
        <div className={`border rounded-xl p-4 sm:p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-4 ${
          isDark ? 'bg-[#141416] border-white/10 text-white' : 'bg-white border-stone-300 text-stone-900 shadow-md'
        }`}>
          {/* Search Box */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by area or project name (e.g., Gulshan)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full border rounded py-3 pl-11 pr-4 text-xs focus:outline-none focus:border-[#FF4A4F] transition-colors ${
                isDark 
                  ? 'bg-white/5 border-white/10 text-white placeholder-neutral-500' 
                  : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-500'
              }`}
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedType(selectedType === 'residential' ? 'all' : 'residential')}
              className={`px-4 py-2 border rounded text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                selectedType === 'residential'
                  ? 'border-[#FF4A4F] bg-[#FF4A4F]/10 text-[#FF4A4F] font-bold'
                  : isDark ? 'border-white/10 hover:border-white/20 text-neutral-300' : 'border-stone-300 hover:border-stone-400 text-stone-700'
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setSelectedType(selectedType === 'commercial' ? 'all' : 'commercial')}
              className={`px-4 py-2 border rounded text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                selectedType === 'commercial'
                  ? 'border-[#FF4A4F] bg-[#FF4A4F]/10 text-[#FF4A4F] font-bold'
                  : isDark ? 'border-white/10 hover:border-white/20 text-neutral-300' : 'border-stone-300 hover:border-stone-400 text-stone-700'
              }`}
            >
              Commercial
            </button>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 border rounded flex items-center justify-center gap-2 text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                showFilters ? 'border-amber-500 bg-amber-500/10 text-amber-500' : isDark ? 'border-white/10 text-neutral-300' : 'border-stone-300 text-stone-700'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Expanded Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className={`border p-6 rounded-xl flex flex-col sm:flex-row gap-6 ${
                isDark ? 'bg-[#1C1C1E] border-white/5' : 'bg-white border-stone-300 shadow-md'
              }`}>
                <div>
                  <span className={`block text-[10px] font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>Project Status</span>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'ongoing', 'upcoming', 'completed'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status as any)}
                        className={`px-3 py-1.5 rounded text-xs font-mono transition-colors uppercase cursor-pointer border ${
                          selectedStatus === status
                            ? 'border-amber-500 bg-amber-500/10 text-amber-600 font-bold'
                            : isDark ? 'border-white/5 bg-white/5 hover:border-white/10 text-neutral-300' : 'border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-800'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className={`block text-[10px] font-mono uppercase tracking-wider mb-2 ${isDark ? 'text-neutral-400' : 'text-stone-500'}`}>Property Type</span>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'residential', 'commercial'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type as any)}
                        className={`px-3 py-1.5 rounded text-xs font-mono transition-colors uppercase cursor-pointer border ${
                          selectedType === type
                            ? 'border-blue-500 bg-blue-500/10 text-blue-600 font-bold'
                            : isDark ? 'border-white/5 bg-white/5 hover:border-white/10 text-neutral-300' : 'border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-800'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="py-24 border border-dashed border-stone-300 rounded-xl text-center">
            <Info className="w-10 h-10 text-neutral-400 mx-auto mb-4" />
            <h4 className={`font-serif text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-stone-900'}`}>No Matching Properties</h4>
            <p className={`text-xs sm:text-sm font-light max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
              We couldn't find any developments matching your selected filters. Try broadening your query or selecting another category.
            </p>
          </div>
        )}

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProperties.map((property) => (
            <motion.div
              key={property.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => onSelectPropertyDetail(property)}
              className={`rounded-2xl border overflow-hidden group hover:border-[#FF4A4F]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-lg ${
                isDark ? 'bg-[#141416] border-white/5 text-white' : 'bg-white border-stone-300 text-stone-900'
              }`}
            >
              <div>
                {/* Media frame */}
                <div className={`relative aspect-[3/2] overflow-hidden border-b ${isDark ? 'bg-neutral-900 border-white/5' : 'bg-stone-100 border-stone-200'}`}>
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-102 transition-transform duration-500"
                  />
                  {/* Status Tag */}
                  <span className={`absolute top-4 left-4 px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest border rounded backdrop-blur-md ${getStatusColor(property.status)}`}>
                    {getStatusLabel(property.status)}
                  </span>
                  {/* Price Tag */}
                  <span className="absolute bottom-4 right-4 bg-black/85 border border-white/10 rounded-sm py-1 px-2.5 font-mono text-xs text-white">
                    {property.priceRange}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  {/* Category and location info */}
                  <div className="flex items-center gap-2 mb-2">
                    <Building className={`w-3.5 h-3.5 ${isDark ? 'text-neutral-500' : 'text-stone-500'}`} />
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                      {property.type}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <MapPin className={`w-3.5 h-3.5 ${isDark ? 'text-neutral-500' : 'text-stone-500'}`} />
                    <span className={`text-[10px] font-mono uppercase tracking-wider ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                      {property.location}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-serif text-xl font-medium tracking-tight mb-3 text-left ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    {property.title}
                  </h3>

                  {/* Highlights paragraph */}
                  <p className={`text-xs font-light leading-relaxed line-clamp-2 mb-6 text-left ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                    {property.description}
                  </p>

                  {/* Specs footer */}
                  <div className={`grid grid-cols-3 gap-3 py-4 border-t text-neutral-400 ${isDark ? 'border-white/5' : 'border-stone-200'}`}>
                    <div className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-red-500" />
                      <span className={`text-xs font-mono font-bold ${isDark ? 'text-neutral-300' : 'text-stone-800'}`}>{property.beds || 'N/A'} <span className="text-[10px] font-light uppercase opacity-75">Beds</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-red-500" />
                      <span className={`text-xs font-mono font-bold ${isDark ? 'text-neutral-300' : 'text-stone-800'}`}>{property.baths || 'N/A'} <span className="text-[10px] font-light uppercase opacity-75">Baths</span></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Move className="w-3.5 h-3.5 text-red-500" />
                      <span className={`text-xs font-mono font-bold ${isDark ? 'text-neutral-300' : 'text-stone-800'}`}>{property.sizeRange.split(' ')[0]} <span className="text-[10px] font-light uppercase opacity-75">SqFt</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interaction Footer Row */}
              <div className={`p-6 border-t flex gap-3 ${isDark ? 'bg-[#0E0E0F] border-white/5' : 'bg-stone-50 border-stone-200'}`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPropertyDetail(property);
                  }}
                  className={`flex-1 font-bold uppercase text-[10px] tracking-widest py-3 border rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    isDark 
                      ? 'bg-white/5 hover:bg-white/10 text-white border-white/10' 
                      : 'bg-stone-200 hover:bg-stone-300 text-stone-900 border-stone-300'
                  }`}
                >
                  <span>Explore Details</span>
                  <ArrowRight className="w-3 h-3 text-red-500" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectPropertyForBooking(property);
                    onNavigateToBooking();
                  }}
                  className="px-4 py-3 bg-[#EE1B24] hover:bg-red-700 text-white font-bold uppercase text-[10px] tracking-widest border border-red-600 rounded transition-all duration-300 cursor-pointer shadow-md"
                  title="Book private viewing"
                >
                  Book Private
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
