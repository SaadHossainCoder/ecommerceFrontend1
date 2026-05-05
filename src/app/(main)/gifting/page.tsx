"use client";

import Image from "next/image";
import Link from "next/link";
import {
    Heart,
    Gift,
    Truck,
    Star,
    ShoppingBag,
    Phone,
    Sparkles,
    Loader2,
} from "lucide-react";
import { useFeaturedProducts } from "@/store/product-store";
import { useEffect, useMemo } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { wishlistLocalStorageData } from "@/localStorage/wishlistData";
import { toast } from "@/components/ui/toaster";

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
    { icon: Heart, title: "Personalized", description: "Add a personal touch to every box with custom messages and monograms." },
    { icon: Gift, title: "Gift Cards", description: "Choose from our curated digital and physical gift cards." },
    { icon: Truck, title: "Across India", description: "Seamless, insured delivery of your heritage pieces nationwide." },
];

const stats = [
    { value: "12,000+", label: "Gifts Delivered" },
    { value: "500+", label: "Artisan Partners" },
    { value: "4.9", label: "Average Rating" },
    { value: "1947", label: "Established" },
];

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product }: { product: any }) {
    const price = (product.subProducts || product.sizes)?.[0]?.price ?? product.price ?? 0;
    const discountPct = product.discount ?? 0;
    const originalPrice = discountPct > 0 ? Math.round(price / (1 - discountPct / 100)) : null;

    // Prioritize first sub-product's image as cover, then generalImages, then fallback
    const variantImg = product.subProducts?.[0]?.images?.[0];
    const generalImg = (product.generalImages || product.images)?.[0];
    const imgData = variantImg || generalImg;

    const image = (typeof imgData === 'string' ? imgData : imgData?.url) ?? "https://placehold.co/600x800/png?text=Product";
    const id = product._id ?? product.id;
    const slug = product.slug ?? id;
    const categoryName = typeof product.category === "object" ? product.category?.name : product.category;

    const handleAddToWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        wishlistLocalStorageData.addToWishlist({
            id: String(id),
            productId: String(id),
            slug: String(slug),
            name: product.title ?? product.name ?? "Product",
            price: price,
            quantity: 1,
            image: image,
            category: categoryName,
        });
        
        toast({
            title: "Added to Wishlist",
            description: `${product.title ?? product.name ?? "Product"} saved to your collection.`,
        });
    };

    return (
        <div className="group">
            {/* Image */}
            <div className="relative aspect-3/4 overflow-hidden bg-stone-100">
                <Link href={`/products/${slug}`}>
                    <Image
                        src={image}
                        alt={product.title ?? product.name ?? "Product"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                </Link>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.featured && (
                        <span className="bg-stone-900 text-white text-[8px] uppercase tracking-[0.2em] font-bold px-2.5 py-1">
                            Featured
                        </span>
                    )}
                    {discountPct > 0 && (
                        <span className="bg-red-600 text-white text-[8px] uppercase tracking-[0.2em] font-bold px-2.5 py-1">
                            -{discountPct}%
                        </span>
                    )}
                </div>
                {/* Hover actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                        onClick={handleAddToWishlist}
                        className="w-8 h-8 bg-white border border-stone-100 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors shadow-sm"
                    >
                        <Heart className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 bg-white border border-stone-100 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors shadow-sm">
                        <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Bottom CTA */}
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-x border-stone-100">
                    <button className="w-full bg-stone-900 hover:bg-stone-800 text-white text-[9px] uppercase tracking-[0.2em] font-bold py-3 transition-colors">
                        Add to Cart
                    </button>
                </div>
                
            </div>

            {/* Info */}
            <div className="p-3 border-x border-b border-stone-100">
                <p className="text-[9px] uppercase tracking-[0.15em] text-stone-400 font-medium mb-1">
                    {categoryName}
                </p>
                <Link href={`/products/${slug}`}>
                    <h3 className="text-sm font-semibold text-white leading-snug hover:text-stone-500 transition-colors line-clamp-2 mb-2">
                        {product.title ?? product.name}
                    </h3>
                </Link>
                <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-white">
                        ₹{price.toLocaleString()}
                    </span>
                    {originalPrice && (
                        <span className="text-xs text-white line-through">
                            ₹{originalPrice.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GiftingPage() {
    const { featuredProductsByCategory, loadingStates, fetchFeaturedProducts } = useFeaturedProducts();

    useEffect(() => {
        fetchFeaturedProducts("all");
    }, [fetchFeaturedProducts]);

    const allFeatured = featuredProductsByCategory["all"] || [];
    const isLoading = loadingStates["all"];

    const giftProducts = useMemo(() => {
        return allFeatured.filter((p: any) => {
            const catName = typeof p.category === "object" ? p.category?.name : p.category;
            const catSlug = typeof p.category === "object" ? p.category?.slug : "";
            return catName?.toLowerCase().includes("gift") || catSlug?.toLowerCase().includes("gift");
        });
    }, [allFeatured]);

    const displayProducts = giftProducts;

    return (
        <div className="bg-white min-h-screen">

            {/* ── Hero ────────────────────────────────────────────────────── */}
            <section
                className="relative h-[70vh] w-full overflow-hidden"
            >
                <div className="absolute inset-0">
                    <Image
                        src="https://i.pinimg.com/1200x/7d/71/09/7d7109264f47ab4fc02cea74e317d3fb.jpg"
                        alt="Artisanal Gifting"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Hero Title Block (Right Aligned to mirror Artist page) */}
                <div className="absolute bottom-0 right-0 w-full max-w-2xl p-8 md:p-16 h-[43vh] bg-stone-900">
                    <div
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 text-stone-400 text-xs tracking-[0.3em] uppercase font-bold">
                            <Sparkles className="h-4 w-4 text-[#C5A25D]" />
                            Our Heritage
                        </div>
                        <h1 className="text-4xl md:text-7xl font-serif tracking-tight text-stone-100 leading-[1.1]">
                            Crafting <br />
                            <span className="italic font-light text-[#C5A25D]">Pure Legacy</span>
                        </h1>
                        <p className="text-stone-400 font-light leading-relaxed text-lg max-w-md">
                            A collective dedicated to preserving traditional craftsmanship through contemporary design.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Stats Bar ───────────────────────────────────────────────── */}
            <section className="bg-stone-900 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-700">
                        {stats.map((s) => (
                            <div key={s.label} className="flex flex-col items-center py-4 px-6 text-center">
                                <span className="text-2xl md:text-3xl font-serif text-[#C5A25D] font-light">{s.value}</span>
                                <span className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-medium mt-1">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <hr />
            {/* ── Features ────────────────────────────────────────────────── */}
            <section className="py-20  bg-stone-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="">
                        <p className="uppercase tracking-[0.5em] text-[#C5A25D] font-semibold mb-3">Why Choose Us</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-stone-900">The Art of Giving</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-px  bg-stone-900">
                        {features.map((item) => (
                            <div key={item.title} className="bg-stone-900 border border-[#C5A25D]/40 p-10 group transition-colors duration-300 mr-4">
                                <div className="w-12 h-12 border border-[#C5A25D]/40 flex items-center justify-center mb-8 text-[#C5A25D]">
                                    <item.icon className="w-5 h-5 stroke-[1.5]" />
                                </div>
                                <h3 className="text-lg font-serif text-white mb-3">{item.title}</h3>
                                <p className="text-stone-500 text-sm leading-relaxed font-light">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <hr />
            {/* ── Shop gift ────────────────────────────────────────────── */}
            <section className="py-20 bg-stone-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="">
                        <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A25D] font-semibold mb-3">Budget-Friendly</p>
                        <h2 className="text-3xl md:text-4xl font-serif text-white">Curated Collections</h2>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4  min-h-[300px] md:min-h-[240px] my-10">
                        {isLoading ? (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-stone-400">
                                <Loader2 className="w-8 h-8 animate-spin mb-4" />
                                <p className="text-xs uppercase tracking-[0.2em]">Curating Selection…</p>
                            </div>
                        ) : (
                            displayProducts.slice(0, 4).map((p: any) => (
                                <ProductCard key={p._id ?? p.id} product={p} />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* ── Testimonial Banner ───────────────────────────────────────── */}
            <section className="py-20 bg-[#C5A25D]">
                <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
                    <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-white fill-white" />
                        ))}
                    </div>
                    <blockquote className="text-2xl md:text-3xl font-serif text-white italic leading-relaxed">
                        &quot;Because some treasures are too precious to be simply given — they must be shared.&quot;
                    </blockquote>
                    <p className="text-white/70 text-xs uppercase tracking-[0.4em] font-semibold">The Gemini Heritage Promise</p>
                </div>
            </section>

            {/* ── FAQ ─────────────────────────────────────────────────────── */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-16">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.5em] text-[#C5A25D] font-semibold mb-3">Support</p>
                            <h2 className="text-3xl font-serif text-stone-900 mb-6">Gifting Questions</h2>
                            <p className="text-stone-500 text-sm font-light leading-relaxed mb-8">
                                Have more questions? Our gifting concierge is available 7 days a week to help you find the perfect selection.
                            </p>
                            <div className="flex items-center gap-3 text-sm text-stone-700 font-medium">
                                <Phone className="w-4 h-4 text-[#C5A25D]" />
                                +91 98765 43210
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <Accordion type="single" collapsible className="space-y-3">
                                {[
                                    {
                                        q: "Can I customize the contents of a gift box?",
                                        a: "Absolutely. We offer bespoke customization for corporate orders and select premium collections. Connect with our concierge for personalized assistance."
                                    },
                                    {
                                        q: "How do you manage fragile shipping?",
                                        a: "Each piece is meticulously hand-packed in sustainable, protective cushioning to ensure the artisanal heritage reaches you in pristine condition."
                                    },
                                    {
                                        q: "What is your return policy for gifts?",
                                        a: "We offer a 7-day hassle-free return policy for all standard gift boxes. Bespoke and personalized orders are final sale."
                                    },
                                    {
                                        q: "Do you offer corporate gifting solutions?",
                                        a: "Yes. We work with companies of all sizes to create branded gifting experiences. Reach out to our corporate team for bulk pricing and custom packaging."
                                    },
                                ].map((item, idx) => (
                                    <AccordionItem
                                        key={idx}
                                        value={`item-${idx}`}
                                        className="border border-stone-100 px-6 bg-stone-50/50 rounded-none"
                                    >
                                        <AccordionTrigger className="text-sm font-semibold text-stone-900 hover:text-[#C5A25D] py-5 text-left [&>svg]:text-[#C5A25D]">
                                            {item.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-stone-500 font-light leading-relaxed text-sm pb-5">
                                            {item.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}