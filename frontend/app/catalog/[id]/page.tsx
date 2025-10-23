import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import MovieClient from './client'
import { Movie } from '@/models/movie';
import { getApiUrl } from '@/utils/getApiUrl';

const apiUrl = getApiUrl();


async function getMovie(id: string): Promise<Movie | null> {
  const res = await fetch(`${apiUrl}/api/movies/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function getUserFavorites(token: string): Promise<string[]> {
  const res = await fetch(`${apiUrl}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  });
  if (!res.ok) return [];
  const user = await res.json();
  return user.favorites || [];
}

export default async function MoviePage({ params }: { params: { id: string } }) {

  const movie = await getMovie(params.id);
  if (!movie) return notFound();

  const cookiesStore = await cookies();
  const token = cookiesStore.get('authToken')?.value;
  let isFavorite = false;
  if (token) {
    const favorites = await getUserFavorites(token);
    isFavorite = favorites.includes(movie._id);
  };


  return (
    <MovieClient movie={movie} isFavorite={isFavorite} apiUrl={apiUrl} />
  );
}
