"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useFeaturedProducts } from "@/store/product-store";
import ProductCard from "./ProductCard";

interface FeaturedProductsListProps {
    categoryId?: string;
    categorySlug?: string;
    limit?: number;
}

const ProductCardSkeleton = ({ index = 0 }: { index?: number }) => (
    <div
        className="space-y-3 animate-pulse"
        style={{ animationDelay: `${index * 100}ms` }}
    >
        {/* Image skeleton with shimmer */}
        <div className="relative aspect-square bg-gradient-to-r from-zinc-100 via-zinc-50 to-zinc-100 overflow-hidden rounded-sm animate-shimmer" />
        {/* Text skeletons */}
        <div className="space-y-2 px-0.5">
            <div className="h-3 bg-zinc-200 rounded-full w-3/4" />
            <div className="h-2.5 bg-zinc-100 rounded-full w-2/5" />
            <div className="h-3 bg-zinc-200 rounded-full w-1/3 mt-2" />
        </div>
    </div>
);

export function FeaturedProductsList({ categoryId, categorySlug, limit = 4 }: FeaturedProductsListProps) {
    const { 
        featuredProductsByCategory, 
        loadingStates, 
        errors, 
        fetchFeaturedProducts,
    } = useFeaturedProducts();

    // Always fetch ALL featured products once — single API call
    const allProducts = featuredProductsByCategory["all"] || [];
    const isLoading = loadingStates["all"];
    const error = errors["all"];

    useEffect(() => {
        fetchFeaturedProducts("all");
    }, [fetchFeaturedProducts]);

    // Client-side filter: when categoryId or categorySlug is provided,
    // filter from the "all" dataset instead of making extra API calls
    const filteredProducts = useMemo(() => {
        if (!categoryId && !categorySlug) return allProducts;

        return allProducts.filter((p: any) => {
            // Match by categoryId
            if (categoryId) {
                if (
                    p.categoryId === categoryId ||
                    p.category?.id === categoryId ||
                    p.category?._id === categoryId
                ) {
                    return true;
                }
            }

            // Match by categorySlug (check slug, name lowercase)
            if (categorySlug) {
                const slug = categorySlug.toLowerCase();
                if (
                    p.category?.slug?.toLowerCase() === slug ||
                    p.category?.name?.toLowerCase() === slug ||
                    p.categorySlug?.toLowerCase() === slug
                ) {
                    return true;
                }
            }

            return false;
        });
    }, [allProducts, categoryId, categorySlug]);

    if (isLoading) {
        return (
            <>
                {Array.from({ length: limit }).map((_, i) => (
                    <ProductCardSkeleton key={i} index={i} />
                ))}
            </>
        );
    }

    if (error) {
        return (
            <div className="col-span-full py-16 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 mb-3">
                    <span className="text-red-500 text-2xl font-semibold">!</span>
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Unable to load products</p>
                    <p className="text-xs text-foreground/60">{error}</p>
                </div>
                <button
                    onClick={() => fetchFeaturedProducts("all")}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs font-semibold rounded-sm hover:opacity-90 transition-opacity"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!filteredProducts || filteredProducts.length === 0) {
        return (
            <div className="col-span-full py-16 text-center space-y-3">
                <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest">No Items</p>
                <p className="text-sm text-foreground/60">No masterpieces found in this collection yet.</p>
            </div>
        );
    }

    const displayProducts = filteredProducts.slice(0, limit);

    return (
        <>
            {displayProducts.map((p: any, index: number) => {
                const displayPrice = p.subProducts?.[0]?.price || p.price || 0;
                const categoryName = p.category?.name || p.categoryName || "Featured";
                return (
                    <Link
                        key={p.id || p._id || index}
                        href={`/products/${p.slug}`}
                        className="block animate-fade-in-up"
                        style={{ animationDelay: `${index * 80}ms`, animationFillMode: "both" }}
                    >
                        <ProductCard
                            name={p.title || "Unknown Product"}
                            price={displayPrice}
                            image={p.subProducts?.[0]?.images?.[0] || "/placeholder.png"}
                            category={categoryName}
                            index={index}
                        />
                    </Link>
                );
            })}
        </>
    );
}
