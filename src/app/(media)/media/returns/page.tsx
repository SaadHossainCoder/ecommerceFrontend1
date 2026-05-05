"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    CheckCircle, 
    Ban, 
    AlertTriangle, 
    RefreshCcw, 
    ShieldCheck, 
    CreditCard, 
    Clock, 
    Repeat, 
    PackageOpen, 
    XCircle,
    ChevronRight,
    Shield
} from "lucide-react";

const sections = [
    { id: "eligibility", title: "Return Eligibility", icon: CheckCircle, num: "01" },
    { id: "non-returnable", title: "Non-Returnable Items", icon: Ban, num: "02" },
    { id: "damaged", title: "Damaged Items", icon: AlertTriangle, num: "03" },
    { id: "process", title: "Return Process", icon: RefreshCcw, num: "04" },
    { id: "terms", title: "Return Terms", icon: ShieldCheck, num: "05" },
    { id: "refund", title: "Refund Policy", icon: CreditCard, num: "06" },
    { id: "late-refunds", title: "Late Refunds", icon: Clock, num: "07" },
    { id: "exchange", title: "Exchange Policy", icon: Repeat, num: "08" },
    { id: "fragile", title: "Fragile Products", icon: PackageOpen, num: "09" },
    { id: "cancellation", title: "Cancellation Policy", icon: XCircle, num: "10" },
];

export default function ReturnsPage() {
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
                            Customer Care
                        </p>
                        <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
                            Return & <br />
                            <span className="text-stone-400 italic">Refund</span> Policy
                        </h1>
                        <p className="text-lg text-stone-500 leading-relaxed max-w-xl">
                            We want you to have a smooth and satisfying shopping experience. Please review our guidelines carefully before making a purchase.
                        </p>
                        <div className="mt-12 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center">
                                        <RefreshCcw className="w-4 h-4 text-stone-400" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
                                Last Updated: Jan 1, 2024
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
                        
                        {/* 01. Eligibility */}
                        <section id="eligibility" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-stone-900 text-white flex items-center justify-center rounded-2xl shadow-2xl">
                                    <CheckCircle className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-xs font-mono text-stone-400">Section 01</span>
                                    <h2 className="text-3xl font-serif">Return Eligibility</h2>
                                </div>
                            </div>
                            <div className="prose prose-stone max-w-none">
                                <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                                    You may request a return if all the following conditions are met:
                                </p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        "Unused, unworn, original condition",
                                        "Original packaging, tags, accessories",
                                        "Valid proof of purchase",
                                        "Requested within 7 days of delivery"
                                    ].map((item, i) => (
                                        <motion.div 
                                            whileHover={{ x: 5 }}
                                            key={i} 
                                            className="flex items-center gap-4 p-5 bg-white border border-stone-200 rounded-xl"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-stone-900" />
                                            <span className="text-sm font-medium text-stone-700">{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* 02. Non-Returnable */}
                        <section id="non-returnable" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-stone-900 text-white flex items-center justify-center rounded-2xl shadow-2xl">
                                    <Ban className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-xs font-mono text-stone-400">Section 02</span>
                                    <h2 className="text-3xl font-serif">Non-Returnable Items</h2>
                                </div>
                            </div>
                            <div className="bg-stone-50 border border-stone-200 rounded-[2rem] p-10 md:p-16">
                                <p className="text-lg text-stone-600 mb-8 leading-relaxed max-w-2xl">
                                    For safety and hygiene reasons, certain items are strictly non-returnable.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        { title: "Fragile items", desc: "Once delivered safely, damage caused afterward is not accepted." },
                                        { title: "Custom-made", desc: "Personalized products are final sale." },
                                        { title: "Sale Items", desc: "Items on sale or clearance (if applicable)." },
                                        { title: "Used items", desc: "Used, washed, or altered items." },
                                        { title: "Incomplete", desc: "Items without original packaging or tags." }
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center shrink-0 mt-1">
                                                <Ban className="w-3 h-3 text-stone-600" />
                                            </div>
                                            <div>
                                                <strong className="text-stone-900 block mb-1">{item.title}</strong>
                                                <span className="text-sm text-stone-500">{item.desc}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-10 p-4 bg-white rounded-xl text-xs text-stone-500 border border-stone-200 shadow-sm">
                                    <strong className="text-stone-900 uppercase tracking-widest block mb-2">Important Note</strong>
                                    Items such as Furniture and Clay Items are non-returnable and will not be refunded.
                                </div>
                            </div>
                        </section>

                        {/* 03. Damaged Items */}
                        <section id="damaged" className="scroll-mt-32">
                            <motion.div 
                                whileHover={{ scale: 1.01 }}
                                className="bg-orange-50 border border-orange-200 p-10 md:p-16 rounded-[2rem] relative overflow-hidden"
                            >
                                <AlertTriangle className="absolute -bottom-10 -right-10 w-64 h-64 text-orange-200/50" />
                                <div className="relative z-10 max-w-xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-orange-600 text-white flex items-center justify-center rounded-xl">
                                            <AlertTriangle className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-3xl font-serif text-orange-950">Damaged Items</h2>
                                    </div>
                                    <p className="text-orange-800 mb-8 text-lg">We take extra care in packaging fragile items. However, if your order arrives damaged:</p>
                                    <div className="space-y-4">
                                        {[
                                            "Report it within 24–48 hours of delivery",
                                            "Provide clear photos/videos of the product",
                                            "Unboxing video is strongly recommended for fragile items"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 text-orange-900 font-medium">
                                                <div className="w-2 h-2 rounded-full bg-orange-600 shrink-0" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-12 pt-8 border-t border-orange-200/50">
                                        <p className="text-xs uppercase tracking-widest font-bold text-orange-700/60">Strict Requirement</p>
                                        <p className="text-sm text-orange-800 mt-2">Without proof (especially an unboxing video), claims for damage may not be accepted.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </section>

                        {/* 04-10. Remaining Sections */}
                        <div className="grid sm:grid-cols-2 gap-8">
                            <section id="process" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <RefreshCcw className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Return Process</h3>
                                </div>
                                <ol className="list-decimal pl-5 space-y-2 text-sm text-stone-500 leading-relaxed marker:text-stone-400">
                                    <li>Contact us via support</li>
                                    <li>Provide Order ID, reason, and images</li>
                                    <li>Wait 24–48 hours for approval</li>
                                    <li>Ship item to provided return address</li>
                                </ol>
                            </section>

                            <section id="terms" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Return Terms</h3>
                                </div>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-stone-500 leading-relaxed marker:text-stone-400">
                                    <li>Item must be defective or damaged</li>
                                    <li>Wrong item delivered</li>
                                    <li>We are not responsible for lost returns</li>
                                </ul>
                            </section>

                            <section id="refund" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Refund Policy</h3>
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    Refunds are processed within 5-10 business days after inspection. Issued to original payment method or store credit.
                                </p>
                            </section>

                            <section id="late-refunds" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Late Refunds</h3>
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    If delayed, check your bank, contact payment provider, then contact us.
                                </p>
                            </section>

                            <section id="exchange" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Repeat className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Exchange Policy</h3>
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    Only for defective items on arrival. Requires unboxing video and must be requested within 7 days.
                                </p>
                            </section>

                            <section id="fragile" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <PackageOpen className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Fragile Products</h3>
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    Record unboxing. Damage reported after usage is not accepted.
                                </p>
                            </section>
                            
                            <section id="cancellation" className="scroll-mt-32 space-y-4 sm:col-span-2">
                                <div className="flex items-center gap-3">
                                    <XCircle className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Cancellation Policy</h3>
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    Orders can be canceled within 12–24 hours. Once shipped, cancellation is not allowed.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* ── Mobile Navigation (Floating) ── */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-stone-900/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl border border-white/10">
                    <RefreshCcw className="w-5 h-5 text-white" />
                    <div className="h-4 w-px bg-stone-700" />
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xs text-white/70 uppercase tracking-widest font-bold">Top</button>
                </div>
            </div>
        </section>
    );
}