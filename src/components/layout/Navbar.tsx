'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SectionId } from '@/types/portfolio';
import { portfolioSections } from '@/data/sections';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSectionId: SectionId;
  onSelectSection: (id: SectionId) => void;
  isPlayingAudio: boolean;
  onOpenProfileCard?: () => void;
  onOpenMiniGame?: () => void;
}

// Clean mapping of titles without numbers
const navItems: { id: SectionId; label: string }[] = [
  { id: 'about', label: 'About me' },
  { id: 'skills', label: 'Skills' },
  { id: 'works', label: 'Selected Works' },
  { id: 'experiments', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({
  activeSectionId,
  onSelectSection,
  onOpenProfileCard,
  onOpenMiniGame,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id: SectionId) => {
    onSelectSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-3 sm:top-5 z-40 w-full px-3 sm:px-6 pointer-events-none">
        <div className="max-w-5xl mx-auto pointer-events-auto">
          {/* Floating Capsule Pill Navbar */}
          <nav
            aria-label="Main Navigation"
            className="bg-white/90 backdrop-blur-md border border-[#E7E7E7] shadow-[0_4px_28px_-4px_rgba(0,0,0,0.07)] rounded-full px-4 sm:px-7 py-2.5 sm:py-3.5 flex items-center justify-between transition-all"
          >
            {/* Left: Avatar + "Hi There!" (Clickable trigger for King Poker Card) */}
            <button
              onClick={onOpenProfileCard}
              type="button"
              aria-label="View King Poker Card"
              className="flex items-center gap-3 sm:gap-3.5 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#584CE5] rounded-full pr-2 transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#E7E7E7] group-hover:border-black/40 flex items-center justify-center overflow-hidden shrink-0 shadow-xs bg-[#F4F4F5] transition-colors">
                <img
                  src="/avatar.jpg"
                  alt="Profile photo"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              <span className="text-sm sm:text-base font-semibold text-[#1E1E1E] group-hover:text-black select-none tracking-tight transition-colors">
                Hi There!
              </span>
            </button>

            {/* Right: Section Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navItems.map((item) => {
                const isActive = item.id === activeSectionId;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    type="button"
                    className={`text-xs sm:text-sm tracking-normal transition-colors py-1.5 ${
                      isActive
                        ? 'text-[#584CE5] font-semibold'
                        : 'text-[#707070] hover:text-[#1E1E1E] font-medium'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(true)}
                type="button"
                aria-label="Open navigation menu"
                className="p-2 rounded-full text-[#1E1E1E] hover:bg-black/5 active:scale-90 transition-all"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Creative Fullscreen Mobile Editorial Tracklist Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 md:hidden bg-white/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
          >
            {/* Top Bar inside Mobile Overlay */}
            <div className="flex items-center justify-between border-b border-[#E7E7E7] pb-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProfileCard?.();
                }}
                type="button"
                className="flex items-center gap-3 text-left group"
              >
                <div className="w-10 h-10 rounded-full border border-[#E7E7E7] overflow-hidden bg-[#F4F4F5] shadow-xs">
                  <img
                    src="/avatar.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <span className="text-sm font-bold text-[#1E1E1E] block">Hi There!</span>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-wider">
                    View Card
                  </span>
                </div>
              </button>

              <button
                onClick={() => setMobileMenuOpen(false)}
                type="button"
                aria-label="Close navigation menu"
                className="w-10 h-10 rounded-full border border-[#E7E7E7] bg-surface-subtle flex items-center justify-center text-[#1E1E1E] hover:bg-black/5 active:scale-90 transition-all shadow-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Middle: Editorial Vinyl Tracklist Menu */}
            <div className="my-auto py-8 space-y-1">
              {navItems.map((item, index) => {
                const isActive = item.id === activeSectionId;
                const trackNum = `0${index + 1}`;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    onClick={() => handleNavClick(item.id)}
                    type="button"
                    className="w-full flex items-center justify-between py-4 border-b border-[#E7E7E7]/60 text-left group transition-all"
                  >
                    <div className="flex items-baseline gap-4">
                      <span
                        className={`font-mono text-xs transition-colors ${
                          isActive
                            ? 'text-[#584CE5] font-bold'
                            : 'text-muted/60 group-hover:text-[#1E1E1E]'
                        }`}
                      >
                        {trackNum}
                      </span>
                      <span
                        className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors ${
                          isActive
                            ? 'text-[#584CE5]'
                            : 'text-[#1E1E1E] group-hover:text-[#584CE5]'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>

                    {isActive ? (
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#584CE5]/10 text-[#584CE5] font-semibold flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#584CE5] animate-pulse" />
                        ACTIVE
                      </span>
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-muted/30 group-hover:text-[#1E1E1E] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Bottom: Mobile Menu Footer with Mini Game Button (Right-aligned) */}
            <div className="pt-4 border-t border-[#E7E7E7] flex items-center justify-end">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMiniGame?.();
                }}
                type="button"
                aria-label="Play Blackjack Mini Game"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1E1E1E] text-white text-xs font-mono uppercase tracking-wider font-semibold active:scale-95 transition-all shadow-sm cursor-pointer hover:bg-black"
              >
                <span>♠</span>
                <span>PLAY MINI GAME</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
