"use client";

// import { motion } from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
// import { PageTransition } from "@/components/layout/PageTransition";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, HelpCircle } from "lucide-react";

const faqs = [
    {
        category: "Orders",
        items: [
            {
                q: "How do I track my order?",
                a: "You can track your order by clicking the 'Track Order' link in your confirmation email or by visiting the 'My Orders' section in your account profile.",
            },
            {
                q: "Can I cancel my order?",
                a: "Orders can be cancelled within 1 hour of placement. After that, the order is processed for shipping and cannot be cancelled, but you can return it once received.",
            },
            {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, AMEX), PayPal, Apple Pay, and Google Pay.",
            },
        ],
    },
    {
        category: "Shipping",
        items: [
            {
                q: "How long does shipping take?",
                a: "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. International shipping varies by location but typically takes 7-14 business days.",
            },
            {
                q: "Do you offer free shipping?",
                a: "Yes, we offer free standard shipping on all orders over $50 within the continental US.",
            },
            {
                q: "Do you ship internationally?",
                a: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times will be calculated at checkout.",
            },
        ],
    },
    {
        category: "Returns",
        items: [
            {
                q: "What is your return policy?",
                a: "We offer a 30-day return policy for most items. Products must be in original condition and packaging. Some items like personal care or clearance sales may be final sale.",
            },
            {
                q: "How do I start a return?",
                a: "Visit our 'Returns' page under the Support section and enter your order number and email to generate a return shipping label.",
            },
        ],
    },
];

export default function FAQPage() {
    return (
        <section>
            <div className="container-custom py-16">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <HelpCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        Everything you need to know about our products and services.
                    </p>
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search for answers..."
                            className="pl-10 h-12 rounded-full"
                        />
                    </div>
                </div>

                <div className="max-w-3xl mx-auto space-y-12">
                    {faqs.map((category) => (
                        <div key={category.category}>
                            <h2 className="text-2xl font-semibold mb-6">{category.category}</h2>
                            <Accordion type="single" collapsible className="w-full">
                                {category.items.map((item, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="text-left py-4 hover:no-underline hover:text-primary">
                                            {item.q}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground leading-relaxed">
                                            {item.a}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    ))}
                </div>

                <div className="mt-20 text-center p-12 rounded-3xl bg-muted/30">
                    <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
                    <p className="text-muted-foreground mb-6">
                        Can&apos;t find the answer you&apos;re looking for? Please chat to our friendly team.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button size="lg" variant="gradient">Contact Support</Button>
                        <Button size="lg" variant="outline">Email Us</Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
