import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rohan Chakravarty - Portfolio",
  description: "I am Software Developer Engineer, Cloud Architect, DevOps Engineer",
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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}