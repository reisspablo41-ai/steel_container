"use client";

import { useState, useEffect } from "react";

interface ProductGalleryProps {
    mainImage: string;
    productName: string;
    images?: string[];
}

export default function ProductGallery({ mainImage, productName, images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(mainImage);

    // Use passed images or fallback to mainImage (wrapped in array)
    // Filter out duplicates just in case
    const galleryImages = images && images.length > 0
        ? images
        : [mainImage];

    const uniqueImages = Array.from(new Set(galleryImages));

    // Update selected image if mainImage changes (e.g. on navigation)
    useEffect(() => {
        setSelectedImage(mainImage);
    }, [mainImage]);

    return (
        <div className="space-y-4">
            <div className="aspect-[4/3] w-full bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                <img
                    src={selectedImage}
                    alt={productName}
                    className="w-full h-full object-cover"
                />
            </div>

            {uniqueImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {uniqueImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(img)}
                            className={`
                                relative flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border-2 
                                ${selectedImage === img ? 'border-brand-orange' : 'border-transparent'}
                            `}
                        >
                            <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
