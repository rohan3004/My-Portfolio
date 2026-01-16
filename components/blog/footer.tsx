"use client";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-white/10">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">

                    {/* Column 1: Brand & Newsletter (Spans 5 columns) */}
                    <div className="md:col-span-5 space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                The Backend Architect
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
                                Deep dives into system design, low-level C++ internals, and scalable backend architecture.
                                No spam, just code.
                            </p>
                        </div>

                        <form className="flex gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="rohan@example.com"
                                className="flex-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>

                    {/* Column 2: Writing (Spans 2 columns) */}
                    <div className="md:col-span-2 md:col-start-7">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Writing</h4>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link href="/app/(blog)/blog/blog?tag=backend" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Backend Arch</Link></li>
                            <li><Link href="/app/(blog)/blog/blog?tag=cpp" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Low-Level C++</Link></li>
                            <li><Link href="/app/(blog)/blog/blog?tag=devops" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">DevOps & NGINX</Link></li>
                            <li><Link href="/app/(blog)/blog/blog?tag=automation" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Automation</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Projects (Spans 2 columns) */}
                    <div className="md:col-span-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Projects</h4>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Chromium V8 Shell</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Java API Gateway</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Web Scraper</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Fedora Setup</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Connect (Spans 3 columns) */}
                    <div className="md:col-span-3 lg:col-span-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-6">Connect</h4>
                        <div className="flex gap-4">
                            <a href="https://github.com/rochakra2501" target="_blank" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com/in/rohan-chakravarty" target="_blank" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-[#0077b5] hover:text-white transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="mailto:rohan@rohandev.online" className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500 dark:text-gray-500 font-mono">
                    <p>© {new Date().getFullYear()} Rohan Chakravarty. Bangalore, India.</p>
                    <div className="flex items-center gap-6">
                        <Link href="/rss" className="hover:text-gray-900 dark:hover:text-gray-300">RSS</Link>
                        <Link href="/sitemap" className="hover:text-gray-900 dark:hover:text-gray-300">Sitemap</Link>
                        <span>Built with Next.js 16 & Tailwind</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}