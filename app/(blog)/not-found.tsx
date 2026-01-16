import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function BlogNotFound() {
    return (
        <div className="flex flex-col items-center justify-center py-20 md:py-32 text-center px-6">

            {/* Icon with Glow Effect */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                <div className="relative w-24 h-24 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-3xl flex items-center justify-center">
                    <FileQuestion className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
                Article not found.
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mb-10 leading-relaxed">
                The post you are looking for has been moved, deleted, or perhaps never existed in this timeline.
            </p>

            <Link
                href="/blog"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Archive</span>
            </Link>

        </div>
    );
}