
import { Store, Globe, Sparkles, ShieldCheck, CheckCircle } from "lucide-react";

const TRUST_BADGES = [
    {
        icon: Store,
        text: "25+ stores in India and 3 International Stores",
    },
    {
        icon: Globe,
        text: "World Wide Free Shipping",
    },
    {
        icon: Sparkles,
        text: "Handcrafted Detailing",
    },
    {
        icon: ShieldCheck,
        text: "100% Secured Payment",
    },
    {
        icon: CheckCircle,
        text: "Assured Quality",
    },
];

export const TrustBadges = () => {
    return (
        <section className="py-20 bg-background border-y border-ash-brown/10">
            <div className="container-custom">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 md:gap-x-8">
                    {TRUST_BADGES.map((badge, index) => (
                        <div 
                            key={index} 
                            className="flex flex-col items-center text-center space-y-5 group"
                        >
                            <div className="relative">
                                <div className="absolute -inset-2 bg-antique-gold/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                                <badge.icon className="w-8 h-8 text-foreground stroke-[1px] group-hover:text-secondary transition-colors duration-500" />
                            </div>
                            <p className="text-[11px] md:text-xs font-medium tracking-widest text-foreground/70 group-hover:text-foreground transition-colors duration-500 uppercase leading-relaxed max-w-[160px]">
                                {badge.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

