/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import PartnershipPortal from './PartnershipPortal';

export default function LandownerPage() {
  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white pt-20">
      {/* Landowner Header Accent */}
      <div className="relative py-16 sm:py-20 bg-[#141416] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#FF4A4F]/5 rounded-full filter blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10 text-center sm:text-left">
          <span className="font-mono text-xs text-[#FF4A4F] uppercase tracking-[0.25em] font-bold block mb-3">
            Joint Venture Portals
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white max-w-4xl">
            Landowner Partnerships
          </h1>
          <p className="text-slate-400 font-light text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            Maximize the structural and financial potential of your land asset. Join hands with Moon Builders to design, construct, and manage iconic, secure skyscrapers.
          </p>
        </div>
      </div>

      {/* Render core landowner form and pillars */}
      <div>
        <PartnershipPortal />
      </div>
    </div>
  );
}
