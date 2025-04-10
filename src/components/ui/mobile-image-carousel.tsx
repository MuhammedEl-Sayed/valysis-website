'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

export const MobileImageCarousel = () => {
    const images = ['/assets/main.png', '/assets/analysis.png'];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 4000); // change every 4s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='relative w-full h-[400px] sm:hidden overflow-hidden rounded-xl ring-1 ring-foreground/20 bg-opacity-50 backdrop-blur-3xl'>
            <AnimatePresence mode='wait'>
                <motion.div
                    key={images[index]}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.6 }}
                    className='absolute inset-0 w-full h-full'
                >
                    <Image
                        src={images[index]}
                        alt='Mobile Image Carousel'
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
