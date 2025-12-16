"use client";

import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCartStore();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        
        const orderNumber = `ORD-${Date.now()}`;
        const orderData = {
            orderNumber,
            customerName: `${formData.get('firstName')} ${formData.get('lastName')}`,
            customerEmail: formData.get('email') as string,
            customerPhone: formData.get('phone') as string,
            items: items.map(item => ({
                name: item.product.name,
                quantity: item.quantity,
                price: item.pricePerUnit * item.quantity,
                size: item.product.size,
            })),
            subtotal: totalPrice(),
            deliveryAddress: formData.get('address') as string,
            deliveryCity: formData.get('city') as string,
            deliveryState: formData.get('state') as string,
            deliveryZip: formData.get('zip') as string,
            specialInstructions: formData.get('instructions') as string || undefined,
            timeline: formData.get('timeline') as string || undefined,
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'order-confirmation',
                    data: orderData,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error('Email API error response:', result);
                throw new Error(result.details || result.error || 'Failed to send email');
            }

            setIsSubmitting(false);
            setIsSuccess(true);
            clearCart();
        } catch (error: any) {
            console.error('Error submitting order:', error);
            setIsSubmitting(false);
            const errorMessage = error.message || 'There was an error submitting your order. Please try again or contact us directly.';
            alert(errorMessage);
        }
    };

    if (!mounted) return null;

    if (isSuccess) {
        return (
            <div className="container-safe py-24 text-center max-w-xl mx-auto">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <h1 className="text-3xl font-heading font-bold text-slate-900 mb-4">Quote Request Received!</h1>
                <p className="text-slate-600 mb-8">
                    Thank you for your interest. One of our sales representatives will review your configuration and contact you within 24 hours with a formal quote including delivery.
                </p>
                <div className="bg-slate-50 p-6 rounded text-left mb-8">
                    <p className="text-sm font-bold text-slate-500 uppercase mb-2">Next Steps</p>
                    <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                        <li>We verify inventory availability.</li>
                        <li>We calculate exact delivery usage based on your address.</li>
                        <li>You'll receive a detailed PDF quote via email.</li>
                    </ul>
                </div>
                <a href="/" className="text-brand-orange font-bold hover:underline">Return to Home</a>
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="container-safe py-24 text-center">
                <p>Redirecting to cart...</p>
                {/* In real app, router.push('/cart') */}
            </div>
        );
    }

    return (
        <div className="container-safe py-12">
            <h1 className="text-3xl font-heading font-bold text-slate-900 mb-8 text-center">Request Your Quote</h1>

            <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">

                {/* Form */}
                <div className="lg:col-span-7">
                    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg border border-slate-200 shadow-sm space-y-6">

                        <div className="space-y-4">
                            <h2 className="text-xl font-bold bg-slate-50 p-3 -mx-3 sm:-mx-4 rounded">1. Contact Information</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">First Name <span className="text-red-500">*</span></label>
                                    <input required name="firstName" type="text" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">Last Name <span className="text-red-500">*</span></label>
                                    <input required name="lastName" type="text" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-colors" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Email Address <span className="text-red-500">*</span></label>
                                <input required name="email" type="email" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                                <input required name="phone" type="tel" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h2 className="text-xl font-bold bg-slate-50 p-3 -mx-3 sm:-mx-4 rounded">2. Delivery Details</h2>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Delivery Address <span className="text-red-500">*</span></label>
                                <input required name="address" type="text" placeholder="Street Address" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-colors" />
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                <div className="space-y-1 col-span-2 sm:col-span-1">
                                    <label className="text-sm font-medium text-slate-700">City <span className="text-red-500">*</span></label>
                                    <input required name="city" type="text" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">State <span className="text-red-500">*</span></label>
                                    <input required name="state" type="text" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-medium text-slate-700">ZIP <span className="text-red-500">*</span></label>
                                    <input required name="zip" type="text" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h2 className="text-xl font-bold bg-slate-50 p-3 -mx-3 sm:-mx-4 rounded">3. Project Details</h2>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">When do you need this? <span className="text-red-500">*</span></label>
                                <select required name="timeline" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-colors">
                                    <option>ASAP</option>
                                    <option>Next 30 Days</option>
                                    <option>1-3 Months</option>
                                    <option>Just Budgeting</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-slate-700">Special Instructions / Questions</label>
                                <textarea name="instructions" rows={3} className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-colors"></textarea>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full bg-brand-orange text-white font-bold py-4 rounded shadow-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-75 cursor-wait' : ''}`}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Quote Request'} {isSubmitting ? '' : <ArrowRight size={20} />}
                        </button>
                    </form>
                </div>

                {/* Summary */}
                <div className="lg:col-span-5">
                    <div className="bg-slate-900 text-white rounded-lg p-6 sticky top-24">
                        <h3 className="text-xl font-bold mb-6 pb-4 border-b border-slate-800">Order Summary</h3>

                        <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-16 h-16 bg-slate-800 rounded overflow-hidden flex-shrink-0">
                                        <img src={item.product.images?.[0] || item.product.image || "https://placehold.co/100"} alt={item.product.name} className="w-full h-full object-cover opacity-80" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-sm">{item.product.name}</h4>
                                            <span className="text-sm font-mono">${(item.pricePerUnit * item.quantity).toLocaleString()}</span>
                                        </div>
                                        <p className="text-xs text-slate-400">Qty: {item.quantity} | Size: {item.product.size}</p>
                                        {item.addons.length > 0 && <p className="text-xs text-brand-orange mt-1">w/ {item.addons.length} Add-ons</p>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-slate-800 pt-4 space-y-2">
                            <div className="flex justify-between text-slate-400 text-sm">
                                <span>Item Subtotal</span>
                                <span>${totalPrice().toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-slate-400 text-sm">
                                <span>Est. Delivery</span>
                                <span>TBD</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold pt-2 text-white">
                                <span>Est. Total</span>
                                <span>${totalPrice().toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
