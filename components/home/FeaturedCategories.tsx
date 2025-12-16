"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import { containerVariants, fadeInRight, fadeInLeft, zoomIn } from "@/utils/animations";

const CATEGORIES = [
    {
        id: '20ft-standard',
        name: '20ft Standard',
        description: 'Compact & versatile storage.',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
        link: '/containers?size=20ft',
    },
    {
        id: '40ft-high-cube',
        name: '40ft High Cube',
        description: 'Extra foot of vertical space.',
        image: 'https://images.unsplash.com/photo-1628859424749-0d8da4cd5842?auto=format&fit=crop&q=80&w=800',
        link: '/containers?size=40ft&type=hc',
    },
    {
        id: 'reefer',
        name: 'Refrigerated',
        description: 'Temperature controlled units.',
        image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=800',
        link: '/containers?type=reefer',
    },
    {
        id: 'office',
        name: 'Mobile Offices',
        description: 'On-site workspace solutions.',
        image: 'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?auto=format&fit=crop&q=80&w=800',
        link: '/customizations',
    },
];

export default function FeaturedCategories() {
    return (
        <AnimatedSection className="py-20 bg-white">
            <div className="container-safe">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                    className="flex justify-between items-end mb-12"
                >
                    <motion.div variants={fadeInLeft}>
                        <h2 className="text-3xl font-heading font-bold text-slate-900 mb-2">Popular Categories</h2>
                        <p className="text-slate-600">Find the perfect container for your needs.</p>
                    </motion.div>
                    <motion.div variants={fadeInRight}>
                        <Link href="/containers" className="hidden sm:flex items-center gap-2 text-brand-orange font-bold hover:gap-3 transition-all">
                            View All Inventory <ArrowRight size={20} />
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {CATEGORIES.map((cat, index) => (
                        <motion.div
                            key={cat.id}
                            variants={zoomIn}
                            whileHover={{ y: -5 }}
                        >
                            <Link href={cat.link} className="group block">
                                <div className="relative h-64 overflow-hidden rounded-lg bg-slate-100 mb-4">
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                                    <motion.img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                                <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-brand-orange transition-colors">
                                    {cat.name}
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">{cat.description}</p>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center sm:hidden"
                >
                    <Link href="/containers" className="inline-flex items-center gap-2 text-brand-orange font-bold">
                        View All Inventory <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </div>
        </AnimatedSection>
    );
}
