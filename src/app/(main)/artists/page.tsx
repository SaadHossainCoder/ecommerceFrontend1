import Link from "next/link";
import Image from "next/image";
// import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import ArtistCard from "./_components/artistCard";

export default function ArtistsPage() {
    return (
        <section>
            <div className="bg-[#f5f5f5] min-h-screen">
                {/* Header */}
                <div className=" pb-30 border-b border-stone-200 bg-white relative">
                    <header className="relative h-full w-full overflow-hidden flex items-center justify-center">
                        <section className="relative w-full h-100 text-white flex flex-col items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                                <Image
                                    src="https://images.stockcake.com/public/a/1/c/a1c9dea5-f380-4668-98d2-b8c922dfbfd2_large/shadows-tell-stories-stockcake.jpg"
                                    alt="Footer Background"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-black/30 z-10"></div>
                            </div>

                        </section>
                    </header>
                    {/* transform -translate-x-1/2 translate-y-1/2 */}
                    <div className=" max-w-6xl absolute bottom-0  bg-white px-6 md:px-12 py-8  border-t border-stone-200">
                        <h1
                            className="text-4xl md:text-5xl font-serif tracking-tight text-stone-900"
                        >
                            Our Designers
                        </h1>
                        <p
                            className="mt-4 text-stone-500 max-w-2xl font-light"
                        >
                            We collaborate with a global community of artisans and designers to bring you unique, handcrafted pieces that celebrate heritage and modern craftsmanship.
                        </p>
                    </div>
                </div>

                {/* Artists List */}
                <ArtistCard />

                {/* Footer CTA */}
                <section className="py-32 bg-white border-t border-stone-200">
                    <div className="container-custom text-center space-y-8">
                        <h2 className="text-3xl md:text-5xl font-serif text-stone-900">
                            The Story of <span className="italic">Santiniketan</span>
                        </h2>
                        <p className="text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">
                            A legacy of artisanal excellence, born in the heart of Bengal and dedicated to the art of the perfect daily ritual.
                        </p>
                        <Button variant="outline" className="h-14 px-10 rounded-none border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300" asChild>
                            <Link href="/our-story">
                                Discover More
                            </Link>
                        </Button>
                    </div>
                </section>
            </div>
        </section>
    );
}
