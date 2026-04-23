"use client";

import { useEffect } from "react";
import { useFeaturedProducts } from "@/store/product-store";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "motion/react";

interface FeaturedProductsListProps {
    categoryId?: string;
    categorySlug?: string;
    limit?: number;
}

const ProductCardSkeleton = () => (
    <div className="space-y-4 animate-pulse">
        <div className="aspect-square bg-zinc-100 rounded-none w-full" />
        <div className="space-y-2">
            <div className="h-4 bg-zinc-100 w-3/4" />
            <div className="h-4 bg-zinc-100 w-1/4" />
        </div>
    </div>
);

export function FeaturedProductsList({ categoryId, categorySlug, limit = 4 }: FeaturedProductsListProps) {
    const { 
        featuredProductsByCategory, 
        loadingStates, 
        errors, 
        fetchFeaturedProducts,
        fetchFeaturedProductsBySlug 
    } = useFeaturedProducts();
    
    // Determine the key for state lookup (Slug takes precedence)
    const activeKey = categorySlug || categoryId || "all";
    
    const featuredProducts = featuredProductsByCategory[activeKey] || [];
    const isLoading = loadingStates[activeKey];
    const error = errors[activeKey];

    useEffect(() => {
        if (categorySlug) {
            fetchFeaturedProductsBySlug(categorySlug);
        } else {
            fetchFeaturedProducts(categoryId || "all");
        }
    }, [categoryId, categorySlug, fetchFeaturedProducts, fetchFeaturedProductsBySlug]);

    if (isLoading) {
        return (
            <>
                {Array.from({ length: limit }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </>
        );
    }

    if (error) {
        return (
            <div className="col-span-full py-16 text-center space-y-4">
                <p className="text-red-900/60 font-medium text-sm tracking-widest uppercase">{error}</p>
                <button 
                    onClick={() => fetchFeaturedProducts(categoryId)}
                    className="text-xs border-b border-black pb-0.5 hover:opacity-60 transition-opacity uppercase tracking-tighter"
                >
                    Retry Fetch
                </button>
            </div>
        );
    }

    if (!featuredProducts || featuredProducts.length === 0) {
        return (
            <div className="col-span-full py-20 text-center">
                <p className="text-zinc-400 italic font-body text-lg">No masterpieces found in this collection yet.</p>
            </div>
        );
    }

    const displayProducts = featuredProducts.slice(0, limit);

    return (
        <AnimatePresence mode="popLayout">
            {displayProducts.map((p: any, index: number) => {
                const displayPrice = p.subProducts?.[0]?.price || p.price || 0;
                return (
                    <motion.div
                        key={p.id || index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                            duration: 0.8, 
                            delay: index * 0.1,
                            ease: [0.21, 0.47, 0.32, 0.98]
                        }}
                    >
                        <ProductCard 
                            name={p.title || "Unknown Product"} 
                            price={displayPrice} 
                            image={p.generalImages?.[0] || "/placeholder.png"} 
                        />
                    </motion.div>
                );
            })}
        </AnimatePresence>
    );
}
