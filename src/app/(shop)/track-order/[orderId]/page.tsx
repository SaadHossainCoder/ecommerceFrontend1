"use client";

import { use } from "react";
import Link from "next/link";
import { Check, ClipboardList, Package, Truck, Home, MapPin, Phone, Headphones, 
    // CreditCard,
     ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { PageTransition } from "@/components/layout/PageTransition";
import { cn } from "@/lib/utils";

// Mock Data (simulating a fetch based on orderId)
const getMockOrder = (orderId: string) => {
    return {
        id: orderId,
        date: "20 Feb 2024",
        time: "11:00 AM",
        status: "In Progress", // Current status for demo
        expectedDate: "21 Feb 2024",
        timeline: [
            { id: 1, title: "Order Placed", date: "20 Feb 2024", time: "11:00 AM", completed: true, icon: ClipboardList },
            { id: 2, title: "Accepted", date: "21 Feb 2024", time: "11:15 AM", completed: true, icon: ClipboardList },
            { id: 3, title: "In Progress", date: "Expected 21 Feb 2024", time: "", completed: false, icon: Package },
            { id: 4, title: "On the Way", date: "Expected 22, 23 Feb 2024", time: "", completed: false, icon: Truck },
            { id: 5, title: "Delivered", date: "Expected 24 Feb 2024", time: "", completed: false, icon: Home },
        ],
        items: [
            {
                id: 1,
                name: "Handwoven Terracotta Vase",
                color: "Terracotta",
                size: "Medium",
                quantity: 2,
                image: "https://i.pinimg.com/736x/7d/bf/97/7dbf978b8b87002fe1f36ddac902e1b1.jpg"
            }
        ],
        shippingAddress: {
            name: "Bessie Cooper",
            street: "2464 Royal Ln. Mesa",
            city: "New Jersey 45463",
            phone: "+1 (234) 567-8900"
        }
    };
};

export default function TrackOrderPage({ params }: { params: Promise<{ orderId: string }> }) {
    // Unwrap params using React.use()
    const resolvedParams = use(params);
    const orderId = resolvedParams.orderId;
    const order = getMockOrder(orderId);

    const completedSteps = order.timeline.filter(t => t.completed).length;
    const progressPercentage = ((completedSteps - 1) / (order.timeline.length - 1)) * 100;

    return (
        <section>
            <div className="min-h-screen bg-[#FAF9F6]">
                <div className="container-custom py-12 lg:py-20 space-y-12">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-4">
                            <Link href="/myOrder" className="inline-flex items-center text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors mb-2">
                                <ArrowLeft className="w-3 h-3 mr-2" /> Back to Orders
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-heading font-black text-primary">
                                Tracking Details
                            </h1>
                            <p className="text-muted-foreground/80 font-body max-w-md">
                                Monitor the journey of your acquisition #{orderId}
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">Status</p>
                            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-none hover:bg-emerald-100">
                                {order.status}
                            </Badge>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Tracker */}
                            <div className="bg-white border border-primary/10 p-8 md:p-12 relative overflow-hidden">
                                <h2 className="text-xs font-black uppercase tracking-widest text-primary/60 mb-12">Shipment Progress</h2>
                                <div className="relative">
                                    {/* Desktop Timeline */}
                                    <div className="hidden md:block">
                                        <div className="absolute top-6 left-0 w-full h-px bg-primary/10" />
                                        <div
                                            className="absolute top-6 left-0 h-px bg-primary transition-all duration-1000 ease-in-out"
                                            style={{ width: `${progressPercentage}%` }}
                                        />
                                        <div className="flex justify-between relative z-10 w-full">
                                            {order.timeline.map((step, index) => {
                                                const isCompleted = step.completed;
                                                const isCurrent = !isCompleted && order.timeline[index - 1]?.completed;
                                                const Icon = step.icon;

                                                return (
                                                    <div key={step.id} className="flex flex-col items-center gap-6 group">
                                                        <div className={cn(
                                                            "relative w-12 h-12 flex items-center justify-center transition-all duration-500 bg-white border",
                                                            isCompleted ? "border-primary text-primary" : isCurrent ? "border-primary text-primary ring-4 ring-primary/5" : "border-primary/20 text-muted-foreground"
                                                        )}>
                                                            <Icon className="w-5 h-5" />
                                                            {isCompleted && (
                                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white flex items-center justify-center">
                                                                    <Check className="w-2.5 h-2.5" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="text-center space-y-1">
                                                            <p className={cn(
                                                                "text-xs font-bold uppercase tracking-wider",
                                                                isCompleted || isCurrent ? "text-primary full-opacity" : "text-muted-foreground/50"
                                                            )}>
                                                                {step.title}
                                                            </p>
                                                            <p className="text-[10px] text-muted-foreground font-medium">{step.date}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Mobile Timeline */}
                                    <div className="md:hidden space-y-8 relative">
                                        <div className="absolute top-0 bottom-0 left-[23px] w-px bg-primary/10" />
                                        <div
                                            className="absolute top-0 left-[23px] w-px bg-primary transition-all duration-1000"
                                            style={{ height: `${progressPercentage}%` }}
                                        />

                                        {order.timeline.map((step, index) => {
                                            const isCompleted = step.completed;
                                            const isCurrent = !isCompleted && order.timeline[index - 1]?.completed;
                                            const Icon = step.icon;

                                            return (
                                                <div key={step.id} className="flex gap-6 relative z-10">
                                                    <div className={cn(
                                                        "w-12 h-12 shrink-0 flex items-center justify-center bg-white border transition-colors",
                                                        isCompleted ? "border-primary text-primary" : isCurrent ? "border-primary text-primary ring-4 ring-primary/5" : "border-primary/20 text-muted-foreground"
                                                    )}>
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <div className="pt-2">
                                                        <p className={cn(
                                                            "text-sm font-bold font-heading uppercase tracking-wide",
                                                            isCompleted || isCurrent ? "text-primary" : "text-muted-foreground"
                                                        )}>
                                                            {step.title}
                                                        </p>
                                                        <div className="text-xs text-muted-foreground mt-1">
                                                            <p>{step.date}</p>
                                                            <p>{step.time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Products List */}
                            <div>
                                <h2 className="text-2xl font-heading font-medium text-primary mb-6">Package Contents</h2>
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex gap-6 items-center p-6 bg-white border border-primary/5 hover:border-primary/20 transition-colors group">
                                            <div className="w-24 h-24 bg-stone-50 overflow-hidden relative border border-primary/10 shrink-0">
                                                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <h3 className="font-bold text-lg font-heading text-primary">{item.name}</h3>
                                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                                    <span>{item.color}</span>
                                                    <span className="w-1 h-1 rounded-full bg-primary/20"></span>
                                                    <span>{item.size}</span>
                                                    <span className="w-1 h-1 rounded-full bg-primary/20"></span>
                                                    <span className="text-primary">Qty {item.quantity}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Delivery Information */}
                            <div className="bg-stone-100 p-8 space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white flex items-center justify-center border border-primary/10">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-sm tracking-widest uppercase text-primary">Destination</h3>
                                </div>

                                <div className="space-y-4 border-t border-primary/10 pt-6">
                                    <div>
                                        <p className="font-bold text-lg font-heading text-primary">{order.shippingAddress.name}</p>
                                        <p className="text-muted-foreground mt-1 leading-relaxed text-sm">
                                            {order.shippingAddress.street}<br />
                                            {order.shippingAddress.city}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-medium text-primary pt-2">
                                        <Phone className="w-4 h-4" />
                                        <span>{order.shippingAddress.phone}</span>
                                    </div>
                                </div>

                                <div className="border-t border-primary/10 pt-6 space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground/70 uppercase tracking-widest text-[10px] font-bold">Placed On</span>
                                        <span className="font-medium font-heading">{order.date}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground/70 uppercase tracking-widest text-[10px] font-bold">Estimated Arrival</span>
                                        <span className="font-bold font-heading text-emerald-700">{order.expectedDate}</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-primary text-white hover:bg-primary/90 rounded-none h-14 text-xs uppercase tracking-widest font-black" asChild>
                                    <Link href="/contact">Contact Support</Link>
                                </Button>
                            </div>

                            {/* Features */}
                            <div className="grid gap-4">
                                {[
                                    { icon: Package, title: "Insured Delivery", desc: "Full coverage for your artifacts" },
                                    { icon: Headphones, title: "Concierge Service", desc: "Private assistance available 24/7" }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-4 items-start p-4 bg-white border border-primary/5">
                                        <feature.icon className="w-5 h-5 text-primary/60 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-xs uppercase tracking-wider text-primary mb-1">{feature.title}</h4>
                                            <p className="text-xs text-muted-foreground">{feature.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
