"use client";
//____________________design____________________
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// ____________________logic____________________
import { useState } from "react";
import { toast } from "@/components/ui/toaster";
import { useAuthStore } from "@/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormValues } from "@/validations/auth.validation";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const { login, isLoading } = useAuthStore();


    const {
        register,
        handleSubmit,
        formState: { errors },
        // setValue,
        // watch,
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });


    const onSubmit = async (data: LoginFormValues) => {
        try {
            await login(data);
            toast({
                variant: "success",
                title: "Login Successful",
                description: "You have successfully logged in.",
            });
            router.push("/"); // Redirect to home page after successful login

        } catch (error: unknown) {
            let description = "Invalid credentials";

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
                variant: "destructive",
                title: "Login Failed",
                description,
            });
        }
    }

    return (
        <div>
            <Card className="border-0 shadow-2xl dark:bg-white dark:text-gray-500">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl font-bold dark:text-black">Welcome Back</CardTitle>
                    <CardDescription>
                        Sign in to your account to continue shopping
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 "
                    >
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="test@example.com"
                                {...register("email")}
                                icon={<Mail className="h-4 w-4" />}
                                error={errors.email?.message}
                                required
                                className="outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("password")}
                                    error={errors.password?.message}
                                    icon={<Lock className="h-4 w-4" />}
                                    required
                                    className="focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="w-full flex items-center justify-center ">
                            <Button
                                type="submit"
                                className="w-full text-white rounded-none"
                                size="lg"
                                disabled={isLoading}
                            >
                                {!isLoading && (
                                    <>
                                        Sign In
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/register" className="font-medium text-blue-600 hover:underline">
                            Create account
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}