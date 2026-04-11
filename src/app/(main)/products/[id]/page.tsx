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

function ImageZoom({ src, alt, onImageClick }: { src: string; alt: string; onImageClick: () => void }) {
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
        <div className="flex gap-4 group">
            <div
                ref={ref}
                onClick={onImageClick}
                className="relative w-full aspect-[4/5] overflow-hidden bg-stone-100 cursor-crosshair select-none border border-stone-200"
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
                    <div className="absolute bottom-5 left-5 bg-white/90 text-stone-900 border border-stone-200/50 px-4 py-2 text-[9px] uppercase tracking-[0.25em] font-bold flex items-center gap-2 backdrop-blur-sm shadow-sm transition-opacity opacity-0 group-hover:opacity-100">
                        <ZoomIn className="w-3.5 h-3.5" /> Hover to zoom
                    </div>
                )}
            </div>

            {hovering && (
                <div
                    className="hidden lg:block absolute left-full top-0 ml-6 z-50 border border-stone-200 bg-white shadow-xl overflow-hidden pointer-events-none shrink-0"
                    style={{
                        width: 480, height: 480,
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
                <Star key={i} className={`${s} transition-colors ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-stone-200 fill-stone-200"}`} />
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
        const t = setInterval(() => setSelectedImage(p => (p + 1) % product.images.length), 5000);
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
            <div className="bg-white border-b border-stone-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400">
                        <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3 text-stone-300" />
                        <Link href="/products" className="hover:text-stone-900 transition-colors">Vault</Link>
                        <ChevronRight className="w-3 h-3 text-stone-300" />
                        <Link href="/products" className="hover:text-stone-900 transition-colors">{product.category}</Link>
                        <ChevronRight className="w-3 h-3 text-stone-300" />
                        <span className="text-stone-900 truncate max-w-xs">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">

                {/* ── Back ── */}
                <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400 hover:text-stone-900 transition-colors mb-10"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Collection
                </Link>

                {/* ── Hero Grid ── */}
                <div className="grid lg:grid-cols-12 gap-10 xl:gap-16 mb-20">

                    {/* Gallery — 7 cols */}
                    <div className="lg:col-span-7 space-y-4">
                        <div
                            className="relative bg-white p-2 border border-stone-200 shadow-sm"
                            onMouseEnter={() => setAutoPlay(false)}
                            onMouseLeave={() => setAutoPlay(true)}
                        >
                            <ImageZoom src={product.images[selectedImage]} alt={product.name} onImageClick={() => setLightbox(true)} />

                            {/* Nav arrows */}
                            <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300 z-20 shadow-sm">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300 z-20 shadow-sm">
                                <ChevronRight className="w-4 h-4" />
                            </button>

                            {/* Counter */}
                            <div className="absolute bottom-6 right-6 bg-white/90 border border-stone-200/50 text-stone-900 text-[10px] font-bold tracking-widest px-3 py-1.5 backdrop-blur-sm pointer-events-none z-10 shadow-sm">
                                0{selectedImage + 1}/0{product.images.length}
                            </div>

                            {/* Sale badge */}
                            <div className="absolute top-6 left-6 z-10">
                                <span className="bg-emerald-900 text-white text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-1.5 shadow-sm">
                                    Archive Sale -{discount}%
                                </span>
                            </div>
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`relative w-20 h-24 shrink-0 overflow-hidden border-2 transition-all duration-300 ${
                                        selectedImage === i
                                            ? "border-stone-900 shadow-sm"
                                            : "border-transparent opacity-60 hover:opacity-100 hover:border-stone-300"
                                    }`}
                                >
                                    <Image src={img} alt="" fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Info — 5 cols */}
                    <div className="lg:col-span-5 space-y-8 mt-2 lg:mt-0">

                        {/* Header */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">
                                    {product.category} · {product.sku}
                                </p>
                                <button
                                    onClick={() => setWishlisted(w => !w)}
                                    className={`flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-bold transition-colors ${
                                        wishlisted ? "text-red-500" : "text-stone-400 hover:text-red-400"
                                    }`}
                                    aria-label="Wishlist"
                                >
                                    <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
                                    {wishlisted ? "Saved" : "Save Item"}
                                </button>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight tracking-tight mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-3">
                                <Stars rating={product.rating} />
                                <span className="text-xs font-bold text-stone-700">{product.rating}</span>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">({product.reviews} reviews)</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-4 py-5 border-y border-stone-200">
                            <span className="text-3xl font-serif text-stone-900 border-r border-stone-200 pr-4">₹{product.price.toLocaleString()}</span>
                            <span className="text-sm font-bold text-stone-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                            <span className="bg-amber-50 text-amber-900 border border-amber-200/50 px-2 py-1 text-[9px] uppercase tracking-[0.2em] font-bold">
                                Save ₹{(product.originalPrice - product.price).toLocaleString()}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-sm text-stone-500 leading-relaxed font-light">
                            {product.description}
                        </p>

                        {/* Color */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-stone-500">Finish Protocol</label>
                                <span className="text-[10px] font-bold tracking-widest text-stone-900 uppercase">{product.colors[selectedColor].name}</span>
                            </div>
                            <div className="flex gap-4">
                                {product.colors.map((color, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedColor(i)}
                                        title={color.name}
                                        className={`w-10 h-10 rounded-full border border-stone-200 transition-all duration-300 relative ${
                                            selectedColor === i ? "scale-110 shadow-md ring-2 ring-offset-2 ring-stone-900" : "hover:scale-105 hover:shadow-sm"
                                        }`}
                                    >
                                        <div className="absolute inset-[2px] rounded-full border border-black/10" style={{ backgroundColor: color.value }} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-stone-500">Circumference</label>
                                <button className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 hover:text-stone-900 underline underline-offset-4 transition-colors flex items-center gap-1.5">
                                    <Info className="w-3.5 h-3.5" /> Dimensions
                                </button>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] border transition-all duration-300 ${
                                            selectedSize === size
                                                ? "bg-stone-900 text-white border-stone-900 shadow-sm"
                                                : "bg-white text-stone-500 border-stone-200 hover:border-stone-900 hover:text-stone-900 hover:shadow-sm"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity + CTA */}
                        <div className="space-y-4 pt-4 border-t border-stone-200">
                            <div className="flex gap-4">
                                {/* Quantity */}
                                <div className="flex items-center border border-stone-200 bg-white shadow-sm shrink-0">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-12 h-12 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-10 text-center text-xs font-bold text-stone-900">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-12 h-12 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Add to cart */}
                                <button
                                    onClick={() => toast({ title: "Added to Cart", description: `${product.name} added to your collection.` })}
                                    className="flex-1 h-12 bg-stone-900 hover:bg-stone-800 text-white text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    Add to Cart
                                </button>
                            </div>

                            {/* Buy now */}
                            <Link
                                href="/checkout"
                                className="block w-full h-12 bg-amber-100 hover:bg-white text-stone-900 border border-amber-200 hover:border-stone-900 text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center transition-all duration-300 shadow-sm"
                            >
                                Secure Checkout
                            </Link>
                        </div>

                        {/* Delivery estimate */}
                        <div className="bg-stone-100 border border-stone-200 px-5 py-4 flex items-start gap-4">
                            <Package className="w-5 h-5 text-stone-700 shrink-0" />
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-stone-900 mb-1">Estimated Delivery: 5–7 Business Days</p>
                                <p className="text-[11px] font-light text-stone-500">Fully insured courier shipping with real-time tracking.</p>
                            </div>
                        </div>

                        {/* Trust row */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-stone-200">
                            {[
                                { icon: Shield,   label: "Secure Protocol" },
                                { icon: Truck,    label: "Global Delivery" },
                                { icon: RotateCcw,label: "Assurance"       },
                            ].map(({ icon: Icon, label }) => (
                                <div key={label} className="flex flex-col items-center gap-2 text-center p-3 sm:p-4 bg-white border border-stone-200 shadow-sm">
                                    <Icon className="w-5 h-5 text-stone-400 mb-1" />
                                    <span className="text-[8px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold text-stone-600 leading-tight break-words">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Tabs: Details / Specs / Care ── */}
                <div className="bg-white border border-stone-200 mb-16 shadow-sm">
                    {/* Tab bar */}
                    <div className="flex border-b border-stone-200 overflow-x-auto scrollbar-none">
                        {(["details", "specs", "care"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 sm:flex-none whitespace-nowrap px-6 md:px-8 py-5 text-[10px] uppercase tracking-[0.15em] md:tracking-[0.25em] font-bold border-b-[3px] transition-colors ${
                                    activeTab === tab
                                        ? "border-stone-900 text-stone-900 bg-stone-50/50"
                                        : "border-transparent text-stone-400 hover:text-stone-700 hover:bg-stone-50"
                                }`}
                            >
                                {tab === "details" ? "Details" : tab === "specs" ? "Specifications" : "Care & Upkeep"}
                            </button>
                        ))}
                    </div>

                    <div className="p-5 sm:p-8 md:p-12">
                        {activeTab === "details" && (
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-6">Artisanal Narrative</h3>
                                    <p className="text-[13px] text-stone-500 leading-loose font-light mb-8">{product.description}</p>
                                    <ul className="space-y-4">
                                        {product.details.map((d) => (
                                            <li key={d} className="flex items-start gap-4">
                                                <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center shrink-0 mt-0.5 border border-stone-200">
                                                    <CheckCircle2 className="w-3 h-3 text-amber-600" />
                                                </div>
                                                <span className="text-[13px] text-stone-700 font-medium">{d}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-stone-900 p-6 sm:p-10 text-white flex flex-col justify-center border border-stone-800 shadow-xl shadow-stone-200/50 mt-6 md:mt-0">
                                    <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-amber-500 mb-4">Heritage Lineage</p>
                                    <h3 className="text-3xl font-serif leading-tight mb-8">Gemini<br/><span className="text-stone-400 italic font-light">Heritage</span></h3>
                                    <div className="space-y-5 text-xs text-stone-300 font-mono tracking-widest uppercase">
                                        <div className="flex justify-between border-b border-stone-700/50 pb-3">
                                            <span className="text-stone-500">Origin</span>
                                            <span>Shantiniketan, IN</span>
                                        </div>
                                        <div className="flex justify-between border-b border-stone-700/50 pb-3">
                                            <span className="text-stone-500">Established</span>
                                            <span>1951</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-stone-500">Technique</span>
                                            <span>Bengali Mokashri</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "specs" && (
                            <div className="max-w-2xl mx-auto">
                                <div className="divide-y divide-stone-100 border border-stone-100">
                                    {product.specs.map(({ label, value }) => (
                                        <div key={label} className="flex flex-col sm:flex-row sm:justify-between py-4 px-6 hover:bg-stone-50 transition-colors">
                                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-1 sm:mb-0">{label}</span>
                                            <span className="text-[11px] font-bold text-stone-900 uppercase tracking-widest">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "care" && (
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    { title: "Storage",     tip: "Store in velvet-lined mahogany case when not worn to prevent oxidation." },
                                    { title: "Cleaning",    tip: "Wipe gently with a soft, dry lint-free cloth after each use." },
                                    { title: "Chemicals",   tip: "Avoid exposing to perfumes, lotions, and harsh household chemicals." },
                                    { title: "Servicing",   tip: "Schedule an annual professional cleaning and inspection protocol." },
                                ].map(({ title, tip }) => (
                                    <div key={title} className="flex gap-4 sm:gap-5 p-5 md:p-6 bg-stone-50 border border-stone-200 shadow-sm">
                                        <div className="w-1.5 h-full min-h-12 bg-amber-400 shrink-0" />
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-900 mb-2">{title}</p>
                                            <p className="text-[13px] text-stone-500 leading-relaxed font-light">{tip}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Reviews ── */}
                <div className="mb-20">
                    <div className="flex items-baseline justify-between mb-8 border-b border-stone-200 pb-4">
                        <h2 className="text-2xl font-serif text-stone-900">Patron Impressions</h2>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">{product.reviews} Total Impressions</span>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-10">

                        {/* Summary */}
                        <div className="lg:col-span-4 bg-white border border-stone-200 p-6 shadow-sm h-fit">
                            <div className="text-center mb-6 pb-6 border-b border-stone-100">
                                <p className="text-5xl font-serif text-stone-900 mb-3">{product.rating}</p>
                                <div className="flex justify-center mb-2">
                                    <Stars rating={product.rating} />
                                </div>
                                <p className="text-[8px] uppercase tracking-[0.2em] font-bold text-stone-400">Calculated from {product.reviews} verified entries</p>
                            </div>
                            <div className="space-y-2.5">
                                {ratingBreakdown.map(({ label, count, pct }) => (
                                    <div key={label} className="flex items-center gap-3">
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-stone-500 w-6 shrink-0 uppercase tracking-widest">{label} <Star className="w-2.5 h-2.5 -mt-0.5"/></span>
                                        <div className="flex-1 h-1.5 bg-stone-100 overflow-hidden">
                                            <div className="h-full bg-amber-400 transition-all duration-1000" style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className="text-[10px] text-stone-400 w-8 text-right font-mono tracking-widest">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Review list + form */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Reviews */}
                            {reviews.map((r) => (
                                <div key={r.id} className="bg-white border border-stone-200 p-8 shadow-sm">
                                    <div className="flex items-start gap-5">
                                        <div className="w-10 h-10 bg-stone-900 text-white flex items-center justify-center text-[10px] font-bold tracking-widest shrink-0 uppercase">
                                            {r.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                <p className="text-xs font-bold uppercase tracking-[0.1em] text-stone-900">{r.user}</p>
                                                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">{r.date}</span>
                                            </div>
                                            <Stars rating={r.rating} size="xs" />
                                            <p className="text-[13px] text-stone-500 leading-relaxed mt-4 font-light italic">"{r.content}"</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Write review */}
                            <div className="bg-white border border-stone-200 p-8 shadow-sm mt-10">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-6">Contribute your impression</p>
                                <div className="space-y-6">
                                    {/* Star picker */}
                                    <div>
                                        <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400 block mb-3">Your Assessment *</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((n) => (
                                                <button
                                                    key={n}
                                                    onMouseEnter={() => setHoverRating(n)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    onClick={() => setReviewRating(n)}
                                                    className="p-1 hover:scale-110 transition-transform"
                                                >
                                                    <Star className={`w-5 h-5 transition-colors ${n <= (hoverRating || reviewRating) ? "fill-amber-400 text-amber-400" : "text-stone-200 fill-stone-200"}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400 block mb-2">Identity *</label>
                                            <input type="text" placeholder="Your name" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-xs focus:border-stone-900 focus:bg-white focus:outline-none transition-colors shadow-sm" />
                                        </div>
                                        <div>
                                            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400 block mb-2">Correspondence *</label>
                                            <input type="email" placeholder="email@address.com" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-xs focus:border-stone-900 focus:bg-white focus:outline-none transition-colors shadow-sm" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400 block mb-2">Manuscript *</label>
                                        <textarea rows={4} placeholder="Detail your experience with the craftsmanship..." className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-xs focus:border-stone-900 focus:bg-white focus:outline-none transition-colors resize-none shadow-sm" />
                                    </div>

                                    <button className="bg-stone-900 hover:bg-stone-800 text-white text-[10px] uppercase tracking-[0.25em] font-bold px-10 py-4 transition-all duration-300 shadow-sm hover:shadow-md">
                                        Submit Assessment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Related ── */}
                <div className="border-t border-stone-200 pt-16">
                    <div className="flex items-baseline justify-between mb-8">
                        <h2 className="text-2xl font-serif text-stone-900">Curated Alternatives</h2>
                        <Link href="/products" className="text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1.5">
                            Explore Archive <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map((p) => (
                            <Link key={p.id} href={`/product/${p.id}`} className="group bg-white border border-stone-200 hover:border-amber-700/50 hover:shadow-md transition-all duration-500">
                                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 border-b border-stone-200">
                                    <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-500" />
                                </div>
                                <div className="p-4 md:p-5">
                                    <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-1.5">{product.category}</p>
                                    <h3 className="text-xs font-serif font-semibold text-stone-900 leading-snug line-clamp-1 mb-2 group-hover:text-amber-700 transition-colors">{p.name}</h3>
                                    <p className="text-[11px] font-bold font-mono tracking-widest text-stone-900">₹{p.price.toLocaleString()}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Lightbox ── */}
            {lightbox && (
                <div className="fixed inset-0 bg-stone-900/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <button onClick={() => setLightbox(false)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white flex items-center justify-center transition-colors group">
                        <X className="w-5 h-5 text-white group-hover:text-stone-900 transition-colors" />
                    </button>
                    <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white flex items-center justify-center transition-colors group">
                        <ChevronLeft className="w-6 h-6 text-white group-hover:text-stone-900 transition-colors" />
                    </button>
                    <div className="relative w-full max-w-4xl aspect-[4/5] shadow-2xl">
                        <Image src={product.images[selectedImage]} alt={product.name} fill className="object-contain" priority />
                    </div>
                    <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white flex items-center justify-center transition-colors group">
                        <ChevronRight className="w-6 h-6 text-white group-hover:text-stone-900 transition-colors" />
                    </button>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-[10px] uppercase font-bold tracking-[0.3em] bg-stone-900/50 px-4 py-2">
                        Frame 0{selectedImage + 1} / 0{product.images.length}
                    </div>
                </div>
            )}

            {/* ── Sticky Mobile Bar ── */}
            {showSticky && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] p-4 z-40 lg:hidden">
                    <div className="flex items-center gap-4 max-w-6xl mx-auto">
                        <div className="flex-1">
                            <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-0.5">Valuation</p>
                            <p className="text-xl font-serif text-stone-900 leading-none">₹{product.price.toLocaleString()}</p>
                        </div>
                        <button
                            onClick={() => toast({ title: "Added to Cart", description: `${product.name} added.` })}
                            className="flex-1 h-12 bg-stone-900 hover:bg-stone-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                        >
                            <ShoppingCart className="w-3.5 h-3.5" /> Acquire
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}