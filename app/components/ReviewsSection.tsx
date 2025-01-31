'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const reviews = [
    {
        id: 1,
        name: "John Doe",
        rating: 5,
        comment: "Amazing quality crackers! The sky shots were spectacular.",
        avatar: "/avatar1.jpg",
        date: "January 15, 2025"
    },
    {
        id: 2,
        name: "Sarah Smith",
        rating: 5,
        comment: "Best sparklers I've ever used. Will definitely buy again!",
        avatar: "/avatar2.jpg",
        date: "January 20, 2025"
    },
    {
        id: 3,
        name: "Mike Johnson",
        rating: 4,
        comment: "Great selection of ground chakkars. My kids loved them!",
        avatar: "/avatar3.jpg",
        date: "January 25, 2025"
    },
    {
        id: 4,
        name: "Emily Brown",
        rating: 5,
        comment: "The fountain crackers created beautiful displays. Highly recommend!",
        avatar: "/avatar4.jpg",
        date: "January 28, 2025"
    }
];

const ReviewsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
        );
    };

    return (
        <section className="py-16 bg-gradient-to-b from-black to-yellow-900">
            <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
                <h2 className="text-4xl font-bold text-yellow-400 text-center mb-12">
                    Customer Reviews
                </h2>
                
                <div className="relative">
                    <div className="overflow-hidden">
                        <div className="flex transition-transform duration-500 ease-in-out"
                             style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {reviews.map((review) => (
                                <div key={review.id} className="w-full flex-shrink-0 px-4">
                                    <div className="bg-black/60 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-yellow-400/20">
                                        <div className="flex items-center mb-4">
                                            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                                                <Image
                                                    src={review.avatar}
                                                    alt={review.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-yellow-400">{review.name}</h3>
                                                <div className="flex text-yellow-400">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-yellow-100 text-lg mb-2">{review.comment}</p>
                                        <p className="text-yellow-400/60">{review.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button 
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full p-2 shadow-lg transition-all duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button 
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full p-2 shadow-lg transition-all duration-200"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    <div className="flex justify-center mt-8 gap-2">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                    index === currentIndex ? 'bg-yellow-400 scale-125' : 'bg-yellow-400/50 hover:bg-yellow-400/70'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;
