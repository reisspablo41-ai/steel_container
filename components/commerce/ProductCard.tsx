"use client";

import Link from "next/link";
import { Product } from "@/data/products";
import { ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
        >
            {/* Image */}
            <div className="relative h-48 sm:h-56 bg-slate-100 overflow-hidden">
                {/* Condition Badge */}
                <div className="absolute top-3 left-3 z-10">
                    <span className={`
                px-2 py-1 text-xs font-bold uppercase tracking-wide rounded-sm shadow-sm
                ${product.condition === 'New' ? 'bg-blue-600 text-white' : ''}
                ${product.condition === 'Used - Wind & Watertight' ? 'bg-amber-500 text-white' : ''}
                ${product.condition === 'Refurbished' ? 'bg-emerald-600 text-white' : ''}
            `}>
                        {product.condition}
                    </span>
                </div>

                <motion.img
                    src={product.images?.[0] || product.image || "https://placehold.co/600x400?text=No+Image"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                />

                {/* Hover Action */}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                    <Link
                        href={`/containers/${product.slug}`}
                        className="bg-brand-orange text-white font-bold py-2 px-6 rounded shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all"
                    >
                        View Details
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading font-bold text-lg text-slate-900 line-clamp-2 hover:text-brand-orange transition-colors">
                        <Link href={`/containers/${product.slug}`}>
                            {product.name}
                        </Link>
                    </h3>
                </div>

                <div className="text-sm text-slate-500 mb-4 space-y-1">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <span>Size: {product.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                        <span>Type: {product.type}</span>
                    </div>
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-400 font-medium uppercase">Starting At</span>
                        <span className="text-xl font-bold text-slate-900">${product.price.toLocaleString()}</span>
                    </div>
                    <Link
                        href={`/containers/${product.slug}`}
                        className="text-brand-orange hover:text-orange-700 p-2 rounded-full hover:bg-orange-50 transition-colors"
                        aria-label="View Details"
                    >
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
