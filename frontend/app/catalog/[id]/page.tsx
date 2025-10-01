import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import FavoriteButton from '../components/favoriteButton';

interface Movie {
  _id: string;
  title: string;
  type: string;
  genre: string[];
  year: number;
  rating: number;
  synopsis: string;
  poster: string;
}

async function getMovie(id: string): Promise<Movie | null> {
  const res = await fetch(`http://localhost:3003/api/movies/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

async function getUserFavorites(token: string): Promise<string[]> {
  const res = await fetch('http://localhost:3003/api/users/me', {
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

  const token = cookies().get('authToken')?.value;
  let isFavorite = false;
  if (token) {
    const favorites = await getUserFavorites(token);
    isFavorite = favorites.includes(movie._id);


    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-4">
        <div className="max-w-3xl w-full bg-gray-900 rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden relative">
          <FavoriteButton movieId={movie._id} isFavoriteInitial={isFavorite} />
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full md:w-80 h-96 object-cover"
          />
          <div className="flex-1 p-8 flex flex-col">
            <h1 className="text-3xl font-bold text-red-500 mb-2">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-2">
              <span className="bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold">{movie.type}</span>
              <span className="text-gray-400 text-sm">{movie.year}</span>
              <span className="text-yellow-400 font-bold">{movie.rating} ★</span>
            </div>
            <div className="mb-2">
              <span className="text-gray-300 text-sm">Gêneros: </span>
              <span className="text-white text-sm">{movie.genre.join(', ')}</span>
            </div>
            <h2 className="text-xl font-bold text-red-500 pt-3">Sinopse</h2>
            <p className="text-gray-200 mt-2">{movie.synopsis}</p>
          </div>
        </div>
      </div>
    );
  }