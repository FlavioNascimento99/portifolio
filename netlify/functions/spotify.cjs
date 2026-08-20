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
      refresh_token: refreshToken,
    }),
  });

  const data = await response.json();
  return data.access_token;
};

const getCurrentlyPlaying = async (accessToken) => {
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

const getRecentlyPlayed = async (accessToken) => {
  const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return data.items?.[0] || null;
};

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const accessToken = await getAccessToken();

    const currentlyPlaying = await getCurrentlyPlaying(accessToken);

    if (currentlyPlaying && currentlyPlaying.item) {
      const track = currentlyPlaying.item;
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          name: track.name,
          artist: track.artists.map((a) => a.name).join(', '),
          album: track.album.name,
          albumArt: track.album.images[0]?.url || '',
          url: track.external_urls.spotify,
          isPlaying: currentlyPlaying.is_playing,
        }),
      };
    }

    const recentlyPlayed = await getRecentlyPlayed(accessToken);

    if (recentlyPlayed && recentlyPlayed.track) {
      const track = recentlyPlayed.track;
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          name: track.name,
          artist: track.artists.map((a) => a.name).join(', '),
          album: track.album.name,
          albumArt: track.album.images[0]?.url || '',
          url: track.external_urls.spotify,
          isPlaying: false,
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(null),
    };
  } catch (error) {
    console.error('Erro ao buscar dados do Spotify:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Erro interno do servidor' }),
    };
  }
};
