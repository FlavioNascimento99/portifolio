// api/spotify.ts
// Esta é uma serverless function para o Vercel/Netlify
// Ela lida com a autenticação do Spotify e retorna a música atual

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken || '',
    }),
  });

  const data = await response.json();
  return data.access_token;
};

const getCurrentlyPlaying = async (accessToken: string) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json();
  return data;
};

const getRecentlyPlayed = async (accessToken: string) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return data.items?.[0] || null;
};

export default async function handler(req: any, res: any) {
  try {
    const accessToken = await getAccessToken();
    
    const currentlyPlaying = await getCurrentlyPlaying(accessToken);
    
    if (currentlyPlaying && currentlyPlaying.item) {
      const track = currentlyPlaying.item;
      return res.json({
        name: track.name,
        artist: track.artists.map((a: any) => a.name).join(', '),
        album: track.album.name,
        albumArt: track.album.images[0]?.url || '',
        url: track.external_urls.spotify,
        isPlaying: currentlyPlaying.is_playing,
      });
    }
    
    const recentlyPlayed = await getRecentlyPlayed(accessToken);
    
    if (recentlyPlayed && recentlyPlayed.track) {
      const track = recentlyPlayed.track;
      return res.json({
        name: track.name,
        artist: track.artists.map((a: any) => a.name).join(', '),
        album: track.album.name,
        albumArt: track.album.images[0]?.url || '',
        url: track.external_urls.spotify,
        isPlaying: false,
      });
    }
    
    return res.json(null);
  } catch (error) {
    console.error('Erro ao buscar dados do Spotify:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
}
