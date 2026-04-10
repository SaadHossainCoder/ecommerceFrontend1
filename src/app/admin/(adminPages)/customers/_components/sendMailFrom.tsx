import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export default function SendMailFrom({ 
    customer, 
    onClose, 
    onSend 
}: { 
    customer?: any; 
    onClose: () => void; 
    onSend: (subject: string, message: string) => Promise<void>;
}) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            subject: "",
            message: "",
        }
    });

    const onSubmit = async (data: any) => {
        await onSend(data.subject, data.message);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4 mt-2">
            <div className="grid gap-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">Subject Header</Label>
                <Input 
                    {...register("subject", { required: "Subject is required" })} 
                    placeholder="e.g. Action Required: Account Notice" 
                    className="h-10 border-primary/20 bg-muted/20" 
                />
                {errors.subject && <p className="text-[10px] uppercase font-bold text-destructive">{errors.subject.message as string}</p>}
            </div>
            
            <div className="grid gap-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">Transmission Body</Label>
                <textarea 
                    rows={6} 
                    {...register("message", { required: "Message is required" })}
                    className="flex w-full rounded-md border border-primary/20 bg-muted/20 px-3 py-2 text-sm shadow-inner placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="..."
                />
                {errors.message && <p className="text-[10px] uppercase font-bold text-destructive">{errors.message.message as string}</p>}
            </div>
            
            <div className="flex justify-end gap-3 mt-4 border-t pt-4 border-primary/10">
                <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="flex-1">Halt Sequence</Button>
                <Button type="submit" variant="default" disabled={isSubmitting} className="flex-1 shadow-md shadow-primary/20 bg-primary text-primary-foreground">
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Push Email Matrix
                </Button>
            </div>
        </form>
    );
}