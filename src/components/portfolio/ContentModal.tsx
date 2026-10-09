'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Copy, Check, Disc3, Code2 } from 'lucide-react';
import { SectionId, SectionData } from '@/types/portfolio';
import {
  aboutDetails,
  skillsData,
  proficientTools,
  projectsData,
  experienceData,
  educationData,
  competitionsData,
  achievementsData,
  contactData,
} from '@/data/sections';
import { ToolLogo } from './ToolLogo';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  section: SectionData;
}

export function ContentModal({ isOpen, onClose, section }: ContentModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Manage focus & lock body scroll
  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Focus close button or modal container
      setTimeout(() => {
        const closeBtn = modalRef.current?.querySelector<HTMLButtonElement>('button[data-close]');
        closeBtn?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const renderSectionContent = () => {
    switch (section.id) {
      case 'about':
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted">
                ABOUT & BACKGROUND
              </h3>
              <div className="space-y-4 text-base text-[#1E1E1E] leading-relaxed">
                {aboutDetails.narrative.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#E7E7E7]">
              <h3 className="text-xs font-mono uppercase tracking-widest text-muted">
                PRINCIPLES I LIVE BY
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aboutDetails.principles.map((pr, i) => (
                  <div key={i} className="p-4 rounded-xl bg-surface-subtle border border-[#E7E7E7]/80">
                    <h4 className="text-sm font-semibold text-[#1E1E1E] mb-1">{pr.title}</h4>
                    <p className="text-xs text-muted leading-relaxed">{pr.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-8">
            {/* Core Skills & Strengths Based on the Tools */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted block">
                CORE STRENGTHS & CAPABILITIES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-surface-subtle border border-[#E7E7E7] space-y-1.5 hover:border-black/20 transition-colors">
                  <h4 className="text-sm font-bold text-[#1E1E1E]">Frontend Development</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Building clean, accessible, and responsive user interfaces with React, Next.js, TypeScript, and modern CSS.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface-subtle border border-[#E7E7E7] space-y-1.5 hover:border-black/20 transition-colors">
                  <h4 className="text-sm font-bold text-[#1E1E1E]">Backend & Application Logic</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Developing robust backend logic, algorithms, and application services using Go (Golang), Python, and Java.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface-subtle border border-[#E7E7E7] space-y-1.5 hover:border-black/20 transition-colors">
                  <h4 className="text-sm font-bold text-[#1E1E1E]">UI/UX & Product Design</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Designing intuitive user journeys, wireframes, and component libraries with a strong eye for visual detail in Figma.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-surface-subtle border border-[#E7E7E7] space-y-1.5 hover:border-black/20 transition-colors">
                  <h4 className="text-sm font-bold text-[#1E1E1E]">Version Control & Workflows</h4>
                  <p className="text-xs text-muted leading-relaxed">
                    Managing codebases, structured commit workflows, and collaborative repository environments via Git and GitHub.
                  </p>
                </div>
              </div>
            </div>

            {/* Tools & Technologies Grid */}
            <div className="space-y-3 pt-4 border-t border-[#E7E7E7]">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted block">
                TECH STACK
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {proficientTools.map((tool) => (
                  <div
                    key={tool.id}
                    className="p-3.5 sm:p-4 rounded-2xl bg-surface-subtle border border-[#E7E7E7] flex flex-col items-center justify-center gap-2.5 text-center hover:border-black/20 hover:shadow-xs transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E7E7E7]/80 flex items-center justify-center p-2 shadow-xs group-hover:scale-110 transition-transform">
                      <ToolLogo id={tool.id} className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-[#1E1E1E] tracking-tight">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'works':
        return (
          <div className="space-y-6">
            {projectsData.map((project) => {
              const CardWrapper = project.link ? 'a' : 'div';
              const cardProps = project.link
                ? {
                    href: project.link,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className:
                      'group block p-5 sm:p-6 rounded-2xl bg-surface-subtle border border-[#E7E7E7] space-y-4 hover:border-black/40 hover:shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-all duration-200 cursor-pointer',
                  }
                : {
                    className:
                      'p-5 sm:p-6 rounded-2xl bg-surface-subtle border border-[#E7E7E7] space-y-4',
                  };

              return (
                <CardWrapper key={project.id} {...cardProps}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E7E7E7] pb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted block mb-0.5">
                        {project.category} · {project.year}
                      </span>
                      <h3 className="text-lg font-bold text-[#1E1E1E] group-hover:underline decoration-1 underline-offset-4">
                        {project.title}
                      </h3>
                    </div>

                    {project.link && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E7E7E7] text-xs font-mono text-muted group-hover:text-[#1E1E1E] group-hover:border-black/30 transition-colors self-start sm:self-auto shrink-0 shadow-2xs">
                        <span>VISIT PROJECT</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted leading-relaxed">{project.description}</p>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted block">
                      KEY HIGHLIGHTS
                    </span>
                    <ul className="space-y-1">
                      {project.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="text-xs text-[#1E1E1E] flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1E1E1E] mt-1 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-white border border-[#E7E7E7] text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </CardWrapper>
              );
            })}
          </div>
        );

      case 'experiments':
        return (
          <div className="space-y-8">
            {/* 1. EDUCATION */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E7E7E7] pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#1E1E1E] text-white">
                    01
                  </span>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E1E1E] font-semibold">
                    EDUCATION
                  </h3>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
                  ACADEMIC BACKGROUND
                </span>
              </div>

              <div className="space-y-3">
                {educationData.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded-2xl bg-surface-subtle border border-[#E7E7E7] space-y-3 hover:border-black/30 transition-all duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#E7E7E7] pb-2.5">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-muted block mb-0.5">
                          INSTITUTION
                        </span>
                        <h4 className="text-base font-bold text-[#1E1E1E]">{edu.institution}</h4>
                      </div>
                      <span className="text-[11px] font-mono text-muted px-2 py-0.5 rounded bg-white border border-[#E7E7E7] self-start sm:self-auto shrink-0">
                        {edu.period}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-[#1E1E1E] block">
                        {edu.degree}
                      </span>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed mt-1.5">
                        {edu.description}
                      </p>
                    </div>

                    {edu.focus && edu.focus.length > 0 && (
                      <div className="pt-2 border-t border-[#E7E7E7]/60 flex flex-wrap gap-1.5">
                        {edu.focus.map((f, fIdx) => (
                          <span
                            key={fIdx}
                            className="px-2 py-0.5 rounded text-[11px] font-mono bg-white border border-[#E7E7E7] text-muted"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* 2. COMPETITIONS */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E7E7E7] pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#1E1E1E] text-white">
                    02
                  </span>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E1E1E] font-semibold">
                    COMPETITIONS
                  </h3>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
                  HACKATHONS & CHALLENGES
                </span>
              </div>

              {competitionsData.length > 0 ? (
                <div className="space-y-3">
                  {competitionsData.map((comp) => (
                    <div
                      key={comp.id}
                      className="p-5 rounded-2xl bg-surface-subtle border border-[#E7E7E7] space-y-3 hover:border-black/30 transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#E7E7E7] pb-2.5">
                        <div>
                          {comp.organizer && (
                            <span className="text-[10px] font-mono uppercase tracking-widest text-muted block mb-0.5">
                              {comp.organizer}
                            </span>
                          )}
                          <h4 className="text-base font-bold text-[#1E1E1E]">{comp.title}</h4>
                        </div>
                        <span className="text-[11px] font-mono text-muted px-2 py-0.5 rounded bg-white border border-[#E7E7E7] self-start sm:self-auto shrink-0">
                          {comp.date}
                        </span>
                      </div>

                      {(comp.role || comp.projectName) && (
                        <div className="text-xs font-mono text-[#1E1E1E]">
                          {comp.role}
                          {comp.role && comp.projectName && ' · '}
                          {comp.projectName && <span className="text-muted">{comp.projectName}</span>}
                        </div>
                      )}

                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        {comp.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-subtle/60 border border-dashed border-[#E7E7E7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted block">
                      TRACK STATUS · IN PROGRESS
                    </span>
                    <p className="text-xs sm:text-sm text-[#1E1E1E]">
                      Upcoming hackathons, competitions, and technical challenges will be logged here.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-muted px-2.5 py-1 rounded bg-white border border-[#E7E7E7] self-start sm:self-auto shrink-0">
                    CONFIGURABLE
                  </span>
                </div>
              )}
            </section>

            {/* 3. ACHIEVEMENTS */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E7E7E7] pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-[#1E1E1E] text-white">
                    03
                  </span>
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#1E1E1E] font-semibold">
                    ACHIEVEMENTS
                  </h3>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
                  HONORS & CERTIFICATIONS
                </span>
              </div>

              {achievementsData.length > 0 ? (
                <div className="space-y-3">
                  {achievementsData.map((ach) => (
                    <div
                      key={ach.id}
                      className="p-5 rounded-2xl bg-surface-subtle border border-[#E7E7E7] space-y-3 hover:border-black/30 transition-all duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-[#E7E7E7] pb-2.5">
                        <div>
                          {ach.issuer && (
                            <span className="text-[10px] font-mono uppercase tracking-widest text-muted block mb-0.5">
                              {ach.issuer}
                            </span>
                          )}
                          <h4 className="text-base font-bold text-[#1E1E1E]">{ach.title}</h4>
                        </div>
                        <span className="text-[11px] font-mono text-muted px-2 py-0.5 rounded bg-white border border-[#E7E7E7] self-start sm:self-auto shrink-0">
                          {ach.date}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-muted leading-relaxed">
                        {ach.description}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-subtle/60 border border-dashed border-[#E7E7E7] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-muted block">
                      TRACK STATUS · PENDING VERIFICATION
                    </span>
                    <p className="text-xs sm:text-sm text-[#1E1E1E]">
                      Verified certifications, academic honors, and key milestones will appear here.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-muted px-2.5 py-1 rounded bg-white border border-[#E7E7E7] self-start sm:self-auto shrink-0">
                    CONFIGURABLE
                  </span>
                </div>
              )}
            </section>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-surface-subtle border border-[#E7E7E7] space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted block">
                DIRECT INQUIRY
              </span>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="font-mono text-base sm:text-lg font-bold text-[#1E1E1E]">
                  {contactData.email}
                </span>
                <button
                  onClick={copyEmail}
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#1E1E1E] text-white text-xs font-mono uppercase tracking-wider hover:bg-black/80 transition-colors shrink-0"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedEmail ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}</span>
                </button>
              </div>
              <p className="text-xs text-muted">{contactData.note}</p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-widest text-muted block">
                CHANNELS & NETWORKS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {contactData.socials.map((soc, idx) => (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-surface-subtle border border-[#E7E7E7] flex items-center justify-between hover:border-black/30 transition-colors group"
                  >
                    <div>
                      <span className="text-xs font-semibold text-[#1E1E1E] block">
                        {soc.label}
                      </span>
                      <span className="text-[11px] font-mono text-muted">{soc.handle}</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-muted group-hover:text-[#1E1E1E] transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-[#141414]/30 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] glass-modal rounded-3xl shadow-modal flex flex-col z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#E7E7E7] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <h2 id="modal-title" className="text-base font-bold uppercase tracking-wider text-[#1E1E1E]">
                  {section.label}
                </h2>
              </div>

              <button
                data-close
                onClick={onClose}
                type="button"
                aria-label="Close dialog"
                className="w-8 h-8 rounded-full border border-[#E7E7E7] flex items-center justify-center text-muted hover:text-[#1E1E1E] hover:bg-black/5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
              {renderSectionContent()}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

