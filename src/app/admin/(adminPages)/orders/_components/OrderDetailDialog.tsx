"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X, MapPin, User, Mail, Phone } from "lucide-react";

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;        // Now supports real image URL
    sku: string;           // SKU code in format SH-001234
}

interface Order {
    id: string;
    customer: string;
    email: string;
    phone?: string;
    address: string;
    status: string;
    amount: number;
    date?: string;
    items: OrderItem[];
}

interface OrderDetailDialogProps {
    isOpen: boolean;
    onClose: () => void;
    selectedOrder: Order | null;
}

const statusConfig: Record<string, { label: string; color: "default" | "secondary" | "destructive" | "outline" | "success" }> = {
    Pending: { label: "Pending", color: "secondary" },
    Processing: { label: "Processing", color: "default" },
    Shipped: { label: "Shipped", color: "outline" },
    Delivered: { label: "Delivered", color: "success" },
    Cancelled: { label: "Cancelled", color: "destructive" },
};

export default function OrderDetailDialog({
    isOpen,
    onClose,
    selectedOrder,
}: OrderDetailDialogProps) {
    if (!selectedOrder) return null;

    const config = statusConfig[selectedOrder.status] || { label: selectedOrder.status, color: "default" };

    const items = Array.isArray(selectedOrder.items) ? selectedOrder.items : [];
    const totalItems = items.length > 0 
        ? items.reduce((sum, item) => sum + item.quantity, 0)
        : (typeof (selectedOrder as any).items === 'number' ? (selectedOrder as any).items : 0);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[560px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between pr-8">
                        <div className="flex items-center gap-3">
                            <span>Order Summary</span>
                            <Badge variant={config.color} className="font-medium">
                                {config.label}
                            </Badge>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="h-8 w-8"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-2 text-sm">
                    {/* Customer & Delivery Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <Label className="text-xs uppercase font-semibold tracking-widest text-muted-foreground">
                                    Contact Information
                                </Label>
                            </div>
                            <div>
                                <p className="font-semibold text-base">{selectedOrder.customer}</p>
                                <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                                    <Mail className="h-3.5 w-3.5" />
                                    <p>{selectedOrder.email}</p>
                                </div>
                                {selectedOrder.phone && (
                                    <div className="flex items-center gap-1.5 text-muted-foreground mt-1">
                                        <Phone className="h-3.5 w-3.5" />
                                        <p>{selectedOrder.phone}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <Label className="text-xs uppercase font-semibold tracking-widest text-muted-foreground">
                                    Delivery Address
                                </Label>
                            </div>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {selectedOrder.address}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Order Items */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs uppercase font-semibold tracking-widest text-muted-foreground">
                                Included Items ({totalItems})
                            </Label>
                            <span className="text-xs text-muted-foreground">
                                {items.length || totalItems} product{(items.length || totalItems) !== 1 ? "s" : ""}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border"
                                >
                                    {/* Image / Placeholder */}
                                    <div className="h-14 w-14 flex-shrink-0 border bg-background rounded-xl overflow-hidden flex items-center justify-center">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-2xl text-muted-foreground">📦</span>
                                        )}
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold leading-tight truncate">{item.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            SKU: <span className="font-medium">{"SH-001234"}</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            Qty: <span className="font-medium">{item.quantity}</span>
                                        </p>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right">
                                        <p className="font-semibold text-base">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            ${item.price} each
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Total Revenue */}
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-5 rounded-2xl border border-primary/20">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                                <p className="text-xs text-muted-foreground mt-0.5">Including all taxes & charges</p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-primary">
                                    ${selectedOrder.amount.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Optional Footer Actions */}
                <div className="flex gap-3 pt-4 border-t">
                    <Button variant="outline" className="flex-1" onClick={onClose}>
                        Close
                    </Button>
                    <Button className="flex-1">
                        Download Invoice
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}