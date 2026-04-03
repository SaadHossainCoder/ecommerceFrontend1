"use client";

import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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
        review: "I love my e-bike and the customer service is excellent. They respond in a timely fashion with loads of information about e-bikes, accessories and maintenance of e-bike.",
        avatar: "https://i.pravatar.cc/150?img=5"
    },
    {
        name: "Peter",
        location: "Delhi",
        review: "Visited to EO store. Prod particularly welde, looke wife and I took small test parking lot area. We box with customization after went over all the options and pricing.",
        avatar: "https://i.pravatar.cc/150?img=33"
    }
];

export function TestimonialsSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container-custom max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-black text-primary mb-4">
                        Read reviews,<br />ride with confidence.
                    </h2>
                    <div className="flex items-center justify-center gap-3 mt-6">
                        <span className="text-2xl font-bold text-primary">4.2/5</span>
                        <div className="flex items-center gap-1">
                            <Star className="w-6 h-6 text-accent fill-accent" />
                            <span className="text-lg font-bold text-primary">Trustpilot</span>
                        </div>
                        <span className="text-sm text-primary/60">Based on 5210 reviews</span>
                    </div>
                </div>

                {/* Testimonials Grid */}
                <div className="grid lg:grid-cols-[300px_1fr] gap-12 items-start">
                    {/* Left: Section Title */}
                    <div className="flex flex-col gap-6">
                        <div className="text-6xl text-primary/10">&quot;</div>
                        <h3 className="text-3xl font-heading font-black text-primary leading-tight">
                            What our customers are saying
                        </h3>
                        <div className="flex gap-4 mt-4">
                            <button className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full border-2 border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Testimonials Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="bg-white p-6 border border-primary/10 hover:shadow-lg transition-all duration-300"
                            >
                                <p className="text-sm text-primary/70 leading-relaxed mb-6 line-clamp-5">
                                    {testimonial.review}
                                </p>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                                    ))}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10">
                                        <Image
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            width={48}
                                            height={48}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary text-sm">{testimonial.name}</h4>
                                        <p className="text-xs text-primary/60">{testimonial.location}</p>
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
