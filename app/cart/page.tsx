"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, totalPrice } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (items.length === 0) {
        return (
            <div className="container-safe py-24 text-center">
                <h1 className="text-2xl font-heading font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-slate-600 mb-8">Looks like you haven't added any containers yet.</p>
                <Link href="/containers" className="inline-block bg-brand-orange text-white px-6 py-3 rounded font-bold hover:bg-orange-600 transition-colors">
                    Browse Inventory
                </Link>
            </div>
        );
    }

    return (
        <div className="container-safe py-12">
            <h1 className="text-3xl font-heading font-bold text-slate-900 mb-8">Quote Request Cart</h1>

            <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8">
                    <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm uppercase">
                                <tr>
                                    <th className="p-4 font-medium">Product</th>
                                    <th className="p-4 font-medium">Price</th>
                                    <th className="p-4 font-medium">Quantity</th>
                                    <th className="p-4 font-medium">Total</th>
                                    <th className="p-4 font-medium max-w-[50px]"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                                                    <img src={item.product.images?.[0] || item.product.image || "https://placehold.co/100"} alt={item.product.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">{item.product.name}</h3>
                                                    {item.addons.length > 0 && (
                                                        <p className="text-xs text-slate-500 mt-1">
                                                            + {item.addons.length} Add-ons
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-600">
                                            ${item.pricePerUnit.toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="p-4 font-bold text-slate-900">
                                            ${(item.pricePerUnit * item.quantity).toLocaleString()}
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="bg-slate-50 p-6 rounded-lg sticky top-24">
                        <h3 className="font-bold text-lg mb-4">Summary</h3>
                        <div className="flex justify-between mb-2 text-slate-600">
                            <span>Subtotal</span>
                            <span>${totalPrice().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mb-4 text-slate-600">
                            <span>Delivery</span>
                            <span className="text-xs italic">Calculated at next step</span>
                        </div>
                        <div className="border-t border-slate-200 pt-4 flex justify-between mb-6">
                            <span className="font-bold text-lg text-slate-900">Est. Total</span>
                            <span className="font-bold text-xl text-brand-orange">${totalPrice().toLocaleString()}</span>
                        </div>
                        <Link
                            href="/checkout"
                            className="block w-full text-center bg-brand-orange text-white font-bold py-3.5 rounded hover:bg-orange-600 transition-colors"
                        >
                            Proceed to Quote <ArrowRight size={18} className="inline ml-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
