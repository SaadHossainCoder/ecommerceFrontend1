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
        <footer className="relative  text-foreground pt-24 pb-12 overflow-hidden border-t">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src="https://images.stockcake.com/public/6/1/9/619ecb88-7ab1-4360-92a2-89cc0c2835cc_large/elegant-patterned-fabric-stockcake.jpg"
                    alt="Footer Background"
                    fill
                    className="object-cover blur-[1px]"
                    priority
                />
                <div className="absolute inset-0 bg-black/70 z-10"></div>
            </div>


            <div className="container-custom relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 lg:gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="col-span-2 lg:col-span-4 relative">
                        <h2 className="text-6xl sm:text-7xl md:text-[6rem] lg:text-[8rem] text-white font-heading font-bold leading-[0.8] tracking-tight pointer-events-none select-none">
                            GEMINI
                        </h2>
                        <div className="mt-8 space-y-4 relative z-10">
                            <blockquote className="quote max-w-md text-stone-300 italic">
                                {"From Soil to Soul. Where art breathes, and tradition lives."}
                            </blockquote>
                            <p className="max-w-xs text-sm text-stone-400">
                                Celebrating the artisans of Shantiniketan. Every piece handcrafted, every story authentic.
                            </p>

                            <div className="pt-6 space-y-4">
                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-full border border-stone-700 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white transition-all duration-500">
                                        <MapPin className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-white uppercase tracking-widest text-[9px] mb-1.5 mt-1">Location</p>
                                        <p className="text-stone-400 font-light">Shantiniketan, Bolpur, WB 731235</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-full border border-stone-700 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white transition-all duration-500">
                                        <Phone className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-white uppercase tracking-widest text-[9px] mb-1.5 mt-1">Phone</p>
                                        <p className="text-stone-400 font-light">+91 98765 43210</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-full border border-stone-700 bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-white transition-all duration-500">
                                        <Mail className="w-4 h-4 text-stone-400 group-hover:text-stone-900 transition-colors" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-bold text-white uppercase tracking-widest text-[9px] mb-1.5 mt-1">Email</p>
                                        <p className="text-stone-400 font-light">contact@geminiheritage.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="col-span-1 lg:col-span-2 space-y-6 pt-6 lg:pt-0">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">Company</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "md:text-4 transition-colors font-light relative group inline-block",
                                            pathname === link.href ? "text-white font-medium" : "text-stone-400 hover:text-white"
                                        )}
                                    >
                                        {link.label}
                                        <span className={cn(
                                            "absolute -bottom-1 left-0 w-full h-px bg-white transform transition-transform duration-300 ease-out",
                                            pathname === link.href ? "scale-x-100 origin-left" : "scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"
                                        )} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="col-span-1 lg:col-span-2 space-y-6 pt-6 lg:pt-0">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">Support</h4>
                        <ul className="space-y-4">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "md:text-4 transition-colors font-light relative group inline-block",
                                            pathname === link.href ? "text-white font-medium" : "text-stone-400 hover:text-white"
                                        )}
                                    >
                                        {link.label}
                                        <span className={cn(
                                            "absolute -bottom-1 left-0 w-full h-px bg-white transform transition-transform duration-300 ease-out",
                                            pathname === link.href ? "scale-x-100 origin-left" : "scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"
                                        )} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="col-span-1 lg:col-span-2 space-y-6 pt-6 lg:pt-0">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">Legal</h4>
                        <ul className="space-y-4">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "md:text-4 transition-colors font-light relative group inline-block",
                                            pathname === link.href ? "text-white font-medium" : "text-stone-400 hover:text-white"
                                        )}
                                    >
                                        {link.label}
                                        <span className={cn(
                                            "absolute -bottom-1 left-0 w-full h-px bg-white transform transition-transform duration-300 ease-out",
                                            pathname === link.href ? "scale-x-100 origin-left" : "scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left"
                                        )} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="col-span-1 lg:col-span-2 space-y-6 pt-6 lg:pt-0">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white">Connect</h4>
                        <div className="flex flex-wrap gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full  flex items-center justify-center text-stone-400 transition-all duration-500 group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4 fill-current group-hover:fill-current" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* <Separator className="bg-primary/10 mb-8" /> */}

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10 text-stone-500">
                    <p className="text-[9px] uppercase tracking-[0.2em] font-medium text-center sm:text-left">
                        © {new Date().getFullYear()} GEMINI HERITAGE. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8">
                        <Link href="/media/privacy&security" className="text-[9px] hover:text-white uppercase tracking-[0.2em] transition-colors font-bold">Privacy Policy</Link>
                        <Link href="/media/terms" className="text-[9px] hover:text-white uppercase tracking-[0.2em] transition-colors font-bold">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

