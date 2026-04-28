"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
// import Link from "next/link";
import { 
    MapPin, 
    Plus, 
    Pencil, 
    Trash2, 
    Search,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAddressStore } from "@/store/address-stor";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AddressForm } from "./_components/addressFrom";

export default function AddressPage() {
    const addresses = useAddressStore(state => state.addresses);
    const isLoading = useAddressStore(state => state.isLoading);
    const error = useAddressStore(state => state.error);
    const fetchAddresses = useAddressStore(state => state.fetchAddresses);
    const deleteAddress = useAddressStore(state => state.deleteAddress);
    const setDefault = useAddressStore(state => state.setDefault);

    const [searchQuery, setSearchQuery] = useState("");
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    useEffect(() => {
        fetchAddresses();
    }, []); // Only fetch once on mount

    const filteredAddresses = useMemo(() => {
        if (!Array.isArray(addresses)) return [];
        return addresses.filter(addr => 
            addr.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            addr.street?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            addr.city?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [addresses, searchQuery]);

    const handleCloseDialog = useCallback(() => {
        setIsAddDialogOpen(false);
    }, []);

    return (
        <section className="bg-[#FAF9F6] min-h-screen">
            <div className="container-custom py-12 lg:py-24 max-w-6xl mx-auto md:px-6">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                    <div className="space-y-4">
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-stone-400">Personal Vault</span>
                        <h1 className="text-5xl md:text-6xl font-serif text-stone-900 leading-tight">Shipping <span className="italic text-stone-400">Address</span></h1>
                        <p className="text-stone-500 max-w-md font-light text-lg">
                            Manage your curated delivery locations for an effortless checkout experience.
                        </p>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl animate-in fade-in slide-in-from-top-2 mb-8">
                            <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">{error}</p>
                        </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative flex-1 sm:flex-none">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <Input 
                                placeholder="Search addresses..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-11 pr-4 w-full sm:w-[260px] h-12 bg-white border-stone-200 focus:border-stone-900 transition-all rounded-full text-sm" 
                            />
                        </div>
                        <Button 
                            onClick={() => setIsAddDialogOpen(true)}
                            className="h-12 px-8 bg-stone-900 text-white hover:bg-stone-800 rounded-full flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold border-none"
                        >
                            <Plus className="w-4 h-4" /> Add New
                        </Button>
                    </div>
                </div>

                {isLoading && addresses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 space-y-4">
                        <Loader2 className="w-8 h-8 text-stone-300 animate-spin" />
                        <p className="text-stone-400 font-light italic">Accessing your vault...</p>
                    </div>
                ) : error ? (
                    <div className="bg-white border border-red-100 p-20 rounded-[2rem] text-center">
                         <div className="h-24 w-24 rounded-full bg-red-50 mx-auto flex items-center justify-center mb-8 border border-red-100">
                            <MapPin className="h-10 w-10 text-red-300" />
                        </div>
                        <h3 className="text-3xl font-serif mb-4 text-stone-900">Vault Access Failed</h3>
                        <p className="text-stone-400 mb-10 max-w-sm mx-auto font-light leading-relaxed">
                            {error}
                        </p>
                        <Button 
                            onClick={() => fetchAddresses()}
                            className="rounded-full bg-stone-900 text-white hover:bg-stone-800 px-10 h-14 text-[10px] uppercase tracking-[0.25em] font-bold"
                        >
                            Retry Synchronizing
                        </Button>
                    </div>
                ) : filteredAddresses.length === 0 ? (
                    <div className="bg-white border border-dashed border-stone-200 p-20 rounded-[2rem] text-center">
                        <div className="h-24 w-24 rounded-full bg-stone-50 mx-auto flex items-center justify-center mb-8 border border-stone-100">
                            <MapPin className="h-10 w-10 text-stone-300" />
                        </div>
                        <h3 className="text-3xl font-serif mb-4 text-stone-900">
                            {searchQuery ? "No matches found" : "No locations yet"}
                        </h3>
                        <p className="text-stone-400 mb-10 max-w-sm mx-auto font-light leading-relaxed">
                            {searchQuery 
                                ? `We couldn't find any addresses matching "${searchQuery}".`
                                : "You have no saved addresses. Please provide a destination to ensure secure delivery."}
                        </p>
                        {!searchQuery && (
                            <Button 
                                onClick={() => setIsAddDialogOpen(true)}
                                className="rounded-full bg-stone-900 text-white hover:bg-stone-800 px-10 h-14 text-[10px] uppercase tracking-[0.25em] font-bold"
                            >
                                Add First Address
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-5">
                        {filteredAddresses.map((address) => (
                            <div 
                                key={address.id}
                                className={cn(
                                    "group bg-white overflow-hidden transition-all duration-500 rounded-[2rem]",
                                    address.isDefault ? "ring-1 ring-stone-900/10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]" : "border border-stone-100 hover:border-stone-200 shadow-sm"
                                )}
                            >
                                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
                                    <div className="flex items-center gap-6">
                                        <div className={cn(
                                            "h-16 w-16 shrink-0 border rounded-2xl flex items-center justify-center transition-colors",
                                            address.isDefault ? "bg-stone-900 text-white border-stone-900" : "bg-stone-50 text-stone-400 border-stone-100"
                                        )}>
                                            <MapPin className="h-7 w-7" />
                                        </div>
                                        <div className="space-y-1.5 min-w-0">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <p className="text-xl font-bold text-stone-900 font-serif">{address.name}</p>
                                                <Badge className={cn(
                                                    "rounded-full px-3 py-1 text-[8px] uppercase tracking-widest font-bold border",
                                                    address.isDefault ? "bg-stone-900 text-white border-stone-900" : "bg-stone-50 text-stone-500 border-stone-100"
                                                )}>
                                                    {address.label || (address.addressType === "MY_ADDRESS" ? "Home" : "Gift")}
                                                </Badge>
                                                {address.isDefault && (
                                                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold ml-1">Default</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 text-[10px] font-bold text-stone-400 uppercase tracking-widest">
                                                <span className="truncate max-w-[200px] sm:max-w-none">{address.street}, {address.city}, {address.state}</span>
                                                <span className="w-1 h-1 rounded-full bg-stone-200 shrink-0"></span>
                                                <span>{address.postalCode}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between md:justify-end gap-10 w-full md:w-auto">
                                        <div className="md:text-right hidden sm:block">
                                            <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-1">Contact</p>
                                            <p className="text-lg font-mono text-stone-600">{address.phone}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="h-12 w-12 rounded-full bg-stone-50 text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-all flex items-center justify-center border border-stone-100">
                                                <Pencil className="h-5 w-5" />
                                            </button>
                                            <button 
                                                onClick={() => deleteAddress(address.id)}
                                                className="h-12 w-12 rounded-full bg-red-50/50 text-stone-400 hover:text-red-600 hover:bg-red-50 transition-all flex items-center justify-center border border-red-50/50"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                            {!address.isDefault && (
                                                <button 
                                                    onClick={() => setDefault(address.id)}
                                                    className="h-12 px-6 rounded-full bg-stone-50 text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-all flex items-center justify-center border border-stone-100 text-[9px] font-bold uppercase tracking-widest"
                                                >
                                                    Set Default
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Address Dialog */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogContent className="sm:max-w-[600px] bg-[#FAF9F6] border-stone-200 p-0 overflow-hidden rounded-[2.5rem]">
                    <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                        <DialogHeader className="mb-10 text-left">
                            <DialogTitle className="text-4xl font-serif text-stone-900 mb-4">
                                New <span className="italic text-stone-400">Location</span>
                            </DialogTitle>
                            <p className="text-stone-500 font-light text-base leading-relaxed">
                                Provide the details for your new shipping destination below.
                            </p>
                        </DialogHeader>
                        <AddressForm 
                            onSuccess={handleCloseDialog} 
                            onCancel={handleCloseDialog} 
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}