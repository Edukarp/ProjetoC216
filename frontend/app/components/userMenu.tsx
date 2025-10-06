"use client"

import { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import { UserCircle, X } from 'lucide-react';
import MovieForm, { MovieFormState } from '../catalog/components/movieForm';

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003';

export default function UserMenu() {
    const [open, setOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Fecha o menu ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open]);

    const handleLogout = () => {
        Cookies.remove('authToken');
        localStorage.removeItem('authToken');
        window.location.href = '/register';
    };

    const handleAddMovie = () => {
        setShowModal(true);
        setOpen(false);
    };

    // Form state
    const [form, setForm] = useState({
        title: '',
        type: 'Filme',
        genre: '',
        year: '',
        rating: '',
        synopsis: '',
        poster: ''
    });
    const [message, setMessage] = useState<string | null>(null);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (form: MovieFormState) => {
        setMessage(null);
        try {
            const res = await fetch(`${apiUrl}/api/movies`, {
                method: 'POST',
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
                setMessage('Filme/série cadastrado com sucesso!');
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } else {
                const data = await res.json();
                setMessage(data.message || 'Erro ao cadastrar.');
            }
        } catch (error) {
            setMessage('Erro de conexão com o servidor.');
        }
    };

    return (
        <div className="relative" ref={menuRef}>
            <UserCircle
                className="text-white w-8 h-8 cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => setOpen((v) => !v)}
            />
            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-red-600 rounded-lg shadow-lg z-50 p-4 flex flex-col gap-4">
                    <button
                        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                        onClick={handleAddMovie}
                    >
                        Adicionar filme
                    </button>
                    <button
                        className="w-full bg-gray-800 text-white py-2 rounded hover:bg-red-600 transition"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                    <div className="bg-gray-900 border border-red-600 rounded-lg p-8 w-full max-w-md relative">
                        <button
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                            onClick={() => setShowModal(false)}
                        >
                            <X size={24} />
                        </button>
                        <h2 className="text-2xl font-bold text-red-500 mb-4">Adicionar Filme/Série</h2>
                        <MovieForm onSubmit={handleFormSubmit} message={message} setMessage={setMessage} />
                    </div>
                </div>
            )}
        </div>
    );
}