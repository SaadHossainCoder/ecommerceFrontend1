"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Shield, 
    Lock, 
    Server, 
    UserCheck, 
    ShieldAlert, 
    Cookie, 
    Users, 
    Clock, 
    Eye, 
    Flag, 
    RefreshCcw,
    Mail,
    ChevronRight
} from "lucide-react";

const sections = [
    { id: "commitment", title: "Our Commitment", icon: Shield, num: "01" },
    { id: "payments", title: "Secure Payments", icon: Lock, num: "02" },
    { id: "data-protection", title: "Data Protection", icon: Server, num: "03" },
    { id: "account-safety", title: "Account Safety", icon: UserCheck, num: "04" },
    { id: "fraud", title: "Fraud Prevention", icon: ShieldAlert, num: "05" },
    { id: "cookies", title: "Cookies & Tracking", icon: Cookie, num: "06" },
    { id: "third-party", title: "Third-Party Services", icon: Users, num: "07" },
    { id: "retention", title: "Data Retention", icon: Clock, num: "08" },
    { id: "rights", title: "Your Rights", icon: Eye, num: "09" },
    { id: "reporting", title: "Reporting Issues", icon: Flag, num: "10" },
    { id: "updates", title: "Policy Updates", icon: RefreshCcw, num: "11" },
];

export default function PrivacySecurityPage() {


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
                            Trust & Integrity
                        </p>
                        <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-8">
                            Privacy & <br />
                            <span className="text-stone-400 italic">Security</span> Policy
                        </h1>
                        <p className="text-lg text-stone-500 leading-relaxed max-w-xl">
                            At Gemini Heritage, your trust is our most valuable asset. We employ industry-leading protocols to ensure your journey with us is safe, secure, and entirely private.
                        </p>
                        <div className="mt-12 flex items-center gap-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center">
                                        <Shield className="w-4 h-4 text-stone-400" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
                                Last Updated: May 3, 2026
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
                        
                        {/* 01. Commitment */}
                        <section id="commitment" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-stone-900 text-white flex items-center justify-center rounded-2xl shadow-2xl">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-xs font-mono text-stone-400">Section 01</span>
                                    <h2 className="text-3xl font-serif">Our Commitment to Security</h2>
                                </div>
                            </div>
                            <div className="prose prose-stone max-w-none">
                                <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                                    We take strong precautions to keep your data safe. Your information is handled with strict confidentiality and we use industry-standard security systems.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        "Strict data confidentiality",
                                        "Industry-standard security systems",
                                        "Continuous system updates",
                                        "Zero unauthorized access policy"
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

                        {/* 02. Payments */}
                        <section id="payments" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-stone-900 text-white flex items-center justify-center rounded-2xl shadow-2xl">
                                    <Lock className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-xs font-mono text-stone-400">Section 02</span>
                                    <h2 className="text-3xl font-serif">Secure Payments</h2>
                                </div>
                            </div>
                            <div className="bg-stone-900 text-white p-10 md:p-16 rounded-[2rem] overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-stone-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-3xl" />
                                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                                    <div>
                                        <p className="text-stone-400 text-sm uppercase tracking-widest font-bold mb-4">Encryption</p>
                                        <h3 className="text-2xl font-serif mb-6 leading-snug">Banking-grade protection for every transaction.</h3>
                                        <ul className="space-y-4">
                                            {[
                                                "SSL (Secure Socket Layer) encryption",
                                                "No card details stored on servers",
                                                "Verified payment gateways"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-stone-300 text-sm">
                                                    <div className="w-5 h-5 rounded-full bg-stone-800 flex items-center justify-center">
                                                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1.5 h-1.5 rounded-full bg-stone-400" />
                                                    </div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-stone-800/50 backdrop-blur-xl p-8 rounded-2xl border border-stone-700">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="w-10 h-6 bg-stone-700 rounded-md" />
                                            <div className="w-6 h-6 rounded-full bg-stone-700" />
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-2 w-full bg-stone-700 rounded" />
                                            <div className="h-2 w-2/3 bg-stone-700 rounded" />
                                        </div>
                                        <div className="mt-12 flex justify-end">
                                            <Lock className="w-4 h-4 text-stone-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 03. Data Protection */}
                        <section id="data-protection" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-stone-900 text-white flex items-center justify-center rounded-2xl shadow-2xl">
                                    <Server className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-xs font-mono text-stone-400">Section 03</span>
                                    <h2 className="text-3xl font-serif">Data Protection</h2>
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-8">
                                {[
                                    { title: "Secure Servers", desc: "Your data is stored in high-security, climate-controlled environments." },
                                    { title: "Restricted Access", desc: "Access is limited strictly to authorized personnel with multi-factor auth." },
                                    { title: "Firewall Protection", desc: "Advanced enterprise-grade firewalls monitor all incoming traffic." },
                                    { title: "Suspicious Activity", desc: "Regular monitoring and automated AI detection for anomalies." }
                                ].map((item, i) => (
                                    <div key={i} className="group p-8 bg-white border border-stone-100 hover:border-stone-900 transition-all rounded-2xl">
                                        <h4 className="font-bold text-stone-900 mb-2 uppercase tracking-tighter">{item.title}</h4>
                                        <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 04. Account Safety */}
                        <section id="account-safety" className="scroll-mt-32">
                            <motion.div 
                                whileHover={{ scale: 1.01 }}
                                className="bg-orange-50 border border-orange-200 p-10 md:p-16 rounded-[2rem] relative overflow-hidden"
                            >
                                <ShieldAlert className="absolute -bottom-10 -right-10 w-64 h-64 text-orange-200/50" />
                                <div className="relative z-10 max-w-xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-orange-600 text-white flex items-center justify-center rounded-xl">
                                            <UserCheck className="w-6 h-6" />
                                        </div>
                                        <h2 className="text-3xl font-serif text-orange-950">Account Safety</h2>
                                    </div>
                                    <p className="text-orange-800 mb-8 text-lg">Your actions are the first line of defense. Follow these steps to keep your account safe:</p>
                                    <div className="space-y-4">
                                        {[
                                            "Always use a strong, unique password",
                                            "Never share your login credentials",
                                            "Always log out of shared devices"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 text-orange-900 font-medium">
                                                <div className="w-2 h-2 rounded-full bg-orange-600" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-12 pt-8 border-t border-orange-200/50">
                                        <p className="text-xs uppercase tracking-widest font-bold text-orange-700/60">Liability Notice</p>
                                        <p className="text-sm text-orange-800 mt-2">Gemini Heritage is not responsible for unauthorized access caused by sharing login credentials.</p>
                                    </div>
                                </div>
                            </motion.div>
                        </section>

                        {/* 05. Fraud */}
                        <section id="fraud" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-stone-900 text-white flex items-center justify-center rounded-2xl shadow-2xl">
                                    <ShieldAlert className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-xs font-mono text-stone-400">Section 05</span>
                                    <h2 className="text-3xl font-serif">Fraud Prevention</h2>
                                </div>
                            </div>
                            <div className="bg-white border border-stone-200 rounded-3xl p-8 md:p-12">
                                <p className="text-lg text-stone-600 mb-10 leading-relaxed max-w-2xl">
                                    We actively monitor orders to prevent fraudulent activity. Suspicious transactions may be flagged for verification or canceled for your safety.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    {["Verification Checks", "Order Monitoring", "Secure Callbacks", "Risk Scoring"].map((tag) => (
                                        <span key={tag} className="px-5 py-2 bg-stone-50 border border-stone-200 rounded-full text-xs font-bold text-stone-500 uppercase tracking-widest">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* 06. Cookies */}
                        <section id="cookies" className="scroll-mt-32">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-stone-900 text-white flex items-center justify-center rounded-2xl shadow-2xl">
                                    <Cookie className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-xs font-mono text-stone-400">Section 06</span>
                                    <h2 className="text-3xl font-serif">Cookies & Tracking</h2>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    { title: "Experience", desc: "To improve your browsing experience and performance." },
                                    { title: "Preferences", desc: "To remember your settings and favorite items." },
                                    { title: "Analysis", desc: "To analyze website traffic and visitor behavior." }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 bg-stone-50 border border-stone-100 rounded-2xl text-center">
                                        <h4 className="font-bold text-stone-900 mb-3 text-sm">{item.title}</h4>
                                        <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                            <p className="mt-8 text-center text-xs text-stone-400 italic">
                                Note: You can disable cookies in your browser settings at any time.
                            </p>
                        </section>

                        {/* 07-11. Remaining Sections */}
                        <div className="grid sm:grid-cols-2 gap-8">
                            <section id="third-party" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Third-Party Services</h3>
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    We work only with trusted payment gateways and logistics partners who follow strict security standards.
                                </p>
                            </section>

                            <section id="retention" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Data Retention</h3>
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    We keep data only as long as necessary for order processing, legal requirements, and support.
                                </p>
                            </section>

                            <section id="rights" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Eye className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Your Rights</h3>
                                </div>
                                <p className="text-sm text-stone-500 leading-relaxed">
                                    You can request access, correction, or deletion of your data at any time.
                                </p>
                            </section>

                            <section id="reporting" className="scroll-mt-32 space-y-4">
                                <div className="flex items-center gap-3">
                                    <Flag className="w-5 h-5 text-stone-400" />
                                    <h3 className="text-xl font-serif">Reporting Issues</h3>
                                </div>
                                <a href="mailto:privacy@geminiheritage.com" className="group block p-4 border border-stone-200 rounded-xl hover:border-stone-900 transition-all">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Mail className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
                                            <span className="text-sm font-medium text-stone-600 group-hover:text-stone-900">Contact Security Team</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-stone-300" />
                                    </div>
                                </a>
                            </section>
                        </div>

                        <section id="updates" className="scroll-mt-32 pt-16 border-t border-stone-200">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-stone-100 p-10 rounded-[2rem]">
                                <div>
                                    <h3 className="text-2xl font-serif mb-2">Policy Updates</h3>
                                    <p className="text-sm text-stone-500">We evolve to meet new security standards. Stay informed about our changes.</p>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-stone-400">
                                    <RefreshCcw className="w-4 h-4" />
                                    Updates posted on this page
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
            
            {/* ── Mobile Navigation (Floating) ── */}
            <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
                <div className="bg-stone-900/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-6 shadow-2xl border border-white/10">
                    <Shield className="w-5 h-5 text-white" />
                    <div className="h-4 w-px bg-stone-700" />
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xs text-white/70 uppercase tracking-widest font-bold">Top</button>
                </div>
            </div>
        </section>
    );
}
