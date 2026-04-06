import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareholderReports } from "@/app/(main)/home/_components/carousel";
// import { getTrendingProducts, getSeasonChoices, getReports } from "@/services/product-service";
import ProductCard from "./_components/ProductCard";
import { TestimonialsSection } from "./_components/TestimonialsSection";
import { Suspense } from "react";
import {LoaderCircleIcon as LoaderCircle} from "@/components/icon/loader-circle"

export default async function HomePage() {
    // const trendingProducts = await getTrendingProducts();
    // const seasonChoices = await getSeasonChoices();
    // const reportsData = await getReports();

    return (

        <div className="bg-background">
            {/* --- SECTON: HERO --- */}
            {/* --- SECTON: HERO CAROUSEL --- */}
            {/* Video Hero Section */}
            <section className="relative w-full h-150 overflow-hidden bg-stone-900">
                {/* Auto-playing Muted Video Background */}
                <Suspense fallback={<LoaderCircle className="text-black"/>}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                >
                    <source src="https://cdn.pixabay.com/video/2018/10/25/18897-297379518_large.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                </Suspense>


                {/* Overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/10" />

                {/* Centered Text with Negative Filter */}
                <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-center px-4">
                        <h1
                            className="text-6xl md:text-8xl lg:text-9xl font-heading font-black uppercase tracking-tight"
                            style={{ mixBlendMode: 'difference', color: 'white' }}
                        >
                            FASHION IS ART
                        </h1>
                        <p
                            className="text-2xl md:text-4xl font-heading font-medium mt-4"
                            style={{ mixBlendMode: 'difference', color: 'white' }}
                        >
                            Wearable Masterpieces
                        </p>
                        <p
                            className="text-xl md:text-2xl font-light mt-2"
                            style={{ mixBlendMode: 'difference', color: 'white' }}
                        >
                            First time
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <hr />

                {/* --- SECTION: FEATURE GRID --- */}
                {/* Feature Grid Section */}
                <section className=" relative container-custom py-20">
                    <Suspense fallback={<LoaderCircle className="text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {/* Row 1 - Three equal items */}
                        <div className="relative overflow-hidden group bg-white border border-primary/5 aspect-4/5 md:aspect-square">
                            <Link href="/products" className="block h-full">
                                <div className="relative h-full w-full">
                                    <Image
                                        src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
                                        alt="Watch"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        priority
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </Link>
                        </div>

                        <div className="relative overflow-hidden group bg-white border border-primary/5 aspect-4/5 md:aspect-square">
                            <Link href="/products" className="block h-full">
                                <div className="relative h-full w-full">
                                    <Image
                                        src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80"
                                        alt="Necklace"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        priority
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </Link>
                        </div>

                        <div className="relative overflow-hidden group bg-white border border-primary/5 aspect-4/5 md:aspect-square">
                            <Link href="/products" className="block h-full">
                                <div className="relative h-full w-full">
                                    <Image
                                        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
                                        alt="Pearl Necklace"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                        priority
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </Link>
                        </div>


                        {/* Row 2 - Two wider items */}
                        <div className="md:col-span-2 relative overflow-hidden group bg-white border border-primary/5">
                            <Link href="/products" className="block h-full">
                                <div className="relative h-64 md:h-80">
                                    <Image
                                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80"
                                        alt="Clothing Store"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </Link>
                        </div>

                        <div className="relative overflow-hidden group bg-white border border-primary/5">
                            <Link href="/products" className="block h-full">
                                <div className="relative h-64 md:h-80">
                                    <Image
                                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                                        alt="Headphones"
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </Link>
                        </div>
                    </div>
                    </Suspense>
                </section>
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
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 container-custom">
                            {/* {trending   Products.map((p) => (
                                <ProductCard key={p.id} {...p} />
                            ))} */}
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
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 container-custom">
                            {/* {seasonChoices.map((p) => (
                                <ProductCard key={p.id} {...p} />
                            ))} */}
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
                        {/* <ShareholderReports reports={reportsData} /> */}
                    </div>
                </section>
                <hr />

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
                                <Button className="bg-[#3B4A3A] text-white hover:bg-[#2B3A2A] px-8 h-12 rounded-none" asChild>
                                    <Link href="/products">SHOP NOW</Link>
                                </Button>
                                <Button variant="outline" className="border-[#3B4A3A] text-[#3B4A3A] hover:bg-[#3B4A3A] hover:text-white px-8 h-12 rounded-none" asChild>
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
