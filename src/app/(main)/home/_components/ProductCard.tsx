"use client";
import Image from "next/image";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category?: string;
    rating?: number;
    reviews?: number;
    badge?: string;
    index?: number;
    onWishlist?: (liked: boolean) => void;
    onQuickView?: () => void;
    onAddToBag?: () => void;
}

export default function ProductCard({
    name,
    price,
    originalPrice,
    image,
    category = "Featured",
    badge,
    index = 0,
    onWishlist,
    onQuickView,
    onAddToBag,
}: ProductCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        onWishlist?.(!isWishlisted);
    };

    const discount = originalPrice
        ? Math.round(((originalPrice - price) / originalPrice) * 100)
        : 0;

    return (
        <div
            className="group relative h-full w-full"
            style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "both",
            }}
        >
            <div className="flex flex-col h-full bg-white overflow-hidden transition-all duration-500 rounded-sm hover:shadow-lg">
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-zinc-50">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
                        priority={index < 2}
                        onError={(e) => {
                            e.currentTarget.src = "/placeholder.png";
                        }}
                    />

                    {/* Badge */}
                    {badge && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest z-10">
                            {badge}
                        </div>
                    )}

                    {/* Discount Badge */}
                    {discount > 0 && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-red-600 text-white text-[10px] font-bold z-10">
                            -{discount}%
                        </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Action Buttons - Top Right */}
                    <div className="absolute top-12 right-3 flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-20">
                        {/* Wishlist Button */}
                        <button
                            onClick={handleWishlist}
                            aria-label="Add to wishlist"
                            className="p-2 bg-white rounded-full shadow-sm hover:bg-zinc-50 transition-colors"
                        >
                            <Heart
                                className={`w-4 h-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-zinc-600"
                                    }`}
                            />
                        </button>

                        {/* Quick View Button */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onQuickView?.();
                            }}
                            aria-label="Quick view"
                            className="p-2 bg-white rounded-full shadow-sm hover:bg-zinc-50 transition-colors"
                        >
                            <Eye className="w-4 h-4 text-zinc-600" />
                        </button>
                    </div>

                    {/* Add to Bag Button - Bottom Slide Up */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onAddToBag?.();
                            }}
                            aria-label={`Add ${name} to bag`}
                            className="w-full py-3 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-zinc-900 transition-colors"
                        >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Add to Bag
                        </button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="p-2 flex flex-col gap-1 flex-grow">
                    <div className="flex flex-col gap-0.5">
                        <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-medium">
                            {category}
                        </p>
                        <h3 className="text-xs font-medium text-zinc-900 line-clamp-2 min-h-[2rem]">
                            {name}
                        </h3>
                    </div>

                    <div className="flex flex-col mt-auto gap-1">
                        {/* Pricing */}
                        <div className="flex items-center gap-1">
                            <span className="text-xs font-bold text-zinc-900">
                                ₹{price.toLocaleString("en-IN")}
                            </span>
                            {originalPrice && originalPrice > price && (
                                <span className="text-xs text-zinc-400 line-through">
                                    ₹{originalPrice.toLocaleString("en-IN")}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}