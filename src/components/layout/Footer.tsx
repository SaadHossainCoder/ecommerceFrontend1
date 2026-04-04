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
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-20">
                    {/* Brand Section */}
                    <div className="md:col-span-4 relative">
                        <h2 className="text-6xlv text-white md:text-[6rem] lg:text-[8rem] font-heading font-bold leading-[0.8] tracking-tight  pointer-events-none select-none ">
                            GEMINI
                        </h2>
                        <div className="mt-8 space-y-4 relative z-10">
                            <blockquote className="quote max-w-md text-primary-foreground">
                                {"From Soil to Soul. Where art breathes, and tradition lives."}
                            </blockquote>
                            <p className="max-w-xs text-sm text-[#FBF9F4]">
                                Celebrating the artisans of Shantiniketan. Every piece handcrafted, every story authentic.
                            </p>

                            <div className="pt-6 space-y-4">
                                <div className="flex items-start gap-3 group group">
                                    <div className="w-10 h-10 rounded-full bg-[#5E1C2D] flex items-center justify-center shrink-0 group-hover:bg-[#3d121d] transition-all duration-300">
                                        <MapPin className="w-7 h-7 group-hover:text-[#919191] text-white" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-semibold text-[#fbfbfb]">Location</p>
                                        <p className="text-[#959595]">Shantiniketan, Bolpur, WB 731235, India</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 group">
                                    <div className="w-10 h-10 rounded-full bg-[#5E1C2D] flex items-center justify-center shrink-0 group-hover:bg-[#3d121d] transition-all duration-300">
                                        <Phone className="w-7 h-7 group-hover:text-[#919191] text-white" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-semibold text-[#fbfbfb]">Phone</p>
                                        <p className="text-[#959595]">+91 98765 43210</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 group">
                                    <div className="w-10 h-10 rounded-full bg-[#5E1C2D] flex items-center justify-center shrink-0 group-hover:bg-[#3d121d] transition-all duration-300">
                                        <Mail className="w-7 h-7 group-hover:text-[#919191] text-white" />
                                    </div>
                                    <div className="text-sm">
                                        <p className="font-semibold text-[#fbfbfb]">Email</p>
                                        <p className="text-[#959595]">contact@geminiheritage.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Company */}
                    <div className="md:col-span-2 space-y-6 pt-12 md:pt-0">
                        <h4 className="text-lg font-bold uppercase tracking-wider text-white">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-sm transition-colors font-medium relative group inline-block",
                                            pathname === link.href ? "text-white font-bold" : "text-[#a3a3a3] hover:text-white"
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
                    <div className="md:col-span-2 space-y-6 pt-12 md:pt-0">
                        <h4 className="text-lg font-bold uppercase tracking-wider text-white">Support</h4>
                        <ul className="space-y-3">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-sm transition-colors font-medium relative group inline-block",
                                            pathname === link.href ? "text-white font-bold" : "text-[#a3a3a3] hover:text-white"
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
                    <div className="md:col-span-2 space-y-6 pt-12 md:pt-0">
                        <h4 className="text-lg font-bold uppercase tracking-wider text-white">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "text-sm transition-colors font-medium relative group inline-block",
                                            pathname === link.href ? "text-white font-bold" : "text-[#a3a3a3] hover:text-white"
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
                    <div className="md:col-span-2 space-y-6 pt-12 md:pt-0">
                        <h4 className="text-lg font-bold uppercase tracking-wider text-white">Connect</h4>
                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=" p-5 flex items-center justify-center w-7 h-7 rounded-full  text-white transition-colors  group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* <Separator className="bg-primary/10 mb-8" /> */}

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[#a3a3a3]">
                    <p className="text-xs  uppercase tracking-widest font-medium">
                        © {new Date().getFullYear()} GEMINI HERITAGE. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="text-xs  hover:text-primary uppercase tracking-widest transition-colors font-bold">Privacy Policy</Link>
                        <Link href="/terms" className="text-xs  hover:text-primary uppercase tracking-widest transition-colors font-bold">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

