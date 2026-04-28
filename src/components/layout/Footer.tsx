"use client";

import Link from "next/link";
import Image from "next/image";
import {TwitterIcon as Twitter} from "@/components/icon/twitter";
import {InstagramIcon as Instagram } from "@/components/icon/instagram";
import {FacebookIcon as Facebook } from "@/components/icon/facebook";
import {LinkedinIcon} from "@/components/icon/linkedin";
import {YoutubeIcon as Youtube} from "@/components/icon/youtube";
import {MessageCircleCheckIcon as Whatsapp} from "@/components/icon/message-circle-check";
import { MapPin, Phone, Mail } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const footerLinks = {
    company: [
        { href: "/media/ourStory", label: "Our Story" },
        { href: "/media/post", label: "Journal" },
        { href: "/media/careers", label: "Careers" },
        { href: "/media/vendor", label: "Vendor" },
        { href: "/contact", label: "Contact Us" },
        { href: "/auth/register", label: "Register" },
        { href: "/admin/dashboard", label: "admin" },
        { href: "/wishlist", label: "wishlist" },

    ],
    support: [
        { href: "/myAccount", label: "My Account" },
        { href: "/track-order/1", label: "Track Order" },
        { href: "/media/faq", label: "FAQ" },
        { href: "/media/shipping", label: "Shipping Policy" },
        { href: "/media/returns", label: "Returns" },
        { href: "/media/refund", label: "Refund Policy" },
    ],
    legal: [
        { href: "/media/terms", label: "Terms of Service" },
        { href: "/media/privacy&security", label: "Privacy & Security" },
        { href: "/media/cookies", label: "Cookie Policy" },
        { href: "/media/post", label: "Post" },

        // { href: "/media/careers", label: "Careers" },
        // { href: "/media/cookies", label: "Cookie Policy" },
    ]
};

const socialLinks = [
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://linkedin.com", icon: LinkedinIcon, label: "LinkedIn" },
    { href: "https://twitter.com", icon: Twitter, label: "X" },
    { href: "https://youtube.com", icon: Youtube, label: "YouTube" },
    { href: "https://whatsapp.com", icon: Whatsapp, label: "WhatsApp" },
];

export function Footer() {
    const pathname = usePathname();
    return (
        <footer className="relative text-foreground pt-24 overflow-hidden border-t border-white/5 bg-[#34150f]">
            {/* Premium Background Effects */}
            <div className="absolute bottom-0 left-0 w-full z-10 hidden lg:block pointer-events-none overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#34150f] to-transparent z-20" />
                <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#34150f] to-transparent z-20" />
                <Image 
                    src="/footer3.png" 
                    alt="footer-image" 
                    width={1920} 
                    height={1080} 
                    className="w-full h-auto" 
                />
            </div>
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Subtle Radial Gradient for Depth */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,#7a2f22_0%,transparent_70%)] opacity-50" />

                {/* Professional Grain/Noise Overlay - Increased visibility */}
                <div 
                    className="absolute inset-0 opacity-[0.08] mix-blend-overlay" 
                    style={{ 
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
                    }} 
                />
            </div>


            <div className="container-custom relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 lg:gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="col-span-2 lg:col-span-4 relative">
                        <h2 className="text-6xl sm:text-7xl md:text-[6rem] lg:text-[8rem] text-white/90 font-heading font-bold leading-[0.8] tracking-tight pointer-events-none select-none">
                            GEMINI
                        </h2>
                        <div className="mt-8 space-y-4 relative z-10">
                            <blockquote className="quote max-w-md text-stone-200 italic leading-relaxed">
                                {"From Soil to Soul. Where art breathes, and tradition lives."}
                            </blockquote>
                            <p className="max-w-xs text-sm text-stone-300 font-light tracking-wide">
                                Celebrating the artisans of Shantiniketan. Every piece handcrafted, every story authentic.
                            </p>

                            <div className="pt-8 space-y-5">
                                <div className="flex items-start gap-4 group cursor-default">
                                    <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-white transition-all duration-500">
                                        <MapPin className="w-4 h-4 text-stone-300 group-hover:text-[#34150f] transition-colors" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-white/50 uppercase tracking-[0.2em] text-[9px] mb-1.5 mt-1">Location</p>
                                        <p className="text-stone-200 font-light">Shantiniketan, Bolpur, WB 731235</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group cursor-default">
                                    <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-white transition-all duration-500">
                                        <Phone className="w-4 h-4 text-stone-300 group-hover:text-[#34150f] transition-colors" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-white/50 uppercase tracking-[0.2em] text-[9px] mb-1.5 mt-1">Phone</p>
                                        <p className="text-stone-200 font-light">+91 98765 43210</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group cursor-default">
                                    <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-white transition-all duration-500">
                                        <Mail className="w-4 h-4 text-stone-300 group-hover:text-[#34150f] transition-colors" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-white/50 uppercase tracking-[0.2em] text-[9px] mb-1.5 mt-1">Email</p>
                                        <p className="text-stone-200 font-light underline-offset-4 hover:underline cursor-pointer">contact@geminiheritage.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="col-span-1 lg:col-span-2 space-y-8 pt-6 lg:pt-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Company</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-[13px] transition-all duration-300 font-light relative group inline-block",
                                            pathname === link.href ? "text-white font-medium" : "text-stone-300 hover:text-white"
                                        )}
                                    >
                                        {link.label}
                                        <span className={cn(
                                            "absolute -bottom-1 left-0 w-full h-[0.5px] bg-white transform transition-transform duration-500 ease-out",
                                            pathname === link.href ? "scale-x-100 origin-left" : "scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"
                                        )} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-span-1 lg:col-span-2 space-y-8 pt-6 lg:pt-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Support</h4>
                        <ul className="space-y-4">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-[13px] transition-all duration-300 font-light relative group inline-block",
                                            pathname === link.href ? "text-white font-medium" : "text-stone-300 hover:text-white"
                                        )}
                                    >
                                        {link.label}
                                        <span className={cn(
                                            "absolute -bottom-1 left-0 w-full h-[0.5px] bg-white transform transition-transform duration-500 ease-out",
                                            pathname === link.href ? "scale-x-100 origin-left" : "scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"
                                        )} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="col-span-1 lg:col-span-2 space-y-8 pt-6 lg:pt-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Legal</h4>
                        <ul className="space-y-4">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-[13px] transition-all duration-300 font-light relative group inline-block",
                                            pathname === link.href ? "text-white font-medium" : "text-stone-300 hover:text-white"
                                        )}
                                    >
                                        {link.label}
                                        <span className={cn(
                                            "absolute -bottom-1 left-0 w-full h-[0.5px] bg-white transform transition-transform duration-500 ease-out",
                                            pathname === link.href ? "scale-x-100 origin-left" : "scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"
                                        )} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="col-span-1 lg:col-span-2 space-y-8 pt-6 lg:pt-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Connect</h4>
                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center text-stone-300 transition-all duration-50 group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4 fill-current" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-stone-400 pb-2 ">
                    <p className="text-[9px]  text-white uppercase tracking-[0.3em] font-medium sm:text-left text-center">
                        © {new Date().getFullYear()} GEMINI HERITAGE. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    );
}


