import { Shield, Lock, Eye, FileText, Mail } from "lucide-react";

const sections = [
    {
        id: "01",
        title: "Commitment to Privacy",
        icon: Shield,
        desc: "At Gemini Heritage, we respect your privacy and are committed to protecting the personal information you share with us. This policy outlines how we collect, use, and safeguard your data when you visit our online boutique.",
    },
    {
        id: "02",
        title: "Security Measures",
        icon: Lock,
        desc: "We implement banking-grade security measures to protect your data. Our site uses SSL encryption technology to ensure that your personal and payment information is kept confidential and secure. We do not store credit card details on our servers.",
    }
];

const collectedInfo = [
    "Contact details (Name, Email, Phone)",
    "Billing & Shipping Addresses",
    "Payment Information (Encrypted)",
    "Order History & Preferences",
    "Device & Browser Information",
    "Communication Preferences"
];

const rights = [
    {
        title: "Access & Correction",
        desc: "Request a copy of your data or ask us to update mistaken information."
    },
    {
        title: "Deletion (Right to be Forgotten)",
        desc: "Request complete removal of your personal data from our systems."
    }
];

export default function PrivacySecurityPage() {
    return (
        <section className="min-h-screen bg-stone-50">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">

                {/* ── Hero ── */}
                <div className="mb-20">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-semibold text-stone-400 mb-4">
                        Legal & Compliance
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h1 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight tracking-tight">
                            Privacy &<br />Security
                        </h1>
                        <p className="text-sm text-stone-500 max-w-sm leading-relaxed md:text-right">
                            Your trust is our heritage. We are committed to protecting your personal information with the highest standards of security.
                        </p>
                    </div>
                    <div className="mt-8 h-px bg-stone-200" />
                    <div className="mt-6 flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-stone-400 inline-block" />
                        <span className="text-[10px] text-stone-400 font-bold tracking-widest uppercase">Last updated: February 2, 2026</span>
                    </div>
                </div>

                {/* ── Core Policies ── */}
                <div className="grid md:grid-cols-2 gap-5 mb-5 md:mb-5">
                    {sections.map((section) => (
                        <div key={section.id} className="bg-white border border-stone-200 p-8 md:p-10">
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-100">
                                <div className="w-9 h-9 bg-stone-100 flex items-center justify-center shrink-0">
                                    <section.icon className="h-4 w-4 text-stone-600" />
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-stone-400">
                                        Section {section.id}
                                    </p>
                                    <h2 className="text-base font-semibold text-stone-900">{section.title}</h2>
                                </div>
                            </div>
                            <p className="text-sm text-stone-500 leading-relaxed">
                                {section.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ── Detailed Policies ── */}
                <div className="grid md:grid-cols-2 gap-5 mb-16">
                    {/* Information Collection */}
                    <div className="bg-white border border-stone-200 p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-100">
                            <div className="w-9 h-9 bg-stone-100 flex items-center justify-center shrink-0">
                                <FileText className="h-4 w-4 text-stone-600" />
                            </div>
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-stone-400">
                                    Section 03
                                </p>
                                <h2 className="text-base font-semibold text-stone-900">Information Collection</h2>
                            </div>
                        </div>
                        <p className="text-sm text-stone-500 leading-relaxed mb-6">
                            We collect information to provide you with a seamless shopping experience. This includes:
                        </p>
                        <div className="space-y-4">
                            {collectedInfo.map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-stone-600">
                                    <span className="w-1 h-1 rounded-full bg-stone-400 shrink-0" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Your Rights */}
                    <div className="bg-white border border-stone-200 p-8 md:p-10">
                        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-stone-100">
                            <div className="w-9 h-9 bg-stone-100 flex items-center justify-center shrink-0">
                                <Eye className="h-4 w-4 text-stone-600" />
                            </div>
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-stone-400">
                                    Section 04
                                </p>
                                <h2 className="text-base font-semibold text-stone-900">Your Rights</h2>
                            </div>
                        </div>
                        <p className="text-sm text-stone-500 leading-relaxed mb-6">
                            You have full control over your personal data. You are entitled to:
                        </p>
                        <div className="space-y-4">
                            {rights.map((right, i) => (
                                <div key={i} className="bg-stone-50 border border-stone-200 p-5">
                                    <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-800 mb-2">{right.title}</h3>
                                    <p className="text-xs text-stone-500 leading-relaxed">{right.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Contact CTA ── */}
                <div className="bg-stone-900 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.35em] font-semibold text-stone-500 mb-2">
                            Need help?
                        </p>
                        <h3 className="text-lg font-serif text-white mb-1">Questions about your privacy?</h3>
                        <p className="text-sm text-stone-400">Our dedicated data protection team is here to assist you.</p>
                    </div>
                    
                    <a
                        href="mailto:privacy@geminiheritage.com"
                        className="inline-flex items-center gap-3 border border-stone-700 hover:border-amber-400 hover:text-amber-400 text-stone-300 px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold transition-colors duration-200 shrink-0"
                    >
                        <Mail className="w-4 h-4" />
                        privacy@geminiheritage.com
                    </a>
                </div>

            </div>
        </section>
    );
}
