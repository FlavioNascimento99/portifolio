import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ExternalLink, Loader2 } from 'lucide-react';

interface SpotifyTrack {
  name: string;
  artist: string;
  album: string;
  albumArt: string;
  url: string;
  isPlaying: boolean;
}

interface SpotifyWidgetProps {
  className?: string;
  apiUrl?: string;
}

export const SpotifyWidget: React.FC<SpotifyWidgetProps> = ({ 
  className = '',
  apiUrl = '/api/spotify'
}) => {
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const fetchCurrentlyPlaying = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(apiUrl);
      
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
  };

  useEffect(() => {
    fetchCurrentlyPlaying();
    
    const interval = setInterval(fetchCurrentlyPlaying, 30000);
    
    return () => clearInterval(interval);
  }, [apiUrl]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`fixed bottom-6 right-6 z-50 bg-black text-white border-4 border-neo-green p-4 shadow-neo-lg ${className}`}
      >
        <div className="flex items-center gap-3">
          <Loader2 size={20} className="animate-spin text-neo-green" />
          <span className="font-mono text-sm">Carregando...</span>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`fixed bottom-6 right-6 z-50 ${className}`}
      >
        <div className="bg-black text-white border-4 border-gray-600 p-4 shadow-neo-lg">
          <div className="flex items-center gap-3">
            <Music size={20} className="text-gray-500" />
            <div className="text-left">
              <p className="font-mono text-xs font-bold text-gray-500">OFFLINE</p>
              <p className="font-mono text-sm text-gray-400">Não estou escutando nada no momento</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!track) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed bottom-6 right-6 z-50 ${className}`}
      >
        <div className="bg-black text-white border-4 border-gray-600 p-4 shadow-neo-lg">
          <div className="flex items-center gap-3">
            <Music size={20} className="text-gray-500" />
            <div className="text-left">
              <p className="font-mono text-xs font-bold text-gray-500">OFFLINE</p>
              <p className="font-mono text-sm text-gray-400">Não estou escutando nada no momento</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed bottom-6 right-6 z-50 ${className}`}
      ref={tooltipRef}
    >
      <motion.button
        onClick={() => setShowTooltip(!showTooltip)}
        className="bg-black text-white border-4 border-neo-green p-4 shadow-neo-lg hover:shadow-neo transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            {track.albumArt ? (
              <motion.img
                src={track.albumArt}
                alt={track.album}
                className="w-10 h-10 border-2 border-neo-green"
                animate={track.isPlaying ? { scale: [1, 1.05, 1] } : {}}
                transition={track.isPlaying ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
              />
            ) : (
              <Music size={20} className="text-neo-green" />
            )}
            {track.isPlaying && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-neo-green rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            )}
          </div>
          <div className="text-left">
            <p className="font-mono text-xs font-bold text-neo-green">AGORA TOCANDO</p>
            <p className="font-mono text-sm font-bold truncate max-w-48">{track.name}</p>
            <p className="font-mono text-xs text-gray-400 truncate max-w-48">{track.artist}</p>
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full right-0 mb-3 bg-black text-white border-4 border-neo-green p-4 shadow-neo-lg w-72"
          >
            <div className="flex gap-3">
              {track.albumArt && (
                <img
                  src={track.albumArt}
                  alt={track.album}
                  className="w-16 h-16 border-2 border-neo-green"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-mono text-xs font-bold text-neo-green">ÁLBUM</p>
                <p className="font-mono text-sm font-bold truncate">{track.album}</p>
                <p className="font-mono text-xs text-gray-400 mt-1">{track.artist}</p>
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-between">
              <span className="font-mono text-xs text-gray-400">
                {track.isPlaying ? 'Tocando agora' : 'Última música'}
              </span>
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-neo-green hover:text-white transition-colors"
              >
                <ExternalLink size={14} />
                <span className="font-mono text-xs">Abrir no Spotify</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
