'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { X, RotateCw } from 'lucide-react';

interface PokerCardOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PokerCardOverlay({ isOpen, onClose }: PokerCardOverlayProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Motion values for smooth 3D tilt & rotation
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for silky physics
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-200, 200], [25, -25]), springConfig);
  const rotateY = useSpring(useTransform(x, [-200, 200], [-35, 35]), springConfig);

  // Extra rotational angle for 360 spin & flipping
  const spinY = useMotionValue(0);
  const springSpinY = useSpring(spinY, { damping: 20, stiffness: 120 });

  // Combined rotation
  const combinedRotateY = useTransform(
    [rotateY, springSpinY],
    ([ry, sy]: number[]) => ry + sy
  );

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset rotations when opened
  useEffect(() => {
    if (isOpen) {
      x.set(0);
      y.set(0);
      spinY.set(0);
      setIsFlipped(false);
    }
  }, [isOpen, x, y, spinY]);

  // Pointer move tilt when hovering (desktop)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current || isDragging) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handlePointerLeave = () => {
    if (!isDragging) {
      x.set(0);
      y.set(0);
    }
  };

  // Flip card 180 degrees
  const toggleFlip = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextFlipped = !isFlipped;
    setIsFlipped(nextFlipped);
    spinY.set(nextFlipped ? 180 : 0);
  };

  // Drag interaction to spin freely
  const dragStartX = useRef(0);
  const currentSpin = useRef(0);

  const handleDragStart = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    currentSpin.current = spinY.get();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    spinY.set(currentSpin.current + deltaX * 0.9);
  };

  const handleDragEnd = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    // Snap to closest 180 degree face
    const current = spinY.get();
    const normalized = Math.round(current / 180) * 180;
    spinY.set(normalized);
    setIsFlipped((Math.round(normalized / 180) % 2) !== 0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
          {/* Backdrop with subtle blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-[#0C0C0D]/70 backdrop-blur-md cursor-pointer"
          />

          {/* Floating Mobile Circular Close Button */}
          <button
            onClick={onClose}
            type="button"
            aria-label="Close card"
            className="sm:hidden absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 active:scale-90 text-white backdrop-blur-xl border border-white/25 flex items-center justify-center shadow-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Card & Controls Wrapper */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-5">
            {/* 3D Perspective Card Container */}
            <div
              className="relative cursor-grab active:cursor-grabbing touch-none"
              style={{ perspective: 1200 }}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onPointerDown={handleDragStart}
              onPointerMoveCapture={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
            >
              <motion.div
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.75, y: 30, rotateZ: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateZ: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20, rotateZ: 4 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  rotateX,
                  rotateY: combinedRotateY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative w-[280px] sm:w-[320px] md:w-[340px] aspect-[1/1.52] rounded-[24px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_40px_rgba(255,255,255,0.06)]"
              >
                {/* ========================================================
                    FRONT FACE: FULL PHOTO WITH OVERLAID K ♠
                   ======================================================== */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                  className="absolute inset-0 w-full h-full rounded-[24px] bg-[#1E1E1E] border-[3px] border-[#E8E6DF] overflow-hidden shadow-inner"
                >
                  {/* Full Card Photo */}
                  <img
                    src="/avatar.jpg"
                    alt="Profile photo"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />

                  {/* Subtle Corner Vignette for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/35 pointer-events-none" />

                  {/* Subtle Inner Playing Card Border Line */}
                  <div className="absolute inset-2 sm:inset-2.5 rounded-[18px] border border-white/25 pointer-events-none z-10" />

                  {/* Corner Accent: Top-Left "K ♠" Overlaid on Photo */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 flex flex-col items-center leading-none text-white select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">K</span>
                    <span className="text-base sm:text-lg -mt-0.5">♠</span>
                  </div>

                  {/* Corner Accent: Bottom-Right "K ♠" (Rotated 180deg) Overlaid on Photo */}
                  <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 z-20 flex flex-col items-center leading-none text-white rotate-180 select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                    <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">K</span>
                    <span className="text-base sm:text-lg -mt-0.5">♠</span>
                  </div>
                </div>

                {/* ========================================================
                    BACK FACE: ORNATE GEOMETRIC PLAYING CARD BACK
                   ======================================================== */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                  className="absolute inset-0 w-full h-full rounded-[24px] bg-[#FAF9F5] border-[3px] border-[#E8E6DF] p-3 sm:p-3.5 flex flex-col items-center justify-center overflow-hidden shadow-inner"
                >
                  {/* Outer Beveled Frame */}
                  <div className="relative w-full h-full rounded-[18px] bg-gradient-to-br from-[#E11D48] via-[#BE123C] to-[#9F1239] p-3 border-2 border-white/90 shadow-md flex items-center justify-center overflow-hidden">
                    {/* Background Faceted Diamond Grid */}
                    <div className="absolute inset-0 opacity-25">
                      <svg width="100%" height="100%">
                        <defs>
                          <pattern id="cardPattern" width="30" height="30" patternUnits="userSpaceOnUse">
                            <path d="M15 0 L30 15 L15 30 L0 15 Z" fill="none" stroke="#FFFFFF" strokeWidth="0.8" />
                            <circle cx="15" cy="15" r="2" fill="#FDE047" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#cardPattern)" />
                      </svg>
                    </div>

                    {/* Central Geometric Mandala Emblem (Inspired by reference card back) */}
                    <div className="relative z-10 w-44 h-64 flex items-center justify-center">
                      <svg viewBox="0 0 200 300" className="w-full h-full filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
                        {/* Outer Diamond */}
                        <polygon
                          points="100,20 180,150 100,280 20,150"
                          fill="none"
                          stroke="#FDE047"
                          strokeWidth="3"
                        />
                        {/* Middle Rhombus Lines */}
                        <polygon
                          points="100,45 160,150 100,255 40,150"
                          fill="rgba(159, 18, 57, 0.4)"
                          stroke="#FB923C"
                          strokeWidth="3.5"
                        />
                        {/* Interlocking Diamond Knot */}
                        <polygon
                          points="100,70 145,150 100,230 55,150"
                          fill="none"
                          stroke="#FBBF24"
                          strokeWidth="4"
                        />
                        {/* Center Glowing Core */}
                        <polygon
                          points="100,100 130,150 100,200 70,150"
                          fill="#F59E0B"
                          stroke="#FEF08A"
                          strokeWidth="2.5"
                        />
                        <circle cx="100" cy="150" r="10" fill="#FEF08A" />
                        <circle cx="100" cy="150" r="5" fill="#BE123C" />

                        {/* Top & Bottom Golden Nodes */}
                        <circle cx="100" cy="35" r="4.5" fill="#FEF08A" />
                        <circle cx="100" cy="265" r="4.5" fill="#FEF08A" />
                        <line x1="100" y1="20" x2="100" y2="70" stroke="#FEF08A" strokeWidth="2.5" />
                        <line x1="100" y1="230" x2="100" y2="280" stroke="#FEF08A" strokeWidth="2.5" />

                        {/* Side Satellites */}
                        <circle cx="45" cy="115" r="6" fill="#F43F5E" stroke="#FEF08A" strokeWidth="2" />
                        <circle cx="155" cy="185" r="6" fill="#F43F5E" stroke="#FEF08A" strokeWidth="2" />
                      </svg>
                    </div>

                    {/* Corner Accent Bevels */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#FEF08A]" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#FEF08A]" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#FEF08A]" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#FEF08A]" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Desktop Helper Text & Flip Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 select-none">
              {/* Quick Flip Button */}
              <button
                onClick={toggleFlip}
                type="button"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white/90 text-xs font-mono tracking-wider backdrop-blur-md border border-white/15 transition-all shadow-md cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>FLIP CARD</span>
              </button>

              {/* Esc to close notice (Desktop only) */}
              <span className="hidden sm:inline-block text-[11px] font-mono text-white/60 tracking-widest uppercase">
                PRESS [ESC] OR CLICK OUTSIDE TO CLOSE
              </span>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

