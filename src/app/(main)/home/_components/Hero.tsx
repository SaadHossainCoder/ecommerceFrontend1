"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, LoaderCircle } from "lucide-react";

export const Hero = () => {
    return (
        <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-stone-900 group">
            {/* Video Background with Poster for Performance */}
            <Suspense fallback={<LoaderCircle className="text-black"/>}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                >
                    <source src="https://cdn.pixabay.com/video/2018/10/25/18897-297379518_large.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </Suspense>

            {/* Premium Gradients */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/20" />

            {/* Centered Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-6xl mx-auto">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <p className="text-white/40 text-[6px] md:text-xs tracking-[0.5em] font-medium uppercase">
                            Spring / Summer 2024
                        </p>
                        <h2 className="text-5xl md:text-9xl font-heading font-black uppercase tracking-tighter text-white leading-[0.9]">
                            Fashion <br /> 
                            <span className="italic font-light text-white/90">Is Art</span>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Floating Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block opacity-60">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[8px] tracking-[0.3em] font-bold text-white uppercase">SCROLL</span>
                    <ChevronDown className="text-white w-4 h-4" />
                </div>
            </div>

            {/* Side Branding */}
            <div className="absolute left-6 bottom-0 top-0 hidden lg:flex items-center z-10">
                <p className="text-white/20 text-[10px] tracking-[0.8em] uppercase font-black vertical-text -rotate-180" style={{ writingMode: 'vertical-rl' }}>
                    ESTABLISHED 1994 &bull; SHANTINIKETAN
                </p>
            </div>
        </section>
    );
};
