/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Building2, Facebook, Twitter, Instagram, Linkedin, Youtube, Phone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onOpenAdmin?: () => void;
  siteSettings?: any;
}

export default function Footer({ onOpenAdmin, siteSettings }: FooterProps) {
  const { isDark } = useTheme();

  const phoneList = siteSettings?.telephoneNumbers
    ? siteSettings.telephoneNumbers.split(/[\n,]+/).map((s: string) => s.trim()).filter(Boolean)
    : ['0241002945', '0241002946', '0241002947', '0241002948', '0241002949', '0241002951', '0241000182'];

  const emailList = siteSettings?.emailAddress
    ? siteSettings.emailAddress.split(/[\n,]+/).map((s: string) => s.trim()).filter(Boolean)
    : ["moongroupofindustrylimited@gmail.com"];

  return (
    <footer id="contact" className="relative bg-[#161617] border-t border-white/10 pt-24 pb-8 overflow-hidden z-10">
      {/* Structural blueprint grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(216,216,214,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(216,216,214,0.05)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20"></div>

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Column 1: Identity & Badges */}
          <div className="space-y-6 lg:col-span-3">
            <a href="#top" className="flex items-center gap-3 text-left">
              <img 
                className="h-12 w-auto object-contain shrink-0" 
                src="https://lh3.googleusercontent.com/d/1r2nF28eVYOzAAWcsDYDo-ryA7wJ8u2QV" referrerPolicy="no-referrer" 
                alt="Moon Group Logo Icon"
              />
              <div>
                <span className={`block font-serif text-2xl font-bold tracking-widest leading-none ${isDark ? 'text-white' : 'text-[#EE1B24]'}`}>
                  {siteSettings?.brandName ? siteSettings.brandName.split("OF")[0].trim() : "MOON GROUP"}
                </span>
                <span className="block font-sans text-[8px] tracking-[0.15em] text-[#FF4A4F] font-bold uppercase leading-none mt-1">
                  {siteSettings?.brandName && siteSettings.brandName.includes("OF") ? "OF " + siteSettings.brandName.split("OF")[1].trim() : "OF INDUSTRIES LTD"}
                </span>
              </div>
            </a>
            <p className="text-[#D8D8D6] text-sm leading-relaxed font-light">
              {siteSettings?.tagline || "The construction and real estate arm of Moon Group of Industries. Building Bangladesh's homes and premium skylines since 1989."}
            </p>
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <div className="flex items-center gap-2 border border-white/10 rounded-md py-2 px-3 bg-[#161617]/80 shrink-0">
                <Award className="w-4 h-4 text-[#EE1B24] shrink-0" />
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">REHAB Member</span>
                  <span className="block text-[9px] font-semibold text-white font-mono">{siteSettings?.rehabRegNo || "Reg # 1452/2012"}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 border border-white/10 rounded-md py-2 px-3 bg-[#161617]/80 shrink-0">
                <Building2 className="w-4 h-4 text-[#EE1B24] shrink-0" />
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold">RAJUK Registered</span>
                  <span className="block text-[9px] font-semibold text-white font-mono">{siteSettings?.rajukCodeNo || "Code # DL-3215"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Head Office */}
          <div className="space-y-6 lg:col-span-2">
            <h5 className="font-mono text-xs font-bold text-[#FF4A4F] tracking-[0.1em] uppercase">Head Office</h5>
            <div className="text-[#D8D8D6] text-sm leading-relaxed space-y-4">
              <p className="whitespace-pre-line">
                {siteSettings?.headOffice || "Mizan Tower, Mirpur Road\nKallyanpur, Dhaka-1207"}
              </p>
              <div className="flex flex-col space-y-1">
                <a href={`tel:${siteSettings?.hotlinePhone || "+88029009153"}`} className="hover:text-white font-mono transition-colors">{siteSettings?.hotlinePhone || "+88 02 9009153"}</a>
                {siteSettings?.whatsappPhone && (
                  <a href={`https://wa.me/${siteSettings.whatsappPhone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-white font-mono transition-colors text-emerald-400">WhatsApp: {siteSettings.whatsappPhone}</a>
                )}
              </div>
            </div>
          </div>

          {/* Column 3: Contact Telephone Lines */}
          <div className="space-y-5 lg:col-span-2">
            <h5 className="font-mono text-xs font-bold text-[#FF4A4F] tracking-[0.1em] uppercase flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#EE1B24]" />
              <span>Contact Lines</span>
            </h5>
            <div className="space-y-1.5 text-xs font-mono text-[#D8D8D6]">
              {phoneList.map((num: string, idx: number) => (
                <a 
                  key={idx}
                  href={`tel:${num.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2 hover:text-white transition-colors group py-0.5 border-b border-white/5 last:border-0"
                >
                  <span className="text-[#EE1B24] font-bold text-[10px] group-hover:translate-x-0.5 transition-transform">☎</span>
                  <span className="break-all">{num}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Write to Us & Links */}
          <div className="space-y-6 lg:col-span-3">
            <h5 className="font-mono text-xs font-bold text-[#FF4A4F] tracking-[0.1em] uppercase">Write to Us</h5>
            <div className="text-[#D8D8D6] text-sm leading-relaxed space-y-3">
              <div className="space-y-1.5">
                {emailList.map((email: string, idx: number) => (
                  <a 
                    key={idx}
                    href={`mailto:${email}`} 
                    className="block text-[#FF4A4F] hover:text-white transition-colors font-mono text-xs sm:text-xs md:text-sm break-words [word-break:break-word] border-b border-white/5 pb-1.5 last:border-0"
                  >
                    {email}
                  </a>
                ))}
              </div>
              <div className="pt-1 space-y-2">
                <a href="#properties" className="block hover:text-white transition-colors">View Projects</a>
                <a href="#verticals" className="block hover:text-white transition-colors">Group Concerns</a>
                <a href="#legacy" className="block hover:text-white transition-colors">About Us</a>
              </div>
            </div>
          </div>

          {/* Column 5: Social Media */}
          <div className="space-y-6 lg:col-span-2">
            <h5 className="font-mono text-xs font-bold text-[#FF4A4F] tracking-[0.1em] uppercase">Follow Us</h5>
            <div className="flex flex-col gap-3 text-[#D8D8D6] text-sm">
              <a href={siteSettings?.facebookLink || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform group-hover:text-[#EE1B24]" />
                <span>Facebook</span>
              </a>
              <a href={siteSettings?.twitterLink || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform group-hover:text-[#EE1B24]" />
                <span>Twitter</span>
              </a>
              <a href={siteSettings?.linkedinLink || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform group-hover:text-[#EE1B24]" />
                <span>LinkedIn</span>
              </a>
              <a href={siteSettings?.youtubeLink || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform group-hover:text-[#EE1B24]" />
                <span>YouTube</span>
              </a>
              {siteSettings?.instagramLink && (
                <a href={siteSettings.instagramLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer group">
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform group-hover:text-[#EE1B24]" />
                  <span>Instagram</span>
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6B6B6A]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 text-center sm:text-left">
            <span>
              {siteSettings?.copyrightText || `© ${new Date().getFullYear()} Moon Builders — Moon Group of Industries. All rights reserved.`}
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>
              Developed by{' '}
              <a 
                href="https://ovisoft.tech" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#FF4A4F] hover:underline font-semibold hover:text-white transition-colors"
              >
                OviSoft Tech
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[#FF4A4F] transition-colors">Privacy Charter</a>
            <a href="#" className="hover:text-[#FF4A4F] transition-colors">Legal Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
