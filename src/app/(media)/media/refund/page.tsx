import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, History, AlertCircle, Info, ArrowRight, Mail } from "lucide-react";

export default function RefundPage() {
    return (
        <div className="min-h-screen bg-stone-50">

            {/* ── Hero ── */}
            <div className="bg-stone-900 px-8 md:px-16 py-16 md:py-20">
                <div className="max-w-5xl mx-auto">
                    <p className="text-[10px] uppercase tracking-[0.45em] font-semibold text-stone-500 mb-4">
                        Customer Care
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h1 className="text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight">
                            Refund Policy
                        </h1>
                        <p className="text-sm text-stone-400 max-w-sm leading-relaxed md:text-right">
                            Detailed information about our refund process, eligibility criteria, and timelines.
                        </p>
                    </div>
                    <div className="mt-8 h-px bg-stone-700" />
                    <div className="mt-6 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                        <span className="text-xs text-stone-400 font-medium">Last updated: January 1, 2024</span>
                    </div>
                </div>
            </div>

            {/* ── Content ── */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 space-y-5">

                {/* ── Eligibility ── */}
                <div className="bg-white border border-stone-200 p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-100">
                        <div className="w-9 h-9 bg-stone-100 flex items-center justify-center shrink-0">
                            <Info className="h-4 w-4 text-stone-600" />
                        </div>
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-stone-400">
                                Section 01
                            </p>
                            <h2 className="text-base font-semibold text-stone-900">Refund Eligibility</h2>
                        </div>
                    </div>
                    <p className="text-sm text-stone-500 leading-relaxed max-w-2xl">
                        To be eligible for a refund, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You&apos;ll also need the receipt or proof of purchase.
                    </p>

                    {/* Eligibility checklist */}
                    <div className="mt-6 grid sm:grid-cols-3 gap-3">
                        {[
                            "Unused & unworn condition",
                            "Original packaging intact",
                            "Proof of purchase required",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-2.5 bg-stone-50 border border-stone-100 px-4 py-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                <span className="text-xs font-medium text-stone-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Timeline + Non-refundable ── */}
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="bg-white border border-stone-200 p-8">
                        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-stone-100">
                            <div className="w-9 h-9 bg-green-50 flex items-center justify-center shrink-0">
                                <History className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-stone-400">
                                    Section 02
                                </p>
                                <h2 className="text-base font-semibold text-stone-900">Refund Timeline</h2>
                            </div>
                        </div>
                        <p className="text-sm text-stone-500 leading-relaxed">
                            Once we receive and inspect your return, we will notify you if the refund was approved. If approved, you&apos;ll be automatically refunded on your original payment method within 10 business days.
                        </p>
                        <div className="mt-5 bg-green-50 border border-green-100 px-4 py-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                            <span className="text-xs font-semibold text-green-700">Up to 10 business days after approval</span>
                        </div>
                    </div>

                    <div className="bg-white border border-stone-200 p-8">
                        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-stone-100">
                            <div className="w-9 h-9 bg-red-50 flex items-center justify-center shrink-0">
                                <AlertCircle className="h-4 w-4 text-red-500" />
                            </div>
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-stone-400">
                                    Section 03
                                </p>
                                <h2 className="text-base font-semibold text-stone-900">Non-Refundable Items</h2>
                            </div>
                        </div>
                        <p className="text-sm text-stone-500 leading-relaxed">
                            Certain types of items cannot be returned, like perishable goods, custom products, and personal care goods. We also do not accept returns for hazardous materials, flammable liquids, or gases.
                        </p>
                        <div className="mt-5 bg-red-50 border border-red-100 px-4 py-3 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                            <span className="text-xs font-semibold text-red-600">Custom & perishable items excluded</span>
                        </div>
                    </div>
                </div>

                {/* ── Late or Missing ── */}
                <div className="bg-white border border-stone-200 p-8 md:p-10">
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-100">
                        <div className="w-9 h-9 bg-stone-100 flex items-center justify-center shrink-0">
                            <CreditCard className="h-4 w-4 text-stone-600" />
                        </div>
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-stone-400">
                                Section 04
                            </p>
                            <h2 className="text-base font-semibold text-stone-900">Late or Missing Refunds</h2>
                        </div>
                    </div>
                    <p className="text-sm text-stone-500 leading-relaxed max-w-2xl mb-6">
                        If you haven&apos;t received a refund yet, first check your bank account again. Then contact your credit card company — it may take some time before your refund is officially posted. If you&apos;ve done all of this and you still have not received your refund, please contact us.
                    </p>

                    {/* Steps */}
                    <div className="grid sm:grid-cols-3 gap-0 border border-stone-200">
                        {[
                            { step: "01", label: "Check bank account" },
                            { step: "02", label: "Contact card provider" },
                            { step: "03", label: "Reach out to us" },
                        ].map((item, i) => (
                            <div
                                key={item.step}
                                className={`flex items-center gap-3 px-5 py-4 bg-stone-50 ${i < 2 ? "border-b sm:border-b-0 sm:border-r border-stone-200" : ""}`}
                            >
                                <span className="text-[10px] font-bold text-stone-400 font-mono">{item.step}</span>
                                <span className="text-xs font-semibold text-stone-700">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Contact CTA ── */}
                <div className="bg-stone-900 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.35em] font-semibold text-stone-500 mb-2">
                            Need help?
                        </p>
                        <h3 className="text-lg font-serif text-white mb-1">Questions about your refund?</h3>
                        <p className="text-sm text-stone-400">Our support team typically responds within 24 hours.</p>
                    </div>
                    <a
                        href="mailto:refunds@shophub.com"
                        className="inline-flex items-center gap-3 border border-stone-700 hover:border-amber-400 hover:text-amber-400 text-stone-300 px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-200 shrink-0"
                    >
                        <Mail className="w-4 h-4" />
                        refunds@shophub.com
                    </a>
                </div>

            </div>
        </div>
    );
}