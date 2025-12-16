"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const form = e.currentTarget;
        const formData = new FormData(form);

        const data = {
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            email: formData.get('email') as string,
            subject: formData.get('subject') as string,
            message: formData.get('message') as string,
        };

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'contact-form',
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
            console.error('Error sending contact form:', error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700 mb-4">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-sm font-bold text-green-800 underline hover:no-underline"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">First Name</label>
                    <input required name="firstName" type="text" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Last Name</label>
                    <input required name="lastName" type="text" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
                </div>
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input required name="email" type="email" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange" />
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Subject</label>
                <select required name="subject" className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange">
                    <option>Sales Inquiry</option>
                    <option>Support / Logistics</option>
                    <option>Partnership</option>
                    <option>Other</option>
                </select>
            </div>
            <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Message</label>
                <textarea required name="message" rows={5} className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange"></textarea>
            </div>
            {status === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded p-4 text-red-700 text-sm">
                    There was an error sending your message. Please try again or contact us directly.
                </div>
            )}
            <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={{ scale: status === 'submitting' ? 1 : 1.05 }}
                whileTap={{ scale: status === 'submitting' ? 1 : 0.95 }}
                className={`bg-brand-orange text-white px-8 py-3 font-bold rounded hover:bg-orange-600 transition-colors ${status === 'submitting' ? 'opacity-75 cursor-wait' : ''}`}
            >
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </motion.button>
        </form>
    );
}

