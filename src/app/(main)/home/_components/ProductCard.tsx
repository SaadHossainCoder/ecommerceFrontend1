"use client";

import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";

interface ProductCardProps {
    name: string;
    price: number;
    image: string;
}

export default function ProductCard({ name, price, image }: ProductCardProps) {
    return (
        <div
            className="group cursor-pointer space-y-4"
        >
            <div className="relative aspect-square overflow-hidden bg-white">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                    <button className="p-2 bg-background rounded-full shadow-md hover:bg-muted">
                        <Heart className="w-4 h-4 text-foreground" />
                    </button>
                    <button className="p-2 bg-[#3B4A3A] text-white rounded-full shadow-md hover:bg-[#2B3A2A]">
                        <ShoppingBag className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors truncate">
                    {name}
                </h3>
                <p className="text-sm font-bold text-foreground">₹{price.toLocaleString()}</p>
            </div>
        </div>
    );
}
