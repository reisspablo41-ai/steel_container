"use client";

import { useState, useEffect } from "react";
import { REVIEWS } from "@/data/reviews";
import { Star, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import { containerVariants, fadeInUp, scaleIn } from "@/utils/animations";

export default function ReviewsSlideshow() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [reviewsPerSlide, setReviewsPerSlide] = useState(3);

    // Show 3 reviews at a time (or fewer on mobile)
    const reviewsToShow = REVIEWS.slice(0, 9); // Get first 9 reviews for slideshow

    useEffect(() => {
        const updateReviewsPerSlide = () => {
            setReviewsPerSlide(window.innerWidth >= 1024 ? 3 : 1);
        };
        
        updateReviewsPerSlide();
        window.addEventListener('resize', updateReviewsPerSlide);
        return () => window.removeEventListener('resize', updateReviewsPerSlide);
    }, []);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                const maxIndex = Math.ceil(reviewsToShow.length / reviewsPerSlide) - 1;
                return prev >= maxIndex ? 0 : prev + 1;
            });
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying, reviewsToShow.length, reviewsPerSlide]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
    };

    const nextSlide = () => {
        const maxIndex = Math.ceil(reviewsToShow.length / reviewsPerSlide) - 1;
        goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1);
    };

    const prevSlide = () => {
        const maxIndex = Math.ceil(reviewsToShow.length / reviewsPerSlide) - 1;
        goToSlide(currentIndex <= 0 ? maxIndex : currentIndex - 1);
    };

    const getCurrentReviews = () => {
        const start = currentIndex * reviewsPerSlide;
        return reviewsToShow.slice(start, start + reviewsPerSlide);
    };

    return (
        <AnimatedSection className="py-20 bg-white">
            <div className="container-safe">
                <AnimatedHeading className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Don't just take our word for it - see what our satisfied customers have to say
                    </p>
                </AnimatedHeading>

                <div className="relative">
                    {/* Reviews Container */}
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.5 }}
                                className="w-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-3 gap-6 px-2"
                            >
                                {getCurrentReviews().map((review, index) => (
                                    <motion.div
                                        key={review.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        whileHover={{ y: -5, scale: 1.02 }}
                                        className="bg-slate-50 rounded-lg p-6 border border-slate-200 hover:shadow-lg transition-shadow"
                                    >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h3 className="font-bold text-slate-900">{review.name}</h3>
                                                            {review.verified && (
                                                                <span title="Verified Purchase">
                                                                    <CheckCircle size={16} className="text-green-500" />
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-slate-500">{review.location}</p>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <Star
                                                                key={star}
                                                                size={16}
                                                                className={star <= review.rating ? "fill-brand-orange text-brand-orange" : "fill-slate-200 text-slate-200"}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                        <h4 className="font-bold text-slate-900 mb-2 text-sm">{review.title}</h4>
                                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">{review.content}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border border-slate-200 rounded-full p-2 shadow-lg hover:bg-slate-50 transition-colors z-10"
                        aria-label="Previous reviews"
                    >
                        <ChevronLeft size={24} className="text-slate-700" />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border border-slate-200 rounded-full p-2 shadow-lg hover:bg-slate-50 transition-colors z-10"
                        aria-label="Next reviews"
                    >
                        <ChevronRight size={24} className="text-slate-700" />
                    </motion.button>
                </div>

                {/* Dots Indicator */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={containerVariants}
                    className="flex justify-center gap-2 mt-8"
                >
                    {Array.from({ length: Math.ceil(reviewsToShow.length / reviewsPerSlide) }).map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => goToSlide(index)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{
                                width: index === currentIndex ? 32 : 8,
                                backgroundColor: index === currentIndex ? "#f97316" : "#cbd5e1"
                            }}
                            className="h-2 rounded-full transition-all"
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </motion.div>

                {/* View All Reviews Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-8"
                >
                    <a
                        href="/reviews"
                        className="inline-block text-brand-orange font-bold hover:underline"
                    >
                        View All {REVIEWS.length} Reviews →
                    </a>
                </motion.div>
            </div>
        </AnimatedSection>
    );
}

