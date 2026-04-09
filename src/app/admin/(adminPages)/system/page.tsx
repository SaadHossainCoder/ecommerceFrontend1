"use client";

import { useState, useEffect, useRef } from "react";
import {
    Activity,
    Server,
    Cpu,
    Database,
    Globe,
    Terminal as TerminalIcon,
    RefreshCcw,
    Zap,
    ShieldCheck,
    HardDrive,
    Signal,
    Play,
    Square,
    ChevronRight,
    Search,
    Download,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/toaster";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// --- Mock Data Generator ---
const generateLog = () => {
    const services = ["API-GATEWAY", "AUTH-SERVICE", "PRODUCT-DB", "STRIPE-HOOKS", "IMG-OPTIMIZER", "EDGE-RUNTIME"];
    const levels = ["INFO", "WARN", "ERROR", "DEBUG", "TRACE"];
    const messages = [
        "Inbound request processed in 42ms",
        "Connection pooled for cluster-0",
        "Invalid token signature detected",
        "Cache invalidated for path /products",
        "Heartbeat broadcast successful",
        "Database migration lock released",
        "Memory threshold exceeded (85%)",
        "Primary shard rebalanced",
    ];

    return {
        timestamp: new Date().toLocaleTimeString(),
        service: services[Math.floor(Math.random() * services.length)],
        level: levels[Math.floor(Math.random() * levels.length)],
        message: messages[Math.floor(Math.random() * messages.length)],
        id: Math.random().toString(36).substr(2, 9),
    };
};

const StatusGlow = ({ status }: { status: "active" | "warning" | "error" }) => {
    const colors = {
        active: "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]",
        warning: "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.4)]",
        error: "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]",
    };
    return (
        <div className={`h-2 w-2 rounded-full animate-pulse ${colors[status]}`} />
    );
};

export default function SystemMonitorPage() {
    const [logs, setLogs] = useState<any[]>([]);
    const [isLive, setIsLive] = useState(true);
    const [cpuUsage, setCpuUsage] = useState(24);
    const [ramUsage, setRamUsage] = useState(42);
    const [diskUsage, setDiskUsage] = useState(68);
    const logEndRef = useRef<HTMLDivElement>(null);

    // Simulated Real-time data
    useEffect(() => {
        if (!isLive) return;

        const interval = setInterval(() => {
            setLogs((prev) => [generateLog(), ...prev.slice(0, 49)]);
            setCpuUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() * 10 - 5))));
            setRamUsage(prev => Math.min(100, Math.max(0, prev + (Math.random() * 2 - 1))));
        }, 1500);

        return () => clearInterval(interval);
    }, [isLive]);

    const handleRestart = (service: string) => {
        toast({
            title: `Restarting ${service}`,
            description: "Executing graceful shutdown and respawn sequence.",
            variant: "warning",
        });
    };

    const handleClearLogs = () => {
        setLogs([]);
        toast({
            title: "Tailing Cleared",
            description: "Buffer has been flushed.",
            variant: "info",
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-foreground to-foreground/50 bg-clip-text text-transparent">System Infrastructure</h1>
                    <div className="text-muted-foreground mt-1 flex items-center gap-2">
                        <StatusGlow status="active" />
                        Live Cluster: <span className="text-foreground font-mono font-bold tracking-tighter">US-EAST-RG-01</span>
                    </div>                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" onClick={() => setIsLive(!isLive)}>
                        {isLive ? <Square className="h-3.5 w-3.5 mr-2 fill-current" /> : <Play className="h-3.5 w-3.5 mr-2 fill-current" />}
                        {isLive ? "Pause Stream" : "Resume Stream"}
                    </Button>
                    <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" onClick={() => handleRestart("Full Cluster")}>
                        <RefreshCcw className="h-3.5 w-3.5 mr-2" />
                        Full Sync
                    </Button>
                </div>
            </div>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300">
                    <CardContent className="p-4 pt-4">
                        <div className="flex justify-between items-center mb-3">
                            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                                <Zap className="h-4 w-4" />
                            </div>
                            <Badge variant="outline" className="text-[10px] border-emerald-500/20 text-emerald-500">HEALTHY</Badge>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">API Server</p>
                        <h3 className="text-2xl font-bold mt-1">99.98%</h3>
                        <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                            <Signal className="h-3 w-3" /> Average latency: 24ms
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                    <CardContent className="p-4 pt-4">
                        <div className="flex justify-between items-center mb-3">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                                <Database className="h-4 w-4" />
                            </div>
                            <Badge variant="outline" className="text-[10px] border-blue-500/20 text-blue-500">CONNECTED</Badge>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Database</p>
                        <h3 className="text-2xl font-bold mt-1">4.2 TB</h3>
                        <p className="text-[10px] text-muted-foreground mt-1">
                            Sharding: Cluster-G2 Active
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                    <CardContent className="p-4 pt-4">
                        <div className="flex justify-between items-center mb-3">
                            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                                <ShieldCheck className="h-4 w-4" />
                            </div>
                            <Badge variant="outline" className="text-[10px] border-purple-500/20 text-purple-500">ENCRYPTED</Badge>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Global CDN</p>
                        <h3 className="text-2xl font-bold mt-1">128 Nodes</h3>
                        <p className="text-[10px] text-muted-foreground mt-1">
                            Edge Runtime: V1.2.4
                        </p>
                    </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
                    <CardContent className="p-4 pt-4">
                        <div className="flex justify-between items-center mb-3">
                            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                                <HardDrive className="h-4 w-4" />
                            </div>
                            <Badge variant="outline" className="text-[10px] border-orange-500/20 text-orange-500">OPTIMAL</Badge>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Cold Storage</p>
                        <h3 className="text-2xl font-bold mt-1">14.8 PB</h3>
                        <p className="text-[10px] text-muted-foreground mt-1">
                            LRS (Locally Redundant)
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Resource Gauges */}
                <div className="space-y-6">
                    <Card className="bg-card/80 backdrop-blur-xl border-primary/5">
                        <CardHeader>
                            <CardTitle className="text-sm font-bold uppercase tracking-widest">Hardware Distribution</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="flex items-center gap-2"><Cpu className="h-3 w-3 text-emerald-500" /> CPU Allocation</span>
                                    <span>{cpuUsage.toFixed(1)}%</span>
                                </div>
                                <Progress value={cpuUsage} className="h-2 bg-emerald-500/10" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="flex items-center gap-2"><HardDrive className="h-3 w-3 text-blue-500" /> Memory (RAM)</span>
                                    <span>{ramUsage.toFixed(1)}%</span>
                                </div>
                                <Progress value={ramUsage} className="h-2 bg-blue-500/10" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold">
                                    <span className="flex items-center gap-2"><HardDrive className="h-3 w-3 text-orange-500" /> Storage Capacity</span>
                                    <span>{diskUsage.toFixed(1)}%</span>
                                </div>
                                <Progress value={diskUsage} className="h-2 bg-orange-500/10" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary/5 border-primary/20 border-dashed">
                        <CardHeader className="p-4">
                            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                <Server className="h-4 w-4 text-primary" /> Service Management
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-2">
                            {["API GATEWAY", "IMAGE ENGINE", "PAYMENT BRIDGE"].map((svc) => (
                                <div key={svc} className="flex items-center justify-between p-2 rounded-lg bg-card/40 border">
                                    <div className="flex items-center gap-3">
                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        <span className="text-[10px] font-bold tracking-tight">{svc}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-primary/10 hover:text-primary" onClick={() => handleRestart(svc)}>
                                        <RefreshCcw className="h-3 w-3" />
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Real-time Logs Terminal */}
                <Card className="lg:col-span-2 bg-[#0A0A0A] border-zinc-800 shadow-2xl overflow-hidden group">
                    <CardHeader className="border-b border-zinc-800 bg-zinc-900/50 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-red-500/50" />
                                <div className="h-3 w-3 rounded-full bg-amber-500/50" />
                                <div className="h-3 w-3 rounded-full bg-emerald-500/50" />
                            </div>
                            <div className="h-4 w-px bg-zinc-800 mx-2" />
                            <CardTitle className="text-zinc-400 text-xs font-mono lowercase flex items-center gap-2">
                                <TerminalIcon className="h-3 w-3 text-primary" />
                                stdout --tail 50
                            </CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-500 hover:text-zinc-200" onClick={handleClearLogs}>
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-500 hover:text-zinc-200">
                                <Download className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 font-mono text-[11px] leading-relaxed">
                        <div className="h-[450px] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-800 flex flex-col-reverse">
                            <>
                                {logs.map((log, i) => (
                                    <div
                                        key={log.id}
                                        className="flex gap-4 py-0.5"
                                    >
                                        <span className="text-zinc-600 shrink-0 select-none">[{log.timestamp}]</span>
                                        <span className={`shrink-0 font-bold px-1.5 rounded-[2px] ${log.level === 'ERROR' ? 'bg-rose-500/10 text-rose-500' :
                                            log.level === 'WARN' ? 'bg-amber-500/10 text-amber-500' :
                                                log.level === 'DEBUG' ? 'bg-blue-500/10 text-blue-500' :
                                                    'bg-zinc-800 text-zinc-400'
                                            }`}>
                                            {log.level}
                                        </span>
                                        <span className="text-primary/70 shrink-0 font-bold underline decoration-primary/20 underline-offset-2 tracking-tighter italic">
                                            {log.service}
                                        </span>
                                        <span className="text-zinc-300 border-l border-zinc-800 pl-4">{log.message}</span>
                                    </div>
                                ))}
                            </>
                            {logs.length === 0 && (
                                <div className="h-full flex items-center justify-center text-zinc-600 italic">
                                    Awaiting system telemetry...
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
