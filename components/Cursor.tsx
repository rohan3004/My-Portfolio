"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // 1. Check for Mobile
        const checkMobile = () => {
            setIsMobile(window.matchMedia("(pointer: coarse)").matches);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);

        if (isMobile) return;

        // 2. Mouse Movement Logic
        const moveCursor = (e: MouseEvent) => {
            // Main Dot: Instant follow
            gsap.to(cursorRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0,
            });

            // Follower Ring: Smooth delay
            gsap.to(followerRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: "power2.out",
            });
        };

        // 3. Hover Effects (Scale up on clickable items)
        const handleHover = () => {
            gsap.to(followerRef.current, { scale: 3, opacity: 0.5, duration: 0.3 });
            gsap.to(cursorRef.current, { scale: 0, duration: 0.3 }); // Hide dot inside
        };

        const handleLeave = () => {
            gsap.to(followerRef.current, { scale: 1, opacity: 1, duration: 0.3 });
            gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
        };

        // Attach listeners
        window.addEventListener("mousemove", moveCursor);

        // Auto-detect clickable elements for hover effect
        const clickables = document.querySelectorAll("a, button, .icon, .btn, .Menu_BTN span, .ios-card, .dock-icon");
        clickables.forEach((el) => {
            el.addEventListener("mouseenter", handleHover);
            el.addEventListener("mouseleave", handleLeave);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("resize", checkMobile);
            clickables.forEach((el) => {
                el.removeEventListener("mouseenter", handleHover);
                el.removeEventListener("mouseleave", handleLeave);
            });
        };
    }, [isMobile]);

    // Mobile: Render nothing (CSS handles the dot) or simple fallback
    if (isMobile) return <div className="mobile-cursor-dot" />;

    return (
        <>
            <div ref={cursorRef} className="cursor-dot" />
            <div ref={followerRef} className="cursor-follower" />
        </>
    );
}