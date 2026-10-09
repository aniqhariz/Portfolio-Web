'use client';

import React from 'react';
import { Volume2, Volume1, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
}

export function VolumeControl({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}: VolumeControlProps) {
  const effectiveVolume = isMuted ? 0 : volume;

  const VolumeIcon = effectiveVolume === 0 ? VolumeX : effectiveVolume < 0.5 ? Volume1 : Volume2;
  const percentage = Math.round(effectiveVolume * 100);

  return (
    <div className="w-full flex items-center gap-3 select-none">
      {/* Mute / Unmute Toggle Button */}
      <button
        onClick={onToggleMute}
        type="button"
        title={isMuted ? 'Unmute' : 'Mute'}
        aria-label={isMuted ? 'Unmute volume' : 'Mute volume'}
        className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:text-[#1E1E1E] hover:bg-black/5 active:scale-95 transition-all shrink-0"
      >
        <VolumeIcon className="w-4 h-4" />
      </button>

      {/* Full-width Volume Slider */}
      <div className="relative flex-1 flex items-center group">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={effectiveVolume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          aria-label="Volume level"
          className="w-full h-1 bg-[#E7E7E7] rounded-full appearance-none cursor-pointer"
        />
      </div>

      {/* Percentage / Mute State Text */}
      <span className="text-[11px] font-mono text-muted w-10 text-right tabular-nums">
        {isMuted ? 'MUTED' : `${percentage}%`}
      </span>
    </div>
  );
}
