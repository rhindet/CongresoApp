import React from 'react';

export default function Loader() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <style>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(79, 70, 229, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
          }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .dot-pulse {
          animation: pulse 1s infinite linear;
          box-shadow: 0 0 0 #4F46E5;
        }

        .loading-text {
          animation: blink 1.2s infinite;
        }
      `}</style>

      <div className="w-3 h-3 rounded-full bg-indigo-600 dot-pulse mb-3" />
      <div className="text-indigo-600 text-lg font-medium loading-text">
        Cargando...
      </div>
    </div>
  );
}
