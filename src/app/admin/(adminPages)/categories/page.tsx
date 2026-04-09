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
    ChevronRight,
    ChevronDown,
    Tag,
    Image as ImageIcon,
    LayoutGrid,
    RefreshCw,
    Loader2,
    AlertCircle,
    Hash,
    Calendar,
    ExternalLink,
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
import { useCategoryStore } from "@/store/category-store";
import { Category } from "@/services/category.service";
import { categorySchema, CategoryFormData } from "@/validations/category.validation";
import { CategoryForm } from "./_components/CategoryForm";

export default function CategoriesPage() {
    const {
        categoryTree,
        stats,
        isLoading,
        error,
        fetchTree,
        fetchStats,
        addMainCategory,
        addSubCategory,
        editCategory,
        removeCategory
    } = useCategoryStore();

    const [expandedIds, setExpandedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal States
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const [selectedItem, setSelectedItem] = useState<Category | null>(null);
    const [formType, setFormType] = useState<"main" | "sub">("main");
    const [parentCategoryId, setParentCategoryId] = useState<string | null>(null);

    // Slug Sync State
    const [isSlugSynced, setIsSlugSynced] = useState(true);

    // ─── Form Setup ───
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CategoryFormData>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: "",
            slug: "",
            icon: "📁",
            featured: false,
            parentCategoryId: null,
        },
    });

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
            toast({ title: "Slug Synced" });
        }
    };

    // Initial load
    useEffect(() => {
        fetchTree();
        fetchStats();
    }, [fetchTree, fetchStats]);

    const toggleExpand = (id: string) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleEdit = (category: Category) => {
        setSelectedItem(category);
        setFormType(category.parentCategoryId ? "sub" : "main");
        setIsSlugSynced(false);
        reset({
            name: category.name,
            slug: category.slug,
            icon: category.icon,
            featured: category.featured,
            parentCategoryId: category.parentCategoryId,
        });
        setIsViewOpen(false);
        setIsEditOpen(true);
    };

    const handleAddSub = (parent: Category) => {
        setSelectedItem(null);
        setFormType("sub");
        setParentCategoryId(parent.id);
        setIsSlugSynced(true);
        reset({
            name: "",
            slug: "",
            icon: "📁",
            featured: false,
            parentCategoryId: parent.id,
        });
        setIsAddOpen(true);
    };

    const handleAddMain = () => {
        setSelectedItem(null);
        setFormType("main");
        setParentCategoryId(null);
        setIsSlugSynced(true);
        reset({
            name: "",
            slug: "",
            icon: "📁",
            featured: false,
            parentCategoryId: null,
        });
        setIsAddOpen(true);
    };

    const onSubmit = async (data: CategoryFormData) => {
        let success = false;
        if (isEditOpen && selectedItem) {
            success = await editCategory(selectedItem.id, data);
        } else {
            if (formType === "sub" && parentCategoryId) {
                success = await addSubCategory({ ...data, parentCategoryId });
            } else {
                success = await addMainCategory(data);
            }
        }

        if (success) {
            toast({
                title: isEditOpen ? "Category Updated" : "Category Created",
                variant: "success",
            });
            setIsAddOpen(false);
            setIsEditOpen(false);
            reset();
        } else {
            toast({
                title: "Error",
                description: error || "Action failed",
                variant: "destructive"
            });
        }
    };

    const confirmDelete = async () => {
        if (!selectedItem) return;
        const success = await removeCategory(selectedItem.id);
        if (success) {
            toast({ title: "Category Removed", variant: "destructive" });
            setIsDeleteOpen(false);
            setIsViewOpen(false);
        }
    };

    const filteredTree = categoryTree.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.subCategories?.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-8 pb-12">
            {/* Header - Glassmorphic Hero */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-8 lg:p-12 border border-primary/10 shadow-sm">
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[80px]" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3 text-foreground">
                            Category Management
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Organize your products with main categories and subcategories mapping.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" onClick={() => { fetchTree(true); fetchStats(true); }} disabled={isLoading} className="h-12 w-12 rounded-2xl bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10">
                            <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                        </Button>
                        <Button onClick={handleAddMain} className="h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-transform">
                            <Plus className="h-5 w-5 mr-2" />
                            Create Category
                        </Button>
                    </div>
                </div>
            </div>

            {/* Premium Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Main Categories", value: stats?.mainCategories || 0, icon: LayoutGrid, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                    { label: "Subcategories", value: stats?.subCategories || 0, icon: Tag, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                    { label: "Product Links", value: stats?.totalProducts || 0, icon: ImageIcon, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                ].map((stat, i) => (
                    <Card key={i} className={`p-6 border rounded-3xl bg-card shadow-sm hover:shadow-lg transition-all duration-300 ${stat.border}`}>
                        <div className="flex items-center gap-5">
                            <div className={`p-4 rounded-2xl ${stat.bg}`}>
                                <stat.icon className={`h-7 w-7 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">{stat.label}</p>
                                <h3 className="text-4xl font-black mt-1 tracking-tight">{isLoading ? "..." : stat.value}</h3>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Search */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-3 rounded-3xl bg-muted/40 backdrop-blur-xl border border-primary/10 shadow-inner">
                <div className="flex-1 w-full relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground font-bold group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search categories..."
                        className="pl-14 h-14 bg-background/80 hover:bg-background border-none shadow-sm rounded-2xl text-md transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Categories List */}
            {isLoading && categoryTree.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    <p className="text-muted-foreground font-medium">Reconstructing taxonomy...</p>
                </div>
            ) : filteredTree.length === 0 ? (
                <Card className="p-24 text-center rounded-3xl border-dashed border-2 border-muted-foreground/20 bg-muted/10">
                    <LayoutGrid className="w-24 h-24 mx-auto opacity-20 mb-6 text-muted-foreground" />
                    <p className="text-2xl font-black mb-2 text-foreground/80">{searchTerm ? "No results found" : "Your catalog is empty"}</p>
                    <p className="text-muted-foreground max-w-sm mx-auto mb-6">Create structural categories so products can be grouped.</p>
                    {(!searchTerm && !isLoading) && (
                        <Button variant="gradient" size="lg" className="rounded-full shadow-sm" onClick={handleAddMain}>
                            <Plus className="h-5 w-5 mr-2" /> Create Initial Category
                        </Button>
                    )}
                </Card>
            ) : (
                <div className="space-y-4">
                    {filteredTree.map((category) => (
                        <Card key={category.id} className={`overflow-hidden transition-all duration-300 border-l-[6px] rounded-3xl bg-card ${category.featured ? "border-l-amber-500 shadow-md" : "border-l-primary shadow-sm hover:shadow-md"}`}>
                            <div className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/30 transition-colors group" onClick={() => toggleExpand(category.id)}>
                                <div className="flex items-center gap-5">
                                    <div className="text-3xl h-16 w-16 rounded-2xl bg-background flex items-center justify-center border border-primary/10 shadow-sm group-hover:scale-110 transition-transform">
                                        {category.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-xl font-black">{category.name}</h3>
                                            {category.featured && <Badge variant="warning" className="text-[10px] h-5 px-2 uppercase font-black tracking-widest shadow-sm">Featured</Badge>}
                                        </div>
                                        <div className="flex items-center gap-3 text-[11px] font-bold text-muted-foreground mt-1.5 uppercase tracking-wider">
                                            <span className="font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-md">/{category.slug}</span>
                                            <span>•</span>
                                            <span>{category.subCategories?.length || 0} subcategories</span>
                                            <span>•</span>
                                            <span>{category._count?.products || 0} products</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-background shadow-sm border border-transparent hover:border-border"><MoreHorizontal className="h-5 w-5" /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-48 shadow-2xl border-none rounded-2xl p-2">
                                            <DropdownMenuItem onClick={() => { setSelectedItem(category); setIsViewOpen(true); }} className="rounded-xl py-2 cursor-pointer">
                                                <ExternalLink className="h-4 w-4 mr-3" /> View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleEdit(category)} className="rounded-xl py-2 cursor-pointer">
                                                <Edit2 className="h-4 w-4 mr-3 text-primary" /> Edit Category
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive rounded-xl py-2 cursor-pointer mt-1 focus:bg-destructive/10" onClick={() => { setSelectedItem(category); setIsDeleteOpen(true); }}>
                                                <Trash2 className="h-4 w-4 mr-3" /> Delete Category
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <div className="p-2 bg-background border border-border shadow-sm rounded-xl transition-colors group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary">
                                        {expandedIds.includes(category.id) ? (
                                            <ChevronDown className="h-5 w-5" />
                                        ) : (
                                            <ChevronRight className="h-5 w-5" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {expandedIds.includes(category.id) && (
                                <div className="border-t border-primary/10 bg-muted/20">
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">Subcategories of {category.name}</h4>
                                            <Button variant="outline" size="sm" className="h-8 rounded-full text-xs font-bold shadow-sm" onClick={(e) => { e.stopPropagation(); handleAddSub(category); }}>
                                                <Plus className="h-3 w-3 mr-1.5" /> Add Subcategory
                                            </Button>
                                        </div>
                                        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                                            {category.subCategories?.map((sub) => (
                                                <div key={sub.id} className="flex items-center justify-between p-4 rounded-2xl bg-card border border-primary/5 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group">
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-lg h-8 w-8 flex items-center justify-center bg-muted rounded-xl">{sub.icon}</span>
                                                            <p className="font-bold text-sm truncate">{sub.name}</p>
                                                        </div>
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-2 flex items-center gap-2">
                                                            <span className="font-mono bg-background px-1.5 py-0.5 rounded border">/{sub.slug}</span>
                                                            {sub.featured && <span className="bg-amber-500/20 text-amber-600 px-1.5 py-0.5 rounded border border-amber-500/30">FEATURED</span>}
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-background hover:bg-primary/10 shadow-sm border" onClick={() => handleEdit(sub)}>
                                                            <Edit2 className="h-3.5 w-3.5 text-primary" />
                                                        </Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg bg-background hover:bg-destructive/10 shadow-sm border" onClick={() => { setSelectedItem(sub); setIsDeleteOpen(true); }}>
                                                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                            {(!category.subCategories || category.subCategories.length === 0) && (
                                                <div className="col-span-full p-6 text-center border-2 border-dashed border-primary/10 rounded-2xl">
                                                    <p className="text-muted-foreground font-medium text-sm">No subcategories created yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}

            {/* Management Dialogs */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                        <DialogTitle>Add {formType === 'main' ? 'Main Category' : 'Subcategory'}</DialogTitle>
                        <DialogDescription>
                            {formType === 'main' ? 'Create a top-level product category.' : `Add a subcategory within this section.`}
                        </DialogDescription>
                    </DialogHeader>
                    <CategoryForm
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        errors={errors}
                        isSlugSynced={isSlugSynced}
                        setIsSlugSynced={setIsSlugSynced}
                        handleSyncSlug={handleSyncSlug}
                        type={formType}
                    />
                    <DialogFooter className="pt-2">
                        <Button variant="outline" onClick={() => setIsAddOpen(false)} disabled={isLoading}>Cancel</Button>
                        <Button variant="gradient" type="submit" form="category-form" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null} Create Category
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                        <DialogTitle>Edit {formType === 'main' ? 'Category' : 'Subcategory'}</DialogTitle>
                        <DialogDescription>Update the details and visibility of this category.</DialogDescription>
                    </DialogHeader>
                    <CategoryForm
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        errors={errors}
                        isSlugSynced={isSlugSynced}
                        setIsSlugSynced={setIsSlugSynced}
                        handleSyncSlug={handleSyncSlug}
                        type={formType}
                    />
                    <DialogFooter className="pt-2">
                        <Button variant="outline" onClick={() => setIsEditOpen(false)} disabled={isLoading}>Cancel</Button>
                        <Button variant="gradient" type="submit" form="category-form" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null} Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <strong>{selectedItem?.name}</strong>?
                            {selectedItem?.parentCategoryId === null && " This will also impact all nested subcategories."}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)} disabled={isLoading}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete} disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : "Confirm Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    {selectedItem && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-3">
                                    <span className="text-3xl p-3 bg-muted rounded-2xl border shadow-inner">{selectedItem.icon}</span>
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedItem.name}</h2>
                                        <Badge variant={selectedItem.featured ? "warning" : "secondary"}>
                                            {selectedItem.parentCategoryId ? "Subcategory" : "Main Category"}
                                        </Badge>
                                    </div>
                                </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-5 mt-6 border-t pt-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">Global ID</p>
                                        <p className="font-mono text-xs flex items-center gap-1.5"><Hash className="h-3 w-3 text-primary" /> {selectedItem.id}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase text-muted-foreground/60 tracking-widest">Publish Date</p>
                                        <p className="text-xs flex items-center gap-1.5"><Calendar className="h-3 w-3 text-primary" /> {new Date(selectedItem.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-muted/30 rounded-xl space-y-3">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">URL Slug</span>
                                        <span className="font-mono font-bold text-primary">/{selectedItem.slug}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">Featured Status</span>
                                        <span className={selectedItem.featured ? "text-amber-600 font-bold" : "text-muted-foreground"}>
                                            {selectedItem.featured ? "Active on Home" : "Standard"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter className="mt-8 gap-2 border-t pt-4">
                                <Button variant="outline" className="flex-1" onClick={() => setIsViewOpen(false)}>Dismiss</Button>
                                <Button variant="gradient" className="flex-1" onClick={() => handleEdit(selectedItem)}>
                                    <Edit2 className="h-4 w-4 mr-2" /> Modify Profile
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
