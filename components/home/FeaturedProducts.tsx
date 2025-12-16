"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/commerce/ProductCard";
import { supabase } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animations/AnimatedSection";
import AnimatedHeading from "@/components/animations/AnimatedHeading";
import { containerVariants, fadeInRight, fadeInLeft } from "@/utils/animations";

export default function FeaturedProducts() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        async function fetchFeatured() {
            // Fetch 3 random products (or latest)
            const { data } = await supabase
                .from('products')
                .select('*')
                .eq('in_stock', true)
                .limit(3);

            if (data) setProducts(data);
        }
        fetchFeatured();
    }, []);

    if (products.length === 0) return null;

    return (
        <AnimatedSection className="py-20 bg-slate-50">
            <div className="container-safe">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                    className="flex justify-between items-end mb-12"
                >
                    <motion.div variants={fadeInLeft}>
                        <span className="text-brand-orange font-bold uppercase tracking-wider text-sm">Inventory</span>
                        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mt-2">
                            Featured Containers
                        </h2>
                    </motion.div>
                    <motion.div variants={fadeInRight}>
                        <Link href="/containers" className="hidden sm:flex items-center font-bold text-slate-700 hover:text-brand-orange transition-colors">
                            View All
                            <ArrowRight size={20} className="ml-2" />
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        ease: [0.6, -0.05, 0.01, 0.99],
                                    },
                                },
                            }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center sm:hidden"
                >
                    <Link href="/containers" className="inline-flex items-center font-bold text-slate-700 hover:text-brand-orange transition-colors">
                        View All Inventory
                        <ArrowRight size={20} className="ml-2" />
                    </Link>
                </motion.div>
            </div>
        </AnimatedSection>
    );
}
