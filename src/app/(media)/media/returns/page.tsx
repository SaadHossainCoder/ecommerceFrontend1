import { RotateCcw, Package, CreditCard, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
    {
        icon: Package,
        title: "Initiate Return",
        desc: "Go to your orders, select the items you want to return and tell us why.",
    },
    {
        icon: RotateCcw,
        title: "Print Label",
        desc: "We'll send you a prepaid shipping label to your email. Print and attach it.",
    },
    {
        icon: Package,
        title: "Ship Back",
        desc: "Drop off the package at any authorized shipping location.",
    },
    {
        icon: CreditCard,
        title: "Get Refunded",
        desc: "Once we receive the item, we'll process your refund within 5 business days.",
    },
];

export default function ReturnsPage() {
    return (
        <section className="min-h-screen bg-stone-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">

                {/* ── Hero ── */}
                <div className="mb-20">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-semibold text-stone-400 mb-4">
                        Customer Care
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight tracking-tight">
                            Returns &<br />Exchanges
                        </h1>
                        <p className="text-sm text-stone-500 max-w-sm leading-relaxed md:text-right">
                            Not happy with your purchase? We make returns easy and hassle-free with free prepaid labels on all domestic orders.
                        </p>
                    </div>
                    <div className="mt-8 h-px bg-stone-200" />
                </div>

                {/* ── How it Works ── */}
                <div className="mb-20">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-semibold text-stone-400 mb-10">
                        How it Works
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-stone-200">
                        {steps.map((step, index) => (
                            <div
                                key={step.title}
                                className={`p-8 bg-white ${index < steps.length - 1 ? "border-b sm:border-b-0 sm:border-r border-stone-200" : ""}`}
                            >
                                <div className="w-10 h-10 bg-stone-100 flex items-center justify-center mb-6">
                                    <step.icon className="h-5 w-5 text-stone-700" />
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-400 mb-2">
                                    Step {index + 1}
                                </p>
                                <h3 className="text-sm font-semibold text-stone-900 mb-2">{step.title}</h3>
                                <p className="text-xs text-stone-500 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Policy + CTA ── */}
                <div className="grid lg:grid-cols-2 gap-6">

                    {/* Policy */}
                    <div className="bg-white border border-stone-200 p-8">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-100">
                            <div className="w-9 h-9 bg-stone-100 flex items-center justify-center">
                                <ShieldCheck className="h-4 w-4 text-stone-700" />
                            </div>
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.15em] font-semibold text-stone-400">Our Promise</p>
                                <h3 className="text-base font-semibold text-stone-900">Return Policy</h3>
                            </div>
                        </div>
                        <ul className="space-y-3">
                            {[
                                "Items must be returned within 30 days of purchase.",
                                "Products must be in original, unused condition with all tags attached.",
                                "Return shipping is free for all domestic orders.",
                                "Exchange for a different size or color is always free.",
                                "Final sale items are not eligible for return.",
                            ].map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm text-stone-600">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-400 shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA */}
                    <div className="bg-stone-900 p-8 flex flex-col justify-between">
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.3em] font-semibold text-stone-500 mb-4">
                                Ready to return?
                            </p>
                            <h3 className="text-2xl font-serif text-white leading-tight mb-4">
                                Start Your<br />Return
                            </h3>
                            <p className="text-sm text-stone-400 leading-relaxed mb-8">
                                Have your order number and email address ready to start the process online.
                            </p>
                        </div>
                        <Button
                            size="lg"
                            variant="secondary"
                            className="w-full rounded-none text-[10px] uppercase tracking-[0.2em] font-bold h-12"
                        >
                            Start Return Process
                            <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </div>

            </div>
        </section>
    );
}