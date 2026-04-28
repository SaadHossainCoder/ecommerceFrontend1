"use client";

import React, { use, useEffect } from "react";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    MapPin,
} from "lucide-react";
import { useVendorStore } from "@/store/vendor-store";

// Mock products for the artist (in a real app, these would be filtered from a product list)
const artistProducts = [
    {
        id: 1,
        name: "Teak Wooden Chair",
        image: "https://i.pinimg.com/1200x/56/b8/1b/56b81bf885a58febe005905f3aa7cacf.jpg",
    },
    {
        id: 2,
        name: "Teak Daybed",
        image: "https://i.pinimg.com/1200x/95/8d/b5/958db5d1a83e0bbc8ff5fc50269e1550.jpg",
    },
    {
        id: 3,
        name: "Teak Daybed (Rattan)",
        image: "https://i.pinimg.com/1200x/97/7c/2d/977c2d33614d92abc218bec9a00f95b7.jpg",
    },
    {
        id: 4,
        name: "Mungaru Dining Chair",
        image: "https://i.pinimg.com/1200x/65/0a/50/650a50eb4f3a6ea1aae6bdd6d35acdb6.jpg",
    },
];

export default function ArtistDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { vendors, fetchVendorBySlug, isLoading } = useVendorStore();

    useEffect(() => {
        if (id) {
            fetchVendorBySlug(id);
        }
    }, [id, fetchVendorBySlug]);

    // Find the current vendor from the store (id in params is the slug)
    const artist = vendors.find((v) => v.slug === id || v.id === id);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="space-y-4 text-center">
                    <div className="w-12 h-12 border-4 border-stone-200 border-t-stone-900 rounded-full animate-spin mx-auto"></div>
                    <p className="text-stone-500 font-serif italic">Loading artisan profile...</p>
                </div>
            </div>
        );
    }

    if (!artist && !isLoading) {
        notFound();
    }

    if (!artist) return null;

    return (
        <section>
            <div className="bg-white min-h-screen font-sans selection:bg-stone-200">
                {/* Hero Section */}
                <section className="relative h-[80vh] w-full overflow-hidden">
                    <Image
                        src={artist.images && artist.images.length > 0 ? artist.images[0] : "https://via.placeholder.com/1200x800"}
                        alt={artist.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Hero Title Block */}
                    <div className="absolute bottom-0 right-0 w-full max-w-2xl bg-white  md:p-12 border-t border-l border-stone-200">
                        <h1
                            className="text-4xl md:text-6xl font-serif tracking-tight text-stone-900 uppercase"
                        >
                            {artist.name}
                        </h1>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
                        {/* Sidebar Navigation */}
                        <aside className="md:col-span-3 space-y-4">
                            <nav className="flex flex-col space-y-2 text-sm uppercase tracking-widest font-medium text-stone-400">
                                <a href="#story" className="text-stone-900 border-b border-stone-900 w-fit pb-1">Stories</a>
                                <a href="#milestones" className="hover:text-stone-900 transition-colors w-fit pb-1">Milestones</a>
                                <a href="#learn-more" className="hover:text-stone-900 transition-colors w-fit pb-1">Learn More</a>
                            </nav>
                        </aside>

                        {/* Artist Bio & Long Bio */}
                        <main id="story" className="md:col-span-9 space-y-12">
                            <div className="space-y-8">
                                <h2 className="text-2xl md:text-3xl font-serif text-stone-800 leading-relaxed max-w-3xl">
                                    {artist.description}
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-stone-500 font-light leading-relaxed">
                                    <p>{artist.longDescription ? artist.longDescription.split('. ').slice(0, Math.ceil(artist.longDescription.split('. ').length / 2)).join('. ') + '.' : ''}</p>
                                    <p>{artist.longDescription ? artist.longDescription.split('. ').slice(Math.ceil(artist.longDescription.split('. ').length / 2)).join('. ') : ''}</p>
                                </div>
                            </div>

                            {/* Social Links & Location */}
                            <div className="flex items-center gap-6 pt-4 border-t border-stone-100">
                                <div className="text-stone-400 flex items-center gap-2 text-sm uppercase tracking-wider font-medium">
                                    <MapPin className="h-4 w-4" />
                                    Santiniketan, West Bengal
                                </div>
                            </div>
                        </main>
                    </div>
                </div>

                {/* Featured Products Section */}
                <section className="bg-stone-50 py-24 border-y border-stone-200">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex items-center justify-between mb-12">
                            <h2 className="text-xl md:text-2xl font-serif text-stone-900 lowercase italic">
                                by {artist.name}
                            </h2>
                            <Link href="/products" className="text-sm uppercase tracking-widest font-medium border-b border-button-black pb-1 hover:text-button-hover hover:border-button-hover transition-colors">
                                See More
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {artistProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="group cursor-pointer"
                                >
                                    <div className="aspect-3/4 relative overflow-hidden bg-stone-200 mb-4">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>
                                    <h3 className="text-sm text-stone-600 font-medium group-hover:text-stone-900 transition-colors">
                                        {product.name}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter CTA Section */}
                <section className="py-24 border-t border-stone-200 text-center">
                    <div className="max-w-2xl mx-auto px-6 space-y-8">
                        <h2 className="text-2xl md:text-3xl font-serif text-stone-900">
                            Subscribe to our newsletter
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 bg-transparent border-b border-stone-200 pb-2 text-sm focus:outline-none focus:border-stone-900 transition-colors"
                            />
                            <button className="bg-button-black text-white px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-button-hover transition-colors flex items-center justify-center gap-2">
                                Sign up <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
}
