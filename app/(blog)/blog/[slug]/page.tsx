import { getPostBySlug, getBlogPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug'; // 👈 Install this: npm install rehype-slug
import 'prism-themes/themes/prism-one-dark.css';
import { ArrowLeft, Calendar, MoreHorizontal, Bookmark } from 'lucide-react';
import { ShareButtons } from '@/components/blog/share-buttons';
import { TableOfContents } from '@/components/blog/table-of-contents';

// Helper to extract headings from markdown string
function getHeadings(content: string) {
    // Regex to find ## Heading and ### Heading
    const headingLines = content.match(/^#{2,3}\s.+/gm) || [];

    return headingLines.map((line) => {
        const level = line.match(/^#+/)?.[0].length || 2;
        const text = line.replace(/^#+\s/, '');
        // Simple slugify for ID matching (must match rehype-slug behavior)
        const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        return { id, text, level };
    });
}

function estimateReadingTime(text: string) {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wpm);
}

export async function generateStaticParams() {
    const posts = getBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return;
    return {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) return notFound();

    // --- 1. CALCULATE NEXT POST ---
    const allPosts = getBlogPosts().sort((a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
    const currentIndex = allPosts.findIndex((p) => p.slug === slug);
    // Get next post, or loop back to start if at the end
    const nextPost = allPosts[currentIndex + 1] || allPosts[0];

    // --- 2. EXTRACT HEADINGS ---
    const headings = getHeadings(post.content);
    const readTime = estimateReadingTime(post.content);

    return (
        <div className="min-h-screen bg-white dark:bg-black">

            {/* TOP NAVIGATION BAR */}
            <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                <Link
                    href="/blog"
                    className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span>Back to Archive</span>
                </Link>

                {/* --- WORKING BREADCRUMBS --- */}
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                    <Link href="/" className="hover:text-gray-900 dark:hover:text-white">Home</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-gray-900 dark:hover:text-white">Archive</Link>
                    <span>/</span>
                    <span className="text-gray-900 dark:text-white truncate max-w-[200px] font-medium">
                        {post.frontmatter.title}
                    </span>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT SIDEBAR (Socials) */}
                    <aside className="hidden lg:block lg:col-span-2 relative">
                        <div className="sticky top-32 flex flex-col gap-6 items-start w-full">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Share</span>

                            {/* --- WORKING SHARE BUTTONS --- */}
                            <ShareButtons title={post.frontmatter.title} slug={post.slug} />

                            <div className="w-10 h-px bg-gray-200 dark:bg-gray-800 my-2"></div>

                            <button className="flex items-center gap-3 p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors w-full">
                                <Bookmark className="w-5 h-5" />
                                <span className="text-sm font-medium">Save</span>
                            </button>
                        </div>
                    </aside>

                    {/* CENTER CONTENT */}
                    <div className="col-span-1 lg:col-span-7">
                        <header className="mb-12">
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="px-3 py-1 rounded-full border border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                                    Engineering
                                </span>
                                <span className="px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                                    {readTime} min read
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-8">
                                {post.frontmatter.title}
                            </h1>

                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-900 flex items-center justify-center text-lg font-bold text-white shadow-inner">
                                        R
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-900 dark:text-white">Rohan Chakravarty</div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                            <Calendar className="w-3 h-3" />
                                            <time dateTime={post.frontmatter.date}>
                                                {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                                                    month: 'long', day: 'numeric', year: 'numeric'
                                                })}
                                            </time>
                                        </div>
                                    </div>
                                </div>

                                <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white">
                                    <MoreHorizontal className="w-6 h-6" />
                                </button>
                            </div>
                        </header>

                        <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-headings:scroll-mt-32  // 👈 Adds offset for sticky header when clicking links
              prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
              prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded-2xl
              prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12
            ">
                            <MDXRemote
                                source={post.content}
                                options={{
                                    mdxOptions: {
                                        rehypePlugins: [
                                            rehypePrism,
                                            rehypeSlug // 👈 Automatically adds IDs to headings for TOC to work
                                        ]
                                    },
                                }}
                            />
                        </div>

                        <div className="mt-20 p-8 rounded-3xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
                            <div className="w-20 h-20 rounded-full bg-black dark:bg-white flex items-center justify-center text-3xl font-bold text-white dark:text-black shrink-0">
                                R
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Written by Rohan Chakravarty</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Software Engineer specializing in backend architecture.
                                </p>
                                <div className="flex gap-4 justify-center md:justify-start">
                                    <a href="#" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">Follow on Twitter</a>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* RIGHT SIDEBAR (TOC + Next Read) */}
                    <aside className="hidden lg:block lg:col-span-3 relative">
                        {/* --- WORKING TOC & NEXT READ --- */}
                        <TableOfContents headings={headings} nextPost={nextPost} />
                    </aside>

                </div>
            </main>
        </div>
    );
}