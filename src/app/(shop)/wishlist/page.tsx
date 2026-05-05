"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { WishlistItem, wishlistLocalStorageData } from "@/localStorage/wishlistData";

type Item = WishlistItem;

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
    onRemove: (id: string) => void;
    onAddToCart: (item: Item) => void;
}) {
    const price = item.price;
    const originalPrice = (item as any).originalPrice;
    const discountPct = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const itemSlug = (item as any).slug;
    const slug = (itemSlug && itemSlug !== "undefined") ? itemSlug : (item.productId ?? item.id);
    const categoryName = item.category || "General";
    
    const isEmoji = item.image && item.image.length <= 4;
    const imageUrl = isEmoji ? "https://placehold.co/600x800/png?text=Product" : (item.image || "https://placehold.co/600x800/png?text=Product");
    const badge = (item as any).badge;

    return (
        <div className="group h-full flex flex-col max-w-[240px] mx-auto w-full">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-stone-100 mb-3">
                <Link href={`/products/${slug}`} className="absolute inset-0 z-0">
                    {isEmoji ? (
                        <div className="w-full h-full flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-700">
                            {item.image}
                        </div>
                    ) : (
                        <Image
                            src={imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                    )}
                </Link>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
                    {badge && (
                        <span className="bg-stone-900 text-white text-[7px] uppercase tracking-[0.2em] font-bold px-2 py-0.5">
                            {badge}
                        </span>
                    )}
                    {discountPct > 0 && (
                        <span className="bg-red-600 text-white text-[7px] uppercase tracking-[0.2em] font-bold px-2 py-0.5">
                            -{discountPct}%
                        </span>
                    )}
                </div>

                {/* Hover actions */}
                <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <button 
                        onClick={() => onRemove(item.id)}
                        className="w-7 h-7 bg-white border border-stone-100 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm text-stone-500"
                        aria-label="Remove from Wishlist"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Bottom CTA */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                    <button 
                        onClick={() => onAddToCart(item)}
                        className="w-full bg-stone-900 hover:bg-stone-800 text-white text-[8px] uppercase tracking-[0.2em] font-bold py-2.5 transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="flex-grow flex flex-col px-1">
                <p className="text-[8px] uppercase tracking-[0.15em] text-stone-400 font-medium mb-1">
                    {categoryName}
                </p>
                <Link href={`/products/${slug}`}>
                    <h3 className="text-xs font-semibold text-stone-900 leading-snug hover:text-stone-500 transition-colors line-clamp-2 mb-1.5">
                        {item.name}
                    </h3>
                </Link>
                <div className="flex items-baseline gap-1.5 mt-auto pb-1">
                    <span className="text-xs font-bold text-stone-900">
                        ₹{price.toLocaleString()}
                    </span>
                    {originalPrice && originalPrice > price && (
                        <span className="text-[10px] text-stone-400 line-through">
                            ₹{originalPrice.toLocaleString()}
                        </span>
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
    onRemove: (id: string) => void;
    onAddToCart: (item: Item) => void;
}) {
    const price = item.price;
    const originalPrice = (item as any).originalPrice;
    const badge = (item as any).badge;
    const rating = (item as any).rating || 4.5;
    const reviews = (item as any).reviews || 0;
    const itemSlug = (item as any).slug;
    const slug = (itemSlug && itemSlug !== "undefined") ? itemSlug : (item.productId ?? item.id);
    const categoryName = item.category || "General";
    const isEmoji = item.image && item.image.length <= 4;
    const imageUrl = isEmoji ? "https://placehold.co/600x800/png?text=Product" : (item.image || "https://placehold.co/600x800/png?text=Product");
    return (
        <div className="flex flex-col sm:flex-row gap-0 sm:gap-0 bg-white border border-stone-200 hover:border-amber-700/50 hover:shadow-md transition-all duration-300 group">
            {/* Thumbnail */}
            <div className="relative shrink-0 w-full sm:w-56 h-56 sm:h-auto bg-stone-50 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-stone-200 overflow-hidden">
                <Link
                    href={`/products/${slug}`}
                    className="absolute inset-0 z-10"
                    aria-label={`View ${item.name}`}
                />
                {isEmoji ? (
                    <span className="text-7xl group-hover:scale-110 transition-transform duration-700">{item.image}</span>
                ) : (
                    <Image src={imageUrl} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                )}
                {badge && (
                    <span className="absolute top-4 left-4 z-20 bg-stone-900 text-white text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-1.5 shadow-sm">
                        {badge}
                    </span>
                )}
                {originalPrice > price && (
                    <span className="absolute top-4 right-4 z-20 bg-amber-50 text-amber-900 border border-amber-200/50 text-[9px] uppercase tracking-[0.2em] font-bold px-2.5 py-1.5 shadow-sm">
                        -{discount(price, originalPrice)}%
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-6 md:p-8">
                <div className="flex-1 min-w-0 pr-0 sm:pr-6">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-stone-400 font-bold mb-2.5 flex items-center gap-2">
                        {categoryName}
                    </p>
                    <Link href={`/products/${slug}`} className="block relative z-10 mb-3">
                        <h3 className="text-xl md:text-2xl font-serif font-semibold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                            {item.name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-stone-700">{rating}</span>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400">({reviews.toLocaleString()} Reviews)</span>
                    </div>
                </div>

                {/* Price + Actions */}
                <div className="flex flex-col sm:items-end justify-between sm:justify-center gap-6 shrink-0 relative z-20 border-t sm:border-t-0 border-stone-200 sm:border-l pl-0 sm:pl-8 pt-6 sm:pt-0 w-full sm:w-auto min-w-[200px]">
                    <div className="flex items-baseline gap-3 mb-1 sm:mb-3">
                        <span className="text-2xl font-serif text-stone-900">₹{price.toLocaleString()}</span>
                        {originalPrice > price && (
                            <span className="text-sm font-bold font-mono tracking-wider text-stone-400 line-through">₹{originalPrice.toLocaleString()}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => onRemove(item.id)}
                            className="flex items-center justify-center w-12 h-12 bg-white border border-stone-200 text-stone-400 hover:text-red-600 hover:border-red-600 hover:bg-red-50 transition-colors shadow-sm shrink-0"
                            aria-label="Remove"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => onAddToCart(item)}
                            className="flex-1 sm:flex-none flex items-center justify-center h-12 px-6 lg:px-8 gap-2 bg-stone-900 hover:bg-stone-800 text-white text-[10px] uppercase tracking-[0.25em] font-bold transition-colors shadow-sm"
                            aria-label="Add to cart"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Acquire</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState<Item[]>([]);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [sortBy, setSortBy] = useState("added-newest");

    useEffect(() => {
        setWishlist(wishlistLocalStorageData.getWishlist());

        const handleUpdate = () => {
            setWishlist(wishlistLocalStorageData.getWishlist());
        };

        window.addEventListener("wishlistUpdated", handleUpdate);
        return () => window.removeEventListener("wishlistUpdated", handleUpdate);
    }, []);

    const sorted = [...wishlist].sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return ((b as any).rating || 0) - ((a as any).rating || 0);
        return 0;
    });

    const removeFromWishlist = (id: string) => {
        wishlistLocalStorageData.removeItem(id);
        toast({ title: "Removed", description: "Item removed from wishlist." });
    };

    const addToCart = (item: Item) => {
        toast({ title: "Added to Cart", description: `${item.name} added to your cart.` });
    };

    const clearWishlist = () => {
        wishlistLocalStorageData.clearWishlist();
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
                                        <SelectItem value="added-newest" className="text-xs cursor-pointer">Recently Added</SelectItem>
                                        <SelectItem value="price-low" className="text-xs cursor-pointer">Price: Low to High</SelectItem>
                                        <SelectItem value="price-high" className="text-xs cursor-pointer">Price: High to Low</SelectItem>
                                        <SelectItem value="rating" className="text-xs cursor-pointer"
                                        >Highest Rated</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* View toggle */}
                                <div className="hidden sm:flex border border-stone-200 bg-white items-center p-1 gap-1">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 transition-colors ${viewMode === "grid"
                                                ? "bg-stone-100 text-stone-900"
                                                : "text-stone-400 hover:text-stone-900"
                                            }`}
                                        aria-label="Grid view"
                                    >
                                        <Grid3X3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 transition-colors ${viewMode === "list"
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
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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