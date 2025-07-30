// src/modules/YouTubeEmbed.jsx
import React from 'react';
import { useState } from 'react';

export default function YouTubeEmbed({ url }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full pb-[56.25%] h-0 mt-1">
    {/* Muestra que esta cargando el video */}
    {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white z-10">
          <div className="text-firstyellow font-semibold animate-pulse">Cargando...</div>
        </div>
      )}
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={url}
        title="Live de YouTube"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        onLoad={() => setLoading(false)}
      ></iframe>
    </div>
  );
}
