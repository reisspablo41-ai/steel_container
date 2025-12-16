"use client";

import { REVIEWS } from "@/data/reviews";
import { Star, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import { containerVariants, fadeInUp, scaleIn, bounceIn } from "@/utils/animations";

export default function ReviewsPage() {
    const averageRating = REVIEWS.reduce((sum, review) => sum + review.rating, 0) / REVIEWS.length;
    const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: REVIEWS.filter(r => r.rating === rating).length,
        percentage: (REVIEWS.filter(r => r.rating === rating).length / REVIEWS.length) * 100
    }));

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-900 py-16 text-center"
            >
                <h1 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">Customer Reviews</h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    See what our customers are saying about Steel Container Store
                </p>
            </motion.div>

            <div className="container-safe py-12">
                {/* Rating Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 mb-12"
                >
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="text-center md:text-left">
                            <div className="text-5xl font-bold text-slate-900 mb-2">{averageRating.toFixed(1)}</div>
                            <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={24}
                                        className={star <= Math.round(averageRating) ? "fill-brand-orange text-brand-orange" : "fill-slate-200 text-slate-200"}
                                    />
                                ))}
                            </div>
                            <div className="text-slate-600">
                                Based on <strong className="text-slate-900">{REVIEWS.length}</strong> verified reviews
                            </div>
                        </div>

                        <div className="space-y-2">
                            {ratingCounts.map(({ rating, count, percentage }) => (
                                <div key={rating} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-20">
                                        <span className="text-sm font-medium text-slate-700">{rating}</span>
                                        <Star size={14} className="fill-brand-orange text-brand-orange" />
                                    </div>
                                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                                        <div
                                            className="bg-brand-orange h-2 rounded-full"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-slate-600 w-12 text-right">{count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Reviews Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {REVIEWS.map((review, index) => (
                        <motion.div
                            key={review.id}
                            variants={fadeInUp}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
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

                            <h4 className="font-bold text-slate-900 mb-2">{review.title}</h4>
                            <p className="text-slate-600 text-sm mb-4 leading-relaxed">{review.content}</p>
                            <div className="text-xs text-slate-400 border-t border-slate-100 pt-4">
                                {new Date(review.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

