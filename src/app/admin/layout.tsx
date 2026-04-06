"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    ChevronLeft,
    Menu,
    Bell,
    Search,
    LogOut,
    // BarChart3,
    // ClipboardList,
    // History,
    // MessageSquare,
    Folders,
    LineChart,
    TriangleAlert,
    ShelvingUnit,
    TicketPercent,
    ChartNetwork,
    MonitorCog,
    Store,
    Megaphone,
    BellRing,
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
// import { AdminGuard } from "@/hooks/admin-guard";
// import { useAuthGuard } from "@/hooks/use-auth-guard";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { useRouter } from "next/navigation";

const sidebarLinks = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Products",
        href: "/admin/products",
        icon: Package,
    },
    {
        label: "Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
    },
    {
        label: "Customers",
        href: "/admin/customers",
        icon: Users,
    },
    {
        label: "Analytics",
        href: "/admin/analytics",
        icon: LineChart,
    },
    {
        label: "Categories",
        href: "/admin/categories",
        icon: Folders,
    },
    // {
    //     label: "Settings",
    //     href: "/admin/settings",
    //     icon: Settings,
    // },
    {
        label: "reports",
        href: "/admin/reports",
        icon: TriangleAlert,
    },
    {
        label: "Inventory",
        href: "/admin/inventory",
        icon: ShelvingUnit,
    },
    {
        label: "discounts",
        href: "/admin/discounts",
        icon: TicketPercent,
    },
    // {
    //     label: "activity log",
    //     href: "/admin/activity",
    //     icon: ChartNetwork,
    // },
    {
        label: "system actions",
        href: "/admin/system",
        icon: MonitorCog,
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

export default function AdminLayout({
 children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();

    return (
        // <AdminGuard>
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
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
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
                                        <link.icon className="h-5 w-5 shrink-0" />
                                        {sidebarOpen && <span>{link.label}</span>}
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* Footer */}
                        <div className="p-4 border-t">
                            <Link
                                href="/home"
                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                            >
                                <LogOut className="h-5 w-5 shrink-0" />
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
                                <Menu className="h-5 w-5" />
                            </Button>
                            <div className="hidden sm:block w-64">
                                <Input
                                    placeholder="Search..."
                                    icon={<Search className="h-4 w-4" />}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">


                            <Button variant="ghost" size="icon" className="relative">
                                <Bell className="h-5 w-5" />
                                <Badge
                                    variant="destructive"
                                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                                >
                                    3
                                </Badge>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Avatar className="h-8 w-8">
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
                                        <LogOut className="h-4 w-4 mr-2" />
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
        // </AdminGuard>
    );
}

