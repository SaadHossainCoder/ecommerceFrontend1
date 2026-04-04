"use client";
// ______________design____________________________
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// ______________logic____________________________
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "@/components/ui/toaster";
import { useState } from "react";
import { forgotPasswordSchema, ForgotPasswordFormValues } from "@/validations/auth.validation";
import { AxiosError } from "axios";
import { authService } from "@/services/auth.service";


export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (data: ForgotPasswordFormValues) => {
        setIsLoading(true);
        try {
            await authService.forgotPassword(data);
            setSubmittedEmail(data.email);
            setIsSubmitted(true);
            toast({
                title: "Success",
                description: "Password reset link sent to your email.",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Failed to send reset link",
                description: error instanceof AxiosError ? error.response?.data?.message : "Something went wrong",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Card className="border-0 shadow-2xl">
                <CardHeader className="text-center pb-2">
                    {!isSubmitted ? (
                        <div>
                            <div className="flex justify-center mb-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                    <Lock className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
                            <CardDescription>
                                No worries! Enter your email and we&apos;ll send you reset instructions.
                            </CardDescription>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                                    <CheckCircle2 className="h-8 w-8 text-success" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
                            <CardDescription>
                                We&apos;ve sent a password reset link to<br />
                                <span className="font-medium text-foreground">{submittedEmail}</span>
                            </CardDescription>
                        </div>
                    )}
                </CardHeader>
                <CardContent>
                    {!isSubmitted ? (
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4"
                        >
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    {...register("email")}
                                    icon={<Mail className="h-4 w-4" />}
                                    error={errors.email?.message}
                                />
                            </div>

                            <div className="w-full flex items-center justify-center pt-5">
                                <Button
                                    type="submit"
                                    className="w-full rounded-none"
                                    size="lg"
                                    disabled={isLoading}
                                >
                                    {!isLoading && (
                                        <>
                                            Send Reset Link
                                            <ArrowRight className="h-4 w-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>

                            <div>
                                <Button
                                    variant="link"
                                    className="w-full"
                                    asChild
                                >
                                    <Link href="/auth/login">
                                        <ArrowLeft className="h-4 w-4 mr-2" />
                                        Back to Login
                                    </Link>
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-center text-sm text-muted-foreground">
                                Didn&apos;t receive the email? Check your spam folder or{" "}
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-primary hover:underline font-medium"
                                >
                                    try another email
                                </button>
                            </p>

                            <Button
                                variant="outline"
                                className="w-full"
                                asChild
                            >
                                <Link href="/auth/login">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Login
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
