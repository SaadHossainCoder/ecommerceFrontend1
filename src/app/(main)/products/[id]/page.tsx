"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Star, Heart, ShoppingCart, Minus, Plus,
    Truck, RotateCcw, ChevronRight, ArrowLeft,
    Shield, X, ChevronLeft, ZoomIn, Package,
    CheckCircle2, Info,
} from "lucide-react";
import { toast } from "@/components/ui/toaster";

// ─── Data ─────────────────────────────────────────────────────────────────────

const product = {
    id: 1,
    name: "Golden Imperial Bracelet",
    category: "High Jewelry",
    sku: "ROY-BR-001",
    price: 4200,
    originalPrice: 6500,
    rating: 4.9,
    reviews: 145,
    description: "Meticulously crafted with 24k gold and studded with ethically sourced diamonds, this piece is designed to be a timeless addition to your jewelry collection. Perfect for evening wear or adding a touch of sophistication to your daily ensemble.",
    details: [
        "Handcrafted in Shantiniketan",
        "24k Authentic Bengal Gold",
        "Ethically Sourced Conflict-Free Diamonds",
        "Traditional Mokashri Work Engraving",
        "Velvet-lined Mahogany Presentation Case",
    ],
    images: [
        "https://i.pinimg.com/736x/35/c2/22/35c2222860cd7dde4454496c6ba04974.jpg",
        "https://i.pinimg.com/1200x/b5/80/93/b580936b1e1647686ac05a661c0c7247.jpg",
        "https://i.pinimg.com/736x/58/07/23/580723fd9c936125545a583e130156e8.jpg",
        "https://i.pinimg.com/1200x/84/f4/f9/84f4f9b61a3885784b637a0e9454dbcd.jpg",
    ],
    colors: [
        { name: "Sovereign Gold", value: "#C9A24D" },
        { name: "Rose Heritage",  value: "#E1A7A7" },
        { name: "Lunar Silver",   value: "#C0C0C0" },
    ],
    sizes: ["16cm", "18cm", "20cm", "Bespoke"],
    specs: [
        { label: "Weight",      value: "124g"       },
        { label: "Purity",      value: "24K Gold"   },
        { label: "Gemstones",   value: "48 Diamonds"},
        { label: "Certificate", value: "Hallmarked" },
        { label: "Origin",      value: "Shantiniketan, India" },
        { label: "Since",       value: "1951"       },
    ],
};

const reviews = [
    { id: 1, user: "Lady Victoria",      avatar: "LV", rating: 5, date: "2 weeks ago",  content: "The craftsmanship is unparalleled. It arrived in a stunning case that speaks of its royal lineage. A true heirloom." },
    { id: 2, user: "Arthur Penhaligon",  avatar: "AP", rating: 5, date: "1 month ago",  content: "One can feel the Shantiniketan tradition in the fine engravings. Truly a piece for a distinguished collection." },
    { id: 3, user: "Lord Saxon",         avatar: "LS", rating: 5, date: "3 days ago",   content: "Exceptional Royal craftsmanship. It arrived in a mahogany case that perfectly fits my collection vault." },
];

const ratingBreakdown = [
    { label: "5", count: 989,  pct: 85 },
    { label: "4", count: 4500, pct: 70 },
    { label: "3", count: 50,   pct: 15 },
    { label: "2", count: 16,   pct: 8  },
    { label: "1", count: 8,    pct: 5  },
];

const relatedProducts = [
    { id: 2, name: "Pearl Empress Necklace",   price: 3800, image: "https://i.pinimg.com/1200x/b5/80/93/b580936b1e1647686ac05a661c0c7247.jpg" },
    { id: 3, name: "Diamond Sovereign Ring",   price: 5200, image: "https://i.pinimg.com/736x/58/07/23/580723fd9c936125545a583e130156e8.jpg" },
    { id: 4, name: "Ruby Heritage Earrings",   price: 2900, image: "https://i.pinimg.com/1200x/84/f4/f9/84f4f9b61a3885784b637a0e9454dbcd.jpg" },
    { id: 5, name: "Emerald Estate Pendant",   price: 4600, image: "https://i.pinimg.com/736x/35/c2/22/35c2222860cd7dde4454496c6ba04974.jpg" },
];

const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

// ─── Zoom Component ───────────────────────────────────────────────────────────

function ImageZoom({ src, alt }: { src: string; alt: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);
    const [lens, setLens]         = useState({ x: 0, y: 0 });
    const [result, setResult]     = useState({ x: 0, y: 0 });
    const LENS = 140;
    const ZOOM = 2.8;

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - r.left - LENS / 2, r.width  - LENS));
        const y = Math.max(0, Math.min(e.clientY - r.top  - LENS / 2, r.height - LENS));
        setLens({ x, y });
        setResult({ x: (x / (r.width - LENS)) * 100, y: (y / (r.height - LENS)) * 100 });
    };

    return (
        <div className="flex gap-4">
            <div
                ref={ref}
                className="relative w-full aspect-[4/5] overflow-hidden bg-stone-100 cursor-crosshair select-none"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onMouseMove={onMove}
            >
                <Image src={src} alt={alt} fill className="object-cover pointer-events-none" priority draggable={false} />

                {hovering && (
                    <div
                        className="absolute pointer-events-none z-10 border border-stone-400/50 bg-white/10"
                        style={{ width: LENS, height: LENS, left: lens.x, top: lens.y }}
                    />
                )}

                {!hovering && (
                    <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] flex items-center gap-1.5 backdrop-blur-sm">
                        <ZoomIn className="w-3 h-3" /> Hover to zoom
                    </div>
                )}
            </div>

            {hovering && (
                <div
                    className="hidden lg:block absolute left-full top-0 ml-3 z-50 border border-stone-200 bg-white shadow-2xl overflow-hidden pointer-events-none shrink-0"
                    style={{
                        width: 400, height: 400,
                        backgroundImage: `url(${src})`,
                        backgroundSize: `${ZOOM * 100}%`,
                        backgroundPosition: `${result.x}% ${result.y}%`,
                        backgroundRepeat: "no-repeat",
                    }}
                />
            )}
        </div>
    );
}

// ─── Star Row ─────────────────────────────────────────────────────────────────

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "xs" }) {
    const s = size === "xs" ? "w-3 h-3" : "w-4 h-4";
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`${s} ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-stone-200 fill-stone-200"}`} />
            ))}
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductDetailsPage() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity,      setQuantity]      = useState(1);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize,  setSelectedSize]  = useState("18cm");
    const [wishlisted,    setWishlisted]    = useState(false);
    const [activeTab,     setActiveTab]     = useState<"details" | "specs" | "care">("details");
    const [reviewRating,  setReviewRating]  = useState(0);
    const [hoverRating,   setHoverRating]   = useState(0);
    const [showSticky,    setShowSticky]    = useState(false);
    const [autoPlay,      setAutoPlay]      = useState(true);
    const [lightbox,      setLightbox]      = useState(false);

    useEffect(() => {
        if (!autoPlay || lightbox) return;
        const t = setInterval(() => setSelectedImage(p => (p + 1) % product.images.length), 4000);
        return () => clearInterval(t);
    }, [autoPlay, lightbox]);

    useEffect(() => {
        const fn = () => setShowSticky(window.scrollY > 700);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    useEffect(() => {
        const fn = (e: KeyboardEvent) => {
            if (!lightbox) return;
            if (e.key === "ArrowRight") setSelectedImage(p => (p + 1) % product.images.length);
            if (e.key === "ArrowLeft")  setSelectedImage(p => (p - 1 + product.images.length) % product.images.length);
            if (e.key === "Escape")     setLightbox(false);
        };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, [lightbox]);

    const prev = () => setSelectedImage(p => (p - 1 + product.images.length) % product.images.length);
    const next = () => setSelectedImage(p => (p + 1) % product.images.length);

    return (
        <div className="min-h-screen bg-stone-50">

            {/* ── Breadcrumb ── */}
            <div className="bg-white border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] font-semibold text-stone-400">
                        <Link href="/home"     className="hover:text-stone-700 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/products" className="hover:text-stone-700 transition-colors">Vault</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/products" className="hover:text-stone-700 transition-colors">{product.category}</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-stone-700 truncate max-w-40">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">

                {/* ── Back ── */}
                <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-stone-400 hover:text-stone-900 transition-colors mb-8"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Shop
                </Link>

                {/* ── Hero Grid ── */}
                <div className="grid lg:grid-cols-12 gap-8 xl:gap-14 mb-16">

                    {/* Gallery — 7 cols */}
                    <div className="lg:col-span-7 space-y-3">
                        <div
                            className="relative"
                            onMouseEnter={() => setAutoPlay(false)}
                            onMouseLeave={() => setAutoPlay(true)}
                        >
                            <ImageZoom src={product.images[selectedImage]} alt={product.name} />

                            {/* Nav arrows */}
                            <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-stone-200 flex items-center justify-center hover:bg-button-black hover:text-text-white hover:border-button-black transition-colors z-20 shadow-sm">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white border border-stone-200 flex items-center justify-center hover:bg-button-black hover:text-text-white hover:border-button-black transition-colors z-20 shadow-sm">
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            {/* Counter */}
                            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-semibold px-2.5 py-1 backdrop-blur-sm pointer-events-none z-10">
                                {selectedImage + 1}/{product.images.length}
                            </div>

                            {/* Sale badge */}
                            <div className="absolute top-3 left-3 z-10">
                                <span className="bg-red-600 text-white text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1">
                                    -{discount}%
                                </span>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`relative w-16 h-20 shrink-0 overflow-hidden border-2 transition-all duration-200 ${
                                        selectedImage === i
                                            ? "border-stone-900"
                                            : "border-stone-200 opacity-60 hover:opacity-100 hover:border-stone-400"
                                    }`}
                                >
                                    <Image src={img} alt="" fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info — 5 cols */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Header */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-400">
                                    {product.category} · SKU {product.sku}
                                </p>
                                <button
                                    onClick={() => setWishlisted(w => !w)}
                                    className={`flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold transition-colors ${
                                        wishlisted ? "text-red-500" : "text-stone-400 hover:text-red-400"
                                    }`}
                                >
                                    <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
                                    {wishlisted ? "Saved" : "Save"}
                                </button>
                            </div>

                            <h1 className="text-2xl md:text-3xl font-serif text-stone-900 leading-tight tracking-tight mb-3">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-3">
                                <Stars rating={product.rating} />
                                <span className="text-xs font-semibold text-stone-700">{product.rating}</span>
                                <span className="text-xs text-stone-400">({product.reviews} reviews)</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3 py-4 border-y border-stone-100">
                            <span className="text-3xl font-bold text-stone-900">₹{product.price.toLocaleString()}</span>
                            <span className="text-base text-stone-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                            <span className="text-sm font-bold text-green-600">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-stone-600 leading-relaxed">
                            {product.description}
                        </p>

                        {/* Color */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500">Finish</label>
                                <span className="text-xs font-semibold text-stone-700">{product.colors[selectedColor].name}</span>
                            </div>
                            <div className="flex gap-3">
                                {product.colors.map((color, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedColor(i)}
                                        title={color.name}
                                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                                            selectedColor === i
                                                ? "border-stone-900 scale-110 shadow-md"
                                                : "border-stone-200 hover:border-stone-400"
                                        }`}
                                        style={{ backgroundColor: color.value }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500">Circumference</label>
                                <button className="text-[10px] uppercase tracking-[0.15em] font-semibold text-stone-400 hover:text-stone-700 underline underline-offset-2 transition-colors flex items-center gap-1">
                                    <Info className="w-3 h-3" /> Size Guide
                                </button>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 text-xs font-semibold border transition-colors ${
                                            selectedSize === size
                                                ? "bg-stone-900 text-white border-stone-900"
                                                : "bg-white text-stone-600 border-stone-200 hover:border-stone-900 hover:text-stone-900"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity + CTA */}
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                {/* Quantity */}
                                <div className="flex items-center border border-stone-200 bg-white">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-10 h-11 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors"
                                    >
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <span className="w-10 text-center text-sm font-bold text-stone-900">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-10 h-11 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors"
                                    >
                                        <Plus className="w-3.5 h-3.5" />
                                    </button>
                                </div>

                                {/* Add to cart */}
                                <button
                                    onClick={() => toast({ title: "Added to Cart", description: `${product.name} added to your collection.` })}
                                    className="flex-1 h-11 bg-stone-900 hover:bg-stone-800 text-white text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-2 transition-colors"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    Add to Cart
                                </button>
                            </div>

                            {/* Buy now */}
                            <Link
                                href="/checkout"
                                className="block w-full h-11 border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center transition-colors"
                            >
                                Buy Now
                            </Link>
                        </div>

                        {/* Trust row */}
                        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-stone-100">
                            {[
                                { icon: Shield,   label: "Secure Payment" },
                                { icon: Truck,    label: "Free Delivery"  },
                                { icon: RotateCcw,label: "Easy Returns"   },
                            ].map(({ icon: Icon, label }) => (
                                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                                    <div className="w-8 h-8 bg-stone-100 flex items-center justify-center">
                                        <Icon className="w-4 h-4 text-stone-600" />
                                    </div>
                                    <span className="text-[9px] uppercase tracking-[0.1em] font-semibold text-stone-500 leading-tight">{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Delivery estimate */}
                        <div className="bg-green-50 border border-green-100 px-4 py-3 flex items-start gap-3">
                            <Package className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-xs font-semibold text-green-800">Estimated Delivery: 5–7 Business Days</p>
                                <p className="text-[10px] text-green-600 mt-0.5">Insured shipping with real-time tracking included</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Tabs: Details / Specs / Care ── */}
                <div className="bg-white border border-stone-100 mb-12">
                    {/* Tab bar */}
                    <div className="flex border-b border-stone-100">
                        {(["details", "specs", "care"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold border-b-2 transition-colors ${
                                    activeTab === tab
                                        ? "border-stone-900 text-stone-900"
                                        : "border-transparent text-stone-400 hover:text-stone-700"
                                }`}
                            >
                                {tab === "details" ? "Description" : tab === "specs" ? "Specifications" : "Care"}
                            </button>
                        ))}
                    </div>

                    <div className="p-6 md:p-8">
                        {activeTab === "details" && (
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-sm text-stone-600 leading-relaxed mb-6">{product.description}</p>
                                    <ul className="space-y-2.5">
                                        {product.details.map((d) => (
                                            <li key={d} className="flex items-start gap-2.5">
                                                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                                <span className="text-sm text-stone-700">{d}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-stone-900 p-6 text-white">
                                    <p className="text-[9px] uppercase tracking-[0.3em] font-semibold text-stone-400 mb-4">Heritage Brand</p>
                                    <h3 className="text-lg font-serif mb-4">Gemini Heritage</h3>
                                    <div className="space-y-3 text-sm text-stone-300">
                                        <div className="flex justify-between border-b border-stone-700 pb-2">
                                            <span className="text-stone-400">Origin</span>
                                            <span>Shantiniketan, India</span>
                                        </div>
                                        <div className="flex justify-between border-b border-stone-700 pb-2">
                                            <span className="text-stone-400">Est.</span>
                                            <span>1951</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-stone-400">Craft</span>
                                            <span>Bengali Goldsmithing</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "specs" && (
                            <div className="max-w-lg">
                                <div className="divide-y divide-stone-100">
                                    {product.specs.map(({ label, value }) => (
                                        <div key={label} className="flex justify-between py-3">
                                            <span className="text-xs font-semibold text-stone-400 uppercase tracking-[0.1em]">{label}</span>
                                            <span className="text-sm font-semibold text-stone-900">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "care" && (
                            <div className="grid md:grid-cols-2 gap-6">
                                {[
                                    { title: "Storage",     tip: "Store in velvet-lined mahogany case when not worn." },
                                    { title: "Cleaning",    tip: "Wipe gently with a soft, dry lint-free cloth." },
                                    { title: "Chemicals",   tip: "Avoid perfumes, lotions, and household chemicals." },
                                    { title: "Servicing",   tip: "Schedule annual professional cleaning and inspection." },
                                ].map(({ title, tip }) => (
                                    <div key={title} className="flex gap-3 p-4 bg-stone-50 border border-stone-100">
                                        <div className="w-1 bg-amber-400 shrink-0 rounded-full" />
                                        <div>
                                            <p className="text-xs font-bold text-stone-900 mb-1">{title}</p>
                                            <p className="text-xs text-stone-500 leading-relaxed">{tip}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Reviews ── */}
                <div className="mb-12">
                    <div className="flex items-baseline justify-between mb-8">
                        <h2 className="text-xl font-serif text-stone-900">Customer Reviews</h2>
                        <span className="text-xs text-stone-400 font-medium">{product.reviews} reviews</span>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-8">

                        {/* Summary */}
                        <div className="lg:col-span-4 bg-white border border-stone-100 p-6">
                            <div className="text-center mb-6 pb-6 border-b border-stone-100">
                                <p className="text-5xl font-bold text-stone-900 mb-2">{product.rating}</p>
                                <Stars rating={product.rating} />
                                <p className="text-xs text-stone-400 mt-2">{product.reviews} verified reviews</p>
                            </div>
                            <div className="space-y-2.5">
                                {ratingBreakdown.map(({ label, count, pct }) => (
                                    <div key={label} className="flex items-center gap-3">
                                        <span className="text-xs font-semibold text-stone-500 w-3 shrink-0">{label}</span>
                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
                                        <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-amber-400" style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className="text-[10px] text-stone-400 w-8 text-right font-medium">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Review list + form */}
                        <div className="lg:col-span-8 space-y-4">
                            {/* Reviews */}
                            {reviews.map((r) => (
                                <div key={r.id} className="bg-white border border-stone-100 p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 bg-stone-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                            {r.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2 mb-1">
                                                <p className="text-sm font-semibold text-stone-900">{r.user}</p>
                                                <span className="text-[10px] text-stone-400 shrink-0">{r.date}</span>
                                            </div>
                                            <Stars rating={r.rating} size="xs" />
                                            <p className="text-sm text-stone-600 leading-relaxed mt-2">{r.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Write review */}
                            <div className="bg-white border border-stone-100 p-5">
                                <p className="text-sm font-semibold text-stone-900 mb-4">Write a Review</p>
                                <div className="space-y-4">
                                    {/* Star picker */}
                                    <div>
                                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 block mb-2">Rating *</label>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((n) => (
                                                <button
                                                    key={n}
                                                    onMouseEnter={() => setHoverRating(n)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    onClick={() => setReviewRating(n)}
                                                >
                                                    <Star className={`w-5 h-5 transition-colors ${n <= (hoverRating || reviewRating) ? "fill-amber-400 text-amber-400" : "text-stone-200 fill-stone-200"}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 block mb-1.5">Name *</label>
                                            <input type="text" placeholder="Your name" className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:border-stone-900 focus:outline-none transition-colors" />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 block mb-1.5">Email *</label>
                                            <input type="email" placeholder="your@email.com" className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:border-stone-900 focus:outline-none transition-colors" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 block mb-1.5">Review *</label>
                                        <textarea rows={4} placeholder="Share your experience..." className="w-full border border-stone-200 px-3 py-2.5 text-sm focus:border-stone-900 focus:outline-none transition-colors resize-none" />
                                    </div>

                                    <button className="bg-button-black hover:bg-button-hover text-text-white text-[10px] uppercase tracking-[0.25em] font-bold px-8 py-3 transition-colors">
                                        Submit Review
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Related ── */}
                <div>
                    <div className="flex items-baseline justify-between mb-6">
                        <h2 className="text-xl font-serif text-stone-900">You May Also Like</h2>
                        <Link href="/products" className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1">
                            View All <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedProducts.map((p) => (
                            <Link key={p.id} href={`/product/${p.id}`} className="group bg-white border border-stone-100 hover:border-stone-300 transition-colors">
                                <div className="relative aspect-[4/5] overflow-hidden bg-stone-50">
                                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-3">
                                    <h3 className="text-xs font-semibold text-stone-900 leading-snug line-clamp-2 mb-1 group-hover:text-stone-600 transition-colors">{p.name}</h3>
                                    <p className="text-sm font-bold text-stone-900">₹{p.price.toLocaleString()}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Lightbox ── */}
            {lightbox && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
                    <button onClick={() => setLightbox(false)} className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                        <X className="w-5 h-5 text-white" />
                    </button>
                    <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <div className="relative w-full max-w-3xl aspect-[4/5]">
                        <Image src={product.images[selectedImage]} alt={product.name} fill className="object-contain" priority />
                    </div>
                    <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs font-semibold">
                        {selectedImage + 1} / {product.images.length}
                    </div>
                </div>
            )}

            {/* ── Sticky Mobile Bar ── */}
            {showSticky && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-2xl p-3 z-40 lg:hidden">
                    <div className="flex items-center gap-3 max-w-7xl mx-auto">
                        <div className="flex-1">
                            <p className="text-[9px] uppercase tracking-[0.15em] font-semibold text-stone-400">Price</p>
                            <p className="text-lg font-bold text-stone-900">₹{product.price.toLocaleString()}</p>
                        </div>
                        <button
                            onClick={() => toast({ title: "Added to Cart", description: `${product.name} added.` })}
                            className="flex-1 h-11 bg-stone-900 hover:bg-stone-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                            <ShoppingCart className="w-4 h-4" /> Add to Cart
                        </button>
                        <Link
                            href="/checkout"
                            className="flex-1 h-11 border border-stone-900 text-stone-900 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center transition-colors hover:bg-stone-900 hover:text-white"
                        >
                            Buy Now
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}