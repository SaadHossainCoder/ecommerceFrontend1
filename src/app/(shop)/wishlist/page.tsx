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
import { Button } from "@/components/ui/button";
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
        <div className="group bg-white border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300">
            {/* Image area */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden">
                <Link
                    href={`/product/${item.id}`}
                    className="absolute inset-0 flex items-center justify-center text-6xl"
                >
                    {item.image}
                </Link>

                {/* Badge */}
                {item.badge && (
                    <span className="absolute top-3 left-3 bg-stone-900 text-white text-[9px] uppercase tracking-[0.15em] font-bold px-2.5 py-1">
                        {item.badge}
                    </span>
                )}

                {/* Discount */}
                {item.originalPrice > item.price && (
                    <span className="absolute top-3 right-3 bg-red-50 text-red-600 text-[9px] font-bold px-2 py-1">
                        -{discount(item.price, item.originalPrice)}%
                    </span>
                )}

                {/* Hover: Add to cart */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button
                        onClick={() => onAddToCart(item)}
                        className="w-full bg-stone-900 hover:bg-stone-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold py-3 flex items-center justify-center gap-2 transition-colors"
                    >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-1">
                            {item.category}
                        </p>
                        <Link href={`/product/${item.id}`}>
                            <h3 className="text-sm font-semibold text-stone-900 leading-snug line-clamp-2 hover:text-stone-600 transition-colors">
                                {item.name}
                            </h3>
                        </Link>
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="shrink-0 text-gray-300 hover:text-red-400 transition-colors mt-0.5"
                        aria-label="Remove"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-center gap-1 mt-2">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-stone-700">{item.rating}</span>
                    <span className="text-xs text-gray-400">({item.reviews.toLocaleString()})</span>
                </div>

                <div className="flex items-baseline gap-2 mt-3">
                    <span className="text-base font-bold text-stone-900">${item.price}</span>
                    {item.originalPrice > item.price && (
                        <span className="text-xs text-gray-400 line-through">${item.originalPrice}</span>
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
        <div className="flex gap-5 bg-white border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-300 p-4">
            {/* Thumbnail */}
            <Link
                href={`/product/${item.id}`}
                className="shrink-0 w-24 h-24 bg-gray-50 flex items-center justify-center text-4xl"
            >
                {item.image}
            </Link>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-1">
                        {item.category}
                        {item.badge && (
                            <span className="ml-2 bg-stone-900 text-white px-1.5 py-0.5 text-[8px]">
                                {item.badge}
                            </span>
                        )}
                    </p>
                    <Link href={`/product/${item.id}`}>
                        <h3 className="text-sm font-semibold text-stone-900 hover:text-stone-600 transition-colors line-clamp-1">
                            {item.name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold text-stone-700">{item.rating}</span>
                        <span className="text-xs text-gray-400">({item.reviews.toLocaleString()})</span>
                    </div>
                </div>

                {/* Price + Actions */}
                <div className="flex items-center gap-6 shrink-0">
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-base font-bold text-stone-900">${item.price}</span>
                            {item.originalPrice > item.price && (
                                <span className="text-xs text-gray-400 line-through">${item.originalPrice}</span>
                            )}
                        </div>
                        {item.originalPrice > item.price && (
                            <p className="text-[10px] text-red-500 font-semibold mt-0.5">
                                Save {discount(item.price, item.originalPrice)}%
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => onAddToCart(item)}
                            className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2.5 transition-colors"
                        >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Add to Cart</span>
                        </button>
                        <button
                            onClick={() => onRemove(item.id)}
                            className="p-2.5 border border-gray-100 text-gray-400 hover:text-red-400 hover:border-red-100 transition-colors"
                            aria-label="Remove"
                        >
                            <Trash2 className="w-4 h-4" />
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
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">

                {/* ── Header ── */}
                <div className="mb-8">
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 hover:text-stone-900 transition-colors mb-5"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Shop
                    </Link>

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-serif text-stone-900 tracking-tight">
                                Wishlist
                            </h1>
                            <p className="text-sm text-gray-400 mt-1">
                                {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
                            </p>
                        </div>

                        {wishlist.length > 0 && (
                            <button
                                onClick={clearWishlist}
                                className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors font-medium"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                                Clear all
                            </button>
                        )}
                    </div>
                </div>

                {/* ── Empty State ── */}
                {wishlist.length === 0 ? (
                    <div className="bg-white border border-gray-100 flex flex-col items-center justify-center py-24 text-center px-6">
                        <div className="w-16 h-16 bg-gray-50 border border-gray-100 flex items-center justify-center mb-6">
                            <Heart className="w-7 h-7 text-gray-300" />
                        </div>
                        <h2 className="text-lg font-semibold text-stone-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-sm text-gray-400 max-w-xs leading-relaxed mb-8">
                            Save items you love to keep track of them and buy them later.
                        </p>
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-[10px] uppercase tracking-[0.3em] font-bold px-8 py-3.5 transition-colors"
                        >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Explore Products
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* ── Toolbar ── */}
                        <div className="flex items-center justify-between gap-3 mb-5">
                            <p className="text-xs text-gray-400 font-medium hidden sm:block">
                                Showing {sorted.length} items
                            </p>

                            <div className="flex items-center gap-2 ml-auto">
                                <Select value={sortBy} onValueChange={setSortBy}>
                                    <SelectTrigger className="h-8 text-xs border-gray-200 bg-white rounded-none w-40 focus:ring-0">
                                        <SelectValue placeholder="Sort by" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-none">
                                        <SelectItem value="added-newest">Recently Added</SelectItem>
                                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                                        <SelectItem value="rating">Highest Rated</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* View toggle */}
                                <div className="hidden sm:flex border border-gray-200 bg-white">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 transition-colors ${
                                            viewMode === "grid"
                                                ? "bg-stone-900 text-white"
                                                : "text-gray-400 hover:text-stone-900"
                                        }`}
                                        aria-label="Grid view"
                                    >
                                        <Grid3X3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 transition-colors ${
                                            viewMode === "list"
                                                ? "bg-stone-900 text-white"
                                                : "text-gray-400 hover:text-stone-900"
                                        }`}
                                        aria-label="List view"
                                    >
                                        <LayoutList className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ── Items ── */}
                        {viewMode === "grid" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                            <div className="space-y-3">
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
                        <div className="mt-16 border-t border-gray-200 pt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm text-gray-400">
                                Looking for something else?
                            </p>
                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-stone-900 hover:text-stone-600 transition-colors"
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