"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
    Plus,
    Search,
    MoreHorizontal,
    Edit2,
    Trash2,
    Eye,
    Filter,
    Download,
    Package,
    LayoutGrid,
    List,
    AlertCircle,
    RefreshCw,
    Loader2,
    CheckCircle2,
    Backpack,
    TrendingUp,
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "@/components/ui/toaster";
import EditProductForm from "./_components/addProduct";
import { useProductStore, useProductsByAdmin } from "@/store/product-store";
import { Product } from "@/services/product.service";

const getStatusColor = (status: string) => {
    switch (status) {
        case "Published": return "success";
        case "Low Stock": return "warning";
        case "Out of Stock": return "destructive";
        case "Disabled": return "secondary";
        case "Draft": return "secondary";
        default: return "default";
    }
};

const getName = (val: any): string => {
    if (!val) return "";
    if (typeof val === 'string') return val;
    return val.name || "";
};

export default function ProductsPage() {
    const { addProduct, editProduct, removeProduct } = useProductStore();
    const { products, isLoading, error, fetchProducts } = useProductsByAdmin();
    const [viewMode, setViewMode] = useState<"grid" | "table">("table");
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Modal States
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const loadData = useCallback(async () => {
        await fetchProducts({ showDisabled: true });
    }, [fetchProducts]);

    useEffect(() => {
        if (products.length === 0) {
            loadData();
        }
    }, [loadData, products.length]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const title = product.title || "";
            const sku = product.sku || product._id || "";
            const categoryName = getName(product.category);

            const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sku.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === "all" || categoryName === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, categoryFilter]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, categoryFilter]);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage, itemsPerPage]);

    const handleEditProduct = (product: Product) => {
        setSelectedProduct(product);
        setIsAddEditOpen(true);
    };

    const handleDeleteClick = (product: Product) => {
        setSelectedProduct(product);
        setIsDeleteOpen(true);
    };

    const handleViewDetails = (product: Product) => {
        setSelectedProduct(product);
        setIsViewOpen(true);
    };

    const handleRefresh = async () => {
        await loadData();
    };

    const toggleDisableProduct = async (product: Product) => {
        const id = product._id || product.id;
        if (!id) return;

        // Ensure category and vendor are strings (extracting ID from populated objects)
        const payloadToEdit = { 
            ...product, 
            category: typeof product.category === 'object' ? (product.category.id || (product.category as any)._id) : product.category,
            vendor: typeof product.vendor === 'object' ? (product.vendor.id || (product.vendor as any)._id) : product.vendor,
            disableProduct: !product.disableProduct 
        };

        const success = await editProduct(id, payloadToEdit);
        if (success) {
            await loadData();
            toast({
                title: payloadToEdit.disableProduct ? "Product Disabled" : "Product Enabled",
                description: `Product status has been updated successfully.`,
                variant: "success",
            });
        }
    };

    const handleSaveProduct = async (data: any) => {
        const id = selectedProduct?._id || selectedProduct?.id;
        let success = false;

        if (id) {
            success = await editProduct(id, data);
        } else {
            success = await addProduct(data);
        }

        if (success) {
            setIsAddEditOpen(false);
            setSelectedProduct(null);
            await loadData();
            toast({
                title: id ? "Product Updated" : "Product Created",
                description: `${id ? "Changes saved" : "New product added"} successfully.`,
                variant: "success",
            });
        }
    };

    const confirmDelete = async () => {
        const id = selectedProduct?._id || selectedProduct?.id;
        if (!id) return;

        const success = await removeProduct(id);
        if (success) {
            setIsDeleteOpen(false);
            setSelectedProduct(null);
            await loadData();
            toast({
                title: "Product Deleted",
                description: "The product has been removed from your catalog.",
                variant: "destructive",
            });
        }
    };

    // Stats
    const stats = useMemo(() => {
        const total = products.length;
        const lowStock = products.filter(p => {
            const stock = (p.subProducts || p.sizes)?.reduce((acc: number, s: any) => acc + (Number(s.qty) || 0), 0) || 0;
            return stock > 0 && stock <= 10;
        }).length;
        const outOfStock = products.filter(p => {
            const stock = (p.subProducts || p.sizes)?.reduce((acc: number, s: any) => acc + (Number(s.qty) || 0), 0) || 0;
            return stock === 0;
        }).length;
        const published = total - outOfStock;
        return { total, lowStock, outOfStock, published };
    }, [products]);

    return (
        <div className="space-y-8 pb-12">
            {/* Header - Glassmorphic Hero */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-8 lg:p-12 border border-primary/10 shadow-sm">
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[80px]" />
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3 text-foreground">
                            Product Intelligence
                        </h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Manage inventory, track performance, and customize your catalog operations in real-time.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading} className="h-12 w-12 rounded-2xl bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/10">
                            <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                        </Button>
                        <Button onClick={() => { setSelectedProduct(null); setIsAddEditOpen(true); }} className="h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/30">
                            <Plus className="h-5 w-5 mr-2" />
                            Create Product
                        </Button>
                    </div>
                </div>
            </div>

            {/* Premium Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Products", value: stats.total, icon: Backpack, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
                    { label: "Published Catalog", value: stats.published, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
                    { label: "Low Inventory", value: stats.lowStock, icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
                    { label: "Stockouts", value: stats.outOfStock, icon: AlertCircle, color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
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

            {/* Filters & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-3 rounded-3xl bg-muted/40 backdrop-blur-xl border border-primary/10 shadow-inner">
                <div className="flex-1 w-full md:w-auto relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground font-bold group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search products by title or SKU..."
                        className="pl-14 h-14 bg-background/80 hover:bg-background border-none shadow-sm rounded-2xl text-md transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto md:pr-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-[200px] h-14 bg-background/80 hover:bg-background border-none shadow-sm rounded-2xl transition-all">
                            <Filter className="h-4 w-4 mr-2 text-primary" />
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                            <SelectItem value="all">Every Category</SelectItem>
                            {Array.from(new Set(products.map(p => getName(p.category)))).filter(Boolean).map(c => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex bg-background p-1.5 rounded-2xl shadow-sm border border-primary/10">
                        <Button variant={viewMode === "table" ? "default" : "ghost"} size="icon" className={`rounded-xl h-11 w-11 ${viewMode === "table" ? "shadow-md bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`} onClick={() => setViewMode("table")}>
                            <List className="h-5 w-5" />
                        </Button>
                        <Button variant={viewMode === "grid" ? "default" : "ghost"} size="icon" className={`rounded-xl h-11 w-11 ${viewMode === "grid" ? "shadow-md bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`} onClick={() => setViewMode("grid")}>
                            <LayoutGrid className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* List */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-32 gap-4">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="text-muted-foreground font-medium">Synchronizing catalog...</p>
                </div>
            ) : error ? (
                <Card className="p-16 border-destructive/20 bg-destructive/5 text-center rounded-3xl">
                    <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-6 opacity-80" />
                    <h3 className="text-2xl font-black text-destructive mb-3">Synchronization Failed</h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">{error}</p>
                    <Button variant="outline" size="lg" className="rounded-full shadow-sm" onClick={loadData}>
                        <RefreshCw className="h-5 w-5 mr-2" /> Attempt Recovery
                    </Button>
                </Card>
            ) : filteredProducts.length === 0 ? (
                <Card className="p-24 text-center rounded-3xl border-dashed border-2 border-muted-foreground/20 bg-muted/10">
                    <Package className="h-24 w-24 mx-auto mb-6 text-muted-foreground opacity-20" />
                    <h3 className="text-2xl font-black mb-2 text-foreground/80">No matches found</h3>
                    <p className="text-muted-foreground max-w-sm mx-auto">We couldn't find any products matching your current search parameters. Try adjusting your filters.</p>
                </Card>
            ) : viewMode === "table" ? (
                <Card className="overflow-hidden border-none shadow-sm rounded-3xl bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b-primary/10">
                                <TableHead className="w-[300px] px-8 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Product Details</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Category</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Inventory</TableHead>
                                <TableHead className="px-6 py-4 text-xs font-black uppercase tracking-widest text-muted-foreground">Price</TableHead>
                                <TableHead className="px-6 py-4 text-center text-xs font-black uppercase tracking-widest text-muted-foreground">Status</TableHead>
                                <TableHead className="px-8 py-4 text-right text-xs font-black uppercase tracking-widest text-muted-foreground">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paginatedProducts.map((product) => {
                                const mainImg = product.generalImages?.[0]?.url || product.generalImages?.[0] || 
                                               product.images?.[0]?.url || product.images?.[0] || "📦";
                                const totalStock = (product.subProducts || product.sizes)?.reduce((acc: number, s: any) => acc + (Number(s.qty) || 0), 0) || 0;
                                const prices = (product.subProducts || product.sizes)?.map((s: any) => Number(s.price)) || [0];
                                const minPrice = Math.min(...prices);
                                const status = product.disableProduct ? "Disabled" : totalStock > 10 ? "Published" : totalStock > 0 ? "Low Stock" : "Out of Stock";

                                return (
                                    <TableRow key={product._id || product.id} className={`group hover:bg-muted/30 transition-colors border-b-primary/5 last:border-0 cursor-default ${product.disableProduct ? 'opacity-60 grayscale-[0.3]' : ''}`}>
                                        <TableCell className="px-8 py-4">
                                            <div className="flex items-center gap-5">
                                                <div className="h-16 w-16 rounded-2xl bg-muted overflow-hidden flex items-center justify-center shrink-0 border border-primary/10 group-hover:shadow-md transition-all">
                                                    {typeof mainImg === 'string' && mainImg.startsWith('http') ? (
                                                        <img src={mainImg} alt={product.title} className="w-full h-full object-cover" />
                                                    ) : <span className="text-3xl">📦</span>}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-bold text-base truncate group-hover:text-primary transition-colors">{product.title}</p>
                                                    <p className="text-xs text-muted-foreground font-mono mt-1">{product.sku}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <Badge variant="default" className="bg-background px-3 py-1 text-xs text-black">
                                                {getName(product.category)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="px-6 py-4">
                                            <div className="flex flex-col justify-center">
                                                <span className="font-bold text-sm text-foreground">{(product.subProducts || product.sizes)?.length || 0} Variant(s)</span>
                                                <span className="text-xs text-muted-foreground mt-0.5">{totalStock} total units</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 font-black text-base text-primary whitespace-nowrap">
                                            ${minPrice.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 text-center">
                                            <Badge variant={getStatusColor(status) as any} className="px-4 py-1.5 shadow-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap inline-flex">
                                                {status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className="px-8 py-4 flex justify-end gap-2 items-center min-h-[5rem]">
                                            <Button variant="ghost" size="icon" onClick={() => handleViewDetails(product)} className="h-10 w-10 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors">
                                                <Eye className="h-5 w-5" />
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted text-muted-foreground">
                                                        <MoreHorizontal className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-xl border-primary/10">
                                                    <DropdownMenuItem className="py-2.5 rounded-xl cursor-pointer" onClick={() => handleEditProduct(product)}>
                                                        <Edit2 className="h-4 w-4 mr-3 text-primary" /> Modify Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="py-2.5 rounded-xl cursor-pointer" onClick={() => toggleDisableProduct(product)}>
                                                        {product.disableProduct ? (
                                                            <>
                                                                <CheckCircle2 className="h-4 w-4 mr-3 text-emerald-500" /> Re-enable Sales
                                                            </>
                                                        ) : (
                                                            <>
                                                                <AlertCircle className="h-4 w-4 mr-3 text-amber-500" /> Suspend Listing
                                                            </>
                                                        )}
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem className="py-2.5 rounded-xl text-destructive focus:bg-destructive/10 cursor-pointer mt-1" onClick={() => handleDeleteClick(product)}>
                                                        <Trash2 className="h-4 w-4 mr-3" /> Retire Product
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {paginatedProducts.map((product) => {
                        const mainImg = product.generalImages?.[0]?.url || product.generalImages?.[0] || 
                                       product.images?.[0]?.url || product.images?.[0] || "📦";
                        const totalStock = (product.subProducts || product.sizes)?.reduce((acc: number, s: any) => acc + (Number(s.qty) || 0), 0) || 0;
                        const prices = (product.subProducts || product.sizes)?.map((s: any) => Number(s.price)) || [0];
                        const minPrice = Math.min(...prices);
                        const status = product.disableProduct ? "Disabled" : totalStock > 10 ? "Published" : totalStock > 0 ? "Low Stock" : "Out of Stock";

                        return (
                            <Card key={product._id || product.id} className={`rounded-3xl overflow-hidden group hover:shadow-2xl border border-transparent hover:border-primary/30 bg-card flex flex-col relative ${product.disableProduct ? 'opacity-60 shadow-none' : ''}`}>
                                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                                    <Badge variant={getStatusColor(status) as any} className="shadow-lg backdrop-blur-md px-3 py-1 font-bold text-[10px] uppercase tracking-widest">
                                        {status}
                                    </Badge>
                                </div>
                                <div className="aspect-[4/3] bg-muted relative overflow-hidden shrink-0">
                                    {typeof mainImg === 'string' && mainImg.startsWith('http') ? (
                                        <img src={mainImg} alt={product.title} className="w-full h-full object-cover" />
                                    ) : <div className="w-full h-full flex items-center justify-center text-6xl">📦</div>}
                                    <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent opacity-80 group-hover:opacity-90" />

                                    {/* Grid Action Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 backdrop-blur-sm bg-black/20">
                                        <Button size="icon" variant="secondary" className="h-12 w-12 rounded-full shadow-2xl" onClick={() => handleViewDetails(product)}>
                                            <Eye className="h-5 w-5" />
                                        </Button>
                                        <Button size="icon" className="h-12 w-12 rounded-full shadow-2xl bg-primary" onClick={() => handleEditProduct(product)}>
                                            <Edit2 className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-1 relative z-10 -mt-12">
                                    <div className="flex items-center justify-between mb-3">
                                        <Badge variant="outline" className="bg-background/80 backdrop-blur border-primary/20 text-xs font-bold shadow-sm">
                                            {getName(product.category)}
                                        </Badge>
                                        <span className="text-[10px] font-mono font-bold text-muted-foreground bg-background/80 px-2 py-1 rounded-md">{product.sku}</span>
                                    </div>
                                    <h4 className="font-black text-lg mb-2 line-clamp-2 leading-tight group-hover:text-primary transition-colors">{product.title}</h4>

                                    <div className="mt-auto pt-4 flex items-end justify-between border-t border-primary/10">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Starting Price</span>
                                            <span className="text-2xl font-black text-primary leading-none">${minPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Inventory</span>
                                            <span className="text-sm font-black text-foreground">{totalStock} Units</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Pagination UI */}
            {totalPages > 1 && (
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-primary/10">
                    <p className="text-sm text-muted-foreground font-medium order-2 md:order-1">
                        Showing <span className="text-foreground font-bold">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="text-foreground font-bold">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> of <span className="text-foreground font-bold">{filteredProducts.length}</span> products
                    </p>
                    <div className="order-1 md:order-2">
                        <Pagination>
                            <PaginationContent className="bg-background rounded-2xl border border-primary/10 p-1 shadow-sm">
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); if (currentPage > 1) setCurrentPage(currentPage - 1); }}
                                        className={`rounded-xl h-10 px-4 hover:bg-primary/10 hover:text-primary transition-all ${currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                    />
                                </PaginationItem>

                                {Array.from({ length: totalPages }).map((_, i) => (
                                    <PaginationItem key={i + 1}>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); setCurrentPage(i + 1); }}
                                            isActive={currentPage === i + 1}
                                            className={`rounded-xl h-10 w-10 flex items-center justify-center transition-all ${currentPage === i + 1 ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' : 'hover:bg-primary/10 hover:text-primary'}`}
                                        >
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) setCurrentPage(currentPage + 1); }}
                                        className={`rounded-xl h-10 px-4 hover:bg-primary/10 hover:text-primary transition-all ${currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            )}

            {/* Modals */}
            <Dialog
                open={isAddEditOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        setIsAddEditOpen(false);
                        setSelectedProduct(null);
                    }
                }}
            >
                <DialogContent className="max-w-7xl max-h-[90vh] p-0 overflow-hidden">
                    <DialogHeader className="p-6 border-b">
                        <DialogTitle className="text-2xl flex items-center gap-2">
                            <Backpack className="h-6 w-6 text-primary" />
                            {selectedProduct?._id || selectedProduct?.id ? "Modify Product Details" : "Create New Product Catalog Entry"}
                        </DialogTitle>
                        <DialogDescription>
                            Configure product variants, inventory levels, and rich media content.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                        <EditProductForm
                            onClose={() => setIsAddEditOpen(false)}
                            onSave={handleSaveProduct}
                            initialData={(selectedProduct as any) || undefined}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-destructive">
                            <Trash2 className="h-5 w-5" />
                            Confirm Deletion
                        </DialogTitle>
                        <DialogDescription className="pt-2">
                            You are about to permanently delete <strong>{selectedProduct?.title}</strong>. This action will remove all inventory records and cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6 flex gap-2">
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)} className="flex-1">Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete} className="flex-1">Delete Permanently</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                    {selectedProduct && (
                        <>
                            <DialogHeader>
                                <div className="flex items-start gap-6">
                                    <div className="h-32 w-32 rounded-2xl bg-muted border overflow-hidden shrink-0 shadow-inner flex items-center justify-center">
                                        {(() => {
                                            const img = selectedProduct.generalImages?.[0] || selectedProduct.images?.[0];
                                            const url = typeof img === 'string' ? img : img?.url;
                                            return url?.startsWith('http') ? (
                                                <img src={url} alt={selectedProduct.title} className="h-full w-full object-cover" />
                                            ) : <Package className="h-12 w-12 text-muted-foreground opacity-30" />;
                                        })()}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <Badge variant="outline" className="mb-2 text-primary border-primary/20 bg-primary/5">{getName(selectedProduct.category)}</Badge>
                                            <span className="text-xs font-mono text-muted-foreground">SKU: {selectedProduct.sku}</span>
                                        </div>
                                        <DialogTitle className="text-3xl font-bold">{selectedProduct.title}</DialogTitle>
                                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{selectedProduct.description}</p>
                                    </div>
                                </div>
                            </DialogHeader>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                                <Card className="p-5 bg-muted/20 border-none">
                                    <h5 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Stock & Pricing</h5>
                                    <div className="space-y-4">
                                        {(selectedProduct.subProducts || selectedProduct.sizes)?.map((size: any, i: number) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-background border shadow-sm">
                                                <div>
                                                    <p className="font-bold">{size.type || size.size}</p>
                                                    <p className="text-xs text-muted-foreground">{size.qty} available {size.sku ? `(${size.sku})` : ''}</p>
                                                </div>
                                                <p className="text-lg font-black text-primary">${Number(size.price).toFixed(2)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </Card>

                                <Card className="p-5 bg-muted/20 border-none">
                                    <h5 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Brand Information</h5>
                                    <div className="space-y-4">
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-sm text-muted-foreground">Manufacturer</span>
                                            <span className="text-sm font-bold">{(selectedProduct as any).brand || (selectedProduct as any).ingredients?.brand}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-sm text-muted-foreground">Vendor Partner</span>
                                            <span className="text-sm font-bold">{getName(selectedProduct.vendor)}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-sm text-muted-foreground">Discount</span>
                                            <span className="text-sm font-bold text-red-500">{selectedProduct.discount}% OFF</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Featured</span>
                                            <Badge variant={selectedProduct.featured ? "success" : "secondary"}>
                                                {selectedProduct.featured ? "Yes" : "No"}
                                            </Badge>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            <div className="space-y-6 mt-8">
                                <div>
                                    <h5 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Product Description</h5>
                                    <p className="text-sm text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-4">
                                        {selectedProduct.longDescription}
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <h5 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Key Benefits</h5>
                                        <ul className="space-y-2">
                                            {(() => {
                                                const benefits = Array.isArray((selectedProduct as any).benefits) ? (selectedProduct as any).benefits : (Array.isArray((selectedProduct as any).ingredients?.benefits) ? (selectedProduct as any).ingredients.benefits : []);
                                                return benefits.map((b: string, i: number) => (
                                                    <li key={i} className="text-xs flex items-center gap-2">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                        {b}
                                                    </li>
                                                ));
                                            })()}
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Ingredients</h5>
                                        <p className="text-xs text-muted-foreground leading-relaxed bg-muted/40 p-3 rounded-lg">
                                            {(() => {
                                                const ingredients = Array.isArray((selectedProduct as any).ingredients) ? (selectedProduct as any).ingredients : (Array.isArray((selectedProduct as any).ingredients?.details) ? (selectedProduct as any).ingredients.details : []);
                                                return Array.isArray(ingredients) ? ingredients.join(", ") : (typeof ingredients === 'string' ? ingredients : "");
                                            })()}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Product Media Gallery</h5>
                                    <div className="grid grid-cols-4 gap-3">
                                        {(selectedProduct.generalImages || selectedProduct.images)?.map((img: any, i: number) => {
                                            const url = typeof img === 'string' ? img : img?.url;
                                            return url && (
                                                <div key={i} className="aspect-square rounded-xl border overflow-hidden bg-muted group relative">
                                                    <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="mt-8 pt-6 border-t flex gap-2">
                                <Button variant="outline" onClick={() => setIsViewOpen(false)} className="flex-1">Close Preview</Button>
                                <Button className="flex-1" onClick={() => { setIsViewOpen(false); handleEditProduct(selectedProduct); }}>
                                    <Edit2 className="h-4 w-4 mr-2" /> Modify Product
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
