"use client";

import { useState } from "react";
import {
    Search,
    AlertTriangle,
    ArrowUpRight,
    // ArrowDownRight,
    Package,
    History,
    RefreshCcw,
    Filter,
    MoreHorizontal,
    Plus,
    Download,
    // Trash2,
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
import { toast } from "@/components/ui/toaster";

// Mock Data
const initialInventory = [
    {
        sku: "SH-BG-001",
        name: "Premium Leather Backpack",
        inStock: 45,
        committed: 12,
        available: 33,
        status: "Healthy",
        lastRestocked: "2024-01-15",
    },
    {
        sku: "SH-HP-992",
        name: "Wireless Headphones",
        inStock: 12,
        committed: 5,
        available: 7,
        status: "Warning",
        lastRestocked: "2023-12-20",
    },
    {
        sku: "SH-WT-112",
        name: "Fitness Smartwatch",
        inStock: 0,
        committed: 0,
        available: 0,
        status: "Critical",
        lastRestocked: "2023-11-30",
    },
];

export default function InventoryPage() {
    const [inventory, setInventory] = useState(initialInventory);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal States
    const [isAdjustOpen, setIsAdjustOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isMissingOpen, setIsMissingOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const filteredInventory = inventory.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdjustStock = (item: any) => {
        setSelectedItem(item);
        setIsAdjustOpen(true);
    };

    const handleMarkMissing = (item: any) => {
        setSelectedItem(item);
        setIsMissingOpen(true);
    };

    const handleExport = () => {
        toast({
            title: "Export Started",
            description: "Your inventory report is being generated and will download shortly.",
            variant: "info",
        });
    };

    const handleStockHistory = () => {
        toast({
            title: "Stock History",
            description: "Fetching historical inventory data for the last 30 days...",
            variant: "info",
        });
    };

    const confirmAdjustment = () => {
        setIsAdjustOpen(false);
        toast({
            title: "Stock Adjusted",
            description: `Successfully updated stock levels for ${selectedItem?.name}.`,
            variant: "success",
        });
    };

    const confirmAdd = () => {
        setIsAddOpen(false);
        toast({
            title: "Item Added",
            description: "New inventory item has been created successfully.",
            variant: "success",
        });
    };

    const confirmMissing = () => {
        setIsMissingOpen(false);
        toast({
            title: "Reported Missing",
            description: `A loss report has been filed for ${selectedItem?.name}.`,
            variant: "warning",
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
                    <p className="text-muted-foreground mt-1">
                        Track stock levels, monitor committed items, and manage restocks
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleStockHistory}>
                        <History className="h-4 w-4 mr-2" />
                        Stock History
                    </Button>
                    <Button variant="gradient" onClick={() => setIsAddOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Item
                    </Button>
                </div>
            </div>

            {/* Inventory Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="relative overflow-hidden group">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Stock Value</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold">$142,500.00</div>
                        <div className="flex items-center text-xs text-green-500 mt-2 font-bold">
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                            +12.5% from last month
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative overflow-hidden group border-amber-500/20 bg-amber-500/5">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">Low Stock Alerts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">12 Items</div>
                        <div className="flex items-center text-xs text-muted-foreground mt-2 font-medium">
                            Requires immediate restock action
                        </div>
                    </CardContent>
                </Card>
                <Card className="relative overflow-hidden group border-red-500/20 bg-red-500/5">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-red-600 dark:text-red-400 uppercase tracking-wider">Out of Stock</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-extrabold text-red-600 dark:text-red-400">3 Items</div>
                        <div className="flex items-center text-xs text-muted-foreground mt-2 font-medium">
                            Losing potential revenue
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Inventory List */}
            <Card className="overflow-hidden">
                <div className="p-4 border-b flex flex-col sm:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full sm:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by SKU or Product Name..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleExport}>
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button variant="outline" size="sm">
                            <Filter className="h-4 w-4 mr-2" />
                            Filters
                        </Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-muted/30">
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Product Detail</th>
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">SKU</th>
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">On Hand</th>
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Committed</th>
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Available</th>
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                                <th className="p-4 text-right font-medium text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredInventory.map((item) => (
                                <tr key={item.sku} className="hover:bg-muted/30 transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                                                <Package className="h-4 w-4 text-primary" />
                                            </div>
                                            <span className="font-medium text-sm">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-xs font-mono text-muted-foreground">{item.sku}</td>
                                    <td className="p-4 text-sm font-bold">{item.inStock}</td>
                                    <td className="p-4 text-sm text-muted-foreground">{item.committed}</td>
                                    <td className="p-4 text-sm font-bold text-primary">{item.available}</td>
                                    <td className="p-4">
                                        <Badge
                                            variant={item.status === 'Healthy' ? 'success' : item.status === 'Warning' ? 'warning' : 'destructive'}
                                            className="font-bold text-[10px]"
                                        >
                                            {item.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleAdjustStock(item)}>
                                                    <RefreshCcw className="h-3.5 w-3.5 mr-2" />
                                                    Adjust Stock
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={handleStockHistory}>
                                                    <History className="h-3.5 w-3.5 mr-2" />
                                                    View History
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive" onClick={() => handleMarkMissing(item)}>
                                                    <AlertTriangle className="h-3.5 w-3.5 mr-2" />
                                                    Mark Missing
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

            {/* Add New Item Modal */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Inventory Item</DialogTitle>
                        <DialogDescription>
                            Create a new entry in your stock management system.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="new-name">Product Name</Label>
                            <Input id="new-name" placeholder="e.g. Silk Scarf" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="new-sku">SKU Code</Label>
                            <Input id="new-sku" placeholder="e.g. SH-SS-001" className="font-mono uppercase" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="initial-stock">Initial Stock</Label>
                                <Input id="initial-stock" type="number" defaultValue="0" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="reorder-point">Reorder Point</Label>
                                <Input id="reorder-point" type="number" defaultValue="10" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                        <Button variant="gradient" onClick={confirmAdd}>Add Item</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Stock Adjustment Modal */}
            <Dialog open={isAdjustOpen} onOpenChange={setIsAdjustOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Adjust Stock Levels</DialogTitle>
                        <DialogDescription>
                            Manually update the inventory for <strong>{selectedItem?.name}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                            <div className="text-sm">Current On Hand</div>
                            <div className="text-lg font-bold">{selectedItem?.inStock}</div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="adjustment-type">Adjustment Type</Label>
                            <Select defaultValue="add">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="add">Add Stock (+)</SelectItem>
                                    <SelectItem value="remove">Remove Stock (-)</SelectItem>
                                    <SelectItem value="set">Set Exact Count (=)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input id="quantity" type="number" placeholder="Enter amount" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="reason">Reason for Adjustment</Label>
                            <Select defaultValue="restock">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select reason" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="restock">New Shipment / Restock</SelectItem>
                                    <SelectItem value="return">Customer Return</SelectItem>
                                    <SelectItem value="damage">Damaged Goods</SelectItem>
                                    <SelectItem value="audit">Inventory Audit Correction</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAdjustOpen(false)}>Cancel</Button>
                        <Button variant="gradient" onClick={confirmAdjustment}>Apply Adjustment</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Mark Missing Confirmation */}
            <Dialog open={isMissingOpen} onOpenChange={setIsMissingOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="h-5 w-5" />
                            Report Missing Stock
                        </DialogTitle>
                        <DialogDescription>
                            This will record a discrepancy for <strong>{selectedItem?.name}</strong>. This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="missing-qty">Quantity Missing</Label>
                            <Input id="missing-qty" type="number" placeholder="e.g. 1" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="missing-note">Incident Note</Label>
                            <Input id="missing-note" placeholder="Explain what happened..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsMissingOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmMissing}>Report Loss</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
