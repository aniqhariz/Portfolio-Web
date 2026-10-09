'use client';

import React, { useRef } from 'react';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  disabled?: boolean;
}

export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function ProgressBar({ currentTime, duration, onSeek, disabled = false }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const progressPercent = duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !duration || !barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(ratio * duration);
  };

  return (
    <div className="w-full flex items-center gap-2.5 text-[11px] font-mono text-muted select-none">
      <span className="w-9 text-right tabular-nums">{formatTime(currentTime)}</span>

      <div
        ref={barRef}
        onClick={handleClick}
        role="slider"
        aria-label="Audio progress bar"
        aria-valuemin={0}
        aria-valuemax={duration || 100}
        aria-valuenow={currentTime}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (disabled || !duration) return;
          if (e.key === 'ArrowRight') {
            onSeek(Math.min(duration, currentTime + 5));
          } else if (e.key === 'ArrowLeft') {
            onSeek(Math.max(0, currentTime - 5));
          }
        }}
        className={`relative flex-1 h-5 flex items-center cursor-pointer group ${
          disabled ? 'opacity-40 cursor-not-allowed' : ''
        }`}
      >
        {/* Track background */}
        <div className="w-full h-1 bg-[#E7E7E7] rounded-full overflow-hidden transition-all group-hover:h-1.5">
          {/* Active progress fill */}
          <div
            className="h-full bg-[#1E1E1E] rounded-full transition-all duration-75"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Scrubber thumb handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#1E1E1E] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none -ml-1.5"
          style={{ left: `${progressPercent}%` }}
        />
      </div>

      <span className="w-9 text-left tabular-nums">{formatTime(duration)}</span>
    </div>
  );
}

