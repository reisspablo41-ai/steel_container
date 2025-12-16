"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase/client";
import { Plus, Edit, Trash } from "lucide-react";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setProducts(data);
        setLoading(false);
    }

    async function handleDelete(id: string) {
        if (!confirm("Are you sure you want to delete this product?")) return;

        await supabase.from('products').delete().eq('id', id);
        fetchProducts();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-heading font-bold text-slate-900">Products</h1>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-brand-orange text-white px-6 py-2 rounded font-bold hover:bg-orange-600 transition-colors"
                >
                    <Plus size={20} /> Add Product
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-slate-700 text-sm uppercase">Image</th>
                            <th className="px-6 py-4 font-bold text-slate-700 text-sm uppercase">Name</th>
                            <th className="px-6 py-4 font-bold text-slate-700 text-sm uppercase">Type</th>
                            <th className="px-6 py-4 font-bold text-slate-700 text-sm uppercase">Price</th>
                            <th className="px-6 py-4 font-bold text-slate-700 text-sm uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {products.length === 0 && !loading && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    No products found. Add one to get started.
                                </td>
                            </tr>
                        )}
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <img
                                        src={product.images?.[0] || product.image || "https://placehold.co/100"}
                                        alt={product.name}
                                        className="w-12 h-12 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium text-slate-900">{product.name}</td>
                                <td className="px-6 py-4 text-slate-600">
                                    <span className="text-xs font-bold uppercase bg-slate-100 px-2 py-1 rounded text-slate-600 mr-2">{product.size}</span>
                                    {product.type}
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-900">${product.price.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <Link href={`/admin/products/edit/${product.id}`} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></Link>
                                        <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700"><Trash size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
