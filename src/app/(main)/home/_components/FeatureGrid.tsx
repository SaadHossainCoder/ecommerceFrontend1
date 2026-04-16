import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
    {
        title: "Artisan Timepieces",
        subtitle: "Precision",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        href: "/products",
        span: "col-span-2 md:col-span-4 md:row-span-2",
        aspect: "aspect-[4/3] sm:aspect-[16/9] md:aspect-auto",
        label: "Bestseller"
    },
    {
        title: "Gold Jewelry",
        subtitle: "Essential",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
        href: "/products",
        span: "col-span-1 md:col-span-4 md:row-span-1",
        aspect: "aspect-[4/5] md:aspect-auto",
        label: "New"
    },
    {
        title: "Selected Pearls",
        subtitle: "Oceanic",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
        href: "/products",
        span: "col-span-1 md:col-span-4 md:row-span-1",
        aspect: "aspect-[4/5] md:aspect-auto"
    },
    {
        title: "Artistic Weaves",
        subtitle: "The Edit",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80",
        href: "/products",
        span: "col-span-2 sm:col-span-1 md:col-span-5 md:row-span-1",
        aspect: "aspect-[16/9] sm:aspect-[4/5] md:aspect-auto"
    },
    {
        title: "Studio Audio",
        subtitle: "Modern",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
        href: "/products",
        span: "col-span-2 sm:col-span-1 md:col-span-3 md:row-span-1",
        aspect: "aspect-[16/9] sm:aspect-[4/5] md:aspect-auto"
    }
];

const FeatureItem = ({ feature, priority = false }: { feature: typeof FEATURES[0], priority?: boolean }) => (
    <div className={cn("relative overflow-hidden group rounded-sm shadow-sm hover:shadow-royal transition-all duration-700", feature.span)}>
        <Link href={feature.href} className="block h-full w-full">
            <div className={cn("relative h-full w-full", feature.aspect)}>
                <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={priority}
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent group-hover:from-black/90 transition-all duration-500" />
                
                {feature.label && (
                    <div className="absolute top-4 right-4 z-10">
                        <span className="glass px-2 py-0.5 text-[8px] tracking-widest font-black uppercase text-charcoal-ink shadow-sm">
                            {feature.label}
                        </span>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 p-3 sm:p-4 md:p-5 w-full transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-antique-gold text-[8px] sm:text-[9px] tracking-[0.4em] font-medium uppercase mb-0.5">{feature.subtitle}</p>
                    <h3 className="text-white text-base sm:text-lg md:text-xl font-heading mb-3 leading-tight font-medium">{feature.title}</h3>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-2 group-hover:translate-x-0">
                        <span className="h-[1px] w-5 bg-antique-gold"></span>
                        <ArrowRight className="text-white w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </div>
        </Link>
    </div>
);

export const FeatureGrid = () => {
    return (
        <section className="relative container-custom py-12 border-y border-ash-brown/5">
            <div className="flex justify-between items-baseline mb-6 md:mb-8">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl md:text-2xl font-heading font-medium tracking-tight">Artisanal Excellence</h2>
                    <div className="h-px w-12 bg-antique-gold/30 hidden md:block"></div>
                </div>
                <Link href="/products" className="text-[9px] font-black tracking-[0.3em] text-secondary hover:text-primary transition-colors uppercase border-b border-transparent hover:border-secondary pb-0.5">
                    Explore All Collections
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-12 md:grid-rows-2 gap-2 sm:gap-3 h-auto md:h-[480px]">
                {FEATURES.map((item, idx) => (
                    <FeatureItem key={item.title} feature={item} priority={idx === 0} />
                ))}
            </div>
        </section>
    );
};
