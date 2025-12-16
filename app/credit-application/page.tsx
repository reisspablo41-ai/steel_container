"use client";

import { useState } from "react";

export default function CreditApplicationPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data: Record<string, string> = {};
        formData.forEach((value, key) => {
            data[key] = value as string;
        });

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'credit-application',
                    data,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error('Email API error response:', result);
                throw new Error(result.details || result.error || 'Failed to send application');
            }

            setStatus('success');
            form.reset();
        } catch (error: any) {
            console.error('Error submitting credit application:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="container-safe py-12 max-w-3xl mx-auto">
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">Application Submitted!</h3>
                    <p className="text-green-700 mb-4">
                        Thank you for your credit application. Our finance team will review it within 2-3 business days.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="text-sm font-bold text-green-800 underline hover:no-underline"
                    >
                        Submit another application
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container-safe py-12 max-w-3xl mx-auto">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-heading font-bold text-slate-900 mb-4">Credit Application</h1>
                <p className="text-slate-600">
                    Apply for a business line of credit to simplify your rentals and purchases. 
                    Fill out the form below and our finance team will review your application within 2-3 business days.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg border border-slate-200 shadow-sm space-y-8">
                {/* Business Info */}
                <section className="space-y-4">
                    <h2 className="text-lg font-bold border-b border-slate-100 pb-2">Business Information</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Legal Business Name</label>
                            <input required name="companyName" type="text" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">DBA (if applicable)</label>
                            <input name="dba" type="text" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Federal Tax ID (EIN)</label>
                            <input name="ein" type="text" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Years in Business</label>
                            <input name="yearsInBusiness" type="number" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
                        </div>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="space-y-4">
                    <h2 className="text-lg font-bold border-b border-slate-100 pb-2">Primary Contact</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">First Name</label>
                            <input required name="firstName" type="text" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Last Name</label>
                            <input required name="lastName" type="text" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Email Address</label>
                            <input required name="email" type="email" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">Phone</label>
                            <input required name="phone" type="tel" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
                        </div>
                    </div>
                </section>

                {/* Financial References */}
                <section className="space-y-4">
                    <h2 className="text-lg font-bold border-b border-slate-100 pb-2">Requested Credit</h2>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700">Requested Limit ($)</label>
                        <input required name="requestedLimit" type="number" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
                    </div>
                </section>

                {status === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700 text-sm">
                        There was an error submitting your application. Please try again or contact us directly.
                    </div>
                )}

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className={`w-full bg-brand-orange text-white font-bold py-4 rounded hover:bg-orange-600 transition-colors ${status === 'submitting' ? 'opacity-75 cursor-wait' : ''}`}
                    >
                        {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
                    </button>
                    <p className="text-xs text-center text-slate-500 mt-4">
                        By submitting this form, you authorize Steel Container Store to perform a credit check.
                    </p>
                </div>
            </form>
        </div>
    );
}
