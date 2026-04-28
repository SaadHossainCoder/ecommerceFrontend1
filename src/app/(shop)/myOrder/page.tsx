"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Package,
    Truck,
    CheckCircle2,
    Clock,
    ChevronDown,
    Search,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const orders = [
    {
        id: "ROY-8821-XJ",
        date: "January 15, 2024",
        status: "Delivered",
        total: 7499.00,
        items: [
            { name: "Golden Imperial Bracelet", price: 4200.00, quantity: 1, image: "https://i.pinimg.com/736x/35/c2/22/35c2222860cd7dde4454496c6ba04974.jpg" },
            { name: "Royal Silk Saree", price: 3299.00, quantity: 1, image: "https://i.pinimg.com/1200x/d5/38/6b/d5386bfba81fe6a107e5d7e008c2fefd.jpg" },
        ],
        tracking: "1Z999AA10123456784",
    },
    {
        id: "ROY-8819-MC",
        date: "January 10, 2024",
        status: "Shipped",
        total: 1599.00,
        items: [
            { name: "Terracotta Vase Set", price: 1599.00, quantity: 1, image: "https://i.pinimg.com/736x/7d/bf/97/7dbf978b8b87002fe1f36ddac902e1b1.jpg" },
        ],
        tracking: "1Z999AA10123456783",
    },
    {
        id: "ROY-8815-BK",
        date: "January 5, 2024",
        status: "Processing",
        total: 8990.00,
        items: [
            { name: "Handwoven Carpet", price: 8990.00, quantity: 1, image: "https://i.pinimg.com/736x/ac/d1/77/acd17787d04d65598377b555eef7727f.jpg" },
        ],
        tracking: null,
    },
];

const getStatusConfig = (status: string) => {
    switch (status) {
        case "Delivered":
            return { icon: CheckCircle2, color: "success" as const, bg: "bg-emerald-50 text-emerald-600", border: "border-emerald-200" };
        case "Shipped":
            return { icon: Truck, color: "default" as const, bg: "bg-blue-50 text-blue-600", border: "border-blue-200" };
        case "Processing":
            return { icon: Clock, color: "warning" as const, bg: "bg-amber-50 text-amber-600", border: "border-amber-200" };
        default:
            return { icon: Package, color: "default" as const, bg: "bg-stone-50 text-stone-600", border: "border-stone-200" };
    }
};

export default function MyOrdersPage() {
    const [expandedOrder, setExpandedOrder] = useState<string | null>(orders[0].id);

    const toggleOrder = (id: string) => {
        setExpandedOrder(expandedOrder === id ? null : id);
    };

    return (
        <section className="bg-[#FAF9F6] min-h-screen">
            <div className="container-custom py-12 lg:py-24 max-w-6xl mx-auto md:px-6">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400">Personal Vault</span>
                        <h1 className="text-5xl md:text-6xl font-serif text-stone-900 leading-tight">Order <span className="italic text-stone-400">History</span></h1>
                        <p className="text-stone-500 max-w-md font-light text-lg">
                            Trace the journey of your acquired treasures and legacy pieces.
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative flex-1 sm:flex-none">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <Input 
                                placeholder="Search orders..." 
                                className="pl-11 pr-4 w-full sm:w-[260px] h-12 bg-white border-stone-200 focus:border-stone-900 transition-all rounded-full text-sm" 
                            />
                        </div>
                        <Button variant="outline" className="h-12 px-6 border-stone-200 bg-white hover:bg-stone-50 rounded-full gap-2 text-[10px] uppercase tracking-widest font-bold">
                            <Filter className="w-4 h-4" /> Filter
                        </Button>
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div
                        className="bg-white border border-dashed border-stone-200 p-20 rounded-[2rem] text-center"
                    >
                        <div className="h-24 w-24 rounded-full bg-stone-50 mx-auto flex items-center justify-center mb-8 border border-stone-100">
                            <Package className="h-10 w-10 text-stone-300" />
                        </div>
                        <h3 className="text-3xl font-serif mb-4 text-stone-900">No acquisitions yet</h3>
                        <p className="text-stone-400 mb-10 max-w-sm mx-auto font-light leading-relaxed">
                            Your vault is currently empty. Explore our collection to begin your legacy.
                        </p>
                        <Button asChild className="rounded-full bg-stone-900 text-white hover:bg-stone-800 px-10 h-14 text-[10px] uppercase tracking-[0.25em] font-bold">
                            <Link href="/products">Visit Gallery</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {orders.map((order, index) => {
                            const statusConfig = getStatusConfig(order.status);
                            const isExpanded = expandedOrder === order.id;

                            return (
                                <div
                                    className={`group bg-white overflow-hidden transition-all duration-500 ${isExpanded ? "ring-1 ring-stone-900/10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]" : "border border-stone-100 hover:border-stone-200 shadow-sm"}`}
                                >
                                    {/* Order Header */}
                                    <button
                                        onClick={() => toggleOrder(order.id)}
                                        className="w-full p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className={`h-16 w-16 shrink-0 ${statusConfig.bg} border ${statusConfig.border} rounded-2xl flex items-center justify-center transition-colors`}>
                                                <statusConfig.icon className="h-7 w-7" />
                                            </div>
                                            <div className="space-y-1.5 min-w-0">
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <p className="text-xl font-bold text-stone-900 font-serif">{order.id}</p>
                                                    <Badge className={cn("rounded-full px-3 py-1 text-[8px] uppercase tracking-widest font-bold", statusConfig.bg, "border", statusConfig.border)}>
                                                        {order.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                                    <span>{order.date}</span>
                                                    <span className="w-1 h-1 rounded-full bg-stone-200"></span>
                                                    <span>{order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end gap-10 w-full md:w-auto">
                                            <div className="md:text-right">
                                                <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-1">Total Amount</p>
                                                <p className="text-2xl font-serif font-medium text-stone-900">₹{order.total.toLocaleString()}</p>
                                            </div>
                                            <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-all duration-500 ${isExpanded ? "bg-stone-900 text-white rotate-180" : "bg-stone-50 text-stone-400 group-hover:bg-stone-100 group-hover:text-stone-900"}`}>
                                                <ChevronDown className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </button>

                                    {/* Order Details */}
                                    {isExpanded && (
                                        <div className="px-6 pb-6 md:px-10 md:pb-10">
                                            <Separator className="bg-stone-100 mb-8" />
                                            <div className="grid lg:grid-cols-3 gap-12">
                                                {/* Items List */}
                                                <div className="lg:col-span-2 space-y-8">
                                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400 mb-6">Acquired Items</h4>
                                                    <div className="space-y-8">
                                                        {order.items.map((item, index) => (
                                                            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-6 group/item">
                                                                <div className="h-24 w-24 relative bg-stone-50 rounded-2xl overflow-hidden shrink-0 border border-stone-100">
                                                                    <img src={item.image} alt={item.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                                                        <div className="space-y-1">
                                                                            <p className="font-serif text-lg text-stone-900 leading-tight">{item.name}</p>
                                                                            <p className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">
                                                                                Quantity: {item.quantity}
                                                                            </p>
                                                                        </div>
                                                                        <p className="font-medium text-stone-900 text-lg">₹{item.price.toLocaleString()}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Status & Actions */}
                                                <div className="space-y-10">
                                                    {order.tracking && (
                                                        <div className="space-y-4">
                                                            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-400">Shipment Details</h4>
                                                            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                                                                <p className="text-[9px] text-stone-400 uppercase tracking-widest font-bold mb-2">Tracking Number</p>
                                                                <p className="font-mono text-sm font-medium text-stone-900 select-all break-all">{order.tracking}</p>
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="flex flex-col gap-4">
                                                        <Button asChild className="w-full bg-stone-900 text-white hover:bg-stone-800 rounded-full h-14 text-[10px] uppercase tracking-widest font-bold transition-all shadow-lg shadow-stone-200">
                                                            <Link href={`/track-order/${order.id}`}>
                                                                Track Shipment
                                                            </Link>
                                                        </Button>
                                                        <Button variant="outline" className="w-full border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-50 rounded-full h-14 text-[10px] uppercase tracking-widest font-bold transition-all">
                                                            Download Invoice
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
