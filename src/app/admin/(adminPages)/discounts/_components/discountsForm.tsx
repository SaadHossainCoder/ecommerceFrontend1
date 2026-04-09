"use client";

import { UseFormRegister, UseFormHandleSubmit, FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Ticket, Percent, Calendar, Hash, RefreshCcw, FileText, DollarSign, Box, Filter, Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CouponFormData } from "@/validations/coupon.validation";
import { Switch } from "@/components/ui/switch";

interface DiscountsFormProps {
    register: UseFormRegister<CouponFormData>;
    handleSubmit: UseFormHandleSubmit<CouponFormData>;
    setValue: UseFormSetValue<CouponFormData>;
    onSubmit: (data: CouponFormData) => Promise<void>;
    errors: FieldErrors<CouponFormData>;
    defaultType?: string;
    generateCode: () => void;
    watch: UseFormWatch<CouponFormData>;
}

export const DiscountsForm = ({
    register,
    handleSubmit,
    setValue,
    onSubmit,
    errors,
    defaultType = "PERCENTAGE",
    generateCode,
    watch,
}: DiscountsFormProps) => {
    return (
        <form
            id="coupon-form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10"
        >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column - Essential Information */}
                <div className="lg:col-span-7 space-y-8">
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Box className="h-5 w-5" />
                            <h3 className="font-bold uppercase tracking-wider">Basic Information</h3>
                        </div>
                        <div className="grid gap-4">
                            <div>
                                <Label htmlFor="coupon-code" className="text-xs font-semibold">COUPON CODE *</Label>
                                <div className="flex items-center gap-3 mt-1">
                                    <div className="relative flex-1">
                                        <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="coupon-code"
                                            className={`pl-10 uppercase font-mono font-semibold tracking-[0.3em] h-12 ${errors.code ? "border-destructive" : ""}`}
                                            placeholder="e.g. SUMMER26"
                                            {...register("code")}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={generateCode}
                                        className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/5"
                                    >
                                        <RefreshCcw className="h-3 w-3" /> Generate
                                    </button>
                                </div>
                                {errors.code && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.code.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="description" className="text-xs font-semibold">CAMPAIGN DESCRIPTION *</Label>
                                <div className="relative mt-1">
                                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="description"
                                        className="pl-10 h-12"
                                        placeholder="e.g. Welcome offer for new customers"
                                        {...register("description")}
                                    />
                                </div>
                                {errors.description && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.description.message}</p>}
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Filter className="h-5 w-5" />
                            <h3 className="font-bold uppercase tracking-wider">Discount Configuration</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="discount-type" className="text-xs font-semibold">DISCOUNT TYPE *</Label>
                                <Select
                                    value={defaultType}
                                    onValueChange={(val) => setValue("discountType", val as "PERCENTAGE" | "FIXED", { shouldValidate: true })}
                                >
                                    <SelectTrigger id="discount-type" className="h-12 rounded-2xl mt-1">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="PERCENTAGE">Percentage (%)</SelectItem>
                                        <SelectItem value="FIXED">Fixed Amount ($)</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.discountType && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.discountType.message}</p>}
                            </div>
                            <div>
                                <Label htmlFor="discount-value" className="text-xs font-semibold">DISCOUNT VALUE *</Label>
                                <div className="relative mt-1">
                                    <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="discount-value"
                                        type="number"
                                        className={`pl-10 h-12 ${errors.discountValue ? "border-destructive" : ""}`}
                                        placeholder="0"
                                        {...register("discountValue", { valueAsNumber: true })}
                                    />
                                </div>
                                {errors.discountValue && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.discountValue.message}</p>}
                            </div>
                        </div>
                        {defaultType === "PERCENTAGE" && (
                            <div className="grid gap-3 rounded-3xl border border-border/70 bg-muted/10 p-5 shadow-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <Label htmlFor="max-discount" className="font-semibold text-sm mb-0">Max Discount Amount ($)</Label>
                                    <span className="text-xs text-muted-foreground">Optional cap for percentage discounts</span>
                                </div>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="max-discount"
                                        type="number"
                                        placeholder="No limit"
                                        className="pl-10 h-12"
                                        {...register("maxDiscountAmount", { valueAsNumber: true })}
                                    />
                                </div>
                            </div>
                        )}
                    </section>
                </div>

                {/* Right Column - Advanced Settings */}
                <div className="lg:col-span-5 space-y-8">
                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Settings className="h-5 w-5" />
                            <h3 className="font-bold uppercase tracking-wider">Validity & Limits</h3>
                        </div>
                        <div className="grid gap-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="valid-from" className="text-xs font-semibold">VALID FROM *</Label>
                                    <div className="relative mt-1">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="valid-from"
                                            type="date"
                                            className={`pl-10 h-12 ${errors.validFrom ? "border-destructive" : ""}`}
                                            {...register("validFrom")}
                                        />
                                    </div>
                                    {errors.validFrom && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.validFrom.message}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="valid-until" className="text-xs font-semibold">VALID UNTIL *</Label>
                                    <div className="relative mt-1">
                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="valid-until"
                                            type="date"
                                            className={`pl-10 h-12 ${errors.validUntil ? "border-destructive" : ""}`}
                                            {...register("validUntil")}
                                        />
                                    </div>
                                    {errors.validUntil && <p className="text-destructive text-[10px] uppercase font-bold mt-1">{errors.validUntil.message}</p>}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="usage-limit" className="text-xs font-semibold">USAGE LIMIT</Label>
                                    <div className="relative mt-1">
                                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="usage-limit"
                                            type="number"
                                            placeholder="Unlimited"
                                            className="pl-10 h-12"
                                            {...register("usageLimit", { valueAsNumber: true })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="per-user-limit" className="text-xs font-semibold">PER USER LIMIT</Label>
                                    <div className="relative mt-1">
                                        <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="per-user-limit"
                                            type="number"
                                            placeholder="No limit"
                                            className="pl-10 h-12"
                                            {...register("perUserLimit", { valueAsNumber: true })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="min-purchase" className="text-xs font-semibold">MINIMUM PURCHASE ($)</Label>
                                <div className="relative mt-1">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="min-purchase"
                                        type="number"
                                        placeholder="0"
                                        className="pl-10 h-12"
                                        {...register("minPurchaseAmount", { valueAsNumber: true })}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="flex items-center gap-2 text-primary">
                            <Box className="h-5 w-5" />
                            <h3 className="font-bold uppercase tracking-wider">Activation</h3>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-xl border border-dashed border-primary/20">
                            <Switch id="isActive" checked={watch("isActive")} onCheckedChange={(v) => setValue("isActive", v)} />
                            <Label htmlFor="isActive" className="cursor-pointer font-bold text-xs uppercase">Campaign Active</Label>
                        </div>
                    </section>
                </div>
            </div>
        </form>
    );
};
