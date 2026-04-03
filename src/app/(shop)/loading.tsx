export default function Loading() {
    return (
        <div className="container-custom py-24 space-y-8 animate-pulse">
            <div className="h-64 bg-muted rounded-md w-full" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-4">
                        <div className="aspect-square bg-muted rounded-md" />
                        <div className="h-4 bg-muted w-3/4 rounded-md" />
                        <div className="h-4 bg-muted w-1/2 rounded-md" />
                    </div>
                ))}
            </div>
        </div>
    );
}
