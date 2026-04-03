"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    Package,
    Truck,
    CheckCircle2,
    Clock,
    ChevronDown,
    // ArrowRight,
    Search,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// import { PageTransition } from "@/components/layout/PageTransition";
import { Input } from "@/components/ui/input";

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
        <section>
            <div className="bg-[#FAF9F6] min-h-screen">
                <div className="container-custom py-12 lg:py-20">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                        <div className="space-y-4">
                            <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent">Personal Vault</span>
                            <h1 className="text-4xl md:text-5xl font-heading font-black text-primary">Order History</h1>
                            <p className="text-muted-foreground/80 max-w-md font-body">
                                Trace the journey of your acquired heirlooms.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input placeholder="Search orders..." className="pl-9 w-[200px] bg-white border-primary/10 focus:border-primary/30 transition-all rounded-none" />
                            </div>
                            <Button variant="outline" className="border-primary/10 bg-white hover:bg-stone-50 rounded-none gap-2">
                                <Filter className="w-4 h-4" /> Filter
                            </Button>
                        </div>
                    </div>

                    {orders.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-dashed border-primary/20 p-20 text-center"
                        >
                            <div className="h-20 w-20 rounded-full bg-primary/5 mx-auto flex items-center justify-center mb-6">
                                <Package className="h-10 w-10 text-primary/40" />
                            </div>
                            <h3 className="text-2xl font-heading font-medium mb-3 text-primary">No acquisitions yet</h3>
                            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                                Your vault is currently empty. Explore our collection to begin your legacy.
                            </p>
                            <Button asChild className="rounded-none bg-primary text-white hover:bg-primary/90 px-8 h-12 text-xs uppercase tracking-widest font-black">
                                <Link href="/products">Visit Gallery</Link>
                            </Button>
                        </motion.div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => {
                                const statusConfig = getStatusConfig(order.status);
                                const isExpanded = expandedOrder === order.id;

                                return (
                                    <div
                                        key={order.id}
                                        className={`group bg-white border transition-all duration-300 ${isExpanded ? "border-primary/20 shadow-royal" : "border-primary/5 hover:border-primary/20 hover:shadow-sm"}`}
                                    >
                                        {/* Order Header */}
                                        <button
                                            onClick={() => toggleOrder(order.id)}
                                            className="w-full p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
                                        >
                                            <div className="flex items-start md:items-center gap-6 text-left">
                                                <div
                                                    className={`h-14 w-14 ${statusConfig.bg} border ${statusConfig.border} flex items-center justify-center transition-colors`}
                                                >
                                                    <statusConfig.icon className="h-6 w-6" />
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-3">
                                                        <p className="text-lg font-bold font-heading text-primary">{order.id}</p>
                                                        {isExpanded && <Badge variant={statusConfig.color} className="rounded-none px-2 py-0.5 text-[9px] uppercase tracking-wider">{order.status}</Badge>}
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                        <span>{order.date}</span>
                                                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30"></span>
                                                        <span>{order.items.length} Items</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto pl-20 md:pl-0">
                                                <div className="text-left md:text-right">
                                                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/70 mb-1">Total Amount</p>
                                                    <p className="text-xl font-bold text-primary font-heading">₹{order.total.toLocaleString()}</p>
                                                </div>
                                                <div className={`p-2 rounded-full transition-all duration-300 ${isExpanded ? "bg-primary text-white rotate-180" : "bg-stone-100 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"}`}>
                                                    <ChevronDown className="h-5 w-5" />
                                                </div>
                                            </div>
                                        </button>

                                        {/* Order Details */}
                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "circOut" }}
                                                    className="overflow-hidden bg-stone-50/50 block"
                                                >
                                                    <Separator className="opacity-50" />
                                                    <div className="p-6 md:p-8">
                                                        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                                                            {/* Items List */}
                                                            <div className="md:col-span-2 space-y-6">
                                                                <h4 className="text-xs font-black uppercase tracking-widest text-primary/60 mb-6">Acquired Items</h4>
                                                                <div className="space-y-6">
                                                                    {order.items.map((item, index) => (
                                                                        <div
                                                                            key={index}
                                                                            className="flex items-center gap-6 group/item"
                                                                        >
                                                                            <div className="h-20 w-20 relative bg-white border border-primary/10 overflow-hidden shrink-0">
                                                                                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                                                            </div>
                                                                            <div className="flex-1 min-w-0">
                                                                                <p className="font-bold text-primary font-heading truncate">{item.name}</p>
                                                                                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                                                                                    Quantity: {item.quantity}
                                                                                </p>
                                                                            </div>
                                                                            <p className="font-semibold text-primary">₹{item.price.toLocaleString()}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            {/* Status & Actions */}
                                                            <div className="space-y-8">
                                                                {order.tracking && (
                                                                    <div>
                                                                        <h4 className="text-xs font-black uppercase tracking-widest text-primary/60 mb-4">Shipment Details</h4>
                                                                        <div className="bg-white p-4 border border-primary/10">
                                                                            <p className="text-xs text-muted-foreground uppercase mb-1">Tracking Number</p>
                                                                            <p className="font-mono text-sm font-medium text-primary select-all">{order.tracking}</p>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                <div className="flex flex-col gap-3 pt-2">
                                                                    <Button asChild className="w-full bg-white border border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-none h-12 text-xs uppercase tracking-widest font-bold">
                                                                        <Link href={`/track-order/${order.id}`}>
                                                                            Track Shipment
                                                                        </Link>
                                                                    </Button>
                                                                    <Button variant="outline" className="w-full border-primary/10 text-muted-foreground hover:text-primary rounded-none h-12 text-xs uppercase tracking-widest font-bold">
                                                                        Download Invoice
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
