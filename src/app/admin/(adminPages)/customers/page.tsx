"use client";

import { useState } from "react";
import {
    Search,
    MoreHorizontal,
    Mail,
    MapPin,
    Calendar,
    ShoppingBag,
    UserPlus,
    Filter,
    Download,
    Eye,
    Star,
    User,
    Upload,
    Edit2,
    Trash2,
    ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { toast } from "@/components/ui/toaster";

// Mock Data
const initialCustomers = [
    {
        id: "CUST-001",
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890",
        location: "New York, USA",
        joinedDate: "2023-05-12",
        orders: 12,
        totalSpent: 1250.00,
        status: "Active",
        avatar: "/avatars/01.png",
    },
    {
        id: "CUST-002",
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1 987 654 321",
        location: "London, UK",
        joinedDate: "2023-06-15",
        orders: 8,
        totalSpent: 450.00,
        status: "Active",
        avatar: "/avatars/02.png",
    },
];

export default function CustomersPage() {
    const [customers, setCustomers] = useState(initialCustomers);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Modal States
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isBlacklistOpen, setIsBlacklistOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<any>(null);

    const filteredCustomers = customers.filter((customer) => {
        const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAddCustomer = () => {
        setEditingCustomer(null);
        setIsAddEditOpen(true);
    };

    const handleEditCustomer = (customer: any) => {
        setEditingCustomer(customer);
        setIsAddEditOpen(true);
    };

    const handleDeleteClick = (customer: any) => {
        setEditingCustomer(customer);
        setIsDeleteOpen(true);
    };

    const handleBlacklistClick = (customer: any) => {
        setEditingCustomer(customer);
        setIsBlacklistOpen(true);
    };

    const handleExport = () => {
        toast({
            title: "Exporting Customers",
            description: "Preparing a secure CSV export of your customer directory...",
            variant: "info",
        });
    };

    const handleSendEmail = (customer: any) => {
        toast({
            title: "Compose Email",
            description: `Drafting a direct message to ${customer.email}.`,
            variant: "info",
        });
    };

    const handleViewProfile = (customer: any) => {
        toast({
            title: "Viewing Details",
            description: `Opening comprehensive history for ${customer.name}.`,
            variant: "info",
        });
    };

    const confirmSave = () => {
        setIsAddEditOpen(false);
        toast({
            title: editingCustomer ? "Profile Updated" : "Customer Created",
            description: "The action was completed successfully.",
            variant: "success",
        });
    };

    const confirmDelete = () => {
        setIsDeleteOpen(false);
        toast({
            title: "Account Deleted",
            description: "The customer record has been permanently removed.",
            variant: "destructive",
        });
    };

    const confirmBlacklist = () => {
        setIsBlacklistOpen(false);
        toast({
            title: "Customer Blacklisted",
            description: "Access has been restricted for this user.",
            variant: "destructive",
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your customer relations and view their purchase history
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                    <Button variant="gradient" onClick={handleAddCustomer}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Customer
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <ShoppingBag className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Total Customers</p>
                            <h3 className="text-2xl font-bold">12,234</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl">
                            <UserPlus className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">New Customers</p>
                            <h3 className="text-2xl font-bold">+180</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-100 dark:bg-amber-900/20 rounded-xl">
                            <Star className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Retention Rate</p>
                            <h3 className="text-2xl font-bold">78%</h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search & Filters */}
            <Card className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 max-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name or email..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <Filter className="h-4 w-4 mr-2" />
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </Card>

            {/* Customers Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-muted/30">
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Customer</th>
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Location</th>
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Orders</th>
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Total Spent</th>
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Joined</th>
                                <th className="p-4 text-left font-medium text-xs uppercase tracking-wider text-muted-foreground">Status</th>
                                <th className="p-4 text-right font-medium text-xs uppercase tracking-wider text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <>
                                {filteredCustomers.map((customer) => (
                                    <tr
                                        key={customer.id}
                                        className="hover:bg-muted/30 transition-colors"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={customer.avatar} alt={customer.name} />
                                                    <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-sm">{customer.name}</p>
                                                    <p className="text-xs text-muted-foreground line-clamp-1">{customer.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                                <MapPin className="h-3.5 w-3.5" />
                                                {customer.location}
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm">
                                            {customer.orders} orders
                                        </td>
                                        <td className="p-4 font-medium text-sm">
                                            ${customer.totalSpent.toFixed(2)}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                                <Calendar className="h-3.5 w-3.5" />
                                                {customer.joinedDate}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant={customer.status === "Active" ? "success" : "secondary"}>
                                                {customer.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem onClick={() => handleEditCustomer(customer)}>
                                                        <Edit2 className="h-3.5 w-3.5 mr-2" />
                                                        Edit Profile
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleSendEmail(customer)}>
                                                        <Mail className="h-3.5 w-3.5 mr-2" />
                                                        Send Email
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleViewProfile(customer)}>
                                                        <Eye className="h-3.5 w-3.5 mr-2" />
                                                        Order History
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-amber-500" onClick={() => handleBlacklistClick(customer)}>
                                                        <ShieldAlert className="h-3.5 w-3.5 mr-2" />
                                                        Restrict Access
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(customer)}>
                                                        <Trash2 className="h-3.5 w-3.5 mr-2" />
                                                        Delete Record
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </>
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Add/Edit Customer Modal */}
            <Dialog open={isAddEditOpen} onOpenChange={setIsAddEditOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingCustomer ? "Edit Customer Profile" : "Add New Customer"}</DialogTitle>
                        <DialogDescription>
                            Confirm the personal and contact details for this account.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="flex flex-col items-center gap-4 mb-2">
                            <Avatar className="h-20 w-20 border-2 border-muted">
                                <AvatarImage src={editingCustomer?.avatar || ""} />
                                <AvatarFallback className="text-2xl bg-primary/5">{editingCustomer?.name?.charAt(0) || <User className="h-10 w-10 text-primary/20" />}</AvatarFallback>
                            </Avatar>
                            <Button variant="outline" size="sm">
                                <Upload className="h-3.5 w-3.5 mr-2" />
                                Change Avatar
                            </Button>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="cust-name">Full Name</Label>
                            <Input id="cust-name" defaultValue={editingCustomer?.name} placeholder="e.g. John Doe" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="cust-email">Email Address</Label>
                                <Input id="cust-email" type="email" defaultValue={editingCustomer?.email} placeholder="john@example.com" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="cust-phone">Phone Number</Label>
                                <Input id="cust-phone" defaultValue={editingCustomer?.phone} placeholder="+1 234 567 890" />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsAddEditOpen(false)}>Cancel</Button>
                        <Button variant="gradient" onClick={confirmSave}>
                            Save Information
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Delete Customer Record</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to remove <strong>{editingCustomer?.name}</strong>? This will permanently delete their purchase history.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={confirmDelete}>Confirm Deletion</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Blacklist Confirmation Modal */}
            <Dialog open={isBlacklistOpen} onOpenChange={setIsBlacklistOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-amber-600">Restrict Customer Access</DialogTitle>
                        <DialogDescription>
                            Prevent <strong>{editingCustomer?.name}</strong> from placing new orders or accessing their account.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsBlacklistOpen(false)}>Cancel</Button>
                        <Button variant="gradient" onClick={confirmBlacklist}>Apply Restriction</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
