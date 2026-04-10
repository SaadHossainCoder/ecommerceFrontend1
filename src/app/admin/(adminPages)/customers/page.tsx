"use client";

import { useState, useEffect, useMemo } from "react";
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
    Loader2,
    RefreshCw
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
import { toast } from "@/components/ui/toaster";
import { useUserStore } from "@/store/user-store";
import UserFrom from "./_components/userFrom";
import SendMailFrom from "./_components/sendMailFrom";

export default function CustomersPage() {
    const { users, isLoading, fetchUsers, updateUser, deleteUser, sendEmail } = useUserStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Modal States
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isBlacklistOpen, setIsBlacklistOpen] = useState(false);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<any>(null);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const filteredCustomers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());
            const status = user.isBlocked ? "Blocked" : "Active";
            const matchesStatus = statusFilter === "all" || status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [users, searchTerm, statusFilter]);

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
        setEditingCustomer(customer);
        setIsEmailOpen(true);
    };

    const handleViewProfile = (customer: any) => {
        toast({
            title: "Viewing Details",
            description: `Opening comprehensive history for ${customer.username}.`,
            variant: "info",
        });
    };

    const saveCustomerData = async (data: any) => {
        if (!editingCustomer) return;
        const success = await updateUser(editingCustomer.id, data);
        if (success) {
            setIsAddEditOpen(false);
            await fetchUsers();
            toast({
                title: "Profile Updated",
                description: "Customer profile details have been successfully modified.",
                variant: "success",
            });
        } else {
            toast({
                title: "Action Failed",
                description: "Could not apply profile modifications. Please test again.",
                variant: "destructive",
            });
        }
    };

    const confirmDelete = async () => {
        if (!editingCustomer) return;
        const success = await deleteUser(editingCustomer.id);
        if (success) {
            setIsDeleteOpen(false);
            await fetchUsers();
            toast({
                title: "Account Deleted",
                description: "The customer record has been permanently removed.",
                variant: "destructive",
            });
        } else {
            toast({
                title: "Action Failed",
                description: "Could not delete customer record.",
                variant: "destructive",
            });
        }
    };

    const confirmBlacklist = async () => {
        if (!editingCustomer) return;
        const newStatus = !editingCustomer.isBlocked;
        const success = await updateUser(editingCustomer.id, { isBlocked: newStatus });
        if (success) {
            setIsBlacklistOpen(false);
            await fetchUsers();
            toast({
                title: newStatus ? "Customer Restricted" : "Customer Access Restored",
                description: newStatus ? "Access has been severely restricted for this user." : "The account restrictions were manually cleared.",
                variant: "success",
            });
        } else {
            toast({
                title: "Toggle Action Failed",
                description: "Unable to update the user's operational state.",
                variant: "destructive",
            });
        }
    };

    const handleSendEmailSubmit = async (subject: string, message: string) => {
        if (!editingCustomer) return;
        const success = await sendEmail(editingCustomer.id, subject, message);
        if (success) {
            setIsEmailOpen(false);
            toast({
                title: "Email Processed",
                description: `Successfully transmitted network packet to ${editingCustomer.email}.`,
                variant: "success",
            });
        } else {
            toast({
                title: "Transmission Failed",
                description: "SMTP handshake failed or server error.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-6 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your customer relations, authentication locks, and view purchase histories.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={() => fetchUsers()} disabled={isLoading}>
                        <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                        Refresh List
                    </Button>
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="h-4 w-4 mr-2" />
                        Export Data
                    </Button>
                </div>
            </div>

            {/* Search & Filters */}
            <Card className="p-4 shadow-sm border border-primary/10">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1 max-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground font-bold" />
                        <Input
                            placeholder="Find customers by scanning names or email addresses..."
                            className="pl-9 bg-muted/30 border-none shadow-inner"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px] bg-muted/30 border-none">
                            <Filter className="h-4 w-4 mr-2 text-primary" />
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Every Customer Status</SelectItem>
                            <SelectItem value="Active">Active Operations</SelectItem>
                            <SelectItem value="Blocked">Locked & Blocked Hubs</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </Card>

            {/* Customers Table */}
            <Card className="overflow-hidden shadow-sm border border-primary/10">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span className="text-sm font-semibold text-muted-foreground">Gathering User Data...</span>
                        </div>
                    ) : filteredCustomers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground bg-muted/5">
                            <User className="h-16 w-16 opacity-20" />
                            <p className="font-bold text-lg">No Results Hit Database</p>
                            <p className="text-sm">Filter adjustment highly recommended.</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="border-b bg-muted/40">
                                    <th className="p-4 text-left font-bold text-[10px] uppercase tracking-wider text-muted-foreground">Profile Origin & Account</th>
                                    <th className="p-4 text-left font-bold text-[10px] uppercase tracking-wider text-muted-foreground">Location</th>
                                    <th className="p-4 text-left font-bold text-[10px] uppercase tracking-wider text-muted-foreground">Registered Date</th>
                                    <th className="p-4 text-left font-bold text-[10px] uppercase tracking-wider text-muted-foreground">Account Shield</th>
                                    <th className="p-4 text-right font-bold text-[10px] uppercase tracking-wider text-muted-foreground">Control Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-primary/5">
                                {filteredCustomers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-primary/5 transition-colors group cursor-pointer"
                                    >
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <Avatar className="h-10 w-10 border border-primary/20 shadow-sm relative overflow-hidden group-hover:scale-105 transition-transform">
                                                    <AvatarFallback className="bg-primary/10 text-primary font-black uppercase">
                                                        {user.username.charAt(0)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-bold text-sm tracking-tight text-foreground/90">{user.username}</p>
                                                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                                                <MapPin className="h-3.5 w-3.5 text-primary/50" />
                                                Cloud IP Bound
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                                                <Calendar className="h-3.5 w-3.5 text-primary/50" />
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant={user.isBlocked ? "destructive" : "success"} className="shadow-xs font-bold uppercase tracking-widest text-[9px] px-2 py-0.5">
                                                {user.isBlocked ? "Locked out" : "Active Check"}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-background shadow-xs hover:text-foreground">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-52 rounded-2xl p-1.5 shadow-xl border-primary/10">
                                                    <DropdownMenuItem className="py-2.5 rounded-xl cursor-pointer" onClick={() => handleEditCustomer(user)}>
                                                        <Edit2 className="h-3.5 w-3.5 mr-3 text-primary" />
                                                        Update Details
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="py-2.5 rounded-xl cursor-pointer" onClick={() => handleSendEmail(user)}>
                                                        <Mail className="h-3.5 w-3.5 mr-3 text-primary" />
                                                        Direct Reach Target
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="py-2.5 rounded-xl text-amber-600 focus:bg-amber-500/10 cursor-pointer" onClick={() => handleBlacklistClick(user)}>
                                                        <ShieldAlert className="h-3.5 w-3.5 mr-3" />
                                                        {user.isBlocked ? "Clear Blacklist" : "Commit Blacklist"}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="py-2.5 rounded-xl text-destructive focus:bg-destructive/10 cursor-pointer mt-1" onClick={() => handleDeleteClick(user)}>
                                                        <Trash2 className="h-3.5 w-3.5 mr-3" />
                                                        Wipe Identity Permanently
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </Card>

            {/* Add/Edit Customer Modal */}
            <Dialog open={isAddEditOpen} onOpenChange={setIsAddEditOpen}>
                <DialogContent className="sm:max-w-[450px] overflow-hidden rounded-3xl p-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl">Modifier Node</DialogTitle>
                        <DialogDescription>
                            Override current user settings properly and commit securely to active memory.
                        </DialogDescription>
                    </DialogHeader>
                    {isAddEditOpen && (
                        <UserFrom 
                            initialData={editingCustomer} 
                            onClose={() => setIsAddEditOpen(false)} 
                            onSave={saveCustomerData} 
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-destructive flex items-center gap-2">
                            <Trash2 className="h-5 w-5" /> Delete User Origin
                        </DialogTitle>
                        <DialogDescription className="pt-2">
                            A deletion command has been passed. By executing this routine, <strong>{editingCustomer?.username}</strong> will be stripped from internal databases permanently! Verify trajectory...
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6 flex gap-2">
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)} className="flex-1">Halt Sequence</Button>
                        <Button variant="destructive" onClick={confirmDelete} className="flex-1 shadow-md shadow-destructive/20">Purge Memory</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Blacklist Confirmation Modal */}
            <Dialog open={isBlacklistOpen} onOpenChange={setIsBlacklistOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-amber-500 flex items-center gap-2">
                            <ShieldAlert className="h-5 w-5" /> Protocol Restrict / Unlock
                        </DialogTitle>
                        <DialogDescription className="pt-2">
                            {editingCustomer?.isBlocked 
                                ? <>You are about to lift restrictions from <strong>{editingCustomer?.username}</strong>, effectively re-granting their server rights and capabilities.</>
                                : <>Initiating a network lockdown for <strong>{editingCustomer?.username}</strong> paralyzing access to login logic.</>}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6 flex gap-2">
                        <Button variant="outline" onClick={() => setIsBlacklistOpen(false)} className="flex-1">Halt Setup</Button>
                        <Button variant="default" className="flex-1 bg-amber-500 text-white shadow-md shadow-amber-500/20 hover:bg-amber-600" onClick={confirmBlacklist}>
                            {editingCustomer?.isBlocked ? "Permit Rights" : "Restrict Immediately"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Email Dispatcher Modal */}
            <Dialog open={isEmailOpen} onOpenChange={setIsEmailOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5 text-primary" /> Transmit Direct Alert
                        </DialogTitle>
                        <DialogDescription className="pt-2">
                            Address an email securely delivered directly to <strong>{editingCustomer?.email}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    {isEmailOpen && (
                        <SendMailFrom 
                            customer={editingCustomer} 
                            onClose={() => setIsEmailOpen(false)} 
                            onSend={handleSendEmailSubmit} 
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
