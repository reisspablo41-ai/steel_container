"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Package, ShoppingCart, Settings, LogOut, User, Menu, X } from "lucide-react";
import { supabase } from "@/utils/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Skip auth check for login page
    const isLoginPage = pathname === '/admin/login';

    useEffect(() => {
        // If we're on the login page, don't check auth
        if (isLoginPage) {
            setLoading(false);
            return;
        }

        async function checkAuth() {
            // Get current user
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            
            if (authError || !user) {
                router.push('/admin/login');
                return;
            }

            // Verify user is the admin user
            const ADMIN_USER_ID = '5fdb2e0c-c13c-429e-9061-7d937a1c50a4';
            
            if (user.id !== ADMIN_USER_ID) {
                await supabase.auth.signOut();
                router.push('/admin/login?error=unauthorized');
                return;
            }

            setUser(user);
            setLoading(false);
        }

        checkAuth();

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (!session?.user) {
                router.push('/admin/login');
                return;
            }

            // Verify user is the admin user
            const ADMIN_USER_ID = '5fdb2e0c-c13c-429e-9061-7d937a1c50a4';
            
            if (session.user.id !== ADMIN_USER_ID) {
                await supabase.auth.signOut();
                router.push('/admin/login?error=unauthorized');
                return;
            }

            setUser(session.user);
        });

        return () => subscription.unsubscribe();
    }, [router, isLoginPage]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
        router.refresh();
    };

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    // Close mobile menu when route changes
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [pathname]);

    // If on login page, render children without sidebar
    if (isLoginPage) {
        return <>{children}</>;
    }

    if (loading) {
        return (
            <div className="flex h-screen bg-slate-100 items-center justify-center">
                <div className="text-slate-600">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-slate-100">
            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50
                    w-64 bg-slate-900 text-slate-300 flex flex-col
                    transform transition-transform duration-300 ease-in-out
                    ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="p-6 flex items-center justify-between">
                    <Link href="/admin" className="text-2xl font-heading font-bold text-white tracking-tight">
                        ADMIN<span className="text-brand-orange">PANEL</span>
                    </Link>
                    <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="lg:hidden text-slate-400 hover:text-white transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    <Link
                        href="/admin"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            pathname === '/admin' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href="/admin/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            pathname?.startsWith('/admin/products') ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <Package size={20} />
                        <span>Products</span>
                    </Link>
                    <Link
                        href="/admin/orders"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            pathname === '/admin/orders' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <ShoppingCart size={20} />
                        <span>Orders</span>
                    </Link>
                    <Link
                        href="/admin/settings"
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            pathname === '/admin/settings' ? 'bg-slate-800 text-white' : 'hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                        <Settings size={20} />
                        <span>Settings</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800 space-y-2">
                    {user && (
                        <div className="flex items-center gap-3 px-4 py-2 text-sm text-slate-400">
                            <User size={16} />
                            <span className="truncate">{user.email}</span>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg hover:bg-red-900/20 hover:text-red-400 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto w-full lg:w-auto">
                {/* Mobile Header with Menu Button */}
                <div className="lg:hidden bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="text-slate-700 hover:text-slate-900 transition-colors"
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="text-lg font-heading font-bold text-slate-900">
                        ADMIN<span className="text-brand-orange">PANEL</span>
                    </div>
                    <div className="w-6" /> {/* Spacer for centering */}
                </div>
                <div className="p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
