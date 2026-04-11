"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Heart,
    ShoppingCart,
    Trash2,
    ArrowLeft,
    Grid3X3,
    LayoutList,
    Star,
    ShoppingBag,
    ArrowRight,
} from "lucide-react";
import { toast } from "@/components/ui/toaster";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const initialWishlist = [
    {
        id: 1,
        name: "Wireless Headphones Pro",
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.8,
        reviews: 2341,
        category: "Electronics",
        badge: "Best Seller",
        image: "🎧",
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        price: 449.99,
        originalPrice: 549.99,
        rating: 4.9,
        reviews: 1876,
        category: "Electronics",
        badge: "New",
        image: "⌚",
    },
    {
        id: 5,
        name: "Running Shoes Ultra",
        price: 179.99,
        originalPrice: 219.99,
        rating: 4.5,
        reviews: 543,
        category: "Sports",
        badge: null,
        image: "👟",
    },
];

type Item = typeof initialWishlist[0];

// ─── Discount helper ──────────────────────────────────────────────────────────

function discount(price: number, original: number) {
    return Math.round(((original - price) / original) * 100);
}

// ─── Grid Card ────────────────────────────────────────────────────────────────

function GridCard({
    item,
    onRemove,
    onAddToCart,
}: {
    item: Item;
    onRemove: (id: number) => void;
    onAddToCart: (item: Item) => void;
}) {
    return (
        <div className="group bg-white border border-stone-200 hover:border-amber-700/50 hover:shadow-sm transition-all duration-300 flex flex-col h-full">
            {/* Image area */}
            <div className="relative aspect-square bg-stone-100 overflow-hidden border-b border-stone-200 flex items-center justify-center">
                <Link
                    href={`/product/${item.id}`}
                    className="absolute inset-0 z-10"
                    aria-label={`View ${item.name}`}
                />
                <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{item.image}</span>

                {/* Badge */}
                {item.badge && (
                    <span className="absolute top-4 left-4 z-20 bg-stone-900 text-white text-[9px] uppercase tracking-[0.2em] font-bold px-3 py-1.5 shadow-sm">
                        {item.badge}
                    </span>
                )}

                {/* Discount */}
                {item.originalPrice > item.price && (
                    <span className="absolute top-4 right-4 z-20 bg-amber-100 text-amber-800 text-[9px] font-bold px-2 py-1.5 shadow-sm">
                        -{discount(item.price, item.originalPrice)}%
                    </span>
                )}

                {/* Hover: Add to cart */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onAddToCart(item);
                        }}
                        className="w-full bg-stone-900 hover:bg-stone-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold py-3.5 flex items-center justify-center gap-2 transition-colors"
                    >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-semibold mb-1.5">
                            {item.category}
                        </p>
                        <Link href={`/product/${item.id}`} className="block">
                            <h3 className="text-sm font-serif font-semibold text-stone-900 leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
                                {item.name}
                            </h3>
                        </Link>
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="shrink-0 text-stone-300 hover:text-red-500 transition-colors mt-1 relative z-20"
                        aria-label="Remove"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-1.5 mt-auto mb-3 pt-2">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-bold text-stone-700">{item.rating}</span>
                    <span className="text-[10px] text-stone-400">({item.reviews.toLocaleString()})</span>
                </div>

                <div className="flex items-baseline gap-2 pt-3 border-t border-stone-100">
                    <span className="text-base font-bold text-stone-900">${item.price}</span>
                    {item.originalPrice > item.price && (
                        <span className="text-xs text-stone-400 line-through">${item.originalPrice}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── List Row ─────────────────────────────────────────────────────────────────

function ListRow({
    item,
    onRemove,
    onAddToCart,
}: {
    item: Item;
    onRemove: (id: number) => void;
    onAddToCart: (item: Item) => void;
}) {
    return (
        <div className="flex flex-col sm:flex-row gap-0 sm:gap-6 bg-white border border-stone-200 hover:border-amber-700/50 hover:shadow-sm transition-all duration-300 group">
            {/* Thumbnail */}
            <div className="relative shrink-0 w-full sm:w-40 h-40 sm:h-auto bg-stone-100 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-stone-200 overflow-hidden">
                <Link
                    href={`/product/${item.id}`}
                    className="absolute inset-0 z-10"
                    aria-label={`View ${item.name}`}
                />
                <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{item.image}</span>
                {item.badge && (
                    <span className="absolute top-3 left-3 z-20 bg-stone-900 text-white text-[8px] uppercase tracking-[0.2em] font-bold px-2 py-1">
                        {item.badge}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5">
                <div className="flex-1 min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-semibold mb-1.5 flex items-center gap-2">
                        {item.category}
                        {item.originalPrice > item.price && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-stone-300" />
                                <span className="text-amber-600 font-bold tracking-widest uppercase">Save {discount(item.price, item.originalPrice)}%</span>
                            </>
                        )}
                    </p>
                    <Link href={`/product/${item.id}`} className="block relative z-10">
                        <h3 className="text-base font-serif font-semibold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1 mb-2">
                            {item.name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-1.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-bold text-stone-700">{item.rating}</span>
                        <span className="text-[10px] text-stone-400">({item.reviews.toLocaleString()})</span>
                    </div>
                </div>

                {/* Price + Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0 relative z-20 border-t sm:border-t-0 border-stone-100 sm:border-l sm:border-l-stone-100 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto">
                    <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-stone-900">${item.price}</span>
                        {item.originalPrice > item.price && (
                            <span className="text-xs text-stone-400 line-through">${item.originalPrice}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => onRemove(item.id)}
                            className="p-2.5 bg-stone-50 border border-stone-200 text-stone-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
                            aria-label="Remove"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onAddToCart(item)}
                            className="flex items-center justify-center w-10 h-10 sm:w-auto sm:px-5 sm:py-2.5 gap-2 bg-stone-900 hover:bg-stone-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold transition-colors"
                            aria-label="Add to cart"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span className="hidden sm:inline">Add to Cart</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState(initialWishlist);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState("added-newest");

    const sorted = [...wishlist].sort((a, b) => {
        if (sortBy === "price-low")  return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating")     return b.rating - a.rating;
        return 0;
    });

    const removeFromWishlist = (id: number) => {
        setWishlist((prev) => prev.filter((i) => i.id !== id));
        toast({ title: "Removed", description: "Item removed from wishlist." });
    };

    const addToCart = (item: Item) => {
        toast({ title: "Added to Cart", description: `${item.name} added to your cart.` });
    };

    const clearWishlist = () => {
        setWishlist([]);
        toast({ title: "Wishlist Cleared", description: "All items removed." });
    };

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col">
            
            {/* ── Dashboard Hero ── */}
            <div className="bg-stone-900 py-10 md:py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] font-bold text-stone-500 hover:text-amber-400 transition-colors mb-6"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Shop
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Heart className="h-3.5 w-3.5 text-amber-400" />
                                <span className="text-[10px] uppercase tracking-[0.45em] font-semibold text-stone-400">
                                    Your Collection
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-serif text-white tracking-tight leading-none mb-3">
                                Wishlist
                            </h1>
                            <p className="text-xs text-stone-400 font-mono tracking-widest uppercase">
                                {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"} saved
                            </p>
                        </div>

                        {wishlist.length > 0 && (
                            <button
                                onClick={clearWishlist}
                                className="self-start sm:self-auto inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 hover:text-red-400 transition-colors bg-stone-800/50 hover:bg-stone-800 px-4 py-3 border border-stone-700 hover:border-red-500/50"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Clear List
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14 w-full flex-1">
                {/* ── Empty State ── */}
                {wishlist.length === 0 ? (
                    <div className="bg-white border border-stone-200 flex flex-col items-center justify-center py-32 text-center px-6 shadow-sm">
                        <div className="w-16 h-16 bg-stone-50 border border-stone-100 flex items-center justify-center mb-6 rounded-full">
                            <Heart className="w-7 h-7 text-stone-300" />
                        </div>
                        <h2 className="text-2xl font-serif text-stone-900 mb-3">Your wishlist is empty</h2>
                        <p className="text-sm text-stone-500 max-w-sm leading-relaxed mb-8 font-light">
                            Curate a collection of objects you desire. Save items you love to keep track of them and buy them later.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-[10px] uppercase tracking-[0.3em] font-bold px-8 py-4 transition-colors shadow-sm"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Explore Collection
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* ── Toolbar ── */}
                        <div className="flex items-center justify-between gap-3 mb-6 bg-white border border-stone-200 p-2 sm:p-3 shadow-sm">
                            <p className="text-[10px] text-stone-500 tracking-[0.1em] font-bold uppercase ml-3 hidden sm:block">
                                Showing {sorted.length} items
                            </p>

                            <div className="flex items-center gap-2 ml-auto">
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="h-10 text-[10px] uppercase tracking-[0.15em] font-bold border-stone-200 bg-white rounded-none w-48 focus:ring-1 focus:ring-stone-900 text-stone-600">
                                        <SelectValue placeholder="SORT BY" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-none border-stone-200">
                                        <SelectItem value="added-newest" className="text-xs hover:bg-stone-50 cursor-pointer">Recently Added</SelectItem>
                                        <SelectItem value="price-low" className="text-xs hover:bg-stone-50 cursor-pointer">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high" className="text-xs hover:bg-stone-50 cursor-pointer">Price: High to Low</SelectItem>
                                        <SelectItem value="rating" className="text-xs hover:bg-stone-50 cursor-pointer">Highest Rated</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* View toggle */}
                                <div className="hidden sm:flex border border-stone-200 bg-white items-center p-1 gap-1">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 transition-colors ${
                                            viewMode === "grid"
                                                ? "bg-stone-100 text-stone-900"
                                                : "text-stone-400 hover:text-stone-900"
                                        }`}
                                        aria-label="Grid view"
                                    >
                                        <Grid3X3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 transition-colors ${
                                            viewMode === "list"
                                                ? "bg-stone-100 text-stone-900"
                                                : "text-stone-400 hover:text-stone-900"
                                        }`}
                                        aria-label="List view"
                                    >
                                        <LayoutList className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ── Items ── */}
                        {viewMode === "grid" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {sorted.map((item) => (
                                    <GridCard
                                        key={item.id}
                                        item={item}
                                        onRemove={removeFromWishlist}
                                        onAddToCart={addToCart}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {sorted.map((item) => (
                                    <ListRow
                                        key={item.id}
                                        item={item}
                                        onRemove={removeFromWishlist}
                                        onAddToCart={addToCart}
                                    />
                                ))}
                            </div>
                        )}

                        {/* ── Footer CTA ── */}
                        <div className="mt-16 border-t border-stone-200 pt-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                                Expand Your Collection
                            </p>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold bg-white border border-stone-200 text-stone-900 hover:bg-stone-50 hover:border-stone-300 px-6 py-4 transition-colors shadow-sm"
                            >
                                Browse new arrivals
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}