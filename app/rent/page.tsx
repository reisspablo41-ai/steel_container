"use client";

import { useEffect, useState, useMemo } from "react";
import ProductCard from "@/components/commerce/ProductCard";
import FilterSidebar from "@/components/commerce/FilterSidebar";
import RentInquiryForm from "@/components/rent/RentInquiryForm";
import { supabase } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import AnimatedDiv from "@/components/animations/AnimatedDiv";
import { containerVariants, fadeInUp } from "@/utils/animations";
import { FilterState } from "@/app/containers/page";

export default function RentPage() {
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<FilterState>({
        conditions: [],
        sizes: [],
        priceMin: null,
        priceMax: null,
    });

    useEffect(() => {
        async function fetchProducts() {
            // For now, fetch all products. In real scenario, might filter by 'rentable' flag if it existed.
            const { data } = await supabase.from('products').select('*').eq('in_stock', true);
            if (data) setAllProducts(data);
            setLoading(false);
        }
        fetchProducts();
    }, []);

    // Filter products based on current filter state
    const filteredProducts = useMemo(() => {
        let filtered = [...allProducts];

        // Filter by condition
        if (filters.conditions.length > 0) {
            filtered = filtered.filter(product => {
                const productCondition = (product.condition || '').toLowerCase().trim();
                return filters.conditions.some(filterCondition => {
                    const normalizedFilter = filterCondition.toLowerCase().trim();
                    
                    // Handle different condition formats
                    if (normalizedFilter === 'new (one trip)' || normalizedFilter === 'new') {
                        return productCondition.includes('new') || productCondition.includes('one trip') || productCondition === 'new';
                    }
                    if (normalizedFilter === 'used - wwt' || normalizedFilter === 'used') {
                        return productCondition.includes('used') || productCondition.includes('wwt');
                    }
                    if (normalizedFilter === 'refurbished') {
                        return productCondition.includes('refurbished');
                    }
                    return productCondition.includes(normalizedFilter);
                });
            });
        }

        // Filter by size
        if (filters.sizes.length > 0) {
            filtered = filtered.filter(product => {
                const productSize = (product.size || '').toLowerCase().trim();
                return filters.sizes.some(filterSize => {
                    const normalizedSize = filterSize.toLowerCase().trim();
                    return productSize === normalizedSize || productSize.includes(normalizedSize);
                });
            });
        }

        // Filter by price range
        if (filters.priceMin !== null) {
            filtered = filtered.filter(product => {
                const price = parseFloat(product.price) || 0;
                return price >= filters.priceMin!;
            });
        }

        if (filters.priceMax !== null) {
            filtered = filtered.filter(product => {
                const price = parseFloat(product.price) || 0;
                return price <= filters.priceMax!;
            });
        }

        return filtered;
    }, [allProducts, filters]);

    return (
        <div className="bg-slate-50 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-900 py-12 text-center"
            >
                <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">
                    Rent Containers
                </h1>
                <p className="text-slate-400 max-w-xl mx-auto">
                    Flexible rental options for short and long-term storage needs.
                    Browse our available containers for rent.
                </p>
            </motion.div>

            <div className="container-safe py-8">
                <div className="grid lg:grid-cols-12 gap-12 items-start">
                    {/* Filter Sidebar - Hidden on mobile/tablet for now or integrated differently? 
                        The Rent page focus is shifting to inquiry. Let's keep filters for browsing standard stock but prioritize form.
                    */}
                    <div className="lg:col-span-3 hidden lg:block">
                        <FilterSidebar filters={filters} onFilterChange={setFilters} />
                    </div>

                    <div className="lg:col-span-9">
                        {/* Inquiry Form Section */}
                        <AnimatedDiv className="mb-12">
                            <RentInquiryForm />
                        </AnimatedDiv>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-2xl font-heading font-bold text-slate-900 mb-6"
                        >
                            Available Rental Inventory
                        </motion.h2>

                        {/* Controls */}
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm text-slate-500">
                                Showing <strong className="text-slate-900">{filteredProducts.length}</strong> Results
                            </span>

                            <select className="border border-slate-200 rounded px-3 py-1.5 text-sm bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange">
                                <option>Sort by: Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>

                        {/* Grid */}
                        {loading ? (
                            <div className="text-center py-12 text-slate-500">Loading products...</div>
                        ) : (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={containerVariants}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product, index) => (
                                        <motion.div
                                            key={product.id}
                                            variants={fadeInUp}
                                            custom={index}
                                        >
                                            <ProductCard product={product} />
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full text-center py-12 text-slate-500"
                                    >
                                        No rental units currently available.
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
