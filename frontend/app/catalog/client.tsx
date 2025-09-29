'use client'

import { useEffect, useState } from 'react';
import MovieCarousel from './components/carousel';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3003/api/movies')
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      });
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
      <MovieCarousel title="Recomendados" items={recommended} renderStars={renderStars} />
      <MovieCarousel title="Melhores avaliados" items={bestRated} renderStars={renderStars} />
      <MovieCarousel title="Outros títulos" items={others} renderStars={renderStars} />
    </section>
  );
}