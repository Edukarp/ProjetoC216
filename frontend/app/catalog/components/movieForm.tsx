import { useState } from 'react';

interface MovieFormProps {
  onSubmit: (form: MovieFormState) => Promise<void>;
  initialValues?: MovieFormState;
  message?: string | null;
  setMessage?: (msg: string | null) => void;
}

export interface MovieFormState {
  title: string;
  type: string;
  genre: string;
  year: string;
  rating: string;
  synopsis: string;
  poster: string;
}

export default function MovieForm({
  onSubmit,
  initialValues,
  message,
  setMessage,
}: MovieFormProps) {
  const [form, setForm] = useState<MovieFormState>(
    initialValues || {
      title: '',
      type: 'Filme',
      genre: '',
      year: '',
      rating: '',
      synopsis: '',
      poster: '',
    }
  );

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (setMessage) setMessage(null);
    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleFormChange}
        className="bg-gray-800 text-white p-2 rounded"
        required
      />
      <select
        name="type"
        value={form.type}
        onChange={handleFormChange}
        className="bg-gray-800 text-white p-2 rounded"
      >
        <option value="Filme">Filme</option>
        <option value="Série">Série</option>
      </select>
      <input
        type="text"
        name="genre"
        placeholder="Gêneros (separados por vírgula)"
        value={form.genre}
        onChange={handleFormChange}
        className="bg-gray-800 text-white p-2 rounded"
        required
      />
      <input
        type="number"
        name="year"
        placeholder="Ano"
        value={form.year}
        onChange={handleFormChange}
        className="bg-gray-800 text-white p-2 rounded"
        required
      />
      <input
        type="number"
        name="rating"
        placeholder="Nota (ex: 4.5)"
        step="0.1"
        min="0"
        max="5"
        value={form.rating}
        onChange={handleFormChange}
        className="bg-gray-800 text-white p-2 rounded"
        required
      />
      <textarea
        name="synopsis"
        placeholder="Sinopse"
        value={form.synopsis}
        onChange={handleFormChange}
        className="bg-gray-800 text-white p-2 rounded"
        required
      />
      <input
        type="text"
        name="poster"
        placeholder="URL do Poster"
        value={form.poster}
        onChange={handleFormChange}
        className="bg-gray-800 text-white p-2 rounded"
        required
      />
      {message && (
        <div className="text-center text-red-400 font-semibold">{message}</div>
      )}
      <button
        type="submit"
        className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition mt-2"
      >
        Salvar
      </button>
    </form>
  );
}