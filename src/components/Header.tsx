/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, CalendarRange, Sun, Moon, Globe } from 'lucide-react';
import MegaMenuDrawer from './MegaMenuDrawer';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
  siteSettings?: any;
}

export default function Header({ onNavigate, activeSection, siteSettings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: t('Home', 'হোম') },
    { id: 'properties', label: t('Projects', 'প্রজেক্টসমূহ') },
    { id: 'verticals', label: t('Group', 'গ্রুপ') },
    { id: 'legacy', label: t('About Us', 'আমাদের কথা') },
    { id: 'contact', label: t('Contact', 'যোগাযোগ') },
  ];

  const handleNavItemClick = (id: string) => {
    onNavigate(id);
  };

  const isDark = theme === 'dark';

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? isDark
              ? 'bg-[#0B0B0C]/95 border-white/10 py-4 shadow-lg backdrop-blur-md'
              : 'bg-[#FAF6EE]/95 border-[#E5DEC9] py-4 shadow-md backdrop-blur-md'
            : 'bg-transparent border-transparent py-6'
        }`}
      >
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          
          {/* Logo Brand Frame */}
          <button
            onClick={() => handleNavItemClick('top')}
            className="flex items-center gap-3 text-left cursor-pointer group"
          >
            <img 
              className="h-10 w-auto object-contain shrink-0 filter brightness-100 group-hover:scale-105 transition-transform duration-300" 
              src="https://lh3.googleusercontent.com/d/1r2nF28eVYOzAAWcsDYDo-ryA7wJ8u2QV" referrerPolicy="no-referrer" 
              alt="Moon Builders Logo"
            />
            <div>
              <span className={`block font-serif text-2xl sm:text-3xl font-extrabold tracking-wider leading-none transition-colors duration-300 ${
                !isScrolled && activeSection === 'hero' ? 'text-white' : isDark ? 'text-white' : 'text-[#2B251F]'
              }`}>
                MOON GROUP
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className={`relative font-mono text-xs tracking-widest uppercase font-semibold cursor-pointer transition-colors duration-300 py-2 text-[#EE1B24] hover:text-[#FF4A4F]`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#EE1B24]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Actions Column */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Theme Toggle Button Desktop (Placed to the left of the phone number) */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                !isScrolled && activeSection === 'hero' 
                  ? 'border-white/20 text-white hover:bg-white/10'
                  : isDark
                    ? 'border-white/10 text-neutral-400 hover:text-white hover:border-white/25 bg-white/5'
                    : 'border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-400 bg-stone-100'
              }`}
              title={isDark ? 'Switch to Day Mode (Cream)' : 'Switch to Night Mode (Dark)'}
            >
              {isDark ? <Sun className={`w-4 h-4 ${!isScrolled && activeSection === 'hero' ? 'text-white' : 'text-[#FF4A4F]'}`} /> : <Moon className={`w-4 h-4 ${!isScrolled && activeSection === 'hero' ? 'text-white' : 'text-stone-700'}`} />}
            </button>

            {/* Direct Phone Number Hotline */}
            <a
              href={`tel:${siteSettings?.hotlinePhone || "+88029009153"}`}
              className="flex items-center gap-2 transition-colors duration-300 text-sm font-mono text-[#EE1B24] hover:text-[#FF4A4F]"
            >
              <Phone className="w-4 h-4 text-[#EE1B24]" />
              <span className="font-bold">{siteSettings?.hotlinePhone || "+88 02 9009153"}</span>
            </a>

            {/* Book Site Visit Button */}
            <button
              onClick={() => handleNavItemClick('visit-booker')}
              className="px-5 py-2.5 bg-[#EE1B24] hover:bg-[#CC121A] text-white font-bold text-xs tracking-widest uppercase transition-colors duration-300 flex items-center space-x-2 rounded-sm cursor-pointer shadow-md"
            >
              <CalendarRange className="w-4 h-4" />
              <span>{t('Book Site Visit', 'ভিজিট বুক করুন')}</span>
            </button>

            {/* Desktop Drawer Trigger (Moved to the right side of Site Visit) */}
            <button
              onClick={() => setIsMegaMenuOpen(true)}
              className="flex items-center gap-1.5 font-mono text-xs tracking-widest uppercase font-bold text-[#EE1B24] hover:text-white hover:bg-[#FF4A4F] transition-all duration-300 py-2.5 cursor-pointer border border-[#EE1B24]/30 bg-transparent rounded-sm px-4"
            >
              <Menu className="w-4 h-4 text-[#EE1B24]" />
              <span>{t('Menu', 'মেনু')}</span>
            </button>
          </div>

          {/* Mobile Right Controls Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                !isScrolled && activeSection === 'hero'
                  ? 'border-white/20 text-white hover:bg-white/10 bg-black/20'
                  : isDark
                    ? 'border-white/10 text-[#FF4A4F] bg-[#161617]'
                    : 'border-stone-200 text-stone-700 bg-stone-100'
              }`}
            >
              {isDark ? <Sun className={`w-4.5 h-4.5 ${!isScrolled && activeSection === 'hero' ? 'text-white' : ''}`} /> : <Moon className={`w-4.5 h-4.5 ${!isScrolled && activeSection === 'hero' ? 'text-white' : ''}`} />}
            </button>

            <button
              onClick={() => setIsMegaMenuOpen(true)}
              className="p-2 rounded border border-[#EE1B24]/20 bg-transparent hover:bg-[#EE1B24] text-[#EE1B24] hover:text-white transition-colors duration-300 flex items-center gap-1 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
              <span className="text-[10px] font-mono uppercase font-bold pr-1">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Render Premium MegaMenuDrawer Overlay */}
      <MegaMenuDrawer 
        isOpen={isMegaMenuOpen} 
        onClose={() => setIsMegaMenuOpen(false)} 
        onNavigate={onNavigate} 
      />
    </>
  );
}
