import { Product } from "@/data/products";

interface ProductSpecsProps {
    product: Product;
}

export default function ProductSpecs({ product }: ProductSpecsProps) {
    return (
        <div className="mt-8">
            <h3 className="text-xl font-heading font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">
                Technical Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Condition</span>
                    <span className="font-semibold text-slate-900">{product.condition}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Size</span>
                    <span className="font-semibold text-slate-900">{product.size}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Type</span>
                    <span className="font-semibold text-slate-900">{product.type}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Material</span>
                    <span className="font-semibold text-slate-900">Corten Steel</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Floor Type</span>
                    <span className="font-semibold text-slate-900">Marine Grade Plywood</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-500">Door Opening</span>
                    <span className="font-semibold text-slate-900">Standard Double Doors</span>
                </div>
            </div>

            <div className="mt-8 bg-slate-50 p-6 rounded-lg text-slate-600 space-y-4">
                <h4 className="font-bold text-slate-900">Description</h4>
                <p>
                    This {product.size} {product.type} container is perfect for secure storage or modification projects.
                    Built from corrosion-resistant Corten steel, it ensures durability and longevity.
                    {product.condition === 'New' && " Being a 'One Trip' unit, it is practically new with minimal handling marks."}
                    {product.condition === 'Used - Wind & Watertight' && " This used unit is guaranteed wind and watertight, making it excellent for cost-effective storage."}
                </p>
            </div>
        </div>
    );
}
