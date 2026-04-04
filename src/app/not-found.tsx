"use client";

import Link from "next/link";
// import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function NotFound() {
    const [query, setQuery] = useState("");

    return (
        <div className="relative min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center overflow-hidden px-4">

            {/* 🌊 Background floating shapes */}
            <div
                className="absolute top-10 left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-40"
            />
            <div
                className="absolute bottom-10 right-10 w-52 h-52 bg-purple-100 rounded-full blur-3xl opacity-40"
            />

            {/* 🔥 MAIN CONTENT */}
            <div className="relative z-10 text-center max-w-xl">

                {/* 🎬 Animated 404 */}
                <h1
                    className="text-[120px] md:text-[160px] font-bold bg-linear-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent"
                >
                    404
                </h1>

                {/* 🧠 Message */}
                <h2
                    className="text-2xl md:text-3xl font-semibold"
                >
                    Oops! Page not found
                </h2>

                <p
                    className="mt-3 text-gray-500"
                >
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                {/* 🔍 SEARCH BAR */}
                <div
                    className="mt-8 flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl shadow-sm"
                >
                    <Search className="text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-transparent outline-none flex-1 text-sm"
                    />
                </div>

                {/* 🎯 ACTION BUTTONS */}
                <div
                    className="mt-8 flex flex-wrap justify-center gap-4"
                >
                    <Link
                        href="/"
                        className="px-6 py-3 bg-black text-white rounded-xl text-sm flex items-center gap-2 hover:scale-105 transition"
                    >
                        Go Home <ArrowRight size={16} />
                    </Link>

                    <Link
                        href="/products"
                        className="px-6 py-3 border border-gray-300 rounded-xl text-sm hover:bg-gray-100 transition"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>

            {/* ✨ subtle grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px] opacity-30 pointer-events-none" />

        </div>
    );
}