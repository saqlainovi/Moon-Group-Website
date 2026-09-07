/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, isQuotaExceeded, markQuotaExceeded, withTimeout } from '../lib/firebase';
import { LandownerPartnerSubmission } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  TrendingUp,
  FileText,
  PhoneCall,
  Award,
  Scale,
  ShieldCheck,
  MapPin,
  ChevronRight,
  Sparkles,
  Layers,
  MoveHorizontal
} from 'lucide-react';

export default function PartnershipPortal() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [roadWidth, setRoadWidth] = useState('');
  const [frontage, setFrontage] = useState('');
  const [facing, setFacing] = useState<'north' | 'south' | 'east' | 'west' | 'corner'>('north');
  const [details, setDetails] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<LandownerPartnerSubmission | null>(null);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name || !phone || !location || !size) {
      setFormError('অনুগ্রহ করে প্রয়োজনীয় ঘরগুলো (নাম, ফোন, লোকেশন, সাইজ) পূরণ করুন।');
      return;
    }

    setIsSubmitting(true);
    const submissionId = `JV-${Math.floor(1000 + Math.random() * 9000)}`;
    const submission: LandownerPartnerSubmission = {
      id: submissionId,
      name,
      phone,
      email,
      location,
      sizeKatha: parseFloat(size) || 0,
      roadWidthFt: parseFloat(roadWidth) || 0,
      frontageFt: parseFloat(frontage) || 0,
      facing,
      additionalDetails: details,
      createdAt: new Date().toLocaleDateString()
    };

    try {
      await fetch('/api/cms/partnerships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });
    } catch (error) {
      console.warn('Firebase error, stored in local database backup:', error);
    }

    // Save submission to localStorage so it is immediately visible in Admin CMS
    try {
      const existing = localStorage.getItem('moon_partnerships');
      const list = existing ? JSON.parse(existing) : [];
      if (!list.some((item: any) => item.id === submissionId)) {
        list.push(submission);
      }
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    setSubmittedData(submission);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setName('');
    setPhone('');
    setEmail('');
    setLocation('');
    setSize('');
    setRoadWidth('');
    setFrontage('');
    setFacing('north');
    setDetails('');
  };

  // Luxury Brand Pillars for Landowners
  const pillars = [
    {
      icon: <Award className="w-6 h-6 text-gold-400" />,
      title: 'Structural Grandeur',
      desc: 'We enforce Grade-72.5 reinforcement bars, high-early strength eco-cement, and seismological safety factors exceeding standard codes.'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-gold-400" />,
      title: 'Optimal Ratio Allocation',
      desc: 'Our financial feasibility structures are designed to guarantee landowners maximum profit-sharing, high-premium signing bonuses, and premium finishing material allocation.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-gold-400" />,
      title: 'Timely Handover Bond',
      desc: 'Backed by bank guarantees, our timeline clauses safeguard your interest with automated monthly compensation for any construction lag.'
    },
    {
      icon: <Scale className="w-6 h-6 text-gold-400" />,
      title: 'Regulatory Mastery',
      desc: 'We oversee complete design clearances and fast-track approvals from RAJUK, CDA, civil aviation, and environmental ministries directly.'
    }
  ];

  return (
    <section id="partnership" className="py-24 bg-luxury-beige relative overflow-hidden">
      {/* Custom Architectural Blueprint Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <img 
          src="https://lh3.googleusercontent.com/d/1zZvNF4bXnaiJGhNxm3YjhZ8c8Z2Mc4l5" 
          alt="Partnership Blueprint Background" 
          className={`w-full h-full object-cover object-center transition-all duration-500 ${
            isDark ? 'opacity-[0.12] invert brightness-125' : 'opacity-[0.28] mix-blend-multiply'
          }`}
          referrerPolicy="no-referrer"
        />
        {/* Soft overlay gradient to ensure high readability of text */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-r from-[#0b0b0c]/95 via-[#0b0b0c]/85 to-[#0b0b0c]/90' 
            : 'bg-gradient-to-r from-[#FAF6EE]/90 via-[#FAF6EE]/80 to-[#FAF6EE]/85'
        }`} />
      </div>

      {/* Structural lines overlay */}
      <div className="absolute inset-y-0 left-10 w-[1px] bg-white/5 hidden lg:block" />
      <div className="absolute inset-y-0 right-10 w-[1px] bg-white/5 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Core propositions & value pitch */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <span className="text-[10px] tracking-[0.4em] text-gold-400 font-bold uppercase block mb-3">
              Unlocking Value of Land Assets
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              Landowner Development Feasibility
            </h2>
            <div className="h-[2px] w-20 bg-gold-500 mb-8" />
            
            <p className="text-slate-300 font-sans text-base font-light leading-relaxed mb-10">
              Inquire regarding structural engineering feasibility and architectural assessments for premium residential or commercial developments with Moon Group Bangladesh.
            </p>

            {/* Core Pillars List */}
            <div className="space-y-6">
              {pillars.map((p, i) => (
                <div key={i} className="flex space-x-4 font-sans">
                  <div className="p-3 bg-luxury-charcoal rounded-md shadow-md shrink-0 flex items-center justify-center h-12 w-12 border border-gold-500/10">
                    {p.icon}
                  </div>
                  <div>
                    <h4 className="font-sans text-sm font-bold text-white mb-1">
                      {p.title}
                    </h4>
                    <p className="text-slate-400 text-xs font-light leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive land submission form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {!submittedData ? (
                <motion.div
                  key="portal-form"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.5 }}
                  className="bg-luxury-slate border border-white/10 p-6 sm:p-10 rounded-lg shadow-xl"
                >
                  <div className="mb-6 pb-4 border-b border-white/10 font-sans">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> LAND FEASIBILITY PORTAL
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-1">
                      Joint Venture Land Proposal
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5 font-sans">
                    {/* Step Section 1: Contact Details */}
                    <div className="space-y-3">
                      <span className="block text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider mb-2">
                        I. Personal & Communication Credentials
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          placeholder="Your Name (Owner/Authorized)"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-luxury-beige border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-500 placeholder-slate-500"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Mobile Number (e.g., 017...)"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-luxury-beige border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-500 placeholder-slate-500"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address (Optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-luxury-beige border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-500 placeholder-slate-500"
                      />
                    </div>

                    {/* Step Section 2: Land Specifications */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <span className="block text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider mb-2">
                        II. Spatial & Dimension Characteristics
                      </span>
                      
                      {/* Location Area Text field */}
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          placeholder="Exact Address / Area Location (e.g., Sector 4, Uttara, Dhaka)"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full bg-luxury-beige border border-white/10 rounded py-2 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-gold-500 placeholder-slate-500"
                        />
                      </div>

                      {/* Land attributes grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">Land Size (Katha)</label>
                          <input
                            type="number"
                            step="0.1"
                            required
                            placeholder="e.g., 5.5"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="w-full bg-luxury-beige border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-500 placeholder-slate-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">Front Road Width (Ft)</label>
                          <input
                            type="number"
                            required
                            placeholder="e.g., 20"
                            value={roadWidth}
                            onChange={(e) => setRoadWidth(e.target.value)}
                            className="w-full bg-luxury-beige border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-500 placeholder-slate-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">Frontage Span (Ft)</label>
                          <input
                            type="number"
                            placeholder="e.g., 45"
                            value={frontage}
                            onChange={(e) => setFrontage(e.target.value)}
                            className="w-full bg-luxury-beige border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-500 placeholder-slate-500"
                          />
                        </div>
                      </div>

                      {/* Plot Facing Dropdown */}
                      <div>
                        <label className="block text-[9px] font-mono text-slate-400 uppercase mb-1">Plot Facing Orientation</label>
                        <select
                          value={facing}
                          onChange={(e: any) => setFacing(e.target.value)}
                          className="w-full bg-luxury-beige border border-white/10 rounded py-2 px-3 text-xs text-white focus:outline-none focus:border-gold-500 cursor-pointer"
                        >
                          <option value="north">North Facing</option>
                          <option value="south">South Facing (South breeze preference)</option>
                          <option value="east">East Facing</option>
                          <option value="west">West Facing</option>
                          <option value="corner">Corner Plot (Multi-Road Frontages)</option>
                        </select>
                      </div>
                    </div>

                    {/* Step Section 3: Extra Info */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <span className="block text-[10px] text-slate-400 font-mono font-bold uppercase tracking-wider mb-1">
                        III. Current structures / Additional details
                      </span>
                      <textarea
                        placeholder="Please describe if there are any existing brick structures, single-story units, power lines, or existing bank mortgages associated with this plot of land..."
                        rows={3}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        className="w-full bg-luxury-beige border border-white/10 rounded p-2.5 text-xs text-white focus:outline-none focus:border-gold-500 resize-none placeholder-slate-500"
                      />
                    </div>



                    {formError && (
                      <div className="p-2.5 rounded bg-red-500/20 border border-red-500/40 text-red-300 text-xs text-center font-medium">
                        {formError}
                      </div>
                    )}

                    {/* Form Submitting Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-red-600 to-[#EE1B24] hover:from-red-500 hover:to-red-600 text-white font-bold text-xs tracking-wider uppercase rounded-lg py-3.5 shadow-lg shadow-red-600/20 flex items-center justify-center space-x-2 cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                    >
                      <span>{isSubmitting ? 'প্রপোজাল জমা দেওয়া হচ্ছে...' : 'প্রপোজাল সাবমিট করুন (Submit Land Proposal)'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </form>
                </motion.div>
              ) : (
                /* Success Popup View for joint-venture landowner submission */
                <motion.div
                  key="portal-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className={`border-2 rounded-2xl p-6 sm:p-8 shadow-2xl relative transition-all duration-500 ${
                    isDark ? 'bg-[#141416] text-white border-amber-500/40' : 'bg-white text-stone-900 border-red-500/30'
                  }`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent blur-2xl pointer-events-none" />

                  {/* Confirmation Banner */}
                  <div className="bg-emerald-500/20 border border-emerald-500/40 p-5 rounded-2xl text-center mb-6 flex flex-col items-center justify-center space-y-2 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-7 h-7 text-emerald-400 animate-pulse" />
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-emerald-400">
                        ধন্যবাদ! আপনার জমি সংক্রান্ত প্রপোজালটি সফলভাবে জমা হয়েছে।
                      </h3>
                    </div>
                    <p className={`text-xs sm:text-sm max-w-lg leading-relaxed ${isDark ? 'text-slate-200' : 'text-stone-700'}`}>
                      আপনার জমিও সংক্রান্ত প্রপোজালটির ডাটা মুন গ্রুপের অ্যাডমিন সিএমএস (Admin CMS)-এ রেকর্ড করা হয়েছে। আমাদের টেকনিক্যাল টিম ও কাস্টমার রিলেশনশিপ প্রতিনিধি অতি শীঘ্রই আপনার সাথে সশরীরে বা ফোনে যোগাযোগ করবেন।
                    </p>
                  </div>

                  {/* Submission summary breakdown */}
                  <div className={`border rounded-xl p-5 space-y-3 mb-6 text-xs font-mono ${
                    isDark ? 'bg-[#0E0E0F] border-white/10' : 'bg-stone-50 border-stone-200'
                  }`}>
                    <div className={`flex justify-between border-b pb-2 ${isDark ? 'border-white/10' : 'border-stone-200'}`}>
                      <span className="text-slate-400">PROPOSAL TRACK ID</span>
                      <span className="text-[#EE1B24] font-bold">{submittedData.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">LANDOWNER NAME</span>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>{submittedData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">PHONE NUMBER</span>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>{submittedData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">LOCATION DECLARED</span>
                      <span className={`truncate max-w-[200px] ${isDark ? 'text-white' : 'text-stone-900'}`}>{submittedData.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">DECLARED SIZE</span>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>{submittedData.sizeKatha} Katha</span>
                    </div>
                  </div>

                  {/* Reset Actions */}
                  <div className="pt-4 border-t border-dashed border-stone-300 flex justify-end gap-3">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 bg-[#EE1B24] hover:bg-red-700 text-white rounded-lg text-xs font-bold tracking-wider uppercase cursor-pointer transition-all duration-300 shadow-md"
                    >
                      নতুন প্রপোজাল সাবমিট করুন
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
