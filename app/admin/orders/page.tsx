"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { Eye, Clock, CheckCircle, Truck } from "lucide-react";

export default function OrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    async function fetchOrders() {
        const { data: ordersData, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (ordersData) setOrders(ordersData);
        setLoading(false);
    }

    async function updateStatus(id: string, status: string) {
        await supabase.from('orders').update({ status }).eq('id', id);
        fetchOrders();
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed': return <span className="flex items-center gap-1 text-green-600 px-2 py-1 bg-green-50 rounded text-xs font-bold uppercase"><CheckCircle size={14} /> Completed</span>;
            case 'processing': return <span className="flex items-center gap-1 text-blue-600 px-2 py-1 bg-blue-50 rounded text-xs font-bold uppercase"><Truck size={14} /> Processing</span>;
            default: return <span className="flex items-center gap-1 text-amber-600 px-2 py-1 bg-amber-50 rounded text-xs font-bold uppercase"><Clock size={14} /> Pending</span>;
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-heading font-bold text-slate-900 mb-8">Orders & Quotes</h1>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-bold text-slate-700 text-sm uppercase">Order ID</th>
                            <th className="px-6 py-4 font-bold text-slate-700 text-sm uppercase">Customer</th>
                            <th className="px-6 py-4 font-bold text-slate-700 text-sm uppercase">Date</th>
                            <th className="px-6 py-4 font-bold text-slate-700 text-sm uppercase">Total/Quote</th>
                            <th className="px-6 py-4 font-bold text-slate-700 text-sm uppercase">Status</th>
                            <th className="px-6 py-4 font-bold text-slate-700 text-sm uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {orders.length === 0 && !loading && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs text-slate-500">{order.id.slice(0, 8)}...</td>
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900">{order.customer_name}</div>
                                    <div className="text-sm text-slate-500">{order.customer_email}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 font-bold text-slate-900">
                                    {order.total_amount > 0 ? `$${order.total_amount.toLocaleString()}` : 'Quote Request'}
                                </td>
                                <td className="px-6 py-4">
                                    {getStatusBadge(order.status)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <select
                                            className="text-xs border border-slate-300 rounded px-2 py-1"
                                            value={order.status}
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
