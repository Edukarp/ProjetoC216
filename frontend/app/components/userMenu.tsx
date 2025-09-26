"use client"

import { useState, useRef, useEffect } from 'react';
import Cookies from 'js-cookie';
import { UserCircle } from 'lucide-react';

export default function UserMenu() {
  const [open, setOpen] = useState(false);
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
    window.location.href = '/add-movie';
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
    </div>
  );
}