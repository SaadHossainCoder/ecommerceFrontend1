"use client";

import { User, ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";

const posts = [
    {
        id: 1,
        title: "The Art of Handwoven Textiles",
        excerpt: "Exploring the rich history and intricate techniques behind India's most celebrated fabric traditions.",
        category: "Craftsmanship",
        author: "Eleanor Vance",
        date: "Feb 12, 2024",
        readTime: "5 min read",
        image: "https://i.pinimg.com/1200x/c9/00/3e/c9003e8392be325e62f558a5b282928d.jpg",
    },
    {
        id: 2,
        title: "Sustainable Living in Modern Spaces",
        excerpt: "How to integrate heritage pieces into contemporary interiors for a timeless and eco-conscious home.",
        category: "Lifestyle",
        author: "Julian Thorne",
        date: "Feb 08, 2024",
        readTime: "4 min read",
        image: "https://i.pinimg.com/1200x/41/d4/76/41d476607e0c832c32cf93b006934c56.jpg",
    },
    {
        id: 3,
        title: "The Renaissance of Brassware",
        excerpt: "A deep dive into the resurgence of traditional brass artisanal work in luxury home decor.",
        category: "Heritage",
        author: "Isabella Crain",
        date: "Feb 05, 2024",
        readTime: "6 min read",
        image: "https://i.pinimg.com/1200x/ea/5e/52/ea5e5264870f723653198ff63e905307.jpg",
    },
    {
        id: 4,
        title: "Curating Your Private Sanctuary",
        excerpt: "Expert tips on selecting statement pieces that transform your bedroom into a restful retreat.",
        category: "Interiors",
        author: "Dr. Montague",
        date: "Jan 28, 2024",
        readTime: "3 min read",
        image: "https://i.pinimg.com/1200x/53/07/74/530774780521633519391054238e55e0.jpg",
    },
];

export default function PostPage() {
    return (
        <div className="min-h-screen bg-stone-50">
            {/* ── Hero ── */}
            <div className="bg-stone-900 px-8 md:px-16 py-16 md:py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-[10px] uppercase tracking-[0.45em] font-semibold text-stone-400">
                            The Journal
                        </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h1 className="text-4xl md:text-5xl font-serif text-white leading-tight tracking-tight">
                            Stories of <span className="italic font-light text-amber-200">Heritage</span>
                        </h1>
                        <p className="text-sm text-stone-400 max-w-sm leading-relaxed md:text-right font-light">
                            Discover the narratives behind our curated collections, artisan spotlights, and guides to refined living.
                        </p>
                    </div>
                    <div className="mt-8 h-px bg-stone-700" />
                </div>
            </div>

            {/* ── Articles ── */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 pb-28">
                <div className="grid gap-10 md:gap-x-8 lg:gap-x-12 md:gap-y-14 md:grid-cols-2">
                    {posts.map((post) => (
                        <div key={post.id} className="group cursor-pointer">
                            <article className="flex flex-col h-full bg-white border border-stone-200">
                                {/* Image Container */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100 border-b border-stone-200">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                                    <div className="absolute top-5 left-5">
                                        <div className="bg-white/95 text-stone-900 px-4 py-2 text-[9px] uppercase tracking-[0.25em] font-bold shadow-sm backdrop-blur-sm border border-stone-200/50">
                                            {post.category}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 flex flex-col p-8 lg:p-10">
                                    <div className="flex items-center gap-4 text-[10px] text-stone-400 uppercase tracking-[0.2em] font-bold mb-4">
                                        <span>{post.date}</span>
                                        <span className="w-1 h-1 rounded-full bg-stone-300 shrink-0" />
                                        <span>{post.readTime}</span>
                                    </div>

                                    <h2 className="text-2xl lg:text-3xl font-serif font-medium leading-tight group-hover:text-amber-700 transition-colors mb-4 text-stone-900 shadow-sm border-l-stone-200 border-transparent">
                                        {post.title}
                                    </h2>

                                    <p className="text-sm text-stone-500 leading-relaxed font-light line-clamp-3 mb-8 flex-1">
                                        {post.excerpt}
                                    </p>

                                    <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                                                <User className="w-3.5 h-3.5" />
                                            </div>
                                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-900">{post.author}</span>
                                        </div>
                                        <div className="flex items-center text-stone-900 group-hover:text-amber-600 transition-colors font-bold text-[9px] tracking-[0.2em] uppercase">
                                            Read Story <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>

                {/* Pagination / Load More */}
                <div className="mt-16 text-center flex justify-center border-t border-stone-200 pt-16">
                    <button className="border border-stone-200 bg-white text-stone-900 hover:bg-stone-900 hover:text-white hover:border-stone-900 px-10 h-14 uppercase tracking-[0.25em] text-[10px] font-bold transition-all duration-300">
                        View All Articles
                    </button>
                </div>
            </div>
        </div>
    );
}
