"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuthGuardStore } from "@/store/auth-guard-store";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    ChevronLeft,
    Menu,
    Bell,
    Search,
    LogOut,
    Folders,
    TicketPercent,
    Store,
    Megaphone,
    BellRing,
    UserStar,
    Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const sidebarLinks = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
    },
    {
        label: "Products",
        href: "/admin/products",
        icon: Package,
    },
    {
        label: "review",
        href: "/admin/reviews",
        icon: UserStar,
    },
    {
        label: "Customers",
        href: "/admin/customers",
        icon: Users,
    },
    {
        label: "Categories",
        href: "/admin/categories",
        icon: Folders,
    },
    {
        label: "discounts",
        href: "/admin/discounts",
        icon: TicketPercent,
    },
    {
        label: "Vendors",
        href: "/admin/vender",
        icon: Store,
    },
    {
        label: "Banners",
        href: "/admin/makeBanner",
        icon: Megaphone,
    },
    {
        label: "Notification Bar",
        href: "/admin/notificationBar",
        icon: BellRing,
    }
];

export default function AdminLayoutClient({
    children,
}: {
    children: React.ReactNode;
}) {
    const { role, isLoading, isAuthenticated, authguard } = useAuthGuardStore();
    const [isInitializing, setIsInitializing] = useState(true);
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        let mounted = true;

        const initialize = async () => {
            try {
                // Only call authguard when we do not already know the user state
                if (!isAuthenticated || !role) {
                    await authguard();
                }
            } finally {
                if (mounted) {
                    setHasCheckedAuth(true);
                    setIsInitializing(false);
                }
            }
        };

        initialize();

        return () => {
            mounted = false;
        };
    }, [authguard, isAuthenticated, role]);

    // Show loading state while initializing
    if (isInitializing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/30">
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <Loader className="h-12 w-12 animate-spin text-primary" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-lg font-semibold text-foreground">Initializing Admin Portal</p>
                        <p className="text-sm text-muted-foreground">Please wait while we verify your access...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Guard: redirect or show error if not authenticated
    if (!isAuthenticated || !role) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-muted/30">
                <div className="text-center space-y-4">
                    <p className="text-lg font-semibold text-destructive">Access Denied</p>
                    <p className="text-muted-foreground">You are not authorized to access this area.</p>
                    <Link href="/auth/login" className=" bg-amber-800 p-3 text-white  hover:underline ">
                        Return to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Mobile Overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-50 h-screen bg-card border-r transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"
                    } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="flex h-16 items-center justify-between px-4 border-b">
                        {sidebarOpen && (
                            <Link href="/admin/dashboard" className="flex items-center gap-2">
                                <div className="flex size-9 items-center justify-center rounded-xl bg-primary">
                                    <span className="text-lg font-bold text-primary-foreground">S</span>
                                </div>
                                <span className="text-xl font-bold">Admin</span>
                            </Link>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="hidden lg:flex"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            <ChevronLeft
                                className={`h-5 w-5 transition-transform ${sidebarOpen ? "" : "rotate-180"
                                    }`}
                            />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {sidebarLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                        }`}
                                >
                                    <link.icon className="size-5 shrink-0" />
                                    {sidebarOpen && <span>{link.label}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t">
                        <Link
                            href="/"
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        >
                            <LogOut className="size-5 shrink-0" />
                            {sidebarOpen && <span>Back to Store</span>}
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div
                className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "lg:ml-20"
                    }`}
            >
                {/* Header */}
                <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 backdrop-blur px-4 lg:px-8">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            <Menu className="size-5" />
                        </Button>
                        <div className="hidden sm:block w-64">
                            <Input
                                placeholder="Search..."
                                icon={<Search className="size-4" />}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="size-5" />
                            <Badge
                                variant="destructive"
                                className="absolute -right-1 -top-1 size-5 rounded-full p-0 text-xs flex items-center justify-center"
                            >
                                3
                            </Badge>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Avatar className="size-8">
                                        <AvatarImage src="/avatar.jpg" alt="Admin" />
                                        <AvatarFallback>AD</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium">Admin User</span>
                                        <span className="text-xs text-muted-foreground">
                                            admin@shophub.com
                                        </span>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/admin/settings">Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                    <LogOut className="size-4 mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 lg:p-8">{children}</main>
            </div>
        </div>
    );
}
