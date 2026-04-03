"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="container-custom py-24 flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <p className="text-muted-foreground max-w-md">
                We encountered an error while loading this page. Please try again later.
            </p>
            <Button onClick={() => reset()}>Try again</Button>
        </div>
    );
}
