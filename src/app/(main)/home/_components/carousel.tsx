"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useVendorStore } from "@/store/vendor-store";
import Link from "next/link";

export interface Report {
  id: string;
  name: string;
  artName?: string;
  period: string;
  imageSrc: string;
  isNew?: boolean;
  slug?: string;
}

interface ShareholderReportsProps {
  reports?: Report[];
  title?: string;
  artName?: string;
  subtitle?: string;
  className?: string;
}

export const ShareholderReports = React.forwardRef<
  HTMLDivElement,
  ShareholderReportsProps
>(({ reports: initialReports, title = "Our Artist", subtitle = "Masterful craftsmanship", className, ...props }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const { vendors, VendorsByShortData, isLoading } = useVendorStore();

  React.useEffect(() => {
    VendorsByShortData();
  }, [VendorsByShortData]);

  // Use dynamic vendors if initialReports not provided or empty
  const displayReports: Report[] = React.useMemo(() => {
    if (initialReports && initialReports.length > 0) return initialReports;
    
    return vendors.map(vendor => ({
      id: vendor.id,
      name: vendor.name,
      artName: vendor.vendorProductType || subtitle,
      period: new Date(vendor.createdAt).getFullYear().toString(),
      imageSrc: vendor.images && vendor.images.length > 0 ? vendor.images[0] : "https://via.placeholder.com/400x500",
      slug: vendor.slug
    }));
  }, [vendors, initialReports, subtitle]);

  const checkScrollability = React.useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  React.useEffect(() => {
    setIsMounted(true);
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
  }, [displayReports, checkScrollability]);

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

  if (isLoading && displayReports.length === 0) {
    return <div className="py-20 text-center font-serif italic text-stone-500">Loading artisans...</div>;
  }

  return (
    <section
      ref={ref}
      className={cn("w-full", className)}
      aria-labelledby="reports-heading"
      {...props}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between px-4 sm:px-6 md:px-8 mb-8 container-custom gap-4">
        <div className="flex items-center gap-4">
          <h2 id="reports-heading" className="text-xl md:text-2xl font-heading font-medium tracking-tight text-foreground">
            {title}
          </h2>
          <div className="h-px w-12 bg-antique-gold/30 hidden md:block"></div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!isMounted || !canScrollLeft}
            aria-label="Scroll left"
            className={cn(
              "p-2 rounded-full border border-ash-brown/20 bg-background text-foreground transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50"
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!isMounted || !canScrollRight}
            aria-label="Scroll right"
            className={cn(
              "p-2 rounded-full border border-ash-brown/20 bg-background text-foreground transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-stone-50"
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide gap-3 sm:gap-5 px-4 sm:px-6 md:px-8 pb-4"
      >
        {displayReports.map((report) => (
          <div
            key={report.id}
            className="shrink-0 w-[75vw] sm:w-[280px] md:w-[340px] snap-start"
          >
            <Link href={report.slug ? `/artists/${report.slug}` : "#"} className="group cursor-pointer block">
              <div className="relative overflow-hidden rounded-sm bg-card border-none mb-4 transition-all duration-700 ease-in-out group-hover:shadow-royal">
                <div className="aspect-[4/5] sm:aspect-[3/4] w-full">
                  <Image
                    src={report.imageSrc}
                    alt={`Information for ${report.name}`}
                    fill
                    sizes="(max-width: 640px) 75vw, (max-width: 768px) 280px, 340px"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end text-white group-hover:from-black/90 transition-colors duration-500">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-antique-gold text-[9px] tracking-[0.3em] font-medium uppercase mb-1.5 opacity-90">{report.period}</p>
                    <p className="text-lg md:text-xl font-heading font-medium leading-tight">{report.artName || subtitle}</p>
                  </div>
                </div>
                
                {report.isNew && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="glass px-2 py-0.5 text-[8px] tracking-widest font-black uppercase text-charcoal-ink shadow-sm">
                      NEW
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between px-1">
                <h4 className="font-heading font-medium tracking-wide text-foreground text-base sm:text-lg">{report.name}</h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
});

ShareholderReports.displayName = "ShareholderReports";