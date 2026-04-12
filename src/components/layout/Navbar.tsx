"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchIcon as Search} from "@/components/icon/search";
import { UserIcon as User} from "@/components/icon/user";
import { ArchiveIcon as ShoppingBag} from "@/components/icon/archive";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store/search-store";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/auth-store";
import { LogOut } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/gifting", label: "Gifts" },
    { href: "/artists", label: "Artisans" },
    { href: "/our-story", label: "Our Story" },
];

export function Navbar() {
    const { user, isAuthenticated } = useAuthStore();
    console.log(user);

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    const pathname = usePathname();
    const { openSearch } = useSearchStore();
    const cartItemCount = 3; // Replace with actual cart item count from state or context

    return (
        <header className="sticky top-0 z-50 w-base h-20 w-full border-b bg-background/80 backdrop-blur-lg flex items-center">
            <div className="container-custom">
                <nav className="flex h-16 items-center justify-between gap-4">
                    {/* Logo - Hidden when search is open on mobile */}
                    <Link href="/home" className="flex items-center">
                        <span className="text-2xl md:text-3xl font-heading font-bold tracking-tight text-primary">
                            GEMINI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-start gap-6 md:flex">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/");
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-foreground relative group py-2",
                                        isActive ? "text-primary font-bold" : "text-muted-foreground"
                                    )}
                                >
                                    <p className="text-[15px]">{link.label}</p>
                                    <span className={cn(
                                        "absolute bottom-0 left-0 w-full h-[2px] bg-primary transform transition-transform duration-300 ease-out",
                                        isActive ? "scale-x-100 origin-left" : "scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"
                                    )} />
                                </Link>
                            );
                        })}
                    </div>
                    {/* Attached Search Trigger (Desktop) */}
                    <div className="hidden lg:flex flex-1 max-w-md mx-6">

                    </div>

                    {/* Right Actions */}
                    <div className="flex items-end gap-1 md:gap-5">
                        {/* Search Icon (Mobile/Tablet) */}
                        <Button
                            variant="outline"
                            size="icon"
                            className=" border-none"
                            onClick={openSearch}
                        >
                            <Search  />
                        </Button>



                        {/* Profile - Hidden on mobile */}
                        <Button variant="outline" size="icon" className="hidden md:flex border-none" asChild>
                            <Link href="/myAccount">
                                <User/>
                            </Link>
                        </Button>
                        {/* Cart - Hidden on mobile */}
                        <Button variant="outline" size="icon" className="relative hidden md:flex border-none " asChild>
                            <Link href="/cart">
                                <ShoppingBag className="" />
                                {cartItemCount > 0 && (
                                    <Badge
                                        className="absolute -right-1 -top-1 h- w-4 rounded-full p-0 text-[10px] flex items-center justify-center bg-primary text-primary-foreground border-none"
                                    >
                                        {cartItemCount}
                                    </Badge>
                                )}
                            </Link>
                        </Button>
                    </div>
                </nav>
            </div>
        </header>
    );
}
