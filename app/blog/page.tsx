"use client";

import { BLOG_POSTS } from "@/data/blog";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import { containerVariants, zoomIn, fadeInUp } from "@/utils/animations";

export default function BlogPage() {
    return (
        <div className="bg-slate-50 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-900 py-20 text-center"
            >
                <h1 className="text-3xl sm:text-5xl font-heading font-bold text-white mb-4">Latest News & Insights</h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Discover tips, guides, and inspiration for your next container project.
                </p>
            </motion.div>

            <div className="container-safe py-16">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {BLOG_POSTS.map((post, idx) => (
                        <motion.article
                            key={idx}
                            variants={zoomIn}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                        >
                            <div className="h-56 overflow-hidden relative">
                                <motion.img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.7 }}
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-brand-orange text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="text-xs text-slate-500 mb-3 flex items-center gap-2">
                                    <span>{post.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                    <span>5 min read</span>
                                </div>
                                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-orange transition-colors leading-tight">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h2>
                                <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto pt-4 border-t border-slate-100">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center text-brand-orange font-bold text-sm hover:translate-x-1 transition-transform"
                                    >
                                        Read Full Article <ArrowRight size={16} className="ml-1" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
