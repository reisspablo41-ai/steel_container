"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchPage() {
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement search logic or redirect to shop with filter
    };

    return (
        <div className="container-safe py-24 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-heading font-bold text-slate-900 mb-8">Search Site</h1>
            
            <form onSubmit={handleSearch} className="relative">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for containers, parts, or articles..." 
                    className="w-full pl-6 pr-14 py-4 border-2 border-slate-200 rounded-lg shadow-sm text-lg focus:outline-none focus:border-brand-orange transition-colors"
                />
                <button type="submit" className="absolute right-3 top-3 p-2 bg-brand-orange text-white rounded hover:bg-orange-600 transition-colors">
                    <Search size={20} />
                </button>
            </form>

            <div className="mt-12 text-left">
                <h3 className="font-bold text-slate-900 mb-4">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                    {['20ft Container', '40ft High Cube', 'Refrigerated', 'Office', 'Delivery', 'Lockbox'].map(tag => (
                        <a key={tag} href="#" className="px-4 py-2 bg-slate-100 rounded-full text-slate-600 text-sm hover:bg-slate-200 transition-colors">
                            {tag}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
