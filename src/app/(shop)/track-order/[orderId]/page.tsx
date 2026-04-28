import Link from "next/link";
import { Check, ClipboardList, Package, Truck, Home, MapPin, Phone, Headphones, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock Data (simulating a fetch based on orderId)
const getMockOrder = (orderId: string) => {
    return {
        id: orderId,
        date: "20 Feb 2024",
        time: "11:00 AM",
        status: "In Progress",
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

export default async function TrackOrderPage({ params }: { params: Promise<{ orderId: string }> }) {
    // Unwrap params using await (Server Component pattern)
    const resolvedParams = await params;
    const orderId = resolvedParams.orderId;
    const order = getMockOrder(orderId);

    const completedSteps = order.timeline.filter(t => t.completed).length;
    const progressPercentage = ((completedSteps - 1) / (order.timeline.length - 1)) * 100;

    return (
        <section>
            <div className="min-h-screen bg-stone-50">
                <div className="container-custom py-12 lg:py-20 space-y-12">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-4">
                            <Link href="/myOrder" className="inline-flex items-center text-[10px] font-bold tracking-[0.2em] uppercase text-stone-400 hover:text-stone-900 transition-colors mb-2">
                                <ArrowLeft className="w-3 h-3 mr-2" /> Back to Orders
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-serif text-stone-900">
                                Tracking Details
                            </h1>
                            <p className="text-stone-500 font-light max-w-md">
                                Monitor the journey of your acquisition #{orderId}
                            </p>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-2">
                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400">Status</p>
                            <span className="bg-stone-900 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-stone-900 shadow-sm">
                                {order.status}
                            </span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Tracker */}
                            <div className="bg-white border border-stone-200 p-6 sm:p-8 md:p-12 relative overflow-hidden shadow-sm">
                                <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-900 mb-10 md:mb-12">Shipment Progress</h2>
                                <div className="relative">
                                    {/* Desktop Timeline */}
                                    <div className="hidden md:block">
                                        <div className="absolute top-6 left-0 w-full h-px bg-stone-100" />
                                        <div
                                            className="absolute top-6 left-0 h-px bg-stone-900 transition-all duration-1000 ease-in-out"
                                            style={{ width: `${progressPercentage}%` }}
                                        />
                                        <div className="flex justify-between relative z-10 w-full">
                                            {order.timeline.map((step, index) => {
                                                const isCompleted = step.completed;
                                                const isCurrent = !isCompleted && order.timeline[index - 1]?.completed;
                                                const Icon = step.icon;

                                                return (
                                                    <div key={step.id} className="flex flex-col items-center gap-6 group w-[100px]">
                                                        <div className={cn(
                                                            "relative w-12 h-12 flex items-center justify-center transition-all duration-500 bg-white border",
                                                            isCompleted ? "border-stone-900 text-stone-900" : isCurrent ? "border-stone-900 text-stone-900 ring-4 ring-stone-900/5" : "border-stone-200 text-stone-400"
                                                        )}>
                                                            <Icon className="w-5 h-5" />
                                                            {isCompleted && (
                                                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-stone-900 text-white flex items-center justify-center">
                                                                    <Check className="w-2.5 h-2.5" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="text-center space-y-1.5 w-full">
                                                            <p className={cn(
                                                                "text-[9px] font-bold uppercase tracking-widest leading-tight",
                                                                isCompleted || isCurrent ? "text-stone-900" : "text-stone-400"
                                                            )}>
                                                                {step.title}
                                                            </p>
                                                            <p className="text-[10px] text-stone-400 font-medium">{step.date}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Mobile Timeline */}
                                    <div className="md:hidden space-y-8 relative pl-2">
                                        <div className="absolute top-0 bottom-0 left-[31px] w-px bg-stone-200" />
                                        <div
                                            className="absolute top-0 left-[31px] w-px bg-stone-900 transition-all duration-1000"
                                            style={{ height: `${progressPercentage}%` }}
                                        />

                                        {order.timeline.map((step, index) => {
                                            const isCompleted = step.completed;
                                            const isCurrent = !isCompleted && order.timeline[index - 1]?.completed;
                                            const Icon = step.icon;

                                            return (
                                                <div key={step.id} className="flex gap-6 relative z-10">
                                                    <div className={cn(
                                                        "w-12 h-12 shrink-0 flex items-center justify-center bg-white border shadow-sm transition-colors",
                                                        isCompleted ? "border-stone-900 text-stone-900" : isCurrent ? "border-stone-900 text-stone-900 ring-4 ring-stone-900/5" : "border-stone-200 text-stone-400"
                                                    )}>
                                                        <Icon className="w-5 h-5" />
                                                    </div>
                                                    <div className="pt-2">
                                                        <p className={cn(
                                                            "text-[10px] font-bold uppercase tracking-[0.2em]",
                                                            isCompleted || isCurrent ? "text-stone-900" : "text-stone-400"
                                                        )}>
                                                            {step.title}
                                                        </p>
                                                        <div className="text-[11px] text-stone-500 font-light mt-1.5 space-y-0.5">
                                                            <p>{step.date}</p>
                                                            <p className="font-mono text-[9px] uppercase tracking-widest">{step.time}</p>
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
                                <h2 className="text-xl font-serif text-stone-900 mb-6">Package Contents</h2>
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex gap-4 sm:gap-6 items-center p-4 sm:p-6 bg-white border border-stone-200 hover:border-stone-300 transition-colors group shadow-sm">
                                            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-stone-50 overflow-hidden relative border border-stone-200 shrink-0">
                                                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                            </div>
                                            <div className="flex-1 space-y-1.5">
                                                <h3 className="font-serif text-sm sm:text-lg text-stone-900 leading-tight">{item.name}</h3>
                                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-bold uppercase tracking-widest text-stone-400">
                                                    <span>{item.color}</span>
                                                    <span className="w-1 h-1 rounded-full bg-stone-200"></span>
                                                    <span>{item.size}</span>
                                                    <span className="w-1 h-1 rounded-full bg-stone-200"></span>
                                                    <span className="text-stone-900">Qty {item.quantity}</span>
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
                            <div className="bg-white border border-stone-200 p-6 sm:p-8 space-y-8 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-stone-50 flex items-center justify-center border border-stone-200">
                                        <MapPin className="w-4 h-4 text-stone-900" />
                                    </div>
                                    <h3 className="font-bold text-[10px] tracking-[0.2em] uppercase text-stone-900">Destination</h3>
                                </div>

                                <div className="space-y-4 border-t border-stone-100 pt-6">
                                    <div>
                                        <p className="font-serif text-lg text-stone-900">{order.shippingAddress.name}</p>
                                        <p className="text-stone-500 mt-1.5 font-light leading-relaxed text-sm">
                                            {order.shippingAddress.street}<br />
                                            {order.shippingAddress.city}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-stone-900 pt-2">
                                        <Phone className="w-3.5 h-3.5" />
                                        <span>{order.shippingAddress.phone}</span>
                                    </div>
                                </div>

                                <div className="border-t border-stone-100 pt-6 space-y-4">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-stone-400 uppercase tracking-[0.2em] text-[8px] font-bold">Placed On</span>
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-stone-900">{order.date}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-stone-400 uppercase tracking-[0.2em] text-[8px] font-bold">Estimated Arrival</span>
                                        <span className="font-mono font-bold text-[10px] uppercase tracking-widest text-emerald-700">{order.expectedDate}</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-stone-900 text-white hover:bg-stone-800 rounded-none h-12 text-[10px] uppercase tracking-[0.25em] font-bold shadow-sm transition-all" asChild>
                                    <Link href="/contact">Contact Support</Link>
                                </Button>
                            </div>

                            {/* Features */}
                            <div className="grid gap-4">
                                {[
                                    { icon: Package, title: "Insured Delivery", desc: "Full coverage for your artifacts" },
                                    { icon: Headphones, title: "Concierge Service", desc: "Private assistance available 24/7" }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-4 items-start p-5 bg-white border border-stone-200 shadow-sm">
                                        <feature.icon className="w-4 h-4 text-stone-400 mt-1 shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-[9px] uppercase tracking-[0.2em] text-stone-900 mb-1">{feature.title}</h4>
                                            <p className="text-xs text-stone-500 font-light">{feature.desc}</p>
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
