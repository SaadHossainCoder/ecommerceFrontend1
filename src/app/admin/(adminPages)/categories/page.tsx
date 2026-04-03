"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card} from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toaster";

// Mock Data structure with nested subcategories
const initialCategories = [
    {
        id: 1,
        name: "Electronics",
        slug: "electronics",  
        icon: "💻",
        productCount: 156,
        subcategories: [
            { id: 101, name: "Smartphones", slug: "smartphones", productCount: 45 },
            { id: 102, name: "Laptops", slug: "laptops", productCount: 32 },
            { id: 103, name: "Accessories", slug: "accessories", productCount: 79 },
        ]
    },
    {
        id: 2,
        name: "Fashion",
        slug: "fashion",
        icon: "👗",
        productCount: 243,
        subcategories: [
            { id: 201, name: "Men's Wear", slug: "mens-wear", productCount: 110 },
            { id: 202, name: "Women's Wear", slug: "womens-wear", productCount: 95 },
            { id: 203, name: "Footwear", slug: "footwear", productCount: 38 },
        ]
    },
];

export default function CategoriesPage() {
    const [categories, setCategories] = useState(initialCategories);
    const [expandedIds, setExpandedIds] = useState<number[]>([1]);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal States
    const [isAddMainOpen, setIsAddMainOpen] = useState(false);
    const [isAddSubOpen, setIsAddSubOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const [editingItem, setEditingItem] = useState<any>(null);
    const [editingType, setEditingType] = useState<"main" | "sub">("main");
    const [activeMainId, setActiveMainId] = useState<number | null>(null);

    const toggleExpand = (id: number) => {
        setExpandedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleEditMain = (category: any) => {
        setEditingType("main");
        setEditingItem(category);
        setIsEditOpen(true);
    };

    const handleEditSub = (sub: any) => {
        setEditingType("sub");
        setEditingItem(sub);
        setIsEditOpen(true);
    };

    const handleDeleteClick = (item: any, type: "main" | "sub") => {
        setEditingType(type);
        setEditingItem(item);
        setIsDeleteOpen(true);
    };

    const confirmSave = () => {
        setIsEditOpen(false);
        setIsAddMainOpen(false);
        setIsAddSubOpen(false);
        toast({
            title: "Changes Saved",
            description: "Category structure has been updated successfully.",
            variant: "success",
        });
    };

    const confirmDelete = () => {
        setIsDeleteOpen(false);
        toast({
            title: "Category Removed",
            description: `Permanently deleted ${editingItem?.name}. All associations cleared.`,
            variant: "destructive",
        });
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.subcategories.some(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                    <p className="text-muted-foreground mt-1">
                        Organize your products with main categories and subcategories
                    </p>
                </div>
                <Button variant="gradient" onClick={() => setIsAddMainOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Main Category
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <LayoutGrid className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Main Categories</p>
                            <h3 className="text-2xl font-bold">{categories.length}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl">
                            <Tag className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Total Subcategories</p>
                            <h3 className="text-2xl font-bold">
                                {categories.reduce((acc, cat) => acc + cat.subcategories.length, 0)}
                            </h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                            <ImageIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Categorized Products</p>
                            <h3 className="text-2xl font-bold">
                                {categories.reduce((acc, cat) => acc + cat.productCount, 0)}
                            </h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search & Filter */}
            <Card className="p-4">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search categories..."
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </Card>

            {/* Categories List */}
            <div className="space-y-4">
                <>
                    {filteredCategories.map((category) => (
                        <Card key={category.id} className="overflow-hidden border-l-4 border-l-primary">
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                                onClick={() => toggleExpand(category.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-2xl h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                                        {category.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold">{category.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <span>{category.subcategories.length} subcategories</span>
                                            <span>•</span>
                                            <span>{category.productCount} products</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => handleEditMain(category)}>
                                                <Edit2 className="h-3.5 w-3.5 mr-2" />
                                                Edit Category
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(category, "main")}>
                                                <Trash2 className="h-3.5 w-3.5 mr-2" />
                                                Delete Category
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    {expandedIds.includes(category.id) ? (
                                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                    ) : (
                                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>
                            </div>

                            <>
                                {expandedIds.includes(category.id) && (
                                    <div
                                        className="border-t bg-muted/20"
                                    >
                                        <div className="p-4 space-y-3">
                                            <div className="flex items-center justify-between px-2 mb-2">
                                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                                    Subcategories
                                                </h4>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 py-0"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveMainId(category.id);
                                                        setIsAddSubOpen(true);
                                                    }}
                                                >
                                                    <Plus className="h-3 w-3 mr-1" />
                                                    Add Sub
                                                </Button>
                                            </div>
                                            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                                                {category.subcategories.map((sub) => (
                                                    <div
                                                        key={sub.id}
                                                        className="flex items-center justify-between p-3 rounded-lg bg-card border hover:border-primary/50 transition-colors"
                                                    >
                                                        <div>
                                                            <p className="font-medium text-sm">{sub.name}</p>
                                                            <p className="text-xs text-muted-foreground">{sub.productCount} products</p>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleEditSub(sub)}>
                                                                <Edit2 className="h-3.5 w-3.5" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDeleteClick(sub, "sub")}>
                                                                <Trash2 className="h-3.5 w-3.5" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        </Card>
                    ))}
                </>
            </div>

            {/* Management Dialogs */}
            <Dialog open={isAddMainOpen} onOpenChange={setIsAddMainOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Main Category</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="main-name">Name</Label>
                            <Input id="main-name" placeholder="e.g. Home Appliances" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="main-icon">Emoji Icon</Label>
                            <Input id="main-icon" placeholder="🏠" maxLength={2} className="w-20 text-center text-xl" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddMainOpen(false)}>Cancel</Button>
                        <Button variant="gradient" onClick={confirmSave}>Create Category</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isAddSubOpen} onOpenChange={setIsAddSubOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Subcategory</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="sub-name">Name</Label>
                            <Input id="sub-name" placeholder="e.g. Washers & Dryers" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddSubOpen(false)}>Cancel</Button>
                        <Button variant="gradient" onClick={confirmSave}>Create Subcategory</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit {editingType === 'main' ? 'Category' : 'Subcategory'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="edit-name">Name</Label>
                            <Input id="edit-name" defaultValue={editingItem?.name} />
                        </div>
                        {editingType === 'main' && (
                            <div className="grid gap-2">
                                <Label htmlFor="edit-icon">Emoji Icon</Label>
                                <Input id="edit-icon" defaultValue={editingItem?.icon} maxLength={2} className="w-20 text-center text-xl" />
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                        <Button variant="gradient" onClick={confirmSave}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <strong>{editingItem?.name}</strong>?
                            {editingType === 'main' && " This will also affect its subcategories."}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete}>Confirm Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
