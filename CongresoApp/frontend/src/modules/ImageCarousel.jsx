import { useEffect, useState } from 'react';
import img1 from '../../public/assets/carrusel/img1-carrusel.jpg';
import img2 from '../../public/assets/carrusel/img2-carrusel.jpg';
import img3 from '../../public/assets/carrusel/img3-carrusel.jpg';
import img4 from '../../public/assets/carrusel/img4-carrusel.jpg';
import img5 from '../../public/assets/carrusel/img5-carrusel.jpg';
import img6 from '../../public/assets/carrusel/img6-carrusel.jpg';
import img7 from '../../public/assets/carrusel/img7-carrusel.jpg';
import img8 from '../../public/assets/carrusel/img8-carrusel.jpg';
import img9 from '../../public/assets/carrusel/img9-carrusel.jpg';
import img10 from '../../public/assets/carrusel/img10-carrusel.jpg';

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

export default function ImageCarousel({ className = '' }) {
    const [current, setCurrent] = useState(0);
    // percentage padding-bottom to preserve aspect ratio (default 16:9)
    const [ratioPct, setRatioPct] = useState(56.25);

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    // Preload the very first image and compute aspect ratio to avoid CLS
    useEffect(() => {
        let link;
        const img = new Image();
        img.decoding = 'async';
        img.src = images[0];
        img.onload = () => {
            try {
                const pct = (img.naturalHeight / img.naturalWidth) * 100;
                if (pct && isFinite(pct)) setRatioPct(pct);
            } catch (e) {
                // ignore
            }
        };

        // add a preload link for the first (critical) image
        try {
            link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = images[0];
            document.head.appendChild(link);
        } catch (e) {
            // ignore if DOM not available or append fails
        }

        return () => {
            if (link && link.parentNode) link.parentNode.removeChild(link);
        };
    }, []);

    // Preload next image when current changes for a smoother transition
    useEffect(() => {
        const nextIndex = (current + 1) % images.length;
        const nextImg = new Image();
        nextImg.decoding = 'async';
        nextImg.src = images[nextIndex];
    }, [current]);

    return (
        <div className={`overflow-hidden rounded-xl shadow-lg ${className} relative`} aria-live="polite">
            {/* spacer to preserve aspect ratio and avoid layout shift */}
            <div style={{ width: '100%', paddingBottom: `${ratioPct}%` }} />

            {/* stacked images; browser will lazy-load offscreen images */}
            <div className="absolute inset-0">
                {images.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={`Slide ${i}`}
                        className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        fetchPriority={i === current ? 'high' : 'low'}
                        aria-hidden={i === current ? 'false' : 'true'}
                    />
                ))}
            </div>
        </div>
    );
}
