import type { NextConfig } from "next";
import withPWA from "@ducanh2912/next-pwa";

const nextConfig: NextConfig = {
  /* config options here */
    turbopack: {

    },
};

const pwaConfig = withPWA({
    dest: "public",         // Where to put the service worker
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    disable: process.env.NODE_ENV === "development", // Disable in dev mode
    workboxOptions: {
        disableDevLogs: true,
    },
});

export default pwaConfig(nextConfig);
