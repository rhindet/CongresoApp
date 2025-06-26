// src/modules/YouTubeEmbed.jsx
import React from 'react';

export default function YouTubeEmbed({ url }) {
  return (
    <div className="relative w-full pb-[56.25%] h-0 mt-1">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={url}
        title="Video de YouTube"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
