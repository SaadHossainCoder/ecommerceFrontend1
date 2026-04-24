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
import { useCategoryStore } from "@/store/category-store";



// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
    categoryTree,
    selectedCat,
    setSelectedCat,
    priceRange,
    setPriceRange,
    onReset,
    onClose,
    sliderMax,
}: {
    categoryTree: any[];
    selectedCat: string | null;
    setSelectedCat: (v: string | null) => void;
    priceRange: number[];
    setPriceRange: (v: number[]) => void;
    onReset: () => void;
    onClose?: () => void;
    sliderMax: number;
}) {
    const [expandedCats, setExpandedCats] = useState<string[]>([]);
    const [catSearch, setCatSearch] = useState("");

    // Auto-expand parents of active subcategories
    useEffect(() => {
        if (selectedCat) {
            const parent = categoryTree.find(cat => 
                cat.subCategories?.some((s: any) => s.slug === selectedCat)
            );
            if (parent && !expandedCats.includes(parent.id)) {
                setExpandedCats(prev => [...prev, parent.id]);
            }
        }
    }, [selectedCat, categoryTree]);

    const toggleExpand = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setExpandedCats(prev => 
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const filteredTree = categoryTree.map(cat => {
        if (!catSearch.trim()) return cat;
        const q = catSearch.toLowerCase();
        const matchesMain = cat.name.toLowerCase().includes(q);
        const matchingSubs = (cat.subCategories || []).filter((s: any) => s.name.toLowerCase().includes(q));
        
        if (matchesMain || matchingSubs.length > 0) {
            return {
                ...cat,
                // If main matches, show all subs. If sub matches, only show matched subs.
                subCategories: matchesMain ? cat.subCategories : matchingSubs
            };
        }
        return null;
    }).filter(Boolean);

    return (
        <div className="space-y-12">
            {/* Categories */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-300">
                        Collections
                    </p>
                </div>
                
                {/* Category Search */}
                <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                    <input
                        type="text"
                        placeholder="Search collections..."
                        value={catSearch}
                        onChange={(e) => setCatSearch(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-stone-200 focus:border-stone-900 focus:outline-none transition-colors rounded-sm"
                    />
                </div>

                <div className="space-y-1 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-stone-200">
                    <button
                        onClick={() => { setSelectedCat(null); onClose?.(); }}
                        className={`w-full text-left py-2 px-3 text-sm transition-all duration-300 border-l-2 ${
                            !selectedCat 
                            ? "border-primary text-primary font-semibold bg-primary/5" 
                            : "border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-50"
                        }`}
                    >
                        All Masterpieces
                    </button>
                    {filteredTree.length === 0 && (
                        <div className="py-4 text-center text-xs text-stone-400">
                            No collections found.
                        </div>
                    )}
                    {filteredTree.map((cat: any) => {
                        const hasActiveSub = cat.subCategories?.some((s: any) => s.slug === selectedCat);
                        const isSearching = catSearch.trim().length > 0;
                        const isExpanded = expandedCats.includes(cat.id) || hasActiveSub || isSearching;
                        const hasSubs = cat.subCategories && cat.subCategories.length > 0;
                        
                        return (
                            <div key={cat.id} className="space-y-1">
                                <div className="flex items-center group/item">
                                    <button
                                        onClick={(e) => {
                                            if (hasSubs) {
                                                toggleExpand(cat.id, e);
                                            } else {
                                                setSelectedCat(cat.slug);
                                                onClose?.();
                                            }
                                        }}
                                        className={`flex-1 flex items-center justify-between py-2 px-3 text-sm transition-all duration-300 border-l-2 ${
                                            hasActiveSub
                                            ? "border-primary/30 text-stone-900 font-medium bg-stone-50/50"
                                            : "border-transparent text-stone-500 hover:text-stone-900 hover:bg-stone-50"
                                        }`}
                                    >
                                        <span>{cat.name}</span>
                                        {hasSubs && (
                                            <ChevronDown className={`w-3.5 h-3.5 text-stone-300 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                                        )}
                                    </button>
                                </div>
                                
                                {hasSubs && isExpanded && (
                                    <div className="ml-3 border-l border-stone-100 flex flex-col animate-fade-in">
                                        {cat.subCategories.map((sub: any) => {
                                            const active = selectedCat === sub.slug;
                                            return (
                                                <button
                                                    key={sub.id}
                                                    onClick={() => { setSelectedCat(sub.slug); onClose?.(); }}
                                                    className={`text-left py-1.5 pl-5 pr-3 text-xs transition-colors ${
                                                        active 
                                                        ? "text-primary font-semibold" 
                                                        : "text-stone-400 hover:text-stone-700"
                                                    }`}
                                                >
                                                    {sub.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Price */}
            <div className="space-y-6">
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-300">
                    Investment
                </p>
                <div className="px-2">
                    <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={sliderMax}
                        step={100}
                        className="mb-5"
                    />
                    <div className="flex justify-between items-center text-[11px] font-medium text-stone-500">
                        <span className="bg-stone-100 px-2 py-1 rounded-sm">₹{priceRange[0].toLocaleString()}</span>
                        <div className="h-px w-4 bg-stone-200" />
                        <span className="bg-stone-100 px-2 py-1 rounded-sm">₹{priceRange[1].toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Reset */}
            <button
                onClick={onReset}
                className="w-full bg-stone-50 border border-stone-200 text-stone-400 hover:border-stone-900 hover:text-stone-900 text-[10px] uppercase tracking-[0.25em] font-bold py-3.5 transition-all duration-300 rounded-sm"
            >
                Clear Selection
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
    const { products, pagination, isLoading, error, fetchProducts, clearProducts, lastParams } = useProductStore();
    const { categoryTree, fetchTree } = useCategoryStore();

    useEffect(() => {
        fetchTree();
    }, [fetchTree]);

    const [sliderMax, setSliderMax] = useState(10000);

    // Dynamically update the maximum price of the slider based on the products fetched
    useEffect(() => {
        if (products && products.length > 0) {
            let max = 0;
            products.forEach(p => {
                const price = (p.subProducts || p.sizes)?.[0]?.price ?? p.price ?? 0;
                if (price > max) max = price;
            });
            const calculatedMax = Math.max(10000, Math.ceil(max / 1000) * 1000);
            
            if (calculatedMax > sliderMax) {
                setSliderMax(calculatedMax);
                setPriceRange(prev => [prev[0], prev[1] === sliderMax ? calculatedMax : prev[1]]);
            }
        }
    }, [products, sliderMax]);

    const categories: { label: string; value: string | null; isSub?: boolean }[] = [
        { label: "All", value: null }
    ];

    categoryTree.forEach((cat: any) => {
        categories.push({ label: cat.name, value: cat.slug });
        if (cat.subCategories && cat.subCategories.length > 0) {
            cat.subCategories.forEach((sub: any) => {
                categories.push({ label: sub.name, value: sub.slug, isSub: true });
            });
        }
    });

    const [priceRange, setPriceRange] = useState<number[]>(() => {
        if (!lastParams) return [0, 10000];
        try { const p = JSON.parse(lastParams); return [p.minPrice || 0, p.maxPrice || 10000]; } catch { return [0, 10000]; }
    });
    const [selectedCat, setSelectedCat] = useState<string | null>(() => {
        if (!lastParams) return null;
        try { return JSON.parse(lastParams).category || null; } catch { return null; }
    });
    const [searchTerm, setSearchTerm] = useState(() => {
        if (!lastParams) return "";
        try { return JSON.parse(lastParams).search || ""; } catch { return ""; }
    });
    const [sortBy, setSortBy] = useState(() => {
        if (!lastParams) return "featured";
        try {
            const p = JSON.parse(lastParams);
            if (p.sort === "price" && p.order === "asc") return "price-low";
            if (p.sort === "price" && p.order === "desc") return "price-high";
            if (p.sort === "createdAt") return "newest";
            return "featured";
        } catch { return "featured"; }
    });
    const [page, setPage] = useState(() => {
        if (!lastParams) return 1;
        try { return JSON.parse(lastParams).page || 1; } catch { return 1; }
    });
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleCategoryChange = (v: string | null) => { setSelectedCat(v); setPage(1); };
    const handleSearchChange = (v: string) => { setSearchTerm(v); setPage(1); };

    const reset = () => {
        setSelectedCat(null);
        setPriceRange([0, sliderMax]);
        setSearchTerm("");
        setSortBy("featured");
        setPage(1);
    };

    const loadProducts = useCallback(() => {
        const params: Record<string, any> = {
            limit: 100, // Fetch up to 100 items to allow accurate local filtering/sorting
        };
        if (selectedCat) {
            if (categoryTree.length === 0) return; // wait for tree to load
            let catId = null;
            for (const cat of categoryTree) {
                if (cat.slug === selectedCat) { catId = cat.id; break; }
                if (cat.subCategories) {
                    const sub = cat.subCategories.find((s: any) => s.slug === selectedCat);
                    if (sub) { catId = sub.id; break; }
                }
            }
            if (catId) params.categoryId = catId;
        }
        if (searchTerm.trim()) params.search = searchTerm.trim();
        fetchProducts(params);
    }, [selectedCat, searchTerm, fetchProducts, categoryTree]);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    const displayedProducts = products
        .filter(p => {
            const price = (p.subProducts || p.sizes)?.[0]?.price ?? p.price ?? 0;
            return price >= priceRange[0] && price <= priceRange[1];
        })
        .sort((a, b) => {
            if (sortBy === "price-low") {
                const priceA = (a.subProducts || a.sizes)?.[0]?.price ?? a.price ?? 0;
                const priceB = (b.subProducts || b.sizes)?.[0]?.price ?? b.price ?? 0;
                return priceA - priceB;
            }
            if (sortBy === "price-high") {
                const priceA = (a.subProducts || a.sizes)?.[0]?.price ?? a.price ?? 0;
                const priceB = (b.subProducts || b.sizes)?.[0]?.price ?? b.price ?? 0;
                return priceB - priceA;
            }
            if (sortBy === "newest") {
                return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
            }
            // "featured"
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
        });

    const PRODUCTS_PER_PAGE = 12;
    const totalPages = Math.ceil(displayedProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = displayedProducts.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE);

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
                                categoryTree={categoryTree}
                                selectedCat={selectedCat}
                                setSelectedCat={handleCategoryChange}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                onReset={reset}
                                sliderMax={sliderMax}
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
                                    {isLoading ? "Loading…" : `${displayedProducts.length} ${displayedProducts.length === 1 ? "piece" : "pieces"}${selectedCat ? ` · ${selectedCat}` : ""}`}
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
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="appearance-none bg-white border border-stone-200 focus:border-stone-900 focus:outline-none pl-3 pr-8 py-2 text-xs font-medium transition-colors cursor-pointer"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="price-low">Lowest price ↑</option>
                                        <option value="price-high">Highest price ↓</option>
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-stone-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Active filters */}
                        {(selectedCat || searchTerm || priceRange[0] > 0 || priceRange[1] < sliderMax) && (
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
                                {(priceRange[0] > 0 || priceRange[1] < sliderMax) && (
                                    <button
                                        onClick={() => setPriceRange([0, sliderMax])}
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
                        ) : paginatedProducts.length > 0 ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10">
                                {paginatedProducts.map((p) => (
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
                        {!isLoading && totalPages > 1 && (
                            <div className="mt-16 pt-8 border-t border-stone-200 flex items-center justify-center gap-2 flex-wrap">
                                <button
                                    disabled={page === 1}
                                    onClick={() => { setPage(page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className={`w-9 h-9 border border-stone-200 text-stone-500 text-xs font-semibold transition-colors ${page === 1 ? "opacity-30 cursor-not-allowed" : "hover:border-stone-900 hover:text-stone-900"}`}
                                >
                                    ←
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                        className={`w-9 h-9 text-xs font-bold transition-all ${page === p ? "bg-stone-900 text-white" : "border border-stone-200 text-stone-500 hover:border-stone-900 hover:text-stone-900"}`}
                                    >
                                        {p}
                                    </button>
                                ))}

                                <button
                                    disabled={page === totalPages}
                                    onClick={() => { setPage(page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                    className={`w-9 h-9 border border-stone-200 text-stone-500 text-xs font-semibold transition-colors ${page === totalPages ? "opacity-30 cursor-not-allowed" : "hover:border-stone-900 hover:text-stone-900"}`}
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
                                categoryTree={categoryTree}
                                selectedCat={selectedCat}
                                setSelectedCat={handleCategoryChange}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                onReset={reset}
                                onClose={() => setDrawerOpen(false)}
                                sliderMax={sliderMax}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}