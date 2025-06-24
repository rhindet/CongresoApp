import { useEffect, useState } from 'react';
import img1 from '../assets/img1-carrusel.jpg';
import img2 from '../assets/img2-carrusel.jpg';
import img3 from '../assets/img3-carrusel.jpg';
import img4 from '../assets/img4-carrusel.jpg';
import img5 from '../assets/img5-carrusel.jpg';
import img6 from '../assets/img6-carrusel.jpg';
import img7 from '../assets/img7-carrusel.jpg';

const images = [img1, img2, img3, img4, img5, img6, img7];

export default function ImageCarousel({ className = '' }) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`overflow-hidden rounded-xl shadow-lg ${className}`}>
            <img
                src={images[current]}
                alt={`Slide ${current}`}
                className="w-full h-full object-cover transition duration-700 ease-in-out"
            />
        </div>
    );
}
