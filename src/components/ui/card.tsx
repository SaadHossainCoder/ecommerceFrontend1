"use client";

import * as React from "react";
// import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
// import { cardVariants } from "@/lib/motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    hover?: boolean;
    glass?: boolean;
    overflowHidden?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, hover = false, glass = false, overflowHidden = false, children, ...props }, ref) => {
        const baseClasses = cn(
            "rounded-2xl border bg-card text-card-foreground shadow-md transition-shadow duration-200",
            hover && "cursor-pointer hover:shadow-xl",
            glass && "glass border-white/20",
            overflowHidden && "overflow-hidden",
            className
        );

        if (hover) {
            return (
                <div
                    ref={ref}
                    className={baseClasses}
                    {...props}
                >
                    {children}
                </div>
            );
        }

        return (
            <div ref={ref} className={baseClasses} {...props}>
                {children}
            </div>
        );
    }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
    />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-xl font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
    />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center p-6 pt-0", className)}
        {...props}
    />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
