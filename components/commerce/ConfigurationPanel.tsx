"use client";

import { useState } from "react";
import { Product } from "@/data/products";
import { Check, Info, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface ConfigurationPanelProps {
    product: Product;
}

export default function ConfigurationPanel({ product }: ConfigurationPanelProps) {
    const [addons, setAddons] = useState<string[]>([]);
    const addToCart = useCartStore(state => state.addToCart);

    const ADDONS = [
        { id: 'lockbox', name: 'Security Lockbox', price: 150 },
        { id: 'rollup', name: 'Roll-up Door', price: 1200 },
        { id: 'vents', name: 'Extra Vents (x2)', price: 350 },
        { id: 'paint', name: 'Custom Paint Job', price: 850 },
    ];

    const toggleAddon = (id: string) => {
        setAddons(curr =>
            curr.includes(id)
                ? curr.filter(x => x !== id)
                : [...curr, id]
        );
    };

    const addonsTotal = ADDONS
        .filter(a => addons.includes(a.id))
        .reduce((sum, a) => sum + a.price, 0);

    const estimatedTotal = product.price + addonsTotal;

    const handleAddToCart = () => {
        addToCart(product, addons, estimatedTotal);
        // Simple visual feedback
        const btn = document.getElementById('add-btn');
        if (btn) {
            const originalText = btn.innerHTML;
            btn.innerHTML = `<span class="flex items-center gap-2">Added!</span>`;
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-lg sticky top-24">
            <h3 className="text-xl font-heading font-bold text-slate-900 mb-6">Configuration</h3>

            {/* Base Price */}
            <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-100">
                <span className="text-slate-600">Base Unit Price</span>
                <span className="font-bold text-lg">${product.price.toLocaleString()}</span>
            </div>

            {/* Add-ons */}
            <div className="space-y-4 mb-8">
                <h4 className="font-bold text-sm uppercase text-slate-500 tracking-wide mb-2">Popular Add-ons</h4>
                {ADDONS.map(addon => (
                    <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`
                            cursor-pointer border rounded p-3 flex justify-between items-center transition-all
                            ${addons.includes(addon.id) ? 'border-brand-orange bg-orange-50' : 'border-slate-200 hover:border-brand-orange/50'}
                        `}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`
                                w-5 h-5 rounded border flex items-center justify-center
                                ${addons.includes(addon.id) ? 'bg-brand-orange border-brand-orange text-white' : 'border-slate-300'}
                            `}>
                                {addons.includes(addon.id) && <Check size={14} strokeWidth={3} />}
                            </div>
                            <span className="text-sm font-medium text-slate-700">{addon.name}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-900">+${addon.price}</span>
                    </div>
                ))}
            </div>

            {/* Total */}
            <div className="bg-slate-50 p-4 rounded mb-6">
                <div className="flex justify-between items-end mb-1">
                    <span className="text-sm font-bold text-slate-500">Estimated Total</span>
                    <span className="text-3xl font-heading font-bold text-brand-orange">
                        ${estimatedTotal.toLocaleString()}
                    </span>
                </div>
                <p className="text-xs text-slate-400 text-right">*Excludes delivery</p>
            </div>

            {/* Actions */}
            <button
                id="add-btn"
                onClick={handleAddToCart}
                className="w-full bg-brand-orange text-white font-bold py-4 px-6 rounded shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-lg"
            >
                <ShoppingCart size={24} />
                Add to Cart & Quote
            </button>

            <p className="mt-4 text-xs text-center text-slate-500 flex items-center justify-center gap-1">
                <Info size={14} />
                No payment required at this step.
            </p>
        </div>
    );
}
