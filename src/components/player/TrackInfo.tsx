'use client';

import React from 'react';
import { Track } from '@/types/audio';

interface TrackInfoProps {
  track: Track;
  trackNumber: number;
  totalTracks: number;
  isPlaying: boolean;
}

export function TrackInfo({ track, trackNumber, totalTracks, isPlaying }: TrackInfoProps) {
  return (
    <div className="flex items-center gap-3.5 min-w-0">
      {/* Vinyl record icon with concentric grooves */}
      <div
        className={`relative w-10 h-10 rounded-full bg-[#1E1E1E] flex items-center justify-center shrink-0 border border-black/10 shadow-xs ${
          isPlaying ? 'animate-spin-slow' : ''
        }`}
      >
        <div className="absolute inset-1.5 rounded-full border border-white/20 pointer-events-none" />
        <div className="absolute inset-2.5 rounded-full border border-white/10 pointer-events-none" />
        <div className="w-2.5 h-2.5 rounded-full bg-white flex items-center justify-center">
          <div className="w-0.5 h-0.5 rounded-full bg-[#1E1E1E]" />
        </div>
      </div>

      <div className="min-w-0 flex flex-col justify-center">
        {/* Track count & genre */}
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
            TRACK {String(trackNumber).padStart(2, '0')} / {String(totalTracks).padStart(2, '0')}
          </span>
          {track.genre && (
            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-black/[0.04] text-muted font-medium">
              {track.genre}
            </span>
          )}
        </div>

        {/* Title and artist */}
        <div className="flex items-baseline gap-2 truncate">
          <span className="text-sm font-bold text-[#1E1E1E] tracking-tight truncate">
            {track.title}
          </span>
          <span className="text-xs text-muted truncate">
            {track.artist}
          </span>
        </div>
      </div>
    </div>
  );
}
