'use client'

import { useState } from 'react';
import { Heart, HeartOff } from 'lucide-react';
import Cookies from 'js-cookie';

export default function FavoriteButton({ movieId, isFavoriteInitial }: { movieId: string, isFavoriteInitial?: boolean }) {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial ?? false);

  const handleFavorite = async () => {
    const token = Cookies.get('authToken');
    if (!token) return;

    const method = isFavorite ? 'DELETE' : 'POST';
    const res = await fetch(`http://localhost:3003/api/users/favorites`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ movieId })
    });

    if (res.ok) setIsFavorite(fav => !fav);
  };

  return (
    <button
      onClick={handleFavorite}
      className="absolute top-4 right-4 z-10 bg-black/60 rounded-full p-2 hover:bg-red-600 transition"
      title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      {isFavorite
        ? <Heart className="text-red-500 w-6 h-6" fill="#ef4444" />
        : <HeartOff className="text-gray-300 w-6 h-6" />}
    </button>
  );
}