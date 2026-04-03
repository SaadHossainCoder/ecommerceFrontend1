"use client";

import React from "react";
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
    // BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, ArrowUpRight, ArrowDownRight, Users, DollarSign, ShoppingBag, Eye } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/toaster";

// Mock Data
const revenueData = [
    { name: "Mon", total: 1540 },
    { name: "Tue", total: 2300 },
    { name: "Wed", total: 1800 },
    { name: "Thu", total: 2800 },
    { name: "Fri", total: 3400 },
    { name: "Sat", total: 4500 },
    { name: "Sun", total: 3900 },
];

const salesData = [
    { name: "Jan", sales: 4000 },
];

const userGrowthData = [
    { name: "Week 1", users: 120 },
];

const categoryData = [
    { name: "Electronics", value: 400 },
    { name: "Clothing", value: 300 },
    { name: "Home", value: 300 },
    { name: "Sports", value: 200 },
];

const COLORS = ["#8b5cf6", "#ec4899", "#3b82f6", "#10b981"];

const StatCard = ({ title, value, change, trend, icon: Icon }: any) => (
    <Card className="p-6">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
                <h3 className="text-2xl font-bold">{value}</h3>
            </div>
            <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <span className={`flex items-center font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {change}
            </span>
            <span className="text-muted-foreground ml-2">vs last month</span>
        </div>
    </Card>
);

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = React.useState("7d");

    const handleExport = () => {
        toast({
            title: "Generating Analytics Snapshot",
            description: "Aggregating multi-dimensional data for your PDF report.",
            variant: "info",
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Market Intelligence</h1>
                    <p className="text-muted-foreground mt-1">Detailed insights into your store's performance</p>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger className="w-[140px]">
                            <Calendar className="w-4 h-4 mr-2" />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="24h">24 Hours</SelectItem>
                            <SelectItem value="7d">7 Days</SelectItem>
                            <SelectItem value="30d">30 Days</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value="$45,231.89" change="+20.1%" trend="up" icon={DollarSign} />
                <StatCard title="Active Users" value="+2,350" change="+180.1%" trend="up" icon={Users} />
                <StatCard title="Sales" value="+12,234" change="+19%" trend="up" icon={ShoppingBag} />
                <StatCard title="Page Views" value="234,561" change="-4.5%" trend="down" icon={Eye} />
            </div>

            <div className="grid grid-cols-1 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold mb-6">Revenue Trajectory</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                                <Tooltip />
                                <Area type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={3} fill="url(#colorTotal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </div>
    );
}
