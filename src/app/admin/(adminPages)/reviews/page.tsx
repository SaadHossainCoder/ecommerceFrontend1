"use client";

import { useState } from "react";
import {
    Star,
    Search,
    Filter,
    CheckCircle2,
    XCircle,
    MoreHorizontal,
    MessageSquare,
    User,
    Calendar,
    ThumbsUp,
    Send,
    Trash2,
    Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toaster";

const initialReviews = [
    {
        id: 1,
        customer: "Alice Johnson",
        avatar: "/avatars/01.png",
        product: "Wireless Headphones",
        rating: 5,
        comment: "Absolutely love these headphones! The base is incredible and they are so comfortable for long sessions.",
        date: "2024-03-18",
        status: "Published",
        helpful: 12
    },
    {
        id: 2,
        customer: "Mark Spencer",
        avatar: "/avatars/02.png",
        product: "Smart Watch Pro",
        rating: 4,
        comment: "Great watch, but the battery life could be a bit better. Overall very satisfied with the health tracking.",
        date: "2024-03-17",
        status: "Pending",
        helpful: 5
    },
];

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-muted"}`}
                />
            ))}
        </div>
    );
};

export default function ReviewsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Modal States
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<any>(null);

    const filteredReviews = initialReviews.filter((review) => {
        const matchesSearch =
            review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.comment.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || review.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleReply = (review: any) => {
        setSelectedReview(review);
        setIsReplyOpen(true);
    };

    const handleDeleteClick = (review: any) => {
        setSelectedReview(review);
        setIsDeleteOpen(true);
    };

    const handleFlagReview = (review: any) => {
        toast({
            title: "Review Flagged",
            description: `Audit started for feedback from ${review.customer}.`,
            variant: "warning",
        });
    };

    const handlePublish = (review: any) => {
        toast({
            title: "Content Verified",
            description: `Review by ${review.customer} is now visible to the public.`,
            variant: "success",
        });
    };

    const confirmReply = () => {
        setIsReplyOpen(false);
        toast({
            title: "Reply Transmitted",
            description: "Your official response has been broadcasted.",
            variant: "success",
        });
    };

    const confirmDelete = () => {
        setIsDeleteOpen(false);
        toast({
            title: "Review Removed",
            description: "Content has been purged from the product page.",
            variant: "destructive",
        });
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Product Reviews</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage customer feedback and monitor product ratings
                    </p>
                </div>
            </div>

            {/* Review Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="p-6">
                    <p className="text-sm text-muted-foreground font-medium">Average Rating</p>
                    <div className="flex items-center gap-2 mt-2">
                        <h3 className="text-3xl font-bold">4.8</h3>
                        <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                    </div>
                </Card>
                <Card className="p-6">
                    <p className="text-sm text-muted-foreground font-medium">Total Reviews</p>
                    <h3 className="text-3xl font-bold mt-2">1,248</h3>
                </Card>
                <Card className="p-6 text-amber-600">
                    <p className="text-sm text-muted-foreground font-medium">Pending Approval</p>
                    <h3 className="text-3xl font-bold mt-2">12</h3>
                </Card>
                <Card className="p-6">
                    <p className="text-sm text-muted-foreground font-medium">Recent Growth</p>
                    <h3 className="text-3xl font-bold mt-2 text-green-500">+18%</h3>
                </Card>
            </div>

            {/* Filters */}
            <Card>
                <div className="p-4 flex flex-col sm:flex-row gap-4 border-b">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search reviews..."
                            className="pl-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px]">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="Published">Published</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Hidden">Hidden</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="divide-y">
                    <>
                        {filteredReviews.map((review) => (
                            <div
                                key={review.id}
                                className="p-6 hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex flex-col lg:flex-row gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={review.avatar} alt={review.customer} />
                                                    <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h4 className="font-bold">{review.customer}</h4>
                                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                        <StarRating rating={review.rating} />
                                                        <span>•</span>
                                                        <div className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            {review.date}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge variant={review.status === "Published" ? "success" : review.status === "Pending" ? "warning" : "destructive"}>
                                                {review.status}
                                            </Badge>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-semibold text-primary">Re: {review.product}</p>
                                            <p className="text-sm leading-relaxed">{review.comment}</p>
                                        </div>
                                        <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <ThumbsUp className="w-3 h-3" />
                                                {review.helpful} people found this helpful
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex lg:flex-col justify-end gap-2 shrink-0">
                                        {review.status !== "Published" && (
                                            <Button variant="outline" size="sm" className="lg:w-full" onClick={() => handlePublish(review)}>
                                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                                Check & Publish
                                            </Button>
                                        )}
                                        <Button variant="outline" size="sm" className="lg:w-full" onClick={() => handleReply(review)}>
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Respond
                                        </Button>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleFlagReview(review)}>
                                                    <Flag className="w-4 h-4 mr-2" />
                                                    Flag for Review
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive font-medium" onClick={() => handleDeleteClick(review)}>
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Expunge Review
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                </div>
            </Card>

            {/* Recurrent Modals */}
            <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Broadcast Response</DialogTitle>
                        <DialogDescription>
                            Direct communication with <strong>{selectedReview?.customer}</strong>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="bg-muted p-4 rounded-xl border-l-4 border-l-primary italic text-xs leading-relaxed">
                            "{selectedReview?.comment}"
                        </div>
                        <div className="grid gap-2">
                            <Label className="text-[10px] uppercase font-bold tracking-widest opacity-60">Your Official Message</Label>
                            <Textarea
                                placeholder="Write a professional response..."
                                className="h-32 bg-muted/30 focus-visible:ring-primary"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsReplyOpen(false)}>Discard</Button>
                        <Button variant="gradient" onClick={confirmReply}>
                            <Send className="h-4 w-4 mr-2" />
                            Post Reaction
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="sm:max-w-[400px]">
                    <DialogHeader>
                        <DialogTitle className="text-destructive">Purge Content</DialogTitle>
                        <DialogDescription>
                            Are you certain you want to redact this review from <strong>{selectedReview?.customer}</strong>? This action is irreversible.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Abort</Button>
                        <Button variant="destructive" onClick={confirmDelete}>Expunge Permanently</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
