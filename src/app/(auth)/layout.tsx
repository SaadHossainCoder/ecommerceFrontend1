"use client";

import Link from "next/link";
// import Image from "next/image";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex">
            {/* Left side - Brand/Image */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('https://i.pinimg.com/736x/0a/b5/0f/0ab50fa67bca3594f8d9e75ca4c3505b.jpg')" }}
                />
                <div className="relative z-10 flex flex-col justify-between p-12 text-white">
                    <Link href="/home" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                            <span className="text-xl font-bold">S</span>
                        </div>
                        <span className="text-2xl font-bold">ShopHub</span>
                    </Link>

                    <div className="space-y-6 mb-5">
                        <h1 className="text-4xl font-bold leading-tight ">
                            Welcome to the Shop
                        </h1>
                        <p className="text-lg text-white/80 max-w-md ">
                            Discover millions of products from trusted sellers. Fast delivery,
                            secure payments, and exceptional customer service.
                        </p>
                        {/* <div className="flex items-center gap-6 pt-4">
                            <div className="flex items-center gap-2">
                                <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                    <span className="text-xl font-bold">10M+</span>
                                </div>
                                <span className="text-sm text-white/80">Products</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                    <span className="text-xl font-bold">5M+</span>
                                </div>
                                <span className="text-sm text-white/80">Customers</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                    <span className="text-xl font-bold">99%</span>
                                </div>
                                <span className="text-sm text-white/80">Satisfaction</span>
                            </div>
                        </div> */}
                        <p className="text-sm text-white/60 pt-5">
                            © {new Date().getFullYear()} ShopHub. All rights reserved.
                        </p>
                    </div>


                </div>

                {/* Decorative elements */}
                <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-20 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl" />
            </div>

            {/* Right side - Auth Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
                <div
                    className="w-full max-w-md"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
