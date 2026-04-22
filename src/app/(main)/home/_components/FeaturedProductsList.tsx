"use client";

import { useEffect } from "react";
import { useFeaturedProducts } from "@/store/product-store";
import ProductCard from "./ProductCard";
import { Loader2 } from "lucide-react";

interface FeaturedProductsListProps {
    categoryId?: string;
    limit?: number;
}

export function FeaturedProductsList({ categoryId, limit = 4 }: FeaturedProductsListProps) {
    const { featuredProducts, isLoading, error, fetchFeaturedProducts } = useFeaturedProducts();

    useEffect(() => {
        fetchFeaturedProducts(categoryId);
    }, [categoryId, fetchFeaturedProducts]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20 col-span-full">
                <Loader2 className="w-8 h-8 animate-spin text-black" />
            </div>
        );
    }

    if (error) {
        return <div className="col-span-full text-center text-red-500 py-10">{error}</div>;
    }

    if (!featuredProducts || featuredProducts.length === 0) {
        return <div className="col-span-full text-center text-gray-500 py-10">No products found.</div>;
    }

    const displayProducts = featuredProducts.slice(0, limit);

    return (
        <>
            {displayProducts.map((p: any) => {
                const displayPrice = p.subProducts?.[0]?.price || p.price || 0;
                return (
                    <ProductCard 
                        key={p.id} 
                        name={p.title || "Unknown Product"} 
                        price={displayPrice} 
                        image={p.generalImages?.[0] || "/placeholder.png"} 
                    />
                );
            })}
        </>
    );
}
