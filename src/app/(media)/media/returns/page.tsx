
import { RotateCcw, Package, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { PageTransition } from "@/components/layout/PageTransition";

const steps = [
    {
        icon: Package,
        title: "Initiate Return",
        desc: "Go to your orders, select the items you want to return and tell us why.",
    },
    {
        icon: RotateCcw,
        title: "Print Label",
        desc: "We'll send you a prepaid shipping label to your email. Print and attach it.",
    },
    {
        icon: Package,
        title: "Ship Back",
        desc: "Drop off the package at any authorized shipping location.",
    },
    {
        icon: CreditCard,
        title: "Get Refunded",
        desc: "Once we receive the item, we'll process your refund within 5 business days.",
    },
];

export default function ReturnsPage() {
    return (
        <section>
            <div className="container-custom py-16">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                            <RotateCcw className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4">Returns & Exchanges</h1>
                        <p className="text-lg text-muted-foreground">
                            Not happy with your purchase? We make returns easy and hassle-free.
                        </p>
                    </div>

                    <section className="mb-20">
                        <h2 className="text-2xl font-bold mb-8 text-center">How it Works</h2>
                        
                            {steps.map((step, index) => (
                                <div key={step.title}className="text-center">
                                    <div className="relative mb-6">
                                        <div className="h-16 w-16 rounded-2xl bg-muted mx-auto flex items-center justify-center relative z-10">
                                            <step.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className="hidden md:block absolute top-1/2 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-border -translate-y-1/2" />
                                        )}
                                    </div>
                                    <h3 className="font-semibold mb-2">{step.title}</h3>
                                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                                </div>
                            ))}
                    </section>

                    <div className="grid gap-8 lg:grid-cols-2">
                        <Card className="p-8 space-y-4">
                            <ShieldCheck className="h-12 w-12 text-primary" />
                            <h3 className="text-2xl font-bold">Return Policy</h3>
                            <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                                <li>Items must be returned within 30 days of purchase.</li>
                                <li>Products must be in original, unused condition with all tags attached.</li>
                                <li>Return shipping is free for all domestic orders.</li>
                                <li>Exchange for a different size or color is always free.</li>
                                <li>Final sale items are not eligible for return.</li>
                            </ul>
                        </Card>
                        <Card className="p-8 bg-primary text-primary-foreground flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Start Your Return</h3>
                                <p className="mb-8 opacity-90">
                                    Have your order number and email address ready to start the process online.
                                </p>
                            </div>
                            <Button size="lg" variant="secondary" className="w-full">
                                Start Return Process
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
