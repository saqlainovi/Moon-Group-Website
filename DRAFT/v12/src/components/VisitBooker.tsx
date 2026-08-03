/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, isQuotaExceeded, markQuotaExceeded, withTimeout } from '../lib/firebase';
import { properties } from '../data/properties';
import { Property, VisitBooking } from '../types';
import { useTheme } from '../context/ThemeContext';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle,
  Building,
  Ticket,
  ChevronRight,
  Sparkles,
  Share2
} from 'lucide-react';

interface VisitBookerProps {
  preSelectedProperty: Property | null;
  onClearPreSelected: () => void;
  propertiesList?: Property[];
}

export default function VisitBooker({ preSelectedProperty, onClearPreSelected, propertiesList }: VisitBookerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const availableProperties = propertiesList && propertiesList.length > 0 ? propertiesList : properties;

  const [selectedProperty, setSelectedProperty] = useState<Property>(
    preSelectedProperty || availableProperties[0]
  );

  useEffect(() => {
    if (preSelectedProperty) {
      setSelectedProperty(preSelectedProperty);
    } else if (availableProperties && availableProperties.length > 0) {
      const matched = availableProperties.find((p) => p.id === selectedProperty.id);
      if (matched) {
        setSelectedProperty(matched);
      } else {
        setSelectedProperty(availableProperties[0]);
      }
    }
  }, [preSelectedProperty, propertiesList]);

  // Calendar Date setup (Generate next 7 days)
  const [dateList, setDateList] = useState<{ dayName: string; dateStr: string; label: string }[]>([]);
  const [selectedDateStr, setSelectedDateStr] = useState('');

  useEffect(() => {
    const list = [];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayName = days[d.getDay()];
      const monthStr = months[d.getMonth()];
      const dayNum = d.getDate();
      
      list.push({
        dayName,
        dateStr: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`,
        label: `${dayName}, ${monthStr} ${dayNum}`
      });
    }
    setDateList(list);
    setSelectedDateStr(list[0].dateStr);
  }, []);

  // Slots setup
  const timeSlots = [
    { value: '10:00 AM', label: '10:00 AM (Morning Air)' },
    { value: '11:30 AM', label: '11:30 AM (Midday Light)' },
    { value: '02:00 PM', label: '02:00 PM (Early Afternoon)' },
    { value: '03:30 PM', label: '03:30 PM (Golden Hour)' },
    { value: '05:00 PM', label: '05:00 PM (Dusk Ambience)' },
  ];
  const [selectedSlot, setSelectedSlot] = useState('03:30 PM');

  // Personal Info Form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [remarks, setRemarks] = useState('');

  // Anti-Spam Verification & Honeypot States
  const [captchaNum1, setCaptchaNum1] = useState(6);
  const [captchaNum2, setCaptchaNum2] = useState(4);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [honeypotField, setHoneypotField] = useState(''); // Bot lure field (must stay empty)
  const [formError, setFormError] = useState('');

  const [bookingResult, setBookingResult] = useState<VisitBooking | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate random captcha on load
  useEffect(() => {
    setCaptchaNum1(Math.floor(Math.random() * 8) + 2);
    setCaptchaNum2(Math.floor(Math.random() * 8) + 1);
  }, []);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name || !phone || !email) {
      setFormError('Please fill out all required fields.');
      return;
    }

    // Anti-spam check 1: Honeypot field must be empty
    if (honeypotField) {
      console.warn('Bot submission blocked via honeypot.');
      return;
    }

    setIsSubmitting(true);
    const ticketId = `MBL-${Math.floor(100000 + Math.random() * 900000)}`;
    const ticket: VisitBooking = {
      id: ticketId,
      name,
      email,
      phone,
      propertyId: selectedProperty.id,
      propertyName: selectedProperty.title,
      date: dateList.find(d => d.dateStr === selectedDateStr)?.label || selectedDateStr,
      timeSlot: selectedSlot,
      createdAt: new Date().toLocaleDateString()
    };

    let savedToCloud = false;
    try {
      if (!isQuotaExceeded()) {
        await withTimeout(setDoc(doc(db, 'bookings', ticketId), ticket), 2000, true);
        savedToCloud = true;
      }
    } catch (error) {
      markQuotaExceeded();
      console.warn('Firestore write error, utilizing robust offline storage:', error);
    }

    // Save to localStorage as a robust local fallback
    try {
      const existing = localStorage.getItem('moon_bookings');
      const list = existing ? JSON.parse(existing) : [];
      if (!list.some((b: any) => b.id === ticketId)) {
        list.push(ticket);
        localStorage.setItem('moon_bookings', JSON.stringify(list));
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }

    setBookingResult(ticket);
    setIsSubmitting(false);
    onClearPreSelected();
  };

  const handleReset = () => {
    setBookingResult(null);
    setName('');
    setPhone('');
    setEmail('');
    setCompany('');
    setRemarks('');
  };

  return (
    <section id="visit-booker" className={`py-24 transition-colors duration-500 relative overflow-hidden ${isDark ? 'bg-[#0B0B0C] text-white' : 'bg-[#FAF6EE] text-[#2B251F]'}`}>
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <img 
          src="https://lh3.googleusercontent.com/d/1Y71tnum0mpblx8H7glNfuLc-6n_8dMgf" 
          alt="Section Background Blueprint" 
          className={`w-full h-full object-cover object-center transition-all duration-500 ${
            isDark ? 'opacity-[0.05] invert brightness-125' : 'opacity-[0.18] mix-blend-multiply'
          }`}
          referrerPolicy="no-referrer"
        />
        {/* Soft overlay gradient */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-b from-[#0B0B0C]/90 via-[#0B0B0C]/80 to-[#0B0B0C]' 
            : 'bg-gradient-to-b from-[#FAF6EE]/90 via-[#FAF6EE]/80 to-[#FAF6EE]'
        }`} />
      </div>

      {/* Decorative Top arch overlay */}
      <div className={`absolute top-0 inset-x-0 h-40 bg-gradient-to-b ${isDark ? 'from-[#0B0B0C]' : 'from-[#FAF6EE]'} to-transparent pointer-events-none`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] tracking-[0.4em] text-[#EE1B24] font-bold uppercase block mb-3">
            Arrange Your Private Overlook
          </span>
          <h2 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-6 transition-colors ${isDark ? 'text-white' : 'text-[#2B251F]'}`}>
            Schedule Private Tour
          </h2>
          <div className="h-[2px] w-20 bg-gold-500 mx-auto mb-6" />
          <p className={`font-sans text-base sm:text-lg font-light leading-relaxed transition-colors ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
            Experience our craftsmanship in person. Book an exclusive guided walk-through of our properties with an executive Relationship Director.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!bookingResult ? (
            <motion.div
              key="booking-form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className={`max-w-4xl mx-auto border rounded-lg shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 transition-all duration-500 ${
                isDark ? 'bg-luxury-beige border-white/5' : 'bg-[#F4EEDA] border-stone-300/60'
              }`}
            >
              {/* Left Side: Property Highlight Cards */}
              <div className={`p-6 sm:p-8 flex flex-col justify-between transition-colors duration-500 md:col-span-4 ${
                isDark ? 'bg-luxury-slate text-white' : 'bg-[#ECE5D0] border-r border-stone-300/60 text-stone-800'
              }`}>
                <div>
                  <span className={`block text-[10px] uppercase tracking-widest font-bold mb-4 ${isDark ? 'text-gold-400' : 'text-[#EE1B24]'}`}>
                    Active Inspection
                  </span>
                  <div className={`aspect-[16/11] rounded overflow-hidden mb-5 border ${isDark ? 'border-white/5' : 'border-stone-300/60'}`}>
                    <img
                      src={selectedProperty.imageUrl || 'https://lh3.googleusercontent.com/d/1ipWRwMZ9rmEX0zlwXwZKj-AsRRipCuim'}
                      alt={selectedProperty.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://lh3.googleusercontent.com/d/1ipWRwMZ9rmEX0zlwXwZKj-AsRRipCuim';
                      }}
                    />
                  </div>
                  <h3 className={`font-serif text-xl font-bold mb-2 transition-colors ${isDark ? 'text-white' : 'text-[#2B251F]'}`}>{selectedProperty.title}</h3>
                  <p className={`text-xs font-light leading-relaxed mb-6 transition-colors ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                    {selectedProperty.description ? selectedProperty.description.substring(0, 100) : ''}...
                  </p>
                </div>

                <div className={`pt-6 border-t ${isDark ? 'border-white/5' : 'border-stone-300/60'}`}>
                  <span className={`block text-[9px] uppercase tracking-wider font-medium ${isDark ? 'text-slate-500' : 'text-stone-500'}`}>
                    Corporate Helpline
                  </span>
                  <span className={`block font-sans text-sm font-semibold mt-1 ${isDark ? 'text-gold-300' : 'text-[#EE1B24]'}`}>
                    +880 179-9992222
                  </span>
                  <span className={`block text-[9px] font-mono mt-0.5 ${isDark ? 'text-slate-500' : 'text-stone-500'}`}>
                    9:00 AM - 7:00 PM (Weekly)
                  </span>
                </div>
              </div>

              {/* Right Side: Step Form Controls */}
              <form onSubmit={handleBookingSubmit} className={`md:col-span-8 p-6 sm:p-8 flex flex-col justify-between border-l transition-all duration-500 ${
                isDark ? 'bg-luxury-slate border-white/5' : 'bg-[#F4EEDA] border-stone-300/60'
              }`}>
                <div className="space-y-6">
                  {/* Step 1: Select Property dropdown */}
                  <div>
                    <label className={`block text-[10px] uppercase tracking-widest font-bold mb-2 ${isDark ? 'text-gold-400' : 'text-stone-700'}`}>
                      1. Select Property Portfolio
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <select
                        value={selectedProperty.id}
                        onChange={(e) => {
                          const matched = availableProperties.find((p) => p.id === e.target.value);
                          if (matched) setSelectedProperty(matched);
                        }}
                        className={`w-full rounded py-2.5 pl-9 pr-3 text-sm focus:outline-none transition-colors cursor-pointer border ${
                          isDark 
                            ? 'bg-luxury-beige border-white/10 text-white focus:border-gold-500' 
                            : 'bg-white border-stone-300/60 text-stone-800 focus:border-[#EE1B24]'
                        }`}
                      >
                        {availableProperties.map((p) => (
                          <option key={p.id} value={p.id} className={isDark ? 'bg-[#141416]' : 'bg-white text-stone-800'}>
                            {p.title} ({p.area.split(',')[0]})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Step 2: Choose Date Calendar Grid slider */}
                  <div>
                    <label className={`block text-[10px] uppercase tracking-widest font-bold mb-3 ${isDark ? 'text-gold-400' : 'text-stone-700'}`}>
                      2. Choose Date
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                      {dateList.map((day) => {
                        const isSelected = selectedDateStr === day.dateStr;
                        return (
                          <button
                            type="button"
                            key={day.dateStr}
                            onClick={() => setSelectedDateStr(day.dateStr)}
                            className={`p-2 border rounded flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? 'bg-gold-500 text-luxury-charcoal border-gold-500 shadow-md scale-105 font-bold'
                                : isDark
                                  ? 'bg-luxury-beige text-slate-400 border-white/5 hover:bg-white/5 hover:border-white/10'
                                  : 'bg-white text-stone-600 border-stone-300/60 hover:bg-stone-50 hover:border-stone-400'
                            }`}
                          >
                            <span className="block text-[10px] font-semibold uppercase tracking-wider">
                              {day.dayName}
                            </span>
                            <span className="block text-sm font-bold mt-1 font-mono">
                              {day.dateStr.split('-')[2]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Hour Slots selection */}
                  <div>
                    <label className={`block text-[10px] uppercase tracking-widest font-bold mb-3 ${isDark ? 'text-gold-400' : 'text-stone-700'}`}>
                      3. Select Preferred Time Slot
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map((slot) => {
                        const isSelected = selectedSlot === slot.value;
                        return (
                          <button
                            type="button"
                            key={slot.value}
                            onClick={() => setSelectedSlot(slot.value)}
                            className={`px-4 py-2 border rounded text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? 'bg-gold-500 text-luxury-charcoal border-gold-500 shadow-md font-bold'
                                : isDark
                                  ? 'bg-luxury-beige text-slate-400 border-white/5 hover:bg-white/5 hover:border-white/10'
                                  : 'bg-white text-stone-600 border-stone-300/60 hover:bg-stone-50 hover:border-stone-400'
                            }`}
                          >
                            {slot.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 4: Profile Details Inputs */}
                  <div>
                    <label className={`block text-[10px] uppercase tracking-widest font-bold mb-3 ${isDark ? 'text-gold-400' : 'text-stone-700'}`}>
                      4. Guest Credentials
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="relative font-sans">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full rounded py-2 pl-9 pr-3 text-xs focus:outline-none border transition-colors ${
                            isDark 
                              ? 'bg-luxury-beige border-white/10 text-white focus:border-gold-500 placeholder-slate-500' 
                              : 'bg-white border-stone-300/60 text-stone-800 focus:border-[#EE1B24] placeholder-stone-400'
                          }`}
                        />
                      </div>

                      {/* Phone */}
                      <div className="relative font-sans">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number (e.g. 017...)"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className={`w-full rounded py-2 pl-9 pr-3 text-xs focus:outline-none border transition-colors ${
                            isDark 
                              ? 'bg-luxury-beige border-white/10 text-white focus:border-gold-500 placeholder-slate-500' 
                              : 'bg-white border-stone-300/60 text-stone-800 focus:border-[#EE1B24] placeholder-stone-400'
                          }`}
                        />
                      </div>

                      {/* Email */}
                      <div className="relative font-sans">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="email"
                          required
                          placeholder="Email Address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`w-full rounded py-2 pl-9 pr-3 text-xs focus:outline-none border transition-colors ${
                            isDark 
                              ? 'bg-luxury-beige border-white/10 text-white focus:border-gold-500 placeholder-slate-500' 
                              : 'bg-white border-stone-300/60 text-stone-800 focus:border-[#EE1B24] placeholder-stone-400'
                          }`}
                        />
                      </div>

                      {/* Corporate Company */}
                      <div className="relative font-sans">
                        <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Company/Affiliation (Optional)"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className={`w-full rounded py-2 pl-9 pr-3 text-xs focus:outline-none border transition-colors ${
                            isDark 
                              ? 'bg-luxury-beige border-white/10 text-white focus:border-gold-500 placeholder-slate-500' 
                              : 'bg-white border-stone-300/60 text-stone-800 focus:border-[#EE1B24] placeholder-stone-400'
                          }`}
                        />
                      </div>
                    </div>

                    <textarea
                      placeholder="Any specific requests or requirements? (Wheelchair accessibility, loan consultation...)"
                      rows={2}
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      className={`w-full rounded p-2 text-xs mt-4 focus:outline-none resize-none font-sans border transition-colors ${
                        isDark 
                          ? 'bg-luxury-beige border-white/10 text-white focus:border-gold-500 placeholder-slate-500' 
                          : 'bg-white border-stone-300/60 text-stone-800 focus:border-[#EE1B24] placeholder-stone-400'
                      }`}
                    />

                    {/* Hidden Honeypot Field (Spam Bot Protection Trap) */}
                    <input
                      type="text"
                      name="website_url_honeypot"
                      value={honeypotField}
                      onChange={(e) => setHoneypotField(e.target.value)}
                      className="hidden opacity-0 pointer-events-none absolute -z-50"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* Error Banner */}
                    {formError && (
                      <div className="mt-3 p-2.5 rounded bg-red-500/15 border border-red-500/30 text-red-400 text-xs text-center font-medium">
                        {formError}
                      </div>
                    )}
                  </div>
                </div>

                {/* Form Submit Row */}
                <div className={`pt-6 border-t mt-6 font-sans ${isDark ? 'border-white/10' : 'border-stone-300/60'}`}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-600 to-[#EE1B24] hover:from-red-500 hover:to-red-600 text-white font-bold text-xs tracking-wider uppercase rounded py-3.5 shadow-lg shadow-red-600/20 flex items-center justify-center space-x-2 cursor-pointer transition-all duration-300 hover:scale-[1.01] disabled:opacity-60"
                  >
                    <span>{isSubmitting ? 'অনুরোধ জমা দেওয়া হচ্ছে...' : 'প্রাইভেট ট্যুর বুকিং কনফার্ম করুন (Confirm Booking)'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            /* Luxury Invitation Ticket Generation & Confirmation Popup View */
            <motion.div
              key="booking-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              {/* Main Banner Message */}
              <div className="bg-emerald-500/20 border border-emerald-500/40 p-5 rounded-2xl text-center mb-6 flex flex-col items-center justify-center space-y-2 shadow-xl backdrop-blur-md">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-7 h-7 text-emerald-400 animate-pulse" />
                  <span className="font-serif text-lg sm:text-xl font-bold text-emerald-400">
                    ধন্যবাদ! আপনার বুকিং অনুরোধটি সফলভাবে জমা হয়েছে।
                  </span>
                </div>
                <p className={`text-xs sm:text-sm max-w-lg leading-relaxed font-light ${isDark ? 'text-slate-200' : 'text-stone-800'}`}>
                  মুন গ্রুপের কাস্টমার রিলেশনশিপ প্রতিনিধি অতি শীঘ্রই আপনার সাথে সশরীরে বা ফোনে যোগাযোগ করবেন।
                </p>
                <div className="pt-2 flex items-center gap-2">
                  <a
                    href="tel:+8801313401405"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-md"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>হটলাইনে কল করুন (+88 01313-401405)</span>
                  </a>
                </div>
              </div>

              {/* Digital Pass / Ticket Details Card */}
              <div className={`border-2 rounded-2xl overflow-hidden shadow-2xl relative transition-all duration-500 ${
                isDark ? 'bg-luxury-slate text-white border-gold-400/50' : 'bg-white text-stone-800 border-[#EE1B24]/40 shadow-red-500/5'
              }`}>
                {/* Gold glowing elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gold-400/20 to-transparent blur-xl" />
                
                {/* Header card banner */}
                <div className={`py-6 px-8 flex items-center justify-between border-b transition-all duration-500 ${
                  isDark ? 'bg-gradient-to-r from-gold-950 to-luxury-slate border-gold-800/20' : 'bg-gradient-to-r from-stone-900 to-stone-800 border-stone-700/20 text-white'
                }`}>
                  <div>
                    <span className="block font-serif text-lg font-bold tracking-widest text-gold-400">
                      MOON GROUP OF INDUSTRIES
                    </span>
                    <span className="block text-[9px] tracking-[0.2em] text-slate-400 font-mono">
                      OFFICIAL PRIVATE OVERLOOK PASS
                    </span>
                  </div>
                  <Ticket className="w-8 h-8 text-gold-400 opacity-80" />
                </div>

                {/* Ticket Details */}
                <div className="p-8 space-y-6">
                  {/* Guest Name Display */}
                  <div className={`text-center pb-6 border-b ${isDark ? 'border-white/10' : 'border-stone-200'}`}>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                      Reserved Guest Name
                    </span>
                    <span className={`block font-serif text-2xl sm:text-3xl font-bold mt-1 transition-colors ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      {bookingResult.name}
                    </span>
                    {company && (
                      <span className="block text-xs text-gold-600 font-sans mt-0.5 font-semibold">
                        {company}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-sm">
                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                        Target Property Asset
                      </span>
                      <span className={`block font-serif text-base font-bold mt-1 transition-colors ${isDark ? 'text-white' : 'text-stone-900'}`}>
                        {bookingResult.propertyName}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                        Scheduled Slot
                      </span>
                      <span className={`block font-sans text-sm font-semibold mt-1 flex items-center gap-1.5 ${isDark ? 'text-gold-400' : 'text-[#EE1B24]'}`}>
                        <Calendar className={`w-4 h-4 ${isDark ? 'text-gold-500' : 'text-[#EE1B24]'}`} /> {bookingResult.date}
                        <Clock className={`w-4 h-4 ml-2 ${isDark ? 'text-gold-500' : 'text-[#EE1B24]'}`} /> {bookingResult.timeSlot}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                        Contact Number
                      </span>
                      <span className={`block font-sans text-sm mt-1 font-semibold ${isDark ? 'text-slate-300' : 'text-stone-700'}`}>
                        {bookingResult.phone}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                        Booking Token ID
                      </span>
                      <span className={`block font-mono text-sm mt-1 font-bold ${isDark ? 'text-gold-300' : 'text-[#EE1B24]'}`}>
                        {bookingResult.id}
                      </span>
                    </div>
                  </div>

                  {/* Pseudo Barcode */}
                  <div className={`pt-6 border-t border-dashed flex flex-col items-center ${isDark ? 'border-white/10' : 'border-stone-200'}`}>
                    <div className="h-10 bg-white p-1 rounded max-w-xs w-full flex items-center justify-around overflow-hidden border border-stone-200">
                      {Array.from({ length: 48 }).map((_, i) => {
                        const heights = ['h-full', 'h-4/5', 'h-3/4', 'h-5/6'];
                        const h = heights[Math.floor(Math.random() * heights.length)];
                        const w = Math.random() > 0.45 ? 'w-[2px]' : 'w-[1px]';
                        const space = Math.random() > 0.5 ? 'mr-0.5' : 'mr-1';
                        return (
                          <div key={i} className={`bg-black ${w} ${h} ${space}`} />
                        );
                      })}
                    </div>
                    <span className="text-[9px] font-mono tracking-[0.4em] text-slate-500 mt-2">
                      * {bookingResult.id} *
                    </span>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className={`py-4 px-8 border-t flex flex-col sm:flex-row items-center justify-between text-xs gap-4 font-sans transition-all duration-500 ${
                  isDark ? 'bg-[#111215] border-white/10' : 'bg-stone-100 border-stone-200 text-stone-800'
                }`}>
                  <div className={`flex items-center space-x-2 ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs">ডাটাবেজে সংসংরক্ষিত। অ্যাডমিন CMS এ রেকর্ড পাওয়া যাবে।</span>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleReset}
                      className={`px-4 py-2 font-bold text-[10px] tracking-wider uppercase rounded-lg transition-colors cursor-pointer border ${
                        isDark 
                          ? 'bg-white/10 hover:bg-white/15 text-white border-white/10' 
                          : 'bg-white hover:bg-stone-200 text-stone-900 border-stone-300 shadow-sm'
                      }`}
                    >
                      নতুন বুকিং করুন
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(bookingResult.id);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="px-4 py-2 bg-[#EE1B24] hover:bg-red-700 text-white font-bold text-[10px] tracking-wider uppercase rounded-lg transition-all cursor-pointer flex items-center space-x-1 shadow-md"
                    >
                      <Share2 className="w-3 h-3" />
                      <span>{copied ? 'কপি হয়েছে!' : 'টোকেন আইডি কপি'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
