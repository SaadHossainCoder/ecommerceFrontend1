// import { PageTransition } from "@/components/layout/PageTransition";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacySecurityPage() {
    return (
        <section>
            <div className="bg-white min-h-screen font-sans text-stone-900">
                {/* Header Section */}
                <div className="bg-stone-50 border-b border-stone-100">
                    <div className="container-custom py-20 lg:py-28 text-center space-y-6">

                        <p className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400 mb-4">Legal & Compliance</p>
                        <h1 className="text-4xl md:text-6xl font-serif font-medium tracking-tight text-stone-900 mb-6 italic">
                            Privacy & Security
                        </h1>
                        <div className="w-24 h-px bg-stone-300 mx-auto" />
                        <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed mt-6 font-light">
                            Your trust is our heritage. We are committed to protecting your personal information with the highest standards of security.
                        </p>
                        <p className="text-xs uppercase tracking-widest text-stone-400 mt-8">
                            Last Updated: February 2, 2026
                        </p>

                    </div>
                </div>

                {/* Content Section */}
                <div className="container-custom py-20 max-w-4xl mx-auto">
                    <div className="space-y-16">
                        {/* Introduction */}
                        <section className="group">
                            <div className="flex items-start gap-6">
                                <span className="text-4xl font-serif text-stone-200 group-hover:text-stone-300 transition-colors">01</span>
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-serif text-stone-900 flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-stone-400" />
                                        Commitment to Privacy
                                    </h2>
                                    <p className="text-stone-600 leading-relaxed font-light text-lg">
                                        At Gemini Heritage, we respect your privacy and are committed to protecting the personal information you share with us. This policy outlines how we collect, use, and safeguard your data when you visit our online boutique.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <div className="h-px w-full bg-stone-100" />

                        {/* Information We Collect */}
                        <section className="group">
                            <div className="flex items-start gap-6">
                                <span className="text-4xl font-serif text-stone-200 group-hover:text-stone-300 transition-colors">02</span>
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-serif text-stone-900 flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-stone-400" />
                                        Information Collection
                                    </h2>
                                    <p className="text-stone-600 leading-relaxed font-light">
                                        We collect information to provide you with a seamless shopping experience. This includes:
                                    </p>
                                    <ul className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            "Contact details (Name, Email, Phone)",
                                            "Billing & Shipping Addresses",
                                            "Payment Information (Encrypted)",
                                            "Order History & Preferences",
                                            "Device & Browser Information",
                                            "Communication Preferences"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-stone-600 text-sm p-4 bg-stone-50 border border-stone-100">
                                                <div className="w-1.5 h-1.5 bg-stone-400 rounded-full" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <div className="h-px w-full bg-stone-100" />

                        {/* Data Security */}
                        <section className="group">
                            <div className="flex items-start gap-6">
                                <span className="text-4xl font-serif text-stone-200 group-hover:text-stone-300 transition-colors">03</span>
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-serif text-stone-900 flex items-center gap-3">
                                        <Lock className="w-5 h-5 text-stone-400" />
                                        Security Measures
                                    </h2>
                                    <p className="text-stone-600 leading-relaxed font-light">
                                        We implement banking-grade security measures to protect your data. Our site uses SSL encryption technology to ensure that your personal and payment information is kept confidential and secure. We do not store credit card details on our servers.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <div className="h-px w-full bg-stone-100" />

                        {/* Your Rights */}
                        <section className="group">
                            <div className="flex items-start gap-6">
                                <span className="text-4xl font-serif text-stone-200 group-hover:text-stone-300 transition-colors">04</span>
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-serif text-stone-900 flex items-center gap-3">
                                        <Eye className="w-5 h-5 text-stone-400" />
                                        Your Rights
                                    </h2>
                                    <p className="text-stone-600 leading-relaxed font-light mb-4">
                                        You have full control over your personal data. You are entitled to:
                                    </p>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-xs uppercase tracking-widest text-stone-800">Access & Correction</h4>
                                            <p className="text-sm text-stone-500">Request a copy of your data or ask us to update mistaken information.</p>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="font-bold text-xs uppercase tracking-widest text-stone-800">Deletion (Right to be Forgotten)</h4>
                                            <p className="text-sm text-stone-500">Request complete removal of your personal data from our systems.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="mt-20 p-8 bg-stone-900 text-white text-center space-y-4">
                        <h3 className="font-serif text-xl italic">Questions about your privacy?</h3>
                        <p className="text-stone-300 font-light text-sm max-w-lg mx-auto">
                            Our dedicated data protection team is here to assist you. Please reach out to us for any concerns regarding your personal information.
                        </p>
                        <a href="mailto:privacy@geminiheritage.com" className="inline-block mt-4 text-xs font-bold uppercase tracking-widest border-b border-white/30 pb-1 hover:border-white transition-colors">
                            privacy@geminiheritage.com
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
