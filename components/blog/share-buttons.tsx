"use client";

import { Twitter, Linkedin, Share2, Check } from 'lucide-react';
import { useState } from 'react';

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
    const [copied, setCopied] = useState(false);

    // Construct the full URL (replace with your actual domain)
    const url = `https://rohandev.online/blog/${slug}`;
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            <a
                href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 transition-all group"
            >
                <Twitter className="w-5 h-5" />
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">
          Twitter
        </span>
            </a>

            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/20 transition-all group"
            >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">
          LinkedIn
        </span>
            </a>

            <button
                onClick={handleCopy}
                className="flex items-center gap-3 p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 transition-all group"
            >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
                <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0">
          {copied ? 'Copied' : 'Copy'}
        </span>
            </button>
        </div>
    );
}