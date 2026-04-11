"use client";

import { HelpCircle, Search, ChevronDown } from "lucide-react";

const faqs = [
    {
        category: "Orders",
        items: [
            {
                q: "How do I track my order?",
                a: "You can track your order by clicking the 'Track Order' link in your confirmation email or by visiting the 'My Orders' section in your account profile.",
            },
            {
                q: "Can I cancel my order?",
                a: "Orders can be cancelled within 1 hour of placement. After that, the order is processed for shipping and cannot be cancelled, but you can return it once received.",
            },
            {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, AMEX), PayPal, Apple Pay, and Google Pay.",
            },
        ],
    },
    {
        category: "Shipping",
        items: [
            {
                q: "How long does shipping take?",
                a: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. International shipping varies by location but typically takes 7-14 business days.",
            },
            {
                q: "Do you offer free shipping?",
                a: "Yes, we offer free standard shipping on all orders over $50 within the continental US.",
            },
            {
                q: "Do you ship internationally?",
                a: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times will be calculated at checkout.",
            },
        ],
    },
    {
        category: "Returns",
        items: [
            {
                q: "What is your return policy?",
                a: "We offer a 30-day return policy for most items. Products must be in original condition and packaging. Some items like personal care or clearance sales may be final sale.",
            },
            {
                q: "How do I start a return?",
                a: "Visit our 'Returns' page under the Support section and enter your order number and email to generate a return shipping label.",
            },
        ],
    },
];

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-stone-50">
            {/* ── Hero ── */}
            <div className="bg-stone-900 px-8 md:px-16 py-16 md:py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-[10px] uppercase tracking-[0.45em] font-semibold text-stone-400">
                            Knowledge Base
                        </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h1 className="text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight">
                            Frequently Asked <span className="italic font-light text-amber-200">Questions</span>
                        </h1>
                        <p className="text-sm text-stone-400 max-w-sm leading-relaxed md:text-right">
                            Everything you need to know about our products, services, and policies to ensure a seamless premium experience.
                        </p>
                    </div>
                    <div className="mt-8 h-px bg-stone-700" />
                </div>
            </div>

            {/* ── Content ── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 pb-28">

                {/* ── Search Bar ── */}
                <div className="mb-14 max-w-4xl mx-auto">
                    <div className="relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400 group-focus-within:text-amber-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search for answers..."
                            className="w-full bg-white border border-stone-200 py-5 pl-16 pr-6 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors rounded-none shadow-sm"
                        />
                    </div>
                </div>

                {/* ── Accordions ── */}
                <div className="max-w-4xl mx-auto space-y-10">
                    {faqs.map((category, catIdx) => (
                        <div key={category.category} className="bg-white border border-stone-200 shadow-sm">
                            <div className="bg-stone-50 border-b border-stone-200 px-8 py-5 flex items-center justify-between">
                                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900">{category.category}</h2>
                                <span className="text-[10px] text-stone-400 font-mono font-bold tracking-widest">SECTION 0{catIdx + 1}</span>
                            </div>
                            <div className="divide-y divide-stone-100">
                                {category.items.map((item, index) => (
                                    <details key={index} className="group p-8 px-6 md:px-8">
                                        <summary className="flex items-center justify-between cursor-pointer list-none [&::-webkit-details-marker]:hidden outline-none">
                                            <h3 className="text-base font-serif font-semibold text-stone-800 group-open:text-amber-700 transition-colors pr-6">
                                                {item.q}
                                            </h3>
                                            <div className="w-7 h-7 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0 group-open:rotate-180 transition-transform duration-300 group-hover:bg-stone-100">
                                                <ChevronDown className="h-3.5 w-3.5 text-stone-600" />
                                            </div>
                                        </summary>
                                        <div className="pt-6 mt-6 border-t border-stone-100 text-sm text-stone-500 leading-relaxed font-light">
                                            {item.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Contact CTA ── */}
                <div className="mt-16 bg-stone-900 p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-8 max-w-4xl mx-auto">
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.4em] font-semibold text-stone-500 mb-3">
                            Support
                        </p>
                        <h3 className="text-2xl font-serif text-white leading-tight mb-3">
                            Still have questions?
                        </h3>
                        <p className="text-sm text-stone-400 leading-relaxed max-w-sm font-light">
                            Cannot find the answer you are looking for? Reach out to our concierge team directly.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                        <button className="border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white px-8 py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300">
                            Email Us
                        </button>
                        <button className="bg-amber-100 hover:bg-white text-stone-900 px-8 py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-sm">
                            Live Chat
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
