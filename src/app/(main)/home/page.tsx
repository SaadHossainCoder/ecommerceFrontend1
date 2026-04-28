import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareholderReports } from "@/app/(main)/home/_components/carousel";
// import { getTrendingProducts, getSeasonChoices, getReports } from "@/services/product-service";
import ProductCard from "./_components/ProductCard";
import { TestimonialsSection } from "./_components/TestimonialsSection";
import { FeatureGrid } from "./_components/FeatureGrid";
import { FeaturedProductsList } from "./_components/FeaturedProductsList";
import { Suspense } from "react";
import {LoaderCircleIcon as LoaderCircle} from "@/components/icon/loader-circle"

import { Hero } from "./_components/Hero";
import { TrustBadges } from "./_components/TrustBadges";

export const metadata: Metadata = {
    title: "Home | ShopHub - Premium E-Commerce",
    description: "Explore our curated collection of premium products, from artisanal jewelry to modern electronics.",
};


const reportsData = [
  {
    id: "1",
    name: "Elegance Collection",
    artName: "Classic Timepieces",
    period: "2024",
    imageSrc: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    isNew: true,
  },
  {
    id: "2",
    name: "Essential Artisanal",
    artName: "Gold Jewelry",
    period: "2024",
    imageSrc: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
  },
  {
    id: "3",
    name: "Oceanic Edit",
    artName: "Selected Pearls",
    period: "2023",
    imageSrc: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
  },
  {
    id: "4",
    name: "Modern Acoustics",
    artName: "Studio Audio",
    period: "2024",
    imageSrc: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    isNew: true,
  }
];



export default async function HomePage() {
    // const trendingProducts = await getTrendingProducts();
    // const seasonChoices = await getSeasonChoices();

    return (

        <div className="bg-background">
            {/* --- SECTON: HERO --- */}
            <Hero />
            
            <section>
                <hr />

                {/* --- SECTION: FEATURE GRID --- */}
                <FeatureGrid />
                <hr />

                {/* --- BRAND LOGOS --- */}
                <div className="">
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-12 items-center justify-items-center py-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                        {["ALIRESORT", "NEW YORK CITY STYLE", "AMIE BLUE", "MARA", "STUDIO TWENTY", "GOLDENGOLD"].map((brand) => (
                            <div key={brand} className="text-[10px] font-black tracking-[0.3em] font-heading hover:text-black cursor-pointer transition-colors">{brand}</div>
                        ))}
                    </div>
                </div>

                <hr />
                {/* --- SECTION: Feature product --- */}
                <section className=" py-12">
                    <div className="flex justify-between items-end pb-4 container-custom">
                        <h2 className="text-3xl font-heading font-medium "> Trending Now </h2>
                        <Link href="/products" className="text-sm font-medium hover:underline flex items-center gap-1">
                            VIEW ALL <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <hr className="pb-10 h-3" />
                    <Suspense fallback={<LoaderCircle className="text-black"/>}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-8 container-custom">
                            <FeaturedProductsList limit={6}/>
                        </div>
                    </Suspense>
                </section>

                {/* --- SECTION: MIDDLE BANNER --- */}
                <section className="relative w-full h-100 text-white flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-stone-900 select-none pointer-events-none">
                        <Image
                            src="/fig.png"
                            alt="Footer Background"
                            fill
                            className="object-cover opacity-50"
                            priority
                        />
                    </div>

                    <div className="relative z-10 flex items-center justify-center w-full max-w-6xl px-4 md:px-0">
                        <div className="space-y-6 max-w-2xl w-full ">
                            <hr />
                            <h2 className=" uppercase text-4xl md:text-[200px] font-heading  mb-4 text-center text-amber-50">
                                The<br /> Art of Nature
                            </h2>
                            <Link href="/our-story" className="text-xs tracking-widest font-medium border-b border-white inline-block pb-1 hover:text-white/80 text-center w-full">
                                READ MORE
                            </Link>
                        </div>
                    </div>
                </section>

                {/* --- Dresses  --- */}
                <section className=" py-12 ">
                    <div className="flex justify-between items-end pb-4 container-custom">
                        <h2 className="text-3xl font-heading font-medium "> Dresses </h2>
                        <Link href="/products" className="text-sm font-medium hover:underline flex items-center gap-1">
                            VIEW ALL <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <hr className="pb-10 h-3" />
                    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-8 container-custom">
                            {/* Passing the specific category Slug for Ladies/Dresses */}
                            <FeaturedProductsList limit={6} categorySlug="bags" />
                        </div>
                    </Suspense>
                </section>
                <hr />

                {/* --- SECTION: OLDEST CRAFT BLOCK --- */}
                <section className="container-custom py-24 relative">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-6 relative lg:sticky lg:top-32">
                            <p className="text-xs tracking-[0.3em] font-medium text-secondary uppercase">LEGACY</p>
                            <h2 className="text-5xl md:text-6xl font-heading font-medium leading-tight">
                                The world&apos;s<br />oldest craft form
                            </h2>
                            <p className="text-lg font-body text-zinc-400 max-w-md leading-relaxed italic border-l-2 border-accent pl-6">
                                From the majestic brass chariots of the east to the delicate pottery of the south.
                                Each piece is a journey through time, carrying the breath of a thousand years.
                            </p>
                            <Link href="/our-story" className="inline-block border-b border-foreground pb-1 text-sm font-medium hover:text-secondary">
                                OUR HERITAGE
                            </Link>
                        </div>
                        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
                        <div className="grid grid-cols-2 gap-4 relative ">
                            <div className="relative aspect-2/3 overflow-hidden">
                                <Image
                                    src="https://i.pinimg.com/736x/39/2b/39/392b39f3a3af88a805254025c5c18b6b.jpg"
                                    alt="Brass Art 1"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="relative aspect-2/4 overflow-hidden mt-8">
                                <Image
                                    src="https://i.pinimg.com/1200x/36/47/0e/36470e90391eaecf63e9528aaf10fd3f.jpg"
                                    alt="Brass Art 2"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        </Suspense>
                    </div>
                </section>
                <hr />

                {/* --- SECTION:  --- */}
                <section className=" py-16">
                    <div className="w-full bg-background">
                        <ShareholderReports className="" />
                    </div>
                </section>

                <section className="hidden md:block">
                <TrustBadges />
                </section>
       
                {/* --- SECTION: ELEPHANT PROMO --- */}
                <section className="container-custom py-24 relative ">
                    <div className="grid md:grid-cols-2 gap-12 items-start relative h-full">
                        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
                        <div className="relative aspect-square md:aspect-2/3 overflow-hidden">
                            <Image
                                src="https://i.pinimg.com/736x/7f/49/2e/7f492ed36a65e79dda9c8454f9867a5d.jpg"
                                alt="Elephant sculpture"
                                fill
                                className="object-cover"
                            />
                        </div>
                        </Suspense>
                        <div className="space-y-6 sticky top-32">
                            <p className="text-xs tracking-[0.3em] font-medium text-secondary uppercase">MASTERPIECE</p>
                            <h2 className="text-4xl md:text-5xl font-heading font-medium leading-tight">
                                Native India craftsmanship onto your hands
                            </h2>
                            <p className="text-lg font-body opacity-80 max-w-md leading-relaxed">
                                Our collection of stone sculptures and wood carvings are selected for their historical
                                significance and master craftsmanship. Experience the soul of artisanal India.
                            </p>
                            <div className="flex gap-4">
                                <Button className="bg-button-black text-white hover:bg-button-hover-black px-8 h-12 rounded-none" asChild>
                                    <Link href="/products">SHOP NOW</Link>
                                </Button>
                                <Button variant="outline" className="border-button-black text-button-black hover:bg-button-black hover:text-text-white px-8 h-12 rounded-none" asChild>
                                    <Link href="/products">VIEW ALL</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <hr />
                {/* Customer Testimonials Section */}
                <TestimonialsSection />
               
                <hr />
                {/* --- SECTION: EXPLORE COLLECTIONS --- */}
                <section className=" py-24 bg-muted/30">
                    <div className="grid md:grid-cols-2 gap-24 container-custom">
                        <div className="space-y-12">
                            <h2 className="text-5xl font-heading font-medium mb-12">Explore our<br />collections</h2>
                            <div className="grid grid-cols-2 gap-y-12 gap-x-8">
                                {["Bed", "Bath", "Kitchen", "Living Decor"].map((cat) => (
                                    <Link key={cat} href={`/products?category=${cat.toLowerCase()}`} className="group space-y-2">
                                        <p className="text-sm font-medium tracking-widest text-foreground/60 group-hover:text-secondary transition-colors">{cat.toUpperCase()}</p>
                                        <div className="h-px w-full bg-foreground/10 group-hover:bg-secondary transition-all"></div>
                                        <p className="text-xs text-foreground/40 italic">Explore Selection</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
                        <div className="relative aspect-4/5 overflow-hidden">
                            <Image
                                src="https://i.pinimg.com/736x/19/9f/6f/199f6fae3ff34e0ce09f09fa61409821.jpg"
                                alt="Chariot Art"
                                fill
                                className="object-cover"
                            />
                        </div>
                        </Suspense>
                    </div>
                </section>
            </section>
        </div>
    );
}
