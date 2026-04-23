"use client";

import { useState, useEffect } from "react";
import {
    User,
    Package,
    MapPin,
    CreditCard,
    LogOut,
    Edit2,
    Plus,
    CheckCircle2,
    Clock,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

// Mock Data
const orders = [
    {
        id: "#SDGT1254FD",
        date: "24 Feb 2024",
        status: "Accepted",
        total: 633.00,
        payment: "Paypal",
        items: [
            { name: "Trendy Brown Coat", color: "Brown", size: "XXL", qty: 4, image: "🧥" },
            { name: "Classy Light Coat", color: "Cream", size: "XXL", qty: 1, image: "🧥" }
        ]
    },
    {
        id: "#SDGT7412DF",
        date: "12 Feb 2024",
        status: "Delivered",
        total: 60.00,
        payment: "Cash",
        items: [
            { name: "Brown Winter Coat", color: "Brown", size: "XXL", qty: 1, image: "🧥" }
        ]
    }
];

const addresses = [
    { id: 1, name: "Bessie Cooper", street: "2464 Royal Ln. Mesa", location: "New Jersey 45463", isDefault: true },
    { id: 2, name: "Bessie Cooper", street: "6391 Elgin St. Celina", location: "Delaware 10299", isDefault: false }
];

const cards = [
    { id: 1, type: "Paypal", number: null, isLink: true },
    { id: 2, type: "Visa", number: "**** 8047", isLink: false },
    { id: 3, type: "Google Pay", number: null, isLink: true },
];

export default function MyAccountPage() {
    const [activeTab, setActiveTab] = useState("personal");
    const { user, isLoading, updateProfile, fetchMe } = useAuthStore();

    // Local form state seeded from the store user
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phoneNumber: "",
        countryCode: "",
        gender: "",
        dateOfBirth: "",
    });

    // Fetch fresh user data from the backend on mount
    useEffect(() => {
        fetchMe();
    }, []);

    // Sync form when user data arrives
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username ?? "",
                email: user.email ?? "",
                phoneNumber: user.phoneNumber ?? "",
                countryCode: user.countryCode ?? "",
                gender: user.gender ?? "",
                dateOfBirth: user.dateOfBirth ?? "",
            });
        }
    }, [user]);

    const handleSave = async () => {
        try {
            await updateProfile(formData);
            toast({ title: "Profile Updated", description: "Your changes have been saved." });
        } catch {
            toast({ title: "Update Failed", description: "Something went wrong. Please try again." });
        }
    };

    const menuItems = [
        { id: "personal", label: "Personal Info", icon: User, desc: "Manage your profile" },
        { id: "orders", label: "My Orders", icon: Package, desc: "Track & return orders" },
        { id: "address", label: "Addresses", icon: MapPin, desc: "Shipping destinations" },
        { id: "payment", label: "Payments", icon: CreditCard, desc: "Saved methods" },
        { id: "logout", label: "Sign Out", icon: LogOut, desc: "End your session" },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "personal":
                return (
                    <div className="max-w-3xl">
                        <header className="mb-8 md:mb-12 border-b border-stone-200 pb-6">
                            <h2 className="text-3xl font-serif text-stone-900 mb-2">Personal Information</h2>
                            <p className="text-stone-500 font-light">Update your personal details and contact preferences.</p>
                        </header>

                        <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12">
                            <div className="flex flex-col items-center">
                                <div className="relative group cursor-pointer">
                                    <Avatar className="w-32 h-32 border border-stone-200">
                                        <AvatarImage src="/avatar.jpg" className="object-cover" />
                                        <AvatarFallback className="text-3xl font-serif bg-stone-100 text-stone-900">
                                            {user?.username?.charAt(0).toUpperCase() ?? "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button size="icon" variant="secondary" className="rounded-full h-8 w-8 bg-white/90 hover:bg-white text-stone-900 shadow-sm">
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2 sm:col-span-2">
                                        <Label className="text-stone-600 font-normal">Username</Label>
                                        <Input
                                            value={formData.username}
                                            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                                            className="bg-stone-50/50 border-stone-200 focus-visible:ring-stone-400"
                                        />
                                    </div>
                                    <div className="space-y-2 sm:col-span-2">
                                        <Label className="text-stone-600 font-normal">Email Address</Label>
                                        <Input
                                            value={formData.email}
                                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                            className="bg-stone-50/50 border-stone-200 focus-visible:ring-stone-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-stone-600 font-normal">Country Code</Label>
                                        <Input
                                            value={formData.countryCode}
                                            onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                                            placeholder="+1"
                                            className="bg-stone-50/50 border-stone-200 focus-visible:ring-stone-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-stone-600 font-normal">Phone Number</Label>
                                        <Input
                                            value={formData.phoneNumber}
                                            onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                                            placeholder="0123-456-789"
                                            className="bg-stone-50/50 border-stone-200 focus-visible:ring-stone-400"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-stone-600 font-normal">Gender</Label>
                                        <Select
                                            value={formData.gender}
                                            onValueChange={(val) => setFormData(prev => ({ ...prev, gender: val }))}
                                        >
                                            <SelectTrigger className="bg-stone-50/50 border-stone-200 focus:ring-stone-400">
                                                <SelectValue placeholder="Select Gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">Male</SelectItem>
                                                <SelectItem value="female">Female</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-stone-600 font-normal">Date of Birth</Label>
                                        <Input
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                                            className="bg-stone-50/50 border-stone-200 focus-visible:ring-stone-400"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 flex justify-end">
                                    <Button
                                        disabled={isLoading}
                                        className="bg-stone-900 text-stone-50 hover:bg-stone-800 px-8 rounded-none transition-all duration-300"
                                        onClick={handleSave}
                                    >
                                        {isLoading ? "Saving..." : "Save Changes"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "orders":
                return (
                    <div className="space-y-8">
                        <header className="border-b border-stone-200 pb-6 flex flex-col md:flex-row justify-between items-end gap-4">
                            <div>
                                <h2 className="text-3xl font-serif text-stone-900 mb-2">Order History</h2>
                                <p className="text-stone-500 font-light">View details of your past purchases.</p>
                            </div>
                        </header>

                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.id} className="group">
                                    <div className="border border-stone-200 bg-white transition-all duration-300 hover:border-stone-300 hover:shadow-sm">
                                        {/* Order Header */}
                                        <div className="bg-stone-50/50 px-6 py-4 border-b border-stone-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs md:text-sm">
                                            <div>
                                                <p className="text-stone-400 uppercase tracking-widest text-[10px] font-medium mb-1">Order ID</p>
                                                <p className="font-mono text-stone-900">{order.id}</p>
                                            </div>
                                            <div>
                                                <p className="text-stone-400 uppercase tracking-widest text-[10px] font-medium mb-1">Date</p>
                                                <p className="text-stone-900">{order.date}</p>
                                            </div>
                                            <div>
                                                <p className="text-stone-400 uppercase tracking-widest text-[10px] font-medium mb-1">Total</p>
                                                <p className="font-serif text-stone-900">₹{order.total.toFixed(2)}</p>
                                            </div>
                                            <div className="text-right md:text-left">
                                                <p className="text-stone-400 uppercase tracking-widest text-[10px] font-medium mb-1">Status</p>
                                                <div className="flex items-center gap-1.5">
                                                    {order.status === "Delivered" ? (
                                                        <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /><span className="text-emerald-700 font-medium">Delivered</span></>
                                                    ) : (
                                                        <><Clock className="w-3.5 h-3.5 text-amber-600" /><span className="text-amber-700 font-medium">Processing</span></>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Content */}
                                        <div className="p-6">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex gap-6 items-start mb-6 last:mb-0">
                                                    <div className="w-20 h-24 bg-stone-100 flex items-center justify-center text-2xl shrink-0">
                                                        {item.image}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-serif text-lg text-stone-900 mb-1 truncate">{item.name}</h4>
                                                        <p className="text-stone-500 text-sm mb-3">Qty: {item.qty} • {item.color} • {item.size}</p>

                                                        <div className="flex gap-4 mt-2">
                                                            <Link href="#" className="text-xs font-medium text-stone-900 hover:underline underline-offset-4 decoration-stone-300">View Product</Link>
                                                            {order.status === "Delivered" && (
                                                                <Link href="#" className="text-xs font-medium text-stone-900 hover:underline underline-offset-4 decoration-stone-300">Write Review</Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <Separator className="my-6 bg-stone-100" />

                                            <div className="flex justify-end gap-3">
                                                <Button variant="outline" className="border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900 rounded-none h-9 text-xs uppercase tracking-wider">
                                                    View Details
                                                </Button>
                                                <Button className="bg-stone-900 text-white hover:bg-stone-800 rounded-none h-9 text-xs uppercase tracking-wider">
                                                    Track Package
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "address":
                return (
                    <div  className="space-y-8">
                        <header className="border-b border-stone-200 pb-6 flex justify-between items-center">
                            <div>
                                <h2 className="text-3xl font-serif text-stone-900 mb-2">Address Book</h2>
                                <p className="text-stone-500 font-light">Manage your shipping destinations.</p>
                            </div>
                            <Button className="rounded-none bg-stone-900 text-white hover:bg-stone-800"><Plus className="w-4 h-4 mr-2" /> Add New</Button>
                        </header>

                        <div className="grid md:grid-cols-2 gap-6">
                            {addresses.map((addr) => (
                                <div key={addr.id}>
                                    <div className={cn(
                                        "p-6 border transition-all duration-300 relative group min-h-[180px] flex flex-col justify-between",
                                        addr.isDefault
                                            ? "border-stone-900 bg-stone-50/30"
                                            : "border-stone-200 bg-white hover:border-stone-400"
                                    )}>
                                        {addr.isDefault && (
                                            <span className="absolute top-0 right-0 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                                                Default
                                            </span>
                                        )}

                                        <div className="space-y-2">
                                            <h4 className="font-serif text-xl text-stone-900">{addr.name}</h4>
                                            <p className="text-stone-500 text-sm font-light leading-relaxed">{addr.street}<br />{addr.location}</p>
                                        </div>

                                        <div className="flex gap-4 pt-6 mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button className="text-xs font-bold uppercase tracking-widest text-stone-900 hover:underline">Edit</button>
                                            <button className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-red-700 hover:underline">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "payment":
                return (
                    <div className="space-y-8">
                        <header className="border-b border-stone-200 pb-6">
                            <h2 className="text-3xl font-serif text-stone-900 mb-2">Wallet & Cards</h2>
                            <p className="text-stone-500 font-light">Securely manage your payment methods.</p>
                        </header>

                        <div className="grid gap-4 max-w-2xl">
                            {cards.map((card) => (
                                <div  key={card.id}>
                                    <div className="flex items-center justify-between p-5 border border-stone-200 hover:border-stone-400 transition-colors bg-white">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-8 bg-stone-100 flex items-center justify-center rounded-sm border border-stone-200">
                                                <span className="text-[10px] font-bold uppercase text-stone-600">{card.type.substring(0, 2)}</span>
                                            </div>
                                            <div>
                                                <p className="font-medium text-stone-900 leading-none mb-1.5">{card.type}</p>
                                                <p className="text-xs text-stone-400 font-mono">{card.number || "Linked Account"}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-stone-400 hover:text-stone-900">Manage</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default: return null;
        }
    };

    return (
        <section>
            <div className="bg-[#fcfaf8] min-h-screen">
                <div className="container-custom py-12 md:py-20">

                    {/* Header Block */}
                    <div className="mb-12 md:mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-stone-900 mb-4 tracking-tight">My Account</h1>
                        <div className="h-px w-24 bg-stone-900 mb-6"></div>
                        <p className="text-stone-500 max-w-md font-light">
                            Welcome back, <span className="text-stone-800 font-medium">{user?.username ?? "Guest"}</span>. Manage your personal details, orders, and preferences from your dashboard.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Sidebar Navigation */}
                        <aside className="hidden lg:block lg:col-span-3 sticky top-24">
                            {/* User Profile Card */}
                            <div className="mb-6 p-4 border border-stone-200 bg-white">
                                <div className="flex items-center gap-3">
                                    <Avatar className="w-10 h-10 border border-stone-200">
                                        <AvatarImage src="/avatar.jpg" className="object-cover" />
                                        <AvatarFallback className="text-sm font-serif bg-stone-100 text-stone-900">
                                            {user?.username?.charAt(0).toUpperCase() ?? "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0">
                                        <p className="font-medium text-stone-900 text-sm truncate">{user?.username ?? "—"}</p>
                                        <p className="text-xs text-stone-400 truncate">{user?.email ?? "—"}</p>
                                    </div>
                                </div>
                                {user?.role && (
                                    <div className="mt-3 pt-3 border-t border-stone-100">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">{user.role}</span>
                                    </div>
                                )}
                            </div>

                            <nav className="space-y-1">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={cn(
                                            "w-full text-left px-4 py-4 border-l-2 transition-all duration-300 group",
                                            activeTab === item.id
                                                ? "border-stone-900 bg-white shadow-sm"
                                                : "border-transparent hover:border-stone-300 hover:bg-stone-50"
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className={cn(
                                                "w-4 h-4 transition-colors",
                                                activeTab === item.id ? "text-stone-900" : "text-stone-400 group-hover:text-stone-600"
                                            )} />
                                            <span className={cn(
                                                "font-medium text-sm tracking-wide uppercase",
                                                activeTab === item.id ? "text-stone-900" : "text-stone-500 group-hover:text-stone-900"
                                            )}>{item.label}</span>
                                        </div>
                                    </button>
                                ))}
                            </nav>
                        </aside>

                        {/* Mobile Tab Navigation */}
                        <div className="lg:hidden col-span-1 mb-8 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                            <div className="flex gap-4">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={cn(
                                            "whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all",
                                            activeTab === item.id
                                                ? "bg-stone-900 text-white border-stone-900"
                                                : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
                                        )}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Content Area */}
                        <main className="lg:col-span-9 min-h-[600px]">
                            {renderContent()}
                        </main>
                    </div>
                </div>
            </div>
        </section>
    );
}
