"use client";

import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";

// User clarified: NEXT_PUBLIC_STORAGE_BUCKET is the bucket name, NEXT_PUBLIC_SUPBASE_STORAGE_BUCKET is the URL
const STORAGE_BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET || 'container_storage';

interface ProductFormProps {
    initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Better state management for images
    const [images, setImages] = useState<{ url: string, file?: File }[]>(
        (initialData?.images || []).map((url: string) => ({ url }))
    );

    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        slug: initialData?.slug || "",
        price: initialData?.price?.toString() || "",
        size: initialData?.size || "20ft",
        type: initialData?.type || "Standard",
        condition: initialData?.condition || "New",
        description: initialData?.description || "",
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const newImages = files.map(file => ({
                url: URL.createObjectURL(file),
                file
            }));
            setImages([...images, ...newImages]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const finalImageUrls: string[] = [];

            // 1. Upload New Images
            for (const img of images) {
                if (img.file) {
                    // Upload new file
                    const file = img.file;
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Math.random()}.${fileExt}`;
                    const filePath = `${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from(STORAGE_BUCKET)
                        .upload(filePath, file);

                    if (uploadError) {
                        console.error("Upload Error Details:", uploadError);
                        alert(`Failed to upload ${file.name}: ${uploadError.message}`);
                        // Continue or break? Let's continue but maybe user misses an image.
                        continue;
                    }

                    const { data: { publicUrl } } = supabase.storage
                        .from(STORAGE_BUCKET)
                        .getPublicUrl(filePath);

                    finalImageUrls.push(publicUrl);
                } else {
                    // Keep existing URL
                    finalImageUrls.push(img.url);
                }
            }

            const productData = {
                ...formData,
                slug: formData.slug || formData.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                price: parseFloat(formData.price),
                images: finalImageUrls.length > 0 ? finalImageUrls : ["https://placehold.co/600x400?text=No+Image"],
                in_stock: true
            };

            let error;

            if (initialData?.id) {
                // Update
                const { error: updateError } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', initialData.id);
                error = updateError;
            } else {
                // Insert
                const { error: insertError } = await supabase
                    .from('products')
                    .insert([productData]);
                error = insertError;
            }

            if (error) throw error;

            alert(initialData ? "Product updated successfully!" : "Product created successfully!");
            router.push("/admin/products");
            router.refresh();

        } catch (error: any) {
            alert("Error: " + error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 max-w-2xl">
            <div className="space-y-6">
                {/* Basic Fields */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Product Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Slug (URL)</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none"
                        placeholder="Auto-generated if empty"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Price ($)</label>
                        <input
                            type="number"
                            required
                            className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Condition</label>
                        <select
                            className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none"
                            value={formData.condition}
                            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                        >
                            <option value="New">New (One Trip)</option>
                            <option value="Used - Wind & Watertight">Used - WWT</option>
                            <option value="Refurbished">Refurbished</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Size</label>
                        <select
                            className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none"
                            value={formData.size}
                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                        >
                            <option value="10ft">10ft</option>
                            <option value="16ft">16ft</option>
                            <option value="20ft">20ft</option>
                            <option value="24ft">24ft</option>
                            <option value="30ft">30ft</option>
                            <option value="40ft">40ft</option>
                            <option value="45ft">45ft</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Type</label>
                        <select
                            className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option value="Standard">Standard</option>
                            <option value="High Cube">High Cube</option>
                            <option value="Refrigerated">Refrigerated</option>
                            <option value="Open Top">Open Top</option>
                            <option value="Double Door">Double Door</option>
                        </select>
                    </div>
                </div>

                {/* Multi-Image Upload */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Product Images</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            {images.map((img, idx) => (
                                <div key={idx} className="relative group">
                                    <img src={img.url} alt="Preview" className="h-24 w-full object-cover rounded" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <label className="cursor-pointer block">
                            <Upload className="mx-auto text-slate-400 mb-2" size={32} />
                            <span className="text-sm text-slate-600 block">Click to upload images</span>
                            <input type="file" multiple className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                    <textarea
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange focus:border-transparent outline-none h-32"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded font-bold text-white transition-colors ${loading ? 'bg-slate-400' : 'bg-brand-orange hover:bg-orange-600'}`}
                >
                    {loading ? (initialData ? 'Updating Product...' : 'Creating Product...') : (initialData ? 'Update Product' : 'Create Product')}
                </button>
            </div>
        </form>
    );
}
