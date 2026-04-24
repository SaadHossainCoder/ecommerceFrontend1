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
        style={{ animationDelay: `${index * 120}ms` }}
    >
        {/* Image skeleton with shimmer */}
        <div className="relative aspect-square bg-muted/40 overflow-hidden">
            <div className="absolute inset-0 animate-shimmer" />
        </div>
        {/* Text skeletons */}
        <div className="space-y-1.5 px-0.5">
            <div className="h-2.5 bg-muted/50 rounded-full w-4/5" />
            <div className="h-2.5 bg-muted/50 rounded-full w-2/5" />
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
            <div className="col-span-full py-20 text-center space-y-5">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mb-2">
                    <span className="text-red-400 text-xl">!</span>
                </div>
                <p className="text-red-800/50 font-medium text-xs tracking-[0.25em] uppercase">{error}</p>
                <button 
                    onClick={() => fetchFeaturedProducts("all")}
                    className="text-xs border-b border-foreground/30 pb-0.5 hover:border-foreground hover:text-foreground transition-all duration-300 uppercase tracking-[0.15em] text-foreground/60"
                >
                    Try Again
                </button>
            </div>
        );
    }

    if (!filteredProducts || filteredProducts.length === 0) {
        return (
            <div className="col-span-full py-24 text-center space-y-3">
                <p className="text-foreground/30 text-xs tracking-[0.25em] uppercase font-medium">Collection</p>
                <p className="text-foreground/50 italic font-body text-lg">No masterpieces found in this collection yet.</p>
            </div>
        );
    }

    const displayProducts = filteredProducts.slice(0, limit);

    return (
        <>
            {displayProducts.map((p: any, index: number) => {
                const displayPrice = p.subProducts?.[0]?.price || p.price || 0;
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
                            index={index}
                        />
                    </Link>
                );
            })}
        </>
    );
}
