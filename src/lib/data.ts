export interface Artist {
    id: string;
    name: string;
    role: string;
    location: string;
    tagline: string;
    image: string;
    bio: string;
    longBio: string;
    emoji: string;
    instagram: string;
    specialties: string[];
    milestones?: string[];
    behindTheScenes?: {
        title: string;
        description: string;
        image: string;
    };
    conversation?: {
        title: string;
        description: string;
        image: string;
    };
}

export const artists: Artist[] = [
    {
        id: "artisan-1",
        name: "INODA+SVEJE",
        role: "Design Studio",
        location: "Copenhagen / Milan / Kyoto",
        tagline: "Bridging architectural design and furniture craftsmanship.",
        image: "https://images.stockcake.com/public/8/6/3/8635df99-f01e-4925-88da-eae02f3deac4_large/master-artist-creating-stockcake.jpg",
        bio: "INODA+SVEJE are a multi-disciplinary design duo comprising Kyoko Inoda (Japan) and Nils Sveje (Denmark).",
        longBio: "Founded in 2000 in Copenhagen. They moved their base to Milan in 2003. They have developed a meticulous and sensitive approach applied to both the design process and the manufacturing form and aesthetics. Nils and Kyoko have worked on a variety of projects, from medical equipment to furniture, and they have mastered the ability of balance with each of the diverse elements involved in every aspect of the project. Their creative collaboration with PHANTOM HANDS began in 2016.",
        emoji: "🪑",
        instagram: "@inodasveje",
        specialties: ["Furniture Design", "Architectural Design", "Craftsmanship"],
        milestones: [
            "Founded in Copenhagen (2000)",
            "Moved to Milan (2003)",
            "Collaboration with Phantom Hands (2016)"
        ],
        behindTheScenes: {
            title: "Behind the Scenes of the Mungaru Gallery Chair",
            description: "A window into the making of the Mungaru Gallery Chair and the process that went into Phantom Hands' first collaborative project with INODA+SVEJE.",
            image: "https://images.unsplash.com/photo-1581578731548-c64695cc6958?q=80&w=1600&auto=format&fit=crop"
        },
        conversation: {
            title: "In Conversation With Design Studio INODA+SVEJE: Designing Without Straight Lines",
            description: "Milan based design duo Kyoko Inoda and Nils Sveje have spent the last two decades moving from the study of medical equipment design and environment to the more human and emotional landscape of furniture design.",
            image: "https://images.unsplash.com/photo-1594913785162-e6785b49dea3?q=80&w=1600&auto=format&fit=crop"
        }
    },
    {
        id: "artisan-2",
        name: "Geoffrey Bawa Practice",
        role: "Architectural Designer",
        location: "Colombo, Sri Lanka",
        tagline: "Tropical modernism and ecological sensitivity.",
        image: "https://images.stockcake.com/public/d/1/5/d150408f-50ce-4148-8dda-c6a2fe7335cd_large/elderly-craftsman-working-stockcake.jpg",
        bio: "The practice of the legendary Geoffrey Bawa, pioneer of Tropical Modernism.",
        longBio: "Continuing the legacy of Sri Lanka's most influential architect, the Geoffrey Bawa Practice focuses on the relationship between building and landscape. Their work in furniture design follows the same principles of simplicity, local materials, and climatic responsiveness.",
        emoji: "🏡",
        instagram: "@geoffreybawafoundation",
        specialties: ["Tropical Modernism", "Eco-friendly Design", "Legacy Pieces"],
        behindTheScenes: {
            title: "Drafting the Kandalama Estate",
            description: "Exploring the integration of stone and wood in the seminal Kandalama furniture collection.",
            image: "https://images.unsplash.com/photo-1518005020251-095c1a2f5cb3?q=80&w=800&auto=format&fit=crop"
        }
    },
    {
        id: "artisan-3",
        name: "Chandigarh Collective",
        role: "Modernist Workshop",
        location: "Chandigarh, India",
        tagline: "Preserving the spirit of Jeanneret and Corbusier.",
        image: "https://images.stockcake.com/public/a/c/a/acacfd26-1f2b-4fcb-a7e3-66679dd9ed57_large/artisan-weaving-textiles-stockcake.jpg",
        bio: "A collective dedicated to the authentic reproduction of Chandigarh's modernist furniture legacy.",
        longBio: "Working with the same materials and techniques used by the original makers in the 1950s, the Chandigarh Collective ensures that every piece of 'V-leg' furniture is a true representation of the city's architectural spirit.",
        emoji: "🪑",
        instagram: "@chandigarhcollective",
        specialties: ["Modernist Furniture", "Cane Weaving", "Teak Woodwork"],
    },
    {
        id: "artisan-4",
        name: "Felix de Pass",
        role: "Industrial Designer",
        location: "London, UK",
        tagline: "Simple, functional, and elegant everyday objects.",
        image: "https://images.stockcake.com/public/5/b/d/5bd0ee2d-a182-4afb-874a-14d0f2567187_large/carpet-crafting-expert-stockcake.jpg",
        bio: "Felix de Pass is a London-based industrial designer known for his simple, functional, and elegant approach to design.",
        longBio: "Graduating from the Royal College of Art in 2009, Felix established his studio to work across a wide range of disciplines, from furniture and lighting to exhibition design. His work is characterized by a keen interest in materials and processes, resulting in objects that are both practical and beautiful.",
        emoji: "💡",
        instagram: "@felixdepass",
        specialties: ["Industrial Design", "Lighting", "Furniture"],
        milestones: [
            "Established Studio (2009)",
            "Design Guild Mark Award"
        ]
    },
    {
        id: "artisan-5",
        name: "Klemens Grund",
        role: "Furniture Designer & Joiner",
        location: "Switzerland",
        tagline: "Precision joinery meets minimalist aesthetics.",
        image: "https://images.stockcake.com/public/c/b/c/cbcf25a6-7535-4745-8478-439fe8ad5022_large/shadow-puppet-play-stockcake.jpg",
        bio: "Klemens Grund is a master joiner and designer whose work explores the tension between stability and lightness.",
        longBio: "With a background in traditional carpentry, Grund's designs are deeply rooted in the understanding of wood as a material. His pieces often feature intricate joinery that is both structural and decorative, creating furniture that feels timeless and grounded.",
        emoji: "🪵",
        instagram: "@klemensgrund",
        specialties: ["Woodworking", "Minimalist Design", "Joinery"]
    },
    {
        id: "artisan-6",
        name: "x+l (Xander and Lonneke)",
        role: "Design Duo",
        location: "Amsterdam, Netherlands",
        tagline: "Storytelling through objects and spaces.",
        image: "https://images.stockcake.com/public/2/3/4/234c479b-784a-4769-8b79-0f078f8114a0_large/master-potter-working-stockcake.jpg",
        bio: "Xander Vervoort and Lonneke Gordijn form the Dutch design duo x+l, creating theatrical and narrative-driven design.",
        longBio: "Based in Amsterdam, x+l works across interior design, product design, and art direction. Their collaboration with Phantom Hands has resulted in a collection that pays homage to the modernist heritage while infusing it with contemporary Dutch sensibilities.",
        emoji: "🇳🇱",
        instagram: "@xandl",
        specialties: ["Interior Design", "Product Design", "Art Direction"],
        conversation: {
            title: "Dutch Design in India",
            description: "How x+l bridges the gap between Amsterdam aesthetics and Indian craftsmanship.",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
        }
    }
];
