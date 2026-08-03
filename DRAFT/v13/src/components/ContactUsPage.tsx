/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { doc, setDoc } from 'firebase/firestore';
import { db, isQuotaExceeded, markQuotaExceeded, withTimeout } from '../lib/firebase';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  UserCheck, 
  Building,
  HelpCircle,
  MessageSquareCode
} from 'lucide-react';

export default function ContactUsPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setStatus('submitting');
    const inquiryId = `CON-${Math.floor(1000 + Math.random() * 9000)}`;

    const inquiryData = {
      id: inquiryId,
      name,
      phone,
      email,
      subject,
      message,
      createdAt: new Date().toLocaleDateString()
    };

    try {
      if (!isQuotaExceeded()) {
        await withTimeout(setDoc(doc(db, 'contact_inquiries', inquiryId), inquiryData), 2000, true);
      }
    } catch (err) {
      markQuotaExceeded();
      console.warn('Fallback to local storage for contact:', err);
    }

    // Save locally
    const existing = localStorage.getItem('moon_contact_inquiries');
    const list = existing ? JSON.parse(existing) : [];
    list.push(inquiryData);
    localStorage.setItem('moon_contact_inquiries', JSON.stringify(list));

    setStatus('success');
  };

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white pt-20 pb-28">
      
      {/* Hero Header */}
      <div className="relative py-16 sm:py-20 bg-[#141416] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#FF4A4F]/5 rounded-full filter blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10 text-center sm:text-left">
          <span className="font-mono text-xs text-[#FF4A4F] uppercase tracking-[0.25em] font-bold block mb-3">
            Available 24/7
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white max-w-4xl">
            Get In Touch
          </h1>
          <p className="text-slate-400 font-light text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            Have a project lead? Interested in booking a private site visit? Connect with our premium luxury relation desks directly. We are ready to serve you.
          </p>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Touchpoints Column */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#FF4A4F] uppercase font-bold">
                COMMUNICATION LINES
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white mt-1">
                Executive Desk Contact Details
              </h2>
            </div>

            <div className="space-y-6">
              {/* Corporate Office */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded bg-[#FF4A4F]/10 border border-[#FF4A4F]/20 flex items-center justify-center text-[#FF4A4F] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Corporate HQ Address</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light leading-relaxed">
                    Moon Celebration Point<br />
                    Plot: 3 & 5, Road: 113/A, Gulshan-2, Dhaka-1212
                  </p>
                </div>
              </div>

              {/* Hotlines */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Direct Phone Hotlines</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-mono font-medium">
                    Hotline: 16604<br />
                    Office: +8809613191919<br />
                    WhatsApp: +8801313401405
                  </p>
                </div>
              </div>

              {/* Emails */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Executive Channels</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
                    General: info@moongroupbd.com<br />
                    Support: support@moongroupbd.com
                  </p>
                </div>
              </div>

              {/* Working hours */}
              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Operating Hours</h4>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
                    Saturdays — Thursdays: 9:00 AM to 6:00 PM (GMT +6)<br />
                    Sales and WhatsApp chat remains open 24/7.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#141416] border border-white/10 p-6 sm:p-10 rounded-sm">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded text-center my-6"
              >
                <UserCheck className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h4 className="font-serif text-xl font-bold text-white">Enquiry Submitted Successfully!</h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-2 max-w-sm mx-auto leading-relaxed">
                  We have logged your query. Our Customer Experience Desk will route your ticket to the respective executive right away.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded font-mono text-xs text-white uppercase tracking-wider cursor-pointer"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Connect With Our Team</h3>
                  <p className="text-xs text-neutral-400 mt-1">Please drop a message, and our relationship desks will revert in under 2 hours.</p>
                </div>

                <div className="border-t border-white/5 pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Al-haj Karim Ahmed"
                      className="w-full bg-white/5 border border-white/10 rounded py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#FF4A4F] text-white placeholder-neutral-700 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +8801711223344"
                      className="w-full bg-white/5 border border-white/10 rounded py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#FF4A4F] text-white placeholder-neutral-700 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. karim@gmail.com"
                      className="w-full bg-white/5 border border-white/10 rounded py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#FF4A4F] text-white placeholder-neutral-700 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1">Subject of inquiry</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded py-3 px-3.5 text-xs focus:outline-none focus:border-[#FF4A4F] text-white cursor-pointer transition-colors"
                    >
                      <option value="General Enquiry">General Enquiry</option>
                      <option value="Property Booking">Property Booking Consultation</option>
                      <option value="Landowner JV">Landowner Joint Venture Proposal</option>
                      <option value="Supplier/Vendor">Supplier or Vendor Offer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1">Your detailed message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    placeholder="Describe your inquiry details..."
                    className="w-full bg-white/5 border border-white/10 rounded py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#FF4A4F] text-white placeholder-neutral-700 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-[#FF4A4F] hover:bg-red-600 text-black font-bold uppercase text-xs tracking-widest py-3.5 rounded flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? 'Sending enquiry...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
