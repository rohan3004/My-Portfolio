"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimations() {
    useLayoutEffect(() => {
        // 1. LENIS SETUP (Smooth Scroll)
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);

        // 2. HERO INTRO ANIMATION
        const tl = gsap.timeline();
        tl.fromTo(
            ".section__pic-container img",
            { scale: 0.8, opacity: 0, filter: "blur(10px)" },
            { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }
        )
            .fromTo(
                [".section__text__p1", ".title", ".section__text__p2"],
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out" },
                "-=1"
            )
            .fromTo(
                ".btn-container",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=0.5"
            );

        // 3. SECTION REVEALS
        // IMPORTANT: Excluding #about (Stats) and #profile (Hero) to prevent conflicts
        const sections = document.querySelectorAll("section:not(#profile):not(#about)");

        sections.forEach((section) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        // 4. STAGGERED CARDS
        const staggerGroups = [
            { container: "#repo-container", item: ".repo-card" },
            { container: "#sp", item: ".instagram-photo" },
            { container: ".about-containers", item: ".details-container" }
        ];

        staggerGroups.forEach((group) => {
            if (document.querySelector(group.container)) {
                gsap.fromTo(
                    group.item,
                    { y: 50, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: "back.out(1.2)",
                        scrollTrigger: {
                            trigger: group.container,
                            start: "top 80%",
                        },
                    }
                );
            }
        });

        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return null;
}