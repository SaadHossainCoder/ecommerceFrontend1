"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Heart, ShoppingBag, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { cartLocalStorageData } from "@/localStorage/cartData";

const navItems = [
    { icon: Home, label: "Home", href: "/home" },
    { icon: LayoutGrid, label: "Shop", href: "/products" },
    { icon: Heart, label: "Wishlist", href: "/wishlist" },
    { icon: ShoppingBag, label: "Cart", href: "/cart", hasBadge: true },
    { icon: User, label: "Profile", href: "/myAccount" },
];

export function MobileBottomNav() {
    const pathname = usePathname();
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        setCartItemCount(cartLocalStorageData.getCartCount());

        const handleCartUpdate = () => {
            setCartItemCount(cartLocalStorageData.getCartCount());
        };

        window.addEventListener("cartUpdated", handleCartUpdate);
        return () => window.removeEventListener("cartUpdated", handleCartUpdate);
    }, []);

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-stone-200 pb-safe">
            <div className="flex items-center h-16">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center justify-center flex-1 h-full gap-1 relative"
                        >
                            {/* Active top indicator */}
                            {isActive && (
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-stone-900 rounded-none" />
                            )}

                            {/* Icon */}
                            <div className="relative">
                                <item.icon
                                    className={cn(
                                        "w-[18px] h-[18px] transition-colors duration-200",
                                        isActive
                                            ? "text-stone-900"
                                            : "text-stone-400"
                                    )}
                                    strokeWidth={isActive ? 2.5 : 1.8}
                                />

                                {/* Cart badge */}
                                {item.hasBadge && cartItemCount > 0 && (
                                    <span className="absolute -top-1.5 -right-2 min-w-[14px] h-[14px] bg-stone-900 text-white text-[8px] font-bold flex items-center justify-center px-0.5 rounded-none">
                                        {cartItemCount}
                                    </span>
                                )}
                            </div>

                            {/* Label */}
                            <span
                                className={cn(
                                    "text-[9px] uppercase tracking-[0.12em] font-semibold transition-colors duration-200",
                                    isActive ? "text-stone-900" : "text-stone-400"
                                )}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}