"use client";

import { useState } from "react";
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    FileText,
    Download,
    Calendar,
    ArrowUpRight,
    Search,
    PieChart,
    Layers,
    ShoppingCart,
    DollarSign,
    Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toaster";

// Mock Data
const reportTemplates = [
    {
        title: "Sales Summary",
        description: "Monthly revenue and order volume breakdown",
        icon: DollarSign,
        lastGenerated: "2 hours ago",
        status: "Auto-Generated",
    },
    {
        title: "Customer Retention",
        description: "New vs returning customer behavior analysis",
        icon: TrendingUp,
        lastGenerated: "1 day ago",
        status: "Manual",
    },
    {
        title: "Inventory Turnover",
        description: "How quickly stock is being sold and replaced",
        icon: Layers,
        lastGenerated: "3 days ago",
        status: "Scheduled",
    },
    {
        title: "Marketing ROI",
        description: "Performance of current discount campaigns",
        icon: BarChart3,
        lastGenerated: "5 hours ago",
        status: "Auto-Generated",
    },
];

export default function ReportsPage() {
    // Modal States
    const [isCustomOpen, setIsCustomOpen] = useState(false);

    const handleExport = (report: any) => {
        toast({
            title: "Preparing Export",
            description: `Compiling data for ${report.title}. PDF will download shortly.`,
            variant: "info",
        });
    };

    const handleQuickExport = () => {
        toast({
            title: "Quick Snapshot",
            description: "Analysing today's performance. Your report is being generated.",
            variant: "info",
        });
    };

    const handleDownloadRecent = (fileName: string) => {
        toast({
            title: "Retrying Download",
            description: `Fetching ${fileName} from secure storage...`,
            variant: "success",
        });
    };

    const confirmGenerateCustom = () => {
        setIsCustomOpen(false);
        toast({
            title: "Report Construction Started",
            description: "Custom parameters accepted. You will be notified when the file is ready.",
            variant: "success",
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Business Reports</h1>
                    <p className="text-muted-foreground mt-1">
                        Deep dive into your store's performance with specialized reports
                    </p>
                </div>
                <Button variant="gradient" onClick={() => setIsCustomOpen(true)}>
                    <FileText className="h-4 w-4 mr-2" />
                    Custom Report
                </Button>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 bg-muted/50 border-none">
                    <p className="text-xs text-muted-foreground font-bold uppercase">Net Profit</p>
                    <div className="flex items-center gap-2 mt-2">
                        <h3 className="text-2xl font-bold">$12,450</h3>
                        <Badge variant="success" className="text-[10px]">+14%</Badge>
                    </div>
                </Card>
                <Card className="p-4 bg-muted/50 border-none">
                    <p className="text-xs text-muted-foreground font-bold uppercase">Avg Order Value</p>
                    <div className="flex items-center gap-2 mt-2">
                        <h3 className="text-2xl font-bold">$142.00</h3>
                        <Badge variant="success" className="text-[10px]">+2.4%</Badge>
                    </div>
                </Card>
                <Card className="p-4 bg-muted/50 border-none">
                    <p className="text-xs text-muted-foreground font-bold uppercase">Return Rate</p>
                    <div className="flex items-center gap-2 mt-2">
                        <h3 className="text-2xl font-bold">1.2%</h3>
                        <Badge className="text-[10px] bg-blue-500/10 text-blue-500">Stable</Badge>
                    </div>
                </Card>
                <Card className="p-4 bg-muted/50 border-none">
                    <p className="text-xs text-muted-foreground font-bold uppercase">Ad Spend</p>
                    <div className="flex items-center gap-2 mt-2">
                        <h3 className="text-2xl font-bold">$2,100</h3>
                        <Badge variant="warning" className="text-[10px]">+5%</Badge>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Available Reports */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold px-1">Available Reports</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {reportTemplates.map((report) => (
                            <div
                                key={report.title}
                            >
                                <Card className="cursor-pointer group hover:border-primary transition-colors h-full">
                                    <CardHeader>
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                                <report.icon className="h-5 w-5" />
                                            </div>
                                            <Badge variant="outline" className="text-[10px]">{report.status}</Badge>
                                        </div>
                                        <CardTitle className="text-lg">{report.title}</CardTitle>
                                        <CardDescription className="text-xs line-clamp-2">
                                            {report.description}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="mt-auto">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] text-muted-foreground">Generated {report.lastGenerated}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 px-2 group-hover:text-primary"
                                                onClick={() => handleExport(report)}
                                            >
                                                <Download className="h-4 w-4 mr-2" />
                                                PDF
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Generator Info/Actions */}
                <div className="space-y-6">
                    <Card className="bg-linear-to-br from-primary to-primary/80 text-primary-foreground shadow-xl border-none">
                        <CardHeader>
                            <CardTitle>Quick Export</CardTitle>
                            <CardDescription className="text-primary-foreground/80">
                                Get a quick snapshot of today's performance
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Select defaultValue="pdf">
                                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                                    <SelectValue placeholder="Format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pdf">PDF Document</SelectItem>
                                    <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                                    <SelectItem value="xlsx">Excel File</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                className="w-full bg-white text-primary hover:bg-white/90"
                                onClick={handleQuickExport}
                            >
                                Generate Snapshot
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Recent Downloads</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {[
                                    { name: "sales-mar-2024.pdf", size: "2.4 MB" },
                                    { name: "inventory-audit.csv", size: "842 KB" },
                                    { name: "tax-report-q1.pdf", size: "1.2 MB" },
                                ].map((file) => (
                                    <div
                                        key={file.name}
                                        className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
                                        onClick={() => handleDownloadRecent(file.name)}
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                                            <div>
                                                <p className="text-xs font-medium line-clamp-1">{file.name}</p>
                                                <p className="text-[10px] text-muted-foreground">{file.size}</p>
                                            </div>
                                        </div>
                                        <Download className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Custom Report Generation Modal */}
            <Dialog open={isCustomOpen} onOpenChange={setIsCustomOpen}>
                <DialogContent className="sm:max-w-[550px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-primary" />
                            Custom Report Configuration
                        </DialogTitle>
                        <DialogDescription>
                            Select the metrics and timeframe you want to include in your custom export.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        <div className="grid gap-2">
                            <Label>Reporting Period</Label>
                            <div className="grid grid-cols-2 gap-4">
                                <Select defaultValue="last-30">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Timeframe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="today">Today</SelectItem>
                                        <SelectItem value="last-7">Last 7 Days</SelectItem>
                                        <SelectItem value="last-30">Last 30 Days</SelectItem>
                                        <SelectItem value="custom">Custom Range</SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted/50 text-xs text-muted-foreground italic">
                                    <Calendar className="h-3.5 w-3.5" />
                                    Select dates in next step
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <Label>Data Points to Include</Label>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/30 transition-colors">
                                    <Checkbox id="sales-data" defaultChecked />
                                    <label htmlFor="sales-data" className="text-sm font-medium leading-none cursor-pointer">Revenue & Sales</label>
                                </div>
                                <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/30 transition-colors">
                                    <Checkbox id="cust-data" defaultChecked />
                                    <label htmlFor="cust-data" className="text-sm font-medium leading-none cursor-pointer">Customer Insights</label>
                                </div>
                                <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/30 transition-colors">
                                    <Checkbox id="inv-data" />
                                    <label htmlFor="inv-data" className="text-sm font-medium leading-none cursor-pointer">Inventory Status</label>
                                </div>
                                <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-muted/30 transition-colors">
                                    <Checkbox id="tax-data" />
                                    <label htmlFor="tax-data" className="text-sm font-medium leading-none cursor-pointer">Tax & Compliance</label>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="export-format">Export Format</Label>
                            <Select defaultValue="pdf">
                                <SelectTrigger id="export-format">
                                    <SelectValue placeholder="Select format" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pdf">Adobe PDF (.pdf)</SelectItem>
                                    <SelectItem value="csv">Comma Separated Values (.csv)</SelectItem>
                                    <SelectItem value="xlsx">Microsoft Excel (.xlsx)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCustomOpen(false)}>Cancel</Button>
                        <Button variant="gradient" onClick={confirmGenerateCustom}>
                            <Download className="h-4 w-4 mr-2" />
                            Compile and Download
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
