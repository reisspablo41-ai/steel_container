"use client";

import { BLOG_POSTS } from "@/data/blog";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Calendar, Tag, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeInUp, fadeInLeft, fadeInRight, containerVariants, staggerItem } from "@/utils/animations";

export default function BlogPostPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [post, setPost] = useState(BLOG_POSTS.find((p) => p.slug === slug));

    useEffect(() => {
        if (!post && slug) {
            const found = BLOG_POSTS.find((p) => p.slug === slug);
            if (!found) {
                notFound();
                return;
            }
            setPost(found);
        }
    }, [slug]);

    if (!post) {
        return null;
    }

    return (
        <article className="min-h-screen bg-white pb-20">
            {/* Header / Hero */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[400px] md:h-[500px]"
            >
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1 }}
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-center p-6"
                >
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="max-w-4xl"
                    >
                        <motion.span
                            variants={staggerItem}
                            className="inline-block bg-brand-orange text-white px-3 py-1 rounded text-sm font-bold uppercase tracking-wider mb-6"
                        >
                            {post.category}
                        </motion.span>
                        <motion.h1
                            variants={staggerItem}
                            className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight"
                        >
                            {post.title}
                        </motion.h1>
                        <motion.div
                            variants={containerVariants}
                            className="flex items-center justify-center gap-6 text-white/80 text-sm"
                        >
                            <motion.span variants={fadeInLeft} className="flex items-center gap-2">
                                <Calendar size={16} /> {post.date}
                            </motion.span>
                            <motion.span variants={fadeInRight} className="flex items-center gap-2">
                                <Tag size={16} /> {post.category}
                            </motion.span>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="container-safe -mt-20 relative z-10"
            >
                <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 max-w-4xl mx-auto border border-slate-100">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-slate-500 hover:text-brand-orange mb-8 transition-colors font-medium text-sm"
                        >
                            <ChevronLeft size={16} className="mr-1" /> Back to Blog
                        </Link>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-brand-orange prose-a:no-underline hover:prose-a:underline prose-li:text-slate-600"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Footer */}
                    <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between items-center">
                        <div className="text-slate-500">
                            <span className="font-bold text-slate-900">Share this post:</span>
                        </div>
                        <div className="flex gap-4">
                            <button className="p-2 rounded-full bg-slate-100 hover:bg-brand-orange/10 hover:text-brand-orange transition-colors">
                                <Share2 size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </article>
    );
}
