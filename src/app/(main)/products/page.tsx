"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    SlidersHorizontal,
    Heart,
    ShoppingBag,
    Search as SearchIcon,
    X,
    ChevronDown,
    Loader2,
    AlertCircle,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useProductStore } from "@/store/product-store";

// ─── Categories ───────────────────────────────────────────────────────────────

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

function ProductCard({ product }: { product: any }) {
    const price = (product.subProducts || product.sizes)?.[0]?.price ?? product.price ?? 0;
    const discountPct = product.discount ?? 0;
    const originalPrice = discountPct > 0 ? Math.round(price / (1 - discountPct / 100)) : null;
    
    // Prioritize first sub-product's image as cover, then generalImages, then fallback
    const variantImg = product.subProducts?.[0]?.images?.[0];
    const generalImg = (product.generalImages || product.images)?.[0];
    const imgData = variantImg || generalImg;
    
    const image = (typeof imgData === 'string' ? imgData : imgData?.url) ?? "https://placehold.co/600x800/png?text=Product";
    const id = product._id ?? product.id;
    const slug = product.slug ?? id;
    const categoryName = typeof product.category === "object" ? product.category?.name : product.category;

    return (
        <div className="group">
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
                <Link href={`/products/${slug}`}>
                    <Image
                        src={image}
                        alt={product.title ?? product.name ?? "Product"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </Link>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.featured && (
                        <span className="bg-stone-900 text-white text-[8px] uppercase tracking-[0.2em] font-bold px-2.5 py-1">
                            Featured
                        </span>
                    )}
                    {discountPct > 0 && (
                        <span className="bg-red-600 text-white text-[8px] uppercase tracking-[0.2em] font-bold px-2.5 py-1">
                            -{discountPct}%
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
                    {categoryName}
                </p>
                <Link href={`/products/${slug}`}>
                    <h3 className="text-sm font-semibold text-stone-900 leading-snug hover:text-stone-500 transition-colors line-clamp-2 mb-2">
                        {product.title ?? product.name}
                    </h3>
                </Link>
                <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-stone-900">
                        ₹{price.toLocaleString()}
                    </span>
                    {originalPrice && (
                        <span className="text-xs text-stone-400 line-through">
                            ₹{originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
    const { products, pagination, isLoading, error, fetchProducts, clearProducts } = useProductStore();

    const [priceRange, setPriceRange]   = useState([0, 10000]);
    const [selectedCat, setSelectedCat] = useState<string | null>(null);
    const [searchTerm, setSearchTerm]   = useState("");
    const [sortBy, setSortBy]           = useState("featured");
    const [page, setPage]               = useState(1);
    const [drawerOpen, setDrawerOpen]   = useState(false);

    const loadProducts = useCallback(() => {
        const params: Record<string, any> = {
            page,
            limit: 12,
        };
        if (selectedCat)           params.category  = selectedCat;
        if (searchTerm.trim())     params.search    = searchTerm.trim();
        if (priceRange[0] > 0)    params.minPrice  = priceRange[0];
        if (priceRange[1] < 10000) params.maxPrice  = priceRange[1];
        if (sortBy !== "featured") {
            if (sortBy === "price-low")  { params.sort = "price"; params.order = "asc"; }
            if (sortBy === "price-high") { params.sort = "price"; params.order = "desc"; }
            if (sortBy === "newest")     { params.sort = "createdAt"; params.order = "desc"; }
        }
        fetchProducts(params);
    }, [page, selectedCat, searchTerm, priceRange, sortBy, fetchProducts]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    // Reset to page 1 when filters change
    const handleCategoryChange = (v: string | null) => { setSelectedCat(v); setPage(1); };
    const handleSortChange     = (v: string)         => { setSortBy(v);      setPage(1); };
    const handleSearchChange   = (v: string)         => { setSearchTerm(v);  setPage(1); };
    const handlePriceChange    = (v: number[])       => { setPriceRange(v);  setPage(1); };

    const reset = () => {
        setSelectedCat(null);
        setPriceRange([0, 10000]);
        setSearchTerm("");
        setSortBy("featured");
        setPage(1);
    };

    const totalCount = pagination?.total ?? products.length;

    return (
        <div className="min-h-screen bg-stone-50">

            {/* ── Hero ── */}
            <section className="relative h-[60vh] overflow-hidden">
                <Image
                    src="https://i.pinimg.com/1200x/ad/79/c3/ad79c36ce98ce078efcd634718811b42.jpg"
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

            {/* ── Category Pills ── */}
            <div className="bg-white border-b border-stone-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide">
                        {categories.map((cat) => {
                            const active = selectedCat === cat.value;
                            return (
                                <button
                                    key={cat.label}
                                    onClick={() => handleCategoryChange(cat.value)}
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
                                setSelectedCat={handleCategoryChange}
                                priceRange={priceRange}
                                setPriceRange={handlePriceChange}
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
                                    {isLoading ? "Loading…" : `${totalCount} ${totalCount === 1 ? "piece" : "pieces"}${selectedCat ? ` · ${selectedCat}` : ""}`}
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
                                        onChange={(e) => handleSearchChange(e.target.value)}
                                        className="pl-8 pr-3 py-2 text-xs bg-white border border-stone-200 focus:border-stone-900 focus:outline-none w-40 transition-colors"
                                    />
                                </div>

                                {/* Sort */}
                                <div className="relative">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => handleSortChange(e.target.value)}
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
                                        onClick={() => handleCategoryChange(null)}
                                        className="inline-flex items-center gap-1 bg-stone-900 text-white text-[9px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 hover:bg-stone-700 transition-colors"
                                    >
                                        {selectedCat} <X className="w-2.5 h-2.5" />
                                    </button>
                                )}
                                {searchTerm && (
                                    <button
                                        onClick={() => handleSearchChange("")}
                                        className="inline-flex items-center gap-1 bg-stone-900 text-white text-[9px] uppercase tracking-[0.15em] font-semibold px-2.5 py-1 hover:bg-stone-700 transition-colors"
                                    >
                                        &quot;{searchTerm}&quot; <X className="w-2.5 h-2.5" />
                                    </button>
                                )}
                                {(priceRange[0] > 0 || priceRange[1] < 10000) && (
                                    <button
                                        onClick={() => handlePriceChange([0, 10000])}
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

                        {/* Content States */}
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-32 text-stone-400">
                                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                                <p className="text-xs uppercase tracking-[0.2em]">Curating Collection…</p>
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center py-32 text-center text-red-500">
                                <AlertCircle className="w-10 h-10 mb-4 opacity-50" />
                                <h3 className="text-base font-semibold mb-2">Collection Unavailable</h3>
                                <p className="text-sm opacity-80 mb-6">{error}</p>
                                <button
                                    onClick={loadProducts}
                                    className="text-[10px] uppercase tracking-[0.2em] font-bold border border-red-200 px-6 py-3 hover:bg-red-50 transition-colors"
                                >
                                    Retry Connection
                                </button>
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
                                {products.map((p) => (
                                    <ProductCard key={p._id ?? p.id} product={p} />
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
                        {!isLoading && pagination && pagination.totalPages > 1 && (
                            <div className="mt-16 pt-8 border-t border-stone-200 flex items-center justify-center gap-2 flex-wrap">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                    className={`w-9 h-9 border border-stone-200 text-stone-500 text-xs font-semibold transition-colors ${page === 1 ? "opacity-30 cursor-not-allowed" : "hover:border-stone-900 hover:text-stone-900"}`}
                                >
                                    ←
                                </button>

                                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`w-9 h-9 text-xs font-bold transition-all ${page === p ? "bg-stone-900 text-white" : "border border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900"}`}
                                    >
                                        {p}
                                    </button>
                                ))}

                                <button
                                    disabled={page === pagination.totalPages}
                                    onClick={() => setPage(page + 1)}
                                    className={`w-9 h-9 border border-stone-200 text-stone-500 text-xs font-semibold transition-colors ${page === pagination.totalPages ? "opacity-30 cursor-not-allowed" : "hover:border-stone-900 hover:text-stone-900"}`}
                                >
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
                                setSelectedCat={handleCategoryChange}
                                priceRange={priceRange}
                                setPriceRange={handlePriceChange}
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