'use client'

import { useEffect, useState } from 'react';
import MovieCarousel from './components/carousel';
import Cookies from 'js-cookie';

type Movie = {
  _id: string;
  title: string;
  type: string;
  genre: string[];
  year: number;
  rating: number;
  synopsis: string;
  poster: string;
};

export default function CatalogClient() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('http://localhost:3003/api/movies');
      const allMovies = await res.json();

      // Buscar favoritos do usuário
      const token = Cookies.get('authToken');
      let favoriteIds: string[] = [];
      if (token) {
        const favRes = await fetch('http://localhost:3003/api/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (favRes.ok) {
          const user = await favRes.json();
          favoriteIds = user.favorites || [];
        }
      }
      setMovies(allMovies);
      setFavorites(allMovies.filter((m: Movie) => favoriteIds.includes(m._id)));
      setLoading(false);
    }
    fetchData();
  }, []);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-red-500">★</span>);
    }
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-red-500">☆</span>);
    }
    return stars;
  };

  const bestRated = movies.filter(movie => movie.rating >= 4.7);
  const recommended = movies.filter(movie => movie.rating >= 4.5 && movie.rating < 4.7);
  const others = movies.filter(movie => movie.rating < 4.5);

  if (loading) {
    return <div className="text-white text-center py-20">Carregando...</div>;
  }

  return (
    <section className="py-8 px-4 border-t border-red-600">
      {favorites.length > 0 && (
        <MovieCarousel title="Seus Favoritos" items={favorites} renderStars={renderStars} />
      )}
      <MovieCarousel title="Recomendados" items={recommended} renderStars={renderStars} />
      <MovieCarousel title="Melhores avaliados" items={bestRated} renderStars={renderStars} />
      <MovieCarousel title="Outros títulos" items={others} renderStars={renderStars} />
    </section>
  );
}