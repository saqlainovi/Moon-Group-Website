/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  RefreshCw,
  X,
  Move,
  Download,
  ChevronLeft,
  ChevronRight,
  Layers,
  ExternalLink,
  Maximize2
} from 'lucide-react';
import { FloorLayout } from '../types';

interface FloorPlanZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title?: string;
  floorLayouts?: FloorLayout[];
  activeFloorIndex?: number;
  onSelectFloor?: (index: number) => void;
}

export default function FloorPlanZoomModal({
  isOpen,
  onClose,
  imageUrl,
  title = 'Floor Layout Blueprint',
  floorLayouts,
  activeFloorIndex = 0,
  onSelectFloor
}: FloorPlanZoomModalProps) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // Reset zoom & pan when image changes or modal opens
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotation(0);
  }, [imageUrl, isOpen]);

  // Handle keyboard shortcuts (Escape to close, + / - to zoom)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === '=' || e.key === '+') handleZoomIn();
      if (e.key === '-') handleZoomOut();
      if (e.key === '0') handleReset();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, zoom]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.3, 5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.3, 0.5);
      if (next <= 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setRotation(0);
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Wheel zoom handler
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(prev + 0.2, 5));
    } else {
      setZoom((prev) => {
        const next = Math.max(prev - 0.2, 0.5);
        if (next <= 1) setPan({ x: 0, y: 0 });
        return next;
      });
    }
  };

  // Mouse Dragging handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1 && rotation === 0) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch Dragging handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && zoom > 1) {
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPan({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 z-[100] flex flex-col justify-between overflow-hidden backdrop-blur-md select-none"
      >
        {/* Top Header Controls Bar */}
        <div className="bg-[#121316]/90 border-b border-white/10 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4 z-20 shadow-xl">
          {/* Title & Floor Selector */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#FF4A4F]/10 border border-[#FF4A4F]/30 flex items-center justify-center text-[#FF4A4F]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg text-white font-semibold leading-tight">
                {title}
              </h3>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                Interactive High-Resolution Blueprint Inspection
              </p>
            </div>
          </div>

          {/* Center: Zoom Presets & Control Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2 bg-black/60 p-1.5 rounded-lg border border-white/10">
            {/* Zoom Out */}
            <button
              onClick={handleZoomOut}
              title="Zoom Out (-)"
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-all cursor-pointer disabled:opacity-40"
              disabled={zoom <= 0.5}
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            {/* Zoom Percentage Display */}
            <span className="font-mono text-xs font-bold text-[#FF4A4F] px-2 min-w-[50px] text-center">
              {Math.round(zoom * 100)}%
            </span>

            {/* Zoom In */}
            <button
              onClick={handleZoomIn}
              title="Zoom In (+)"
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-all cursor-pointer disabled:opacity-40"
              disabled={zoom >= 5}
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <div className="h-4 w-[1px] bg-white/10 mx-1" />

            {/* Quick Presets */}
            <button
              onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
              className={`px-2 py-1 font-mono text-[10px] font-bold rounded transition-all cursor-pointer ${
                zoom === 1 ? 'bg-[#FF4A4F] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              100%
            </button>
            <button
              onClick={() => { setZoom(2); setPan({ x: 0, y: 0 }); }}
              className={`px-2 py-1 font-mono text-[10px] font-bold rounded transition-all cursor-pointer ${
                zoom === 2 ? 'bg-[#FF4A4F] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              200%
            </button>
            <button
              onClick={() => { setZoom(3); setPan({ x: 0, y: 0 }); }}
              className={`px-2 py-1 font-mono text-[10px] font-bold rounded transition-all cursor-pointer ${
                zoom === 3 ? 'bg-[#FF4A4F] text-white' : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              300%
            </button>

            <div className="h-4 w-[1px] bg-white/10 mx-1" />

            {/* Rotate */}
            <button
              onClick={handleRotate}
              title="Rotate 90°"
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-all cursor-pointer"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              title="Reset View"
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Actions & Close */}
          <div className="flex items-center gap-2">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="floor_plan_layout.jpg"
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold rounded flex items-center gap-1.5 transition-all cursor-pointer border border-white/10"
              title="Open full resolution image in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Full Image</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 bg-[#FF4A4F] hover:bg-[#D63539] text-white rounded-full transition-all cursor-pointer shadow-lg ml-2"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Canvas Floor Plan Viewport */}
        <div
          ref={containerRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onDoubleClick={handleReset}
          className={`relative flex-1 w-full h-full overflow-hidden flex items-center justify-center bg-[#07080a] ${
            isDragging ? 'cursor-grabbing' : zoom > 1 ? 'cursor-grab' : 'cursor-zoom-in'
          }`}
        >
          {/* Subtle Grid Draft Pattern */}
          <div className="absolute inset-0 bg-[size:40px_40px] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] pointer-events-none" />

          {/* Transforming Image Container */}
          <div
            className="transition-transform duration-75 ease-out flex items-center justify-center p-4"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: 'center center'
            }}
          >
            <img
              src={imageUrl}
              alt={title}
              draggable={false}
              referrerPolicy="no-referrer"
              className="max-w-[90vw] max-h-[75vh] object-contain rounded shadow-2xl border border-white/10 pointer-events-auto select-none"
            />
          </div>

          {/* Floating Instructions / Hint Overlay */}
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 bg-black/75 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full text-slate-300 text-[11px] font-mono flex items-center gap-2 pointer-events-none z-10 shadow-xl">
            <Move className="w-3.5 h-3.5 text-[#FF4A4F]" />
            <span>Mouse Wheel: Zoom | Drag: Pan around | Double Click: Reset</span>
          </div>
        </div>

        {/* Bottom Floor Switcher Bar (If floorLayouts is provided) */}
        {floorLayouts && floorLayouts.length > 0 && onSelectFloor && (
          <div className="bg-[#121316]/95 border-t border-white/10 px-4 py-3 z-20 flex items-center justify-center gap-2 overflow-x-auto">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mr-2 shrink-0 hidden sm:inline">
              Select Floor Layout:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
              {floorLayouts.map((layout, idx) => {
                const isActive = activeFloorIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectFloor(idx);
                      handleReset();
                    }}
                    className={`px-3 py-1.5 rounded font-mono text-xs font-bold transition-all cursor-pointer shrink-0 border flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#FF4A4F] text-white border-[#FF4A4F] shadow-lg shadow-[#FF4A4F]/20'
                        : 'bg-black/40 text-slate-300 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <span>{layout.levelName}</span>
                    <span className="opacity-70 text-[10px]">({layout.sizeSqft} SFT)</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
