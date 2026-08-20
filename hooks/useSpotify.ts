import { useState, useEffect, useCallback } from 'react';

interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  url: string;
  isPlaying: boolean;
}

interface UseSpotifyReturn {
  track: SpotifyTrack | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useSpotify = (refreshInterval: number = 30000): UseSpotifyReturn => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentlyPlaying = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/spotify');
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados do Spotify');
      }
      
      const data = await response.json();
      setTrack(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentlyPlaying();
    
    const interval = setInterval(fetchCurrentlyPlaying, refreshInterval);
    
    return () => clearInterval(interval);
  }, [fetchCurrentlyPlaying, refreshInterval]);

  return {
    track,
    isLoading,
    error,
    refetch: fetchCurrentlyPlaying,
  };
};
