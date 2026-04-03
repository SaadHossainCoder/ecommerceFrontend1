"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Heart,
    Gift,
    Truck,
    ChevronRight,
    Star,
    ShoppingBag,
    // Instagram,
    ArrowRight,
    Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
    { icon: Heart, title: "Personalized",  description: "Add a personal touch to every box with custom messages and monograms." },
    { icon: Gift,  title: "Gift Cards",   description: "Choose from our curated digital and physical gift cards." },
    { icon: Truck, title: "Across India", description: "Seamless, insured delivery of your heritage pieces nationwide." },
];

const giftShowcase = [
    {
        id: "anniversary",
        title: "The Anniversary Box",
        subtitle: "For Shared Journeys",
        description: "A curated collection of timeless elegance to celebrate lasting memories. Each piece chosen with care.",
        image: "https://images.unsplash.com/photo-1549465220-1d8c9d9c6703?q=80&w=800&auto=format&fit=crop",
        tag: "New Arrival",
        price: "From ₹2,499",
        reversed: false,
    },
    {
        id: "celebration",
        title: "The Celebration Box",
        subtitle: "For Festive Spirits",
        description: "Brimming with festive spirit and curated delights to make every occasion unforgettable.",
        image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=800&auto=format&fit=crop",
        tag: "Top Seller",
        price: "From ₹3,999",
        reversed: true,
    },
    {
        id: "luxury",
        title: "The Luxury Box",
        subtitle: "For Discerning Tastes",
        description: "Thoughtfully assembled to bring artisanal charm and lasting impression to their special day.",
        image: "https://images.unsplash.com/photo-1511177545613-b150c99da9ac?q=80&w=800&auto=format&fit=crop",
        tag: "Best",
        price: "From ₹5,499",
        reversed: false,
    },
];

const goBranchesGifts = [
    { title: "Classic Box",  image: "https://images.unsplash.com/photo-1549465220-1d8c9d9c6703?q=80&w=400&auto=format&fit=crop", price: "₹1,299" },
    { title: "Bespoke Set",  image: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=400&auto=format&fit=crop", price: "₹2,149" },
    { title: "Heritage Box", image: "https://images.unsplash.com/photo-1511177545613-b150c99da9ac?q=80&w=400&auto=format&fit=crop", price: "₹3,450" },
    { title: "Grand Gift",   image: "", price: "₹4,999" },
];

const productCategories = [
    { name: "Saree",    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?q=80&w=800&auto=format&fit=crop",  description: "Pure Silk & Hand-woven" },
    { name: "Kurta",    image: "https://images.unsplash.com/photo-1597983073453-ef45a63968db?q=80&w=800&auto=format&fit=crop",  description: "Artisanally Tailored" },
    { name: "Wallet",   image: "https://images.unsplash.com/photo-1627123430984-717da62dc183?q=80&w=800&auto=format&fit=crop",  description: "Full-grain Leather" },
    { name: "Clutch",   image: "https://images.unsplash.com/photo-1566150905458-1bf1fd113961?q=80&w=800&auto=format&fit=crop",  description: "Hand-crafted Eveningwear" },
    { name: "Jewelry",  image: "https://images.unsplash.com/photo-1515562141207-7a1886ce96c3?q=80&w=800&auto=format&fit=crop",  description: "Timeless Heritage" },
    { name: "Notebook", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",  description: "Hand-pressed Paper" },
];

const priceBlocks = [
    { label: "Gifts Under", value: "₹1,000", href: "/products?price=1000" },
    { label: "Gifts Under", value: "₹2,500", href: "/products?price=2500" },
    { label: "Gifts Under", value: "₹5,000", href: "/products?price=5000" },
    { label: "Premium",     value: "Gifts",  href: "/products?price=premium" },
];

const stats = [
    { value: "12,000+", label: "Gifts Delivered" },
    { value: "500+",    label: "Artisan Partners" },
    { value: "4.9",     label: "Average Rating" },
    { value: "1947",    label: "Established" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GiftingPage() {
    return (
        <div className="bg-white min-h-screen">

            {/* ── Hero ────────────────────────────────────────────────────── */}
            <section className="relative h-[85vh] w-full overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=2000&auto=format&fit=crop"
                    alt="Artisanal Gifting"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/50 to-transparent" />

                <div className="absolute inset-0 flex items-end pb-20 px-8 md:px-20">
                    <div className="max-w-2xl space-y-6">
                        <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A25D] font-semibold">
                            Heritage Gifting — Est. 1947
                        </p>
                        <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.05] tracking-tight">
                            Give the Gift<br />
                            <span className="italic font-light text-stone-300">of Heritage</span>
                        </h1>
                        <p className="text-stone-300 text-base font-light leading-relaxed max-w-md">
                            Curated artisanal boxes from the heart of Shantiniketan — crafted to be remembered.
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Button className="bg-[#C5A25D] hover:bg-[#B8924A] text-white rounded-none px-8 py-6 text-xs uppercase tracking-[0.3em] font-bold">
                                Shop Gift Boxes
                                <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button variant="ghost" className="text-white border border-white/30 hover:bg-white/10 rounded-none px-8 py-6 text-xs uppercase tracking-[0.3em] font-bold">
                                Contact Concierge
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats Bar ───────────────────────────────────────────────── */}
            <section className="bg-stone-900 py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-700">
                        {stats.map((s) => (
                            <div key={s.label} className="flex flex-col items-center py-4 px-6 text-center">
                                <span className="text-2xl md:text-3xl font-serif text-[#C5A25D] font-light">{s.value}</span>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium mt-1">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Features ────────────────────────────────────────────────── */}
            <section className="py-24 bg-stone-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A25D] font-semibold mb-3">Why Choose Us</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-stone-900">The Art of Giving</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-px bg-stone-200">
                        {features.map((item) => (
                            <div key={item.title} className="bg-stone-50 p-10 group hover:bg-white transition-colors duration-300">
                                <div className="w-12 h-12 border border-[#C5A25D]/40 flex items-center justify-center mb-8 text-[#C5A25D]">
                                    <item.icon className="w-5 h-5 stroke-[1.5]" />
                                </div>
                                <h3 className="text-lg font-serif text-stone-900 mb-3">{item.title}</h3>
                                <p className="text-stone-500 text-sm leading-relaxed font-light">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Gift Showcase ────────────────────────────────────────────── */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-16">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A25D] font-semibold mb-3">Curated Collections</p>
                            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">Signature Gift Boxes</h2>
                        </div>
                        <Link href="/products" className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-stone-500 hover:text-stone-900 transition-colors">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="space-y-0 divide-y divide-stone-100">
                        {giftShowcase.map((box, idx) => (
                            <div
                                key={box.id}
                                className={`grid md:grid-cols-2 gap-0 group ${box.reversed ? "md:[direction:rtl]" : ""}`}
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100" style={{ direction: "ltr" }}>
                                    <Image
                                        src={box.image}
                                        alt={box.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-[#C5A25D] text-white text-[9px] uppercase tracking-[0.3em] font-bold px-3 py-1.5">
                                            {box.tag}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex items-center" style={{ direction: "ltr" }}>
                                    <div className="p-10 md:p-16 space-y-6 w-full">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#C5A25D] font-semibold mb-2">{box.subtitle}</p>
                                            <h3 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight">{box.title}</h3>
                                        </div>
                                        <p className="text-stone-500 font-light leading-relaxed text-sm border-l-2 border-[#C5A25D]/30 pl-4">
                                            {box.description}
                                        </p>
                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-2xl font-serif text-stone-900 font-light">{box.price}</span>
                                            <Button className="bg-stone-900 hover:bg-[#C5A25D] text-white rounded-none px-8 py-5 text-[10px] uppercase tracking-[0.3em] font-bold transition-colors duration-300">
                                                Reserve
                                                <ChevronRight className="ml-1 w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Go Branches Gift Boxes ───────────────────────────────────── */}
            <section className="py-24 bg-stone-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-end justify-between mb-12">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A25D] font-semibold mb-3">Quick Selection</p>
                            <h2 className="text-3xl md:text-4xl font-serif text-stone-900">Go Branches Gift Boxes</h2>
                        </div>
                        <Link href="/products" className="hidden md:flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-stone-500 hover:text-stone-900 transition-colors">
                            Browse All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {goBranchesGifts.map((item, idx) => (
                            <div key={idx} className="group cursor-pointer">
                                <div className="relative aspect-square overflow-hidden bg-stone-100 mb-4">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button size="sm" className="w-full bg-white text-stone-900 hover:bg-[#C5A25D] hover:text-white rounded-none text-[9px] uppercase tracking-[0.2em] font-bold transition-colors">
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                                <h3 className="text-sm font-semibold text-stone-900 tracking-wide">{item.title}</h3>
                                <p className="text-[#C5A25D] font-serif text-sm mt-1">{item.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Shop by Category ────────────────────────────────────────── */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-12">
                        <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A25D] font-semibold mb-3">What&apos;s Inside</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-stone-900">Shop by Category</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {productCategories.map((cat) => (
                            <Link key={cat.name} href={`/products?category=${cat.name.toLowerCase()}`} className="group block">
                                <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-3">
                                    <Image
                                        src={cat.image}
                                        alt={cat.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-stone-900/40 transition-colors duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-white font-serif text-lg">{cat.name}</h3>
                                    </div>
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-medium">{cat.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Shop by Price ────────────────────────────────────────────── */}
            <section className="py-24 bg-stone-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-12">
                        <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A25D] font-semibold mb-3">Budget-Friendly</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-white">Shop by Price</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {priceBlocks.map((block, idx) => (
                            <Link
                                key={idx}
                                href={block.href}
                                className="group relative border border-stone-700 hover:border-[#C5A25D] transition-colors duration-300 p-8 md:p-12 flex flex-col justify-between min-h-[200px] md:min-h-[240px]"
                            >
                                <span className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-semibold group-hover:text-[#C5A25D] transition-colors">{block.label}</span>
                                <div>
                                    <p className="text-3xl md:text-4xl font-serif text-white mb-4">{block.value}</p>
                                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-stone-500 group-hover:text-[#C5A25D] transition-colors font-semibold">
                                        Shop Now <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Testimonial Banner ───────────────────────────────────────── */}
            <section className="py-20 bg-[#C5A25D]">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                    <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-white fill-white" />
                        ))}
                    </div>
                    <blockquote className="text-2xl md:text-3xl font-serif text-white italic leading-relaxed">
                        &quot;Because some treasures are too precious to be simply given — they must be shared.&quot;
                    </blockquote>
                    <p className="text-white/70 text-xs uppercase tracking-[0.4em] font-semibold">The Gemini Heritage Promise</p>
                </div>
            </section>

            {/* ── FAQ ─────────────────────────────────────────────────────── */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-16">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A25D] font-semibold mb-3">Support</p>
                            <h2 className="text-3xl font-serif text-stone-900 mb-6">Gifting Questions</h2>
                            <p className="text-stone-500 text-sm font-light leading-relaxed mb-8">
                                Have more questions? Our gifting concierge is available 7 days a week to help you find the perfect selection.
                            </p>
                            <div className="flex items-center gap-3 text-sm text-stone-700 font-medium">
                                <Phone className="w-4 h-4 text-[#C5A25D]" />
                                +91 98765 43210
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <Accordion type="single" collapsible className="space-y-3">
                                {[
                                    {
                                        q: "Can I customize the contents of a gift box?",
                                        a: "Absolutely. We offer bespoke customization for corporate orders and select premium collections. Connect with our concierge for personalized assistance."
                                    },
                                    {
                                        q: "How do you manage fragile shipping?",
                                        a: "Each piece is meticulously hand-packed in sustainable, protective cushioning to ensure the artisanal heritage reaches you in pristine condition."
                                    },
                                    {
                                        q: "What is your return policy for gifts?",
                                        a: "We offer a 7-day hassle-free return policy for all standard gift boxes. Bespoke and personalized orders are final sale."
                                    },
                                    {
                                        q: "Do you offer corporate gifting solutions?",
                                        a: "Yes. We work with companies of all sizes to create branded gifting experiences. Reach out to our corporate team for bulk pricing and custom packaging."
                                    },
                                ].map((item, idx) => (
                                    <AccordionItem
                                        key={idx}
                                        value={`item-${idx}`}
                                        className="border border-stone-100 px-6 bg-stone-50/50 rounded-none"
                                    >
                                        <AccordionTrigger className="text-sm font-semibold text-stone-900 hover:text-[#C5A25D] py-5 text-left [&>svg]:text-[#C5A25D]">
                                            {item.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-stone-500 font-light leading-relaxed text-sm pb-5">
                                            {item.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Final CTA ────────────────────────────────────────────────── */}
            <section className="bg-stone-50 border-t border-stone-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200">
                        {/* Left: CTA */}
                        <div className="py-20 md:pr-16 space-y-6">
                            <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A25D] font-semibold">The Legacy Continues</p>
                            <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
                                Crafting Your<br />
                                <span className="italic font-light text-stone-400">Perfect Moment</span>
                            </h2>
                            <p className="text-stone-500 font-light leading-relaxed max-w-sm text-sm">
                                Browse our full collection of heritage gifts, or speak to our concierge to build something entirely bespoke.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                <Button className="bg-stone-900 hover:bg-[#C5A25D] text-white rounded-none px-8 py-6 text-xs uppercase tracking-[0.3em] font-bold transition-colors duration-300">
                                    <ShoppingBag className="mr-2 w-4 h-4" />
                                    Explore Collection
                                </Button>
                                <Button variant="outline" className="rounded-none border-stone-300 hover:border-stone-900 px-8 py-6 text-xs uppercase tracking-[0.3em] font-bold">
                                    Contact Concierge
                                </Button>
                            </div>
                        </div>

                        {/* Right: Social + Info */}
                        <div className="py-20 md:pl-16 space-y-10">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-semibold mb-6">Follow Our Craft</p>
                                <div className="flex gap-6">
                                    <Link href="#" className="flex items-center gap-3 group">
                                        <div className="w-10 h-10 border border-stone-200 group-hover:border-[#C5A25D] flex items-center justify-center transition-colors">
                                            {/* <Instagram className="w-4 h-4 text-stone-400 group-hover:text-[#C5A25D] transition-colors" /> */}
                                        </div>
                                        <span className="text-xs text-stone-500 group-hover:text-stone-900 transition-colors font-medium">@geminiheritage</span>
                                    </Link>
                                    <Link href="#" className="flex items-center gap-3 group">
                                        <div className="w-10 h-10 border border-stone-200 group-hover:border-[#C5A25D] flex items-center justify-center transition-colors">
                                            <Star className="w-4 h-4 text-stone-400 group-hover:text-[#C5A25D] transition-colors" />
                                        </div>
                                        <span className="text-xs text-stone-500 group-hover:text-stone-900 transition-colors font-medium">Join the Circle</span>
                                    </Link>
                                </div>
                            </div>

                            <div className="border-t border-stone-100 pt-10 grid grid-cols-2 gap-8">
                                {[
                                    { label: "Origin",  value: "Shantiniketan, India" },
                                    { label: "Founded", value: "1947" },
                                    { label: "Delivery", value: "Pan India" },
                                    { label: "Support",  value: "7 Days a Week" },
                                ].map(({ label, value }) => (
                                    <div key={label}>
                                        <p className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-semibold mb-1">{label}</p>
                                        <p className="text-sm font-semibold text-stone-800">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}