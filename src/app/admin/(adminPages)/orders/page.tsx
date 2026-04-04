"use client";

import { useState } from "react";
import {
    Search,
    MoreHorizontal,
    Eye,
    Truck,
    Package,
    CheckCircle2,
    Clock,
    XCircle,
    // Filter,
    Download,
    // ClipboardList,
    Printer,
    Archive,
    Ban,
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/toaster";
import { OrderInvoice } from "../../_components/OrderInvoice";
import OrderDetailDialog from "./_components/OrderDetailDialog";

const ordersData = [
    { id: "SH-001234", customer: "John Doe", email: "john@example.com", items: 3, amount: 749.97, status: "Completed", date: "2024-01-15", address: "123 Main St, New York, NY 10001" },
    { id: "SH-001233", customer: "Jane Smith", email: "jane@example.com", items: 2, amount: 549.98, status: "Processing", date: "2024-01-15", address: "456 Oak Ave, Los Angeles, CA 90001" },
    { id: "SH-001232", customer: "Bob Wilson", email: "bob@example.com", items: 1, amount: 159.99, status: "Pending", date: "2024-01-14", address: "789 Pine Rd, Chicago, IL 60007" },
    { id: "SH-001231", customer: "Alice Brown", email: "alice@example.com", items: 4, amount: 389.96, status: "Shipped", date: "2024-01-14", address: "321 Elm Blvd, Houston, TX 77001" },
    { id: "SH-001230", customer: "Charlie Davis", email: "charlie@example.com", items: 2, amount: 249.98, status: "Cancelled", date: "2024-01-13", address: "654 Maple Dr, Phoenix, AZ 85001" },
];

const orderItems = [
    { id: 1, name: "Wireless Headphones", price: 299.99, quantity: 1, image: "🎧" },
    { id: 2, name: "Smart Watch Pro", price: 449.99, quantity: 2, image: "⌚" },
    { id: 3, name: "Hand-Woven Silk Scarf", price: 129.99, quantity: 1, image: "🧣" },
    { id: 4, name: "Hand-Carved Wooden Box", price: 89.99, quantity: 1, image: "📦" },
];

const getStatusConfig = (status: string) => {
    switch (status) {
        case "Completed":
            return { color: "success" as const, icon: CheckCircle2, bg: "bg-success/10 text-success" };
        case "Processing":
            return { color: "default" as const, icon: Package, bg: "bg-primary/10 text-primary" };
        case "Pending":
            return { color: "warning" as const, icon: Clock, bg: "bg-warning/10 text-warning" };
        case "Shipped":
            return { color: "secondary" as const, icon: Truck, bg: "bg-blue-500/10 text-blue-500" };
        case "Cancelled":
            return { color: "destructive" as const, icon: XCircle, bg: "bg-destructive/10 text-destructive" };
        default:
            return { color: "default" as const, icon: Package, bg: "bg-muted" };
    }
};

export default function AllOrdersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Modal States
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isUpdateStatusOpen, setIsUpdateStatusOpen] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);

    const filteredOrders = ordersData.filter((order) => {
        const matchesSearch =
            order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleViewDetail = (order: any) => {
        setSelectedOrder(order);
        setIsDetailOpen(true);
    };

    const handleUpdateStatus = (order: any) => {
        setSelectedOrder(order);
        setIsUpdateStatusOpen(true);
    };

    const handleCancelClick = (order: any) => {
        setSelectedOrder(order);
        setIsCancelOpen(true);
    };

    const handleArchiveClick = (order: any) => {
        setSelectedOrder(order);
        setIsArchiveOpen(true);
    };

    const handleExport = () => {
        toast({
            title: "Exporting List",
            description: "A secure manifest is being generated for your local storage.",
            variant: "info",
        });
    };

    const handlePrintInvoice = (order: any) => {
        setSelectedOrder(order);
        // Small delay to ensure state update propagates if needed, though window.print is synchronous
        setTimeout(() => {
            window.print();
        }, 100);

        toast({
            title: "Preparing Document",
            description: `Invoice for ${order.id} is being formatted for the system printer.`,
            variant: "info",
        });
    };

    const confirmStatusUpdate = () => {
        setIsUpdateStatusOpen(false);
        toast({
            title: "Status Synchronized",
            description: "Order timeline updated. Notification sent to customer.",
            variant: "success",
        });
    };

    const confirmCancel = () => {
        setIsCancelOpen(false);
        toast({
            title: "Order Voided",
            description: "The order has transit to Canceled status. Refund initiated if applicable.",
            variant: "destructive",
        });
    };

    const confirmArchive = () => {
        setIsArchiveOpen(false);
        toast({
            title: "Order Archived",
            description: "Record has been moved to long-term storage.",
            variant: "success",
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage and track customer orders in real-time
                    </p>
                </div>
                <Button variant="outline" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Orders
                </Button>
            </div>

            {/* Status Tabs */}
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
                <TabsList className="bg-muted/50 p-1 rounded-xl h-auto flex-wrap">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="Pending">Pending</TabsTrigger>
                    <TabsTrigger value="Processing">Processing</TabsTrigger>
                    <TabsTrigger value="Shipped">Shipped</TabsTrigger>
                    <TabsTrigger value="Completed">Completed</TabsTrigger>
                    <TabsTrigger value="Cancelled">Cancelled</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Search */}
            <Card className="p-4 border-none bg-muted/30">
                <div className="flex gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search order ID or customer name..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </Card>

            {/* Orders Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-muted/30">
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Order ID</th>
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Customer</th>
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Amount</th>
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Date</th>
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                                <th className="p-4 text-right font-medium text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredOrders.map((order) => {
                                const statusConfig = getStatusConfig(order.status);
                                return (
                                    <tr key={order.id} className="hover:bg-muted/30 transition-colors group">
                                        <td className="p-4">
                                            <span className="font-mono font-bold text-sm">{order.id}</span>
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <p className="font-bold text-sm">{order.customer}</p>
                                                <p className="text-xs text-muted-foreground">{order.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 font-bold text-sm">${order.amount.toFixed(2)}</td>
                                        <td className="p-4 text-xs text-muted-foreground">{order.date}</td>
                                        <td className="p-4">
                                            <Badge variant={statusConfig.color} className="text-[10px] uppercase font-bold tracking-wider">
                                                {order.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-44">
                                                    <DropdownMenuItem onClick={() => handleViewDetail(order)}>
                                                        <Eye className="h-3.5 w-3.5 mr-2" />
                                                        View Recap
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleUpdateStatus(order)}>
                                                        <Truck className="h-3.5 w-3.5 mr-2" />
                                                        Update Status
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handlePrintInvoice(order)}>
                                                        <Printer className="h-3.5 w-3.5 mr-2" />
                                                        Print Invoice
                                                    </DropdownMenuItem>
                                                    <Separator className="my-1" />
                                                    <DropdownMenuItem onClick={() => handleArchiveClick(order)}>
                                                        <Archive className="h-3.5 w-3.5 mr-2" />
                                                        Archive Order
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive font-medium" onClick={() => handleCancelClick(order)}>
                                                        <Ban className="h-3.5 w-3.5 mr-2" />
                                                        Void Order
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

            {/* Recurrent Modals */}
            {/* <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="flex justify-between items-center">
                            <span>Order Summary</span>
                            <Badge variant={selectedOrder ? getStatusConfig(selectedOrder.status).color : 'default'}>
                                {selectedOrder?.status}
                            </Badge>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4 text-sm">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label className="text-[10px] uppercase text-muted-foreground font-bold">Contact info</Label>
                                <p className="font-bold">{selectedOrder?.customer}</p>
                                <p className="text-muted-foreground">{selectedOrder?.email}</p>
                            </div>
                            <div>
                                <Label className="text-[10px] uppercase text-muted-foreground font-bold">Delivery destination</Label>
                                <p className="text-xs leading-relaxed">{selectedOrder?.address}</p>
                            </div>
                        </div>
                        <Separator />
                        <div className="space-y-3">
                            <Label className="text-[10px] uppercase text-muted-foreground font-bold">Included artifacts</Label>
                            {orderItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-3 bg-muted/20 p-2 rounded-xl border">
                                    <div className="h-10 w-10 border flex items-center justify-center text-xl rounded-lg">{item.image}</div>
                                    <div className="flex-1">
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">Count: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold">${item.price}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total Revenue</span>
                                <span className="text-primary">${selectedOrder?.amount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog> */}
            <OrderDetailDialog
                isOpen={isDetailOpen}
                onClose={() => setIsDetailOpen(false)}
                selectedOrder={selectedOrder ? { ...selectedOrder, items: Array.isArray(selectedOrder.items) ? selectedOrder.items : orderItems } : null}
            />

            <Dialog open={isUpdateStatusOpen} onOpenChange={setIsUpdateStatusOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Synchronize Order Flow</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>Operational Phase</Label>
                            <Select defaultValue={selectedOrder?.status}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pending">Pending Queue</SelectItem>
                                    <SelectItem value="Processing">Active Synthesis</SelectItem>
                                    <SelectItem value="Shipped">In Distribution</SelectItem>
                                    <SelectItem value="Completed">Vaulted / Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label>Carrier Identification</Label>
                            <Input placeholder="Enter Shipment ID" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsUpdateStatusOpen(false)}>Abort</Button>
                        <Button variant="gradient" onClick={confirmStatusUpdate}>Execute Update</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Destruction Confirmations */}
            <Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Void Transaction</DialogTitle>
                        <DialogDescription>
                            Are you certain you wish to void Order <strong>{selectedOrder?.id}</strong>? All pending shipments will be halted.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsCancelOpen(false)}>Back</Button>
                        <Button variant="destructive" onClick={confirmCancel}>Void Order</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isArchiveOpen} onOpenChange={setIsArchiveOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle>Move to Archives</DialogTitle>
                        <DialogDescription>
                            This will relocate Order <strong>{selectedOrder?.id}</strong> to historical storage.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsArchiveOpen(false)}>Skip</Button>
                        <Button variant="gradient" onClick={confirmArchive}>Archive Now</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Print Optimized Invoice Component */}
            <OrderInvoice order={selectedOrder} items={orderItems} />

            <style jsx global>{`
                @media print {
                    body > *:not(.print-container) {
                        display: none !important;
                    }
                    .print-container {
                        display: block !important;
                    }
                    /* Hide everything in the main layout */
                    header, nav, aside, footer, .no-print {
                        display: none !important;
                    }
                    /* Ensure the invoice covers the full page */
                    .print-only {
                        display: block !important;
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}
