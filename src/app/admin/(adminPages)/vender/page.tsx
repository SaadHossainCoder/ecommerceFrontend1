"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Plus,
    Search,
    MoreHorizontal,
    Edit2,
    Trash2,
    Store,
    Package,
    RefreshCw,
    ExternalLink,
    ImageIcon,
    Loader2,
    AlertCircle,
    Calendar,
    Hash,
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
import { Vendor } from "@/services/vendor.service";
import { useVendorStore } from "@/store/vendor-store";
import { vendorSchema, VendorFormData } from "@/validations/vendor.validation";
import { VendorForm, ImageGallery } from "./_components/VendorForm";

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function VendorPage() {
    const { vendors, isLoading, error, fetchVendors, addVendor, editVendor, removeVendor } = useVendorStore();

    const [searchTerm, setSearchTerm] = useState("");
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

    // Manual slug control state
    const [isSlugSynced, setIsSlugSynced] = useState(true);

    const defaultVendorFormValues: VendorFormData = {
        name: "",
        slug: "",
        description: "",
        longDescription: "",
        vendorProductType: "",
        imageUrls: [{ url: "" }],
        descImageUrls: [{ url: "" }],
    };

    // ─── Form Setup ───
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        control,
        formState: { errors },
    } = useForm<VendorFormData>({
        resolver: zodResolver(vendorSchema),
        defaultValues: defaultVendorFormValues,
    });

    // Auto-generate slug logic
    const watchedName = watch("name");
    useEffect(() => {
        if (watchedName && isSlugSynced && !isEditOpen) {
            const slug = watchedName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
            setValue("slug", slug, { shouldValidate: true });
        }
    }, [watchedName, isSlugSynced, setValue, isEditOpen]);

    const handleSyncSlug = () => {
        if (watchedName) {
            const slug = watchedName.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
            setValue("slug", slug, { shouldValidate: true });
            setIsSlugSynced(true);
            toast({ title: "Slug Synced", description: "Slug has been updated to match the vendor name." });
        }
    };

    // Watching for previews
    const watchedImageUrls = watch("imageUrls");
    const watchedDescImageUrls = watch("descImageUrls");

    // Initial load
    useEffect(() => {
        fetchVendors();
    }, [fetchVendors]);

    // Filtering
    const filtered = vendors.filter(
        (v) =>
            v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.vendorProductType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            v.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // ─── Operations ───
    const onSubmit = async (data: VendorFormData) => {
        let success = false;
        if (isEditOpen && selectedVendor) {
            success = await editVendor(selectedVendor.id, data);
        } else {
            success = await addVendor(data);
        }

        if (success) {
            toast({
                title: isEditOpen ? "Vendor Updated" : "Vendor Created",
                description: `${data.name} has been processed successfully.`,
                variant: "success",
            });
            setIsAddOpen(false);
            setIsEditOpen(false);
            reset(defaultVendorFormValues);
            setIsSlugSynced(true);
        } else {
            toast({
                title: "Error",
                description: error || "Something went wrong.",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async () => {
        if (!selectedVendor) return;
        const success = await removeVendor(selectedVendor.id);
        if (success) {
            toast({ title: "Vendor Deleted", variant: "destructive" });
            setIsDeleteOpen(false);
        }
    };

    const openEdit = (vendor: Vendor) => {
        setSelectedVendor(vendor);
        setIsSlugSynced(false); // When editing, don't auto-sync by default
        reset({
            name: vendor.name,
            slug: vendor.slug,
            description: vendor.description,
            longDescription: vendor.longDescription,
            vendorProductType: vendor.vendorProductType,
            // Map string[] to {url:string}[]
            imageUrls: vendor.images.length ? vendor.images.map(url => ({ url })) : [{ url: "" }],
            descImageUrls: vendor.descriptionImages.length ? vendor.descriptionImages.map(url => ({ url })) : [{ url: "" }],
        });
        setIsEditOpen(true);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Vendors</h1>
                    <p className="text-muted-foreground mt-1">Manage all vendor partners and their product categories</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => fetchVendors(true)} disabled={isLoading} title="Refresh">
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                    <Button variant="gradient" onClick={() => { reset(defaultVendorFormValues); setIsSlugSynced(true); setIsAddOpen(true); }}>
                        <Plus className="h-4 w-4 mr-2" /> Add Vendor
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl"><Store className="w-6 h-6 text-primary" /></div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Total Vendors</p>
                            <h3 className="text-2xl font-bold">{vendors.length}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl"><Package className="w-6 h-6 text-blue-600 dark:text-blue-400" /></div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Product Types</p>
                            <h3 className="text-2xl font-bold">{new Set(vendors.map((v) => v.vendorProductType)).size}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl"><ImageIcon className="w-6 h-6 text-green-600 dark:text-green-400" /></div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">With Images</p>
                            <h3 className="text-2xl font-bold">{vendors.filter((v) => v.images?.length > 0).length}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search */}
            <Card className="p-4">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search by name, type or slug..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            </Card>

            {/* Content handling */}
            {isLoading && vendors.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm">Loading vendors...</p>
                </div>
            ) : error && vendors.length === 0 ? (
                <Card className="p-8 border-destructive/40 bg-destructive/5">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <AlertCircle className="w-8 h-8 text-destructive" />
                        <p className="font-semibold text-destructive">{error}</p>
                        <Button variant="outline" size="sm" onClick={() => fetchVendors(true)}><RefreshCw className="h-4 w-4 mr-2" /> Retry</Button>
                    </div>
                </Card>
            ) : filtered.length === 0 ? (
                <Card className="p-12">
                    <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
                        <Store className="w-12 h-12 opacity-30" />
                        <p className="font-semibold text-lg">{searchTerm ? "No vendors match your search" : "No vendors yet"}</p>
                        {!searchTerm && (
                            <Button variant="gradient" onClick={() => { reset(defaultVendorFormValues); setIsSlugSynced(true); setIsAddOpen(true); }}>
                                <Plus className="h-4 w-4 mr-2" /> Add Your First Vendor
                            </Button>
                        )}
                    </div>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {filtered.map((vendor) => (
                        <Card key={vendor.id} className="p-5 border-l-4 border-l-primary hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                    <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center shrink-0 overflow-hidden border">
                                        {vendor.images?.[0] ? (
                                            <img src={vendor.images[0]} alt={vendor.name} className="h-full w-full object-cover" />
                                        ) : (
                                            <Store className="w-6 h-6 text-muted-foreground" />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="text-base font-bold leading-tight">{vendor.name}</h3>
                                            <Badge variant="secondary" className="text-xs shrink-0">{vendor.vendorProductType}</Badge>
                                        </div>
                                        <p className="text-xs font-mono text-muted-foreground mt-0.5">/{vendor.slug}</p>
                                        <p className="text-sm text-muted-foreground mt-1.5 line-clamp-1">{vendor.description}</p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => { setSelectedVendor(vendor); setIsViewOpen(true); }}>
                                            <ExternalLink className="h-3.5 w-3.5 mr-2" /> View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => openEdit(vendor)}>
                                            <Edit2 className="h-3.5 w-3.5 mr-2" /> Edit Vendor
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive" onClick={() => { setSelectedVendor(vendor); setIsDeleteOpen(true); }}>
                                            <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete Vendor
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Dialogs */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Add New Vendor</DialogTitle>
                        <DialogDescription>Fill in all required fields to register a new vendor.</DialogDescription>
                    </DialogHeader>
                    <VendorForm
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        errors={errors}
                        control={control}
                        isSlugSynced={isSlugSynced}
                        setIsSlugSynced={setIsSlugSynced}
                        handleSyncSlug={handleSyncSlug}
                        watchedImageUrls={watchedImageUrls}
                        watchedDescImageUrls={watchedDescImageUrls}
                    />
                    <DialogFooter className="pt-2">
                        <Button variant="outline" onClick={() => setIsAddOpen(false)} disabled={isLoading}>Cancel</Button>
                        <Button type="submit" form="vendor-form" variant="gradient" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null} Create Vendor
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Vendor</DialogTitle>
                        <DialogDescription>Update details for {selectedVendor?.name}</DialogDescription>
                    </DialogHeader>
                    <VendorForm
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        errors={errors}
                        control={control}
                        isSlugSynced={isSlugSynced}
                        setIsSlugSynced={setIsSlugSynced}
                        handleSyncSlug={handleSyncSlug}
                        watchedImageUrls={watchedImageUrls}
                        watchedDescImageUrls={watchedDescImageUrls}
                    />
                    <DialogFooter className="pt-2">
                        <Button variant="outline" onClick={() => setIsEditOpen(false)} disabled={isLoading}>Cancel</Button>
                        <Button type="submit" form="vendor-form" variant="gradient" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null} Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[420px]">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Delete Vendor</DialogTitle>
                        <DialogDescription>Are you sure you want to delete <strong>{selectedVendor?.name}</strong>?</DialogDescription>
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
                <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto">
                    {selectedVendor && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-3">
                                    <span className="text-xl font-bold">{selectedVendor.name}</span>
                                    <Badge variant="secondary">{selectedVendor.vendorProductType}</Badge>
                                </DialogTitle>
                                <p className="text-xs font-mono text-muted-foreground mt-1">Slug: /{selectedVendor.slug}</p>
                            </DialogHeader>
                            <div className="space-y-5 mt-4">
                                <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
                                    <span className="flex items-center gap-1"><Hash className="h-3 w-3" /> {selectedVendor.id}</span>
                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(selectedVendor.createdAt).toLocaleDateString()}</span>
                                </div>

                                <div>
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1.5">Description</h4>
                                    <p className="text-sm leading-relaxed">{selectedVendor.description}</p>
                                </div>

                                {selectedVendor.longDescription && (
                                    <div>
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-1.5">Full Profile</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{selectedVendor.longDescription}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                                    <div>
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Main Images</h4>
                                        <ImageGallery urls={selectedVendor.images || []} label="vendor image" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Description Images</h4>
                                        <ImageGallery urls={selectedVendor.descriptionImages || []} label="description image" />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter className="mt-6 gap-2 border-t pt-4">
                                <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
                                <Button variant="gradient" onClick={() => { setIsViewOpen(false); openEdit(selectedVendor); }}>
                                    <Edit2 className="h-4 w-4 mr-2" /> Edit Details
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}