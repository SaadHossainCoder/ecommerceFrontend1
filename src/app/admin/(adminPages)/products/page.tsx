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
import { toast } from "@/components/ui/toaster";
import EditProductForm from "./_components/addProduct";
import { useProductStore } from "@/store/product-store";
import { Product } from "@/services/product-service";

const getStatusColor = (status: string) => {
    switch (status) {
        case "Published": return "success";
        case "Low Stock": return "warning";
        case "Out of Stock": return "destructive";
        case "Draft": return "secondary";
        default: return "default";
    }
};

export default function ProductsPage() {
    const { products, isLoading, error, fetchProducts, addProduct, editProduct, removeProduct } = useProductStore();
    const [viewMode, setViewMode] = useState<"grid" | "table">("table");
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    // Modal States
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const loadData = useCallback(async () => {
        await fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const title = product.title || "";
            const sku = product.sku || product._id || "";
            const category = product.category || "";
            
            const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sku.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === "all" || category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, categoryFilter]);

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
            const stock = p.sizes?.reduce((acc: number, s: any) => acc + (Number(s.qty) || 0), 0) || 0;
            return stock > 0 && stock <= 10;
        }).length;
        const outOfStock = products.filter(p => {
            const stock = p.sizes?.reduce((acc: number, s: any) => acc + (Number(s.qty) || 0), 0) || 0;
            return stock === 0;
        }).length;
        const published = total - outOfStock;
        return { total, lowStock, outOfStock, published };
    }, [products]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Product Catalog</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage inventory, pricing, and variants for your store.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={loadData} disabled={isLoading}>
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                    <Button variant="gradient" onClick={() => {
                        setSelectedProduct(null);
                        setIsAddEditOpen(true);
                    }}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 border-l-4 border-l-primary">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Backpack className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Products</p>
                            <h3 className="text-xl font-bold">{isLoading ? "..." : stats.total}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-4 border-l-4 border-l-green-500">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Published</p>
                            <h3 className="text-xl font-bold">{isLoading ? "..." : stats.published}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-4 border-l-4 border-l-yellow-500">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/10 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Low Stock</p>
                            <h3 className="text-xl font-bold">{isLoading ? "..." : stats.lowStock}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-4 border-l-4 border-l-red-500">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Out of Stock</p>
                            <h3 className="text-xl font-bold">{isLoading ? "..." : stats.outOfStock}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <Card className="p-4">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex flex-1 items-center gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or SKU..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="w-[180px]">
                                <Filter className="h-4 w-4 mr-2" />
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                <SelectItem value="Electronics">Electronics</SelectItem>
                                <SelectItem value="Audio">Audio</SelectItem>
                                <SelectItem value="Fashion">Fashion</SelectItem>
                                <SelectItem value="Home & Living">Home & Living</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-2 bg-muted p-1 rounded-lg self-end lg:self-auto">
                        <Button
                            variant={viewMode === "table" ? "secondary" : "ghost"}
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setViewMode("table")}
                        >
                            <List className="h-4 w-4" />
                        </Button>
                        <Button
                            variant={viewMode === "grid" ? "secondary" : "ghost"}
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setViewMode("grid")}
                        >
                            <LayoutGrid className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>

            {/* List */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Loading products...</p>
                </div>
            ) : error ? (
                <Card className="p-12 border-destructive/20 bg-destructive/5 text-center">
                    <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-destructive mb-2">Failed to load products</h3>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    <Button variant="outline" onClick={loadData}>
                        <RefreshCw className="h-4 w-4 mr-2" /> Retry
                    </Button>
                </Card>
            ) : filteredProducts.length === 0 ? (
                <Card className="p-20 text-center text-muted-foreground">
                    <Package className="h-16 w-16 mx-auto mb-4 opacity-20" />
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-sm">Try adjusting your search or filters.</p>
                </Card>
            ) : viewMode === "table" ? (
                <Card className="overflow-hidden border-t-4 border-t-primary">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-muted/30">
                                    <th className="p-4 text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">Product</th>
                                    <th className="p-4 text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">Category</th>
                                    <th className="p-4 text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">Variants</th>
                                    <th className="p-4 text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">Price Range</th>
                                    <th className="p-4 text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                                    <th className="p-4 text-right font-semibold text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {filteredProducts.map((product) => {
                                    const mainImg = product.images?.[0]?.url || "📦";
                                    const totalStock = product.sizes?.reduce((acc: number, s: any) => acc + (Number(s.qty) || 0), 0) || 0;
                                    const prices = product.sizes?.map((s: any) => Number(s.price)) || [0];
                                    const minPrice = Math.min(...prices);
                                    const maxPrice = Math.max(...prices);
                                    const priceDisplay = prices.length > 0 
                                        ? minPrice === maxPrice ? `$${minPrice.toFixed(2)}` : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`
                                        : "N/A";
                                    const status = totalStock > 10 ? "Published" : totalStock > 0 ? "Low Stock" : "Out of Stock";

                                    return (
                                        <tr key={product._id || product.id} className="hover:bg-muted/30 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden border">
                                                        {mainImg.startsWith('http') ? (
                                                            <img src={mainImg} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                                        ) : <span className="text-2xl">{mainImg}</span>}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-bold text-sm truncate">{product.title}</p>
                                                        <p className="text-xs text-muted-foreground font-mono">{product.sku}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant="outline" className="font-normal bg-background">
                                                    {product.category}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-sm">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-primary">{product.sizes?.length || 0} Optional Size(s)</span>
                                                    <span className="text-xs text-muted-foreground">{totalStock} total in inventory</span>
                                                </div>
                                            </td>
                                            <td className="p-4 font-bold text-sm">
                                                {priceDisplay}
                                            </td>
                                            <td className="p-4">
                                                <Badge variant={getStatusColor(status) as any}>
                                                    {status}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="w-48">
                                                        <DropdownMenuItem onClick={() => handleViewDetails(product)}>
                                                            <Eye className="h-4 w-4 mr-2" /> View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                                                            <Edit2 className="h-4 w-4 mr-2" /> Edit Product
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(product)}>
                                                            <Trash2 className="h-4 w-4 mr-2" /> Delete Product
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => {
                         const mainImg = product.images?.[0]?.url || "📦";
                         const totalStock = product.sizes?.reduce((acc: number, s: any) => acc + (Number(s.qty) || 0), 0) || 0;
                         const prices = product.sizes?.map((s: any) => Number(s.price)) || [0];
                         const minPrice = Math.min(...prices);
                         const status = totalStock > 10 ? "Published" : totalStock > 0 ? "Low Stock" : "Out of Stock";

                        return (
                            <Card key={product._id || product.id} className="overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                                <div className="aspect-4/3 bg-muted relative overflow-hidden">
                                     {mainImg.startsWith('http') ? (
                                        <img src={mainImg} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    ) : <div className="w-full h-full flex items-center justify-center text-5xl">{mainImg}</div>}
                                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                                        <Badge variant={getStatusColor(status) as any} className="shadow-sm">
                                            {status}
                                        </Badge>
                                    </div>
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <div className="flex gap-2 w-full">
                                            <Button size="sm" variant="secondary" className="flex-1" onClick={() => handleViewDetails(product)}>
                                                <Eye className="h-4 w-4 mr-2" /> View
                                            </Button>
                                            <Button size="sm" className="flex-1" onClick={() => handleEditProduct(product)}>
                                                <Edit2 className="h-4 w-4 mr-2" /> Edit
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.category}</span>
                                        <span className="text-[10px] font-mono text-muted-foreground">{product.sku}</span>
                                    </div>
                                    <h4 className="font-bold text-sm mb-2 line-clamp-1 group-hover:text-primary transition-colors">{product.title}</h4>
                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground">Starting from</span>
                                            <span className="text-lg font-black">${minPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] text-muted-foreground block">{totalStock} in stock</span>
                                            <span className="text-[10px] font-medium text-emerald-600">{product.brand}</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
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
                                         {selectedProduct.images?.[0]?.url.startsWith('http') ? (
                                            <img src={selectedProduct.images[0].url} alt={selectedProduct.title} className="h-full w-full object-cover" />
                                        ) : <Package className="h-12 w-12 text-muted-foreground opacity-30" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <Badge variant="outline" className="mb-2 text-primary border-primary/20 bg-primary/5">{selectedProduct.category}</Badge>
                                            <span className="text-xs font-mono text-muted-foreground">SKU: {selectedProduct.sku}</span>
                                        </div>
                                        <DialogTitle className="text-3xl font-bold">{selectedProduct.title}</DialogTitle>
                                        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{selectedProduct.shortDescription}</p>
                                    </div>
                                </div>
                            </DialogHeader>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                                <Card className="p-5 bg-muted/20 border-none">
                                    <h5 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Stock & Pricing</h5>
                                    <div className="space-y-4">
                                        {selectedProduct.sizes?.map((size: any, i: number) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-background border shadow-sm">
                                                <div>
                                                    <p className="font-bold">{size.size}</p>
                                                    <p className="text-xs text-muted-foreground">{size.qty} available</p>
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
                                            <span className="text-sm font-bold">{selectedProduct.brand}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-sm text-muted-foreground">Vendor Partner</span>
                                            <span className="text-sm font-bold">{selectedProduct.vendor}</span>
                                        </div>
                                        <div className="flex justify-between border-b pb-2">
                                            <span className="text-sm text-muted-foreground">Discount</span>
                                            <span className="text-sm font-bold text-red-500">{selectedProduct.discount}% OFF</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-sm text-muted-foreground">Featured</span>
                                            <Badge variant={selectedProduct.isFeatured ? "success" : "secondary"}>
                                                {selectedProduct.isFeatured ? "Yes" : "No"}
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
                                            {selectedProduct.benefits?.map((b: string, i: number) => (
                                                <li key={i} className="text-xs flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                                                    {b}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Ingredients</h5>
                                        <p className="text-xs text-muted-foreground leading-relaxed bg-muted/40 p-3 rounded-lg">
                                            {selectedProduct.ingredients?.join(", ")}
                                        </p>
                                    </div>
                                </div>
                                
                                <div>
                                    <h5 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Product Media Gallery</h5>
                                    <div className="grid grid-cols-4 gap-3">
                                        {selectedProduct.images?.map((img: any, i: number) => (
                                            <div key={i} className="aspect-square rounded-xl border overflow-hidden bg-muted group relative">
                                                <img src={img.url} alt="Gallery" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                            </div>
                                        ))}
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
