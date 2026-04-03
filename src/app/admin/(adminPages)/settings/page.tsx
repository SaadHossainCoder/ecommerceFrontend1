"use client";

import { useState } from "react";
import {
    Settings,
    User,
    Store,
    CreditCard,
    Truck,
    Bell,
    Shield,
    Globe,
    Mail,
    Lock,
    Save,
    Plus,
    Key,
    AlertCircle,
    Unlink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/toaster";

export default function SettingsPage() {
    // Modal States
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [isConnectOpen, setIsConnectOpen] = useState(false);
    const [isDisconnectOpen, setIsDisconnectOpen] = useState(false);
    const [selectedGateway, setSelectedGateway] = useState<string>("");

    const handleConnectGateway = (name: string) => {
        setSelectedGateway(name);
        setIsConnectOpen(true);
    };

    const handleDisconnectClick = (name: string) => {
        setSelectedGateway(name);
        setIsDisconnectOpen(true);
    };

    const handleSaveGeneral = () => {
        toast({
            title: "Configuration Saved",
            description: "Store metadata and regional settings haven been synchronized.",
            variant: "success",
        });
    };

    const handleProfileUpdate = () => {
        toast({
            title: "Identity Updated",
            description: "Your administrative profile has been refreshed.",
            variant: "success",
        });
    };

    const confirmPasswordChange = () => {
        setIsPasswordOpen(false);
        toast({
            title: "Credentials Rotated",
            description: "New security keys have been deployed to your account.",
            variant: "success",
        });
    };

    const confirmConnect = () => {
        setIsConnectOpen(false);
        toast({
            title: "Pipeline established",
            description: `Successfully integrated ${selectedGateway} as a payment vector.`,
            variant: "success",
        });
    };

    const confirmDisconnect = () => {
        setIsDisconnectOpen(false);
        toast({
            title: "Integration Severed",
            description: `${selectedGateway} is no longer processing transactions.`,
            variant: "destructive",
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">System Configuration</h1>
                    <p className="text-muted-foreground mt-1">
                        Architect your store's infrastructure and administrative perimeter
                    </p>
                </div>
                <Button variant="gradient" onClick={handleSaveGeneral}>
                    <Save className="h-4 w-4 mr-2" />
                    Save All Changes
                </Button>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="bg-muted/50 p-1 rounded-xl h-auto flex-wrap">
                    <TabsTrigger value="general" className="rounded-lg px-4 py-2">
                        <Store className="h-4 w-4 mr-2" />
                        Infrastructure
                    </TabsTrigger>
                    <TabsTrigger value="account" className="rounded-lg px-4 py-2">
                        <User className="h-4 w-4 mr-2" />
                        Identity
                    </TabsTrigger>
                    <TabsTrigger value="payments" className="rounded-lg px-4 py-2">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Finance
                    </TabsTrigger>
                    <TabsTrigger value="shipping" className="rounded-lg px-4 py-2">
                        <Truck className="h-4 w-4 mr-2" />
                        Logistics
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-lg px-4 py-2">
                        <Bell className="h-4 w-4 mr-2" />
                        Comms
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Core Metadata</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Project Name</Label>
                                    <Input defaultValue="Royal Gallery Boutique" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Primary Endpoint</Label>
                                    <Input defaultValue="admin@royalgallery.com" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Regional Protocol</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Linguistic Multi-threading</Label>
                                    <p className="text-xs text-muted-foreground">Enable dynamic localization for content</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label>Standardized Metrics</Label>
                                    <p className="text-xs text-muted-foreground">Force SI units across distribution channels</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="account" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Administrative Identity</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-6 mb-6">
                                <div className="h-20 w-20 rounded-full bg-linear-to-br from-primary to-primary/60 flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-lg">
                                    RG
                                </div>
                                <Button variant="outline" onClick={() => toast({ title: "Module Locked", description: "Identity provider is managed externally.", variant: "info" })}>Shift Vector</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Given Name</Label>
                                    <Input defaultValue="Supreme" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Family Name</Label>
                                    <Input defaultValue="Administrator" />
                                </div>
                            </div>
                            <Button onClick={handleProfileUpdate} className="mt-4">Update Profile</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Security Perimeter</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsPasswordOpen(true)}>
                                <Lock className="h-4 w-4 mr-2" />
                                Rotate Master Key
                            </Button>
                            <div className="flex items-center justify-between py-2 border-t mt-4 pt-4">
                                <div className="space-y-0.5">
                                    <Label>Multi-Factor Authentication</Label>
                                    <p className="text-xs text-muted-foreground">Require secondary verification for access</p>
                                </div>
                                <Switch />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="payments" className="space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Financial Gateways</CardTitle>
                                <CardDescription>Managing secure payment ingestion</CardDescription>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => handleConnectGateway("New Vector")}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Vector
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-xl bg-muted/30 hover:bg-muted transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold italic">S</div>
                                    <div>
                                        <p className="text-sm font-bold">Stripe Connect</p>
                                        <p className="text-xs text-green-500 font-medium">Operational & Secure</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => handleDisconnectClick("Stripe")} className="text-destructive font-bold">Disconnect</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Recurrent Modals */}
            <Dialog open={isPasswordOpen} onOpenChange={setIsPasswordOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Rotate Authentication Key</DialogTitle>
                        <DialogDescription>
                            Establishing new credentials for the administrative perimeter.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label>Active Key</Label>
                            <Input type="password" />
                        </div>
                        <Separator />
                        <div className="grid gap-2">
                            <Label>New Cipher</Label>
                            <Input type="password" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPasswordOpen(false)}>Abort</Button>
                        <Button variant="gradient" onClick={confirmPasswordChange}>Commit Rotation</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isConnectOpen} onOpenChange={setIsConnectOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Interface with {selectedGateway}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="p-3 bg-primary/5 rounded-lg flex gap-3 border border-primary/20 text-primary">
                            <Shield className="h-5 w-5 shrink-0" />
                            <p className="text-xs font-semibold">Encryption keys are hashed at rest and never transmitted in plaintext.</p>
                        </div>
                        <div className="grid gap-2">
                            <Label>Public Identity Token</Label>
                            <Input placeholder="pk_live_..." />
                        </div>
                        <div className="grid gap-2">
                            <Label>Secret Secure Hex</Label>
                            <Input type="password" placeholder="sk_live_..." />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsConnectOpen(false)}>Cancel</Button>
                        <Button variant="gradient" onClick={confirmConnect}>Finalize Bridge</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDisconnectOpen} onOpenChange={setIsDisconnectOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Sever Financial Bridge</DialogTitle>
                        <DialogDescription>
                            Are you certain you wish to de-link <strong>{selectedGateway}</strong>? This will immediately halt all transaction processing via this provider.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsDisconnectOpen(false)}>Halt Action</Button>
                        <Button variant="destructive" onClick={confirmDisconnect}>Sever Connection</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
