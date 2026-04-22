"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    Star, Heart, ShoppingCart, Minus, Plus,
    Truck, RotateCcw, ChevronRight, ArrowLeft,
    Shield, X, ChevronLeft, ZoomIn, Package,
    CheckCircle2, Info, Loader2, AlertCircle,
} from "lucide-react";
import { toast } from "@/components/ui/toaster";
import { productService } from "@/services/product.service";
import { categoryService } from "@/services/category.service";
import { cartLocalStorageData } from "@/localStorage/cartData";

// ─── Zoom Component ───────────────────────────────────────────────────────────

function ImageZoom({ src, alt, onImageClick }: { src: string; alt: string; onImageClick: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);
    const [lens, setLens] = useState({ x: 0, y: 0 });
    const [result, setResult] = useState({ x: 0, y: 0 });
    const LENS = 140;
    const ZOOM = 2.8;

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - r.left - LENS / 2, r.width - LENS));
        const y = Math.max(0, Math.min(e.clientY - r.top - LENS / 2, r.height - LENS));
        setLens({ x, y });
        setResult({ x: (x / (r.width - LENS)) * 100, y: (y / (r.height - LENS)) * 100 });
    };

    return (
        <div className="flex gap-4 group">
            <div
                ref={ref}
                onClick={onImageClick}
                className="relative w-full aspect-[4/5] overflow-hidden bg-stone-100 cursor-crosshair select-none border border-stone-200"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onMouseMove={onMove}
            >
                <Image src={src} alt={alt} fill className="object-cover pointer-events-none" priority draggable={false} />

                {hovering && (
                    <div
                        className="absolute pointer-events-none z-10 border border-stone-400/50 bg-white/10"
                        style={{ width: LENS, height: LENS, left: lens.x, top: lens.y }}
                    />
                )}

                {!hovering && (
                    <div className="absolute bottom-5 left-5 bg-white/90 text-stone-900 border border-stone-200/50 px-4 py-2 text-[9px] uppercase tracking-[0.25em] font-bold flex items-center gap-2 backdrop-blur-sm shadow-sm transition-opacity opacity-0 group-hover:opacity-100">
                        <ZoomIn className="w-3.5 h-3.5" /> Hover to zoom
                    </div>
                )}
            </div>

            {hovering && (
                <div
                    className="hidden lg:block absolute left-full top-0 ml-6 z-50 border border-stone-200 bg-white shadow-xl overflow-hidden pointer-events-none shrink-0"
                    style={{
                        width: 480, height: 480,
                        backgroundImage: `url(${src})`,
                        backgroundSize: `${ZOOM * 100}%`,
                        backgroundPosition: `${result.x}% ${result.y}%`,
                        backgroundRepeat: "no-repeat",
                    }}
                />
            )}
        </div>
    );
}

// ─── Star Row ─────────────────────────────────────────────────────────────────

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "xs" }) {
    const s = size === "xs" ? "w-3 h-3" : "w-4 h-4";
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`${s} transition-colors ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-stone-200 fill-stone-200"}`} />
            ))}
        </div>
    );
}

// ─── Static breakdown data ─────────────────────────────────────────────────────

const staticReviews = [
    { id: 1, user: "Lady Victoria", avatar: "LV", rating: 5, date: "2 weeks ago", content: "The craftsmanship is unparalleled. A true heirloom." },
    { id: 2, user: "Arthur Penhaligon", avatar: "AP", rating: 5, date: "1 month ago", content: "One can feel the tradition in the fine engravings. Truly a distinguished piece." },
    { id: 3, user: "Lord Saxon", avatar: "LS", rating: 5, date: "3 days ago", content: "Exceptional craftsmanship that perfectly fits my collection vault." },
];

const ratingBreakdown = [
    { label: "5", count: 989, pct: 85 },
    { label: "4", count: 4500, pct: 70 },
    { label: "3", count: 50, pct: 15 },
    { label: "2", count: 16, pct: 8 },
    { label: "1", count: 8, pct: 5 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductDetailsPage() {
    const params = useParams();
    const slug = params?.slug as string;

    const [product, setProduct] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedSubSize, setSelectedSubSize] = useState<string>("");
    const [wishlisted, setWishlisted] = useState(false);
    const [activeTab, setActiveTab] = useState<"details" | "specs" | "care">("details");
    const [reviewRating, setReviewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [showSticky, setShowSticky] = useState(false);
    const [autoPlay, setAutoPlay] = useState(true);
    const [lightbox, setLightbox] = useState(false);

    // ── Derived values ─────────────────────────────────────────────────────────
    const name = product?.title ?? product?.name ?? "Unnamed";
    const categoryName = typeof product?.category === "object" ? product?.category?.name : product?.category;
    const parentCategory = typeof product?.category === "object" ? product?.category?.parentCategory : null;
    const sku = product?.sku ?? "—";
    const description = product?.description ?? "";
    const details = product?.benefits ?? [];
    const discount = product?.discount ?? 0;
    const currentVariant = product?.subProducts?.find((s: any) => s.type === selectedSize) ?? product?.subProducts?.[0];
    const price = currentVariant?.price ?? 0;
    const origPrice = discount > 0 ? Math.round(price / (1 - discount / 100)) : null;
    const savings = origPrice ? origPrice - price : 0;

    // ── Dynamic Gallery Management (Strict Variant Mode) ──────────────────────
    const displayImages = useMemo(() => {
        // 1. If the selected variant has its own gallery, use ONLY those.
        if (currentVariant?.images && Array.isArray(currentVariant.images) && currentVariant.images.length > 0) {
            return currentVariant.images;
        }

        // 2. Fallback to main product general images.
        return product?.generalImages ?? [];
    }, [product?.generalImages, currentVariant?.images]);

    // Reset gallery to index 0 when size changes (so hero updates)
    useEffect(() => {
        setSelectedImage(0);
    }, [selectedSize]);

    // ── Fetch product ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (!slug) return;
        setIsLoading(true);
        setFetchError(null);
        productService.getProductBySlug(slug)
            .then((res) => {
                const data = res.data;
                setProduct(data);
                // Set first sub-product as default selection
                if (data?.subProducts?.length > 0) {
                    const first = data.subProducts[0];
                    setSelectedSize(first.type);
                    if (first.size?.length > 0) {
                        setSelectedSubSize(first.size[0]);
                    }
                }
            })
            .catch((err) => {
                const msg = err.response?.data?.message || err.message || "Failed to load product";
                setFetchError(msg);
            })
            .finally(() => setIsLoading(false));
    }, [slug]);

    // ── Fetch related products ───────────────────────────────
    useEffect(() => {
        if (!product?.category) return;

        const categoryIdQuery = typeof product.category === 'object' ? product.category.id : product.category;

        if (!categoryIdQuery) return;

        const fetchRelated = async () => {
            try {
                // Fetch a bit more to ensure we can find items in the same subcategory
                const res = await productService.getAllProducts({ categoryId: categoryIdQuery, limit: 12 });
                let others = res.data.data.filter((p: any) => p.slug !== slug);

                // Fetch the category to get its SubCategories
                let fetchedSubCategories: any[] = [];
                try {
                    const catRes = await categoryService.getSubCategories(categoryIdQuery);
                    if (catRes.data?.subCategories) {
                        fetchedSubCategories = catRes.data.subCategories;
                    }
                } catch (err) {
                    console.error("Failed to fetch subcategories", err);
                }

                // Prioritize items in the same subcategory
                let subCatId = product?.ingredients?.subcategory;
                
                // If subCatId is a name, find its actual ID from the fetched SubCategories
                if (subCatId && fetchedSubCategories.length > 0) {
                    const match = fetchedSubCategories.find(s => s.id === subCatId || s.name === subCatId || s.slug === subCatId);
                    if (match) subCatId = match.id;
                }

                if (!subCatId && typeof product.category === 'object') {
                    if (Array.isArray(product.category.subCategories) && product.category.subCategories.length > 0) {
                        subCatId = product.category.subCategories[0].id;
                    } else if (fetchedSubCategories.length > 0) {
                        subCatId = fetchedSubCategories[0].id;
                    }
                }

                if (subCatId) {
                    const sameSubCat = others.filter((p: any) => {
                        let pSubCat = p?.ingredients?.subcategory;
                        if (pSubCat && fetchedSubCategories.length > 0) {
                             const match = fetchedSubCategories.find(s => s.id === pSubCat || s.name === pSubCat || s.slug === pSubCat);
                             if (match) pSubCat = match.id;
                        }
                        if (!pSubCat && typeof p?.category === 'object' && Array.isArray(p?.category?.subCategories)) {
                             pSubCat = p.category.subCategories[0]?.id;
                        }
                        return pSubCat === subCatId;
                    });
                    const diffSubCat = others.filter((p: any) => {
                        let pSubCat = p?.ingredients?.subcategory;
                        if (pSubCat && fetchedSubCategories.length > 0) {
                             const match = fetchedSubCategories.find(s => s.id === pSubCat || s.name === pSubCat || s.slug === pSubCat);
                             if (match) pSubCat = match.id;
                        }
                        if (!pSubCat && typeof p?.category === 'object' && Array.isArray(p?.category?.subCategories)) {
                             pSubCat = p.category.subCategories[0]?.id;
                        }
                        return pSubCat !== subCatId;
                    });
                    others = [...sameSubCat, ...diffSubCat];
                }

                setRelatedProducts(others.slice(0, 4));
            } catch (err) {
                console.error("Failed to fetch curated alternatives", err);
            }
        };

        fetchRelated();
    }, [product?.category, product?.ingredients, slug]);

    // Update sub-size if variant changes
    useEffect(() => {
        if (currentVariant?.size?.length > 0 && !currentVariant.size.includes(selectedSubSize)) {
            setSelectedSubSize(currentVariant.size[0]);
        }
    }, [currentVariant, selectedSubSize]);

    // ── Scroll & keyboard effects ──────────────────────────────────────────────
    useEffect(() => {
        if (!autoPlay || lightbox || displayImages.length === 0) return;
        const t = setInterval(() => setSelectedImage(p => (p + 1) % displayImages.length), 5000);
        return () => clearInterval(t);
    }, [autoPlay, lightbox, displayImages.length]);

    useEffect(() => {
        const fn = () => setShowSticky(window.scrollY > 700);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    useEffect(() => {
        const fn = (e: KeyboardEvent) => {
            if (!lightbox) return;
            if (e.key === "ArrowRight") setSelectedImage(p => (p + 1) % displayImages.length);
            if (e.key === "ArrowLeft") setSelectedImage(p => (p - 1 + displayImages.length) % displayImages.length);
            if (e.key === "Escape") setLightbox(false);
        };
        window.addEventListener("keydown", fn);
        return () => window.removeEventListener("keydown", fn);
    }, [lightbox, displayImages.length]);

    const prev = () => setSelectedImage(p => (p - 1 + displayImages.length) % displayImages.length);
    const next = () => setSelectedImage(p => (p + 1) % displayImages.length);

    // ── Loading/Error Rendering ──
    if (isLoading) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-stone-400">
                    <Loader2 className="w-10 h-10 animate-spin" />
                    <p className="text-xs uppercase tracking-[0.3em]">Retrieving Piece…</p>
                </div>
            </div>
        );
    }

    if (fetchError || !product) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                    <h2 className="text-lg font-semibold text-stone-900 mb-2">Piece Not Found</h2>
                    <p className="text-sm text-stone-400 mb-6">{fetchError ?? "This item could not be located in the archive."}</p>
                    <Link href="/products" className="bg-stone-900 text-white text-[10px] uppercase tracking-[0.25em] font-bold px-6 py-3 hover:bg-stone-800 transition-colors">
                        Return to Collection
                    </Link>
                </div>
            </div>
        );
    }

    const images = displayImages; // Aliasing for compatibility with existing code
    const primaryImg = images[selectedImage] ?? "https://placehold.co/800x1000/png?text=Product";

    return (
        <div className="min-h-screen bg-stone-50">

            {/* ── Breadcrumb ── */}
            <div className="bg-white border-b border-stone-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400">
                        <Link href="/" className="hover:text-stone-900 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3 text-stone-300" />
                        <Link href="/products" className="hover:text-stone-900 transition-colors">Vault</Link>
                        {parentCategory && (
                            <>
                                <ChevronRight className="w-3 h-3 text-stone-300" />
                                <Link href={`/products?category=${parentCategory.id}`} className="hover:text-stone-900 transition-colors">
                                    {parentCategory.name}
                                </Link>
                            </>
                        )}
                        <ChevronRight className="w-3 h-3 text-stone-300" />
                        <Link href={`/products?category=${typeof product?.category === "object" ? product.category.id : ""}`} className="hover:text-stone-900 transition-colors">{categoryName}</Link>
                        <ChevronRight className="w-3 h-3 text-stone-300" />
                        <span className="text-stone-900 truncate max-w-xs">{name}</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14">

                {/* ── Back ── */}
                <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400 hover:text-stone-900 transition-colors mb-10"
                >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Collection
                </Link>

                {/* ── Hero Grid ── */}
                <div className="grid lg:grid-cols-12 gap-10 xl:gap-16 mb-20">

                    {/* Gallery — 7 cols */}
                    <div className="lg:col-span-7 space-y-4">
                        <div
                            className="relative bg-white p-2 border border-stone-200 shadow-sm"
                            onMouseEnter={() => setAutoPlay(false)}
                            onMouseLeave={() => setAutoPlay(true)}
                        >
                            <ImageZoom src={primaryImg} alt={name} onImageClick={() => setLightbox(true)} />

                            {images.length > 0 && (
                                <>
                                    <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300 z-20 shadow-sm">
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all duration-300 z-20 shadow-sm">
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                    <div className="absolute bottom-6 right-6 bg-white/90 border border-stone-200/50 text-stone-900 text-[10px] font-bold tracking-widest px-3 py-1.5 backdrop-blur-sm pointer-events-none z-10 shadow-sm">
                                        0{selectedImage + 1}/0{images.length}
                                    </div>
                                </>
                            )}

                            {discount > 0 && (
                                <div className="absolute top-6 left-6 z-10">
                                    <span className="bg-emerald-900 text-white text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-1.5 shadow-sm">
                                        Archive Sale -{discount}%
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Thumbnails — Always show if there are images */}
                        {images && (
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                                {images.map((img: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={`relative w-24 h-28 shrink-0 overflow-hidden border-2 transition-all duration-300 ${selectedImage === i
                                            ? "border-stone-900 shadow-md"
                                            : "border-transparent opacity-60 hover:opacity-100 hover:border-stone-300"
                                            }`}
                                    >
                                        <Image src={img} alt="" fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info — 5 cols */}
                    <div className="lg:col-span-5 space-y-8 mt-2 lg:mt-0">

                        {/* Header */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-stone-400">
                                    {parentCategory ? `${parentCategory.name} · ${categoryName}` : categoryName} · {sku}
                                </p>
                                <button
                                    onClick={() => setWishlisted(w => !w)}
                                    className={`flex items-center gap-1.5 text-[9px] uppercase tracking-[0.2em] font-bold transition-colors ${wishlisted ? "text-red-500" : "text-stone-400 hover:text-red-400"
                                        }`}
                                    aria-label="Wishlist"
                                >
                                    <Heart className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`} />
                                    {wishlisted ? "Saved" : "Save Item"}
                                </button>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-serif text-stone-900 leading-tight tracking-tight mb-4">
                                {name}
                            </h1>

                            <div className="flex items-center gap-3">
                                <Stars rating={4.9} />
                                <span className="text-xs font-bold text-stone-700">4.9</span>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400">(145 reviews)</span>
                            </div>
                        </div>

                        {/* Price — updates live with selected size */}
                        <div className="py-5 border-y border-stone-200">
                            <div className="flex items-baseline gap-4 mb-3">
                                <span className="text-3xl font-serif text-stone-900 border-r border-stone-200 pr-4 transition-all duration-200">
                                    ₹{price.toLocaleString()}
                                </span>
                                {origPrice && (
                                    <span className="text-sm font-bold text-stone-400 line-through">
                                        ₹{origPrice.toLocaleString()}
                                    </span>
                                )}
                                {savings > 0 && (
                                    <span className="bg-amber-50 text-amber-900 border border-amber-200/50 px-2 py-1 text-[9px] uppercase tracking-[0.2em] font-bold">
                                        Save ₹{savings.toLocaleString()}
                                    </span>
                                )}
                            </div>
                            {/* Stock status */}
                            {currentVariant && (
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${currentVariant.qty > 10 ? "bg-emerald-500" : currentVariant.qty > 0 ? "bg-amber-400" : "bg-red-500"}`} />
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500">
                                        {currentVariant.qty <= 0
                                            ? "Out of Stock"
                                            : currentVariant.qty <= 10
                                                ? `Only ${currentVariant.qty} left`
                                                : "In Stock"}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-stone-500 leading-relaxed font-light">{description}</p>

                        {/* Variants Selection — handles different types like size, color, etc. */}
                        {product.subProducts?.length > 0 && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] uppercase tracking-[0.25em] font-bold text-stone-500">
                                        Selection
                                        {currentVariant && (
                                            <span className="ml-2 font-mono text-stone-900 normal-case tracking-normal">
                                                — {currentVariant.type} ({currentVariant.sku})
                                            </span>
                                        )}
                                    </label>
                                    <button className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 hover:text-stone-900 underline underline-offset-4 transition-colors flex items-center gap-1.5">
                                        <Info className="w-3.5 h-3.5" /> Guide
                                    </button>
                                </div>
                                <div className="flex gap-2.5 flex-wrap">
                                    {product.subProducts.map((vObj: any) => {
                                        const isSelected = selectedSize === vObj.type;
                                        const isOOS = vObj.qty <= 0;
                                        const isLow = vObj.qty > 0 && vObj.qty <= 5;
                                        return (
                                            <button
                                                key={vObj.sku}
                                                disabled={isOOS}
                                                onClick={() => setSelectedSize(vObj.type)}
                                                className={`relative px-4 py-3 text-[10px] font-bold uppercase tracking-[0.2em] border transition-all duration-300 min-w-[70px] text-center ${isOOS
                                                    ? "opacity-40 cursor-not-allowed border-stone-200 text-stone-300 line-through"
                                                    : isSelected
                                                        ? "bg-stone-900 text-white border-stone-900 shadow-md ring-2 ring-stone-900/20"
                                                        : "bg-white text-stone-500 border-stone-200 hover:border-stone-900 hover:text-stone-900 hover:shadow-sm"
                                                    }`}
                                            >
                                                <span className="block">{vObj.type}</span>
                                                <span className={`block text-[8px] mt-0.5 font-mono tracking-wider ${isSelected ? "text-stone-300" : "text-stone-400"}`}>
                                                    ₹{vObj.price.toLocaleString()}
                                                </span>
                                                {/* Low stock badge */}
                                                {isLow && !isOOS && (
                                                    <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-white text-[7px] font-bold px-1 py-0.5 leading-none rounded-sm">
                                                        {vObj.qty}
                                                    </span>
                                                )}
                                                {/* Visual indicator that this variant has dedicated media */}
                                                {vObj.images?.length > 0 && (
                                                    <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isSelected ? "bg-amber-400" : "bg-stone-300"}`} />
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Variant Sub-Options (Sizes) */}
                        {currentVariant?.size?.length > 0 && (
                            <div className="space-y-4 pt-4 border-t border-stone-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900">Choose Option</h3>
                                    <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">{selectedSubSize}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {currentVariant.size.map((sz: string) => (
                                        <button
                                            key={sz}
                                            onClick={() => setSelectedSubSize(sz)}
                                            className={`h-9 px-4 text-[9px] font-bold uppercase tracking-wider border transition-all ${selectedSubSize === sz
                                                ? "bg-stone-100 border-stone-900 text-stone-900"
                                                : "bg-white border-stone-200 text-stone-400 hover:border-stone-400"
                                                }`}
                                        >
                                            {sz}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="space-y-4 pt-4 border-t border-stone-200">
                            <div className="flex gap-4">
                                {/* Quantity */}
                                <div className="flex items-center border border-stone-200 bg-white shadow-sm shrink-0">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-12 h-12 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-10 text-center text-xs font-bold text-stone-900">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => Math.min(q + 1, currentVariant?.qty ?? 99))}
                                        className="w-12 h-12 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:bg-stone-50 transition-colors"
                                        disabled={currentVariant?.qty <= 0}
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Add to cart */}
                                <button
                                    onClick={() => {
                                        const newItem = {
                                            id: `${product.id}-${currentVariant?.type || 'default'}-${selectedSubSize || 'default'}`,
                                            productId: product.id,
                                            variantType: currentVariant?.type,
                                            subSize: selectedSubSize,
                                            name: name,
                                            price: price,
                                            quantity: quantity,
                                            image: primaryImg,
                                            category: categoryName
                                        };
                                        cartLocalStorageData.addToCart(newItem);
                                        toast({ title: "Added to Cart", description: `${name} · ${selectedSize}${selectedSubSize ? ` (${selectedSubSize})` : ''} added to your collection.` });
                                    }}
                                    disabled={currentVariant?.qty <= 0}
                                    className="flex-1 h-12 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 disabled:cursor-not-allowed text-white text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    {currentVariant?.qty <= 0 ? "Out of Stock" : "Add to Cart"}
                                </button>
                            </div>

                            {/* Buy now */}
                            <Link
                                href="/checkout"
                                className="block w-full h-12 bg-amber-100 hover:bg-white text-stone-900 border border-amber-200 hover:border-stone-900 text-[10px] uppercase tracking-[0.25em] font-bold flex items-center justify-center transition-all duration-300 shadow-sm"
                            >
                                Secure Checkout
                            </Link>
                        </div>

                        {/* Delivery */}
                        <div className="bg-stone-100 border border-stone-200 px-5 py-4 flex items-start gap-4">
                            <Package className="w-5 h-5 text-stone-700 shrink-0" />
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-stone-900 mb-1">Estimated Delivery: 5–7 Business Days</p>
                                <p className="text-[11px] font-light text-stone-500">Fully insured courier shipping with real-time tracking.</p>
                            </div>
                        </div>

                        {/* Trust row */}
                        <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-stone-200">
                            {[
                                { icon: Shield, label: "Secure Protocol" },
                                { icon: Truck, label: "Global Delivery" },
                                { icon: RotateCcw, label: "Assurance" },
                            ].map(({ icon: Icon, label }) => (
                                <div key={label} className="flex flex-col items-center gap-2 text-center p-3 sm:p-4 bg-white border border-stone-200 shadow-sm">
                                    <Icon className="w-5 h-5 text-stone-400 mb-1" />
                                    <span className="text-[8px] uppercase tracking-[0.1em] md:tracking-[0.2em] font-bold text-stone-600 leading-tight break-words">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ── Tabs ── */}
                <div className="bg-white border border-stone-200 mb-16 shadow-sm">
                    <div className="flex border-b border-stone-200 overflow-x-auto scrollbar-none">
                        {(["details", "specs", "care"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 sm:flex-none whitespace-nowrap px-6 md:px-8 py-5 text-[10px] uppercase tracking-[0.15em] md:tracking-[0.25em] font-bold border-b-[3px] transition-colors ${activeTab === tab
                                    ? "border-stone-900 text-stone-900 bg-stone-50/50"
                                    : "border-transparent text-stone-400 hover:text-stone-700 hover:bg-stone-50"
                                    }`}
                            >
                                {tab === "details" ? "Details" : tab === "specs" ? "Specifications" : "Care & Upkeep"}
                            </button>
                        ))}
                    </div>

                    <div className="p-5 sm:p-8 md:p-12">
                        {activeTab === "details" && (
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-6">Artisanal Narrative</h3>
                                    <p className="text-[13px] text-stone-500 leading-loose font-light mb-8">{description}</p>
                                    {details.length > 0 && (
                                        <ul className="space-y-4">
                                            {details.map((d: string) => (
                                                <li key={d} className="flex items-start gap-4">
                                                    <div className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center shrink-0 mt-0.5 border border-stone-200">
                                                        <CheckCircle2 className="w-3 h-3 text-amber-600" />
                                                    </div>
                                                    <span className="text-[13px] text-stone-700 font-medium">{d}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="bg-stone-900 p-6 sm:p-10 text-white flex flex-col justify-center border border-stone-800 shadow-xl shadow-stone-200/50 mt-6 md:mt-0">
                                    <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-amber-500 mb-4">Heritage Lineage</p>
                                    <h3 className="text-3xl font-serif leading-tight mb-8">{product.brand ?? "Gemini"}<br /><span className="text-stone-400 italic font-light">Heritage</span></h3>
                                    <div className="space-y-5 text-xs text-stone-300 font-mono tracking-widest uppercase">
                                        <div className="flex justify-between border-b border-stone-700/50 pb-3">
                                            <span className="text-stone-500">Classification</span>
                                            <span>{parentCategory ? `${parentCategory.name} · ${categoryName}` : categoryName}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-stone-700/50 pb-3">
                                            <span className="text-stone-500">SKU</span>
                                            <span>{sku}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-stone-500">Status</span>
                                            <span>{product.disableProduct ? "Unavailable" : "Available"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "specs" && (
                            <div className="max-w-2xl mx-auto">
                                <div className="divide-y divide-stone-100 border border-stone-100">
                                    {product.subProducts?.map((s: any) => (
                                        <div key={s.sku} className="flex flex-col sm:flex-row sm:justify-between py-4 px-6 hover:bg-stone-50 transition-colors">
                                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] mb-1 sm:mb-0">{s.type} ({s.sku})</span>
                                            <span className="text-[11px] font-bold text-stone-900 uppercase tracking-widest">₹{s.price.toLocaleString()} · Qty {s.qty}</span>
                                        </div>
                                    ))}
                                    {product.ingredients?.length > 0 && (
                                        <div className="py-4 px-6 hover:bg-stone-50 transition-colors">
                                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] block mb-2">Ingredients</span>
                                            <span className="text-[11px] font-bold text-stone-900">{product.ingredients.join(", ")}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "care" && (
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    { title: "Storage", tip: "Store in a cool, dry place away from direct sunlight to prevent degradation." },
                                    { title: "Cleaning", tip: "Wipe gently with a soft, dry lint-free cloth after each use." },
                                    { title: "Chemicals", tip: "Avoid exposing to perfumes, lotions, and harsh household chemicals." },
                                    { title: "Servicing", tip: "Schedule an annual professional cleaning and inspection protocol." },
                                ].map(({ title, tip }) => (
                                    <div key={title} className="flex gap-4 sm:gap-5 p-5 md:p-6 bg-stone-50 border border-stone-200 shadow-sm">
                                        <div className="w-1.5 h-full min-h-12 bg-amber-400 shrink-0" />
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-900 mb-2">{title}</p>
                                            <p className="text-[13px] text-stone-500 leading-relaxed font-light">{tip}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {product?.generalImages?.length > 0 && (
                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-6">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.5em] text-amber-500 font-bold mb-3">Portfolio</p>
                                <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Visual Narrative</h2>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-1">Archive {sku}</p>
                                <div className="h-0.5 w-16 bg-stone-900 ml-auto" />
                            </div>
                        </div>

                        <div className="columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                            {product.generalImages.map((img: string, i: number) => (
                                <div
                                    key={i}
                                    className={`relative break-inside-avoid bg-white border border-stone-200 group cursor-zoom-in overflow-hidden shadow-sm transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 ${i % 3 === 0 ? "mt-5 lg:mt-5" : i % 2 === 0 ? "mt-5 lg:mt-5" : ""
                                        }`}
                                    onClick={() => {
                                        const idx = displayImages.indexOf(img);
                                        if (idx !== -1) {
                                            setSelectedImage(idx);
                                            setLightbox(true);
                                        }
                                    }}
                                >
                                    <div className="relative aspect-auto">
                                        <Image
                                            src={img}
                                            alt={`${name} perspective ${i + 1}`}
                                            width={600}
                                            height={800}
                                            className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                    </div>

                                    {/* Minimalist Narrative Label */}
                                    <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-all duration-500 flex flex-col justify-end p-6">
                                        <div className="overflow-hidden">
                                            <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-between">
                                                <span className="text-[8px] text-white uppercase tracking-[0.4em] font-bold">Plate {i + 1}</span>
                                                <ZoomIn className="w-3 h-3 text-white/70" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Professional subtle border glow */}
                                    <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Reviews ── */}
                <div className="mb-20">
                    <div className="flex items-baseline justify-between mb-8 border-b border-stone-200 pb-4">
                        <h2 className="text-2xl font-serif text-stone-900">Patron Impressions</h2>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400 font-bold">145 Total Impressions</span>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-10">
                        {/* Summary */}
                        <div className="lg:col-span-4 bg-white border border-stone-200 p-6 shadow-sm h-fit">
                            <div className="text-center mb-6 pb-6 border-b border-stone-100">
                                <p className="text-5xl font-serif text-stone-900 mb-3">4.9</p>
                                <div className="flex justify-center mb-2">
                                    <Stars rating={4.9} />
                                </div>
                                <p className="text-[8px] uppercase tracking-[0.2em] font-bold text-stone-400">Calculated from 145 verified entries</p>
                            </div>
                            <div className="space-y-2.5">
                                {ratingBreakdown.map(({ label, count, pct }) => (
                                    <div key={label} className="flex items-center gap-3">
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-stone-500 w-6 shrink-0 uppercase tracking-widest">{label} <Star className="w-2.5 h-2.5 -mt-0.5" /></span>
                                        <div className="flex-1 h-1.5 bg-stone-100 overflow-hidden">
                                            <div className="h-full bg-amber-400 transition-all duration-1000" style={{ width: `${pct}%` }} />
                                        </div>
                                        <span className="text-[10px] text-stone-400 w-8 text-right font-mono tracking-widest">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Review list + form */}
                        <div className="lg:col-span-8 space-y-6">
                            {staticReviews.map((r) => (
                                <div key={r.id} className="bg-white border border-stone-200 p-8 shadow-sm">
                                    <div className="flex items-start gap-5">
                                        <div className="w-10 h-10 bg-stone-900 text-white flex items-center justify-center text-[10px] font-bold tracking-widest shrink-0 uppercase">
                                            {r.avatar}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                <p className="text-xs font-bold uppercase tracking-[0.1em] text-stone-900">{r.user}</p>
                                                <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">{r.date}</span>
                                            </div>
                                            <Stars rating={r.rating} size="xs" />
                                            <p className="text-[13px] text-stone-500 leading-relaxed mt-4 font-light italic">&quot;{r.content}&quot;</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Write review */}
                            <div className="bg-white border border-stone-200 p-8 shadow-sm mt-10">
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900 mb-6">Contribute your impression</p>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400 block mb-3">Your Assessment *</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((n) => (
                                                <button
                                                    key={n}
                                                    onMouseEnter={() => setHoverRating(n)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    onClick={() => setReviewRating(n)}
                                                    className="p-1 hover:scale-110 transition-transform"
                                                >
                                                    <Star className={`w-5 h-5 transition-colors ${n <= (hoverRating || reviewRating) ? "fill-amber-400 text-amber-400" : "text-stone-200 fill-stone-200"}`} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400 block mb-2">Identity *</label>
                                            <input type="text" placeholder="Your name" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-xs focus:border-stone-900 focus:bg-white focus:outline-none transition-colors shadow-sm" />
                                        </div>
                                        <div>
                                            <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400 block mb-2">Correspondence *</label>
                                            <input type="email" placeholder="email@address.com" className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-xs focus:border-stone-900 focus:bg-white focus:outline-none transition-colors shadow-sm" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400 block mb-2">Manuscript *</label>
                                        <textarea rows={4} placeholder="Detail your experience with the craftsmanship..." className="w-full bg-stone-50 border border-stone-200 px-4 py-3 text-xs focus:border-stone-900 focus:bg-white focus:outline-none transition-colors resize-none shadow-sm" />
                                    </div>

                                    <button className="bg-stone-900 hover:bg-stone-800 text-white text-[10px] uppercase tracking-[0.25em] font-bold px-10 py-4 transition-all duration-300 shadow-sm hover:shadow-md">
                                        Submit Assessment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Related ── */}
                <div className="border-t border-stone-200 pt-16">
                    <div className="flex items-baseline justify-between mb-8">
                        <h2 className="text-2xl font-serif text-stone-900">Curated Alternatives</h2>
                        <Link href="/products" className="text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-1.5">
                            Explore Archive <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    {relatedProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map((p) => {
                                const pPrice = p.subProducts?.[0]?.price ?? 0;
                                const pOrigPrice = p.discount > 0 ? Math.round(pPrice / (1 - p.discount / 100)) : null;
                                const pCategoryName = typeof p.category === "object" ? p.category.name : p.category;

                                return (
                                    <Link key={p.id} href={`/products/${p.slug}`} className="group space-y-4 block">
                                        <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 border border-stone-200/60 shadow-sm transition-all duration-500 hover:shadow-xl">
                                            <Image
                                                src={p.generalImages?.[0] || "https://placehold.co/800x1000"}
                                                alt={p.title}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                            />
                                            {p.discount > 0 && (
                                                <div className="absolute top-3 left-3 z-10">
                                                    <span className="bg-emerald-900/90 backdrop-blur-sm text-white text-[8px] uppercase tracking-[0.2em] font-bold px-2 py-1 shadow-sm">
                                                        -{p.discount}%
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors duration-500" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-stone-400">
                                                {pCategoryName}
                                            </p>
                                            <h3 className="text-sm font-serif text-stone-900 leading-snug group-hover:text-amber-700 transition-colors duration-300">
                                                {p.title}
                                            </h3>
                                            <div className="flex items-baseline gap-2.5">
                                                <span className="text-xs font-bold text-stone-900">₹{pPrice.toLocaleString()}</span>
                                                {pOrigPrice && (
                                                    <span className="text-[10px] text-stone-400 line-through font-medium">₹{pOrigPrice.toLocaleString()}</span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="space-y-4 animate-pulse">
                                    <div className="aspect-[4/5] bg-stone-200 border border-stone-100" />
                                    <div className="space-y-2">
                                        <div className="h-2 w-16 bg-stone-200" />
                                        <div className="h-3 w-full bg-stone-300" />
                                        <div className="h-2 w-12 bg-stone-200" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Lightbox ── */}
            {lightbox && images.length > 0 && (
                <div className="fixed inset-0 bg-stone-900/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <button onClick={() => setLightbox(false)} className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white flex items-center justify-center transition-colors group">
                        <X className="w-5 h-5 text-white group-hover:text-stone-900 transition-colors" />
                    </button>
                    {images.length > 1 && (
                        <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white flex items-center justify-center transition-colors group">
                            <ChevronLeft className="w-6 h-6 text-white group-hover:text-stone-900 transition-colors" />
                        </button>
                    )}
                    <div className="relative w-full max-w-4xl aspect-[4/5] shadow-2xl">
                        <Image src={images[selectedImage]} alt={name} fill className="object-contain" priority />
                    </div>
                    {images.length > 1 && (
                        <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white flex items-center justify-center transition-colors group">
                            <ChevronRight className="w-6 h-6 text-white group-hover:text-stone-900 transition-colors" />
                        </button>
                    )}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white text-[10px] uppercase font-bold tracking-[0.3em] bg-stone-900/50 px-4 py-2">
                        Frame 0{selectedImage + 1} / 0{images.length}
                    </div>
                </div>
            )}

            {/* ── Sticky Mobile Bar ── */}
            {showSticky && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] p-4 z-40 lg:hidden">
                    <div className="flex items-center gap-4 max-w-6xl mx-auto">
                        <div className="flex-1">
                            <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-0.5">Valuation</p>
                            <p className="text-xl font-serif text-stone-900 leading-none">₹{price.toLocaleString()}</p>
                        </div>
                        <button
                            onClick={() => {
                                const newItem = {
                                    id: `${product.id}-${currentVariant?.type || 'default'}-${selectedSubSize || 'default'}`,
                                    productId: product.id,
                                    variantType: currentVariant?.type,
                                    subSize: selectedSubSize,
                                    name: name,
                                    price: price,
                                    quantity: quantity,
                                    image: primaryImg,
                                    category: categoryName
                                };
                                cartLocalStorageData.addToCart(newItem);
                                toast({ title: "Added to Cart", description: `${name} added.` });
                            }}
                            className="flex-1 h-12 bg-stone-900 hover:bg-stone-800 text-white text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                        >
                            <ShoppingCart className="w-3.5 h-3.5" /> Acquire
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
