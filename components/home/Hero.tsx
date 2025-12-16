"use client";

import Link from "next/link";
import { ArrowRight, Box, ShieldCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem } from "@/utils/animations";

export default function Hero() {
    return (
        <section className="relative bg-slate-900 overflow-hidden">
            {/* Background Image Placeholder (In production, use next/image) */}
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <img
                    src="https://images.unsplash.com/photo-1494412574643-35d324688b08?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Shipping Container Yard"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            <div className="container-safe relative z-10 py-24 sm:py-32 lg:py-40">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="max-w-2xl space-y-8"
                >
                    <motion.div
                        variants={fadeInUp}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-sm font-semibold"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
                        </span>
                        Now Shipping Nationwide
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-tight"
                    >
                        INDUSTRIAL STRENGTH <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-orange-400">
                            STORAGE SOLUTIONS
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-lg text-slate-300 leading-relaxed max-w-xl"
                    >
                        New and used shipping containers for sale and rent. Secure, durable, and weather-resistant units delivered directly to your site.
                    </motion.p>

                    <motion.div
                        variants={staggerContainer}
                        className="flex flex-col sm:flex-row gap-4 pt-4"
                    >
                        <motion.div variants={staggerItem}>
                            <Link
                                href="/containers"
                                className="inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-brand-orange text-white font-bold rounded hover:bg-orange-600 transition-colors"
                            >
                                Shop Containers
                            </Link>
                        </motion.div>
                        <motion.div variants={staggerItem}>
                            <Link
                                href="/customizations"
                                className="inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded hover:bg-white/20 transition-colors"
                            >
                                Custom Modifications <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Trust Indicators Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="relative z-10 bg-slate-950/50 backdrop-blur-md border-t border-white/10"
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                    className="container-safe py-6 flex flex-wrap justify-between gap-8 text-slate-400"
                >
                    <motion.div variants={fadeInLeft} className="flex items-center gap-3">
                        <Truck className="text-brand-orange" />
                        <span className="text-sm font-medium">Nationwide Delivery</span>
                    </motion.div>
                    <motion.div variants={fadeInUp} className="flex items-center gap-3">
                        <ShieldCheck className="text-brand-orange" />
                        <span className="text-sm font-medium">10-Year Warranty</span>
                    </motion.div>
                    <motion.div variants={fadeInRight} className="flex items-center gap-3">
                        <Box className="text-brand-orange" />
                        <span className="text-sm font-medium">100+ Configurations</span>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
