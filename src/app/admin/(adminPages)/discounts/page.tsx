"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Plus,
    Search,
    Ticket,
    // Calendar,
    Percent,
    Copy,
    Trash2,
    MoreHorizontal,
    Tag,
    Edit2,
    BarChart3,
    Loader2,
    ArrowRight,
    DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
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
import { toast } from "@/components/ui/toaster";

import { useCouponStore } from "@/store/coupon-store";
import { Coupon } from "@/services/coupon.service";
import { couponSchema, CouponFormData } from "@/validations/coupon.validation";
import { DiscountsForm } from "./_components/discountsForm";

export default function DiscountsPage() {
    const {
        coupons,
        stats,
        isLoading,
        error,
        fetchCoupons,
        fetchStats,
        addCoupon,
        editCoupon,
        removeCoupon
    } = useCouponStore();

    const [searchTerm, setSearchTerm] = useState("");
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors }
    } = useForm<CouponFormData>({
        resolver: zodResolver(couponSchema),
        defaultValues: {
            code: "",
            description: "",
            discountType: "PERCENTAGE",
            discountValue: 0,
            validFrom: new Date().toISOString().split('T')[0],
            validUntil: "",
            isActive: true,
            usageLimit: null,
            perUserLimit: null,
            maxDiscountAmount: null,
            minPurchaseAmount: null,
        }
    });

    useEffect(() => {
        fetchCoupons();
        fetchStats();
    }, []);

    useEffect(() => {
        if (error) {
            toast({
                title: "Operation Failed",
                description: error,
                variant: "destructive",
            });
        }
    }, [error]);

    const filteredCoupons = coupons.filter((c) =>
        c.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateCoupon = () => {
        setEditingCoupon(null);
        reset({
            code: "",
            description: "",
            discountType: "PERCENTAGE",
            discountValue: 0,
            usageLimit: null,
            perUserLimit: null,
            validFrom: new Date().toISOString().split('T')[0],
            validUntil: "",
            isActive: true,
            maxDiscountAmount: null,
            minPurchaseAmount: null
        });
        setIsAddEditOpen(true);
    };


    const handleEditCoupon = (coupon: Coupon) => {
        setEditingCoupon(coupon);
        reset({
            code: coupon.code,
            description: coupon.description || "",
            discountType: coupon.discountType,
            discountValue: coupon.discountValue,
            validFrom: new Date(coupon.validFrom).toISOString().split('T')[0],
            validUntil: new Date(coupon.validUntil).toISOString().split('T')[0],
            isActive: coupon.isActive,
            usageLimit: coupon.usageLimit || null,
            perUserLimit: (coupon as any).perUserLimit || null,
            maxDiscountAmount: coupon.maxDiscountAmount || null,
            minPurchaseAmount: coupon.minPurchaseAmount || null,
        });
        setIsAddEditOpen(true);
    };

    const handleDeleteClick = (coupon: Coupon) => {
        setEditingCoupon(coupon);
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

    const handleGenerateCode = () => {
        const randomCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        setValue("code", randomCode, { shouldValidate: true });
    };

    const onSubmit = async (data: CouponFormData) => {
        // Convert dates to ISO format for backend datetime validator
        const formattedData = {
            ...data,
            validFrom: new Date(data.validFrom).toISOString(),
            validUntil: new Date(data.validUntil).toISOString(),
        };

        const success = editingCoupon
            ? await editCoupon(editingCoupon.id, formattedData)
            : await addCoupon(formattedData);

        if (success) {
            setIsAddEditOpen(false);
            toast({
                title: editingCoupon ? "Campaign Updated" : "Campaign Created",
                description: "Promotional data synchronized successfully.",
                variant: "success",
            });
        }
    };

    const confirmDelete = async () => {
        if (!editingCoupon) return;
        const success = await removeCoupon(editingCoupon.id);
        if (success) {
            setIsDeleteOpen(false);
            toast({
                title: "Campaign Deleted",
                description: "The discount code has been retired permanently.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Discounts & Coupons</h1>
                    <p className="text-muted-foreground mt-1 font-medium">
                        Strategize promotional campaigns to boost conversion rates
                    </p>
                </div>
                <Button variant="gradient" size="lg" className="shadow-lg shadow-primary/20" onClick={handleCreateCoupon}>
                    <Plus className="h-4 w-4 mr-2" />
                    Launch Campaign
                </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-primary text-primary-foreground border-none shadow-2xl shadow-primary/20 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                        <Ticket className="w-24 h-24" />
                    </div>
                    <CardContent className="p-6 relative z-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Global Redemptions</p>
                                <h3 className="text-4xl font-black mt-2">
                                    {(stats as any)?.totalUsage?.toLocaleString() || "0"}
                                </h3>
                            </div>
                            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm shadow-inner">
                                <Ticket className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-xl bg-gradient-to-br from-card to-background relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                        <Tag className="w-24 h-24" />
                    </div>
                    <CardContent className="p-6 text-green-600 relative z-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Active Campaigns</p>
                                <h3 className="text-4xl font-black mt-2">
                                    {(stats as any)?.activeCampaigns || "0"}
                                </h3>
                            </div>
                            <div className="p-4 bg-green-500/10 rounded-2xl shadow-inner">
                                <Tag className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-none shadow-xl relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                        <DollarSign className="w-24 h-24" />
                    </div>
                    <CardContent className="p-6 text-blue-600 relative z-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Potential Savings</p>
                                <h3 className="text-4xl font-black mt-2">
                                    ${(stats as any)?.totalSavings?.toLocaleString() || "0"}
                                </h3>
                            </div>
                            <div className="p-4 bg-blue-500/10 rounded-2xl shadow-inner">
                                <Percent className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Coupons List */}
            <Card className="overflow-hidden border-none shadow-xl bg-card/50 backdrop-blur-sm">
                <div className="p-5 border-b flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-muted/30">
                    <CardTitle className="text-xl flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <Ticket className="h-5 w-5 text-primary" />
                        </div>
                        Discount Registry
                        <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary border-none">{filteredCoupons.length}</Badge>
                    </CardTitle>
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Find specific campaign code..."
                            className="pl-10 h-10 bg-background/50 border-none shadow-inner"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="divide-y divide-border/40">
                    {isLoading && coupons.length === 0 ? (
                        <div className="p-24 text-center space-y-6">
                            <div className="relative inline-block">
                                <Loader2 className="h-16 w-16 animate-spin text-primary opacity-20" />
                                <Ticket className="h-6 w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-40" />
                            </div>
                            <p className="text-muted-foreground font-medium animate-pulse">Syncing coupon database...</p>
                        </div>
                    ) : filteredCoupons.length > 0 ? (
                        filteredCoupons.map((coupon: any) => (
                            <div key={coupon.id} className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-muted/40 transition-all group gap-4">
                                <div className="flex items-center gap-5">
                                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm">
                                        <Ticket className="h-6 w-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-center gap-3">
                                            <span className="font-mono font-black text-xl tracking-tighter text-primary uppercase">{coupon.code}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-background shadow-sm border"
                                                onClick={() => handleCopyCode(coupon.code)}
                                            >
                                                <Copy className="h-3 w-3" />
                                            </Button>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mt-1.5 font-medium">
                                            <span className="bg-muted px-2 py-0.5 rounded-md uppercase tracking-wider text-[10px]">{coupon.discountType || 'FIXED'}</span>
                                            <span className="text-foreground font-black flex items-center gap-1">
                                                <Percent className="h-3 w-3 text-primary" />
                                                {coupon.discountType === 'PERCENTAGE' ? `${coupon.discountValue}%` : `$${coupon.discountValue}`} Off
                                            </span>
                                            {coupon.usageLimit && (
                                                <span className="flex items-center gap-1">
                                                    <BarChart3 className="h-3 w-3" />
                                                    {coupon.usedCount || 0}/{coupon.usageLimit} Active Redemptions
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-full md:w-auto gap-4 sm:gap-10 border-t md:border-none pt-4 md:pt-0">
                                    <div className="flex flex-col items-start md:items-end gap-1">
                                        <div className="flex items-center gap-2 text-xs font-bold text-foreground bg-muted/50 px-3 py-1 rounded-full border border-border/50">
                                            {new Date(coupon.validFrom).toLocaleDateString()}
                                            <ArrowRight className="h-3 w-3 opacity-40" />
                                            {new Date(coupon.validUntil).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge variant={coupon.isActive ? 'success' : 'secondary'} className="px-3 py-1 rounded-lg">
                                            {coupon.isActive ? 'RUNNING' : 'PAUSED'}
                                        </Badge>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 hover:bg-background shadow-sm border border-transparent hover:border-border">
                                                    <MoreHorizontal className="h-5 w-5" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48 shadow-2xl border-none">
                                                <DropdownMenuItem onClick={() => handleEditCoupon(coupon)} className="cursor-pointer">
                                                    <Edit2 className="h-4 w-4 mr-2 text-primary" />
                                                    Edit Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive cursor-pointer" onClick={() => handleDeleteClick(coupon)}>
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Retire Code
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-24 text-center space-y-4">
                            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto opacity-20">
                                <Ticket className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground font-medium">No matching discount campaigns identified in the registry.</p>
                        </div>
                    )}
                </div>
            </Card>

            {/* Create/Edit Discount Modal */}
            <Dialog open={isAddEditOpen} onOpenChange={setIsAddEditOpen}>
                <DialogContent className="max-w-5xl max-h-[90vh] border-none shadow-3xl bg-background rounded-3xl overflow-hidden p-0 flex flex-col">
                    <div className="bg-primary/5 p-6 border-b border-primary/10">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black tracking-tight text-primary">
                                {editingCoupon ? "Redesign Campaign" : "Draft New Campaign"}
                            </DialogTitle>
                            <DialogDescription className="font-medium text-muted-foreground mt-1">
                                Strategize discount parameters and redemption velocity for maximum conversion.
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="p-6 flex-1 overflow-y-auto">
                        <DiscountsForm
                            register={register}
                            handleSubmit={handleSubmit}
                            setValue={setValue}
                            onSubmit={onSubmit}
                            errors={errors}
                            defaultType={watch("discountType")}
                            generateCode={handleGenerateCode}
                            watch={watch}
                        />
                    </div>

                    <DialogFooter className="p-6 bg-muted/20 border-t flex items-center justify-end gap-3 mt-0">
                        <Button variant="outline" className="rounded-xl px-8" onClick={() => setIsAddEditOpen(false)} disabled={isLoading}>Discard</Button>
                        <Button variant="gradient" className="rounded-xl px-10 shadow-lg shadow-primary/20" type="submit" form="coupon-form" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                            {editingCoupon ? "Execute Update" : "Launch Coupon"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[420px] border-none shadow-3xl rounded-3xl p-6">
                    <DialogHeader>
                        <DialogTitle className="text-destructive text-2xl font-black flex items-center gap-3">
                            <div className="bg-destructive/10 p-2 rounded-xl">
                                <Trash2 className="h-6 w-6" />
                            </div>
                            Retire Campaign
                        </DialogTitle>
                        <DialogDescription className="pt-4 text-base font-medium">
                            Are you sure you want to permanently delete the code <span className="text-foreground font-black bg-muted px-2 py-0.5 rounded uppercase font-mono">{editingCoupon?.code}</span>?
                            <br /><br />
                            <span className="text-destructive/80 italic text-sm">This action will immediately invalidate all customer redemptions and cannot be reversed.</span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-8 flex flex-col sm:flex-row gap-3">
                        <Button variant="outline" className="rounded-xl flex-1 h-12" onClick={() => setIsDeleteOpen(false)} disabled={isLoading}>Keep Active</Button>
                        <Button variant="destructive" className="rounded-xl flex-1 h-12 font-bold shadow-lg shadow-destructive/20" onClick={confirmDelete} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Retiring...
                                </>
                            ) : (
                                "Confirm Retirement"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
