import './blog/blog.css';
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/blog/header";
import { Footer } from "@/components/blog/footer";

export const metadata = {
    title: 'Rohan Chakravarty - Blog',
    description: 'Deep dives into code and architecture.',
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="antialiased min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300 selection:bg-blue-500/30 selection:text-blue-600 dark:selection:text-blue-300">
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        {/* Added pt-28 to push content below the fixed header */}
                        <main className="flex-grow pt-28 pb-12">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}