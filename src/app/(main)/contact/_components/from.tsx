"use client"
import { useState } from "react"
import { ArrowRight, Send } from "lucide-react"

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const resetForm = () => {
        setIsSubmitted(false);
        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };

    if (isSubmitted) {
        return (
            <div className="bg-white p-12 md:p-16 border border-stone-200 shadow-sm h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-stone-50 text-stone-900">
                    <Send className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-serif text-stone-900">Inquiry Received</h3>
                <p className="text-stone-500 font-light">
                    Thank you for reaching out. A member of our team will respond to your request within 24 hours.
                </p>
                <button
                    onClick={resetForm}
                    className="text-xs uppercase tracking-[0.2em] font-bold border-b border-stone-900 pb-1 hover:text-stone-400 hover:border-stone-400 transition-colors"
                >
                    Send another message
                </button>
            </div>
        )
    }

    return (
        <div
            className="bg-white p-12 md:p-16 border border-stone-200 shadow-sm"
        >
            <form onSubmit={handleSubmit} className="space-y-12">
                <div className="space-y-10">
                    <div className="grid gap-10 sm:grid-cols-2">
                        <div className="group relative">
                            <input
                                type="text"
                                id="name"
                                placeholder=" "
                                value={formData.name}
                                onChange={handleChange}
                                className="peer w-full bg-transparent border-b border-stone-200 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors italic"
                                required
                            />
                            <label htmlFor="name" className="absolute left-0 top-3 text-xs uppercase tracking-widest text-stone-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-stone-900">
                                Your Name
                            </label>
                        </div>
                        <div className="group relative">
                            <input
                                type="email"
                                id="email"
                                placeholder=" "
                                value={formData.email}
                                onChange={handleChange}
                                className="peer w-full bg-transparent border-b border-stone-200 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors italic"
                                required
                            />
                            <label htmlFor="email" className="absolute left-0 top-3 text-xs uppercase tracking-widest text-stone-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-stone-900">
                                Email Address
                            </label>
                        </div>
                    </div>
                    <div className="group relative">
                        <input
                            type="text"
                            id="subject"
                            placeholder=" "
                            value={formData.subject}
                            onChange={handleChange}
                            className="peer w-full bg-transparent border-b border-stone-200 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors italic"
                            required
                        />
                        <label htmlFor="subject" className="absolute left-0 top-3 text-xs uppercase tracking-widest text-stone-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-stone-900">
                            Subject
                        </label>
                    </div>
                    <div className="group relative">
                        <textarea
                            id="message"
                            placeholder=" "
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="peer w-full bg-transparent border-b border-stone-200 py-3 text-sm focus:outline-none focus:border-stone-900 transition-colors italic resize-none"
                            required
                        />
                        <label htmlFor="message" className="absolute left-0 top-3 text-xs uppercase tracking-widest text-stone-400 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-stone-900">
                            How can we help?
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-stone-900 text-white py-5 text-xs uppercase tracking-widest font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-3 group disabled:opacity-70"
                >
                    {isSubmitting ? "Processing..." : (
                        <>
                            Submit Inquiry <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </div>
    )
}

export default ContactForm
