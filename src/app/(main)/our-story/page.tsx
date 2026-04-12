import Link from "next/link";
import Image from "next/image";
import { Leaf, Award, ShieldCheck,  Sparkles, Quote, ArrowRight } from "lucide-react";

const values = [
    {
        title: "Artisanal Heritage",
        description: "We collaborate with master craftsmen to preserve and celebrate ancient traditions in a modern context.",
        icon: Award,
        color: "text-stone-900",
        bg: "bg-stone-100",
    },
    {
        title: "Ethical Sourcing",
        description: "Direct partnerships with artisans ensure fair trade practices and sustainable livelihoods for local communities.",
        icon: ShieldCheck,
        color: "text-stone-900",
        bg: "bg-stone-100",
    },
    {
        title: "Sustainable Craft",
        description: "Using natural, locally-sourced materials to create pieces that are meant to last for generations.",
        icon: Leaf,
        color: "text-stone-900",
        bg: "bg-stone-100",
    },
];

const processSteps = [
    {
        title: "Raw Selection",
        description: "Sourcing the highest quality sustainable teak, brass, and hand-loomed textiles.",
        image: "https://images.stockcake.com/public/5/b/d/5bd0ee2d-a182-4afb-874a-14d0f2567187_large/carpet-crafting-expert-stockcake.jpg",
    },
    {
        title: "Visionary Design",
        description: "Merging modernist principles with traditional silhouettes and ergonomic comfort.",
        image: "https://images.stockcake.com/public/8/6/3/8635df99-f01e-4925-88da-eae02f3deac4_large/master-artist-creating-stockcake.jpg",
    },
    {
        title: "Master Joinery",
        description: "Every joint and curve is hand-finished by master carpenters using traditional techniques.",
        image: "https://images.stockcake.com/public/c/b/c/cbcf25a6-7535-4745-8478-439fe8ad5022_large/shadow-puppet-play-stockcake.jpg",
    },
    {
        title: "Quality Curing",
        description: "Each piece is meticulously inspected and hand-polished to ensure a lifetime of use.",
        image: "https://images.stockcake.com/public/2/3/4/234c479b-784a-4769-8b79-0f078f8114a0_large/master-potter-working-stockcake.jpg",
    },
];

export default function OurStoryPage() {
    return (
        <section>
            <div className="bg-white min-h-screen font-sans selection:bg-stone-200">
                {/* Hero Section */}
                <section
                    className="relative h-[70vh] w-full overflow-hidden"
                >
                    <div className="absolute inset-0">
                        <Image
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop"
                            alt="Artisanal Workshop"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Hero Title Block (Right Aligned to mirror Artist page) */}
                    <div className="absolute bottom-0 right-0 w-full max-w-2xl p-8 md:p-16 border-t border-l border-stone-200 h-[43vh] bg-stone-50">
                        <div
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 text-stone-400 text-xs tracking-[0.3em] uppercase font-bold">
                                <Sparkles className="h-4 w-4 text-stone-400" />
                                Our Heritage
                            </div>
                            <h1 className="text-4xl md:text-7xl font-serif tracking-tight text-stone-900 leading-[1.1]">
                                Crafting <br />
                                <span className="italic font-light text-stone-400">Pure Legacy</span>
                            </h1>
                            <p className="text-stone-500 font-light leading-relaxed text-lg max-w-md">
                                A collective dedicated to preserving traditional craftsmanship through contemporary design.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Philosophy Section */}
                <section className="py-32 bg-stone-50 overflow-hidden border-b border-stone-200">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div
                                className="relative aspect-4/5 overflow-hidden grayscale"
                            >
                                <Image
                                    src="https://images.stockcake.com/public/d/1/5/d150408f-50ce-4148-8dda-c6a2fe7335cd_large/elderly-craftsman-working-stockcake.jpg"
                                    alt="Master Craftsman"
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-1000"
                                />
                            </div>

                            <div className="space-y-12">
                                <div
                                    className="space-y-8"
                                >
                                    <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
                                        Where tradition meets <br />
                                        <span className="text-stone-400 italic font-light">The modern hand.</span>
                                    </h2>
                                    <div className="space-y-6 text-stone-500 font-light leading-relaxed text-lg italic">
                                        <p>
                                            Our journey began with a simple question: How do we preserve the soul of traditional craftsmanship in a fast-paced modern world?
                                        </p>
                                        <p>
                                            We returned to the roots of the local workshops, where wood, metal, and textile are shaped not by machines, but by generations of inherited wisdom.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className="p-12 bg-white border border-stone-200 text-stone-900 space-y-8 relative"
                                >
                                    <Quote className="absolute top-8 right-8 h-12 w-12 text-stone-100" />
                                    <p className="text-2xl font-serif text-stone-800 leading-relaxed italic relative z-10">
                                        &quot;We believe that every piece we create should tell a story—of the hands that made it, the heritage it carries, and the life it will share with its owner.&quot;
                                    </p>
                                    <div className="flex items-center gap-6 pt-4">
                                        <div className="h-14 w-14 rounded-full bg-stone-100 border border-stone-200" />
                                        <div>
                                            <p className="font-bold text-stone-900 uppercase tracking-widest text-xs">The Visionaries</p>
                                            <p className="text-sm text-stone-400 font-light font-serif italic">Founders of the Collective</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Artisanal Process Section (Behind the Scenes style) */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-6 space-y-20">
                        <div className="max-w-3xl mx-left space-y-8">
                            <h2 className="text-3xl md:text-6xl font-serif text-stone-900 lowercase italic">The Artisanal Process</h2>
                            <p className="text-stone-500 text-lg font-light leading-relaxed max-w-2xl">
                                Our method balances ancient traditions with modernist precision, creating functional art that honors its origin while serving the present.
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {processSteps.map((step, index) => (
                                <div
                                    key={step.title}
                                    className="group relative h-125 overflow-hidden bg-stone-100 border border-stone-200"
                                >
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="absolute bottom-0 left-0 p-8 space-y-4">
                                        <p className="text-stone-400 font-bold text-[10px] uppercase tracking-[0.3em]">PHASE 0{index + 1}</p>
                                        <h3 className="text-2xl font-serif text-white drop-shadow-md">{step.title}</h3>
                                        <p className="text-stone-200 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="py-32 bg-stone-50 border-y border-stone-200">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-1px bg-stone-200 border border-stone-200">
                            {values.map((value) => (
                                <div
                                    key={value.title}
                                    className="bg-white p-12 space-y-8 flex flex-col justify-between"
                                >
                                    <div className="space-y-6">
                                        <div className={`w-12 h-12 ${value.bg} flex items-center justify-center`}>
                                            <value.icon className={`h-6 w-6 ${value.color}`} />
                                        </div>
                                        <h3 className="text-2xl font-serif text-stone-900">{value.title}</h3>
                                        <p className="text-stone-500 leading-relaxed font-light text-sm">
                                            {value.description}
                                        </p>
                                    </div>
                                    <div className="w-8 h-px bg-stone-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA Showcase (Newsletter Section Style) */}
                <section className="py-32 bg-white text-center">
                    <div className="max-w-3xl mx-auto px-6 space-y-12">
                        <div
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-2 text-stone-400 text-xs tracking-[0.3em] uppercase font-bold justify-center">
                                Connect with us
                            </div>
                            <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-[1.1]">
                                Join the <span className="italic font-light text-stone-400">Collective Story.</span>
                            </h2>
                            <p className="text-stone-500 text-xl max-w-2xl mx-auto font-light leading-relaxed">
                                Subscribe to receive stories of craft, artisan spotlights, and early access to our seasonal collections.
                            </p>
                        </div>

                        <div className="max-w-md mx-auto">
                            <div className="flex flex-col sm:flex-row gap-6">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 bg-transparent border-b border-stone-200 pb-2 text-sm focus:outline-none focus:border-stone-900 transition-colors text-center sm:text-left"
                                />
                                <button className="bg-button-white text-text-black px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-button-black hover:text-text-white transition-colors flex items-center justify-center gap-2 group">
                                    Subscribe <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-12 pt-12">
                            <Link href="/products" className="text-xs uppercase tracking-widest font-bold border-b-2 border-button-black pb-1 hover:border-button-hover transition-colors">
                                Explore Shop
                            </Link>
                            <Link href="/artists" className="text-xs uppercase tracking-widest font-bold border-b-2 border-button-black pb-1 hover:border-button-hover transition-colors">
                                Meet Artisans
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </section>
    );
}
