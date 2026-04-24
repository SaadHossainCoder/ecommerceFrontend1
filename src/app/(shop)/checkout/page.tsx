"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
import {
    CreditCard,
    CheckCircle2,
    // ArrowRight,
    ArrowLeft,
    ShieldCheck,
    Truck,
    Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { PageTransition } from "@/components/layout/PageTransition";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cartLocalStorageData, CartItem } from "@/localStorage/cartData";

export default function CheckoutPage() {
    const [step, setStep] = useState(1); // 1: Delivery, 2: Payment, 3: Success
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [addressType, setAddressType] = useState("MY_ADDRESS");
    
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setCartItems(cartLocalStorageData.getCart());
        setIsLoaded(true);
    }, []);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = cartItems.length > 0 ? 250 : 0;
    const total = subtotal + shipping;

    const handleContinue = () => {
        setStep(2);
        window.scrollTo(0, 0);
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        // Simulate processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsProcessing(false);
        setStep(3);
        cartLocalStorageData.clearCart();
        window.scrollTo(0, 0);
    };

    if (step === 3) {
        return (
            <section>
                <div className="bg-white min-h-[80vh] flex items-center justify-center font-sans">
                    <div
                        className="text-center max-w-lg px-6"
                    >
                        <div className="mb-8 relative flex justify-center">
                            <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center">
                                <CheckCircle2 className="h-12 w-12 text-stone-900" />
                            </div>
                            <div
                                className="absolute -top-2 -right-2 bg-stone-900 text-white p-2 rounded-full"
                            >
                                <ShieldCheck className="h-4 w-4" />
                            </div>
                        </div>
                        <h1 className="text-4xl font-serif text-stone-900 mb-4 lowercase italic">Transaction Complete</h1>
                        <p className="text-stone-500 font-light mb-12 leading-relaxed">
                            Thank you for your acquisition. Your order #PH-82716 has been confirmed
                            and is being prepared by our master craftsmen.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="outline"
                                className="border-stone-200 text-stone-900 rounded-none px-8 h-12 uppercase tracking-widest text-xs font-bold hover:bg-stone-50"
                                asChild
                            >
                                <Link href="/myOrder">Track Order</Link>
                            </Button>
                            <Button
                                className="bg-stone-900 text-white rounded-none px-8 h-12 hover:bg-stone-800 transition-all uppercase tracking-widest text-xs font-bold"
                                asChild
                            >
                                <Link href="/products">Continue Curation</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section>
            <div className="bg-white min-h-screen font-sans">
                {/* Header Section */}
                <header className="border-b border-stone-100 py-12 bg-stone-50/50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                            <div
                                
                                className="space-y-2"
                            >
                                <div className="flex items-center gap-2 text-stone-400 text-xs tracking-[0.3em] uppercase font-bold">
                                    <Lock className="h-3 w-3" /> Secure Checkout
                                </div>
                                <h1 className="text-5xl font-serif text-stone-900 tracking-tight lowercase italic">Finalizing</h1>
                            </div>

                            {/* Step Indicator */}
                            <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-bold">
                                <div className={`flex items-center gap-3 ${step >= 1 ? 'text-stone-900' : 'text-stone-300'}`}>
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 1 ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200'}`}>01</span>
                                    <span>Information</span>
                                </div>
                                <div className="w-8 h-px bg-stone-200" />
                                <div className={`flex items-center gap-3 ${step >= 2 ? 'text-stone-900' : 'text-stone-300'}`}>
                                    <span className={`w-6 h-6 rounded-full flex items-center justify-center border ${step >= 2 ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200'}`}>02</span>
                                    <span>Payment</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                        {/* Main Interaction Area */}
                        <div className="lg:col-span-8">
                            <section>
                                {step === 1 ? (
                                    <div
                                        key="billing"
                                        className="space-y-16"
                                    >
                                        <section className="space-y-10">
                                            <h2 className="text-2xl font-serif text-stone-900 italic lowercase border-b border-stone-100 pb-4">Shipping Destination</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Full Name</Label>
                                                    <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors" placeholder="e.g. Nils Sveje" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Phone Number</Label>
                                                    <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors" placeholder="+91 98765 43210" />
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Email Address</Label>
                                                    <input type="email" className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors" placeholder="nils@inodasveje.com" />
                                                </div>
                                                <div className="space-y-2 md:col-span-2">
                                                    <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Street Address</Label>
                                                    <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors" placeholder="Studio 12, Artisans Alley" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">City</Label>
                                                    <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors" placeholder="Milan" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">State</Label>
                                                    <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors" placeholder="Lombardy" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Postal Code</Label>
                                                    <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors" placeholder="20121" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Country</Label>
                                                    <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors" placeholder="Italy" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Address Label</Label>
                                                    <select className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors">
                                                        <option value="Home">Home</option>
                                                        <option value="Office">Office</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Address Type</Label>
                                                    <select 
                                                        className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors" 
                                                        value={addressType} 
                                                        onChange={(e) => setAddressType(e.target.value)}
                                                    >
                                                        <option value="MY_ADDRESS">My Address</option>
                                                        <option value="GIFT_ADDRESS">Gift Address</option>
                                                    </select>
                                                </div>

                                                {addressType === 'GIFT_ADDRESS' && (
                                                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mt-4 pt-8 border-t border-stone-100">
                                                        <div className="space-y-2 md:col-span-2">
                                                            <h3 className="text-lg font-serif text-stone-900 italic lowercase">Gift Details</h3>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Recipient Name</Label>
                                                            <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors" placeholder="Friend's Name" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Recipient Phone</Label>
                                                            <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors" placeholder="+91 98765 43210" />
                                                        </div>
                                                        <div className="space-y-2 md:col-span-2">
                                                            <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Gift Message (Optional)</Label>
                                                            <textarea className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors resize-none" rows={3} placeholder="Add a personalized message..." />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </section>

                                        <section className="space-y-8">
                                            <h2 className="text-2xl font-serif text-stone-900 italic lowercase border-b border-stone-100 pb-4">Delivery Method</h2>
                                            <RadioGroup defaultValue="express" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <Label
                                                    htmlFor="standard"
                                                    className="relative flex items-center justify-between p-6 border border-stone-200 cursor-pointer hover:bg-stone-50 transition-colors aria-checked:border-stone-900 group"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <RadioGroupItem value="standard" id="standard" className="sr-only" />
                                                        <div className="space-y-1">
                                                            <span className="text-xs uppercase tracking-widest font-bold text-stone-900">Standard Freight</span>
                                                            <span className="text-[10px] text-stone-400 block tracking-wider uppercase">10-15 Business Days</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-serif italic text-stone-900">Complimentary</span>
                                                </Label>
                                                <Label
                                                    htmlFor="express"
                                                    className="relative flex items-center justify-between p-6 border border-stone-200 cursor-pointer hover:bg-stone-50 transition-colors aria-checked:border-stone-900"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <RadioGroupItem value="express" id="express" className="sr-only" />
                                                        <div className="space-y-1">
                                                            <span className="text-xs uppercase tracking-widest font-bold text-stone-900">Artisan Handling</span>
                                                            <span className="text-[10px] text-stone-400 block tracking-wider uppercase">3-5 Business Days</span>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-serif italic text-stone-900">₹250</span>
                                                </Label>
                                            </RadioGroup>
                                        </section>

                                        <div className="pt-8 flex items-center justify-between">
                                            <Link href="/cart" className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors text-[10px] uppercase tracking-widest font-bold">
                                                <ArrowLeft className="h-4 w-4" /> Return to Bag
                                            </Link>
                                            <Button
                                                onClick={handleContinue}
                                                className="bg-stone-900 text-white rounded-none h-14 px-12 uppercase tracking-widest text-xs font-bold hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10"
                                            >
                                                Next: Payment
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        key="payment"
                                        className="space-y-16"
                                    >
                                        <section className="space-y-10">
                                            <h2 className="text-2xl font-serif text-stone-900 italic lowercase border-b border-stone-100 pb-4">Secure Payment</h2>

                                            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-6">
                                                {/* Card Payment */}
                                                <div className={`relative border p-8 transition-all ${paymentMethod === 'card' ? 'border-stone-900 bg-stone-50/50' : 'border-stone-100'}`}>
                                                    <Label htmlFor="card" className="flex items-center justify-between cursor-pointer w-full mb-8">
                                                        <div className="flex items-center gap-4">
                                                            <RadioGroupItem value="card" id="card" />
                                                            <div className="space-y-1">
                                                                <span className="text-xs uppercase tracking-widest font-bold text-stone-900">Credit or Debit Card</span>
                                                                <span className="text-[10px] text-stone-400 block tracking-wider uppercase italic">Encrypted via Artisan Vault</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 opacity-30 grayscale">
                                                            <div className="h-4 w-6 bg-stone-400 rounded-sm" />
                                                            <div className="h-4 w-6 bg-stone-400 rounded-sm" />
                                                        </div>
                                                    </Label>

                                                    <section>
                                                        {paymentMethod === 'card' && (
                                                            <div
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                                                    <div className="space-y-2 md:col-span-2">
                                                                        <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Card Number</Label>
                                                                        <div className="relative">
                                                                            <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors pr-10" placeholder="0000 0000 0000 0000" />
                                                                            <CreditCard className="absolute right-0 bottom-2.5 h-4 w-4 text-stone-200" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Expiration Date</Label>
                                                                        <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors" placeholder="MM / YY" />
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">Security Code</Label>
                                                                        <input className="w-full bg-transparent border-b border-stone-200 py-2 text-sm focus:outline-none focus:border-stone-900 transition-colors" placeholder="CVV" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </section>
                                                </div>

                                                {/* Alternative Methods */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <Label
                                                        htmlFor="paypal"
                                                        className={`flex items-center gap-4 p-6 border transition-all cursor-pointer ${paymentMethod === 'paypal' ? 'border-stone-900 bg-stone-50' : 'border-stone-100 hover:bg-stone-50/30'}`}
                                                    >
                                                        <RadioGroupItem value="paypal" id="paypal" />
                                                        <span className="text-xs uppercase tracking-widest font-bold text-stone-900">PayPal</span>
                                                    </Label>
                                                    <Label
                                                        htmlFor="cod"
                                                        className={`flex items-center gap-4 p-6 border transition-all cursor-pointer ${paymentMethod === 'cod' ? 'border-stone-900 bg-stone-50' : 'border-stone-100 hover:bg-stone-50/30'}`}
                                                    >
                                                        <RadioGroupItem value="cod" id="cod" />
                                                        <div className="space-y-1">
                                                            <span className="text-xs uppercase tracking-widest font-bold text-stone-900">Collection Payment</span>
                                                            <span className="text-[9px] text-stone-400 block tracking-widest uppercase italic">Pay at the Gallery</span>
                                                        </div>
                                                    </Label>
                                                </div>
                                            </RadioGroup>
                                        </section>

                                        <div className="pt-8 flex items-center justify-between">
                                            <button
                                                onClick={() => setStep(1)}
                                                className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors text-[10px] uppercase tracking-widest font-bold"
                                            >
                                                <ArrowLeft className="h-4 w-4" /> Back to Shipping
                                            </button>
                                            <Button
                                                onClick={handlePayment}
                                                disabled={isProcessing}
                                                className="bg-stone-900 text-white rounded-none h-14 px-12 uppercase tracking-widest text-xs font-bold hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/10"
                                            >
                                                {isProcessing ? "Verifying..." : "Settle Balance"}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* Order Summary Column */}
                        <div className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
                            <div className="bg-stone-50 border border-stone-100 p-10 space-y-10">
                                <h2 className="text-2xl font-serif text-stone-900 italic lowercase">Order Summary</h2>

                                {/* Items Brief */}
                                <div className="space-y-6">
                                    {cartItems.slice(0, 1).map((item) => (
                                        <div key={item.id} className="flex items-start gap-4 pb-6 border-b border-stone-100">
                                            <div className="relative h-16 w-12 bg-stone-100 border border-stone-200">
                                                <Image
                                                    src={item.image}
                                                    alt="item"
                                                    fill
                                                    className="object-cover grayscale"
                                                />
                                                <div className="absolute -top-2 -right-2 h-5 w-5 bg-stone-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold">{item.quantity}</div>
                                            </div>
                                            <div className="space-y-1 flex-1">
                                                <span className="text-[10px] uppercase tracking-widest text-stone-400 font-bold block pt-1 leading-none">{item.category || "Item"}</span>
                                                <h4 className="text-sm font-serif text-stone-900">{item.name}</h4>
                                            </div>
                                            <span className="text-sm text-stone-900 font-light italic pt-1">₹{item.price.toLocaleString()}</span>
                                        </div>
                                    ))}
                                    {cartItems.length > 1 && (
                                        <button className="w-full text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 transition-colors py-2 text-center border-b border-stone-100">
                                            + {cartItems.length - 1} other pieces
                                        </button>
                                    )}
                                </div>

                                {/* Totals */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end pb-4 border-b border-stone-100/50">
                                        <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">Inventory</span>
                                        <span className="text-lg text-stone-900 font-light italic">₹{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-end pb-4 border-b border-stone-100/50">
                                        <span className="text-xs uppercase tracking-widest text-stone-400 font-bold">Acquisition Fee</span>
                                        <span className="text-lg text-stone-900 font-light italic">₹{shipping.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-4">
                                        <span className="text-xs uppercase tracking-widest text-stone-900 font-bold">Total</span>
                                        <span
                                            className="text-3xl font-serif text-stone-900 italic"
                                        >
                                            ₹{total.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-8 flex flex-col items-center gap-4">
                                    <div className="flex justify-center gap-6 opacity-30 grayscale pointer-events-none">
                                        <ShieldCheck className="h-5 w-5 text-stone-900" />
                                        <Lock className="h-5 w-5 text-stone-900" />
                                        <Truck className="h-5 w-5 text-stone-900" />
                                    </div>
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-stone-300 font-bold text-center">
                                        Secure Artisanal Transaction
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </section>
    );
}
