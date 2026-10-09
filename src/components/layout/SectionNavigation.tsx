'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionData } from '@/types/portfolio';

interface SectionNavigationProps {
  sections: SectionData[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

export function SectionNavigation({
  sections,
  currentIndex,
  onPrev,
  onNext,
  onSelectIndex,
}: SectionNavigationProps) {
  const currentSection = sections[currentIndex];
  const total = sections.length;

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  return (
    <div className="w-full py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E7E7E7]/80">
      {/* Left: Section progress indicators */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono font-medium text-[#1E1E1E]">
          {currentSection.number}
        </span>
        <span className="text-xs font-mono text-muted">/</span>
        <span className="text-xs font-mono text-muted">
          {String(total).padStart(2, '0')}
        </span>

        {/* 5-step track dots */}
        <div className="flex items-center gap-1.5 ml-3">
          {sections.map((sec, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectIndex(idx)}
                type="button"
                aria-label={`Jump to section ${sec.number}: ${sec.label}`}
                className={`h-1.5 rounded-full transition-all ${
                  isActive
                    ? 'w-6 bg-[#1E1E1E]'
                    : 'w-2 bg-[#E7E7E7] hover:bg-black/30'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Center: Active section title context */}
      <div className="hidden md:flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted">
        <span>ACTIVE SIDE:</span>
        <span className="text-[#1E1E1E] font-medium">{currentSection.label}</span>
      </div>

      {/* Right: Previous / Next Section controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={isFirst}
          type="button"
          aria-label="Previous portfolio section"
          className="px-3 py-1.5 rounded-md border border-[#E7E7E7] text-xs font-mono uppercase tracking-wider text-[#1E1E1E] hover:bg-black/[0.03] active:bg-black/[0.06] transition-colors flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>PREV</span>
        </button>

        <button
          onClick={onNext}
          disabled={isLast}
          type="button"
          aria-label="Next portfolio section"
          className="px-3 py-1.5 rounded-md border border-[#E7E7E7] text-xs font-mono uppercase tracking-wider text-[#1E1E1E] hover:bg-black/[0.03] active:bg-black/[0.06] transition-colors flex items-center gap-1 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <span>NEXT</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

