import {
    Truck, Globe, Clock,
    MapPin, Sparkles, Box, Shield, PackageCheck, ArrowRight, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

const methods = [
    {
        name: "Standard Delivery",
        cost: "$5.99",
        time: "3-5 Business Days",
        description: "Complimentary on orders over $50. Perfect for your regular indulgence.",
        icon: Box,
        color: "text-stone-600",
        bg: "bg-stone-50"
    },
    {
        name: "Express Delivery",
        cost: "$14.99",
        time: "1-2 Business Days",
        description: "When you simply cannot wait to experience the magic.",
        icon: Zap,
        color: "text-amber-600",
        bg: "bg-amber-50"
    },
    {
        name: "Next Day Priority",
        cost: "$24.99",
        time: "Next Business Day",
        description: "The fastest way to bring elegance to your doorstep.",
        icon: Sparkles,
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        name: "Global Concierge",
        cost: "From $19.99",
        time: "7-14 Business Days",
        description: "Artisanal quality, delivered to any corner of the world.",
        icon: Globe,
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
];

export default function ShippingPage() {
    return (
        <div className="min-h-screen bg-stone-50">

            {/* ── Hero ── */}
            <div className="bg-stone-900 px-8 md:px-16 py-16 md:py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <Truck className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-[10px] uppercase tracking-[0.45em] font-semibold text-stone-400">
                            Global Logistics & Excellence
                        </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h1 className="text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight">
                            Shipping <span className="italic font-light text-amber-200">Excellence</span>
                        </h1>
                        <p className="text-sm text-stone-400 max-w-sm leading-relaxed md:text-right">
                            Every package is handled with the same care precision we use to create our products. Your luxury journey starts the moment you order.
                        </p>
                    </div>
                    <div className="mt-8 h-px bg-stone-700" />
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">

                {/* ── Feature Cards ── */}
                <div className="grid md:grid-cols-2 gap-5 mb-16">
                    <div className="border border-stone-200 shadow-sm bg-white p-8 flex flex-col sm:flex-row gap-6 hover:border-stone-300 transition-colors group">
                        <div className="h-12 w-12 shrink-0 bg-amber-50 flex items-center justify-center">
                            <PackageCheck className="h-6 w-6 text-amber-600" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-lg font-serif text-stone-900">Track Your Order</h3>
                            <p className="text-sm text-stone-500 font-light leading-relaxed">
                                Once your order leaves our studio, you&apos;ll receive a personal tracking link to monitor its journey in real-time.
                            </p>
                            <button className="flex items-center text-amber-700 font-serif italic text-sm hover:text-amber-600 cursor-pointer pt-2">
                                Visit Tracking Gallery <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="border border-stone-200 shadow-sm bg-white p-8 flex flex-col sm:flex-row gap-6 hover:border-stone-300 transition-colors group">
                        <div className="h-12 w-12 shrink-0 bg-emerald-50 flex items-center justify-center">
                            <Shield className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-lg font-serif text-stone-900">Guaranteed Safe Arrival</h3>
                            <p className="text-sm text-stone-500 font-light leading-relaxed">
                                Every delivery is fully insured and handled by our network of premium carriers including UPS, FedEx, and DHL.
                            </p>
                            <p className="text-xs font-light text-stone-400 italic pt-2">
                                100% Carbon Neutral Shipping available.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Delivery Methods ── */}
                <div className="mb-16">
                    <div className="mb-10">
                        <p className="text-[10px] uppercase tracking-[0.4em] font-semibold text-stone-400 mb-3">
                            Delivery Options
                        </p>
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">Delivery Rituals</h2>
                            <p className="text-sm text-stone-500 max-w-sm font-light leading-relaxed md:text-right">
                                Choose the speed that matches your desire. Each option is curated for reliability and discretion.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone-200 border border-stone-200">
                        {methods.map((method) => (
                            <div
                                key={method.name}
                                className="bg-white p-8 flex flex-col gap-5 hover:bg-stone-50 transition-colors duration-300 cursor-default group"
                            >
                                <div className={`w-10 h-10 ${method.bg} flex items-center justify-center`}>
                                    <method.icon className={`h-5 w-5 ${method.color}`} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-stone-900 mb-1">{method.name}</h3>
                                    <p className="text-[10px] uppercase tracking-[0.15em] font-semibold text-stone-400">{method.time}</p>
                                </div>
                                <p className="text-xs text-stone-500 font-light leading-relaxed flex-1">
                                    {method.description}
                                </p>
                                <p className="text-xl font-serif font-light text-stone-900 border-t border-stone-100 pt-4">
                                    {method.cost}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Policy Details ── */}
                <div className="grid md:grid-cols-2 gap-5 mb-16">

                    <div className="bg-white border border-stone-200 p-8">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-100">
                            <div className="w-9 h-9 bg-stone-100 flex items-center justify-center">
                                <Clock className="h-4 w-4 text-stone-600" />
                            </div>
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.15em] font-semibold text-stone-400">Timeline</p>
                                <h2 className="text-base font-semibold text-stone-900">Order Processing</h2>
                            </div>
                        </div>
                        <p className="text-sm text-stone-500 font-light leading-relaxed mb-5">
                            Our artisans prepare your order with meticulous attention to detail. Every bar is hand-inspected and wrapped specifically for its journey.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex gap-3 text-sm text-stone-600">
                                <span className="text-amber-500 font-bold mt-0.5 shrink-0">•</span>
                                <span>Orders placed before <span className="font-semibold text-stone-900">2 PM EST</span> typically ship the same business day.</span>
                            </li>
                            <li className="flex gap-3 text-sm text-stone-600">
                                <span className="text-amber-500 font-bold mt-0.5 shrink-0">•</span>
                                <span>Personalized orders require an additional <span className="font-semibold text-stone-900">24-48 hours</span> for artistic preparation.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-white border border-stone-200 p-8">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-100">
                            <div className="w-9 h-9 bg-stone-100 flex items-center justify-center">
                                <MapPin className="h-4 w-4 text-stone-600" />
                            </div>
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.15em] font-semibold text-stone-400">Coverage</p>
                                <h2 className="text-base font-semibold text-stone-900">Global Reach</h2>
                            </div>
                        </div>
                        <p className="text-sm text-stone-500 font-light leading-relaxed mb-5">
                            While we strive to reach every destination, certain restrictions ensure our quality is never compromised during transit.
                        </p>
                        <div className="bg-stone-50 border border-stone-200 border-l-4 border-l-amber-400 px-4 py-3">
                            <p className="text-xs text-stone-500 italic leading-relaxed">
                                Currently, we do not ship to P.O. Boxes or freight forwarders to ensure direct and secure delivery of our artisanal goods. Additional taxes and duties may apply to international orders.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Final CTA ── */}
                <div className="bg-stone-900 p-10 md:p-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.35em] font-semibold text-stone-500 mb-4">
                            Support
                        </p>
                        <h2 className="text-2xl md:text-4xl font-serif text-white leading-tight mb-3">
                            Questions About<br />Your Arrival?
                        </h2>
                        <p className="text-sm text-stone-400 max-w-md font-light leading-relaxed">
                            Our concierge team is available 24/7 to assist with tracking, delivery preferences, or any concerns regarding your package&apos;s journey.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <Button className="h-12 px-10 rounded-none bg-amber-200 text-stone-900 hover:bg-white transition-all duration-300 font-semibold text-xs uppercase tracking-[0.2em] group">
                            Contact Concierge
                            <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform inline-block" />
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}