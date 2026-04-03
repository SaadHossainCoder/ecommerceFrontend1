"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
// import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { scaleInVariants, staggerContainerVariants, staggerItemVariants } from "@/lib/motion";

const OTP_LENGTH = 6;

export default function OTPPage() {
    const [otp, setOtp] = useState<string[]>(new Array(OTP_LENGTH).fill(""));
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // useEffect(() => {
    //     if (timer > 0) {
    //         const interval = setInterval(() => {
    //             setTimer((prev) => prev - 1);
    //         }, 1000);
    //         return () => clearInterval(interval);
    //     } else {
    //         setCanResend(true);
    //     }
    // }, [timer]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return; // Only allow digits

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1); // Only take last character
        setOtp(newOtp);

        // Auto-advance to next input
        if (value && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        // Handle backspace
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        // Handle arrow keys
        if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, OTP_LENGTH);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split("").forEach((char, index) => {
            if (index < OTP_LENGTH) {
                newOtp[index] = char;
            }
        });
        setOtp(newOtp);

        // Focus last filled input or last input
        const lastIndex = Math.min(pastedData.length, OTP_LENGTH) - 1;
        inputRefs.current[lastIndex]?.focus();
    };

    const handleResend = async () => {
        setCanResend(false);
        setTimer(60);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpValue = otp.join("");
        if (otpValue.length !== OTP_LENGTH) return;

        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
    };

    const isComplete = otp.every((digit) => digit !== "");

    return (
        <div>
            <Card className="border-0 shadow-2xl">
                <CardHeader className="text-center pb-2">
                    {/* Mobile Logo */}
                    <div className="flex justify-center mb-4 lg:hidden">
                        <Link href="/home" className="flex items-center gap-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                                <span className="text-xl font-bold text-primary-foreground">S</span>
                            </div>
                            <span className="text-2xl font-bold">
                                Shop<span className="text-primary">Hub</span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex justify-center mb-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <Shield className="h-8 w-8 text-primary" />
                        </div>
                    </div>

                    <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
                    <CardDescription>
                        We&apos;ve sent a verification code to<br />
                        <span className="font-medium text-foreground">john@example.com</span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        {/* OTP Input */}
                        <div className="space-y-4">
                            <div className="flex justify-center gap-2 sm:gap-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { inputRefs.current[index] = el; }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className={`
                      w-11 h-14 sm:w-12 sm:h-16 text-center text-xl sm:text-2xl font-bold outline-none rounded-none
                       border-2 bg-background transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                      ${digit ? "border-primary bg-primary/5" : "border-input hover:border-muted-foreground/50"}
                    `}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Timer / Resend */}
                        <div className="text-center">
                            {!canResend ? (
                                <p className="text-sm text-muted-foreground">
                                    Resend code in{" "}
                                    <span className="font-medium text-foreground">
                                        {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, "0")}
                                    </span>
                                </p>
                            ) : (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleResend}
                                    className="text-primary"
                                >
                                    <RefreshCw className="h-4 w-4 mr-2" />
                                    Resend Code
                                </Button>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="w-full flex items-center justify-center">
                            <Button
                                type="submit"
                                className="w-full rounded-none"
                                size="lg"
                                disabled={!isComplete}
                                // loading={isLoading}
                            >
                                {!isLoading && (
                                    <>
                                        Verify Email
                                        <ArrowRight className="h-4 w-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Security Message */}
                        <div>
                            <p className="text-center text-xs text-muted-foreground">
                                For your security, the code expires in 10 minutes.<br />
                                Never share this code with anyone.
                            </p>
                        </div>

                        {/* Back Link */}
                        <div>
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
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}