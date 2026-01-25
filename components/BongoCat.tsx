"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function BongoCat() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const ctx = gsap.context(() => {
            const ID = "bongo-cat";
            const s = (selector: string) => `#${ID} ${selector}`;

            // 1. Setup Elements
            const music = { note: s(".music .note") };
            const cat = {
                pawRight: {
                    up: s(".paw-right .up"),
                    down: s(".paw-right .down"),
                },
                pawLeft: {
                    up: s(".paw-left .up"),
                    down: s(".paw-left .down"),
                },
            };

            // 2. Initial States
            gsap.set(music.note, { scale: 0, autoAlpha: 1 });

            // 3. Paw Animation Helper
            const animatePawState = (selector: string) =>
                gsap.fromTo(
                    selector,
                    { autoAlpha: 0 },
                    {
                        autoAlpha: 1,
                        duration: 0.01,
                        repeatDelay: 0.19,
                        yoyo: true,
                        repeat: -1,
                    },
                );

            // 4. Main Timeline (Tapping)
            const tl = gsap.timeline();
            tl.add(animatePawState(cat.pawLeft.up), "start")
                .add(animatePawState(cat.pawRight.down), "start")
                .add(animatePawState(cat.pawLeft.down), "start+=0.19")
                .add(animatePawState(cat.pawRight.up), "start+=0.19")
                .timeScale(1.6);

            // 5. Code Typing Animation
            gsap.fromTo(
                ".terminal-code line",
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1,
                    duration: 0.1,
                    stagger: 0.1,
                    ease: "none",
                    repeat: -1,
                },
            );

            // 6. Floating Notes Logic
            const noteEls = gsap.utils.toArray(music.note) as HTMLElement[];

            const animateNotes = (els: HTMLElement[]): gsap.core.Tween => {
                els.forEach((el) => {
                    gsap.set(el, {
                        rotation: gsap.utils.random(-50, 50),
                        x: gsap.utils.random(-25, 25),
                    });
                });

                return gsap.fromTo(
                    els,
                    {
                        autoAlpha: 1,
                        y: 0,
                        scale: 0,
                    },
                    {
                        duration: 2,
                        autoAlpha: 0,
                        scale: 1,
                        ease: "none",
                        stagger: {
                            from: "random",
                            each: 0.5,
                        },
                        rotation: ((i: number) => gsap.utils.random(-30, 30)) as any,
                        x: ((i: number) => gsap.utils.random(40, 60)) as any,
                        y: gsap.utils.random(-200, -220),
                        // FIX: Curly braces prevent implicit return of the Tween object
                        onComplete: () => {
                            animateNotes(els);
                        },
                    },
                );
            };

            // Start Note Animation
            animateNotes(noteEls);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bongo-cat-container">
            <svg
                id="bongo-cat"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 783.55 354.91"
                preserveAspectRatio="xMidYMid slice"
            >
                <g className="head">
                    <path d="M280.4,221l383.8,62.6a171.4,171.4,0,0,0-9.2-40.5,174,174,0,0,0-28.7-50.5,163.3,163.3,0,0,0,3.2-73.8c-11.6-1.9-42,14.2-44.5,17.5-19.6-24-88.5-52.7-153.7-48.1A78.8,78.8,0,0,0,398,67.1c-9.8,2.9-19,29.7-19.4,33.7a320,320,0,0,0-31.7,23.6c-14,11.8-28.9,24.4-42.5,44.3A173,173,0,0,0,280.4,221Z" />
                    <path d="M396.6,178.6c.4.9,2.7,6.5,8.5,8.4s13.4-1.2,17.2-7.9c-.9,7.5,3.8,14.3,10.4,16a14.4,14.4,0,0,0,15-5.7" />
                    <path d="M474,179.2a6.6,6.6,0,0,0-4.9,3.6,6,6,0,0,0,1.5,7.3,6,6,0,0,0,7.9-1c2.3-2.6,2-7,.2-8s-5.9,1.6-5.7,3.5,1.9,2.8,3.2,2.3,1.1-2.2,1.1-2.3" />
                    <path d="M365.4,168.9c0,.3-.8,3.6,1.5,6a5.9,5.9,0,0,0,7.2,1.4,6.1,6.1,0,0,0,2.2-7.7c-1.5-3.1-5.7-4.5-7.3-3.2s-.8,6,1,6.6,3.3-.7,3.3-2.1-1.5-1.8-1.6-1.9" />
                    <g className="headphone headphone-right">
                        <g className="speaker">
                            <path d="M400.7,80.2c-14.1-20.8-40.2.3-50.7,15-8.7,12.2-9.7,30.3,2.8,37.3,5.4-9,11.8-15.6,21-26.2A214.1,214.1,0,0,1,400.7,80.2Z" />
                            <path d="M381.5,79.4c-6.6-7.5-9.6-5.8-12.3-5.5-16.3,1.3-32,20.3-27.8,33.9a21.8,21.8,0,0,0,5.9,8.5c1.7-2.6,3.5-5.1,5.4-7.7A150.7,150.7,0,0,1,381.5,79.4Z" />
                            <path d="M367.3,77.8a13.1,13.1,0,0,0-5.1-1.8c-8.5-.9-18.7,7.5-18.4,16.1a12.8,12.8,0,0,0,2.6,7c3.1-3.3,6.3-6.8,9.6-10.2S363.6,81.3,367.3,77.8Z" />
                        </g>
                        <path
                            className="band"
                            d="M515,40.6c-15.9-4.6-57-14.1-104,2.3a166.9,166.9,0,0,0-60.9,37.3"
                        />
                    </g>
                </g>

                <g className="music music-right">
                    {[1, 2, 3, 4].map((_, i) => (
                        <React.Fragment key={`nr-${i}`}>
                            <g className="note">
                                <g>
                                    <path d="M368.5,46.5c.5,2.1,1.2,3.5,3.8,6.3s5.1,4.3,6.5,7.2a11.1,11.1,0,0,1,.7,2,10.5,10.5,0,0,1-.7,6.5" />
                                    <path d="M368.5,46.5a20.8,20.8,0,0,0,2.4,11.7c2.3,4.4,5,5.4,6.8,9.5a17.5,17.5,0,0,1,.4,11" />
                                    <line x1="368.5" y1="47.7" x2="368.5" y2="92.8" />
                                    <path d="M368.5,92.8c.1-3.1-4.7-6.3-9-6.3s-8.7,2.7-8.7,5.8,4.8,5.7,8.7,5.8S368.3,95.8,368.5,92.8Z" />
                                </g>
                            </g>
                        </React.Fragment>
                    ))}
                </g>
                <g className="music music-left">
                    {[1, 2, 3, 4].map((_, i) => (
                        <React.Fragment key={`nl-${i}`}>
                            <g className="note">
                                <polyline points="614.8 155 614.8 116.8 647.5 124 647.5 162.9" />
                                <path d="M614.8,155.7c0-3.1-4.4-5.7-8.2-5.9s-9.2,2.8-9.2,6,4.7,5.6,8.7,5.6S614.8,158.8,614.8,155.7Z" />
                                <path d="M647.5,163.3c.1-3.1-4.4-5.7-8.2-5.9s-9.2,2.8-9.1,6,4.7,5.7,8.6,5.7S647.5,166.5,647.5,163.3Z" />
                            </g>
                        </React.Fragment>
                    ))}
                </g>

                <g className="table">
                    <polygon points="25.3 158.5 783.2 293 513 354.9 25.3 158.5" />
                    <line
                        x1="25.3"
                        y1="158.5"
                        x2="783.2"
                        y2="293"
                        fill="none"
                        stroke="#8d00fc"
                        strokeMiterlimit="10"
                        strokeWidth="4"
                    />
                    <line x1="783.2" y1="293" x2="25.3" y2="158.5" fill="none" />
                </g>
                <polygon
                    className="laptop-base"
                    points="103.2 263.6 258.9 219.3 636.5 294.4 452.1 339 103.2 263.6"
                />
                <g className="laptop-keyboard">
                    <polygon points="369.6 265.6 255.3 244.3 255.5 243.5 264.7 241.9 380.9 262.3 380.8 263.1 369.6 265.6" />
                    <polygon points="235.9 256.4 219.8 253.2 219.9 252.5 228.7 251 245.3 253.4 245.1 254.2 235.9 256.4" />
                    <polygon points="473.1 303.7 248.4 258.9 248.6 258.1 257.7 256.6 486.2 300.4 486 301.3 473.1 303.7" />
                </g>
                <g className="paw paw-right">
                    <path
                        className="down"
                        d="M289.1,181.7c-12.1,9.8-20.6,20.7-20.7,32.1-.2,9,3.8,20.4,13.3,25.2s20.1.6,29.6-3.4c13.4-5.7,23.9-14.6,29.4-21.5"
                    />
                    <g className="up">
                        <path d="M327.3,170c-.4-1.4-6.3-18.8-23.5-23.5-.8-.2-18.6-4.7-28.9,6.3-8.4,9.1-6,22.5-4.6,30.2a54.3,54.3,0,0,0,8.1,19.9" />
                        <g className="pads">
                            <path d="M297.2,154.8c1-.5,2.7-.1,3,.6s-1.4,2.4-2.6,2.1a1.6,1.6,0,0,1-1.1-1.2A1.6,1.6,0,0,1,297.2,154.8Z" />
                            <path d="M285.8,159.4c.3-.4,1-1.1,1.7-.8s.9,1.4.8,2.2-1.8,2.1-2.5,1.5S285.2,160.4,285.8,159.4Z" />
                        </g>
                    </g>
                </g>

                <polygon
                    className="terminal-frame"
                    points="93.8 63.3 284.1 73 335.9 230.5 146.2 197.6 93.8 63.3"
                />
                <g className="terminal-code">
                    <line x1="260.2" y1="92.3" x2="212.2" y2="88.7" />
                    <line x1="197.3" y1="87.5" x2="145.2" y2="83.5" />
                    <line x1="251" y1="104.2" x2="223.4" y2="101.8" />
                    <line x1="209.4" y1="100.5" x2="154.4" y2="95.6" />
                    <line x1="256.4" y1="117.9" x2="227.5" y2="114.7" />
                    <line x1="215.9" y1="113.4" x2="183.5" y2="109.8" />
                    <line x1="169.1" y1="108.2" x2="142.9" y2="105.3" />
                    <line x1="275.4" y1="132.8" x2="249.4" y2="129.6" />
                    <line x1="234.4" y1="127.8" x2="197.3" y2="123.3" />
                    <line x1="185.6" y1="121.9" x2="149.1" y2="117.5" />
                    <line x1="261" y1="144.6" x2="244.5" y2="142.5" />
                </g>

                <polygon
                    className="laptop-cover"
                    points="103.2 263.6 452.1 339 360.8 12.4 2 2 103.2 263.6"
                />

                <g className="paw paw-left">
                    <g className="up">
                        <path d="M586.6,208.8c-.6-2.3-4.2-15.6-17.2-22.2-2.7-1.3-12.8-6.4-23.6-1.8s-14.6,16.5-14.8,18.4c-1.2,9-.7,18.4,2.4,26.1,2.4,6,7.5,17.2,9.7,20.2" />
                        <g className="pads">
                            <path d="M561.4,194.9a2.7,2.7,0,0,1,3,.5c.4,1-1.4,2.4-2.6,2.2a1.5,1.5,0,0,1-1.1-1.3A1.2,1.2,0,0,1,561.4,194.9Z" />
                            <path d="M550.7,200.4c.4-.5,1.1-1.1,1.7-.8a2,2,0,0,1,.8,2.2c-.3,1.2-1.8,2-2.5,1.5S550.1,201.3,550.7,200.4Z" />
                        </g>
                    </g>
                    <path
                        className="down"
                        d="M534.1,231.4c-19.7,6-32.9,18.4-34.2,29.1a30.1,30.1,0,0,0,1.7,14.1,24.8,24.8,0,0,0,6.1,8.8c6,5.1,16.8,4,38-3.9a288.7,288.7,0,0,0,46.5-22.1"
                    />
                </g>

                <g className="headphone headphone-left">
                    <g className="speaker">
                        <path d="M609.5,137.3c-17.1,6.3-20.7,51.4-4.5,67.3,1.4,1.5,5.5,5.5,11.3,5.9,8.2.5,14.5-6.3,16.9-8.9,10.1-11,11.5-27.5,8.1-40.1-1.4-4.8-3.9-14-12.7-19.9C627.4,140.8,617.7,134.3,609.5,137.3Z" />
                    </g>
                    <path
                        className="band"
                        d="M638.9,157.7c-4-16.8-25.9-61.9-75.3-95.3A155.5,155.5,0,0,0,515,40.6"
                    />
                </g>
            </svg>
        </div>
    );
}
