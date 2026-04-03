"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";

const sampleOrder = {
    id: "SH-INV-00921",
    date: new Date().toLocaleDateString(),
    status: "Verified",
    customer: "Theodore Roosevelt",
    email: "theo@regal.example.com",
    address: "Regal Heights, Estate Path 4, New Delhi, 110001",
    amount: 2549.97
};

const sampleItems = [
    { id: 101, name: "Premium Artisan Sculpture", price: 1250.00, quantity: 1 },
    { id: 102, name: "Vintage Brass Telescope", price: 450.00, quantity: 2 },
    { id: 103, name: "Hand-Woven Silk Tapestry", price: 399.97, quantity: 1 }
];

interface OrderInvoiceProps {
    order?: any;
    items?: any[];
}

export function OrderInvoice({ order = sampleOrder, items = sampleItems }: OrderInvoiceProps) {
    const activeOrder = order || sampleOrder;
    const activeItems = items || sampleItems;

    return (
        <div className="hidden print:block fixed inset-0 z-9999 bg-white text-black p-12 overflow-y-auto print-container">
            <div className="max-w-[800px] mx-auto space-y-8">
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-serif font-bold tracking-tight text-primary">ROYAL GALLERY</h1>
                        <p className="text-sm font-medium opacity-60 uppercase tracking-widest">Heritage & Fine Artistry</p>
                        <div className="mt-4 text-[10px] space-y-0.5 opacity-60">
                            <p>Global Headquarters</p>
                            <p>123 Shantiniketan Heritage Blvd</p>
                            <p>Kolkata, West Bengal 700001</p>
                            <p>contact@royalgallery.com</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-2xl font-serif font-bold uppercase tracking-tight">Invoice</h2>
                        <div className="mt-4 text-xs space-y-1">
                            <p><span className="font-bold opacity-40 uppercase tracking-tighter mr-2">Order Ref:</span> {activeOrder.id}</p>
                            <p><span className="font-bold opacity-40 uppercase tracking-tighter mr-2">Emission Date:</span> {activeOrder.date}</p>
                            <p><span className="font-bold opacity-40 uppercase tracking-tighter mr-2">Voucher Status:</span> {activeOrder.status}</p>
                        </div>
                    </div>
                </div>

                <Separator className="bg-black/10" />

                {/* Addressing */}
                <div className="grid grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 opacity-60">Consignee Details</h3>
                        <div className="text-sm space-y-1">
                            <p className="font-bold text-lg leading-none mb-1">{activeOrder.customer}</p>
                            <p className="text-xs">{activeOrder.email}</p>
                            <p className="mt-4 text-[11px] leading-relaxed max-w-[220px] opacity-70 italic">{activeOrder.address}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 opacity-60">Destination</h3>
                        <div className="text-sm space-y-1">
                            <p className="font-bold">{activeOrder.customer}</p>
                            <p className="text-[11px] leading-relaxed ml-auto max-w-[200px] opacity-70">{activeOrder.address}</p>
                        </div>
                    </div>
                </div>

                {/* Items Table */}
                <div className="mt-12">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-black/5 text-left bg-zinc-50/50">
                                <th className="py-3 px-2 font-bold uppercase tracking-widest text-[9px]">Manifest Item</th>
                                <th className="py-3 text-center font-bold uppercase tracking-widest text-[9px]">Qty</th>
                                <th className="py-3 text-right font-bold uppercase tracking-widest text-[9px]">Unit Value</th>
                                <th className="py-3 px-2 text-right font-bold uppercase tracking-widest text-[9px]">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5">
                            {activeItems.map((item) => (
                                <tr key={item.id} className="hover:bg-zinc-50/20 transition-colors">
                                    <td className="py-5 px-2">
                                        <p className="font-bold tracking-tight">{item.name}</p>
                                        <p className="text-[9px] text-muted-foreground uppercase mt-1 tracking-tighter">SKU-00{item.id}-RG</p>
                                    </td>
                                    <td className="py-5 text-center font-medium">{item.quantity}</td>
                                    <td className="py-5 text-right opacity-80">${item.price.toFixed(2)}</td>
                                    <td className="py-5 px-2 text-right font-bold">${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Summary */}
                <div className="flex justify-end pt-8 border-t border-black/5">
                    <div className="w-64 space-y-3">
                        <div className="flex justify-between text-xs">
                            <span className="opacity-40 uppercase tracking-widest font-bold">Base Total</span>
                            <span className="font-medium">${activeOrder.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="opacity-40 uppercase tracking-widest font-bold">Logistics</span>
                            <span className="text-green-600 font-bold uppercase text-[9px]">Complimentary</span>
                        </div>
                        <Separator className="bg-black/10" />
                        <div className="flex justify-between text-xl font-serif font-bold">
                            <span className="opacity-60">Total Value</span>
                            <span className="text-primary">${activeOrder.amount.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-32 pt-12 border-t border-black/10 text-center space-y-6">
                    <div className="flex justify-center gap-1">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-black/10" />
                        ))}
                    </div>
                    <p className="text-[11px] italic text-muted-foreground whitespace-pre-wrap max-w-lg mx-auto leading-relaxed">
                        This document serves as an official certificate of transaction. The Royal Gallery guarantees the authenticity
                        of all handcrafted artifacts listed herein. Thank you for preserving heritage with us.
                    </p>
                    <div className="flex justify-center gap-12 text-[9px] font-bold uppercase tracking-[0.2em] opacity-30 pt-4">
                        <span>EST. 1992</span>
                        <span>SHANTINIKETAN HERITAGE</span>
                        <span>OFFICIAL RECEIPT</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

