import { artists } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const ArtistCard = () => {
    return (
        <div className="container-custom max-w-6xl py-0">
                    <div
                        className="divide-y divide-stone-200"
                    >
                        {artists.map((artist, index) => (
                            <div
                                key={artist.id}
                                className="group  flex flex-col md:flex-row items-center gap-12 md:gap-24"
                            >
                                {/* Text Content */}
                                <div className={`flex-1 space-y-6 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                                    <div className="space-y-4">
                                        <h2 className="text-4xl md:text-5xl font-serif text-stone-900 leading-tight">
                                            {artist.name}
                                        </h2>
                                        <p className="text-stone-400 font-serif italic text-lg">
                                            {artist.tagline}
                                        </p>
                                    </div>

                                    <p className="text-stone-600 font-light leading-relaxed max-w-md">
                                        {artist.bio}
                                    </p>

                                    <Link
                                        href={`/artists/${artist.id}`}
                                        className="inline-flex items-center gap-2 text-stone-900 font-medium hover:gap-4 transition-all duration-300 group/link"
                                    >
                                        <span className="border-b border-stone-900 pb-0.5">Read more</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>

                                {/* Image Section */}
                                <div className={`flex-1 w-full aspect-4/3 md:aspect-3/2 relative overflow-hidden bg-stone-100 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                    <Image
                                        src={artist.image || ""}
                                        alt={artist.name}
                                        fill
                                        className="object-cover hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                    />
                                    <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    )
}

export default ArtistCard
