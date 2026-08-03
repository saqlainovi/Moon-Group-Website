/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { properties } from '../data/properties';
import { RoomSpecification, Property } from '../types';
import { Compass, Sparkles, Building, Layers, Maximize2, ShieldAlert } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function InteractiveTour() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Select which property to inspect. Default to first one with multiple layouts.
  const tourProperties = properties.filter((p) => p.floorLayouts && p.floorLayouts.length > 0);
  const [activePropIndex, setActivePropIndex] = useState(0);
  const selectedProperty = tourProperties[activePropIndex];

  const [activeLayoutIndex, setActiveLayoutIndex] = useState(0);
  const currentLayout = selectedProperty.floorLayouts[activeLayoutIndex] || selectedProperty.floorLayouts[0];

  const [selectedRoom, setSelectedRoom] = useState<RoomSpecification | null>(
    currentLayout.rooms[0] || null
  );

  const handlePropertyChange = (idx: number) => {
    setActivePropIndex(idx);
    setActiveLayoutIndex(0);
    const layouts = tourProperties[idx].floorLayouts;
    if (layouts && layouts.length > 0 && layouts[0].rooms.length > 0) {
      setSelectedRoom(layouts[0].rooms[0]);
    } else {
      setSelectedRoom(null);
    }
  };

  const handleLayoutChange = (idx: number) => {
    setActiveLayoutIndex(idx);
    const layout = selectedProperty.floorLayouts[idx];
    if (layout && layout.rooms.length > 0) {
      setSelectedRoom(layout.rooms[0]);
    } else {
      setSelectedRoom(null);
    }
  };

  const getRoomSpecDetails = (room: RoomSpecification) => {
    switch (room.type) {
      case 'living':
        return {
          flooring: 'Imported Greek Thassos White Marble (800mm x 800mm)',
          features: ['Double-height structural glazing', 'Integrated ambient LED tray ceilings', 'Concealed central ducting'],
          description: 'Designed for majestic family gatherings and grand scale receptions with pristine sunlight penetration.'
        };
      case 'bed':
        return {
          flooring: 'Burmese Teak Solid Wood Planks',
          features: ['Acoustic soundproof walls', 'Floor-to-ceiling panoramic glass facade', 'Walk-in bespoke dressing ward'],
          description: 'A sanctuary of peace and deep restoration, optimizing airflow, privacy, and panoramic high-altitude views.'
        };
      case 'bath':
        return {
          flooring: 'Non-slip Statuario Marble & Mosaic Features',
          features: ['Kohler luxury gold series fixtures', 'Integrated digital steam control', 'Floating vanity mirror with ambient sensor'],
          description: 'A personal high-end spa oasis crafted to offer deep, thermal relaxation after high-pace corporate schedules.'
        };
      case 'kitchen':
        return {
          flooring: 'Anti-bacterial Porcelano Tiles',
          features: ['German Häfele soft-close smart cabinets', 'Granite worktops with built-in hob', 'Central multi-speed exhaust hood'],
          description: 'A professional-grade culinary theater with a built-in chef island and comprehensive helper entrance portals.'
        };
      case 'balcony':
        return {
          flooring: 'Weatherproof Engineered Wood Decks',
          features: ['Frameless tempered safety glass balustrades', 'Rainsensor automated awning', 'Vertical botanical wall framework'],
          description: 'An elegant personal overlook perfect for morning espresso rituals or enjoying cool sunset lake breezes.'
        };
      default:
        return {
          flooring: 'Polished Imperial Marble',
          features: ['Automated motion-sensor path lighting', 'Emergency fire sprinkler system'],
          description: 'Spacious corridors providing seamless pathways between distinct suites with clean architectural sightlines.'
        };
    }
  };

  const getRoomColorClasses = (type: string, isSelected: boolean) => {
    if (isSelected) {
      return 'bg-gold-500/20 border-gold-400 text-gold-300 shadow-lg shadow-gold-500/10 z-10';
    }
    switch (type) {
      case 'living':
        return 'bg-blue-950/20 border-blue-500/40 text-blue-300 hover:bg-blue-500/10';
      case 'bed':
        return 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10';
      case 'bath':
        return 'bg-purple-950/20 border-purple-500/40 text-purple-300 hover:bg-purple-500/10';
      case 'kitchen':
        return 'bg-rose-950/20 border-rose-500/40 text-rose-300 hover:bg-rose-500/10';
      case 'balcony':
        return 'bg-amber-950/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/10';
      default:
        return 'bg-gray-950/20 border-gray-500/40 text-gray-300 hover:bg-gray-500/10';
    }
  };

  return (
    <section id="interactive-tour" className={`py-24 transition-colors duration-500 relative overflow-hidden ${isDark ? 'bg-[#0B0B0C] text-white' : 'bg-[#FAF6EE] text-[#2B251F]'}`}>
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

      {/* Blueprint Grid Lines Background */}
      <div className={`absolute inset-0 bg-[size:30px_30px] pointer-events-none select-none ${
        isDark 
          ? 'bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)]' 
          : 'bg-[linear-gradient(rgba(43,37,31,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(43,37,31,0.015)_1px,transparent_1px)]'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] tracking-[0.4em] text-[#EE1B24] font-bold uppercase block mb-3">
              Interactive Blueprint Spatial Planner
            </span>
            <h2 className={`font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight transition-colors ${isDark ? 'text-white' : 'text-[#2B251F]'}`}>
              Virtual Layout Configurator
            </h2>
          </div>
          <p className={`font-sans text-sm sm:text-base font-light max-w-md leading-relaxed transition-colors ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>
            Toggle between premium projects, adjust layout sizing, and inspect detailed architectural specs for each residential room directly from our interactive grid.
          </p>
        </div>

        {/* Control Sub-Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Properties & Levels Navigation */}
          <div className="lg:col-span-3 space-y-6">
            {/* Property Selector */}
            <div className={`p-5 rounded-lg border transition-all duration-500 ${isDark ? 'bg-luxury-slate border-white/5' : 'bg-[#F4EEDA] border-stone-300/60'}`}>
              <span className={`block text-[10px] uppercase tracking-widest font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-gold-400' : 'text-[#EE1B24]'}`}>
                <Building className="w-4 h-4" /> Choose Master Project
              </span>
              <div className="space-y-2">
                {tourProperties.map((prop, index) => (
                  <button
                    key={prop.id}
                    onClick={() => handlePropertyChange(index)}
                    className={`w-full text-left px-4 py-3 rounded text-xs uppercase tracking-wider font-semibold border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      activePropIndex === index
                        ? isDark
                          ? 'bg-gold-500/10 text-gold-400 border-gold-500/50 shadow-md shadow-gold-500/5'
                          : 'bg-stone-900/10 text-[#2B251F] border-[#2B251F]/40 font-bold'
                        : isDark
                          ? 'bg-transparent text-slate-400 border-white/5 hover:text-white hover:border-white/10'
                          : 'bg-transparent text-stone-600 border-stone-300/40 hover:text-stone-900 hover:border-[#2B251F]/40'
                    }`}
                  >
                    <span>{prop.title.replace('Moon ', '')}</span>
                    <Compass className={`w-3.5 h-3.5 transition-transform duration-500 ${activePropIndex === index ? 'rotate-45 text-gold-400' : isDark ? 'text-slate-500' : 'text-stone-400'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Level Selector */}
            <div className={`p-5 rounded-lg border transition-all duration-500 ${isDark ? 'bg-luxury-slate border-white/5' : 'bg-[#F4EEDA] border-stone-300/60'}`}>
              <span className={`block text-[10px] uppercase tracking-widest font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-gold-400' : 'text-[#EE1B24]'}`}>
                <Layers className="w-4 h-4" /> Floor Level Layout
              </span>
              <div className="space-y-2 font-sans">
                {selectedProperty.floorLayouts.map((layout, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleLayoutChange(idx)}
                    className={`w-full text-left px-4 py-3 rounded text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-between cursor-pointer border ${
                      activeLayoutIndex === idx
                        ? 'bg-gold-500 text-luxury-charcoal border-gold-500 shadow-lg'
                        : isDark
                          ? 'bg-transparent text-slate-400 border-white/5 hover:text-white hover:border-white/10'
                          : 'bg-transparent text-stone-600 border-stone-300/40 hover:text-[#2B251F] hover:border-[#2B251F]/40'
                    }`}
                  >
                    <span>{layout.levelName}</span>
                    <span className={`text-[10px] font-mono ${activeLayoutIndex === idx ? 'text-luxury-charcoal/80' : 'opacity-60'}`}>
                      {layout.sizeSqft} Sft
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Legend guide */}
            <div className={`p-4 rounded-lg text-[11px] space-y-2 font-mono transition-all duration-500 border ${
              isDark 
                ? 'bg-luxury-slate/50 border-white/5 text-slate-400' 
                : 'bg-[#F4EEDA]/60 border-stone-300/40 text-stone-600'
            }`}>
              <span className={`block font-bold uppercase mb-1 ${isDark ? 'text-slate-300' : 'text-stone-800'}`}>Color Palette Guide</span>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-blue-500/20 border border-blue-500 rounded-sm" /> Living Salon</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-emerald-500/20 border border-emerald-500 rounded-sm" /> Suite Beds</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-purple-500/20 border border-purple-500 rounded-sm" /> Spas/Bath</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-rose-500/20 border border-rose-500 rounded-sm" /> Kitchen</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-amber-500/20 border border-amber-500 rounded-sm" /> Terraces</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 bg-gold-500/20 border border-gold-400 rounded-sm" /> Selected</div>
              </div>
            </div>
          </div>

          {/* Middle Column: Interactive Blueprint Canvas */}
          <div className={`p-6 sm:p-8 rounded-lg shadow-2xl relative border transition-all duration-500 lg:col-span-6 ${
            isDark ? 'bg-luxury-slate border-white/5' : 'bg-[#F4EEDA] border-stone-300/60'
          }`}>
            <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 text-[10px] font-mono text-gold-400/80 bg-luxury-charcoal border border-gold-500/10 px-2.5 py-1 rounded">
              <Maximize2 className="w-3.5 h-3.5" /> 2D Vector Schematic Map
            </div>

            <div className="mb-4">
              <h3 className={`font-serif text-lg font-bold transition-colors ${isDark ? 'text-white' : 'text-[#2B251F]'}`}>{selectedProperty.title}</h3>
              <p className={`font-sans text-xs font-light transition-colors ${isDark ? 'text-slate-400' : 'text-stone-600'}`}>{currentLayout.levelName}</p>
            </div>

            {/* Interactive Schematic Container with relative aspect ratio */}
            <div className="relative w-full aspect-square bg-[#0c0d12] border-2 border-white/5 rounded-lg p-2 overflow-hidden shadow-inner">
              {/* Outer compass decorative watermark */}
              <div className="absolute bottom-4 left-4 font-serif text-[10px] tracking-wider text-slate-500/30 pointer-events-none select-none flex flex-col items-center">
                <span className="font-bold">N</span>
                <div className="w-4 h-4 border-t border-r border-slate-500/30 rotate-45 my-1" />
                <span>S</span>
              </div>

              {/* Grid Lines Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:15px_15px] pointer-events-none" />

              {/* Render Room Rectangles */}
              {currentLayout.rooms.map((room, idx) => {
                const isSelected = selectedRoom?.name === room.name;
                return (
                  <motion.button
                    key={idx}
                    onClick={() => setSelectedRoom(room)}
                    whileHover={{ scale: 1.01 }}
                    className={`absolute border rounded flex flex-col items-center justify-center p-1.5 cursor-pointer text-center select-none overflow-hidden transition-all duration-300 font-sans ${getRoomColorClasses(
                      room.type,
                      isSelected
                    )}`}
                    style={{
                      left: `${room.x}%`,
                      top: `${room.y}%`,
                      width: `${room.w}%`,
                      height: `${room.h}%`,
                    }}
                  >
                    <span className="block font-semibold text-[10px] sm:text-xs leading-tight tracking-wide">
                      {room.name}
                    </span>
                    <span className="block text-[8px] sm:text-[9px] opacity-70 font-mono mt-0.5">
                      {room.type.toUpperCase()}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Room Spec Sheet */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {selectedRoom ? (
                <motion.div
                  key={selectedRoom.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`p-5 rounded-lg shadow-xl h-full flex flex-col justify-between border transition-all duration-500 ${
                    isDark ? 'bg-luxury-slate border-white/5 text-white' : 'bg-[#F4EEDA] border-stone-300/60 text-stone-800'
                  }`}
                >
                  <div>
                    {/* Header Spec */}
                    <div className={`pb-4 border-b mb-5 ${isDark ? 'border-white/10' : 'border-stone-300/60'}`}>
                      <span className={`px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider rounded-sm inline-block mb-2 font-sans ${
                        isDark ? 'bg-gold-400 text-luxury-charcoal' : 'bg-stone-900 text-white'
                      }`}>
                        {selectedRoom.type}
                      </span>
                      <h4 className={`font-serif text-lg font-semibold tracking-wide transition-colors ${isDark ? 'text-white' : 'text-[#2B251F]'}`}>
                        {selectedRoom.name}
                      </h4>
                      <span className={`block text-[11px] font-mono mt-1 uppercase ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                        Structural Specs Checked
                      </span>
                    </div>

                    {/* Room Description */}
                    <div className="mb-5">
                      <h5 className="text-[10px] text-gold-600 font-bold uppercase tracking-widest mb-2 font-mono">
                        Spatial Synopsis
                      </h5>
                      <p className={`font-sans text-xs font-light leading-relaxed transition-colors ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                        {getRoomSpecDetails(selectedRoom).description}
                      </p>
                    </div>

                    {/* Flooring Detail */}
                    <div className="mb-5">
                      <h5 className="text-[10px] text-gold-600 font-bold uppercase tracking-widest mb-2 font-mono">
                        Material & Finishing
                      </h5>
                      <p className={`font-sans text-xs font-medium border p-2.5 rounded transition-all duration-500 ${
                        isDark ? 'bg-luxury-beige border-white/5 text-gray-200' : 'bg-[#FAF6EE] border-stone-300/40 text-stone-800'
                      }`}>
                        {getRoomSpecDetails(selectedRoom).flooring}
                      </p>
                    </div>

                    {/* Key features list */}
                    <div>
                      <h5 className="text-[10px] text-gold-600 font-bold uppercase tracking-widest mb-3.5 font-mono">
                        Engineering Features
                      </h5>
                      <ul className="space-y-2.5 text-xs">
                        {getRoomSpecDetails(selectedRoom).features.map((ft, i) => (
                          <li key={i} className={`flex items-start font-light leading-snug transition-colors ${isDark ? 'text-slate-300' : 'text-stone-600'}`}>
                            <Sparkles className="w-3.5 h-3.5 text-gold-600 mr-2 shrink-0 mt-0.5" />
                            <span>{ft}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Trust disclaimer */}
                  <div className={`pt-6 border-t mt-6 flex items-center space-x-2 text-[10px] font-mono ${isDark ? 'border-white/5 text-slate-400' : 'border-stone-300/40 text-stone-500'}`}>
                    <ShieldAlert className="w-4 h-4 text-gold-600 shrink-0" />
                    <span>All measurements in standard feet scale.</span>
                  </div>
                </motion.div>
              ) : (
                <div className={`p-6 rounded-lg text-center font-sans text-xs h-full flex flex-col items-center justify-center border transition-all duration-500 ${
                  isDark ? 'bg-luxury-slate border-white/5 text-slate-400' : 'bg-[#F4EEDA] border-stone-300/60 text-stone-500'
                }`}>
                  <Compass className={`w-8 h-8 mb-3 animate-pulse-slow ${isDark ? 'text-slate-600' : 'text-stone-400'}`} />
                  Select a room in the layout plan to inspect technical specs.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
