
import {
    Truck, Globe, Clock,
    // ShieldCheck,
    MapPin, Sparkles, Box, Shield, PackageCheck, ArrowRight, Zap
} from "lucide-react";
// import { PageTransition } from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";


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
        <section>
            <div className="flex flex-col min-h-screen">
                {/* Hero Section */}
                <section
                    className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-stone-900"
                >
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/brain/7a2cc7b3-4feb-44d5-84da-e4a44203e347/luxury_delivery_packaging_1768312457586.png"
                            alt="Luxury Shipping"
                            fill
                            className="object-cover opacity-60"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-background z-10" />

                    <div
                        className="relative z-20 text-center space-y-6 px-4 max-w-4xl mx-auto"
                    >
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm tracking-widest uppercase"
                        >
                            <Truck className="h-4 w-4 text-amber-400" />
                            Global Logistics & Excellence
                        </div>

                        <h1
                            className="text-4xl md:text-7xl font-serif text-white tracking-tight"
                        >
                            Shipping <span className="italic font-light text-amber-200">Excellence</span>
                        </h1>

                        <p
                            className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto font-light font-serif leading-relaxed"
                        >
                            Every package is handled with the same care and precision we use to create our products. Your luxury journey starts the moment you order.
                        </p>
                    </div>
                </section>

                <div className="container-custom -mt-20 relative z-30 pb-24 space-y-24">
                    {/* Key Features Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div
                        >
                            <Card className="border-none shadow-2xl shadow-stone-200/50 rounded-[2.5rem] overflow-hidden bg-white group">
                                <CardContent className="p-10 flex gap-8">
                                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-amber-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <PackageCheck className="h-8 w-8 text-amber-600" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-serif">Track Your Order</h3>
                                        <p className="text-stone-500 font-light leading-relaxed">
                                            Once your order leaves our studio, you&apos;ll receive a personal tracking link to monitor its journey in real-time.
                                        </p>
                                        <Button variant="link" className="p-0 text-amber-700 h-auto font-serif italic text-lg hover:text-amber-600 group">
                                            Visit Tracking Gallery <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div
                        >
                            <Card className="border-none shadow-2xl shadow-stone-200/50 rounded-[2.5rem] overflow-hidden bg-white group">
                                <CardContent className="p-10 flex gap-8">
                                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <Shield className="h-8 w-8 text-emerald-600" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-serif">Guaranteed Safe Arrival</h3>
                                        <p className="text-stone-500 font-light leading-relaxed">
                                            Every delivery is fully insured and handled by our network of premium carriers including UPS, FedEx, and DHL.
                                        </p>
                                        <p className="text-sm font-light text-stone-400 italic">
                                            100% Carbon Neutral Shipping available.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Shipping Methods Section */}
                    <section className="space-y-12">
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl md:text-5xl font-serif">Delivery Rituals</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto font-light text-lg">
                                Choose the speed that matches your desire. Each option is curated for reliability and discretion.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-4 gap-6">
                            {methods.map((method) => (
                                <div
                                    key={method.name}
                                >
                                    <Card className="h-full border border-stone-100 hover:border-amber-200 hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500 rounded-3xl overflow-hidden cursor-default group">
                                        <CardContent className="p-8 flex flex-col h-full text-center items-center gap-6">
                                            <div className={`w-14 h-14 rounded-2xl ${method.bg} flex items-center justify-center group-hover:rotate-6 transition-transform`}>
                                                <method.icon className={`h-7 w-7 ${method.color}`} />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-xl font-serif font-bold">{method.name}</h3>
                                                <p className="text-stone-400 text-sm font-mono tracking-tighter uppercase italic">{method.time}</p>
                                            </div>
                                            <p className="text-muted-foreground text-sm font-light leading-relaxed flex-1">
                                                {method.description}
                                            </p>
                                            <div className="text-2xl font-serif font-light text-stone-900">
                                                {method.cost}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Policy Detail Section */}
                    <div className="grid md:grid-cols-2 gap-12 items-start pt-12">
                        <section
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-stone-100 flex items-center justify-center">
                                    <Clock className="h-6 w-6 text-stone-600" />
                                </div>
                                <h2 className="text-3xl font-serif">Order Processing</h2>
                            </div>
                            <div className="space-y-6 text-stone-600 font-light leading-relaxed text-lg">
                                <p>
                                    Our artisans prepare your order with meticulous attention to detail. Every bar is hand-inspected and wrapped specifically for its journey.
                                </p>
                                <ul className="space-y-4">
                                    <li className="flex gap-4">
                                        <span className="text-amber-600 font-bold">•</span>
                                        <span>Orders placed before <span className="font-medium text-stone-900">2 PM EST</span> typically ship the same business day.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-amber-600 font-bold">•</span>
                                        <span>Personalized orders require an additional <span className="font-medium text-stone-900">24-48 hours</span> for artistic preparation.</span>
                                    </li>
                                </ul>
                            </div>
                        </section>

                        <section
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-stone-100 flex items-center justify-center">
                                    <MapPin className="h-6 w-6 text-stone-600" />
                                </div>
                                <h2 className="text-3xl font-serif">Global Reach</h2>
                            </div>
                            <div className="space-y-6 text-stone-600 font-light leading-relaxed text-lg">
                                <p>
                                    While we strive to reach every destination, certain restrictions ensure our quality is never compromised during transit.
                                </p>
                                <div className="p-6 bg-stone-50 border border-stone-200 rounded-3xl italic text-sm text-stone-500">
                                    <p>
                                        Currently, we do not ship to P.O. Boxes or freight forwarders to ensure direct and secure delivery of our artisanal goods. Additional taxes and duties may apply to international orders.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Final reassurance */}
                    <section className="bg-stone-900 text-white rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center space-y-8">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                        <h2 className="text-3xl md:text-5xl font-serif relative z-10">Questions About Your Arrival?</h2>
                        <p className="text-stone-400 text-lg max-w-2xl mx-auto font-light relative z-10">
                            Our concierge team is available 24/7 to assist with tracking, delivery preferences, or any concerns you may have regarding your package&apos;s journey.
                        </p>
                        <div className="flex justify-center gap-4 relative z-10">
                            <Button className="h-14 px-10 rounded-full bg-amber-200 text-stone-900 hover:bg-white transition-all duration-300 font-serif">
                                Contact Concierge
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </section>
    );
}
