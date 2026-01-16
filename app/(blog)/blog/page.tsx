import Link from 'next/link';
import { getBlogPosts, estimateReadingTime } from '@/lib/blog';
import { ArrowRight, Clock, Calendar, Tag } from 'lucide-react';

export const metadata = {
    title: 'Rohan Chakravarty - Blog',
    description: 'Engineering thoughts, system design patterns, and low-level explorations.',
};

export default function BlogIndex() {
    const allPosts = getBlogPosts();

    // 1. Sort posts by date
    const sortedPosts = allPosts.sort((a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );

    // 2. Extract the "Featured" post (the newest one)
    const featuredPost = sortedPosts[0];
    const regularPosts = sortedPosts.slice(1);

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">

            {/* --- PAGE HEADER --- */}
            <div className="mb-16 md:mb-24 text-center md:text-left">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-900 dark:text-white mb-6">
                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Archive</span>.
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                    Explorations in full-stack engineering, design systems, and the chaotic beauty of C++.
                </p>
            </div>

            {/* --- FEATURED POST (HERO) --- */}
            {featuredPost && (
                <section className="mb-20">
                    <Link href={`/blog/${featuredPost.slug}`} className="group relative block">
                        <div className="relative overflow-hidden rounded-[2rem] bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-white/10 p-8 md:p-16 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30">

                            {/* Abstract Gradient Background Blob */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-blue-500/30 transition-all duration-500" />

                            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start md:items-center justify-between">
                                <div className="space-y-6 max-w-3xl">
                                    {/* Badge */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wider uppercase">
                                        <Tag className="w-3 h-3" />
                                        <span>Featured Issue</span>
                                    </div>

                                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {featuredPost.frontmatter.title}
                                    </h2>

                                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                                        {featuredPost.frontmatter.description}
                                    </p>

                                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-500 font-medium pt-4">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <time dateTime={featuredPost.frontmatter.date}>
                                                {new Date(featuredPost.frontmatter.date).toLocaleDateString('en-US', {
                                                    month: 'long', day: 'numeric', year: 'numeric'
                                                })}
                                            </time>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            <span>{estimateReadingTime(featuredPost.content)} min read</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow Button */}
                                <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-full border border-gray-300 dark:border-white/20 bg-white dark:bg-black group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                                    <ArrowRight className="w-6 h-6 text-gray-900 dark:text-white group-hover:text-white transition-colors" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* --- GRID LAYOUT (BENTO STYLE) --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => {
                    const readTime = estimateReadingTime(post.content);

                    return (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col h-full bg-transparent rounded-3xl hover:bg-gray-50 dark:hover:bg-zinc-900/50 p-6 -mx-6 transition-all duration-300"
                        >
                            {/* Content Container */}
                            <div className="flex-1 flex flex-col">
                                <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-4">
                                    <span>{new Date(post.frontmatter.date).getFullYear()}</span>
                                    <span>{readTime} MIN</span>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                                    {post.frontmatter.title}
                                </h3>

                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {post.frontmatter.description}
                                </p>

                                {/* Footer of Card */}
                                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Read Article
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transform group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}