'use client';

import { useEffect, useState } from 'react';
import MovieForm, { MovieFormState } from '../components/movieForm';
import FavoriteButton from '../components/favoriteButton';
import { ArrowLeft, Wrench } from 'lucide-react';
import { Movie } from '@/models/movie';
import Link from 'next/link';
import ReviewSection from '../components/ReviewSection';
import Cookies from 'js-cookie';

export default function MovieClient({ movie, isFavorite, apiUrl }: { movie: Movie, isFavorite: boolean, apiUrl: string }) {
    const [editing, setEditing] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const handleEditSubmit = async (form: MovieFormState) => {
        setMessage(null);
        try {
            const res = await fetch(`${apiUrl}/api/movies/${movie._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: form.title,
                    type: form.type,
                    genre: form.genre.split(',').map(g => g.trim()),
                    year: Number(form.year),
                    rating: Number(form.rating),
                    synopsis: form.synopsis,
                    poster: form.poster
                })
            });
            if (res.ok) {
                setMessage('Filme/série atualizado com sucesso!');
                setEditing(false);
                location.reload();
            } else {
                const data = await res.json();
                setMessage(data.message || 'Erro ao atualizar.');
            }
        } catch (error) {
            setMessage('Erro de conexão com o servidor.');
        }
    };

    useEffect(() => {
        async function fetchUser() {
            const token = Cookies.get('authToken');
            if (!token) return;
            const res = await fetch(`${apiUrl}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const user = await res.json();
                setUserId(user._id);
            }
        }
        fetchUser();
    }, [apiUrl]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-4">
            <div className="max-w-3xl w-full bg-gray-900 rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden relative">
                {editing ? (
                    <div className="flex-1 p-8 flex flex-col">
                        <MovieForm
                            onSubmit={handleEditSubmit}
                            initialValues={{
                                title: movie.title,
                                type: movie.type,
                                genre: movie.genre.join(', '),
                                year: String(movie.year),
                                rating: String(movie.rating),
                                synopsis: movie.synopsis,
                                poster: movie.poster,
                            }}
                            message={message}
                            setMessage={setMessage}
                        />
                        <button
                            className="mt-4 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition"
                            onClick={() => setEditing(false)}
                        >
                            Cancelar
                        </button>
                    </div>
                ) : (
                    <>
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-full md:w-80 h-96 object-cover"
                        />
                        <div className="flex-1 p-8 flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <Link href="/catalog" title="Voltar para o catálogo">
                                    <ArrowLeft className="w-6 h-6 text-white cursor-pointer" />
                                </Link>
                                <button
                                    className="p-2 rounded-full transition cursor-pointer"
                                    onClick={() => setEditing(true)}
                                    title="Editar"
                                >
                                    <Wrench className="w-6 h-6 text-white" />
                                </button>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                                <h1 className="text-3xl font-bold text-red-500">{movie.title}</h1>
                                <FavoriteButton movieId={movie._id} isFavoriteInitial={isFavorite} />
                            </div>
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
                    </>
                )}
            </div>
            <ReviewSection movieId={movie._id} apiUrl={apiUrl} userId={userId} />
        </div>
    );
}