"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        name: "Karan",
        location: "Mumbai",
        review: "My buying experience is so nice, and received me very politely. Riding experience is very good. Very good performance. I never experienced such a kind of performance. Very good service.",
        avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
        name: "Catherine",
        location: "Bangalore",
        review: "I love my new purchase and the customer service is excellent. They respond in a timely fashion with loads of information about the products, accessories and maintenance.",
        avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
        name: "Peter",
        location: "Delhi",
        review: "Visited the store recently. Product particularly well-crafted, looked beautiful and I took a small test. We went over all the options and pricing together. Great experience.",
        avatar: "https://i.pravatar.cc/150?img=33"
    }
];

export function TestimonialsSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollability = useCallback(() => {
        const container = scrollContainerRef.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            checkScrollability();
            container.addEventListener("scroll", checkScrollability);
        }
        return () => {
            if (container) {
                container.removeEventListener("scroll", checkScrollability);
            }
        };
    }, [checkScrollability]);

    const scroll = (direction: "left" | "right") => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="py-16 md:py-24 bg-background overflow-hidden">
            <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 relative">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium tracking-tight mb-4 text-foreground">
                        Read reviews,<br className="sm:hidden" /> shop with confidence.
                    </h2>
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-4 mt-6">
                        <span className="text-2xl font-bold tracking-tight text-foreground">4.2/5</span>
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-antique-gold fill-antique-gold" />
                            <span className="text-lg font-bold text-foreground">Trustpilot</span>
                        </div>
                        <div className="hidden sm:block h-1 w-1 bg-ash-brown/20 rounded-full"></div>
                        <span className="text-sm text-foreground/60 w-full sm:w-auto mt-2 sm:mt-0">Based on 5210 reviews</span>
                    </div>
                </div>

                {/* Testimonials Grid / Carousel */}
                <div className="flex flex-col lg:grid lg:grid-cols-[300px_1fr] gap-8 md:gap-12 items-start relative">
                    {/* Left: Section Title & Navigation */}
                    <div className="flex flex-col gap-2 sm:gap-6 text-center lg:text-left items-center lg:items-start w-full">
                        <div className="hidden lg:block text-5xl md:text-6xl text-antique-gold/30 font-serif leading-none">&quot;</div>
                        <h3 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight leading-tight text-foreground">
                            What our customers <br className="hidden lg:block" /> are saying
                        </h3>
                        <div className="flex gap-3 mt-4 lg:mt-6">
                            <button
                                onClick={() => scroll("left")}
                                disabled={!canScrollLeft}
                                aria-label="Previous testimonials"
                                className="w-10 h-10 rounded-full border border-ash-brown/20 bg-background text-foreground flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 shadow-sm"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                disabled={!canScrollRight}
                                aria-label="Next testimonials"
                                className="w-10 h-10 rounded-full border border-ash-brown/20 bg-background text-foreground flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50 shadow-sm"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Testimonials Cards */}
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide gap-4 sm:gap-6 pb-6 pt-2 -mx-4 px-4 w-[calc(100%+2rem)] sm:mx-0 sm:px-0 sm:w-full lg:grid lg:grid-cols-3 lg:gap-6 lg:pb-0"
                    >
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="shrink-0 w-[85vw] sm:w-[340px] lg:w-auto snap-start bg-card p-6 sm:p-8 border border-border shadow-sm hover:shadow-royal transition-all duration-500 rounded-sm flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex gap-1.5 mb-6">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-antique-gold fill-antique-gold" />
                                        ))}
                                    </div>
                                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed mb-8 line-clamp-6">
                                        {testimonial.review}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 mt-auto pt-2">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                                        <Image
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            width={48}
                                            height={48}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-heading font-medium tracking-wide text-foreground">{testimonial.name}</h4>
                                        <p className="text-xs text-foreground/50 uppercase tracking-widest font-semibold mt-0.5">{testimonial.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
