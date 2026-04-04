"use client";
// ______________design____________________________
import { Lock, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// ______________logic____________________________
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/toaster";
import { resetPasswordSchema, ResetPasswordFormValues } from "@/validations/auth.validation";
import { AxiosError } from "axios";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const passwordRequirements = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "Contains uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "Contains lowercase letter", test: (p: string) => /[a-z]/.test(p) },
    { label: "Contains a number", test: (p: string) => /\d/.test(p) },
    { label: "Contains special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

function ChangePasswordContent() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    // const router = useRouter();
    const searchParams = useSearchParams();

    const uid = searchParams.get("uid");
    const token = searchParams.get("token");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const password = watch("password");

    const passwordStrength = useMemo(() => {
        if (!password) return 0;
        const passed = passwordRequirements.filter((req) => req.test(password)).length;
        return (passed / passwordRequirements.length) * 100;
    }, [password]);

    const getStrengthColor = () => {
        if (passwordStrength < 40) return "bg-destructive";
        if (passwordStrength < 70) return "bg-warning";
        return "bg-success";
    };

    const getStrengthText = () => {
        if (passwordStrength < 40) return "Weak";
        if (passwordStrength < 70) return "Medium";
        return "Strong";
    };

    const onSubmit = async (data: ResetPasswordFormValues) => {
        if (!uid || !token) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Invalid reset link. Please request a new one.",
            });
            return;
        }

        setIsLoading(true);
        try {
            await authService.resetPassword({
                ...data,
                uid,
                token,
            });
            setIsSuccess(true);
            toast({
                title: "Success",
                description: "Password reset successfully.",
            });
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            toast({
                variant: "destructive",
                title: "Reset Failed",
                description: axiosError.response?.data?.message || "Something went wrong",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Card className="border-0 shadow-2xl">
                <CardHeader className="text-center pb-2">
                    {!isSuccess ? (
                        <>
                            <div className="flex justify-center mb-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <Lock className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold">Set New Password</CardTitle>
                            <CardDescription>
                                Your new password must be different from previously used passwords.
                            </CardDescription>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                                    <CheckCircle2 className="h-8 w-8 text-success" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold">Password Updated</CardTitle>
                            <CardDescription>
                                Your password has been successfully reset. You can now login with your new password.
                            </CardDescription>
                        </div>
                    )}
                </CardHeader>

                <CardContent>
                    {!isSuccess ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">New Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        {...register("password")}
                                        icon={<Lock className="h-4 w-4" />}
                                        error={errors.password?.message}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {password && (
                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground">Password strength</span>
                                            <span className={`font-medium ${passwordStrength < 40 ? "text-destructive" :
                                                passwordStrength < 70 ? "text-warning" : "text-success"
                                                }`}>
                                                {getStrengthText()}
                                            </span>
                                        </div>
                                        <Progress value={passwordStrength} indicatorClassName={getStrengthColor()} />
                                        <div className="grid grid-cols-2 gap-2 pt-1">
                                            {passwordRequirements.map((req) => (
                                                <div
                                                    key={req.label}
                                                    className={`flex items-center gap-1.5 text-xs ${req.test(password) ? "text-success" : "text-muted-foreground"
                                                        }`}
                                                >
                                                    {req.test(password) ? (
                                                        <Check className="h-3 w-3" />
                                                    ) : (
                                                        <X className="h-3 w-3" />
                                                    )}
                                                    {req.label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        {...register("confirmPassword")}
                                        icon={<Lock className="h-4 w-4" />}
                                        error={errors.confirmPassword?.message}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full rounded-none"
                                    size="lg"
                                    disabled={isLoading}
                                >
                                    {!isLoading && (
                                        <>
                                            Update Password
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>

                            <Button
                                variant="ghost"
                                className="w-full"
                                asChild
                            >
                                <Link href="/auth/login">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Login
                                </Link>
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <Button
                                className="w-full"
                                size="lg"
                                asChild
                            >
                                <Link href="/auth/login">
                                    Go to Login
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default function ChangePasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChangePasswordContent />
        </Suspense>
    );
}
