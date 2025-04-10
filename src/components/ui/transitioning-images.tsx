"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// This component handles image transitions
export const TransitioningImages = () => {
    const images = ['/assets/main.png', '/assets/analysis.png'];
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-[90vw] max-w-[500px] aspect-[9/19.5] lg:hidden">
            {images.map((src, idx) => (
                <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${activeIndex === idx ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <Image
                        src={src}
                        alt={`Dashboard view ${idx + 1}`}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            ))}
        </div>
    );
};
