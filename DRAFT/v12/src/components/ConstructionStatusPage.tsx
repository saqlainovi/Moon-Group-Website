/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  HardHat, 
  Construction, 
  FileCheck,
  Percent,
  CalendarDays,
  MapPin,
  Flame,
  Search
} from 'lucide-react';

export default function ConstructionStatusPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 'moon-skyline',
      title: 'Moon Skyline Horizon',
      location: 'Plot 12, Road 113/A, Gulshan-2, Dhaka',
      type: 'Super Luxury Residential',
      progress: 85,
      certifiedBy: 'BUET Structural Lab',
      handoverDate: 'December 2026',
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
      stages: [
        { name: 'Piling & Substructure Foundations', status: 'completed', date: 'Jan 2024' },
        { name: 'Column Casting (Slabs 1 to 15)', status: 'completed', date: 'Jul 2025' },
        { name: 'External Masonry & Brick laying', status: 'completed', date: 'Jan 2026' },
        { name: 'Internal Finishing & VRF HVAC fitting', status: 'ongoing', date: 'Active' },
        { name: 'Handover & Gas/Electricity Connection', status: 'upcoming', date: 'Dec 2026' }
      ],
      details: {
        seismicFactor: 'Zone 2 (Richter 7.5+) Resilience',
        concreteStrength: '6,500 PSI High Performance Cylinders',
        steelGrade: '72.5G High-Yield Thermo-Mechanically Treated Rebars',
        rajukApproval: 'Approved (RAJUK/BP/341/23)',
        civilAviation: 'Clearance Granted (Max height 150ft)'
      }
    },
    {
      id: 'moon-meadow',
      title: 'Moon Green Meadow',
      location: 'Block I, Road 18, Bashundhara R/A, Dhaka',
      type: 'Elite Luxury Residential',
      progress: 60,
      certifiedBy: 'BUET Structural Lab',
      handoverDate: 'September 2027',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop',
      stages: [
        { name: 'Piling & Substructure Foundations', status: 'completed', date: 'Oct 2024' },
        { name: 'Column Casting (Slabs 1 to 9)', status: 'completed', date: 'Mar 2026' },
        { name: 'External Masonry & Plastering', status: 'ongoing', date: 'Active' },
        { name: 'Sanitary Piping & Plumbing Network', status: 'upcoming', date: 'Jul 2027' },
        { name: 'Handover and Power Onboarding', status: 'upcoming', date: 'Sep 2027' }
      ],
      details: {
        seismicFactor: 'Zone 2 (Richter 7.5+) Resilience',
        concreteStrength: '6,000 PSI High Performance Cylinders',
        steelGrade: '72.5G High-Yield Thermo-Mechanically Treated Rebars',
        rajukApproval: 'Approved (RAJUK/BP/109/24)',
        civilAviation: 'Clearance Granted'
      }
    },
    {
      id: 'moon-rose',
      title: 'Moon Rose Villa',
      location: 'Road 27, Dhanmondi, Dhaka',
      type: 'Premium Boutique Apartments',
      progress: 25,
      certifiedBy: 'BUET Engineering Dept',
      handoverDate: 'June 2028',
      imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop',
      stages: [
        { name: 'Soil Compaction & Deep Excavation', status: 'completed', date: 'Dec 2025' },
        { name: 'Piling & Basement Foundation Casting', status: 'ongoing', date: 'Active' },
        { name: 'Superstructure Frame Pillars (Ground to 5th)', status: 'upcoming', date: 'Nov 2026' },
        { name: 'External Brick Wall Work & Joinery', status: 'upcoming', date: 'Jun 2027' },
        { name: 'Luxury Finishing and Landscaping', status: 'upcoming', date: 'Jun 2028' }
      ],
      details: {
        seismicFactor: 'Zone 2 (Richter 8.0+) Engineered',
        concreteStrength: '7,000 PSI Micro-silica Concrete',
        steelGrade: '72.5G High-Yield Thermo-Mechanically Treated Rebars',
        rajukApproval: 'Approved (RAJUK/BP/88/25)',
        civilAviation: 'Clearance Granted'
      }
    }
  ];

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-white pt-20 pb-28">
      {/* Page Title Header */}
      <div className="relative py-16 sm:py-20 bg-[#141416] border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#FF4A4F]/5 rounded-full filter blur-[100px] pointer-events-none" />
        
        <div className="max-w-[1360px] mx-auto px-6 sm:px-10 relative z-10 text-center sm:text-left">
          <span className="font-mono text-xs text-[#FF4A4F] uppercase tracking-[0.25em] font-bold block mb-3">
            Realtime Construction Status
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-white max-w-4xl">
            Live Development Progress
          </h1>
          <p className="text-slate-400 font-light text-sm sm:text-base mt-4 max-w-2xl leading-relaxed">
            We operate with absolute transparency. Monitor the engineering milestones, concrete compaction PSI reports, and regulatory safety clearance schedules across all of our active landmarks.
          </p>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 mt-12">
        {/* Search Bar */}
        <div className="relative max-w-md mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Search active project site..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#141416] border border-white/10 rounded py-3 pl-11 pr-4 text-xs focus:outline-none focus:border-[#FF4A4F] text-white placeholder-neutral-600 transition-colors"
          />
        </div>

        {/* Projects Progress Listing */}
        <div className="space-y-16">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-[#141416] border border-white/10 p-6 sm:p-10 rounded-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Visual Image & Progress Gauge */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="relative aspect-[4/3] rounded overflow-hidden border border-white/5 bg-neutral-900">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover filter contrast-[1.05]"
                    />
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-sm flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#FF4A4F] font-bold">
                      <HardHat className="w-3 h-3" />
                      <span>Live Site</span>
                    </div>
                  </div>

                  {/* Large Percent Gauge */}
                  <div className="bg-white/5 border border-white/5 rounded p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">Global Completion</span>
                      <span className="font-mono text-2xl font-bold text-[#FF4A4F]">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 to-[#FF4A4F] rounded-full" style={{ width: `${project.progress}%` }} />
                    </div>
                    <div className="flex items-center gap-2 mt-4 text-[11px] text-neutral-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Seismic Certified by {project.certifiedBy}</span>
                    </div>
                  </div>
                </div>

                {/* Milestones and Technical Parameters */}
                <div className="lg:col-span-8 space-y-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-[9px] font-mono tracking-widest text-[#FF4A4F] bg-[#FF4A4F]/10 border border-[#FF4A4F]/20 px-2 py-0.5 rounded uppercase font-bold">
                        {project.type}
                      </span>
                      <span className="text-neutral-500 text-xs font-mono">• Handover {project.handoverDate}</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-white">
                      {project.title}
                    </h2>
                    <p className="text-xs text-neutral-400 font-mono mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {project.location}
                    </p>
                  </div>

                  {/* Project Stages Timeline */}
                  <div>
                    <h4 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-4 font-bold flex items-center gap-1.5">
                      <Construction className="w-4 h-4 text-[#FF4A4F]" />
                      <span>Construction Stages Milestone Tracking</span>
                    </h4>

                    <div className="relative pl-6 border-l border-neutral-800 space-y-6">
                      {project.stages.map((stage, idx) => (
                        <div key={idx} className="relative">
                          {/* Circle indicator */}
                          <div className={`absolute -left-[31px] top-1 w-[11px] h-[11px] rounded-full border ${
                            stage.status === 'completed' 
                              ? 'bg-emerald-500 border-emerald-400' 
                              : stage.status === 'ongoing' 
                              ? 'bg-[#FF4A4F] border-[#FF4A4F] animate-pulse' 
                              : 'bg-neutral-800 border-neutral-700'
                          }`} />
                          
                          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                            <span className={`text-xs sm:text-sm font-sans font-medium ${
                              stage.status === 'completed' ? 'text-neutral-400' : 'text-white'
                            }`}>
                              {stage.name}
                            </span>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded self-start sm:self-auto ${
                              stage.status === 'completed' 
                                ? 'bg-emerald-500/10 text-emerald-400' 
                                : stage.status === 'ongoing' 
                                ? 'bg-red-500/10 text-[#FF4A4F] font-bold' 
                                : 'bg-neutral-800/50 text-neutral-500'
                            }`}>
                              {stage.status === 'completed' ? `Finished (${stage.date})` : stage.status === 'ongoing' ? 'Active / In Progress' : 'Pending Stage'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Engineering Specifications Panel */}
                  <div className="pt-6 border-t border-white/5">
                    <h4 className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase mb-4 font-bold flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-yellow-500" />
                      <span>Engineering Strength Parameters</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3 bg-white/5 border border-white/5 rounded">
                        <span className="block text-[10px] font-mono text-neutral-500 uppercase">Seismic Response</span>
                        <p className="text-xs text-white font-medium mt-1">{project.details.seismicFactor}</p>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/5 rounded">
                        <span className="block text-[10px] font-mono text-neutral-500 uppercase">Concrete Compaction</span>
                        <p className="text-xs text-white font-medium mt-1">{project.details.concreteStrength}</p>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/5 rounded">
                        <span className="block text-[10px] font-mono text-neutral-500 uppercase">Steel Grade Specification</span>
                        <p className="text-xs text-white font-medium mt-1">{project.details.steelGrade}</p>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/5 rounded">
                        <span className="block text-[10px] font-mono text-neutral-500 uppercase">RAJUK Approval Code</span>
                        <p className="text-xs text-white font-medium mt-1">{project.details.rajukApproval}</p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
