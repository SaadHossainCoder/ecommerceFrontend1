
export const trendingProducts = [
    { id: 1, name: "Handcrafted Saree - Silk", price: 4500, image: "https://i.pinimg.com/1200x/48/c0/5d/48c05df98875ae46b6daeca3b9f141c3.jpg" },
    { id: 2, name: "Terracotta Necklace Set", price: 1200, image: "https://i.pinimg.com/1200x/49/54/35/495435b28259fdf81c47a71daf294921.jpg" },
    { id: 3, name: "Brass Wall Decor", price: 3200, image: "https://images.stockcake.com/public/9/3/a/93a57afe-c389-4b7c-af6f-fa1db451bec4_large/handcrafted-clay-vessels-stockcake.jpg" },
    { id: 4, name: "Hand-painted Patachitra", price: 2800, image: "https://images.stockcake.com/public/6/5/b/65be41af-2867-47df-8f52-0cdda81bcc96_large/golden-statue-contemplates-stockcake.jpg" },
    { id: 5, name: "Bronze Flower Vase", price: 2400, image: "https://i.pinimg.com/736x/7d/bf/97/7dbf978b8b87002fe1f36ddac902e1b1.jpg" },
    { id: 6, name: "Handwoven Cushion Cover", price: 850, image: "https://i.pinimg.com/736x/ac/d1/77/acd17787d04d65598377b555eef7727f.jpg" },
    { id: 7, name: "Traditional Silk Kurta", price: 3800, image: "https://i.pinimg.com/1200x/d5/38/6b/d5386bfba81fe6a107e5d7e008c2fefd.jpg" },
    { id: 8, name: "Embroidered White Saree", price: 5200, image: "https://i.pinimg.com/1200x/d1/16/a8/d116a83dcbb2e10ba5ae1b57377964d1.jpg" },
];

export const seasonChoices = [
    { id: 9, name: "Pink Cotton Tunic", price: 1800, image: "https://images.stockcake.com/public/e/0/4/e044d846-1886-47c9-91c8-255b89b99739_large/traditional-musician-posing-stockcake.jpg" },
    { id: 10, name: "Yellow Silk Dupatta", price: 2200, image: "https://images.stockcake.com/public/c/e/3/ce375932-fa7e-4837-9bbc-24926e899204_large/traditional-music-performance-stockcake.jpg" },
    { id: 11, name: "Silver Oxidized Choker", price: 950, image: "https://images.stockcake.com/public/3/7/6/3768cce1-f47d-4f3a-a2c6-a6f8335cfb2f_large/moroccan-cultural-elegance-stockcake.jpg" },
    { id: 12, name: "Beaded Statement Set", price: 1500, image: "https://images.stockcake.com/public/5/3/1/531acdb9-b8ec-43a9-9109-4eb52c363ed2_large/royal-arabian-portrait-stockcake.jpg" },
    { id: 13, name: "Embroidered Potli Bag", price: 750, image: "https://images.stockcake.com/public/e/9/5/e95b6be8-6605-43a2-8f9f-9e50c2495c9c_large/tradition-s-dignified-guardian-stockcake.jpg" },
    { id: 14, name: "Green Silk Saree", price: 4200, image: "https://images.stockcake.com/public/4/e/7/4e711acd-77e7-46c7-9041-e0b5cc19482d_large/traditional-blue-elegance-stockcake.jpg" },
    { id: 15, name: "Designer Party Wear", price: 5800, image: "https://images.stockcake.com/public/7/9/4/7941d7ec-4d18-4b8e-9cd8-84b7b716f564_large/regal-wedding-attire-stockcake.jpg" },
    { id: 16, name: "Ethnic Nose Ring", price: 450, image: "https://images.stockcake.com/public/d/e/0/de098d7c-11f7-4981-abc7-b8d654f42f0e_large/regal-sari-grace-stockcake.jpg" },
];

export const reportsData = [
    {
        id: "1",
        name: "Hasan",
        artName: "The Enchanted Forest",
        period: "Q4FY26 | JULY 20, 2025",
        imageSrc: "https://i.pinimg.com/1200x/2d/8c/03/2d8c03631c3f9c084e76a19852391518.jpg",
        isNew: true,
    },
    {
        id: "2",
        name: "Rakhi",
        artName: "lalaa mati",
        period: "Q4FY25 | MAY 1, 2025",
        imageSrc: "https://i.pinimg.com/736x/ef/55/3a/ef553a76b025365fdf73fc81fcfbbcd7.jpg",
    },
    {
        id: "3",
        name: "Menu",
        artName: "pottery art",
        period: "Q3FY25 | JANUARY 20, 2025",
        imageSrc: "https://i.pinimg.com/1200x/67/b2/22/67b2223551dd572f5ae515e7173dc806.jpg",
    },
    {
        id: "4",
        name: "Q2FY25",
        artName: "The Enchanted Forest",
        period: "Q2FY25 | OCTOBER 15, 2024",
        imageSrc: "https://i.pinimg.com/1200x/a6/33/a3/a633a3ee762acd9939172f9b7029e369.jpg",
    },
    {
        id: "5",
        name: "Q1FY25",
        artName: "The Enchanted Forest",
        period: "Q1FY25 | JULY 18, 2024",
        imageSrc: "https://i.pinimg.com/736x/93/d9/ff/93d9ffdb3e14880cce8f04c2daf29027.jpg",
    },
    {
        id: "6",
        name: "Q1FY25",
        artName: "The Enchanted Forest",
        period: "Q1FY25 | JULY 18, 2024",
        imageSrc: "https://i.pinimg.com/1200x/d4/67/5e/d4675e21682bce2166ada7164ec5fee8.jpg",
    },
];

export async function getTrendingProducts() {
    // In a real app, this would be a DB call
    return trendingProducts;
}

export async function getSeasonChoices() {
    return seasonChoices;
}

export async function getReports() {
    return reportsData;
}

export async function getProductById(id: string) {
    // Check all collections for the product
    const allProducts = [...trendingProducts, ...seasonChoices];
    return allProducts.find((p) => p.id.toString() === id) || null;
}
