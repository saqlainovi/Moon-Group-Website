/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronRight, 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink
} from 'lucide-react';
import { useTheme, WireframePerspective } from '../context/ThemeContext';

interface MegaMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function MegaMenuDrawer({ isOpen, onClose, onNavigate }: MegaMenuDrawerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const menuItems = [
    { id: 'hero', label: 'Home' },
    { id: 'legacy', label: 'About Us' },
    { id: 'properties', label: 'Properties' },
    { id: 'verticals', label: 'Group Concerns' },
    { id: 'partnership', label: 'Landowner Partnerships' },
    { id: 'construction', label: 'Construction Status' },
    { id: 'nrb', label: 'NRB Investment' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleItemClick = (id: string) => {
    onClose();
    // Wait for drawer close animation before routing
    setTimeout(() => {
      onNavigate(id);
    }, 250);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[100] cursor-pointer"
          />

          {/* Sliding Drawer Body */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className={`fixed top-0 right-0 h-full w-full sm:w-[460px] z-[101] overflow-y-auto select-none flex flex-col justify-between transition-colors duration-500 border-l backdrop-blur-md ${
              isDark 
                ? 'bg-[#141416]/75 border-white/10 text-neutral-300' 
                : 'bg-[#FAF6EE]/80 border-[#E5DEC9] text-stone-800'
            }`}
          >
            {/* Background Graphic watermark for Light mode */}
            {!isDark && (
              <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
                <WireframePerspective className="absolute right-[-100px] bottom-0 w-[400px] h-[400px]" />
              </div>
            )}
            
            {/* Header & Navigation */}
            <div className="p-8 sm:p-10 relative z-10">
              <div className="flex justify-between items-center mb-12">
                <span className={`font-serif text-3xl sm:text-4xl font-semibold tracking-tight ${
                  isDark ? 'text-white' : 'text-[#2B251F]'
                }`}>
                  Menu
                </span>
                
                <button
                  onClick={onClose}
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer group border ${
                    isDark 
                      ? 'border-white/20 text-white hover:text-[#FF4A4F] hover:border-[#FF4A4F]' 
                      : 'border-stone-300 text-stone-700 hover:text-[#FF4A4F] hover:border-[#FF4A4F]'
                  }`}
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Primary Nav List linking to separate pages */}
              <nav className="flex flex-col space-y-4 mb-12">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`group flex items-center text-left text-[16px] sm:text-[17px] font-sans font-medium transition-all cursor-pointer py-1 ${
                      isDark ? 'text-neutral-300 hover:text-[#FF4A4F]' : 'text-stone-700 hover:text-[#FF4A4F]'
                    }`}
                  >
                    <ChevronRight className={`w-4 h-4 group-hover:text-[#FF4A4F] group-hover:translate-x-1.5 transition-all duration-300 mr-4 ${
                      isDark ? 'text-neutral-600' : 'text-stone-400'
                    }`} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Contact Information Touchpoints */}
              <div className={`border-t pt-8 mb-4 ${isDark ? 'border-neutral-800/80' : 'border-stone-200'}`}>
                <h3 className={`font-serif text-xl sm:text-2xl font-semibold tracking-wide ${
                  isDark ? 'text-white' : 'text-[#2B251F]'
                }`}>
                  Get in touch
                </h3>
                <div className="w-14 h-[2.5px] bg-[#FF4A4F] mt-2 mb-8" />
              </div>

              <div className="space-y-5 font-sans">
                {/* Hotlines */}
                <a href="tel:16604" className="flex items-center gap-4 group cursor-pointer">
                  <div className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                    isDark 
                      ? 'border-white/10 bg-white/5 text-neutral-400 group-hover:text-white group-hover:border-[#FF4A4F] group-hover:bg-[#FF4A4F]/10' 
                      : 'border-stone-200 bg-stone-50 text-stone-600 group-hover:text-[#FF4A4F] group-hover:border-[#FF4A4F] group-hover:bg-[#FF4A4F]/5'
                  }`}>
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className={`text-[14px] transition-all font-medium font-mono ${
                    isDark ? 'text-neutral-300 group-hover:text-[#FF4A4F]' : 'text-stone-700 group-hover:text-[#FF4A4F]'
                  }`}>
                    16604
                  </span>
                </a>

                <a href="tel:+8809613191919" className="flex items-center gap-4 group cursor-pointer">
                  <div className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                    isDark 
                      ? 'border-white/10 bg-white/5 text-neutral-400 group-hover:text-white group-hover:border-[#FF4A4F] group-hover:bg-[#FF4A4F]/10' 
                      : 'border-stone-200 bg-stone-50 text-stone-600 group-hover:text-[#FF4A4F] group-hover:border-[#FF4A4F] group-hover:bg-[#FF4A4F]/5'
                  }`}>
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className={`text-[14px] transition-all font-medium font-mono ${
                    isDark ? 'text-neutral-300 group-hover:text-[#FF4A4F]' : 'text-stone-700 group-hover:text-[#FF4A4F]'
                  }`}>
                    +8809613191919
                  </span>
                </a>

                <a href="mailto:info@moongroupbd.com" className="flex items-center gap-4 group cursor-pointer">
                  <div className={`w-11 h-11 rounded-full border flex items-center justify-center transition-all ${
                    isDark 
                      ? 'border-white/10 bg-white/5 text-neutral-400 group-hover:text-white group-hover:border-[#FF4A4F] group-hover:bg-[#FF4A4F]/10' 
                      : 'border-stone-200 bg-stone-50 text-stone-600 group-hover:text-[#FF4A4F] group-hover:border-[#FF4A4F] group-hover:bg-[#FF4A4F]/5'
                  }`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className={`text-[14px] transition-all font-medium ${
                    isDark ? 'text-neutral-300 group-hover:text-[#FF4A4F]' : 'text-stone-700 group-hover:text-[#FF4A4F]'
                  }`}>
                    info@moongroupbd.com
                  </span>
                </a>

                {/* Office Location */}
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-full border flex items-center justify-center mt-1 shrink-0 ${
                    isDark ? 'border-white/10 bg-white/5 text-neutral-400' : 'border-stone-200 bg-stone-50 text-stone-600'
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={`text-[13px] font-semibold ${isDark ? 'text-white' : 'text-stone-800'}`}>
                      Moon Celebration Point
                    </h4>
                    <p className={`text-[12px] leading-relaxed font-light mt-0.5 ${isDark ? 'text-neutral-400' : 'text-stone-600'}`}>
                      Plot: 3 & 5, Road: 113/A,<br />
                      Gulshan-2, Dhaka-1212
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Brand Copyright */}
            <div className={`p-6 text-center border-t relative z-10 ${
              isDark ? 'bg-[#0B0B0C]/75 border-white/5' : 'bg-[#F2ECD9]/75 border-stone-300/60'
            }`}>
              <p className={`text-[10px] font-mono tracking-widest uppercase ${
                isDark ? 'text-neutral-500' : 'text-stone-600'
              }`}>
                Moon Group of Industry © 2026
              </p>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
