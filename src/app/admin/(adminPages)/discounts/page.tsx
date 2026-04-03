"use client";

import { useState } from "react";
import {
    Plus,
    Search,
    Ticket,
    Calendar,
    Percent,
    // ArrowRight,
    Copy,
    Trash2,
    MoreHorizontal,
    Tag,
    Edit2,
    BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card, CardContent,
    //  CardHeader,
    CardTitle
} from "@/components/ui/card";
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
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toaster";

// Mock Data
const initialDiscounts = [
    {
        id: 1,
        code: "WELCOME20",
        type: "Percentage",
        value: "20",
        usage: 145,
        status: "Active",
        expiry: "2024-12-31",
    },
    {
        id: 2,
        code: "SUMMER50",
        type: "Fixed Amount",
        value: "50",
        usage: 89,
        status: "Active",
        expiry: "2024-08-31",
    },
    {
        id: 3,
        code: "BLACKFRIDAY",
        type: "Percentage",
        value: "40",
        usage: 1240,
        status: "Expired",
        expiry: "2023-11-30",
    },
];

export default function DiscountsPage() {
    const [discounts, setDiscounts] = useState(initialDiscounts);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal States
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editingDiscount, setEditingDiscount] = useState<any>(null);

    const filteredDiscounts = discounts.filter((d) =>
        d.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateDiscount = () => {
        setEditingDiscount(null);
        setIsAddEditOpen(true);
    };

    const handleEditDiscount = (discount: any) => {
        setEditingDiscount(discount);
        setIsAddEditOpen(true);
    };

    const handleDeleteClick = (discount: any) => {
        setEditingDiscount(discount);
        setIsDeleteOpen(true);
    };

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        toast({
            title: "Code Copied",
            description: `"${code}" has been copied to your clipboard.`,
            variant: "success",
        });
    };

    const handleViewReport = (discount: any) => {
        toast({
            title: "Performance Report",
            description: `Loading analytics for campaign ${discount.code}...`,
            variant: "info",
        });
    };

    const handleGenerateCode = () => {
        toast({
            title: "Code Generated",
            description: "A random high-security voucher code has been created.",
            variant: "info",
        });
    };

    const confirmSave = () => {
        setIsAddEditOpen(false);
        toast({
            title: editingDiscount ? "Campaign Updated" : "Campaign Created",
            description: "Discount settings have been synchronized.",
            variant: "success",
        });
    };

    const confirmDelete = () => {
        setIsDeleteOpen(false);
        toast({
            title: "Discount Deleted",
            description: "The promotional campaign has been retired.",
            variant: "destructive",
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Discounts & Coupons</h1>
                    <p className="text-muted-foreground mt-1">
                        Create and manage promotional codes to drive more sales
                    </p>
                </div>
                <Button variant="gradient" onClick={handleCreateDiscount}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Discount
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-primary text-primary-foreground">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium opacity-80">Total Usage</p>
                                <h3 className="text-3xl font-bold mt-1">1,474</h3>
                            </div>
                            <div className="p-3 bg-white/20 rounded-xl">
                                <Ticket className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 text-green-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                                <h3 className="text-3xl font-bold mt-1">12</h3>
                            </div>
                            <div className="p-3 bg-green-500/10 rounded-xl">
                                <Tag className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6 text-blue-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Savings Provided</p>
                                <h3 className="text-3xl font-bold mt-1">$4.2k</h3>
                            </div>
                            <div className="p-3 bg-blue-500/10 rounded-xl">
                                <Percent className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Coupons List */}
            <Card className="overflow-hidden">
                <div className="p-4 border-b flex items-center justify-between">
                    <CardTitle className="text-lg">Active Coupons</CardTitle>
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search codes..."
                            className="pl-9 h-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="divide-y">
                    {filteredDiscounts.map((discount) => (
                        <div key={discount.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="font-mono font-bold text-lg">{discount.code}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={() => handleCopyCode(discount.code)}
                                        >
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                        <span>{discount.type}</span>
                                        <span>•</span>
                                        <span className="text-foreground font-bold">{discount.type === 'Percentage' ? `${discount.value}%` : `$${discount.value}`} off</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-sm font-bold">{discount.usage} uses</span>
                                    <span className="text-xs text-muted-foreground">Expires: {discount.expiry}</span>
                                </div>
                                <Badge variant={discount.status === 'Active' ? 'success' : 'secondary'}>
                                    {discount.status}
                                </Badge>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleEditDiscount(discount)}>
                                            <Edit2 className="h-3.5 w-3.5 mr-2" />
                                            Edit Discount
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleViewReport(discount)}>
                                            <BarChart3 className="h-3.5 w-3.5 mr-2" />
                                            View Report
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(discount)}>
                                            <Trash2 className="h-3.5 w-3.5 mr-2" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Create/Edit Discount Modal */}
            <Dialog open={isAddEditOpen} onOpenChange={setIsAddEditOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingDiscount ? "Edit Discount Coupon" : "Create New Discount"}</DialogTitle>
                        <DialogDescription>
                            Set up promotional codes to attract more customers.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="coupon-code" className="font-bold">Coupon Code</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="coupon-code"
                                    className="uppercase font-mono font-bold"
                                    defaultValue={editingDiscount?.code}
                                    placeholder="e.g. SUMMER2024"
                                />
                                <Button variant="outline" size="sm" type="button" onClick={handleGenerateCode}>Generate</Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="discount-type">Discount Type</Label>
                                <Select defaultValue={editingDiscount?.type || "Percentage"}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Percentage">Percentage (%)</SelectItem>
                                        <SelectItem value="Fixed Amount">Fixed Amount ($)</SelectItem>
                                        <SelectItem value="Free Shipping">Free Shipping</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="discount-value">Value</Label>
                                <Input id="discount-value" type="number" defaultValue={editingDiscount?.value} placeholder="0" />
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="expiry-date">Expiry Date</Label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                                    <Input id="expiry-date" type="date" className="pl-9" defaultValue={editingDiscount?.expiry} />
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="usage-limit">Usage Limit</Label>
                                <Input id="usage-limit" type="number" placeholder="Unlimited" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>Cancel</Button>
                        <Button variant="gradient" onClick={confirmSave}>
                            {editingDiscount ? "Update Coupon" : "Create Coupon"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Delete Discount Campaign</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <strong>{editingDiscount?.code}</strong>? This will immediately invalidate the code for all customers.
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
