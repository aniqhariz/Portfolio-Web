'use client';

import React from 'react';
import { Disc3 } from 'lucide-react';

interface TurntableFallbackProps {
  isPlaying?: boolean;
  message?: string;
}

export function TurntableFallback({ isPlaying = false, message }: TurntableFallbackProps) {
  return (
    <div className="w-full h-full min-h-[340px] flex flex-col items-center justify-center p-8 bg-surface-subtle/50 rounded-2xl border border-border/60 relative overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-radial-at-c from-black/[0.02] to-transparent pointer-events-none" />

      {/* Styled turntable vinyl graphic */}
      <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-[#1e1e1e] shadow-2xl flex items-center justify-center border-4 border-[#2a2a2a]">
        {/* Subtle record grooves */}
        <div className="absolute inset-2 rounded-full border border-white/10" />
        <div className="absolute inset-6 rounded-full border border-white/5" />
        <div className="absolute inset-10 rounded-full border border-white/10" />
        <div className="absolute inset-14 rounded-full border border-white/5" />

        {/* Center label */}
        <div
          className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#f4f4f4] border-2 border-[#d0d0d0] flex flex-col items-center justify-center text-center p-2 transition-transform duration-700 ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
        >
          <div className="w-3 h-3 rounded-full bg-[#1e1e1e] mb-1" />
          <span className="text-[8px] font-mono tracking-widest text-[#1e1e1e] uppercase font-semibold">
            33 RPM
          </span>
          <span className="text-[7px] font-mono text-[#707070] uppercase">
            STEREO
          </span>
        </div>

        {/* Tonearm silhouette */}
        <div className="absolute top-2 right-4 w-1.5 h-28 bg-[#d0d0d0] origin-top rotate-[22deg] rounded-full shadow-md">
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#1e1e1e]" />
          <div className="absolute -bottom-2 -left-1 w-3 h-5 bg-[#c05020] rounded-sm" />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center text-center z-10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted mb-1">
          <Disc3 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
          <span>{isPlaying ? 'VINYL IN MOTION' : 'NEEDLE AT REST'}</span>
        </div>
        {message && <p className="text-xs text-muted/80 max-w-xs">{message}</p>}
      </div>
    </div>
  );
}

