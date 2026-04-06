"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Plus,
    Search,
    MoreHorizontal,
    Edit2,
    Trash2,
    RefreshCw,
    Loader2,
    AlertCircle,
    Bell,
    BellOff,
    BellRing,
    Hash,
    Calendar,
    Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toaster";
import { TopBarNotification } from "@/services/notification-bar.service";
import { useNotificationStore } from "@/store/notification-store";
import { notificationSchema, NotificationFormData } from "@/validations/notification.validation";
import { NotificationForm } from "./_components/NotificationForm";

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function NotificationBarPage() {
    const { notifications, isLoading, error, fetchNotifications, addNotification, editNotification, removeNotification } = useNotificationStore();

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selected, setSelected] = useState<TopBarNotification | null>(null);

    // ─── Form Setup ───
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<NotificationFormData>({
        resolver: zodResolver(notificationSchema),
        defaultValues: {
            title: "",
            message: "",
            link: "",
            isActive: true,
        },
    });

    const watchedIsActive = watch("isActive");

    // Initial load
    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    // Filtering
    const filtered = notifications.filter((n) => {
        const matchSearch =
            n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            n.message.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus =
            statusFilter === "ALL" ||
            (statusFilter === "ACTIVE" && n.isActive) ||
            (statusFilter === "INACTIVE" && !n.isActive);
        return matchSearch && matchStatus;
    });

    // ─── Operations ───
    const onSubmit = async (data: NotificationFormData) => {
        let success = false;
        if (isEditOpen && selected) {
            success = await editNotification(selected.id, data);
        } else {
            success = await addNotification(data);
        }

        if (success) {
            toast({
                title: isEditOpen ? "Notification Updated" : "Notification Created",
                description: `"${data.title}" has been processed successfully.`,
                variant: "success",
            });
            setIsAddOpen(false);
            setIsEditOpen(false);
            reset();
        } else {
            toast({
                title: "Error",
                description: error || "Something went wrong.",
                variant: "destructive",
            });
        }
    };

    const handleDelete = async () => {
        if (!selected) return;
        const success = await removeNotification(selected.id);
        if (success) {
            toast({ title: "Notification Deleted", variant: "destructive" });
            setIsDeleteOpen(false);
            setIsViewOpen(false);
        }
    };

    const handleToggle = async (n: TopBarNotification) => {
        const success = await editNotification(n.id, { isActive: !n.isActive });
        if (success) {
            toast({
                title: n.isActive ? "Deactivated" : "Activated",
                description: `"${n.title}" status updated.`,
                variant: "success",
            });
            if (selected?.id === n.id) {
                setSelected({ ...n, isActive: !n.isActive });
            }
        }
    };

    const openEdit = (n: TopBarNotification) => {
        setSelected(n);
        reset({
            title: n.title,
            message: n.message,
            link: n.link || "",
            isActive: n.isActive,
        });
        setIsViewOpen(false);
        setIsEditOpen(true);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Notification Bar</h1>
                    <p className="text-muted-foreground mt-1">Manage top-bar announcements shown across your store</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => fetchNotifications(true)} disabled={isLoading} title="Refresh">
                        <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                    <Button variant="gradient" onClick={() => { reset(); setIsAddOpen(true); }}>
                        <Plus className="h-4 w-4 mr-2" /> New Notification
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-5">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl"><Bell className="w-5 h-5 text-primary" /></div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Total</p>
                            <h3 className="text-2xl font-bold">{notifications.length}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-5">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl"><BellRing className="w-5 h-5 text-green-600 dark:text-green-400" /></div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Active</p>
                            <h3 className="text-2xl font-bold">{notifications.filter(n => n.isActive).length}</h3>
                        </div>
                    </div>
                </Card>
                <Card className="p-5">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-muted rounded-xl"><BellOff className="w-5 h-5 text-muted-foreground" /></div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Inactive</p>
                            <h3 className="text-2xl font-bold">{notifications.filter(n => !n.isActive).length}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Search + Filter */}
            <Card className="p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search notifications..." className="pl-9" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className="flex gap-2">
                        {(["ALL", "ACTIVE", "INACTIVE"] as const).map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => setStatusFilter(s)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${statusFilter === s
                                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                        : "border-border hover:border-primary/50 text-muted-foreground"
                                    }`}
                            >
                                {s.charAt(0) + s.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Content handling */}
            {isLoading && notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <p className="text-sm">Loading notifications...</p>
                </div>
            ) : error && notifications.length === 0 ? (
                <Card className="p-8 border-destructive/40 bg-destructive/5">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <AlertCircle className="w-8 h-8 text-destructive" />
                        <p className="font-semibold text-destructive">{error}</p>
                        <Button variant="outline" size="sm" onClick={() => fetchNotifications(true)}><RefreshCw className="h-4 w-4 mr-2" /> Retry</Button>
                    </div>
                </Card>
            ) : filtered.length === 0 ? (
                <Card className="p-12">
                    <div className="flex flex-col items-center gap-3 text-center text-muted-foreground">
                        <Bell className="w-12 h-12 opacity-30" />
                        <p className="font-semibold text-lg">{searchTerm || statusFilter !== "ALL" ? "No notifications match your filters" : "No notifications yet"}</p>
                        {!searchTerm && statusFilter === "ALL" && (
                            <Button variant="gradient" onClick={() => { reset(); setIsAddOpen(true); }}>
                                <Plus className="h-4 w-4 mr-2" /> Create Your First Notification
                            </Button>
                        )}
                    </div>
                </Card>
            ) : (
                <div className="grid gap-4">
                    {filtered.map((n) => (
                        <Card key={n.id} className={`p-4 hover:shadow-md transition-all border-l-4 ${n.isActive ? "border-l-green-500" : "border-l-muted"}`}>
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <h3 className="font-bold text-base leading-tight">{n.title}</h3>
                                        <Badge variant={n.isActive ? "success" : "secondary"} className="text-[10px] h-4 uppercase tracking-wider font-bold">
                                            {n.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{n.message}</p>
                                    {n.link && (
                                        <p className="text-xs text-primary mt-2 truncate max-w-[80%] hover:underline">
                                            {n.link}
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleToggle(n)} title={n.isActive ? "Deactivate" : "Activate"}>
                                        {n.isActive ? <BellRing className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => { setSelected(n); setIsViewOpen(true); }}>
                                                <Eye className="h-3.5 w-3.5 mr-2" /> View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => openEdit(n)}>
                                                <Edit2 className="h-3.5 w-3.5 mr-2" /> Edit Notification
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="text-destructive" onClick={() => { setSelected(n); setIsDeleteOpen(true); }}>
                                                <Trash2 className="h-3.5 w-3.5 mr-2" /> Delete Notification
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Dialogs */}
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                        <DialogTitle>New Announcement</DialogTitle>
                        <DialogDescription>Create a top-bar notification for your store visitors.</DialogDescription>
                    </DialogHeader>
                    <NotificationForm
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        errors={errors}
                        watchedIsActive={watchedIsActive}
                        setValue={setValue}
                    />
                    <DialogFooter className="pt-2">
                        <Button variant="outline" onClick={() => setIsAddOpen(false)} disabled={isLoading}>Cancel</Button>
                        <Button type="submit" form="notif-form" variant="gradient" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null} Publish
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="sm:max-w-[480px]">
                    <DialogHeader>
                        <DialogTitle>Edit Notification</DialogTitle>
                        <DialogDescription>Update the announcement details.</DialogDescription>
                    </DialogHeader>
                    <NotificationForm
                        register={register}
                        handleSubmit={handleSubmit}
                        onSubmit={onSubmit}
                        errors={errors}
                        watchedIsActive={watchedIsActive}
                        setValue={setValue}
                    />
                    <DialogFooter className="pt-2">
                        <Button variant="outline" onClick={() => setIsEditOpen(false)} disabled={isLoading}>Cancel</Button>
                        <Button type="submit" form="notif-form" variant="gradient" disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null} Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[420px]">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Delete Notification</DialogTitle>
                        <DialogDescription>Are you sure you want to delete <strong>{selected?.title}</strong>?</DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)} disabled={isLoading}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    {selected && (
                        <>
                            <DialogHeader>
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl font-bold">{selected.title}</h2>
                                    <Badge variant={selected.isActive ? "success" : "secondary"}>{selected.isActive ? "Active" : "Inactive"}</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">ID: {selected.id}</p>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                                <div>
                                    <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Message</p>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                                </div>
                                {selected.link && (
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Link</p>
                                        <a href={selected.link} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline break-all">{selected.link}</a>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2 border-t">
                                    <Calendar className="h-3 w-3" /> Published on {new Date(selected.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <DialogFooter className="mt-6 border-t pt-4 gap-2">
                                <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
                                <Button variant="gradient" onClick={() => openEdit(selected)}>Edit Notification</Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}