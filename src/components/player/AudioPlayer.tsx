'use client';

import React from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

export function AudioPlayer({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}: AudioPlayerProps) {
  const effectiveVolume = isMuted ? 0 : volume;
  const VolumeIcon = effectiveVolume === 0 ? VolumeX : effectiveVolume < 0.5 ? Volume1 : Volume2;
  const displayValue = Math.round(effectiveVolume * 100);

  return (
    <div className="flex items-center">
      {/* 
        Minimalist Capsule Volume Slider:
        Positioned in the bottom-right corner on desktop, styled to match our white/glassmorphism design system.
      */}
      <div className="w-[220px] sm:w-[250px] bg-white/95 backdrop-blur-md border border-[#E7E7E7] shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] rounded-full px-3.5 py-2 sm:py-2.5 flex items-center gap-3 transition-all hover:border-black/30 hover:shadow-card">
        {/* Speaker / Mute Toggle Button */}
        <button
          onClick={onToggleMute}
          type="button"
          aria-label={isMuted ? 'Unmute volume' : 'Mute volume'}
          title={isMuted ? 'Unmute' : 'Mute'}
          className="text-muted hover:text-[#1E1E1E] transition-colors p-1 rounded-full hover:bg-black/5 active:scale-90 shrink-0"
        >
          <VolumeIcon className="w-4 h-4" />
        </button>

        {/* Volume Level Track */}
        <div className="relative flex-1 flex items-center">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={effectiveVolume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            aria-label="Volume level"
            className="w-full h-1.5 bg-[#E7E7E7] rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #1E1E1E ${displayValue}%, #E7E7E7 ${displayValue}%)`,
            }}
          />
        </div>

        {/* Volume Value Number */}
        <span className="text-xs font-mono font-medium text-[#1E1E1E] w-6 text-right tabular-nums select-none shrink-0">
          {displayValue}
        </span>
      </div>
    </div>
  );
}
