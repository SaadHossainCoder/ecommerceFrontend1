"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SearchIcon as Search } from "@/components/icon/search";
import { UserIcon as User } from "@/components/icon/user";
import { ArchiveIcon as ShoppingBag } from "@/components/icon/archive";
import { HeartIcon as Wishlist } from "@/components/icon/heart";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "@/store/search-store";
import { Badge } from "@/components/ui/badge";
// import { useAuthStore } from "@/store/auth-store";
import { useState, useEffect, Suspense } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { cartLocalStorageData } from "@/localStorage/cartData";
import TopBarNotification from "./TopBarNotification";
// import { userLocalStorageData } from "@/localStorage/userData";

const navLinks = [
    { href: "/home", label: "Home" },
    {
        href: "/products",
        label: "Shop",
        subLinks: [
            { href: "/products", label: "Shoping Products" },
            { href: "/gifting", label: "Gifting" },
        ]
    },
    { href: "/artists", label: "Artisans" },
    { href: "/our-story", label: "Our Story", subLinks: [
        { href: "/our-story", label: "Our Story" },
        { href: "/media/careers", label: "Join Us" },
        { href: "/contact", label: "Contact Us" },
    ] },
    {
        href: "/media/privacy&security",
        label: "Policy&security",
        subLinks: [
            { href: "/media/shipping", label: "Shipping Policy" },
            { href: "/media/returns", label: "Returns" },
            { href: "/media/refund", label: "Refund Policy" },
            { href: "/media/terms", label: "Terms of Service" },
            { href: "/media/privacy&security", label: "Privacy & Security" },
        ]
    },

];

const MobileLink = [
    { href: "/media/ourStory", label: "Our Story" },
    { href: "/media/post", label: "Journal" },
    { href: "/media/careers", label: "Careers" },
    { href: "/media/vendor", label: "Vendor" },
    { href: "/contact", label: "Contact Us" },
    { href: "/auth/register", label: "Register" },
    { href: "/admin/dashboard", label: "admin" },
    { href: "/wishlist", label: "wishlist" },
    { href: "/myAccount", label: "My Account" },
    { href: "/track-order/1", label: "Track Order" },
    { href: "/media/faq", label: "FAQ" },
    { href: "/media/shipping", label: "Shipping Policy" },
    { href: "/media/returns", label: "Returns" },
    { href: "/media/refund", label: "Refund Policy" },
    { href: "/media/terms", label: "Terms of Service" },
    { href: "/media/privacy&security", label: "Privacy & Security" },
    { href: "/media/cookies", label: "Cookie Policy" },
    // { href: "/media/post", label: "Post" },
];

export function Navbar() {
    const [hasMounted, setHasMounted] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        setHasMounted(true);
        setCartItemCount(cartLocalStorageData.getCartCount());

        const handleCartUpdate = () => {
            setCartItemCount(cartLocalStorageData.getCartCount());
        };

        window.addEventListener("cartUpdated", handleCartUpdate);
        return () => window.removeEventListener("cartUpdated", handleCartUpdate);
    }, []);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [expandedLinks, setExpandedLinks] = useState<string[]>([]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleSubLinks = (label: string) => {
        setExpandedLinks(prev =>
            prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
        );
    };

    const pathname = usePathname();
    const { openSearch } = useSearchStore();
    // const user = userLocalStorageData.getUser();

    return (
        <>
            <Suspense>
                < TopBarNotification />
            </Suspense>
            <header className="w-full h-22.5 border-b bg-background/80 backdrop-blur-lg flex items-center sticky top-0 z-50">
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
                                    <div key={link.href} className="relative group h-full flex items-center py-2">
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "text-sm font-medium transition-colors hover:text-foreground relative py-2",
                                                isActive ? "text-primary font-bold" : "text-muted-foreground"
                                            )}
                                        >
                                            <p className="text-[15px]">{link.label}</p>
                                            <span className={cn(
                                                "absolute bottom-0 left-0 w-full h-[2px] bg-primary transform transition-transform duration-300 ease-out",
                                                isActive ? "scale-x-100 origin-left" : "scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"
                                            )} />
                                        </Link>

                                        {link.subLinks && (
                                            <div className="absolute top-full left-0 invisible opacity-0 -translate-x-2 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out pt-4 w-48 z-50">
                                                <div className="bg-background shadow-lg flex flex-col py-2 border-x border-b">
                                                    {link.subLinks.map((subLink, index) => (
                                                        <Link
                                                            key={index}
                                                            href={subLink.href}
                                                            className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200 relative group/sub"
                                                        >
                                                            {subLink.label}
                                                            <span className="absolute bottom-1 left-4 w-[calc(100%-2rem)] h-0.5 bg-primary scale-x-0 origin-left group-hover/sub:scale-x-100 transition-transform duration-300 ease-out" />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {/* Attached Search Trigger (Desktop) */}
                        <div className="hidden lg:flex flex-1 max-w-md mx-6">

                        </div>

                        {/* Right Actions */}
                        <div className="flex items-end gap-1 md:gap-5 text-primary">
                            {/* Search Icon (Mobile/Tablet) */}
                            <Button
                                variant="outline"
                                size="icon"
                                className=" border-none hover:bg-transparent text-black hover:text-black"
                                onClick={openSearch}
                            >
                                <Search />
                            </Button>

                            <Button variant="outline" size="icon" className="hidden md:flex border-none hover:bg-transparent text-black hover:text-black">
                                <Link href="/wishlist">
                                    <Wishlist />
                                </Link>
                            </Button>

                            {/* Profile - Hidden on mobile */}
                            <Button variant="outline" size="icon" className="hidden md:flex border-none hover:bg-transparent text-black hover:text-black" asChild>
                                <Link href="/myAccount">
                                    <User />
                                </Link>
                            </Button>
                            {/* Cart - Hidden on mobile */}
                            <Button variant="outline" size="icon" className="relative hidden md:flex border-none hover:bg-transparent text-black hover:text-black " asChild>
                                <Link href="/cart">
                                    <ShoppingBag className="" />
                                    {cartItemCount > 0 && (
                                        <Badge
                                            className="absolute -right-1 -top-1 h-4 w-4 rounded-full p-0 text-[10px] flex items-center justify-center bg-primary text-primary-foreground border-none"
                                        >
                                            {cartItemCount}
                                        </Badge>
                                    )}
                                </Link>
                            </Button>

                            {/* Mobile Menu Toggle */}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden h-7 w-7  border-none "
                                onClick={toggleSidebar}
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Sidebar */}
            {isSidebarOpen && (
                <>
                    {/* Overlay */}
                    <div
                        onClick={toggleSidebar}
                        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[100] md:hidden"
                    />
                    {/* Panel */}
                    <div
                        className="fixed right-0 top-0 bottom-0 w-72 bg-background z-[101] md:hidden flex flex-col shadow-2xl border-l"
                    >
                        {/* Header */}
                        <div className="p-4 border-b flex items-center justify-between">
                            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="h-8 w-8 rounded-full">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Navigation */}
                        <div className="flex-1 overflow-y-auto py-4">
                            <nav className="flex flex-col px-3 gap-1">
                                {MobileLink.map((link) => {
                                    // const hasSubLinks = link.subLinks && link.subLinks.length > 0;
                                    const isExpanded = expandedLinks.includes(link.label);
                                    const isActive = pathname === link.href;

                                    return (
                                        <div key={link.label} className="flex flex-col">
                                            <div className="flex items-center group">
                                                <Link
                                                    href={link.href}
                                                    className={cn(
                                                        "flex-1 py-2 px-3 text-[14px] font-medium rounded-md transition-all",
                                                        isActive
                                                            ? "text-primary bg-primary/5"
                                                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                                    )}
                                                    onClick={toggleSidebar}
                                                >
                                                    {link.label}
                                                </Link>
                                                {/* {hasSubLinks && (
                                                    <button
                                                        onClick={() => toggleSubLinks(link.label)}
                                                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        <ChevronRight className={cn(
                                                            "h-3.5 w-3.5 transition-transform duration-200",
                                                            isExpanded && "rotate-90"
                                                        )} />
                                                    </button>
                                                )} */}
                                            </div>

                                            {/* {hasSubLinks && isExpanded && (
                                                <div className="ml-4 pl-2 border-l border-muted/50 flex flex-col mt-1 gap-1">
                                                    {link.subLinks?.map((sub, idx) => (
                                                        <Link
                                                            key={idx}
                                                            href={sub.href}
                                                            className="py-2 px-3 text-[13px] text-muted-foreground hover:text-primary transition-colors"
                                                            onClick={toggleSidebar}
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )} */}
                                        </div>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
