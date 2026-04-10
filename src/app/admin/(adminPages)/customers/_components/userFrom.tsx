import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function UserFrom({ 
    initialData, 
    onClose, 
    onSave 
}: { 
    initialData?: any; 
    onClose: () => void; 
    onSave: (data: any) => Promise<void>;
}) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            username: initialData?.username || initialData?.name || "",
            email: initialData?.email || "",
        }
    });

    const onSubmit = async (data: any) => {
        await onSave(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <div className="grid gap-2">
                <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider">Full Name / Username</Label>
                <Input id="username" {...register("username", { required: "Username is required" })} placeholder="e.g. John Doe" className="h-10" />
                {errors.username && <p className="text-[10px] uppercase font-bold text-destructive">{errors.username.message as string}</p>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">Email Address</Label>
                <Input id="email" type="email" {...register("email", { required: "Email is required" })} placeholder="john@example.com" className="h-10" />
                {errors.email && <p className="text-[10px] uppercase font-bold text-destructive">{errors.email.message as string}</p>}
            </div>
            
            <div className="flex justify-end gap-3 mt-8 border-t pt-4">
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="flex-1">Cancel</Button>
                <Button type="submit" variant="default" disabled={isSubmitting} className="flex-1 shadow-lg shadow-primary/20">
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Save Information
                </Button>
            </div>
        </form>
    );
}