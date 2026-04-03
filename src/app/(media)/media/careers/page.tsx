"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Rocket, Coffee, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { PageTransition } from "@/components/layout/PageTransition";
// import { staggerContainerVariants, staggerItemVariants } from "@/lib/motion";

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
        <section>
            {/* Hero */}
            <section className="relative py-20 bg-linear-to-br from-primary/5 to-purple-500/5">
                <div className="container-custom text-center">
                    <div
                        className="max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold mb-6">Join Our Team</h1>
                        <p className="text-xl text-muted-foreground">
                            Help us build the future of e-commerce. We&apos;re looking for passionate people to help us create amazing experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">Why Work with Us?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We value our employees and provide the environment and tools needed to thrive.
                        </p>
                    </div>
                    <div
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {benefits.map((benefit) => (
                            <div key={benefit.title}>
                                <Card className="h-full border-none bg-muted/30">
                                    <CardContent className="p-6 text-center">
                                        <div className="h-14 w-14 rounded-2xl bg-primary/10 mx-auto flex items-center justify-center mb-4">
                                            <benefit.icon className="h-7 w-7 text-primary" />
                                        </div>
                                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                                        <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-16 bg-muted/30">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Open Positions</h2>
                            <p className="text-muted-foreground">Find your next role at ShopHub.</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline">All Departments</Button>
                            <Button variant="outline">All Locations</Button>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {jobs.map((job) => (
                            <Card key={job.title} className="hover:border-primary/50 transition-colors">
                                <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold">{job.title}</h3>
                                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="h-4 w-4" />
                                                {job.dept}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                {job.type}
                                            </span>
                                        </div>
                                    </div>
                                    <Button>Apply Now</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
}
