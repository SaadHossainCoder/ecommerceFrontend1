"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Shield, 
    BookOpen, 
    UserCheck, 
    Scale,
    FileSignature, 
    AlertCircle, 
    FileText, 
    Globe, 
    ChevronRight
} from "lucide-react";

const sections = [
    { id: "acceptance", title: "Acceptance of Terms", icon: UserCheck, num: "01" },
    { id: "use", title: "Use of Service", icon: Globe, num: "02" },
    { id: "accounts", title: "User Accounts", icon: Shield, num: "03" },
    { id: "intellectual", title: "Intellectual Property", icon: BookOpen, num: "04" },
    { id: "liability", title: "Limitation of Liability", icon: AlertCircle, num: "05" },
    { id: "governing", title: "Governing Law", icon: Scale, num: "06" },
    { id: "changes", title: "Changes to Terms", icon: FileSignature, num: "07" },
];

export default function TermsPage() {
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
                            Legal Framework
                        </p>
                        <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
                            Terms of <br />
                            <span className="text-stone-400 italic">Service</span>
                        </h1>
                        <p className="text-lg text-stone-500 leading-relaxed max-w-xl">
                            Carefully review the foundational rules and guidelines that govern your premium experience with our artisanal gallery.
                        </p>
                        <div className="mt-12 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center">
                                        <FileText className="w-4 h-4 text-stone-400" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
                                Last Updated: January 1, 2024
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
                        <div className="mt-8 pt-6 border-t border-stone-200">
                            <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-3">
                                Jurisdiction
                            </p>
                            <p className="text-xs text-stone-500 leading-relaxed">
                                New York, United States
                            </p>
                        </div>
                    </aside>

                    {/* ── Main Content ── */}
                    <div className="lg:w-3/4 space-y-32">
                        
                        {/* 01. Acceptance */}
                        <section id="acceptance" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-stone-900 text-white flex items-center justify-center rounded-2xl shadow-2xl">
                                    <UserCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-xs font-mono text-stone-400">Section 01</span>
                                    <h2 className="text-3xl font-serif">Acceptance of Terms</h2>
                                </div>
                            </div>
                            <div className="prose prose-stone max-w-none">
                                <p className="text-lg text-stone-600 mb-8 leading-relaxed bg-white p-8 border border-stone-200 rounded-2xl shadow-sm">
                                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                                </p>
                            </div>
                        </section>

                        {/* 02. Use of Service */}
                        <section id="use" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-stone-900 text-white flex items-center justify-center rounded-2xl shadow-2xl">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-xs font-mono text-stone-400">Section 02</span>
                                    <h2 className="text-3xl font-serif">Use of Service</h2>
                                </div>
                            </div>
                            <div className="bg-stone-50 border border-stone-200 rounded-[2rem] p-10 md:p-16">
                                <p className="text-lg text-stone-600 leading-relaxed">
                                    Our service is provided for your personal, non-commercial use. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.
                                </p>
                            </div>
                        </section>

                        {/* 03. User Accounts */}
                        <section id="accounts" className="scroll-mt-32">
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
                                        <h2 className="text-3xl font-serif text-emerald-950">User Accounts</h2>
                                    </div>
                                    <p className="text-emerald-800 mb-8 text-lg">
                                        If you create an account on the website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security.
                                    </p>
                                </div>
                            </motion.div>
                        </section>

                        {/* 04-07. Remaining Sections */}
                        <div className="grid sm:grid-cols-2 gap-8">
                            <section id="intellectual" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <BookOpen className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Intellectual Property</h3>
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    The website and its original content, features, and functionality are owned by Gemini Heritage and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                                </p>
                            </section>

                            <section id="liability" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Limitation of Liability</h3>
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    In no event shall Gemini Heritage, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages.
                                </p>
                            </section>

                            <section id="governing" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Scale className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Governing Law</h3>
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    These Terms shall be governed and construed in accordance with the laws of New York, United States, without regard to its conflict of law provisions.
                                </p>
                            </section>

                            <section id="changes" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <FileSignature className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Changes to Terms</h3>
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days notice prior to any new terms taking effect.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* ── Mobile Navigation (Floating) ── */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-stone-900/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl border border-white/10">
                    <FileText className="w-5 h-5 text-white" />
                    <div className="h-4 w-px bg-stone-700" />
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xs text-white/70 uppercase tracking-widest font-bold">Top</button>
                </div>
            </div>
        </section>
    );
}