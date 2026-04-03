"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    SlidersHorizontal,
    Heart,
    ShoppingBag,
    Search as SearchIcon,
    X,
    ChevronDown,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";

// ─── Data ─────────────────────────────────────────────────────────────────────

const curatedProducts = [
    { id: 1,  name: "Imperial Gilded Bookcase",     price: 1250, originalPrice: 1500, category: "Furniture", tags: ["Artisan Crafted", "Limited"], image: "https://i.pinimg.com/1200x/95/8d/b5/958db5d1a83e0bbc8ff5fc50269e1550.jpg", rating: 5, isNew: true  },
    { id: 2,  name: "Victorian Gold-Leaf Mirror",   price: 850,  originalPrice: null, category: "Furniture", tags: ["Rare Find"],                  image: "https://i.pinimg.com/1200x/97/7c/2d/977c2d33614d92abc218bec9a00f95b7.jpg", rating: 4, isNew: false },
    { id: 3,  name: "Empire Mahogany Clock",        price: 4200, originalPrice: null, category: "Clocks",    tags: ["Masterpiece"],                 image: "https://i.pinimg.com/1200x/65/0a/50/650a50eb4f3a6ea1aae6bdd6d35acdb6.jpg", rating: 5, isNew: true  },
    { id: 4,  name: "Bronze Athena Sculpture",      price: 320,  originalPrice: 450,  category: "Art",       tags: ["Bronze"],                      image: "https://i.pinimg.com/736x/6b/02/9e/6b029e5cf7c18fb32a86ab6f74075162.jpg", rating: 4, isNew: false },
    { id: 5,  name: "Renaissance Ceramic Vase",     price: 180,  originalPrice: null, category: "Ceramics",  tags: ["Hand Painted"],                image: "https://i.pinimg.com/736x/2e/00/c6/2e00c639b9320301808e578cd411f731.jpg", rating: 5, isNew: true  },
    { id: 6,  name: "Heritage Scholar's Desk",      price: 2800, originalPrice: null, category: "Furniture", tags: ["Heirloom"],                    image: "https://i.pinimg.com/1200x/56/b8/1b/56b81bf885a58febe005905f3aa7cacf.jpg", rating: 5, isNew: false },
    { id: 7,  name: "Royal Porcelain Set",          price: 640,  originalPrice: 800,  category: "Ceramics",  tags: ["Imperial"],                    image: "https://i.pinimg.com/1200x/6b/eb/70/6beb70678df1f575795a88c489bddca5.jpg", rating: 4, isNew: false },
    { id: 8,  name: "Vintage Navigational Compass", price: 210,  originalPrice: null, category: "Artifacts", tags: ["Antique"],                     image: "https://i.pinimg.com/1200x/b3/30/7c/b3307c64993cb1d2ab91f07c370caacb.jpg", rating: 4, isNew: true  },
    { id: 9,  name: "Aged Brass Telescope",         price: 210,  originalPrice: null, category: "Artifacts", tags: ["Antique"],                     image: "https://i.pinimg.com/736x/eb/84/d7/eb84d740b1a400dddb80ec78d39c3ec1.jpg", rating: 4, isNew: true  },
    { id: 10, name: "Vintage Apothecary Bottles",   price: 210,  originalPrice: null, category: "Artifacts", tags: ["Antique"],                     image: "https://i.pinimg.com/736x/18/bd/5d/18bd5d06e343c2b808110aef4dc2a8de.jpg", rating: 4, isNew: true  },
    { id: 11, name: "Hand-woven Linen Shirt",        price: 210,  originalPrice: null, category: "Textiles",  tags: ["Handcrafted"],                 image: "https://i.pinimg.com/736x/74/8c/44/748c4477bd4d407a4fcff6f15e6823a2.jpg", rating: 4, isNew: true  },
    { id: 12, name: "Embossed Leather Bookmark",    price: 210,  originalPrice: null, category: "Artifacts", tags: ["Antique"],                     image: "https://i.pinimg.com/736x/44/37/20/4437200512f21b40f6b403a768f9e322.jpg", rating: 4, isNew: true  },
];

const categories = [
    { label: "All",       value: null         },
    { label: "Furniture", value: "Furniture"  },
    { label: "Clocks",    value: "Clocks"     },
    { label: "Fine Art",  value: "Art"        },
    { label: "Ceramics",  value: "Ceramics"   },
    { label: "Artifacts", value: "Artifacts"  },
    { label: "Textiles",  value: "Textiles"   },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
    selectedCat,
    setSelectedCat,
    priceRange,
    setPriceRange,
    onReset,
    onClose,
}: {
    selectedCat: string | null;
    setSelectedCat: (v: string | null) => void;
    priceRange: number[];
    setPriceRange: (v: number[]) => void;
    onReset: () => void;
    onClose?: () => void;
}) {
    return (
        <div className="space-y-10">
            {/* Categories */}
            <div>
                <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-stone-400 mb-4">
                    Category
                </p>
                <ul className="space-y-0.5">
                    {categories.map((cat) => {
                        const active = selectedCat === cat.value;
                        return (
                            <li key={cat.label}>
                                <button
                                    onClick={() => {
                                        setSelectedCat(cat.value);
                                        onClose?.();
                                    }}
                                    className={`w-full text-left px-3 py-2 text-sm transition-colors ${
                                        active
                                            ? "bg-stone-900 text-white font-semibold"
                                            : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Price */}
            <div>
                <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-stone-400 mb-4">
                    Price Range
                </p>
                <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    step={100}
                    className="mb-4"
                />
                <div className="flex justify-between text-xs font-mono text-stone-500">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
            </div>

            {/* Reset */}
            <button
                onClick={onReset}
                className="w-full border border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900 text-xs uppercase tracking-[0.2em] font-semibold py-2.5 transition-colors"
            >
                Reset Filters
            </button>
        </div>
    );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: typeof curatedProducts[0] }) {
    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const pct = hasDiscount
        ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
        : null;

    return (
        <div className="group">
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                <Link href={`/products/${product.id}`}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </Link>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.isNew && (
                        <span className="bg-stone-900 text-white text-[8px] uppercase tracking-[0.2em] font-bold px-2.5 py-1">
                            New
                        </span>
                    )}
                    {pct && (
                        <span className="bg-red-600 text-white text-[8px] uppercase tracking-[0.2em] font-bold px-2.5 py-1">
                            -{pct}%
                        </span>
                    )}
                </div>

                {/* Hover actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button className="w-8 h-8 bg-white border border-stone-100 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors shadow-sm">
                        <Heart className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 bg-white border border-stone-100 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors shadow-sm">
                        <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Bottom CTA */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full bg-stone-900 hover:bg-stone-800 text-white text-[9px] uppercase tracking-[0.2em] font-bold py-3 transition-colors">
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Info */}
            <div>
                <p className="text-[9px] uppercase tracking-[0.15em] text-stone-400 font-medium mb-1">
                    {product.category}
                </p>
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-sm font-semibold text-stone-900 leading-snug hover:text-stone-500 transition-colors line-clamp-2 mb-2">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-stone-900">
                        ₹{product.price.toLocaleString()}
                    </span>
                    {hasDiscount && (
                        <span className="text-xs text-stone-400 line-through">
                            ₹{product.originalPrice!.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
    const [priceRange, setPriceRange]   = useState([0, 10000]);
    const [selectedCat, setSelectedCat] = useState<string | null>(null);
    const [searchTerm, setSearchTerm]   = useState("");
    const [sortBy, setSortBy]           = useState("featured");
    const [drawerOpen, setDrawerOpen]   = useState(false);

    const reset = () => {
        setSelectedCat(null);
        setPriceRange([0, 10000]);
        setSearchTerm("");
        setSortBy("featured");
    };

    const filtered = [...curatedProducts]
        .filter((p) => {
            if (selectedCat && p.category !== selectedCat) return false;
            if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
            if (searchTerm) {
                const t = searchTerm.toLowerCase();
                if (!p.name.toLowerCase().includes(t) && !p.tags.some((g) => g.toLowerCase().includes(t)))
                    return false;
            }
            return true;
        })
        .sort((a, b) => {
            if (sortBy === "price-low")  return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "newest")     return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            return 0;
        });

    return (
        <div className="min-h-screen bg-stone-50">

            {/* ── Hero ── */}
            <section className="relative h-[60vh] overflow-hidden">
                <Image
                    src="https://i.pinimg.com/1200x/3e/30/e9/3e30e9ef564f8335b406efa344e5ede9.jpg"
                    alt="Collection"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900/70 via-stone-900/40 to-transparent" />
                <div className="absolute inset-0 flex items-end pb-14 px-8 md:px-16">
                    <div className="space-y-3">
                        <p className="text-[10px] uppercase tracking-[0.5em] text-amber-400 font-semibold">
                            Heritage Collection
                        </p>
                        <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight tracking-tight">
                            The Art<br />
                            <span className="italic font-light text-stone-300">of Nature</span>
                        </h1>
                        <p className="text-stone-300 text-sm font-light max-w-sm">
                            Curated antiques and artisanal masterpieces from across the ages.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Category Pills (below hero) ── */}
            <div className="bg-white border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
                        {categories.map((cat) => {
                            const active = selectedCat === cat.value;
                            return (
                                <button
                                    key={cat.label}
                                    onClick={() => setSelectedCat(cat.value)}
                                    className={`shrink-0 px-5 py-4 text-[10px] uppercase tracking-[0.2em] font-semibold border-b-2 transition-colors ${
                                        active
                                            ? "border-stone-900 text-stone-900"
                                            : "border-transparent text-stone-400 hover:text-stone-700"
                                    }`}
                                >
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Main ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
                <div className="flex gap-10">

                    {/* ── Desktop Sidebar ── */}
                    <aside className="hidden lg:block w-52 shrink-0">
                        <div className="sticky top-6">
                            <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-stone-300 mb-6">
                                Filter
                            </p>
                            <Sidebar
                                selectedCat={selectedCat}
                                setSelectedCat={setSelectedCat}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                onReset={reset}
                            />
                        </div>
                    </aside>

                    {/* ── Content ── */}
                    <div className="flex-1 min-w-0">

                        {/* Toolbar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-6 border-b border-stone-200">
                            <div className="flex items-center gap-3">
                                {/* Mobile filter trigger */}
                                <button
                                    onClick={() => setDrawerOpen(true)}
                                    className="lg:hidden flex items-center gap-1.5 border border-stone-200 bg-white px-3 py-2 text-xs uppercase tracking-[0.15em] font-semibold text-stone-600 hover:border-stone-900 transition-colors"
                                >
                                    <SlidersHorizontal className="w-3.5 h-3.5" />
                                    Filters
                                </button>

                                <p className="text-xs text-stone-400 font-medium">
                                    {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
                                    {selectedCat ? ` · ${selectedCat}` : ""}
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Search */}
                                <div className="relative">
                                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                                    <input
                                        type="text"
                                        placeholder="Search…"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8 pr-3 py-2 text-xs bg-white border border-stone-200 focus:border-stone-900 focus:outline-none w-40 transition-colors"
                                    />
                                </div>

                                {/* Sort */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-white border border-stone-200 focus:border-stone-900 focus:outline-none pl-3 pr-8 py-2 text-xs font-medium transition-colors cursor-pointer"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="newest">Newest</option>
                                        <option value="price-low">Price ↑</option>
                                        <option value="price-high">Price ↓</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-stone-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Active filters */}
                        {(selectedCat || searchTerm || priceRange[0] > 0 || priceRange[1] < 10000) && (
                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-semibold">Active:</span>
                                {selectedCat && (
                                    <button
                                        onClick={() => setSelectedCat(null)}
                                        className="inline-flex items-center gap-1 bg-stone-900 text-white text-[9px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 hover:bg-stone-700 transition-colors"
                                    >
                                        {selectedCat} <X className="w-2.5 h-2.5" />
                                    </button>
                                )}
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="inline-flex items-center gap-1 bg-stone-900 text-white text-[9px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 hover:bg-stone-700 transition-colors"
                                    >
                                        "{searchTerm}" <X className="w-2.5 h-2.5" />
                                    </button>
                                )}
                                {(priceRange[0] > 0 || priceRange[1] < 10000) && (
                                    <button
                                        onClick={() => setPriceRange([0, 10000])}
                                        className="inline-flex items-center gap-1 bg-stone-900 text-white text-[9px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 hover:bg-stone-700 transition-colors"
                                    >
                                        ₹{priceRange[0].toLocaleString()} – ₹{priceRange[1].toLocaleString()} <X className="w-2.5 h-2.5" />
                                    </button>
                                )}
                                <button onClick={reset} className="text-[9px] uppercase tracking-[0.15em] font-semibold text-stone-400 hover:text-stone-700 transition-colors underline underline-offset-2">
                                    Clear all
                                </button>
                            </div>
                        )}

                        {/* Grid */}
                        {filtered.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
                                {filtered.map((p) => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-32 text-center">
                                <div className="w-14 h-14 border border-stone-200 flex items-center justify-center mb-6">
                                    <SearchIcon className="w-5 h-5 text-stone-300" />
                                </div>
                                <h3 className="text-base font-semibold text-stone-900 mb-2">No pieces found</h3>
                                <p className="text-sm text-stone-400 mb-6">Try adjusting your filters or search term.</p>
                                <button
                                    onClick={reset}
                                    className="bg-stone-900 text-white text-[10px] uppercase tracking-[0.2em] font-bold px-6 py-3 hover:bg-stone-800 transition-colors"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {filtered.length > 0 && (
                            <div className="mt-16 pt-8 border-t border-stone-200 flex items-center justify-center gap-2">
                                <button className="w-9 h-9 border border-stone-200 text-stone-300 text-xs font-semibold cursor-not-allowed">
                                    ←
                                </button>
                                <button className="w-9 h-9 bg-stone-900 text-white text-xs font-bold">
                                    1
                                </button>
                                <button className="w-9 h-9 border border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900 text-xs font-semibold transition-colors">
                                    2
                                </button>
                                <button className="w-9 h-9 border border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900 text-xs font-semibold transition-colors">
                                    →
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Mobile Drawer ── */}
            {drawerOpen && (
                <>
                    <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setDrawerOpen(false)} />
                    <div className="fixed inset-y-0 left-0 w-72 bg-white z-50 overflow-y-auto lg:hidden shadow-2xl">
                        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
                            <p className="text-xs uppercase tracking-[0.25em] font-bold text-stone-900">Filters</p>
                            <button onClick={() => setDrawerOpen(false)} className="text-stone-400 hover:text-stone-900 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-6">
                            <Sidebar
                                selectedCat={selectedCat}
                                setSelectedCat={setSelectedCat}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                onReset={reset}
                                onClose={() => setDrawerOpen(false)}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}