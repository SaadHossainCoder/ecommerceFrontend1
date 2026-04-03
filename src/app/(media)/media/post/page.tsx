"use client";

import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { PageTransition } from "@/components/layout/PageTransition";
// import { staggerContainerVariants, staggerItemVariants } from "@/lib/motion";

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
        <section>
            <div className="bg-white min-h-screen font-sans text-stone-900">
                {/* Header Section */}
                <div className="bg-stone-50 border-b border-stone-100">
                    <div className="container-custom py-20 lg:py-28 text-center space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400 mb-4">The Journal</p>
                            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight text-stone-900 mb-6 italic">
                                Stories of Heritage
                            </h1>
                            <div className="w-24 h-px bg-stone-300 mx-auto" />
                            <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed mt-6 font-light">
                                Discover the narratives behind our curated collections, artisan spotlights, and guides to refined living.
                            </p>
                        </motion.div>
                    </div>
                </div>

                <div className="container-custom py-20">
                    <div
                        className="grid gap-12 md:grid-cols-2 lg:grid-cols-2"
                    >
                        {posts.map((post) => (
                            <div key={post.id} className="group cursor-pointer">
                                <article className="flex flex-col h-full bg-white">
                                    {/* Image Container */}
                                    <div className="relative aspect-16/10 overflow-hidden bg-stone-100 mb-8">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                        <div className="absolute top-6 left-6">
                                            <Badge className="bg-white/90 hover:bg-white text-stone-900 border-none rounded-none px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold shadow-sm backdrop-blur-sm">
                                                {post.category}
                                            </Badge>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col space-y-4">
                                        <div className="flex items-center gap-4 text-xs text-stone-400 uppercase tracking-widest font-medium">
                                            <span>{post.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-stone-300" />
                                            <span>{post.readTime}</span>
                                        </div>

                                        <h2 className="text-3xl font-serif font-medium leading-tight group-hover:text-stone-600 transition-colors">
                                            {post.title}
                                        </h2>

                                        <p className="text-stone-500 leading-relaxed font-light line-clamp-2 mb-4 flex-1">
                                            {post.excerpt}
                                        </p>

                                        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                                                    <User className="w-4 h-4" />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-stone-900">{post.author}</span>
                                            </div>
                                            <Button variant="link" className="p-0 h-auto text-stone-900 group-hover:text-stone-600 transition-colors font-bold text-xs tracking-widest uppercase">
                                                Read Story <ArrowRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>

                    {/* Pagination / Load More */}
                    <div className="mt-20 text-center border-t border-stone-100 pt-16">
                        <Button variant="outline" className="border-stone-200 text-stone-900 hover:bg-stone-900 hover:text-white rounded-none px-10 h-14 uppercase tracking-widest text-xs font-bold transition-all">
                            View All Articles
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
