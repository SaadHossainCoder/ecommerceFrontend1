"use client";

import Link from "next/link";
import {
    DollarSign,
    ShoppingCart,
    Users,
    Package,
    ArrowUpRight,
    ArrowDownRight,
    AlertTriangle,
    Activity,
    History as HistoryIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const stats = [
    {
        name: "Total Revenue",
        value: "$45,231.89",
        change: "+20.1%",
        trend: "up",
        icon: DollarSign,
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
    {
        name: "Orders",
        value: "2,350",
        change: "+15.3%",
        trend: "up",
        icon: ShoppingCart,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        name: "Customers",
        value: "12,234",
        change: "+12.5%",
        trend: "up",
        icon: Users,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        name: "Products",
        value: "573",
        change: "-2.4%",
        trend: "down",
        icon: Package,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
];

const recentOrders = [
    { id: "SH-001234", customer: "John Doe", email: "john@example.com", amount: 299.99, status: "Completed", date: "2 hours ago" },
    { id: "SH-001233", customer: "Jane Smith", email: "jane@example.com", amount: 449.99, status: "Processing", date: "4 hours ago" },
    { id: "SH-001232", customer: "Bob Wilson", email: "bob@example.com", amount: 159.99, status: "Pending", date: "6 hours ago" },
    { id: "SH-001231", customer: "Alice Brown", email: "alice@example.com", amount: 89.99, status: "Completed", date: "8 hours ago" },
    { id: "SH-001230", customer: "Charlie Davis", email: "charlie@example.com", amount: 549.99, status: "Shipped", date: "12 hours ago" },
];

// const topProducts = [
//     { name: "Wireless Headphones", sales: 1234, revenue: 370436, progress: 90 },
//     { name: "Smart Watch Pro", sales: 987, revenue: 443923, progress: 75 },
//     { name: "Leather Backpack", sales: 654, revenue: 104593, progress: 55 },
//     { name: "Bluetooth Speaker", sales: 432, revenue: 30235, progress: 40 },
// ];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Completed":
            return "success";
        case "Processing":
            return "default";
        case "Pending":
            return "warning";
        case "Shipped":
            return "secondary";
        default:
            return "default";
    }
};

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                    Welcome back! Here&apos;s what&apos;s happening with your store.
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.name}>
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div className={`p-2 rounded-xl ${stat.bg}`}>
                                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                    </div>
                                    <div
                                        className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up" ? "text-success" : "text-destructive"
                                            }`}
                                    >
                                        {stat.trend === "up" ? (
                                            <ArrowUpRight className="h-4 w-4" />
                                        ) : (
                                            <ArrowDownRight className="h-4 w-4" />
                                        )}
                                        {stat.change}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-7">
                {/* Recent Orders */}
                <Card className="lg:col-span-4">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Orders</CardTitle>
                        <Button variant="outline" size="sm" asChild>
                            <Link href="/admin/orders">View All</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center font-medium">
                                            {order.customer.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium">{order.customer}</p>
                                            <p className="text-sm text-muted-foreground">{order.id}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">${order.amount}</p>
                                        <Badge
                                            variant={getStatusColor(order.status) as "success" | "default" | "warning" | "secondary"}
                                            className="text-xs"
                                        >
                                            {order.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Inventory Alerts */}
                <Card className="lg:col-span-3">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-amber-600 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Inventory Alerts
                        </CardTitle>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/admin/inventory">Restock</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Coffee Maker", stock: 2, status: "Critical" },
                                { name: "Leather Backpack", stock: 5, status: "Low" },
                                { name: "Smart Watch Pro", stock: 23, status: "Warning" },
                            ].map((item) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-sm">{item.name}</p>
                                        <p className="text-xs text-muted-foreground">{item.stock} left in stock</p>
                                    </div>
                                    <Badge variant={item.status === "Critical" ? "destructive" : "warning"}>
                                        {item.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* System Health */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-primary" />
                            Platform Health
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase">API Response</p>
                                    <p className="text-lg font-bold">124ms</p>
                                    <Progress value={92} className="h-1" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase">Uptime</p>
                                    <p className="text-lg font-bold">99.98%</p>
                                    <Progress value={99} className="h-1" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                                    <span className="text-sm font-medium">All systems operational</span>
                                </div>
                                <span className="text-xs text-muted-foreground">Updated 1m ago</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <HistoryIcon className="h-5 w-5 text-primary" />
                            Recent Activity
                        </CardTitle>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/admin/activity">View Log</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { event: "Product price changed", time: "2m ago", user: "Saad" },
                                { event: "Category 'Shoes' deleted", time: "15m ago", user: "Saad" },
                                { event: "New order #SH-9982", time: "45m ago", user: "Customer" },
                            ].map((act, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                                    <div className="flex-1">
                                        <p className="font-medium">{act.event}</p>
                                        <p className="text-xs text-muted-foreground">By {act.user} • {act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
