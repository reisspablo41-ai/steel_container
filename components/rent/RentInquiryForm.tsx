"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function RentInquiryForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            size: formData.get('size') as string,
            condition: formData.get('condition') as string,
            containerType: formData.get('containerType') as string,
            intendedUse: formData.get('intendedUse') as string,
            doorConfiguration: formData.get('doorConfiguration') as string,
            duration: formData.get('duration') as string,
            location: formData.get('location') as string,
            modifications: formData.get('modifications') as string || undefined,
            message: formData.get('message') as string || undefined,
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'rent-inquiry',
                    data,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error('Email API error response:', result);
                throw new Error(result.details || result.error || 'Failed to send email');
            }

            setStatus('success');
            form.reset();
        } catch (error: any) {
            console.error('Error sending rental inquiry:', error);
            setStatus('idle');
            const errorMessage = error.message || 'There was an error submitting your request. Please try again or contact us directly.';
            alert(errorMessage);
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={24} />
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Request Sent!</h3>
                <p className="text-green-700">
                    Thank you for your interest. Our rental team will check availability and send you a custom quote within 24 hours.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-sm font-bold text-green-800 underline hover:no-underline"
                >
                    Send another request
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm">
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6">Request a Rental Quote</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                        <input required name="name" type="text" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                        <input required name="phone" type="tel" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none" placeholder="(555) 123-4567" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                    <input required name="email" type="email" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none" placeholder="john@example.com" />
                </div>

                <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Container Specifications</h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Size Needed</label>
                            <select required name="size" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none">
                                <option value="">Select size...</option>
                                <option>10ft Standard</option>
                                <option>16ft Standard</option>
                                <option>20ft Standard</option>
                                <option>24ft Standard</option>
                                <option>30ft Standard</option>
                                <option>40ft Standard</option>
                                <option>40ft High Cube</option>
                                <option>45ft High Cube</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Condition Preference</label>
                            <select required name="condition" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none">
                                <option value="">Select condition...</option>
                                <option>New (One Trip)</option>
                                <option>Used - Wind & Water Tight</option>
                                <option>Used - Cargo Worthy</option>
                                <option>No Preference</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Container Type</label>
                            <select required name="containerType" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none">
                                <option value="">Select type...</option>
                                <option>Standard Dry Container</option>
                                <option>High Cube Container</option>
                                <option>Refrigerated (Reefer)</option>
                                <option>Open Top</option>
                                <option>Flat Rack</option>
                                <option>Side Door</option>
                                <option>Other (Specify in notes)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Door Configuration</label>
                            <select required name="doorConfiguration" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none">
                                <option value="">Select configuration...</option>
                                <option>Standard (Doors on one end)</option>
                                <option>Double Doors (Doors on both ends)</option>
                                <option>Side Door Access</option>
                                <option>No Preference</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-bold text-slate-700 mb-1">Intended Use</label>
                        <select required name="intendedUse" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none">
                            <option value="">Select use...</option>
                            <option>Storage</option>
                            <option>Shipping/Transport</option>
                            <option>Construction Site</option>
                            <option>Retail/Office Space</option>
                            <option>Event/Exhibition</option>
                            <option>Workshop/Workspace</option>
                            <option>Other (Specify in notes)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Modifications Needed</label>
                        <textarea
                            name="modifications"
                            className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none h-24"
                            placeholder="Describe any modifications needed (e.g. windows, insulation, electrical, shelving, etc.)"
                        ></textarea>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Rental Details</h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Rental Duration</label>
                            <select required name="duration" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none">
                                <option value="">Select duration...</option>
                                <option>1 Month</option>
                                <option>3 Months</option>
                                <option>6 Months</option>
                                <option>12 Months</option>
                                <option>18 Months</option>
                                <option>24+ Months</option>
                                <option>Indefinite/Long-term</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Delivery Zip Code</label>
                            <input required name="location" type="text" className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none" placeholder="12345" />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Additional Notes or Requirements</label>
                    <textarea
                        name="message"
                        className="w-full px-4 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange outline-none h-24"
                        placeholder="Any other specific requirements, questions, or details about your rental needs..."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className={`w-full py-3 rounded font-bold text-white transition-colors ${status === 'submitting' ? 'bg-slate-400' : 'bg-brand-orange hover:bg-orange-600'}`}
                >
                    {status === 'submitting' ? 'Sending Request...' : 'Get Rental Quote'}
                </button>
            </form>
        </div>
    );
}
