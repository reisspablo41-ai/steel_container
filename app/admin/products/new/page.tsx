import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-heading font-bold text-slate-900 mb-8">Add New Product</h1>
            <ProductForm />
        </div>
    );
}
