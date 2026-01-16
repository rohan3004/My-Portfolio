import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Get the root path (where package.json is)
const contentDirectory = path.join(process.cwd(), 'content');

export interface BlogPost {
    slug: string;
    frontmatter: {
        title: string;
        date: string;
        description: string;
        [key: string]: any;
    };
    content: string;
}

export function getBlogPosts(): BlogPost[] {
    console.log("------------------------------------------------");
    console.log("🔍 Looking for posts in:", contentDirectory);

    // 1. Check if directory exists
    if (!fs.existsSync(contentDirectory)) {
        console.error("❌ ERROR: 'content' folder not found at:", contentDirectory);
        console.error("👉 Please create a folder named 'content' in your project root.");
        return [];
    }

    const files = fs.readdirSync(contentDirectory);
    console.log(`📂 Found ${files.length} files in directory.`);

    // 2. Filter for Markdown files only
    const mdFiles = files.filter((file) =>
        path.extname(file) === '.mdx' || path.extname(file) === '.md'
    );

    if (mdFiles.length === 0) {
        console.log("⚠️  No .md or .mdx files found.");
        return [];
    }

    // 3. Process files
    const posts = mdFiles.map((fileName) => {
        try {
            const slug = fileName.replace(/\.mdx?$/, '');
            const fullPath = path.join(contentDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            // Validate date
            if (!data.date) {
                console.warn(`⚠️  Warning: File '${fileName}' is missing a 'date' field.`);
            }

            return {
                slug,
                frontmatter: data as BlogPost['frontmatter'],
                content,
            };
        } catch (e) {
            console.error(`❌ Error parsing file ${fileName}:`, e);
            return null;
        }
    }).filter(Boolean) as BlogPost[]; // Remove any failed posts

    // 4. Sort by date safely
    return posts.sort((a, b) => {
        const dateA = new Date(a.frontmatter.date || new Date());
        const dateB = new Date(b.frontmatter.date || new Date());
        return dateB.getTime() - dateA.getTime();
    });
}

export function getPostBySlug(slug: string): BlogPost | null {
    try {
        // Check for both extensions
        const realSlug = slug.replace(/\.mdx?$/, ''); // Handle cases where slug includes ext
        let fullPath = path.join(contentDirectory, `${realSlug}.mdx`);

        if (!fs.existsSync(fullPath)) {
            fullPath = path.join(contentDirectory, `${realSlug}.md`);
        }

        if (!fs.existsSync(fullPath)) {
            console.log(`❌ Post not found: ${realSlug}`);
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug: realSlug,
            frontmatter: data as BlogPost['frontmatter'],
            content,
        };
    } catch (error) {
        return null;
    }
}

export function estimateReadingTime(text: string) {
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wpm);
}