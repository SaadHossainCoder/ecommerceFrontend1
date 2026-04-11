"use client";

import { Briefcase, MapPin, Clock, Rocket, Coffee, Heart, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const jobs = [
    {
        title: "Senior Frontend Engineer",
        dept: "Engineering",
        location: "Remote / New York",
        type: "Full-time",
    },
    {
        title: "Product Designer",
        dept: "Design",
        location: "Remote / London",
        type: "Full-time",
    },
    {
        title: "Customer Success Manager",
        dept: "Support",
        location: "Remote",
        type: "Full-time",
    },
    {
        title: "Digital Marketing Specialist",
        dept: "Marketing",
        location: "New York",
        type: "Full-time",
    },
];

const benefits = [
    { icon: Rocket, title: "Fast Growth", desc: "Opportunities for rapid career advancement and learning." },
    { icon: Coffee, title: "Work-Life Balance", desc: "Flexible hours and remote work options for everyone." },
    { icon: Heart, title: "Health & Wellness", desc: "Comprehensive health, dental, and vision insurance plans." },
    { icon: Star, title: "Great Culture", desc: "A diverse, inclusive, and friendly work environment." },
];

export default function CareersPage() {
    return (
        <section className="min-h-screen bg-stone-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">

                {/* ── Hero ── */}
                <div className="mb-20">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-semibold text-stone-400 mb-4">
                        Careers
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight tracking-tight">
                            Join Our<br />Team
                        </h1>
                        <p className="text-sm text-stone-500 max-w-sm leading-relaxed md:text-right">
                            Help us build the future of artisanal luxury. We're looking for passionate people to help us create amazing experiences.
                        </p>
                    </div>
                    <div className="mt-8 h-px bg-stone-200" />
                </div>

                {/* ── Benefits ── */}
                <div className="mb-20">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-semibold text-stone-400 mb-10">
                        Why Work With Us?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-stone-200">
                        {benefits.map((benefit, index) => (
                            <div
                                key={benefit.title}
                                className={`p-8 bg-white ${index < benefits.length - 1 ? "border-b sm:border-b-0 sm:border-r border-stone-200" : ""}`}
                            >
                                <div className="w-10 h-10 bg-stone-100 flex items-center justify-center mb-6">
                                    <benefit.icon className="h-5 w-5 text-stone-700" />
                                </div>
                                <h3 className="text-sm font-semibold text-stone-900 mb-2">{benefit.title}</h3>
                                <p className="text-xs text-stone-500 leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Open Positions ── */}
                <div className="mb-20">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.4em] font-semibold text-stone-400 mb-3">
                                Opportunities
                            </p>
                            <h2 className="text-3xl font-serif text-stone-900">Open Positions</h2>
                        </div>
                        <div className="flex gap-2">
                            <button className="text-[10px] font-bold uppercase tracking-[0.2em] border border-stone-200 px-4 py-2 hover:bg-stone-100 transition-colors text-stone-600 hover:text-stone-900">All Departments</button>
                            <button className="text-[10px] font-bold uppercase tracking-[0.2em] border border-stone-200 px-4 py-2 hover:bg-stone-100 transition-colors text-stone-600 hover:text-stone-900">All Locations</button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-0 border border-stone-200">
                        {jobs.map((job, index) => (
                            <div key={job.title} className={`bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-stone-50 transition-colors group ${index < jobs.length - 1 ? "border-b border-stone-200" : ""}`}>
                                <div className="space-y-4">
                                    <h3 className="text-lg font-serif font-semibold text-stone-900 group-hover:text-amber-700 transition-colors">{job.title}</h3>
                                    <div className="flex flex-wrap gap-4 text-xs font-medium text-stone-500">
                                        <span className="flex items-center gap-1.5">
                                            <Briefcase className="h-3.5 w-3.5 text-stone-400" />
                                            {job.dept}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="h-3.5 w-3.5 text-stone-400" />
                                            {job.location}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5 text-stone-400" />
                                            {job.type}
                                        </span>
                                    </div>
                                </div>
                                <Button className="shrink-0 rounded-none bg-stone-900 text-white hover:bg-stone-800 text-[10px] uppercase tracking-[0.2em] h-11 px-6 font-bold w-full md:w-auto">
                                    Apply Now
                                    <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Contact CTA ── */}
                <div className="bg-stone-900 p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 mt-10">
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.4em] font-semibold text-stone-500 mb-3">
                            Don't see a fit?
                        </p>
                        <h3 className="text-2xl font-serif text-white leading-tight mb-3">
                            Send us your<br />resume anyway.
                        </h3>
                        <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
                            We are always looking for exceptional talent to join our growing brand.
                        </p>
                    </div>
                    <Button
                        size="lg"
                        className="rounded-none bg-white text-stone-900 hover:bg-stone-200 text-[10px] uppercase tracking-[0.2em] font-bold h-12 w-full md:w-auto px-8 shrink-0 group"
                    >
                        Contact Admissions
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

            </div>
        </section>
    );
}
