"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Plus,
    Search,
    MoreHorizontal,
    Edit2,
    Trash2,
    RefreshCw,
    ExternalLink,
    ImageIcon,
    Loader2,
    AlertCircle,
    Link as LinkIcon,
    Hash,
    Calendar,
    LayoutTemplate,
    Megaphone,
    Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toaster";
import { Banner } from "@/services/banner.service";
import { useBannerStore } from "@/store/banner-store";
import { bannerSchema, BannerFormData } from "@/validations/banner.validation";
import { BannerForm } from "./_components/BannerForm";

type BannerType = "HOME" | "CATEGORY" | "PRODUCT";

// ─── Constants ─────────────────────────────────────────────────────────────────
const BANNER_TYPES: BannerType[] = ["HOME", "CATEGORY", "PRODUCT"];

const TYPE_STYLES: Record<BannerType, { label: string; color: string }> = {
    HOME: { label: "Home", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" },
    CATEGORY: { label: "Category", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
    PRODUCT: { label: "Product", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function MakeBannerPage() {
    const { banners, isLoading, error, fetchBanners, addBanner, editBanner, removeBanner } = useBannerStore();
    
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState<BannerType | "ALL">("ALL");

    // Modal state
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);

    // ─── Form Setup ───
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<BannerFormData>({
        resolver: zodResolver(bannerSchema),
        defaultValues: {
            title: "",
            slug: "",
            description: "",
            image: "",
            link: "",
            type: "HOME",
        },
    });

    const watchedTitle = watch("title");
    const watchedImage = watch("image");
    const watchedType = watch("type");

    // Auto-generate slug from title
    useEffect(() => {
        if (!isEditOpen) {
            const slug = watchedTitle
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "");
            setValue("slug", slug, { shouldValidate: true });
        }
    }, [watchedTitle, setValue, isEditOpen]);

    // Initial load
    useEffect(() => {
        fetchBanners();
    }, [fetchBanners]);

    // Filtering
    const filtered = banners.filter((b) => {
        const matchSearch =
            b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchType = typeFilter === "ALL" || b.type === typeFilter;
        return matchSearch && matchType;
    });

    // ─── Operations ───
    const onSubmit = async (data: BannerFormData) => {
        let success = false;
        if (isEditOpen && selectedBanner) {
            success = await editBanner(selectedBanner.id, data);
        } else {
            success = await addBanner(data);
        }

        if (success) {
            toast({
                title: isEditOpen ? "Banner Updated" : "Banner Created",
                description: `"${data.title}" has been processed successfully.`,
                variant: "success",
            });
            setIsAddOpen(false);
            setIsEditOpen(false);
            reset();
        } else {
            toast({
                title: "Error",
                description: error || "Something went wrong.",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async () => {
        if (!selectedBanner) return;
        const success = await removeBanner(selectedBanner.id);
        if (success) {
            toast({ title: "Banner Deleted", variant: "destructive" });
            setIsDeleteOpen(false);
        }
    };

    const openEdit = (banner: Banner) => {
        setSelectedBanner(banner);
        reset({
            title: banner.title,
            slug: banner.slug,
            description: banner.description,
            image: banner.image,
            link: banner.link,
            type: banner.type,
        });
        setIsViewOpen(false);
        setIsEditOpen(true);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Banners</h1>
                    <p className="text-muted-foreground mt-1">Create and manage promotional banners across your store</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => fetchBanners(true)} disabled={isLoading} title="Refresh">
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                    <Button variant="gradient" onClick={() => { reset(); setIsAddOpen(true); }}>
                        <Plus className="h-4 w-4 mr-2" /> New Banner
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card className="p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-primary/10 rounded-xl"><Megaphone className="w-5 h-5 text-primary" /></div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Total</p>
                            <h3 className="text-2xl font-bold">{banners.length}</h3>
                        </div>
                    </div>
                </Card>
                {BANNER_TYPES.map((t) => {
                    const count = banners.filter((b) => b.type === t).length;
                    const s = TYPE_STYLES[t];
                    return (
                        <Card key={t} className="p-5">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-muted rounded-xl">
                                    <LayoutTemplate className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
                                    <h3 className="text-2xl font-bold">{count}</h3>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Search + Filter */}
            <Card className="p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search banners..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {(["ALL", ...BANNER_TYPES] as const).map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setTypeFilter(t)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                                    typeFilter === t
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-border hover:border-primary/50 text-muted-foreground"
                                }`}
                            >
                                {t === "ALL" ? "All Types" : TYPE_STYLES[t].label}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Content */}
            {isLoading && banners.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm">Loading banners...</p>
                </div>
            ) : error && banners.length === 0 ? (
                <Card className="p-8 border-destructive/40 bg-destructive/5">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <AlertCircle className="w-8 h-8 text-destructive" />
                        <p className="font-semibold text-destructive">{error}</p>
                        <Button variant="outline" size="sm" onClick={() => fetchBanners(true)}><RefreshCw className="h-4 w-4 mr-2" /> Retry</Button>
                    </div>
                </Card>
            ) : filtered.length === 0 ? (
                <Card className="p-12">
                    <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
                        <Megaphone className="w-12 h-12 opacity-30" />
                        <p className="font-semibold text-lg">{searchTerm || typeFilter !== "ALL" ? "No banners match your filters" : "No banners yet"}</p>
                        {!searchTerm && typeFilter === "ALL" && (
                            <Button variant="gradient" onClick={() => { reset(); setIsAddOpen(true); }}>
                                <Plus className="h-4 w-4 mr-2" /> Create Your First Banner
                            </Button>
                        )}
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map((banner) => {
                        const typeStyle = TYPE_STYLES[banner.type];
                        return (
                            <Card key={banner.id} className="overflow-hidden hover:shadow-md transition-shadow border-0 shadow-sm ring-1 ring-border">
                                <div className="relative h-36 bg-muted overflow-hidden">
                                    {banner.image ? (
                                        <img src={banner.image} alt={banner.title} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center">
                                            <ImageIcon className="w-10 h-10 text-muted-foreground opacity-30" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    <span className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeStyle.color}`}>
                                        {typeStyle.label}
                                    </span>
                                    <div className="absolute top-2 right-2">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/30 hover:bg-black/50 text-white border-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => { setSelectedBanner(banner); setIsViewOpen(true); }}>
                                                    <Eye className="h-3.5 w-3.5 mr-2" /> View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => openEdit(banner)}>
                                                    <Edit2 className="h-3.5 w-3.5 mr-2" /> Edit Banner
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => { setSelectedBanner(banner); setIsDeleteOpen(true); }}>
                                                    <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete Banner
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <h3 className="font-bold text-base leading-tight line-clamp-1">{banner.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{banner.description}</p>
                                    <div className="flex items-center justify-between mt-3 pt-3 border-t">
                                        <a href={banner.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline truncate max-w-[65%]">
                                            <LinkIcon className="h-3 w-3 shrink-0" />
                                            <span className="truncate">{banner.link}</span>
                                        </a>
                                        <span className="text-xs text-muted-foreground">
                                            {banner.createdAt ? new Date(banner.createdAt).toLocaleDateString() : ""}
                                        </span>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Dialogs */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Create New Banner</DialogTitle>
                        <DialogDescription>Design a promotional banner to display across your store.</DialogDescription>
                    </DialogHeader>
                    <BannerForm 
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        errors={errors}
                        watchedImage={watchedImage}
                        watchedType={watchedType}
                        setValue={setValue}
                    />
                    <DialogFooter className="pt-2">
                        <Button variant="outline" onClick={() => setIsAddOpen(false)} disabled={isLoading}>Cancel</Button>
                        <Button type="submit" form="banner-form" variant="gradient" disabled={isLoading}>
                             {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null} Publish Banner
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[520px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Banner</DialogTitle>
                        <DialogDescription>Update details for {selectedBanner?.title}</DialogDescription>
                    </DialogHeader>
                    <BannerForm 
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        errors={errors}
                        watchedImage={watchedImage}
                        watchedType={watchedType}
                        setValue={setValue}
                    />
                    <DialogFooter className="pt-2">
                        <Button variant="outline" onClick={() => setIsEditOpen(false)} disabled={isLoading}>Cancel</Button>
                        <Button type="submit" form="banner-form" variant="gradient" disabled={isLoading}>
                             {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null} Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[420px]">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Delete Banner</DialogTitle>
                        <DialogDescription>Are you sure you want to delete <strong>{selectedBanner?.title}</strong>?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)} disabled={isLoading}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="sm:max-w-[580px] p-0 overflow-hidden">
                    {selectedBanner && (
                        <>
                            <div className="relative h-48 bg-muted">
                                {selectedBanner.image && <img src={selectedBanner.image} alt={selectedBanner.title} className="h-full w-full object-cover" />}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-5">
                                    <Badge className={TYPE_STYLES[selectedBanner.type].color}>{selectedBanner.type}</Badge>
                                    <h2 className="text-white text-xl font-bold mt-2">{selectedBanner.title}</h2>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1"><Hash className="h-3 w-3" /> {selectedBanner.id}</span>
                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(selectedBanner.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm leading-relaxed">{selectedBanner.description}</p>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-muted-foreground uppercase">Links</p>
                                    <a href={selectedBanner.image} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-primary hover:underline bg-muted/50 p-2 rounded">
                                        <ImageIcon className="h-3.5 w-3.5" /> Image URL
                                    </a>
                                    <a href={selectedBanner.link} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs text-primary hover:underline bg-muted/50 p-2 rounded">
                                        <LinkIcon className="h-3.5 w-3.5" /> Redirect Link
                                    </a>
                                </div>
                            </div>
                            <DialogFooter className="p-6 pt-0">
                                <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
                                <Button variant="gradient" onClick={() => openEdit(selectedBanner)}>Edit Banner</Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}