"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X } from "lucide-react"; // Added Menu/X for mobile
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: "CP Stats", href: "/#about" },
    { name: "System Design", href: "/blog?tag=system-design" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
    { name: "Photography", href: "/#photography" },
];

export function Header() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => setMounted(true), []);

    // Smart Header Logic: Hide on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsHidden(true); // Scrolling down
            } else {
                setIsHidden(false); // Scrolling up
            }
            setIsScrolled(currentScrollY > 20);
            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform ${
                    isHidden ? "-translate-y-full" : "translate-y-0"
                } ${
                    isScrolled || mobileMenuOpen
                        ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/50 dark:border-white/10"
                        : "bg-transparent border-transparent"
                }`}
            >
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 group-active:scale-95">
                            <img
                                src="/assets/logo.webp"
                                alt="Logo"
                                className="desktop-logo rounded-3xl"
                            />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white hidden sm:block">
              RCX Dev
            </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${
                                    pathname === link.href
                                        ? "text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-300"
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                            aria-label="Toggle Theme"
                        >
                            {mounted && (
                                <div className="relative w-5 h-5">
                                    <motion.div
                                        initial={{ scale: 0, rotate: 90 }}
                                        animate={{ scale: theme === "dark" ? 1 : 0, rotate: theme === "dark" ? 0 : 90 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <Moon className="w-5 h-5 text-white" />
                                    </motion.div>
                                    <motion.div
                                        initial={{ scale: 0, rotate: -90 }}
                                        animate={{ scale: theme === "light" ? 1 : 0, rotate: theme === "light" ? 0 : -90 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <Sun className="w-5 h-5 text-black" />
                                    </motion.div>
                                </div>
                            )}
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-gray-600 dark:text-gray-300"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-white dark:bg-black pt-24 px-6 md:hidden"
                    >
                        <nav className="flex flex-col gap-6 text-xl font-medium">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}