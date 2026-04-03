"use client";

import { motion, useScroll, useTransform } from "framer-motion";
// import { PageTransition } from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, BookOpen, UserCheck, Scale, FileSignature, AlertCircle, FileText, Globe, LifeBuoy } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const termsSections = [
    {
        id: "01",
        title: "Acceptance of Terms",
        icon: UserCheck,
        content: "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.",
        bg: "bg-amber-50",
        color: "text-amber-700"
    },
    {
        id: "02",
        title: "Use of Service",
        icon: Globe,
        content: "Our service is provided for your personal, non-commercial use. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.",
        bg: "bg-stone-50",
        color: "text-stone-700"
    },
    {
        id: "03",
        title: "User Accounts",
        icon: Shield,
        content: "If you create an account on the website, you are responsible for maintaining the security of your account and you are fully responsible for all activities that occur under the account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security.",
        bg: "bg-emerald-50",
        color: "text-emerald-700"
    },
    {
        id: "04",
        title: "Intellectual Property",
        icon: BookOpen,
        content: "The website and its original content, features, and functionality are owned by ShopHub and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.",
        bg: "bg-rose-50",
        color: "text-rose-700"
    },
    {
        id: "05",
        title: "Limitation of Liability",
        icon: AlertCircle,
        content: "In no event shall ShopHub, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.",
        bg: "bg-blue-50",
        color: "text-blue-700"
    },
    {
        id: "06",
        title: "Governing Law",
        icon: Scale,
        content: "These Terms shall be governed and construed in accordance with the laws of New York, United States, without regard to its conflict of law provisions.",
        bg: "bg-indigo-50",
        color: "text-indigo-700"
    },
    {
        id: "07",
        title: "Changes to Terms",
        icon: FileSignature,
        content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.",
        bg: "bg-stone-100",
        color: "text-stone-900"
    }
];

export default function TermsPage() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section>
            <div className="flex flex-col min-h-screen bg-[#fafaf9]">
                {/* Hero Section */}
                <section
                    ref={heroRef}
                    className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-stone-900"
                >
                    <motion.div style={{ y }} className="absolute inset-0 z-0">
                        <Image
                            src="/brain/7a2cc7b3-4feb-44d5-84da-e4a44203e347/luxury_legal_document_1768312747866.png"
                            alt="Legal Background"
                            fill
                            className="object-cover opacity-50"
                            priority
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-[#fafaf9] z-10" />

                    <motion.div
                        style={{ opacity }}
                        className="relative z-20 text-center space-y-4 px-4 max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm tracking-widest uppercase"
                        >
                            <FileText className="h-4 w-4 text-amber-400" />
                            Prestige Legal Framework
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-4xl md:text-6xl font-serif text-white tracking-tight"
                        >
                            Terms of <span className="italic font-light text-amber-200">Service</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="text-amber-100/70 font-mono text-sm tracking-widest uppercase"
                        >
                            Last Updated: January 1, 2024
                        </motion.p>
                    </motion.div>
                </section>

                <div className="container-custom -mt-12 relative z-30 pb-24">
                    <div className="max-w-4xl mx-auto space-y-12">
                        {/* Introductory Note */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-stone-200/50 border border-stone-100 text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-200 via-stone-800 to-amber-200" />
                            <p className="text-xl text-stone-600 font-serif leading-relaxed italic">
                                &quot;Our relationship with you is built on trust, excellence, and mutual respect. These terms ensure that your experience with our artisanal gallery remains protected and premium.&quot;
                            </p>
                        </motion.div>

                        {/* Terms Grid */}
                        <div className="grid gap-8">
                            {termsSections.map((section, index) => (
                                <motion.div
                                    key={section.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Card className="border-none shadow-lg shadow-stone-200/40 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow duration-500 bg-white group">
                                        <CardContent className="p-0 flex flex-col md:flex-row">
                                            <div className={`md:w-64 p-8 ${section.bg} flex flex-col items-center justify-center text-center gap-4`}>
                                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                                    <section.icon className={`h-8 w-8 ${section.color}`} />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-xs font-mono tracking-tighter text-stone-400 uppercase">Article</span>
                                                    <p className={`text-2xl font-serif font-bold ${section.color}`}>{section.id}</p>
                                                </div>
                                            </div>
                                            <div className="flex-1 p-8 md:p-12 space-y-4">
                                                <h3 className="text-2xl font-serif text-stone-900">{section.title}</h3>
                                                <p className="text-stone-500 font-light leading-relaxed text-lg">
                                                    {section.content}
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Final Reassurance Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="pt-12 text-center space-y-8"
                        >
                            <div className="w-24 h-px bg-stone-300 mx-auto" />
                            <div className="space-y-4">
                                <h2 className="text-3xl font-serif">Still have questions?</h2>
                                <p className="text-stone-500 max-w-xl mx-auto font-light text-lg">
                                    Our concierge and legal support team is dedicated to providing clarity on any aspect of our service.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <button className="inline-flex items-center gap-2 text-amber-700 font-serif text-xl border-b border-amber-200 pb-1 hover:text-amber-600 hover:border-amber-600 transition-all group">
                                    <LifeBuoy className="h-5 w-5" />
                                    Contact Support Concierge
                                </button>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </div>
        </section>
    );
}
