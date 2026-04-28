"use client";

import { useEffect, useState } from "react";
import { TruckIcon as Truck } from "@/components/icon/truck";
import { useNotificationStore } from "@/store/notification-store";

const TopBarNotification = () => {
    const { notifications, fetchNotifications } = useNotificationStore();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const activeNotifications = notifications.filter(n => n.isActive);

    useEffect(() => {
        if (activeNotifications.length <= 1) return;
        
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % activeNotifications.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [activeNotifications.length]);

    // Fixed height to ensure sub-pixel perfect alignment
    const ITEM_HEIGHT_PX = 24;

    if (activeNotifications.length === 0) return null;

    return (
        <div className="bg-[linear-gradient(to_right,black_0%,#4a1d1d_20%,#4a1d1d_80%,black_100%)] text-primary-foreground py-2 border-b border-white/5 relative z-60 overflow-hidden h-10 flex items-center justify-center group">
            {/* Professional Noise/Grain Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none mix-blend-overlay" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
            />

            
            <div className="container-custom h-6 relative z-10 overflow-hidden">
                <div 
                    className="flex flex-col transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] w-full"
                    style={{ transform: `translateY(-${index * ITEM_HEIGHT_PX}px)` }}
                >
                    {activeNotifications.map((n) => (
                        <div 
                            key={n.id} 
                            style={{ height: `${ITEM_HEIGHT_PX}px` }}
                            className="flex items-center justify-center gap-4 text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-medium whitespace-nowrap text-white/90"
                        >
                            <span className="flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                            </span>
                            <span className="hidden sm:inline group-hover:text-white transition-colors font-bold text-[13px]">{n.title || 'Welcome to Gemini'}</span>
                            <span className="sm:hidden font-bold text-[10px]">{n.message || 'Welcome to Gemini'}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default TopBarNotification;