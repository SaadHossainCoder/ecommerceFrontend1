"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Truck, 
    Globe, 
    Clock,
    MapPin, 
    Sparkles, 
    Box, 
    Shield, 
    PackageCheck, 
    Zap,
    ChevronRight
} from "lucide-react";

const sections = [
    { id: "tracking", title: "Track Your Order", icon: PackageCheck, num: "01" },
    { id: "safety", title: "Safe Arrival", icon: Shield, num: "02" },
    { id: "standard", title: "Standard Delivery", icon: Box, num: "03" },
    { id: "express", title: "Express Delivery", icon: Zap, num: "04" },
    { id: "priority", title: "Next Day Priority", icon: Sparkles, num: "05" },
    { id: "global", title: "Global Concierge", icon: Globe, num: "06" },
    { id: "processing", title: "Order Processing", icon: Clock, num: "07" },
    { id: "coverage", title: "Global Reach", icon: MapPin, num: "08" },
];

export default function ShippingPage() {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({
                top: el.offsetTop - 100,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="min-h-screen bg-[#faf9f6] text-stone-900 selection:bg-stone-200">
            {/* ── Dynamic Hero ── */}
            <div className="relative overflow-hidden bg-white border-b border-stone-200 py-24 md:py-32">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <p className="text-[11px] uppercase tracking-[0.5em] font-bold text-stone-400 mb-6">
                            Global Logistics & Excellence
                        </p>
                        <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
                            Shipping <br />
                            <span className="text-stone-400 italic">Excellence</span>
                        </h1>
                        <p className="text-lg text-stone-500 leading-relaxed max-w-xl">
                            Every package is handled with the same care and precision we use to create our products. Your luxury journey starts the moment you order.
                        </p>
                        <div className="mt-12 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center">
                                        <Truck className="w-4 h-4 text-stone-400" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
                                Always Reliable
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32">
                <div className="flex flex-col lg:flex-row gap-20">
                    
                    {/* ── Sidebar Navigation ── */}
                    <aside className="lg:w-1/4 hidden lg:block sticky top-32 h-fit">
                        <nav className="space-y-1">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollTo(section.id)}
                                    className="w-full text-left group flex items-center justify-between p-3 rounded-lg transition-all hover:bg-stone-100 text-stone-500"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-mono text-stone-300">
                                            {section.num}
                                        </span>
                                        <span className="text-sm font-medium tracking-tight">
                                            {section.title}
                                        </span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 transition-transform opacity-0 group-hover:opacity-100" />
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* ── Main Content ── */}
                    <div className="lg:w-3/4 space-y-32">
                        
                        {/* 01. Tracking */}
                        <section id="tracking" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-stone-900 text-white flex items-center justify-center rounded-2xl shadow-2xl">
                                    <PackageCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-xs font-mono text-stone-400">Section 01</span>
                                    <h2 className="text-3xl font-serif">Track Your Order</h2>
                                </div>
                            </div>
                            <div className="prose prose-stone max-w-none">
                                <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                                    Once your order leaves our studio, you&apos;ll receive a personal tracking link to monitor its journey in real-time.
                                </p>
                            </div>
                        </section>

                        {/* 02. Safety */}
                        <section id="safety" className="scroll-mt-32">
                            <motion.div 
                                whileHover={{ scale: 1.01 }}
                                className="bg-emerald-50 border border-emerald-200 p-10 md:p-16 rounded-[2rem] relative overflow-hidden"
                            >
                                <Shield className="absolute -bottom-10 -right-10 w-64 h-64 text-emerald-200/50" />
                                <div className="relative z-10 max-w-xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-emerald-600 text-white flex items-center justify-center rounded-xl">
                                            <Shield className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-3xl font-serif text-emerald-950">Safe Arrival</h2>
                                    </div>
                                    <p className="text-emerald-800 mb-8 text-lg">Every delivery is fully insured and handled by our network of premium carriers.</p>
                                    <div className="space-y-4">
                                        {[
                                            "Network of premium carriers (UPS, FedEx, DHL)",
                                            "Fully insured during transit",
                                            "100% Carbon Neutral Shipping available"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 text-emerald-900 font-medium">
                                                <div className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </section>

                        {/* 03-06. Delivery Methods */}
                        <section className="scroll-mt-32">
                            <h2 className="text-3xl font-serif mb-10">Delivery Rituals</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { id: "standard", title: "Standard Delivery", desc: "Complimentary on orders over $50. Perfect for your regular indulgence.", time: "3-5 Business Days", cost: "$5.99", icon: Box },
                                    { id: "express", title: "Express Delivery", desc: "When you simply cannot wait to experience the magic.", time: "1-2 Business Days", cost: "$14.99", icon: Zap },
                                    { id: "priority", title: "Next Day Priority", desc: "The fastest way to bring elegance to your doorstep.", time: "Next Business Day", cost: "$24.99", icon: Sparkles },
                                    { id: "global", title: "Global Concierge", desc: "Artisanal quality, delivered to any corner of the world.", time: "7-14 Business Days", cost: "From $19.99", icon: Globe }
                                ].map((method) => (
                                    <div key={method.id} id={method.id} className="p-8 bg-white border border-stone-100 rounded-2xl group hover:border-stone-900 transition-colors">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center">
                                                <method.icon className="w-5 h-5 text-stone-600" />
                                            </div>
                                            <span className="text-xs font-mono font-medium bg-stone-100 px-3 py-1 rounded-full text-stone-600">{method.time}</span>
                                        </div>
                                        <h4 className="text-xl font-serif font-bold text-stone-900 mb-2">{method.title}</h4>
                                        <p className="text-sm text-stone-500 leading-relaxed mb-6 h-10">{method.desc}</p>
                                        <div className="pt-4 border-t border-stone-100">
                                            <span className="text-2xl font-serif text-stone-900">{method.cost}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 07-08. Remaining Sections */}
                        <div className="grid sm:grid-cols-2 gap-8">
                            <section id="processing" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Order Processing</h3>
                                </div>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-stone-500 leading-relaxed marker:text-stone-400">
                                    <li>Orders placed before 2 PM EST ship same business day.</li>
                                    <li>Personalized orders require 24-48 hours.</li>
                                </ul>
                            </section>

                            <section id="coverage" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Global Reach</h3>
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    We do not ship to P.O. Boxes or freight forwarders. Additional taxes and duties may apply to international orders.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* ── Mobile Navigation (Floating) ── */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-stone-900/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl border border-white/10">
                    <Truck className="w-5 h-5 text-white" />
                    <div className="h-4 w-px bg-stone-700" />
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xs text-white/70 uppercase tracking-widest font-bold">Top</button>
                </div>
            </div>
        </section>
    );
}