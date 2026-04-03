"use client";

import { useState } from "react";
import {
    History,
    Search,
    // Filter,
    // Calendar,
    Download,
    // User,
    Package,
    ShoppingCart,
    Shield,
    RefreshCcw,
    // ChevronDown,
    // Eye,
    // Clock,
    Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toaster";

const activeLogs = [
    {
        id: 1,
        user: "Saad Hossain",
        role: "Super Admin",
        avatar: "/avatars/saad.jpg",
        action: "Updated Product Price",
        target: "Premium Leather Backpack",
        type: "Product",
        timestamp: "2 mins ago",
        severity: "Info",
        fullDate: "Feb 01, 2024 • 12:42 PM",
        details: {
            oldPrice: "$119.99",
            newPrice: "$129.99",
            productId: "PRD-001",
            ipAddress: "192.168.1.12",
        }
    },
];

const getSeverityStyles = (severity: string) => {
    switch (severity) {
        case "Critical": return "bg-red-500/10 text-red-500 border-red-500/20";
        case "Warning": return "bg-amber-500/10 text-amber-500 border-amber-500/20";
        case "Success": return "bg-green-500/10 text-green-500 border-green-500/20";
        default: return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
};

const getIcon = (type: string) => {
    switch (type) {
        case "Product": return <Package className="h-4 w-4" />;
        case "Order": return <ShoppingCart className="h-4 w-4" />;
        case "Security": return <Shield className="h-4 w-4" />;
        case "Settings": return <RefreshCcw className="h-4 w-4" />;
        default: return <History className="h-4 w-4" />;
    }
};

export default function ActivityLogPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedLog, setSelectedLog] = useState<any>(null);

    const handleViewDetail = (log: any) => {
        setSelectedLog(log);
        setIsDetailOpen(true);
    };

    const handleExport = () => {
        toast({
            title: "Archiving History",
            description: "Generating a chronological record of system events for download.",
            variant: "info",
        });
    };

    const handleLoadMore = () => {
        toast({
            title: "Fetching Archives",
            description: "Retrieving historical data from deep storage...",
            variant: "info",
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Audit Trail</h1>
                    <p className="text-muted-foreground mt-1">
                        Track all administrative actions and system events
                    </p>
                </div>
                <Button variant="outline" onClick={handleExport}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Trace
                </Button>
            </div>

            {/* Filters */}
            <Card className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search actions..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </Card>

            {/* Activity Feed */}
            <div className="space-y-4">
                {activeLogs.map((log) => (
                    <div key={log.id}>
                        <Card className="hover:border-primary/50 transition-all cursor-pointer" onClick={() => handleViewDetail(log)}>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 text-sm">
                                <Avatar className="h-9 w-9 border">
                                    <AvatarFallback>{log.user.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold">{log.user}</p>
                                    <p className="text-xs text-muted-foreground">{log.role}</p>
                                </div>
                                <Separator orientation="vertical" className="hidden sm:block h-8 mx-2" />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{log.action}</span>
                                        <Badge variant="outline" className="text-[10px] uppercase">{log.type}</Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Target: {log.target}</p>
                                </div>
                                <div className="text-right">
                                    <Badge className={getSeverityStyles(log.severity)}>{log.severity}</Badge>
                                    <p className="text-[10px] text-muted-foreground mt-1">{log.timestamp}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>

            <div className="flex justify-center">
                <Button variant="ghost" className="text-muted-foreground" onClick={handleLoadMore}>
                    Load Older Records
                </Button>
            </div>

            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2"><Terminal className="h-5 w-5" /> Event Inspector</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <div className="bg-zinc-950 p-4 rounded-xl font-mono text-xs text-emerald-500 overflow-x-auto border border-zinc-800">
                            <pre>{JSON.stringify(selectedLog?.details, null, 2)}</pre>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button variant="outline" onClick={() => setIsDetailOpen(false)}>Close</Button>
                    </div>
                </DialogContent>
            </Dialog>
      </div>
    );
}
