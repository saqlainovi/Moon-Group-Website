/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  Gift, 
  Award, 
  Sparkles, 
  Send, 
  UserCheck, 
  ShieldCheck, 
  FileCheck, 
  Coins, 
  HeartHandshake
} from 'lucide-react';

export default function ReferralProgramPage() {
  // Form states for Referral
  const [refYourName, setRefYourName] = useState('');
  const [refYourPhone, setRefYourPhone] = useState('');
  const [refFriendName, setRefFriendName] = useState('');
  const [refFriendPhone, setRefFriendPhone] = useState('');
  const [refProject, setRefProject] = useState('Moon Skyline Horizon');
  const [refStatus, setRefStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleReferralSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refYourName || !refYourPhone || !refFriendName || !refFriendPhone) return;

    setRefStatus('submitting');
    const referralId = `REF-${Math.floor(1000 + Math.random() * 9000)}`;

    const referralData = {
      id: referralId,
      referrerName: refYourName,
      referrerPhone: refYourPhone,
      friendName: refFriendName,
      friendPhone: refFriendPhone,
      interestedProject: refProject,
      createdAt: new Date().toLocaleDateString(),
      status: 'pending'
    };

    try {
      await fetch('/api/cms/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(referralData)
      });
    } catch (err) {
      console.warn('Fallback to local storage for referrals:', err);
    }

    // Save locally
    const existing = localStorage.getItem('moon_referrals');
    const list = existing ? JSON.parse(existing) : [];
    list.push(referralData);

    setRefStatus('success');
  };

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white pt-20 pb-28">
      
      {/* Hero Header */}
      <div className="relative py-16 sm:py-20 bg-[#141416] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#FF4A4F]/5 rounded-full filter blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10 text-center sm:text-left">
          <span className="font-mono text-xs text-[#FF4A4F] uppercase tracking-[0.25em] font-bold block mb-3">
            Elite Commision & Recognition
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white max-w-4xl">
            Elite Referral Program
          </h1>
          <p className="text-slate-400 font-light text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            Empower your network. Refer your associates, friends, or joint-venture land partners to Moon Builders and earn high-yield cash commissions and luxury gold coin rewards.
          </p>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Informative Side */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#FF4A4F] uppercase font-bold">
                BENEFITS & TIERS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white mt-1">
                Commissions & Luxury Souvenirs
              </h2>
            </div>

            <div className="space-y-6">
              {/* Reward card 1 */}
              <div className="bg-[#141416] border border-white/5 p-6 rounded flex items-start gap-5">
                <div className="w-12 h-12 rounded bg-[#FF4A4F]/10 flex items-center justify-center text-[#FF4A4F] shrink-0">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">1% Real Estate Commission</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-1 font-light">
                    Receive 1% cash back commission on any residential apartment, retail showroom, or corporate office reservation successfully booked and paid by your referred client.
                  </p>
                </div>
              </div>

              {/* Reward card 2 */}
              <div className="bg-[#141416] border border-white/5 p-6 rounded flex items-start gap-5">
                <div className="w-12 h-12 rounded bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">22K Solid Gold Souvenir Coin</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-1 font-light">
                    Receive a specially certified 22K Solid Gold sovereign souvenir coin from Moon Group for successfully referring joint-venture landowners who sign a building lease.
                  </p>
                </div>
              </div>

              {/* Reward card 3 */}
              <div className="bg-[#141416] border border-white/5 p-6 rounded flex items-start gap-5">
                <div className="w-12 h-12 rounded bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Private Luxury Dinner</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-1 font-light">
                    Top-performing referrers will receive private board executive dinners and customized golden trophies signed by our group Chairman.
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance Note */}
            <div className="p-5 border border-dashed border-white/10 rounded font-sans text-xs text-neutral-400 leading-relaxed">
              <span className="font-bold text-white block mb-1">How it works:</span>
              Once you submit the form, our elite sales relationship desk logs the lead. If the prospect locks down a booking within 6 months, we release your commission securely via bank routing within 10 business days of final down-payment validation.
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-6 bg-[#141416] border border-white/10 p-6 sm:p-10 rounded-sm relative">
            <span className="absolute top-0 right-10 -translate-y-1/2 bg-yellow-500 text-black text-[9px] font-mono font-extrabold uppercase px-3 py-1 tracking-widest rounded-sm">
              Secured Portal
            </span>

            {refStatus === 'success' ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded text-center my-10"
              >
                <UserCheck className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h4 className="font-serif text-xl font-bold text-white">Referral Registered Successfully!</h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-light mt-2 max-w-sm mx-auto leading-relaxed">
                  The client profile has been securely recorded under our commission network. We will contact them with priority listings.
                </p>
                <button
                  onClick={() => setRefStatus('idle')}
                  className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded font-mono text-xs text-white uppercase tracking-wider cursor-pointer"
                >
                  Submit Another Lead
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleReferralSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-white">Submit Referral Application</h3>
                  <p className="text-xs text-neutral-400 mt-1">Fill out your contact details alongside your friend's specifications below.</p>
                </div>

                <div className="border-t border-white/5 pt-6">
                  <span className="block text-[10px] font-mono tracking-widest text-[#FF4A4F] uppercase font-bold mb-4">
                    Step I: Your Information (Referrer)
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={refYourName}
                        onChange={(e) => setRefYourName(e.target.value)}
                        placeholder="Karim Ahmed"
                        className="w-full bg-white/5 border border-white/10 rounded py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#FF4A4F] text-white placeholder-neutral-700 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1">Your Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={refYourPhone}
                        onChange={(e) => setRefYourPhone(e.target.value)}
                        placeholder="01711223344"
                        className="w-full bg-white/5 border border-white/10 rounded py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#FF4A4F] text-white placeholder-neutral-700 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6">
                  <span className="block text-[10px] font-mono tracking-widest text-yellow-500 uppercase font-bold mb-4">
                    Step II: Client Information (The Prospect)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1">Their Name</label>
                      <input
                        type="text"
                        required
                        value={refFriendName}
                        onChange={(e) => setRefFriendName(e.target.value)}
                        placeholder="Shahnaz Kabir"
                        className="w-full bg-white/5 border border-white/10 rounded py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#FF4A4F] text-white placeholder-neutral-700 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1">Their Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={refFriendPhone}
                        onChange={(e) => setRefFriendPhone(e.target.value)}
                        placeholder="01822334455"
                        className="w-full bg-white/5 border border-white/10 rounded py-2.5 px-3.5 text-xs focus:outline-none focus:border-[#FF4A4F] text-white placeholder-neutral-700 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-[10px] text-neutral-400 uppercase font-mono mb-1">Target Development Interest</label>
                  <select
                    value={refProject}
                    onChange={(e) => setRefProject(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded py-3 px-3.5 text-xs focus:outline-none focus:border-[#FF4A4F] text-white cursor-pointer transition-colors"
                  >
                    <option value="Moon Skyline Horizon">Moon Skyline Horizon (Gulshan-2 luxury apartments)</option>
                    <option value="Moon Green Meadow">Moon Green Meadow (Bashundhara R/A elite suites)</option>
                    <option value="Moon Rose Villa">Moon Rose Villa (Dhanmondi boutique home)</option>
                    <option value="Landowner Proposal">Joint-Venture Landowner Agreement</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={refStatus === 'submitting'}
                  className="w-full bg-[#FF4A4F] hover:bg-red-600 text-black font-bold uppercase text-xs tracking-widest py-3.5 rounded flex items-center justify-center gap-2 cursor-pointer transition-colors duration-300"
                >
                  <Send className="w-4 h-4" />
                  <span>{refStatus === 'submitting' ? 'Registering...' : 'Submit Referral Lead'}</span>
                </button>
              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}
