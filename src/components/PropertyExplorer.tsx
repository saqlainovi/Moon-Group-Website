/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { properties } from '../data/properties';
import { Property, Amenity } from '../types';
import { getFitClass, getPositionClass } from '../lib/imageUtils';
import {
  Bed,
  Bath,
  Move,
  MapPin,
  X,
  Info,
  Calendar,
  Sparkles,
  Send,
  Building,
  CheckCircle2,
  Phone,
  Mail,
  User,
  MessageSquare
} from 'lucide-react';

interface PropertyExplorerProps {
  searchFilters?: { type: string; status: string; area: string } | null;
  onSelectPropertyForBooking: (property: Property) => void;
  onNavigateToBooking: () => void;
  propertiesList?: Property[];
  onSelectPropertyDetail?: (property: Property) => void;
}

export default function PropertyExplorer({
  searchFilters,
  onSelectPropertyForBooking,
  onNavigateToBooking,
  propertiesList,
  onSelectPropertyDetail
}: PropertyExplorerProps) {
  const [selectedType, setSelectedType] = useState<'all' | 'residential' | 'commercial'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'ongoing' | 'upcoming' | 'completed' | 'proposed' | 'under-construction'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const finalProperties = propertiesList && propertiesList.length > 0 ? propertiesList : properties;

  // Reset selected image when active property changes
  useEffect(() => {
    if (activeProperty) {
      setSelectedImageUrl(activeProperty.imageUrl);
    } else {
      setSelectedImageUrl(null);
    }
  }, [activeProperty]);

  // Inquiry form states
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Sync external filters from Hero search bar
  useEffect(() => {
    if (searchFilters) {
      if (searchFilters.type !== 'all') {
        setSelectedType(searchFilters.type as any);
      }
      if (searchFilters.status !== 'all') {
        setSelectedStatus(searchFilters.status as any);
      }
      if (searchFilters.area !== 'all') {
        setSearchQuery(searchFilters.area);
      }
      // Scroll to property element
      const element = document.getElementById('properties-explore-anchor');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [searchFilters]);

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

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      // Save inquiry log to localStorage
      const existing = localStorage.getItem('moon_inquiries');
      const list = existing ? JSON.parse(existing) : [];
      list.push({
        id: Math.random().toString(36).substring(7),
        name: inquiryName,
        email: inquiryEmail,
        phone: inquiryPhone,
        message: inquiryMsg,
        propertyId: activeProperty?.id,
        propertyName: activeProperty?.title,
        date: new Date().toLocaleString()
      });

      // Reset
      setTimeout(() => {
        setSubmitSuccess(false);
        setInquiryName('');
        setInquiryEmail('');
        setInquiryPhone('');
        setInquiryMsg('');
      }, 4000);
    }, 1200);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Ready / Completed (সম্পন্ন)';
      case 'upcoming':
        return 'Upcoming Venture (আসন্ন)';
      case 'ongoing':
        return 'Ongoing / In Progress (চলমান)';
      case 'proposed':
        return 'Proposed / Planned (প্রস্তাবিত)';
      case 'under-construction':
        return 'Under Construction (নির্মাণাধীন)';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      case 'upcoming':
        return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30';
      case 'ongoing':
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
      case 'proposed':
        return 'bg-purple-500/10 text-purple-400 border border-purple-500/30';
      case 'under-construction':
        return 'bg-orange-500/10 text-orange-400 border border-orange-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border border-gray-500/30';
    }
  };

  return (
    <section id="properties" className="py-24 bg-luxury-beige relative overflow-hidden">
      {/* Anchor for scrolling */}
      <div id="properties-explore-anchor" className="absolute top-0 left-0 h-1" />

      {/* Background Decorative Text */}
      <div className="absolute right-0 top-1/4 -translate-y-1/2 text-[12vw] font-serif font-bold text-white/[0.01] select-none pointer-events-none">
        PORTFOLIO
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.4em] text-gold-400 font-bold uppercase block mb-3">
            Elite Architectural Creations
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Signature Developments
          </h2>
          <div className="h-[2px] w-20 bg-gold-500 mx-auto mb-6" />
          <p className="text-slate-300 font-sans text-base sm:text-lg font-light leading-relaxed">
            Discover a curated collection of ultra-premium estates and corporate architectural landmarks setting a new paradigm of design excellence in Dhaka.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          {/* Left: Interactive Category Tabs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-5 py-2.5 rounded text-xs font-semibold tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                selectedType === 'all'
                  ? 'bg-gold-500 text-luxury-charcoal border-gold-500 shadow-md'
                  : 'bg-luxury-slate text-slate-300 border-white/10 hover:text-white hover:border-gold-500/40'
              }`}
            >
              All Portfolios
            </button>
            <button
              onClick={() => setSelectedType('residential')}
              className={`px-5 py-2.5 rounded text-xs font-semibold tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                selectedType === 'residential'
                  ? 'bg-gold-500 text-luxury-charcoal border-gold-500 shadow-md'
                  : 'bg-luxury-slate text-slate-300 border-white/10 hover:text-white hover:border-gold-500/40'
              }`}
            >
              Residential
            </button>
            <button
              onClick={() => setSelectedType('commercial')}
              className={`px-5 py-2.5 rounded text-xs font-semibold tracking-wider uppercase transition-all duration-300 border cursor-pointer ${
                selectedType === 'commercial'
                  ? 'bg-gold-500 text-luxury-charcoal border-gold-500 shadow-md'
                  : 'bg-luxury-slate text-slate-300 border-white/10 hover:text-white hover:border-gold-500/40'
              }`}
            >
              Commercial
            </button>
          </div>

          {/* Right: Search Input & Status Filter */}
          <div className="flex flex-wrap items-center gap-4">
            <select
              value={selectedStatus}
              onChange={(e: any) => setSelectedStatus(e.target.value)}
              className="bg-luxury-slate border border-white/10 text-slate-300 text-xs tracking-wider uppercase font-semibold rounded py-2.5 px-4 focus:outline-none focus:border-gold-500 transition-all cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="ongoing">Ongoing (চলমান)</option>
              <option value="under-construction">Under Construction (নির্মাণাধীন)</option>
              <option value="upcoming">Upcoming (আসন্ন)</option>
              <option value="proposed">Proposed (প্রস্তাবিত)</option>
              <option value="completed">Completed (সম্পন্ন)</option>
            </select>

            <input
              type="text"
              placeholder="Search by zone, project name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-luxury-slate border border-white/10 text-white placeholder-slate-500 text-sm rounded py-2 px-4 focus:outline-none focus:border-gold-500 min-w-[200px] md:min-w-[280px] transition-all"
            />
          </div>
        </div>

        {/* Properties Grid Container */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property) => (
              <motion.div
                layout
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                onClick={() => {
                  if (onSelectPropertyDetail) {
                    onSelectPropertyDetail(property);
                  } else {
                    setActiveProperty(property);
                  }
                }}
                className="bg-luxury-slate rounded-lg overflow-hidden border border-white/10 group hover:shadow-2xl hover:shadow-gold-500/5 transition-all duration-500 hover:border-gold-500/50 flex flex-col h-full cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden aspect-[16/10] bg-luxury-slate shrink-0 font-sans">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full group-hover:scale-105 transition-transform duration-700 brightness-[0.8] ${getFitClass(property.imageFit)} ${getPositionClass(property.imagePosition)}`}
                  />
                  {/* Status Indicator Tag */}
                  <span
                    className={`absolute top-4 left-4 z-10 px-3 py-1 text-[10px] tracking-wider uppercase font-bold rounded-sm ${getStatusColor(
                      property.status
                    )}`}
                  >
                    {getStatusLabel(property.status)}
                  </span>
                  {/* Property Type Badge */}
                  <span className="absolute top-4 right-4 z-10 bg-luxury-beige/90 text-gold-400 text-[10px] tracking-widest uppercase font-bold py-1 px-3 rounded-sm border border-gold-500/20">
                    {property.type}
                  </span>

                  {/* Dark Glass Reveal on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 transition-opacity duration-500" />
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Location Area text */}
                    <div className="flex items-center space-x-1.5 text-gold-400 mb-2">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="text-xs font-semibold tracking-wider font-sans">
                        {property.location}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
                      {property.title}
                    </h3>

                    {/* Description excerpt */}
                    <p className="text-slate-400 font-sans text-sm font-light leading-relaxed mb-6 line-clamp-2">
                      {property.description}
                    </p>

                    {/* Core Specifications row */}
                    <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-white/5 mb-6">
                      <div className="text-center border-r border-white/5">
                        <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                          Sizing
                        </span>
                        <div className="flex items-center justify-center space-x-1 text-white">
                          <Move className="w-3.5 h-3.5 text-gold-400" />
                          <span className="font-sans text-xs font-semibold">{(property.sizeRange || '').split(' ')[0]}</span>
                        </div>
                      </div>

                      <div className="text-center border-r border-white/5">
                        <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                          Bedrooms
                        </span>
                        <div className="flex items-center justify-center space-x-1 text-white">
                          <Bed className="w-3.5 h-3.5 text-gold-400" />
                          <span className="font-sans text-xs font-semibold">{property.beds || 'N/A'}</span>
                        </div>
                      </div>

                      <div className="text-center">
                        <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">
                          Bathrooms
                        </span>
                        <div className="flex items-center justify-center space-x-1 text-white">
                          <Bath className="w-3.5 h-3.5 text-gold-400" />
                          <span className="font-sans text-xs font-semibold">{property.baths || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex items-center justify-between gap-4 pt-2">
                    <div>
                      <span className="block text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                        Invest Range
                      </span>
                      <span className="font-serif text-sm sm:text-base text-gold-400 font-bold">
                        {property.priceRange}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectPropertyDetail) {
                          onSelectPropertyDetail(property);
                        } else {
                          setActiveProperty(property);
                        }
                      }}
                      className="px-5 py-2.5 border border-white/20 text-white hover:bg-gold-500 hover:text-luxury-charcoal hover:border-gold-500 rounded text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Result State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-20 bg-luxury-slate rounded-lg border border-white/10 mt-12 shadow-sm font-sans">
            <Building className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-bold text-white mb-2">No Matching Projects</h3>
            <p className="text-slate-400 font-sans text-sm max-w-md mx-auto">
              We couldn't find any developments matching your specific filters. Please try revising your search options or view our upcoming portfolios.
            </p>
          </div>
        )}
      </div>

      {/* Property Details Full-Featured Modal */}
      <AnimatePresence>
        {activeProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4 }}
              className="bg-luxury-charcoal rounded-lg w-full max-w-5xl overflow-hidden shadow-2xl relative my-8 border border-gold-500/20 max-h-[90vh] overflow-y-auto text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProperty(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-gold-500 hover:text-luxury-charcoal text-white rounded-full transition-colors duration-300 border border-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Grid Layout of Modal */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Side: Images & Info Column */}
                <div className="lg:col-span-7 bg-luxury-slate relative overflow-hidden flex flex-col justify-between">
                  <div className="relative h-[250px] sm:h-[350px] lg:h-[400px]">
                    <img
                      src={selectedImageUrl || activeProperty.imageUrl}
                      alt={activeProperty.title}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full transition-all duration-500 ${getFitClass(activeProperty.imageFit)} ${getPositionClass(activeProperty.imagePosition)}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="px-2.5 py-1 bg-gold-500 text-luxury-charcoal text-[10px] tracking-widest uppercase font-bold rounded-sm inline-block mb-3 font-sans">
                        {activeProperty.type}
                      </span>
                      <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-2 leading-tight">
                        {activeProperty.title}
                      </h2>
                      <p className="text-slate-300 font-sans text-xs sm:text-sm flex items-center gap-1.5 font-light">
                        <MapPin className="w-4 h-4 text-gold-400" />
                        {activeProperty.location}
                      </p>
                    </div>
                  </div>

                  {/* Image Gallery Thumbnails */}
                  {activeProperty.gallery && activeProperty.gallery.length > 0 && (
                    <div className="bg-[#0b0e14]/50 px-6 sm:px-8 py-3.5 border-b border-white/5 flex gap-3 overflow-x-auto scrollbar-thin">
                      {activeProperty.gallery.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageUrl(imgUrl)}
                          className={`w-16 h-12 rounded overflow-hidden cursor-pointer transition-all duration-300 shrink-0 border-2 ${
                            (selectedImageUrl || activeProperty.imageUrl) === imgUrl
                              ? 'border-gold-500 scale-105 shadow-md shadow-gold-500/10'
                              : 'border-white/10 hover:border-white/40'
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`${activeProperty.title}-gallery-${idx}`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain p-0.5 bg-black"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Highlights section inside modal */}
                  <div className="p-6 sm:p-8 text-white bg-luxury-slate flex-grow">
                    <h4 className="font-sans text-[10px] uppercase tracking-widest font-bold text-gold-400 mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Architectural Pillars
                    </h4>
                    <ul className="space-y-3">
                      {activeProperty.features.map((feat, i) => (
                        <li key={i} className="flex items-start text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                          <CheckCircle2 className="w-4 h-4 text-gold-500 mr-2.5 mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Quick Specs Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 mt-6 font-sans">
                      <div>
                        <span className="block text-[10px] tracking-wider text-slate-500 uppercase font-semibold">
                          Size Scale
                        </span>
                        <span className="text-xs sm:text-sm text-white font-semibold">
                          {activeProperty.sizeRange}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] tracking-wider text-slate-500 uppercase font-semibold">
                          Lobby Floors
                        </span>
                        <span className="text-xs sm:text-sm text-white font-semibold">
                          {activeProperty.floorsCount} Levels
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] tracking-wider text-slate-500 uppercase font-semibold">
                          {activeProperty.status === 'completed' ? 'Completion Year' : 'Target Handover'}
                        </span>
                        <span className="text-xs sm:text-sm text-gold-400 font-semibold">
                          {activeProperty.completionYear || activeProperty.handoverDate || 'Contact Us'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Amenities, Blueprint Hook, and Form Column */}
                <div className="lg:col-span-5 p-6 sm:p-8 bg-luxury-charcoal border-l border-white/5 flex flex-col justify-between max-h-none lg:max-h-[90vh] overflow-y-auto">
                  <div>
                    {/* Brief description */}
                    <div className="mb-6">
                      <h4 className="font-sans text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-3">
                        Project Synopsis
                      </h4>
                      <p className="text-slate-300 font-sans text-sm font-light leading-relaxed">
                        {activeProperty.description}
                      </p>
                    </div>

                    {/* Modern Amenities Section */}
                    <div className="mb-8">
                      <h4 className="font-sans text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-4">
                        Elite Lifestyle Amenities
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {activeProperty.amenities.map((am, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2.5 p-2 bg-[#131a2c]/60 border border-white/5 rounded shadow-sm"
                          >
                            <div className="w-1.5 h-1.5 bg-gold-500 rounded-full" />
                            <span className="text-xs text-slate-300 font-semibold font-sans">
                              {am.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick navigation hook to interactive blueprint tour */}
                    <div className="mb-8 p-4 bg-luxury-beige border border-gold-500/20 rounded flex items-center justify-between font-sans">
                      <div>
                        <span className="block text-[10px] text-gold-400 uppercase font-bold tracking-widest mb-1">
                          Floor Planner
                        </span>
                        <span className="text-xs text-slate-400">
                          Interact with layout blueprints for this project.
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setActiveProperty(null);
                          // trigger navigation to interactive-tour
                          const element = document.getElementById('interactive-tour');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="px-3 py-1.5 bg-gold-500 hover:bg-gold-400 text-luxury-charcoal text-[10px] tracking-wider uppercase font-bold rounded transition-colors duration-300"
                      >
                        Explore Tour
                      </button>
                    </div>
                  </div>

                  {/* Dynamic Project Inquiry Form */}
                  <div className="pt-6 border-t border-white/10 font-sans">
                    <h4 className="font-sans text-[10px] uppercase tracking-widest font-bold text-white mb-4 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-gold-400" /> Executive Inquiry
                    </h4>

                    {submitSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded text-center"
                      >
                        <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                        <h5 className="font-serif font-bold text-sm">Inquiry Received</h5>
                        <p className="text-xs text-emerald-300/80 font-light mt-1">
                          Our relations executive will connect with you via secure channels within 2 hours.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleInquirySubmit} className="space-y-3">
                        {/* Name */}
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input
                            type="text"
                            required
                            placeholder="Full Name"
                            value={inquiryName}
                            onChange={(e) => setInquiryName(e.target.value)}
                            className="w-full bg-luxury-beige border border-white/10 rounded py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-gold-500 placeholder-slate-500"
                          />
                        </div>

                        {/* Phone & Email flex row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                              type="tel"
                              required
                              placeholder="Phone (e.g. 017...)"
                              value={inquiryPhone}
                              onChange={(e) => setInquiryPhone(e.target.value)}
                              className="w-full bg-luxury-beige border border-white/10 rounded py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-gold-500 placeholder-slate-500"
                            />
                          </div>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input
                              type="email"
                              required
                              placeholder="Email Address"
                              value={inquiryEmail}
                              onChange={(e) => setInquiryEmail(e.target.value)}
                              className="w-full bg-luxury-beige border border-white/10 rounded py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-gold-500 placeholder-slate-500"
                            />
                          </div>
                        </div>

                        {/* Custom Message */}
                        <textarea
                          placeholder="What details are you interested in? (Size, Pricing, Floor preference...)"
                          rows={2}
                          value={inquiryMsg}
                          onChange={(e) => setInquiryMsg(e.target.value)}
                          className="w-full bg-luxury-beige border border-white/10 rounded p-2 text-xs text-white focus:outline-none focus:border-gold-500 resize-none placeholder-slate-500"
                        />

                        {/* Button Row: Submit + Visit Hooker trigger */}
                        <div className="flex gap-3 pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-300 hover:to-gold-400 text-luxury-charcoal font-extrabold text-[10px] tracking-wider uppercase rounded py-2.5 flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50 transition-colors duration-300"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{isSubmitting ? 'Sending...' : 'Request Brochure'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              onSelectPropertyForBooking(activeProperty);
                              setActiveProperty(null);
                              onNavigateToBooking();
                            }}
                            className="bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-gold-400 hover:text-gold-400 text-[10px] font-bold tracking-wider uppercase rounded px-4 py-2.5 transition-all duration-300 cursor-pointer"
                          >
                            Book Visit
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
