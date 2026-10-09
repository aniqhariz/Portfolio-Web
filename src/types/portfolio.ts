export type SectionId = 'about' | 'skills' | 'works' | 'experiments' | 'contact';

export interface SectionMetadataItem {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  highlights: string[];
}

export interface ToolItem {
  id: string;
  name: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: { name: string; level?: string; notes?: string }[];
}

export interface ExperimentItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  status: 'Prototype' | 'Concept' | 'Active Exploration';
  link?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  role: string;
  period: string;
  context: string;
  description: string;
  highlights?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
  focus?: string[];
}

export interface CompetitionItem {
  id: string;
  title: string;
  organizer?: string;
  date: string;
  role?: string;
  projectName?: string;
  description: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer?: string;
  date: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  availability: string;
  location: string;
  socials: { label: string; url: string; handle: string }[];
  note: string;
}

export interface SectionData {
  id: SectionId;
  index: number;
  number: string;
  label: string;
  headline: string;
  subheadline: string;
  description: string;
  metadata: SectionMetadataItem[];
  modalActionLabel: string;
}

