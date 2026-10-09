'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { portfolioSections } from '@/data/sections';
import { tracks } from '@/data/tracks';
import { SectionId } from '@/types/portfolio';
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import { Navbar } from '@/components/layout/Navbar';
import { SectionContent } from '@/components/portfolio/SectionContent';
import { ContentModal } from '@/components/portfolio/ContentModal';
import { PokerCardOverlay } from '@/components/portfolio/PokerCardOverlay';
import { TurntableScene } from '@/components/turntable/TurntableScene';
import { BlackjackModal } from '@/components/game/BlackjackModal';

export function PortfolioShell() {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
  const [isBlackjackOpen, setIsBlackjackOpen] = useState(false);

  // Custom audio player hook managing centralized HTMLAudioElement
  const {
    state: audioState,
    currentTrack,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    toggleMute,
    selectTrackForSection,
    clearError,
  } = useAudioPlayer(0);

  const activeSection = portfolioSections[activeSectionIndex];

  // Portfolio Section Navigation handlers (distinct from audio track navigation)
  const handleSelectSectionByIndex = useCallback(
    (newIndex: number) => {
      const clampedIndex = Math.max(0, Math.min(newIndex, portfolioSections.length - 1));
      if (clampedIndex === activeSectionIndex) return;

      setActiveSectionIndex(clampedIndex);
      const nextSec = portfolioSections[clampedIndex];

      // Synchronize soundtrack with the newly active section:
      // If audio is currently playing, smoothly transitions to the new section's track.
      // If audio is paused, loads track metadata and stays paused without autoplaying!
      selectTrackForSection(nextSec.id);
    },
    [activeSectionIndex, selectTrackForSection]
  );

  const handleNextSection = useCallback(() => {
    const nextIdx = (activeSectionIndex + 1) % portfolioSections.length;
    handleSelectSectionByIndex(nextIdx);
  }, [activeSectionIndex, handleSelectSectionByIndex]);

  const handlePrevSection = useCallback(() => {
    const prevIdx = (activeSectionIndex - 1 + portfolioSections.length) % portfolioSections.length;
    handleSelectSectionByIndex(prevIdx);
  }, [activeSectionIndex, handleSelectSectionByIndex]);

  const handleSelectSectionById = useCallback(
    (id: SectionId) => {
      const idx = portfolioSections.findIndex((s) => s.id === id);
      if (idx !== -1) {
        handleSelectSectionByIndex(idx);
      }
    },
    [handleSelectSectionByIndex]
  );

  // Global keyboard shortcuts for section navigation when modal is not open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is interacting with modal, poker card, blackjack game, input, or slider
      if (isModalOpen || isProfileCardOpen || isBlackjackOpen) return;
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea') return;

      if (e.key === 'ArrowRight' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
        handleNextSection();
      } else if (e.key === 'ArrowLeft' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
        handlePrevSection();
      } else if (e.key === ' ' && e.target === document.body) {
        // Spacebar to toggle play/pause if not focusing anything
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, isProfileCardOpen, isBlackjackOpen, handleNextSection, handlePrevSection, togglePlay]);

  return (
    <div className="min-h-screen bg-white text-[#1E1E1E] flex flex-col justify-between selection:bg-[#1E1E1E] selection:text-white">
      {/* 1. Top Minimal Navbar */}
      <Navbar
        activeSectionId={activeSection.id}
        onSelectSection={handleSelectSectionById}
        isPlayingAudio={audioState.isPlaying}
        onOpenProfileCard={() => setIsProfileCardOpen(true)}
        onOpenMiniGame={() => setIsBlackjackOpen(true)}
      />

      {/* 2. Main Persistent Viewport (Left Content / Right Turntable + Player) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Center-Left: Active Section Editorial Information */}
          <section
            aria-label="Active Portfolio Section Information"
            className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center order-2 lg:order-1"
          >
            <SectionContent
              section={activeSection}
              onOpenModal={() => setIsModalOpen(true)}
            />
          </section>

          {/* Center-Right: 3D Turntable Centerpiece (Full dedicated column) */}
          <section
            aria-label="Interactive 3D Turntable"
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-center justify-center order-1 lg:order-2 w-full"
          >
            {/* 3D Turntable Model Canvas taking full spacious right layout */}
            <div className="w-full flex items-center justify-center">
              <TurntableScene isPlaying={audioState.isPlaying} />
            </div>
          </section>
        </div>
      </main>

      {/* Desktop-only Floating Play Mini Game Button (Bottom-Right Corner) */}
      <aside
        aria-label="Play Mini Game"
        className="hidden md:block fixed bottom-6 right-6 z-30 pointer-events-auto"
      >
        <button
          onClick={() => setIsBlackjackOpen(true)}
          type="button"
          aria-label="Play Blackjack Mini Game"
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E7E7E7] text-[#1E1E1E] text-xs font-mono uppercase tracking-wider font-semibold hover:border-black/30 hover:shadow-card active:scale-95 transition-all shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08)] cursor-pointer group"
        >
          <span className="text-base group-hover:scale-110 transition-transform">♠</span>
          <span>PLAY MINI GAME</span>
        </button>
      </aside>

      {/* Modal Dialog for Expanded Portfolio Content */}
      <ContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        section={activeSection}
      />

      {/* Interactive 3D King Poker Card Overlay */}
      <PokerCardOverlay
        isOpen={isProfileCardOpen}
        onClose={() => setIsProfileCardOpen(false)}
      />

      {/* Blackjack Mini Game Modal */}
      <BlackjackModal
        isOpen={isBlackjackOpen}
        onClose={() => setIsBlackjackOpen(false)}
      />
    </div>
  );
}

