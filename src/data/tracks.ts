import { Track } from '@/types/audio';

/**
 * Centralized track configuration mapping each portfolio section to its soundtrack.
 * Place corresponding audio files in public/audio/ (e.g., public/audio/want-u.mp3).
 * Audio files are managed and supplied manually by the developer.
 */
export const tracks: Track[] = [
  {
    id: 'track-about',
    title: 'Want U',
    artist: 'Clara La San',
    src: '/audio/want-u.mp3',
    sectionId: 'about',
    year: '2023',
    genre: 'R&B / Soul',
  },
  {
    id: 'track-skills',
    title: 'The Less I Know the Better',
    artist: 'Tame Impala',
    src: '/audio/the-less-i-know-the-better.mp3',
    sectionId: 'skills',
    year: '2015',
    genre: 'Psychedelic Pop / Indie',
  },
  {
    id: 'track-works',
    title: 'Midnight City',
    artist: 'M83',
    src: '/audio/midnight-city.mp3',
    sectionId: 'works',
    year: '2011',
    genre: 'Synth-Pop / Electronic',
  },
  {
    id: 'track-experiments',
    title: 'Times Like These',
    artist: 'EDEN',
    src: '/audio/times-like-these.mp3',
    sectionId: 'experiments',
    year: '2015',
    genre: 'Indie Electronic / Alternative',
  },
  {
    id: 'track-contact',
    title: 'Nothing Can Change This Love',
    artist: 'Sam Cooke',
    src: '/audio/nothing-can-change-this-love.mp3',
    sectionId: 'contact',
    year: '1962',
    genre: 'Classic Soul / R&B',
  },
];

export function getTrackBySectionId(sectionId: string): Track | undefined {
  return tracks.find((t) => t.sectionId === sectionId);
}

