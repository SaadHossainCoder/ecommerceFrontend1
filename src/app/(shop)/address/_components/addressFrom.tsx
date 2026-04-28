"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
    Home, 
    Gift, 
    MapPin, 
    Phone, 
    User, 
    Flag,
    Globe,
    Building2,
    Hash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useAddressStore } from "@/store/address-stor";
import { CreateAddressData } from "@/services/address.service";

const addressSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Invalid phone number"),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    street: z.string().min(5, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    postalCode: z.string().min(5, "Invalid postal code"),
    country: z.string().min(2, "Country is required"),
    label: z.string().min(1, "Label is required"),
    addressType: z.enum(["MY_ADDRESS", "GIFT_ADDRESS"]),
    isDefault: z.boolean(),
    friendName: z.string().optional(),
    friendPhone: z.string().optional(),
    giftDescription: z.string().optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface AddressFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialData?: Partial<AddressFormValues>;
}

export function AddressForm({ onSuccess, onCancel, initialData }: AddressFormProps) {
    const addAddress = useAddressStore(state => state.addAddress);
    const isLoading = useAddressStore(state => state.isLoading);
    const error = useAddressStore(state => state.error);

    const form = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            name: initialData?.name || "",
            phone: initialData?.phone || "",
            email: initialData?.email || "",
            street: initialData?.street || "",
            city: initialData?.city || "",
            state: initialData?.state || "",
            postalCode: initialData?.postalCode || "",
            country: initialData?.country || "India",
            label: initialData?.label || "Home",
            addressType: initialData?.addressType || "MY_ADDRESS",
            isDefault: initialData?.isDefault || false,
            friendName: initialData?.friendName || "",
            friendPhone: initialData?.friendPhone || "",
            giftDescription: initialData?.giftDescription || "",
        }
    });

    const watchAddressType = form.watch("addressType");

    const onSubmit = async (values: AddressFormValues) => {
        try {
            const payload = { ...values };
            
            // Clean up empty strings for optional fields
            if (!payload.email) delete payload.email;
            if (payload.addressType === "MY_ADDRESS" || !payload.friendName) delete payload.friendName;
            if (payload.addressType === "MY_ADDRESS" || !payload.friendPhone) delete payload.friendPhone;
            if (payload.addressType === "MY_ADDRESS" || !payload.giftDescription) delete payload.giftDescription;

            await addAddress(payload as CreateAddressData);
            form.reset();
            onSuccess?.();
        } catch (err) {
            console.error("Submission failed:", err);
            // Error is handled by the store and displayed in the UI below
        }
    };

    const { errors } = form.formState;

    const inputClasses = "pl-10 h-11 bg-white border-stone-200 focus:border-stone-900 focus:ring-2 focus:ring-stone-900/5 rounded-xl transition-all font-light text-sm";
    const labelClasses = "text-[8px] uppercase tracking-[0.2em] font-bold text-stone-400 ml-1";

    return (
        <form onSubmit={form.handleSubmit(onSubmit, (e) => console.error("Validation Errors:", e))} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Global Error Display */}
            {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl animate-in fade-in slide-in-from-top-2">
                    <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">{error}</p>
                </div>
            )}

            {Object.keys(errors).length > 0 && (
                <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl animate-in fade-in slide-in-from-top-2">
                    <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Please fix the validation errors below.</p>
                </div>
            )}
            
            {/* Strategy Selection */}
            <div className="grid grid-cols-2 gap-4">
                {[
                    { id: "MY_ADDRESS", label: "Personal", sub: "My residence", icon: Home },
                    { id: "GIFT_ADDRESS", label: "Gift", sub: "For someone", icon: Gift }
                ].map((type) => (
                    <button
                        key={type.id}
                        type="button"
                        onClick={() => form.setValue("addressType", type.id as any)}
                        className={cn(
                            "group flex flex-col items-center p-4 rounded-2xl border transition-all duration-300",
                            watchAddressType === type.id 
                                ? "bg-stone-900 border-stone-900 text-white shadow-lg" 
                                : "bg-white border-stone-100 text-stone-400 hover:border-stone-200"
                        )}
                    >
                        <type.icon className={cn("w-5 h-5 mb-2", watchAddressType === type.id ? "text-white" : "group-hover:text-stone-900")} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{type.label}</span>
                        <span className="text-[8px] opacity-50 font-light mt-0.5">{type.sub}</span>
                    </button>
                ))}
            </div>

            <div className="space-y-6">
                {/* Recipient */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-stone-900 flex items-center justify-center text-[8px] font-bold text-white tracking-widest">01</div>
                        <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-900 font-serif">Identity</h4>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className={labelClasses}>Full Name</Label>
                            <div className="relative group">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-300 group-focus-within:text-stone-900 transition-colors" />
                                <Input {...form.register("name")} placeholder="Name" className={inputClasses} />
                            </div>
                            {errors.name && <p className="text-red-500 text-[10px] pl-1">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-1.5">
                            <Label className={labelClasses}>Phone</Label>
                            <div className="relative group">
                                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-300 group-focus-within:text-stone-900 transition-colors" />
                                <Input {...form.register("phone")} placeholder="Phone" className={inputClasses} />
                            </div>
                            {errors.phone && <p className="text-red-500 text-[10px] pl-1">{errors.phone.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Gift Details */}
                {watchAddressType === "GIFT_ADDRESS" && (
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-4 animate-in zoom-in-95 duration-300">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className={labelClasses}>Friend's Name</Label>
                                <Input {...form.register("friendName")} className="h-10 text-sm rounded-xl border-transparent focus:border-stone-900" />
                                {errors.friendName && <p className="text-red-500 text-[10px] pl-1">{errors.friendName.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <Label className={labelClasses}>Friend's Phone</Label>
                                <Input {...form.register("friendPhone")} className="h-10 text-sm rounded-xl border-transparent focus:border-stone-900" />
                                {errors.friendPhone && <p className="text-red-500 text-[10px] pl-1">{errors.friendPhone.message}</p>}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <Label className={labelClasses}>Gift Note</Label>
                            <Input {...form.register("giftDescription")} className="h-10 text-sm rounded-xl border-transparent focus:border-stone-900" />
                            {errors.giftDescription && <p className="text-red-500 text-[10px] pl-1">{errors.giftDescription.message}</p>}
                        </div>
                    </div>
                )}

                {/* Destination */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-stone-900 flex items-center justify-center text-[8px] font-bold text-white tracking-widest">02</div>
                        <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-900 font-serif">Destination</h4>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label className={labelClasses}>Street Address</Label>
                            <div className="relative group">
                                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-300 group-focus-within:text-stone-900 transition-colors" />
                                <Input {...form.register("street")} placeholder="Address" className={inputClasses} />
                            </div>
                            {errors.street && <p className="text-red-500 text-[10px] pl-1">{errors.street.message}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className={labelClasses}>City</Label>
                                <div className="relative group">
                                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-300 group-focus-within:text-stone-900 transition-colors" />
                                    <Input {...form.register("city")} className={inputClasses} />
                                </div>
                                {errors.city && <p className="text-red-500 text-[10px] pl-1">{errors.city.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <Label className={labelClasses}>State</Label>
                                <div className="relative group">
                                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-300 group-focus-within:text-stone-900 transition-colors" />
                                    <Input {...form.register("state")} className={inputClasses} />
                                </div>
                                {errors.state && <p className="text-red-500 text-[10px] pl-1">{errors.state.message}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label className={labelClasses}>Postal Code</Label>
                                <div className="relative group">
                                    <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-300 group-focus-within:text-stone-900 transition-colors" />
                                    <Input {...form.register("postalCode")} className={inputClasses} />
                                </div>
                                {errors.postalCode && <p className="text-red-500 text-[10px] pl-1">{errors.postalCode.message}</p>}
                            </div>
                            <div className="space-y-1.5">
                                <Label className={labelClasses}>Country</Label>
                                <div className="relative group">
                                    <Flag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-300 group-focus-within:text-stone-900 transition-colors" />
                                    <Input {...form.register("country")} className={inputClasses} />
                                </div>
                                {errors.country && <p className="text-red-500 text-[10px] pl-1">{errors.country.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preferences */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-stone-900 flex items-center justify-center text-[8px] font-bold text-white tracking-widest">03</div>
                        <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-900 font-serif">Preferences</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {["Home", "Work", "Studio", "Gallery"].map((l) => (
                            <button
                                key={l}
                                type="button"
                                onClick={() => form.setValue("label", l)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all border",
                                    form.watch("label") === l 
                                        ? "bg-stone-900 text-white border-stone-900" 
                                        : "bg-white text-stone-400 border-stone-100 hover:border-stone-300"
                                )}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-stone-50 rounded-xl border border-stone-100">
                        <Checkbox 
                            id="isDefault"
                            checked={form.watch("isDefault")}
                            onCheckedChange={(checked) => form.setValue("isDefault", !!checked)}
                            className="h-4 w-4 border-stone-300 data-[state=checked]:bg-stone-900 data-[state=checked]:border-stone-900"
                        />
                        <div className="space-y-0.5">
                            <Label 
                                htmlFor="isDefault"
                                className="text-[10px] font-bold uppercase tracking-widest text-stone-900 cursor-pointer"
                            >
                                Primary Residence
                            </Label>
                            <p className="text-[8px] text-stone-400 font-light uppercase tracking-wider leading-none">Set as default destination</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                {onCancel && (
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={onCancel}
                        className="flex-1 h-12 rounded-full border-stone-100 text-stone-400 hover:text-stone-900 text-[9px] uppercase tracking-[0.2em] font-bold transition-all"
                    >
                        Abandon
                    </Button>
                )}
                <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="flex-[2] h-12 bg-stone-900 text-white hover:bg-stone-800 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold shadow-xl shadow-stone-900/10 transition-all active:scale-[0.98]"
                >
                    {isLoading ? "Synchronizing..." : "Establish Address"}
                </Button>
            </div>
        </form>
    );
}
