import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Your Global Theme
                background: "#0b050a",
                primary: "#f2e4ef", // Text color
                accent: "#b16f59", // Rose Copper

                // Sci-Fi / HUD Specific
                sci: {
                    base: "#0a0a0a",
                    glass: "rgba(15, 15, 20, 0.7)",
                    border: "rgba(177, 111, 89, 0.3)",
                    accent: "#b16f59",
                    grid: "rgba(177, 111, 89, 0.05)",
                    text: "#e0e0e0",
                    dim: "#7a7a7a",
                },

                // Apple Card Specific
                apple: {
                    glass: "rgba(255, 255, 255, 0.08)", // slight adjustment for tailwind
                    border: "rgba(255, 255, 255, 0.3)",
                    green: "#30D158",
                    orange: "#FF9F0A",
                    gold: "#FFD60A",
                }
            },
            fontFamily: {
                sans: ["var(--font-poppins)", "sans-serif"], // We will set this up in layout
                mono: ["var(--font-jetbrains)", "monospace"],
            },
            backgroundImage: {
                'sci-grid-pattern': "linear-gradient(rgba(177, 111, 89, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(177, 111, 89, 0.05) 1px, transparent 1px)",
            },
            boxShadow: {
                'glass': '0 0 10px 1px rgba(0, 0, 0, 0.25)',
                'neon': '0 0 10px var(--accent)',
                'sci': '0 10px 40px -10px rgba(0, 0, 0, 0.5)',
            },
            animation: {
                'appear': 'appear linear', // timeline based, handled in CSS usually
                'pulse-slow': 'pulse 2s infinite',
                'ripple': 'ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite',
                'scale-in': 'scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'blink': 'blink 1s step-end infinite',
                'rotate-cw': 'rotateCW 40s linear infinite', // For 3D void
                'rotate-ccw': 'rotateCCW 40s linear infinite',
            },
            keyframes: {
                appear: {
                    '0%': { opacity: '0', scale: '0.5' },
                    '100%': { opacity: '1', scale: '1' },
                },
                ripple: {
                    '0%': { top: '32px', left: '32px', width: '0', height: '0', opacity: '1' },
                    '100%': { top: '0px', left: '0px', width: '64px', height: '64px', opacity: '0', borderWidth: '0px' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                blink: {
                    '0%, 100%': { opacity: '0' },
                    '50%': { opacity: '1' },
                }
            }
        },
    },
    plugins: [],
};
export default config;