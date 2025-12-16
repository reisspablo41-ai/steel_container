"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import ProductForm from "@/components/admin/ProductForm";

export default function EditProductPage() {
    const params = useParams();
    const id = params.id as string;
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchProduct();
        }
    }, [id]);

    async function fetchProduct() {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error("Error fetching product:", error);
            alert("Product not found or error loading.");
        } else {
            setProduct(data);
        }
        setLoading(false);
    }

    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found.</div>;

    return (
        <div>
            <h1 className="text-3xl font-heading font-bold text-slate-900 mb-8">Edit Product</h1>
            <ProductForm initialData={product} />
        </div>
    );
}
