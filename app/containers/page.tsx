"use client";

import { useEffect, useState, useMemo } from "react";
import ProductCard from "@/components/commerce/ProductCard";
import FilterSidebar from "@/components/commerce/FilterSidebar";
import { supabase } from "@/utils/supabase/client";
import { motion } from "framer-motion";
import { containerVariants, fadeInUp } from "@/utils/animations";

export interface FilterState {
    conditions: string[];
    sizes: string[];
    priceMin: number | null;
    priceMax: number | null;
}

export default function ShopPage() {
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
                    if (normalizedFilter === 'used - wwt' || normalizedFilter === 'used - wind & watertight') {
                        return (productCondition.includes('used') && 
                               (productCondition.includes('wwt') || 
                                productCondition.includes('wind & watertight') || 
                                productCondition.includes('wind and watertight') ||
                                productCondition === 'used - wwt' ||
                                productCondition === 'used - wind & watertight'));
                    }
                    if (normalizedFilter === 'refurbished') {
                        return productCondition.includes('refurbished') || productCondition === 'refurbished';
                    }
                    // Fallback: simple contains check
                    return productCondition.includes(normalizedFilter);
                });
            });
        }

        // Filter by size
        if (filters.sizes.length > 0) {
            filtered = filtered.filter(product => {
                const productSize = product.size?.toLowerCase() || '';
                return filters.sizes.some(filterSize => {
                    const normalizedSize = filterSize.toLowerCase().replace('ft', '').trim();
                    return productSize.includes(normalizedSize);
                });
            });
        }

        // Filter by price range
        if (filters.priceMin !== null && filters.priceMin !== undefined) {
            filtered = filtered.filter(product => {
                const price = parseFloat(product.price) || 0;
                return price >= filters.priceMin!;
            });
        }

        if (filters.priceMax !== null && filters.priceMax !== undefined) {
            filtered = filtered.filter(product => {
                const price = parseFloat(product.price) || 0;
                return price <= filters.priceMax!;
            });
        }

        return filtered;
    }, [allProducts, filters]);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-900 py-12 text-center"
            >
                <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-2">
                    Shop All Containers
                </h1>
                <p className="text-slate-400 max-w-xl mx-auto">
                    Explore our inventory of new and used shipping containers.
                    Filter by size, condition, and price to find exactly what you need.
                </p>
            </motion.div>

            <div className="container-safe py-8 flex items-start gap-8">
                <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />

                <div className="flex-1">
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
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                                    No products found matching your criteria.
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
