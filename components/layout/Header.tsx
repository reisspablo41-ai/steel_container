"use client";

import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function Header() {
    const itemsCount = useCartStore(state => state.totalItems());
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="container-safe h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <div className="w-8 h-8 bg-brand-orange rounded-sm flex items-center justify-center">
                        <span className="text-white font-bold font-heading text-lg">C</span>
                    </div>
                    <span className="text-xl font-heading font-bold text-slate-900 tracking-tight">
                        STEEL <span className="text-brand-orange">CONTAINER</span> STORE
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/containers" className="text-sm font-medium text-slate-600 hover:text-brand-orange transition-colors">
                        SHOP ALL
                    </Link>
                    <Link href="/rent" className="text-sm font-medium text-slate-600 hover:text-brand-orange transition-colors">
                        FOR RENT
                    </Link>
                    <Link href="/customizations" className="text-sm font-medium text-slate-600 hover:text-brand-orange transition-colors">
                        CUSTOMIZATION
                    </Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link href="/cart" className="relative p-2 text-slate-600 hover:text-brand-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>
                        <ShoppingCart size={24} />
                        {mounted && itemsCount > 0 && (
                            <span className="absolute top-0 right-0 w-4 h-4 bg-brand-orange text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                                {itemsCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden p-2 text-slate-600 hover:text-brand-orange transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div 
                className={`md:hidden fixed inset-0 top-16 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <nav className="flex flex-col h-full">
                    <div className="container-safe py-6">
                        <Link 
                            href="/containers" 
                            className="block py-4 text-lg font-medium text-slate-600 hover:text-brand-orange transition-colors border-b border-slate-200"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            SHOP ALL
                        </Link>
                        <Link 
                            href="/rent" 
                            className="block py-4 text-lg font-medium text-slate-600 hover:text-brand-orange transition-colors border-b border-slate-200"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            FOR RENT
                        </Link>
                        <Link 
                            href="/customizations" 
                            className="block py-4 text-lg font-medium text-slate-600 hover:text-brand-orange transition-colors border-b border-slate-200"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            CUSTOMIZATION
                        </Link>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-slate-900/50 z-30 top-16"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </header>
    );
}
