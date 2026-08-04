import { useEffect, useState } from 'react';

const PHOTOS = [
  'foto_selfie_banheiro.jpg',
  'foto_selfie_moletom.png',
];

export const useRandomPhoto = (): string => {
  const [photo, setPhoto] = useState<string>('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * PHOTOS.length);
    const selectedPhoto = PHOTOS[randomIndex];
    setPhoto(`/assets/person/${selectedPhoto}`);
  }, []);

  return photo;
};
