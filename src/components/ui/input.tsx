"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, error, icon, iconPosition = "left", ...props }, ref) => {
        return (
            <div className="relative w-full">
                {icon && iconPosition === "left" && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground outline-none">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-11 w-full border border-input bg-background px-4 py-2 text-sm shadow-sm transition-all duration-200  outline-none ",
                        "placeholder:text-muted-foreground",
                        " focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:border-transparent focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-2",
                        "hover:border-muted-foreground/50",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "file:border-0 file:bg-transparent file:text-sm file:font-medium ",
                        icon && iconPosition === "left" && "pl-10",
                        icon && iconPosition === "right" && "pr-10",
                        error && "border-destructive focus:border-destructive focus:ring-destructive",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                {icon && iconPosition === "right" && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground outline-none">
                        {icon}
                    </div>
                )}
                {error && (
                    <p className="absolute  text-[0.75rem] text-destructive">{error}</p>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

export { Input };
