"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
import {
    Minus,
    Plus,
    // X,
    ArrowRight,
    ShoppingBag,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toaster";
// import { PageTransition } from "@/components/layout/PageTransition";
import { cartLocalStorageData, CartItem } from "@/localStorage/cartData";

export default function CartPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [giftCode, setGiftCode] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setCartItems(cartLocalStorageData.getCart());
        setIsLoaded(true);
        
        const handleCartUpdate = () => {
            setCartItems(cartLocalStorageData.getCart());
        };
        
        window.addEventListener("cartUpdated", handleCartUpdate);
        return () => window.removeEventListener("cartUpdated", handleCartUpdate);
    }, []);

    const handleGiftCodeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (giftCode.trim()) {
            console.log("Gift code submitted:", giftCode);
            toast({
                title: "Code Applied",
                description: `Gift code ${giftCode} has been applied to your order.`,
            });
            setGiftCode("");
        }
    };

    const updateQuantity = (id: string, delta: number) => {
        cartLocalStorageData.updateQuantity(id, delta);
    };

    const removeItem = (id: string) => {
        cartLocalStorageData.removeItem(id);
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = cartItems.length > 0 ? 250 : 0;
    const total = subtotal + shipping;

    if (!isLoaded) return null;

    if (cartItems.length === 0) {
        return (
            <section>
                <div className="bg-white min-h-[80vh] flex items-center justify-center font-sans">
                    <div
                        className="text-center max-w-lg px-6"
                    >
                        <div className="mb-8 relative flex justify-center">
                            <ShoppingBag className="h-24 w-24 text-stone-100" />
                            <div
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <ShoppingBag className="h-12 w-12 text-stone-300" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-serif text-stone-900 mb-4 lowercase italic">The bag is empty</h1>
                        <p className="text-stone-500 font-light mb-12 leading-relaxed">
                            Your curation is currently empty. Explore our collection of handcrafted
                            masterpieces to find the perfect addition to your space.
                        </p>
                        <Button
                            size="lg"
                            className="bg-stone-900 text-white rounded-none px-12 h-14 hover:bg-stone-800 transition-all uppercase tracking-widest text-xs font-bold"
                            asChild
                        >
                            <Link href="/products">
                                Explore Collection
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="bg-white min-h-screen font-sans">
                {/* Header Section */}
                <header className="border-b border-stone-100 py-8 lg:py-16 bg-stone-50/50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div
                            className="space-y-2"
                        >
                            <span className="text-stone-400 text-xs uppercase tracking-[0.3em] font-bold">Shopping Bag</span>
                            <h1 className="text-3xl md:text-5xl font-serif text-stone-900 tracking-tight lowercase italic">Your Selection</h1>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-6 py-8 lg:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">
                        {/* Cart Items Section */}
                        <div className="lg:col-span-8">
                            <div className=" ">
                                <section className="divide-y divide-stone-100">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group relative flex gap-4 md:gap-8 items-start md:items-center border-b border-stone-100 last:border-0 py-6 md:py-8"
                                        >
                                            {/* Product Image */}
                                            <div className="relative w-24 aspect-square md:w-32 lg:w-40 shrink-0 overflow-hidden bg-stone-50">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1 min-w-0 space-y-2 md:space-y-4">
                                                <div>
                                                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold mb-0.5 block">
                                                        {item.category}
                                                    </span>
                                                    <h3 className="text-base md:text-xl font-serif text-stone-900 hover:text-stone-600 transition-colors cursor-pointer truncate">
                                                        {item.name}
                                                    </h3>
                                                </div>

                                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-10">
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] uppercase tracking-widest text-stone-300 font-bold hidden md:block">Price</span>
                                                        <span className="text-sm md:text-base text-stone-900 font-light italic">₹{item.price.toLocaleString()}</span>
                                                    </div>

                                                    {/* Quantity Controls */}
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] uppercase tracking-widest text-stone-300 font-bold hidden md:block pl-5">Qty</span>
                                                        <div className="flex items-center gap-3 py-1">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="text-stone-400 hover:text-stone-900 transition-colors disabled:opacity-30"
                                                                disabled={item.quantity <= 1}
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </button>
                                                            <span className="text-xs font-medium w-4 text-center">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="text-stone-400 hover:text-stone-900 transition-colors"
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Total & Action */}
                                            <div className="flex flex-col items-end gap-2 md:gap-6 justify-between self-stretch md:self-auto border-l border-stone-100 pl-4 md:pl-8 ml-auto">
                                                <div className="text-right">
                                                    <span className="text-[10px] uppercase tracking-widest text-stone-300 font-bold block mb-0.5 md:hidden">Total</span>
                                                    <span className="text-[10px] uppercase tracking-widest text-stone-300 font-bold mb-0.5 hidden md:block">Subtotal</span>
                                                    <span className="text-sm md:text-xl font-serif text-stone-900 italic">₹{(item.price * item.quantity).toLocaleString()}</span>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="flex items-center gap-2 text-stone-300 hover:text-red-800 transition-colors text-[9px] uppercase tracking-widest font-bold group/remove mt-auto md:mt-0"
                                                >
                                                    <Trash2 className="h-3 w-3 group-hover/remove:scale-110 transition-transform" />
                                                    <span className="hidden md:inline">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </section>
                            </div>
                        </div>

                        {/* Summary Sidebar Column */}
                        <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
                            <div className="bg-stone-50 border border-stone-100 p-6 md:p-10 space-y-10">
                                <h2 className="text-2xl font-serif text-stone-900 italic lowercase">Summary</h2>

                                {/* Totals */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end pb-4 border-b border-stone-100/50">
                                        <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">Subtotal</span>
                                        <span className="text-lg text-stone-900 font-light italic">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-end pb-4 border-b border-stone-100/50">
                                        <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">Shipping</span>
                                        <span className="text-lg text-stone-900 font-light italic">₹{shipping.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4">
                                        <span className="text-xs uppercase tracking-widest text-stone-900 font-bold">Total</span>
                                        <span
                                            key={total}
                                            className="text-3xl font-serif text-stone-900 italic"
                                        >
                                            ₹{total.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Promo Code */}
                                <form onSubmit={handleGiftCodeSubmit} className="space-y-4">
                                    <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block">Gift Code</span>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            placeholder="Enter code"
                                            value={giftCode}
                                            onChange={(e) => setGiftCode(e.target.value)}
                                            className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                                        />
                                        <button type="submit" className="absolute right-0 bottom-2 text-stone-300 hover:text-stone-900 transition-colors">
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </form>

                                {/* CTA */}
                                <div className="space-y-4 pt-6">
                                    <Button
                                        className="w-full bg-stone-900 text-white rounded-none h-16 uppercase tracking-widest text-xs font-bold hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10"
                                        asChild
                                    >
                                        <Link href="/checkout">
                                            Proceed to Checkout
                                        </Link>
                                    </Button>
                                    <Link
                                        href="/products"
                                        className="block text-center text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 transition-colors py-2"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>

                                <div className="pt-8 border-t border-stone-100/50 flex items-center justify-center gap-4 opacity-30 grayscale pointer-events-none">
                                    <div className="h-6 w-10 bg-stone-200 rounded" />
                                    <div className="h-6 w-10 bg-stone-200 rounded" />
                                    <div className="h-6 w-10 bg-stone-200 rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
}
