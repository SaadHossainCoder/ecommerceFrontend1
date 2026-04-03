import Image from "next/image";
import { Mail, Phone, MapPin, Clock, Sparkles } from "lucide-react";
// import { PageTransition } from "@/components/layout/PageTransition";
import ContactForm from "./_components/from";


const contactInfo = [
    {
        icon: Mail,
        title: "Email",
        value: "concierge@shophub.com",
        link: "mailto:concierge@shophub.com",
        description: "Our dedicated support team is available for all your inquiries."
    },
    {
        icon: Phone,
        title: "Phone",
        value: "+1 (555) 123-4567",
        link: "tel:+15551234567",
        description: "Available Monday to Friday for immediate assistance."
    },
    {
        icon: MapPin,
        title: "Atelier",
        value: "123 Commerce St, New York, NY 10001",
        link: null,
        description: "Visit our flagship gallery for a curated physical experience."
    },
    {
        icon: Clock,
        title: "Hours",
        value: "Mon-Fri: 9AM-6PM EST",
        link: null,
        description: "Experience our collection during our standard viewing hours."
    },
];

export default function ContactPage() {
    return (
        <section>
            <div className="bg-white min-h-screen font-sans selection:bg-stone-200">
                {/* Hero Section */}
                <section
                    className="relative h-[80vh] w-full overflow-hidden"
                >
                    <div className="absolute inset-0">
                        <Image
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
                            alt="Our Office"
                            fill
                            className="object-cover grayscale"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Hero Title Block (Right Aligned to mirror Our Story) */}
                    <div className="absolute bottom-0 right-0 w-full max-w-2xl bg-white p-8 border-t border-l border-stone-200 shadow-2xl lg:pl-15">
                        <div
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 text-stone-400 text-xs tracking-[0.3em] uppercase font-bold">
                                <Sparkles className="h-4 w-4 text-stone-400" />
                                Reach Out
                            </div>
                            <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-stone-900 leading-[1.1]">
                                Connect with <br />
                                <span className="italic font-light text-stone-400">The Atelier</span>
                            </h1>
                            <p className="text-stone-500 font-light leading-relaxed text-lg max-w-md border-l-2 border-stone-200 pl-4 italic">
                                Whether you have a question about our collections or need assistance with an order, our team is here to help.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Content Section */}
                <section className="py-32 bg-stone-50 overflow-hidden border-b border-stone-200">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-20">
                            {/* Left Side: Contact Info */}
                            <div className="space-y-16">
                                <div
                                    className="space-y-6"
                                >
                                    <h2 className="text-3xl md:text-4xl font-serif text-stone-900">
                                        Private <span className="italic font-light text-stone-400">Consultations</span>
                                    </h2>
                                    <p className="text-stone-500 font-light leading-relaxed text-lg max-w-md">
                                        Experience personalized service at our flagship locations or through our digital concierge.
                                    </p>
                                </div>

                                <div className="grid gap-12 sm:grid-cols-2">
                                    {contactInfo.map((info) => (
                                        <div
                                            key={info.title}
                                            className="space-y-4"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 bg-white border border-stone-200 flex items-center justify-center">
                                                    <info.icon className="h-4 w-4 text-stone-900" />
                                                </div>
                                                <h3 className="font-bold uppercase tracking-widest text-[10px] text-stone-400">{info.title}</h3>
                                            </div>
                                            <div className="space-y-2">
                                                {info.link ? (
                                                    <a href={info.link} className="text-lg font-serif text-stone-900 hover:text-stone-500 transition-colors block">
                                                        {info.value}
                                                    </a>
                                                ) : (
                                                    <p className="text-lg font-serif text-stone-900 block">{info.value}</p>
                                                )}
                                                <p className="text-xs text-stone-400 font-light leading-relaxed">
                                                    {info.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side: Form */}
                            <ContactForm />
                        </div>
                    </div>
                </section>

                {/* Social Section */}
                <section className="py-24 bg-white text-center">
                    <div className="max-w-3xl mx-auto px-6 space-y-8">
                        <div className="inline-flex items-center gap-2 text-stone-400 text-xs tracking-[0.3em] uppercase font-bold justify-center">
                            Join the Dialogue
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif text-stone-900 leading-[1.1]">
                            Follow our <span className="italic font-light text-stone-400">Curated Journey.</span>
                        </h2>
                        <div className="flex justify-center gap-8 pt-4">
                            <a href="#" className="flex flex-col items-center gap-2 group">
                                <div className="h-12 w-12 border border-stone-200 flex items-center justify-center group-hover:bg-stone-900 group-hover:text-white transition-all">
                                    {/* <Instagram className="h-5 w-5" /> */}
                                </div>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400 group-hover:text-stone-900 transition-colors">Instagram</span>
                            </a>
                            {/* Add more social if needed */}
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
}
