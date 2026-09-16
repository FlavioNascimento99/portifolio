const getAccessToken = async (env) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`)}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  const data = await response.json();
  return data.access_token;
};

const getCurrentlyPlaying = async (accessToken) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });

  if (response.status === 204) return null;
  return response.json();
};

const getRecentlyPlayed = async (accessToken) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
    headers: { 'Authorization': `Bearer ${accessToken}` },
  });

  const data = await response.json();
  return data.items?.[0] || null;
};

export async function onRequest(context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const accessToken = await getAccessToken(context.env);

    const currentlyPlaying = await getCurrentlyPlaying(accessToken);

    if (currentlyPlaying && currentlyPlaying.item) {
      const track = currentlyPlaying.item;
      return new Response(JSON.stringify({
        name: track.name,
        artist: track.artists.map((a) => a.name).join(', '),
        album: track.album.name,
        albumArt: track.album.images[0]?.url || '',
        url: track.external_urls.spotify,
        isPlaying: currentlyPlaying.is_playing,
      }), { status: 200, headers: { ...headers, 'Content-Type': 'application/json' } });
    }

    const recentlyPlayed = await getRecentlyPlayed(accessToken);

    if (recentlyPlayed && recentlyPlayed.track) {
      const track = recentlyPlayed.track;
      return new Response(JSON.stringify({
        name: track.name,
        artist: track.artists.map((a) => a.name).join(', '),
        album: track.album.name,
        albumArt: track.album.images[0]?.url || '',
        url: track.external_urls.spotify,
        isPlaying: false,
      }), { status: 200, headers: { ...headers, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify(null), { status: 200, headers: { ...headers, 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Erro ao buscar dados do Spotify:', error);
    return new Response(JSON.stringify({ error: 'Erro interno do servidor' }), {
      status: 500,
      headers: { ...headers, 'Content-Type': 'application/json' },
    });
  }
}
