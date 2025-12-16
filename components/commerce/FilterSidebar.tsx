"use client";

import { useState, useEffect } from "react";
import { Filter, X } from "lucide-react";
import { FilterState } from "@/app/containers/page";

interface FilterSidebarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [localFilters, setLocalFilters] = useState<FilterState>(filters);

    // Sync local filters with prop filters
    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleConditionToggle = (condition: string) => {
        const newConditions = localFilters.conditions.includes(condition)
            ? localFilters.conditions.filter(c => c !== condition)
            : [...localFilters.conditions, condition];
        
        const updatedFilters = { ...localFilters, conditions: newConditions };
        setLocalFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handleSizeToggle = (size: string) => {
        const newSizes = localFilters.sizes.includes(size)
            ? localFilters.sizes.filter(s => s !== size)
            : [...localFilters.sizes, size];
        
        const updatedFilters = { ...localFilters, sizes: newSizes };
        setLocalFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const handlePriceChange = (type: 'min' | 'max', value: string) => {
        const numValue = value === '' ? null : parseFloat(value);
        const updatedFilters = {
            ...localFilters,
            [type === 'min' ? 'priceMin' : 'priceMax']: numValue
        };
        setLocalFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const clearFilters = () => {
        const clearedFilters: FilterState = {
            conditions: [],
            sizes: [],
            priceMin: null,
            priceMax: null,
        };
        setLocalFilters(clearedFilters);
        onFilterChange(clearedFilters);
    };

    const hasActiveFilters = 
        localFilters.conditions.length > 0 ||
        localFilters.sizes.length > 0 ||
        localFilters.priceMin !== null ||
        localFilters.priceMax !== null;

    return (
        <>
            {/* Mobile Filter Toggle */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed bottom-6 right-6 z-40 bg-slate-900 text-white p-4 rounded-full shadow-xl flex items-center gap-2 font-bold"
            >
                <Filter size={20} /> Filters
                {hasActiveFilters && (
                    <span className="bg-brand-orange text-white text-xs px-2 py-0.5 rounded-full">
                        {localFilters.conditions.length + localFilters.sizes.length + (localFilters.priceMin !== null ? 1 : 0) + (localFilters.priceMax !== null ? 1 : 0)}
                    </span>
                )}
            </button>

            {/* Sidebar Container */}
            <div className={`
        fixed inset-0 z-50 bg-black/50 lg:hidden transition-opacity duration-300
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `} onClick={() => setIsOpen(false)} />

            <aside className={`
        fixed top-0 left-0 bottom-0 z-50 w-80 bg-white p-6 shadow-2xl overflow-y-auto transform transition-transform duration-300 lg:translate-x-0 lg:static lg:w-64 lg:shadow-none lg:block lg:border-r lg:border-slate-200 lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex justify-between items-center mb-6 lg:hidden">
                    <h2 className="text-xl font-bold text-slate-900">Filters</h2>
                    <button onClick={() => setIsOpen(false)} className="text-slate-500">
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-8">
                    {/* Condition Filter */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Condition</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={localFilters.conditions.includes('New (One Trip)')}
                                    onChange={() => handleConditionToggle('New (One Trip)')}
                                    className="form-checkbox text-brand-orange rounded border-slate-300 focus:ring-brand-orange" 
                                />
                                <span className="text-sm text-slate-600">New (One Trip)</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={localFilters.conditions.includes('Used - WWT')}
                                    onChange={() => handleConditionToggle('Used - WWT')}
                                    className="form-checkbox text-brand-orange rounded border-slate-300 focus:ring-brand-orange" 
                                />
                                <span className="text-sm text-slate-600">Used - WWT</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={localFilters.conditions.includes('Refurbished')}
                                    onChange={() => handleConditionToggle('Refurbished')}
                                    className="form-checkbox text-brand-orange rounded border-slate-300 focus:ring-brand-orange" 
                                />
                                <span className="text-sm text-slate-600">Refurbished</span>
                            </label>
                        </div>
                    </div>

                    {/* Size Filter */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Size</h3>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={localFilters.sizes.includes('10ft')}
                                    onChange={() => handleSizeToggle('10ft')}
                                    className="form-checkbox text-brand-orange rounded border-slate-300 focus:ring-brand-orange" 
                                />
                                <span className="text-sm text-slate-600">10ft</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={localFilters.sizes.includes('20ft')}
                                    onChange={() => handleSizeToggle('20ft')}
                                    className="form-checkbox text-brand-orange rounded border-slate-300 focus:ring-brand-orange" 
                                />
                                <span className="text-sm text-slate-600">20ft</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={localFilters.sizes.includes('30ft')}
                                    onChange={() => handleSizeToggle('30ft')}
                                    className="form-checkbox text-brand-orange rounded border-slate-300 focus:ring-brand-orange" 
                                />
                                <span className="text-sm text-slate-600">30ft</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={localFilters.sizes.includes('40ft')}
                                    onChange={() => handleSizeToggle('40ft')}
                                    className="form-checkbox text-brand-orange rounded border-slate-300 focus:ring-brand-orange" 
                                />
                                <span className="text-sm text-slate-600">40ft</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={localFilters.sizes.includes('45ft')}
                                    onChange={() => handleSizeToggle('45ft')}
                                    className="form-checkbox text-brand-orange rounded border-slate-300 focus:ring-brand-orange" 
                                />
                                <span className="text-sm text-slate-600">45ft</span>
                            </label>
                        </div>
                    </div>

                    {/* Price Range */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Price Range</h3>
                        <div className="flex items-center gap-2 text-sm">
                            <input 
                                type="number" 
                                placeholder="Min" 
                                value={localFilters.priceMin !== null ? localFilters.priceMin : ''}
                                onChange={(e) => handlePriceChange('min', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" 
                            />
                            <span className="text-slate-400">-</span>
                            <input 
                                type="number" 
                                placeholder="Max" 
                                value={localFilters.priceMax !== null ? localFilters.priceMax : ''}
                                onChange={(e) => handlePriceChange('max', e.target.value)}
                                className="w-full px-3 py-2 border border-slate-200 rounded text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" 
                            />
                        </div>
                    </div>

                    {hasActiveFilters && (
                        <button 
                            onClick={clearFilters}
                            className="w-full py-2 bg-slate-200 text-slate-700 font-bold rounded-sm text-sm hover:bg-slate-300 transition-colors"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>
            </aside>
        </>
    );
}
