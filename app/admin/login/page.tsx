"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/utils/supabase/client";
import { LogIn, AlertCircle } from "lucide-react";
import Link from "next/link";

function AdminLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam === 'unauthorized') {
            setError('You do not have permission to access the admin panel.');
        }
    }, [searchParams]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Sign in with email and password
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) {
                setError(authError.message || "Invalid email or password");
                setLoading(false);
                return;
            }

            if (!authData.user) {
                setError("Authentication failed. Please try again.");
                setLoading(false);
                return;
            }

            // Check if user is the admin user
            const ADMIN_USER_ID = '5fdb2e0c-c13c-429e-9061-7d937a1c50a4';
            
            if (authData.user.id !== ADMIN_USER_ID) {
                setError("You do not have admin privileges.");
                await supabase.auth.signOut();
                setLoading(false);
                return;
            }

            // Success - redirect to dashboard
            // Wait a moment for session to be established
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Get redirect path or default to admin dashboard
            const redirectPath = searchParams.get('redirect') || '/admin';
            
            // Use router.push for client-side navigation
            router.push(redirectPath);
            router.refresh();
        } catch (err: any) {
            setError(err.message || "An error occurred during login");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Logo/Header */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block mb-4">
                            <div className="text-3xl font-heading font-bold text-slate-900 tracking-tight">
                                STEEL <span className="text-brand-orange">CONTAINER</span> STORE
                            </div>
                        </Link>
                        <h1 className="text-2xl font-heading font-bold text-slate-900 mb-2">Admin Login</h1>
                        <p className="text-slate-600 text-sm">Sign in to access the admin dashboard</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                                placeholder="admin@example.com"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-orange focus:border-brand-orange outline-none"
                                placeholder="Enter your password"
                                disabled={loading}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand-orange text-white py-3 px-4 rounded-lg font-bold hover:bg-orange-600 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    <LogIn size={20} />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <Link
                            href="/"
                            className="text-sm text-slate-600 hover:text-brand-orange transition-colors"
                        >
                            ← Back to website
                        </Link>
                    </div>
                </div>

                {/* Security Notice */}
                <p className="mt-4 text-center text-xs text-slate-500">
                    This is a secure admin area. Unauthorized access is prohibited.
                </p>
            </div>
        </div>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="text-slate-600">Loading...</div>
            </div>
        }>
            <AdminLoginForm />
        </Suspense>
    );
}

