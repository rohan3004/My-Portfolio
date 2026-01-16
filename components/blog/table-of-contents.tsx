"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents({ headings, nextPost }: { headings: TocItem[], nextPost: any }) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    return (
        <div className="sticky top-32">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                On this page
            </h3>

            <ul className="space-y-4 border-l border-gray-200 dark:border-gray-800">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={cn(
                            "pl-4 border-l-2 transition-colors duration-200",
                            activeId === heading.id
                                ? "border-blue-600"
                                : "border-transparent hover:border-gray-300"
                        )}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                "text-sm transition-colors block py-1",
                                activeId === heading.id
                                    ? "font-bold text-blue-600 dark:text-blue-400"
                                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" });
                                setActiveId(heading.id);
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>

            {/* NEXT READ WIDGET (Passed as prop to keep layout clean) */}
            {nextPost && (
                <div className="mt-12 bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/5">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Next Read</h4>
                    <Link href={`/blog/${nextPost.slug}`} className="group cursor-pointer block">
                        <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">
                            {new Date(nextPost.frontmatter.date).getFullYear()}
                        </div>
                        <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
                            {nextPost.frontmatter.title}
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}