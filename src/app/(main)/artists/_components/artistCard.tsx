"use client";

import { useEffect } from "react";
import { useVendorStore } from "@/store/vendor-store";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const ArtistCard = () => {
    const { vendors, VendorsByShortData, isLoading } = useVendorStore();

    useEffect(() => {
        VendorsByShortData();
    }, [VendorsByShortData]);

    if (isLoading) {
        return (
            <div className="container-custom max-w-6xl py-20 flex justify-center">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="h-8 w-48 bg-stone-200 rounded"></div>
                    <div className="h-4 w-32 bg-stone-100 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="container-custom max-w-6xl py-0">
            <div className="divide-y divide-stone-200">
                {vendors.map((vendor, index) => (
                    <div
                        key={vendor.id}
                        className="group flex flex-col md:flex-row items-center gap-12 md:gap-24 py-12"
                    >
                        {/* Text Content */}
                        <div className={`flex-1 space-y-6 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                            <div className="space-y-4">
                                <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
                                    {vendor.name}
                                </h2>
                                {vendor.vendorProductType && (
                                    <p className="text-stone-400 font-serif italic text-lg">
                                        {vendor.vendorProductType}
                                    </p>
                                )}
                            </div>

                            <p className="text-stone-600 font-light leading-relaxed max-w-md line-clamp-4">
                                {vendor.description}
                            </p>

                            <Link
                                href={`/artists/${vendor.slug}`}
                                className="inline-flex items-center gap-2 text-stone-900 font-medium hover:gap-4 transition-all duration-300 group/link"
                            >
                                <span className="border-b border-stone-900 pb-0.5">Read more</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        {/* Image Section */}
                        <div className={`flex-1 w-full aspect-4/3 md:aspect-3/2 relative overflow-hidden bg-stone-100 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                            <Image
                                src={vendor.images && vendor.images.length > 0 ? vendor.images[0] : "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1000"}
                                alt={vendor.name}
                                fill
                                className="object-cover hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                            />
                            <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-500" />
                        </div>
                    </div>
                ))}
                
                {vendors.length === 0 && !isLoading && (
                    <div className="py-20 text-center text-stone-500 font-serif text-xl">
                        No designers found at the moment.
                    </div>
                )}
            </div>
        </div>
    )
}

export default ArtistCard
