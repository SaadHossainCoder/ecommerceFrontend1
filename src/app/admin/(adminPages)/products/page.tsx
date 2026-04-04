"use client";

import { useState } from "react";
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
    Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toaster";
import EditProductForm from "./_components/addProduct";
// import Link from "next/link";

// Mock Data
const initialProducts = [
    {
        id: "PRD-001",
        name: "Premium Leather Backpack",
        category: "Fashion",
        price: 129.99,
        stock: 45,
        status: "Published",
        image: "🎒",
        sales: 124,
        description: "High-quality leather backpack for daily use.",
    },
    {
        id: "PRD-002",
        name: "Wireless Noise Cancelling Headphones",
        category: "Electronics",
        price: 249.99,
        stock: 12,
        status: "Low Stock",
        image: "🎧",
        sales: 89,
        description: "Immersive sound experience with active noise cancellation.",
    },
    {
        id: "PRD-003",
        name: "Smart Fitness Watch",
        category: "Electronics",
        price: 199.99,
        stock: 0,
        status: "Out of Stock",
        image: "⌚",
        sales: 231,
        description: "Track your fitness goals with precision.",
    },
];

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
    const [products, setProducts] = useState(initialProducts);
    const [viewMode, setViewMode] = useState<"grid" | "table">("table");
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");

    // Modal States
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const handleEditProduct = (product: any) => {
        setEditingProduct(product);
        setIsAddEditOpen(true);
    };

    const handleDeleteClick = (product: any) => {
        setEditingProduct(product);
        setIsDeleteOpen(true);
    };

    const handleExport = () => {
        toast({
            title: "Export Initiated",
            description: "Generating CSV for your selected products...",
            variant: "info",
        });
    };

    const handlePreview = (product: any) => {
        toast({
            title: "Preview Mode",
            description: `Opening public view for ${product.name}.`,
            variant: "info",
        });
    };

    const confirmSave = () => {
        setIsAddEditOpen(false);
        toast({
            title: editingProduct?.id ? "Product Updated" : "Product Created",
            description: `${editingProduct?.id ? "Changes saved" : "New product added"} successfully.`,
            variant: "success",
        });
    };

    const handleSaveProduct = (data: any) => {
        console.log("Saving product:", data);
        confirmSave();
    };

    const confirmDelete = () => {
        setIsDeleteOpen(false);
        toast({
            title: "Product Deleted",
            description: `${editingProduct?.name} has been removed from the catalog.`,
            variant: "destructive",
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your store&apos;s inventory and product catalog
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="hidden sm:flex" onClick={handleExport}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button variant="gradient" onClick={() => {
                        setEditingProduct(null);
                        setIsAddEditOpen(true);
                    }}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Product
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Total Products</p>
                            <h3 className="text-xl font-bold">573</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <Package className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Active Now</p>
                            <h3 className="text-xl font-bold">542</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/10 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Low Stock</p>
                            <h3 className="text-xl font-bold">12</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Out of Stock</p>
                            <h3 className="text-xl font-bold">3</h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search & Filters */}
            <Card className="p-4">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex flex-1 items-center gap-4">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products..."
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
                                <SelectItem value="Fashion">Fashion</SelectItem>
                                <SelectItem value="Electronics">Electronics</SelectItem>
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

            {/* Products List */}
            {viewMode === "table" ? (
                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-muted/30">
                                    <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Product</th>
                                    <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Category</th>
                                    <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Price</th>
                                    <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Stock</th>
                                    <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Sales</th>
                                    <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                                    <th className="p-4 text-right font-medium text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {filteredProducts.map((product) => (
                                    <tr
                                        key={product.id}
                                        className="hover:bg-muted/30 transition-colors"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xl">
                                                    {product.image}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                                                    <p className="text-xs text-muted-foreground font-mono">{product.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant="outline" className="font-normal">{product.category}</Badge>
                                        </td>
                                        <td className="p-4 font-medium text-sm">
                                            ${product.price.toFixed(2)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`h-1.5 w-1.5 rounded-full ${product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-yellow-500" : "bg-red-500"}`} />
                                                <span className="text-sm">{product.stock} in stock</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm text-muted-foreground">
                                            {product.sales}
                                        </td>
                                        <td className="p-4">
                                            <Badge variant={getStatusColor(product.status) as any}>
                                                {product.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40">
                                                    <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                                                        <Edit2 className="h-3.5 w-3.5 mr-2" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handlePreview(product)}>
                                                        <Eye className="h-3.5 w-3.5 mr-2" />
                                                        Preview
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(product)}>
                                                        <Trash2 className="h-3.5 w-3.5 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} className="overflow-hidden group hover:border-primary/50 transition-all">
                            <div className="aspect-square bg-muted flex items-center justify-center text-4xl relative">
                                {product.image}
                                <div className="absolute top-2 right-2">
                                    <Badge variant={getStatusColor(product.status) as any}>
                                        {product.status}
                                    </Badge>
                                </div>
                            </div>
                            <CardContent className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{product.category}</p>
                                        <h4 className="font-bold text-sm line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h4>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-7 w-7">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                                                <Edit2 className="h-3.5 w-3.5 mr-2" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(product)}>
                                                <Trash2 className="h-3.5 w-3.5 mr-2" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p className="font-bold">${product.price.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground">{product.stock} in stock</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}


            {/* Add/Edit Product Modal */}
            <Dialog 
                open={isAddEditOpen} 
                onOpenChange={(open) => {
                    setIsAddEditOpen(open);
                    if (!open) setEditingProduct(null);
                }}
            >
                <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto ">
                    <DialogHeader>
                        <DialogTitle>
                            {editingProduct?.id ? "Edit Product" : "Add New Product"}
                        </DialogTitle>
                    </DialogHeader>
                    <EditProductForm
                        onClose={() => setIsAddEditOpen(false)}
                        onSave={handleSaveProduct}
                        initialData={editingProduct}
                    />
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-destructive">
                            <Trash2 className="h-5 w-5" />
                            Delete Product
                        </DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <strong>{editingProduct?.name}</strong>? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete}>Delete Permanently</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
