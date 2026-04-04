"use client";

// ______________design____________________________
import { Mail, Lock, Eye, EyeOff, User, ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// ______________logic____________________________
import { useState, useMemo } from "react";
import { toast } from "@/components/ui/toaster";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/auth-store";
import { signupSchema, SignupFormValues } from "@/validations/auth.validation";
import { useRouter } from "next/navigation";

const passwordRequirements = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "Contains uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "Contains lowercase letter", test: (p: string) => /[a-z]/.test(p) },
    { label: "Contains a number", test: (p: string) => /\d/.test(p) },
    { label: "Contains special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();
    const { signup, isLoading } = useAuthStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<SignupFormValues>({

        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "USER" as const,
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

    const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
        try {
            const { confirmPassword, ...payload } = data;
            await signup(payload as SignupFormValues);
            toast({
                title: "Success 🎉",
                description: "Verification code sent to your email. Please verify your account.",
                variant: "success",
            });

            router.push("/auth/otp");

        } catch (error: unknown) {
            let description = "Something went wrong";

            if (error instanceof Error) {
                description = error.message;
            } else if (
                typeof error === "object" &&
                error !== null &&
                "response" in error
            ) {
                const err = error as {
                    response?: { data?: { message?: string } };
                };
                description = err.response?.data?.message ?? description;
            }

            toast({
                title: "Error ❌",
                description,
                variant: "destructive",
            });
        }
    };

    return (
        <div>
            <Card className="border-0 shadow-2xl ">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
                    <CardDescription>
                        Join ShopHub and start your shopping journey
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                                id="fullName"
                                type="text"
                                placeholder="John Doe"
                                {...register("fullName")}
                                icon={<User className="h-4 w-4" />}
                                error={errors.fullName?.message}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                {...register("email")}
                                icon={<Mail className="h-4 w-4" />}
                                error={errors.email?.message}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("password")}
                                    icon={<Lock className="h-4 w-4" />}
                                    error={errors.password?.message}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors rounded-none"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-center pt-5">
                            <Button
                                type="submit"
                                className="w-full rounded-none"
                                size="lg"
                                loading={isLoading || undefined}
                                disabled={isLoading}
                            >
                                {!isLoading && (
                                    <>
                                        Create Account
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>

                        <div>
                            <p className="text-center text-xs text-muted-foreground">
                                By creating an account, you agree to our{" "}
                                <Link href="/terms" className="text-primary hover:underline">
                                    Terms of Service
                                </Link>{" "}
                                and{" "}
                                <Link href="/privacy" className="text-primary hover:underline">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="font-medium text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
