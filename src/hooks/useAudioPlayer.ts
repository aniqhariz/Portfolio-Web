'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Track, AudioPlayerState } from '@/types/audio';
import { tracks } from '@/data/tracks';

export interface UseAudioPlayerReturn {
  state: AudioPlayerState;
  currentTrack: Track;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  selectTrackByIndex: (index: number, continuePlayback?: boolean) => void;
  selectTrackForSection: (sectionId: string, shouldPlay?: boolean) => void;
  clearError: () => void;
}

export function useAudioPlayer(initialTrackIndex = 0): UseAudioPlayerReturn {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(initialTrackIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const previousVolumeRef = useRef<number>(0.8);
  const isPlayingRef = useRef<boolean>(false);

  // Synchronize ref with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Initialize single shared audio instance on client
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setIsLoading(false);
      setError(null);
    };

    const handleEnded = () => {
      // Loop the active theme track continuously
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    const handlePlaying = () => {
      setIsPlaying(true);
      setIsLoading(false);
      setError(null);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
    };

    const handleError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      const track = tracks[currentTrackIndex];
      setError(
        `Audio file "${track?.src || 'track'}" not found or unsupported. Place local MP3 in public/audio/ to play.`
      );
    };

    audio.loop = true;
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('error', handleError);

    // Initial track load - attempt immediate autoplay as soon as page opens
    const currentTrack = tracks[initialTrackIndex];
    if (currentTrack) {
      audio.src = currentTrack.src;
      audio.autoplay = true;
      audio.loop = true;
      audio.load();

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(() => {
            // When browser requires first user gesture, listen until playback successfully starts
            const tryPlay = () => {
              if (audioRef.current) {
                audioRef.current
                  .play()
                  .then(() => {
                    setIsPlaying(true);
                    cleanupListeners();
                  })
                  .catch(() => {
                    // Keep listening until user gesture is registered
                  });
              }
            };

            const cleanupListeners = () => {
              window.removeEventListener('click', tryPlay);
              window.removeEventListener('pointerdown', tryPlay);
              window.removeEventListener('touchstart', tryPlay);
              window.removeEventListener('keydown', tryPlay);
            };

            window.addEventListener('click', tryPlay, { passive: true });
            window.addEventListener('pointerdown', tryPlay, { passive: true });
            window.addEventListener('touchstart', tryPlay, { passive: true });
            window.addEventListener('keydown', tryPlay, { passive: true });
          });
      }
    }

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
    };
  }, []); // Run once on mount

  // Handle track changing
  const loadAndOptionallyPlay = useCallback((newIndex: number, continuePlayback: boolean) => {
    const audio = audioRef.current;
    const track = tracks[newIndex];
    if (!audio || !track) return;

    setError(null);
    setIsLoading(true);
    setCurrentTime(0);
    setDuration(0);
    setCurrentTrackIndex(newIndex);

    // Pause before changing source to avoid conflicts
    audio.pause();
    audio.src = track.src;
    audio.loop = true;
    audio.currentTime = 0;
    audio.load();

    if (continuePlayback) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((err) => {
            // Autoplay policy or 404 error
            setIsPlaying(false);
            setIsLoading(false);
            if (err.name !== 'AbortError') {
              setError(`Could not play ${track.title}. Audio file missing in public/audio/.`);
            }
          });
      }
    } else {
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, []);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setError(null);
    setIsLoading(true);

    try {
      await audio.play();
      setIsPlaying(true);
      setIsLoading(false);
    } catch (err: unknown) {
      setIsPlaying(false);
      setIsLoading(false);
      const track = tracks[currentTrackIndex];
      const errorObj = err as Error;
      if (errorObj.name !== 'AbortError') {
        setError(`Audio file for "${track.title}" not found under public/audio/.`);
      }
    }
  }, [currentTrackIndex]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clamped = Math.max(0, Math.min(time, audio.duration || duration || 0));
    audio.currentTime = clamped;
    setCurrentTime(clamped);
  }, [duration]);

  const setVolume = useCallback((newVolume: number) => {
    const audio = audioRef.current;
    const clamped = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clamped);
    if (clamped > 0) {
      setIsMuted(false);
      previousVolumeRef.current = clamped;
    }
    if (audio) {
      audio.volume = clamped;
    }
  }, []);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      const restored = previousVolumeRef.current || 0.8;
      audio.volume = restored;
      setVolumeState(restored);
      setIsMuted(false);
    } else {
      previousVolumeRef.current = volume;
      audio.volume = 0;
      setVolumeState(0);
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  const nextTrack = useCallback(() => {
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    loadAndOptionallyPlay(nextIdx, isPlayingRef.current);
  }, [currentTrackIndex, loadAndOptionallyPlay]);

  const prevTrack = useCallback(() => {
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadAndOptionallyPlay(prevIdx, isPlayingRef.current);
  }, [currentTrackIndex, loadAndOptionallyPlay]);

  const selectTrackByIndex = useCallback(
    (index: number, continuePlayback = false) => {
      if (index === currentTrackIndex) return;
      loadAndOptionallyPlay(index, continuePlayback);
    },
    [currentTrackIndex, loadAndOptionallyPlay]
  );

  const selectTrackForSection = useCallback(
    (sectionId: string, shouldPlay = true) => {
      const targetIndex = tracks.findIndex((t) => t.sectionId === sectionId);
      if (targetIndex === -1) return;
      if (targetIndex === currentTrackIndex) {
        if (shouldPlay && !isPlayingRef.current && audioRef.current) {
          audioRef.current
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
        }
        return;
      }

      loadAndOptionallyPlay(targetIndex, shouldPlay);
    },
    [currentTrackIndex, loadAndOptionallyPlay]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  return {
    state: {
      currentTrackIndex,
      isPlaying,
      currentTime,
      duration,
      volume,
      isMuted,
      isLoading,
      error,
    },
    currentTrack,
    play,
    pause,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    nextTrack,
    prevTrack,
    selectTrackByIndex,
    selectTrackForSection,
    clearError,
  };
}

