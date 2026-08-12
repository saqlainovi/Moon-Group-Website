/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  Globe, 
  TrendingUp, 
  ShieldCheck, 
  Building, 
  Send, 
  UserCheck,
  Percent,
  Calculator,
  HelpCircle
} from 'lucide-react';

export default function NrbPage() {
  // Form states for NRB Inquiry
  const [nrbName, setNrbName] = useState('');
  const [nrbPhone, setNrbPhone] = useState('');
  const [nrbCountry, setNrbCountry] = useState('United States');
  const [nrbDetails, setNrbDetails] = useState('');
  const [nrbStatus, setNrbStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleNrbSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nrbName || !nrbPhone) return;

    setNrbStatus('submitting');
    const inquiryId = `NRB-${Math.floor(1000 + Math.random() * 9000)}`;

    const nrbData = {
      id: inquiryId,
      name: nrbName,
      phone: nrbPhone,
      countryOfResidence: nrbCountry,
      additionalDetails: nrbDetails,
      createdAt: new Date().toLocaleDateString(),
      status: 'new'
    };

    try {
      await setDoc(doc(db, 'nrb_inquiries', inquiryId), nrbData);
    } catch (err) {
      console.warn('Fallback to local storage for NRB inquiry:', err);
    }

    // Save locally
    const existing = localStorage.getItem('moon_nrb_inquiries');
    const list = existing ? JSON.parse(existing) : [];
    list.push(nrbData);
    localStorage.setItem('moon_nrb_inquiries', JSON.stringify(list));

    setNrbStatus('success');
  };

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white pt-20 pb-28">
      
      {/* Hero Banner */}
      <div className="relative py-16 sm:py-20 bg-[#141416] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#FF4A4F]/5 rounded-full filter blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10 text-center sm:text-left">
          <span className="font-mono text-xs text-[#FF4A4F] uppercase tracking-[0.25em] font-bold block mb-3">
            Global Bangladeshi Investors
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white max-w-4xl">
            Non-Resident Bangladeshi (NRB) Portal
          </h1>
          <p className="text-slate-400 font-light text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            Secure, fully compliant real estate investments designed specifically for Bangladeshis residing overseas. Access tax-free capital transfers, dual currency bank routes, and automated property management services from anywhere in the world.
          </p>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Informative Grid */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#FF4A4F] uppercase font-bold">
                INVESTMENT STRENGTHS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white mt-1">
                Why Overseas Investors Choose Moon Builders
              </h2>
            </div>

            {/* Three key grids */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 bg-[#141416] border border-white/5 rounded">
                <Globe className="w-8 h-8 text-[#FF4A4F] mb-4" />
                <h4 className="font-bold text-sm mb-2">Dual Currency Compliance</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Transfer funds tax-free using official Central Bank channels (FC/NITA Accounts). Lock into stable USD/GBP rates.
                </p>
              </div>

              <div className="p-5 bg-[#141416] border border-white/5 rounded">
                <TrendingUp className="w-8 h-8 text-yellow-500 mb-4" />
                <h4 className="font-bold text-sm mb-2">Up to 70% Home Financing</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Partnered with premier banks to secure low-interest mortgages and home finance options specifically designed for NRBs.
                </p>
              </div>

              <div className="p-5 bg-[#141416] border border-white/5 rounded">
                <ShieldCheck className="w-8 h-8 text-blue-400 mb-4" />
                <h4 className="font-bold text-sm mb-2">Power of Attorney Security</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  Fully supported remote Power of Attorney verification to safeguard your legal rights without requiring on-site presence.
                </p>
              </div>
            </div>

            {/* Detailed FAQs or details */}
            <div className="bg-[#141416] border border-white/10 p-6 sm:p-8 rounded-sm space-y-6">
              <h3 className="font-serif text-lg sm:text-xl font-bold">Frequently Asked Legal Questions</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#FF4A4F] mb-1">Q1: Can I buy property remotely?</h4>
                  <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                    Yes. Over 45% of our NRB clients execute bookings remotely. We mail physical, notarized deeds directly to you via DHL and coordinate remote POA registry with Bangladesh High Commissions.
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <h4 className="font-bold text-xs sm:text-sm text-yellow-500 mb-1">Q2: How are rental yields remitted back to my overseas account?</h4>
                  <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                    Our in-house corporate asset division automatically leases out your residential/commercial properties. Net yields are deposited to your FC account, allowing tax-free overseas remittance in foreign currencies.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Form Side */}
          <div className="lg:col-span-5 bg-[#141416] border border-white/10 p-6 sm:p-8 rounded-sm relative">
            <span className="absolute top-0 right-10 -translate-y-1/2 bg-yellow-500 text-black text-[9px] font-mono font-extrabold uppercase px-3 py-1 tracking-widest rounded-sm">
              NRB Relations
            </span>

            {nrbStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded text-center my-6"
              >
                <UserCheck className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h4 className="font-serif text-xl font-bold text-white">NRB Callback Logged!</h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-2 max-w-sm mx-auto leading-relaxed">
                  Your callback request has been logged. An expert NRB Investment Manager will contact you via WhatsApp or Email within 12 hours.
                </p>
                <button
                  onClick={() => setNrbStatus('idle')}
                  className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded font-mono text-xs text-white uppercase tracking-wider cursor-pointer"
                >
                  Submit Another Query
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleNrbSubmit} className="space-y-5">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Request Overseas Consult</h3>
                  <p className="text-xs text-neutral-400 mt-1">Get custom investment feasibility portfolios emailed directly to your desk.</p>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-4">
                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={nrbName}
                      onChange={(e) => setNrbName(e.target.value)}
                      placeholder="Dr. Asif Rahman"
                      className="w-full bg-white/5 border border-white/10 rounded py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#FF4A4F] text-white placeholder-neutral-700 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1">WhatsApp Number (with Country Code)</label>
                    <input
                      type="tel"
                      required
                      value={nrbPhone}
                      onChange={(e) => setNrbPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-white/5 border border-white/10 rounded py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#FF4A4F] text-white placeholder-neutral-700 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1">Current Country Of Residence</label>
                    <input
                      type="text"
                      required
                      value={nrbCountry}
                      onChange={(e) => setNrbCountry(e.target.value)}
                      placeholder="United Kingdom"
                      className="w-full bg-white/5 border border-white/10 rounded py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#FF4A4F] text-white placeholder-neutral-700 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1">Specific Property Specifications</label>
                    <textarea
                      value={nrbDetails}
                      onChange={(e) => setNrbDetails(e.target.value)}
                      rows={3}
                      placeholder="Looking for a 4BHK penthouse in Gulshan-2 with panoramic skyline views..."
                      className="w-full bg-white/5 border border-white/10 rounded py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#FF4A4F] text-white placeholder-neutral-700 transition-colors resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={nrbStatus === 'submitting'}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold uppercase text-xs tracking-widest py-3 rounded flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300"
                >
                  <Send className="w-4 h-4" />
                  <span>{nrbStatus === 'submitting' ? 'Submitting...' : 'Submit Remote Consultation'}</span>
                </button>
              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
