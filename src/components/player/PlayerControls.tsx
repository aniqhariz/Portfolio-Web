'use client';

import React from 'react';
import { Pause, Loader2 } from 'lucide-react';

interface PlayerControlsProps {
  isPlaying: boolean;
  isLoading: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  disabled?: boolean;
}

export function PlayerControls({
  isPlaying,
  isLoading,
  onTogglePlay,
  onNext,
  onPrev,
  disabled = false,
}: PlayerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-6 sm:gap-7">
      {/* Previous Section / Track Button */}
      <button
        onClick={onPrev}
        disabled={disabled}
        type="button"
        aria-label="Previous track and section"
        className="w-8 h-8 rounded-full flex items-center justify-center text-[#1E1E1E] hover:opacity-70 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <polygon points="18,5 7,12 18,19" />
        </svg>
      </button>

      {/* Play / Pause Toggle Circle */}
      <button
        onClick={onTogglePlay}
        disabled={disabled}
        type="button"
        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        className="w-12 h-12 rounded-full bg-[#1E1E1E] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-white" />
        ) : isPlaying ? (
          <Pause className="w-5 h-5 fill-current stroke-none" />
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 ml-0.5"
            aria-hidden="true"
          >
            <polygon points="7,5 19,12 7,19" />
          </svg>
        )}
      </button>

      {/* Next Section / Track Button */}
      <button
        onClick={onNext}
        disabled={disabled}
        type="button"
        aria-label="Next track and section"
        className="w-8 h-8 rounded-full flex items-center justify-center text-[#1E1E1E] hover:opacity-70 active:scale-95 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <polygon points="6,5 17,12 6,19" />
        </svg>
      </button>
    </div>
  );
}
