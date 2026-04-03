
// import { PageTransition } from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, History, AlertCircle, Info } from "lucide-react";

export default function RefundPage() {
    return (
        <section>
            <div className="container-custom py-16">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>
                    <p className="text-muted-foreground mb-12 text-lg">Detailed information about our refund process and eligibility.</p>

                    <div className="grid gap-8">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Info className="h-6 w-6 text-primary" />
                                Refund Eligibility
                            </h2>
                            <p className="text-muted-foreground">
                                To be eligible for a refund, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You&apos;ll also need the receipt or proof of purchase.
                            </p>
                        </section>

                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                                        <History className="h-5 w-5 text-success" />
                                    </div>
                                    <CardTitle className="text-lg">Refund Timeline</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    Once we receive and inspect your return, we will notify you if the refund was approved. If approved, you&apos;ll be automatically refunded on your original payment method within 10 business days.
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                                        <AlertCircle className="h-5 w-5 text-destructive" />
                                    </div>
                                    <CardTitle className="text-lg">Non-Refundable Items</CardTitle>
                                </CardHeader>
                                <CardContent className="text-sm text-muted-foreground">
                                    Certain types of items cannot be returned, like perishable goods, custom products, and personal care goods. We also do not accept returns for hazardous materials, flammable liquids, or gases.
                                </CardContent>
                            </Card>
                        </div>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <CreditCard className="h-6 w-6 text-primary" />
                                Late or Missing Refunds
                            </h2>
                            <p className="text-muted-foreground">
                                If you haven&apos;t received a refund yet, first check your bank account again. Then contact your credit card company, it may take some time before your refund is officially posted. If you&apos;ve done all of this and you still have not received your refund, please contact us.
                            </p>
                        </section>

                        <Card className="bg-primary/5 border-primary/20 p-6">
                            <p className="text-center font-medium">
                                Questions about your refund? Contact us at <span className="text-primary underline">refunds@shophub.com</span>
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
