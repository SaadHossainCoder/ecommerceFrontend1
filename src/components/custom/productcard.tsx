// import { Heart, ShoppingBag } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
// import React from 'react'
// import { toast } from '../ui/toaster';

// const productcard = () => {
//     const price = (product.subProducts || product.sizes)?.[0]?.price ?? product.price ?? 0;
//     const discountPct = product.discount ?? 0;
//     const originalPrice = discountPct > 0 ? Math.round(price / (1 - discountPct / 100)) : null;

//     // Prioritize first sub-product's image as cover, then generalImages, then fallback
//     const variantImg = product.subProducts?.[0]?.images?.[0];
//     const generalImg = (product.generalImages || product.images)?.[0];
//     const imgData = variantImg || generalImg;

//     const image = (typeof imgData === 'string' ? imgData : imgData?.url) ?? "https://placehold.co/600x800/png?text=Product";
//     const id = product._id ?? product.id;
//     const slug = product.slug ?? id;
//     const categoryName = typeof product.category === "object" ? product.category?.name : product.category;

//     const handleAddToWishlist = (e: React.MouseEvent) => {
//         e.preventDefault();
//         e.stopPropagation();
        
//         wishlistLocalStorageData.addToWishlist({
//             id: String(id),
//             productId: String(id),
//             slug: String(slug),
//             name: product.title ?? product.name ?? "Product",
//             price: price,
//             quantity: 1,
//             image: image,
//             category: categoryName,
//         });
        
//         toast({
//             title: "Added to Wishlist",
//             description: `${product.title ?? product.name ?? "Product"} saved to your collection.`,
//         });
//     };

//     return (
//         <div className="group">
//             {/* Image */}
//             <div className="relative aspect-3/4 overflow-hidden bg-stone-100 mb-4">
//                 <Link href={`/products/${slug}`}>
//                     <Image
//                         src={image}
//                         alt={product.title ?? product.name ?? "Product"}
//                         fill
//                         className="object-cover group-hover:scale-105 transition-transform duration-700"
//                     />
//                 </Link>

//                 {/* Badges */}
//                 <div className="absolute top-3 left-3 flex flex-col gap-1.5">
//                     {product.featured && (
//                         <span className="bg-stone-900 text-white text-[8px] uppercase tracking-[0.2em] font-bold px-2.5 py-1">
//                             Featured
//                         </span>
//                     )}
//                     {discountPct > 0 && (
//                         <span className="bg-red-600 text-white text-[8px] uppercase tracking-[0.2em] font-bold px-2.5 py-1">
//                             -{discountPct}%
//                         </span>
//                     )}
//                 </div>

//                 {/* Hover actions */}
//                 <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                     <button 
//                         onClick={handleAddToWishlist}
//                         className="w-8 h-8 bg-white border border-stone-100 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors shadow-sm"
//                     >
//                         <Heart className="w-3.5 h-3.5" />
//                     </button>
//                     <button className="w-8 h-8 bg-white border border-stone-100 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-colors shadow-sm">
//                         <ShoppingBag className="w-3.5 h-3.5" />
//                     </button>
//                 </div>

//                 {/* Bottom CTA */}
//                 <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//                     <button className="w-full bg-stone-900 hover:bg-stone-800 text-white text-[9px] uppercase tracking-[0.2em] font-bold py-3 transition-colors">
//                         Add to Cart
//                     </button>
//                 </div>
//             </div>

//             {/* Info */}
//             <div>
//                 <p className="text-[9px] uppercase tracking-[0.15em] text-stone-400 font-medium mb-1">
//                     {categoryName}
//                 </p>
//                 <Link href={`/products/${slug}`}>
//                     <h3 className="text-sm font-semibold text-stone-900 leading-snug hover:text-stone-500 transition-colors line-clamp-2 mb-2">
//                         {product.title ?? product.name}
//                     </h3>
//                 </Link>
//                 <div className="flex items-baseline gap-2">
//                     <span className="text-sm font-bold text-stone-900">
//                         ₹{price.toLocaleString()}
//                     </span>
//                     {originalPrice && (
//                         <span className="text-xs text-stone-400 line-through">
//                             ₹{originalPrice.toLocaleString()}
//                         </span>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default productcard
