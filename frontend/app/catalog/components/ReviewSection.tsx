'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface Review {
    _id: string;
    user: { name: string };
    rating: number;
    comment: string;
    createdAt: string;
}

export default function ReviewSection({ movieId, apiUrl }: { movieId: string, apiUrl: string }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        async function fetchReviews() {
            const res = await fetch(`${apiUrl}/api/reviews/movie/${movieId}`);
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
            setLoading(false);
        }
        fetchReviews();
    }, [movieId, apiUrl]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);
        const token = Cookies.get('authToken');
        if (!token) {
            setMessage('Você precisa estar logado para comentar.');
            return;
        }
        const res = await fetch(`${apiUrl}/api/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ movie: movieId, rating, comment })
        });
        if (res.ok) {
            setComment('');
            setRating(5);
            setMessage('Review enviada!');
            // Atualiza reviews
            const data = await res.json();
            setReviews(reviews => [data, ...reviews]);
        } else {
            setMessage('Erro ao enviar review.');
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto mt-8 bg-gray-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Reviews</h2>
            {loading ? (
                <div className="text-white">Carregando...</div>
            ) : (
                <>
                    {reviews.length === 0 && (
                        <div className="text-gray-400 mb-4">Nenhuma review ainda.</div>
                    )}
                    <ul className="mb-6">
                        {reviews.map(review => (
                            <li key={review._id} className="mb-4 border-b border-gray-700 pb-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-white">{review.user?.name || 'Usuário'}</span>
                                    <span className="text-yellow-400 font-bold">{review.rating} ★</span>
                                    <span className="text-gray-400 text-xs">{new Date(review.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="text-gray-200 mt-1">{review.comment}</div>
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <label className="text-white font-semibold">Sua nota:</label>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map(val => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setRating(val)}
                                    className={`w-12 text-center px-0 py-1 rounded text-sm font-bold border transition
                                     ${rating === val
                                            ? 'bg-red-600 text-black border-red-600'
                                            : 'bg-gray-800 text-white border-gray-600 hover:bg-red-500 hover:text-black hover:border-red-500'}`}
                                        >
                                    {val}
                                </button>
                            ))}
                        </div>
                        <textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            placeholder="Escreva sua review..."
                            className="bg-gray-800 text-white p-2 rounded"
                            required
                        />
                        {message && <div className="text-red-400 text-center">{message}</div>}
                        <button
                            type="submit"
                            className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                        >
                            Enviar review
                        </button>
                    </form>
                </>
            )}
        </div>
    );
}