'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionData } from '@/types/portfolio';
import { ArrowUpRight } from 'lucide-react';

interface SectionContentProps {
  section: SectionData;
  onOpenModal: () => void;
  volumeControl?: React.ReactNode;
}

export function SectionContent({ section, onOpenModal, volumeControl }: SectionContentProps) {
  return (
    <div className="w-full flex flex-col justify-center py-4 lg:py-8 pr-0 lg:pr-8 min-h-[360px] lg:min-h-[460px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Section Label */}
          <div>
            <span className="font-mono text-xs tracking-widest font-semibold text-[#1E1E1E] uppercase">
              {section.label}
            </span>
          </div>

          {/* Subheadline & Main Editorial Headline */}
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              {section.subheadline}
            </p>
            <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold tracking-tight text-[#1E1E1E] leading-[1.12]">
              {section.headline}
            </h1>
          </div>

          {/* Concise Body Description */}
          <p className="text-base sm:text-lg text-muted leading-relaxed max-w-xl">
            {section.description}
          </p>

          {/* Contextual Action Button to open Modal */}
          <div className="pt-2">
            <button
              onClick={onOpenModal}
              type="button"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1E1E1E] text-white text-xs font-mono uppercase tracking-wider font-medium hover:bg-black/80 active:scale-[0.98] transition-all shadow-card"
            >
              <span>{section.modalActionLabel}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

