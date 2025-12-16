"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        revenue: 0,
    });

    useEffect(() => {
        async function fetchStats() {
            // Products count
            const { count: productsCount } = await supabase
                .from('products')
                .select('*', { count: 'exact', head: true });

            // Orders count
            const { count: ordersCount } = await supabase
                .from('orders')
                .select('*', { count: 'exact', head: true });

            // Revenue (sum of total_amount)
            const { data: orders } = await supabase
                .from('orders')
                .select('total_amount');

            const revenue = orders?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

            setStats({
                products: productsCount || 0,
                orders: ordersCount || 0,
                revenue,
            });
        }

        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-heading font-bold text-slate-900">Dashboard Overview</h1>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium">Total Products</span>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Package size={24} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{stats.products}</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium">Total Orders</span>
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <ShoppingCart size={24} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{stats.orders}</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium">Total Revenue</span>
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <DollarSign size={24} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">${stats.revenue.toLocaleString()}</div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 font-medium">Conversion Rate</span>
                        <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                    <div className="text-3xl font-bold text-slate-900">2.4%</div>
                </div>
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Recent Orders</h2>
                <div className="text-slate-500 text-center py-12">
                    No recent orders found.
                </div>
            </div>
        </div>
    );
}
