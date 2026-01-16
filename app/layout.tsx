import type {Metadata} from "next";
import "./globals.css";
import Cursor from "@/components/Cursor";
import "@fortawesome/fontawesome-free/css/all.min.css";

export const metadata: Metadata = {
    title: "Rohan Chakravarty - Portfolio",
    description: "I am Software Developer Engineer, Cloud Architect, DevOps Engineer",
    icons: {
        icon: '/favicon.ico',
    },
    manifest: "/manifest.json",
    openGraph: {
        title: "Rohan Chakravarty's Portfolio",
        description: "I am Software Developer Engineer, Cloud Architect, DevOps Engineer",
        images: "https://rcxdev.com/assets/logo.webp",
        url: "https://rcxdev.com/",
        type: "profile",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body><Cursor/>{children}</body>
        </html>
    );
}