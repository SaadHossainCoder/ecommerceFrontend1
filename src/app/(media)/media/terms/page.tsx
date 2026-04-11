"use client";

import {
    Shield, BookOpen, UserCheck, Scale,
    FileSignature, AlertCircle, FileText, Globe, LifeBuoy
} from "lucide-react";

const termsSections = [
    {
        id: "01",
        title: "Acceptance of Terms",
        icon: UserCheck,
        content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.",
        bg: "bg-amber-50",
        color: "text-amber-700",
        dot: "bg-amber-400",
    },
    {
        id: "02",
        title: "Use of Service",
        icon: Globe,
        content: "Our service is provided for your personal, non-commercial use. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.",
        bg: "bg-stone-50",
        color: "text-stone-700",
        dot: "bg-stone-400",
    },
    {
        id: "03",
        title: "User Accounts",
        icon: Shield,
        content: "If you create an account on the website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security.",
        bg: "bg-emerald-50",
        color: "text-emerald-700",
        dot: "bg-emerald-400",
    },
    {
        id: "04",
        title: "Intellectual Property",
        icon: BookOpen,
        content: "The website and its original content, features, and functionality are owned by ShopHub and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.",
        bg: "bg-rose-50",
        color: "text-rose-700",
        dot: "bg-rose-400",
    },
    {
        id: "05",
        title: "Limitation of Liability",
        icon: AlertCircle,
        content: "In no event shall ShopHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
        bg: "bg-blue-50",
        color: "text-blue-700",
        dot: "bg-blue-400",
    },
    {
        id: "06",
        title: "Governing Law",
        icon: Scale,
        content: "These Terms shall be governed and construed in accordance with the laws of New York, United States, without regard to its conflict of law provisions.",
        bg: "bg-indigo-50",
        color: "text-indigo-700",
        dot: "bg-indigo-400",
    },
    {
        id: "07",
        title: "Changes to Terms",
        icon: FileSignature,
        content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.",
        bg: "bg-stone-100",
        color: "text-stone-900",
        dot: "bg-stone-500",
    },
];

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-stone-50">

            {/* ── Hero ── */}
            <div className="bg-stone-900 px-8 md:px-16 py-16 md:py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <FileText className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-[10px] uppercase tracking-[0.45em] font-semibold text-stone-400">
                            Legal Framework
                        </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h1 className="text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight">
                            Terms of <span className="italic font-light text-amber-200">Service</span>
                        </h1>
                        <p className="text-sm text-stone-400 max-w-sm leading-relaxed md:text-right">
                            Carefully review the foundational rules and guidelines that govern your premium experience with our artisanal gallery.
                        </p>
                    </div>
                    <div className="mt-8 h-px bg-stone-700" />
                    <div className="mt-6 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-stone-400 inline-block" />
                        <span className="text-[10px] text-stone-400 font-bold tracking-widest uppercase">Last updated: January 1, 2024</span>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-14 pb-28">

                {/* ── Intro Quote ── */}
                <div className="mb-14 grid md:grid-cols-12">
                    <div className="md:col-span-8 md:col-start-3 bg-stone-900 px-10 py-8 border-b-4 border-amber-400 shadow-xl shadow-stone-200/50">
                        <p className="text-base md:text-lg text-stone-300 font-serif leading-relaxed italic text-center">
                            &quot;Our relationship with you is built on trust, excellence, and mutual respect. These terms ensure that your experience with our artisanal gallery remains protected and premium.&quot;
                        </p>
                    </div>
                </div>

                {/* ── Two-column layout: sidebar TOC + articles ── */}
                <div className="grid md:grid-cols-12 gap-10">

                    {/* Sticky TOC sidebar */}
                    <aside className="hidden md:block md:col-span-3">
                        <div className="sticky top-8 bg-white border border-stone-200 p-6">
                            <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400 mb-5">
                                Contents
                            </p>
                            <nav className="space-y-1">
                                {termsSections.map((s) => (
                                    <a
                                        key={s.id}
                                        href={`#article-${s.id}`}
                                        className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-50 transition-colors group"
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot} opacity-60 group-hover:opacity-100`} />
                                        <span className="font-mono text-[10px] text-stone-400 shrink-0">{s.id}</span>
                                        <span className="truncate">{s.title}</span>
                                    </a>
                                ))}
                            </nav>

                            <div className="mt-8 pt-6 border-t border-stone-100">
                                <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-3">
                                    Jurisdiction
                                </p>
                                <p className="text-xs text-stone-500 leading-relaxed">
                                    New York, United States
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Articles */}
                    <div className="md:col-span-9 space-y-3">
                        {termsSections.map((section, idx) => (
                            <div
                                key={section.id}
                                id={`article-${section.id}`}
                                className="bg-white border border-stone-200 hover:border-stone-300 transition-colors duration-200 group overflow-hidden"
                            >
                                <div className="flex flex-col sm:flex-row">

                                    {/* Left number + icon column */}
                                    <div className={`sm:w-40 shrink-0 ${section.bg} flex flex-col items-center justify-center gap-3 py-7 px-5 text-center border-b sm:border-b-0 sm:border-r border-stone-200/70`}>
                                        <div className="w-9 h-9 bg-white flex items-center justify-center shadow-sm">
                                            <section.icon className={`h-4 w-4 ${section.color}`} />
                                        </div>
                                        <div>
                                            <p className="text-[8px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-1">
                                                Article
                                            </p>
                                            <p className={`text-xl font-serif font-bold ${section.color}`}>
                                                {section.id}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Right content */}
                                    <div className="flex-1 px-7 py-6 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-3">
                                            <h3 className="text-sm font-bold text-stone-900 tracking-tight">
                                                {section.title}
                                            </h3>
                                            <span className={`w-1.5 h-1.5 rounded-full ${section.dot} shrink-0`} />
                                        </div>
                                        <p className="text-sm text-stone-500 leading-relaxed">
                                            {section.content}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* ── Footer CTA ── */}
                <div className="mt-14 bg-stone-900 flex flex-col md:flex-row md:items-center md:justify-between gap-8 px-10 py-10">
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-stone-500 mb-3">
                            Support
                        </p>
                        <h2 className="text-2xl font-serif text-white mb-2 leading-tight">
                            Still have questions?
                        </h2>
                        <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
                            Our concierge and legal support team is dedicated to providing clarity on any aspect of our service.
                        </p>
                    </div>
                    <button className="inline-flex items-center gap-2.5 border border-stone-700 hover:border-amber-400 text-stone-300 hover:text-amber-400 px-7 py-3.5 text-[10px] uppercase tracking-[0.25em] font-bold transition-colors duration-200 shrink-0">
                        <LifeBuoy className="h-4 w-4" />
                        Contact Support Concierge
                    </button>
                </div>

            </div>
        </div>
    );
}