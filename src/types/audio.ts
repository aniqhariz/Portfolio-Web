export interface Track {
  id: string;
  title: string;
  artist: string;
  src: string;
  sectionId: string;
  year?: string;
  genre?: string;
}

export interface AudioPlayerState {
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
}

