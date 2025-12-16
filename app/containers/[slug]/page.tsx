"use client";

import { notFound, useParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import ProductGallery from "@/components/commerce/ProductGallery";
import ProductSpecs from "@/components/commerce/ProductSpecs";
import ConfigurationPanel from "@/components/commerce/ConfigurationPanel";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { fadeInLeft, fadeInRight, fadeInUp, containerVariants } from "@/utils/animations";

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error || !data) {
                notFound();
                return;
            }

            setProduct(data);
            setLoading(false);
        }

        if (slug) {
            fetchProduct();
        }
    }, [slug]);

    if (loading || !product) {
        return (
            <div className="bg-white min-h-screen pb-20 flex items-center justify-center">
                <div className="text-slate-500">Loading...</div>
            </div>
        );
    }

    const mainImage = product.images?.[0] || product.image || "https://placehold.co/600x400?text=No+Image";

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Breadcrumb */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-slate-50 border-b border-slate-200"
            >
                <div className="container-safe py-4">
                    <nav className="flex items-center text-sm text-slate-500">
                        <Link href="/" className="hover:text-brand-orange">Home</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <Link href="/containers" className="hover:text-brand-orange">Shop All</Link>
                        <ChevronRight size={14} className="mx-2" />
                        <span className="text-slate-900 font-medium truncate">{product.name}</span>
                    </nav>
                </div>
            </motion.div>

            <div className="container-safe py-12">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12"
                >

                    {/* Left Column: Visuals & Info */}
                    <motion.div variants={fadeInLeft} className="lg:col-span-7 xl:col-span-8">
                        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 mb-2">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4 mb-8">
                            <span className={`
                        px-3 py-1 text-sm font-bold uppercase rounded-full
                        ${product.condition === 'New' ? 'bg-blue-100 text-blue-800' : ''}
                        ${product.condition === 'Used - Wind & Watertight' ? 'bg-amber-100 text-amber-800' : ''}
                        ${product.condition === 'Refurbished' ? 'bg-emerald-100 text-emerald-800' : ''}
                    `}>
                                {product.condition}
                            </span>
                            <span className="text-slate-500 text-sm">SKU: {product.id.slice(0, 8)}</span>
                        </div>

                        <ProductGallery
                            mainImage={mainImage}
                            productName={product.name}
                            images={product.images || [mainImage]}
                        />

                        <ProductSpecs product={product} />
                    </motion.div>

                    {/* Right Column: Configuration & Action */}
                    <motion.div variants={fadeInRight} className="lg:col-span-5 xl:col-span-4">
                        <ConfigurationPanel product={product} />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
