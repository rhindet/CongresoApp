import { useState } from 'react';
import { Link } from 'react-router-dom';

function Articles() {
  return (
    <div className="min-h-screen bg-white-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-indigo-600">Header</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">Regresar</Link>
          </nav>
        </div>
      </header>

      <main className="p-6 text-center">
        <h1 className="text-4xl font-bold text-green-500">Tailwind está funcionando</h1>
        <p className="mt-4 text-gray-600">
          Si ves este texto, ¡todo está bien con Tailwind!
        </p>
      </main>
    </div>
  );
}

export default Articles;
