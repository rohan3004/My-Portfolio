"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface StatsData {
    q: number;
    sub: string; // Changed to string for "14.22%"
    streak: number;
    stars: number;
    loaded: boolean;
}

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [weather, setWeather] = useState<any>(null);
    const [stats, setStats] = useState<StatsData>({
        q: 0, sub: "0%", streak: 0, stars: 2, loaded: false
    });

    useEffect(() => {
        const src = "https://stream.byrohan.in/hls/vid_bg1/master.m3u8";
        if (videoRef.current) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.MANIFEST_PARSED, () => videoRef.current?.play().catch(() => {}));
            } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
                videoRef.current.src = src;
                videoRef.current.addEventListener("loadedmetadata", () => videoRef.current?.play().catch(() => {}));
            }
        }

        const fetchData = async () => {
            try {
                // 1. IP & Weather
                const ipRes = await fetch("https://apis.byrohan.in/v1/your_ip");
                const ipData = await ipRes.json();
                const city = ipData?.cityNames?.en || "Kolkata";
                const wRes = await fetch(`https://api.weatherapi.com/v1/current.json?key=fc9c2d13772441e9b72191328240604&q=${city}`);
                const wData = await wRes.json();
                if (wData.error) throw new Error("Weather Error");
                setWeather({city, ...wData});

                // 2. Report Stats
                const res = await fetch('https://apis.byrohan.in/v1/reports/rohan.chakravarty02@gmail.com');
                const data = await res.json();
                
                // Calculate Total Solved (Summing available platforms)
                let total = 0;
                if (data.codechef?.problems_solved_total) total += data.codechef.problems_solved_total;
                if (data.leetcode?.problems_solved_total) total += data.leetcode.problems_solved_total;
                if (data.geeksforgeeks?.problems_solved_total) total += data.geeksforgeeks.problems_solved_total;
                // codeforces in your JSON has empty platform_specific and no explicit total in root sometimes, check specific key if needed. 
                // Based on your JSON, codeforces key exists but 'platform_specific' is empty. If it had 'problems_solved_total' inside root codeforces obj, add it.
                if (data.codeforces?.problems_solved_total) total += data.codeforces.problems_solved_total;

                setStats({
                    q: total,
                    // "14.22%" -> "Top 14%"
                    sub: data.leetcode?.platform_specific?.top_percentage || "N/A", 
                    streak: data.leetcode?.streak_max || 0,
                    // "2" (String) -> 2 (Number)
                    stars: parseInt(data.codechef?.platform_specific?.contest_rank_stars || "2"), 
                    loaded: true
                });
            } catch (e) {
                setStats(prev => ({...prev, loaded: true}));
                setWeather({city: "Kolkata", current: {temp_c: "24", condition: {text: "Clear", icon: ""}}});
            }
        };
        fetchData();
    }, []);

    return (
        <div className="sys-hero-container" id="hero">
            
            {/* Background */}
            <div className="sys-video-layer">
                <video ref={videoRef} id="player" autoPlay muted loop playsInline></video>
            </div>
            <div className="sys-grid-overlay"></div>

            <div className="sys-interface">
                
                {/* MOBILE HUD (Hidden on Desktop) */}
                <div className="sys-top-bar">
                    <div className="hud-badge">
                        {weather ? `${weather.city} ${weather.current?.temp_c}°` : "LOCATING..."}
                    </div>
                    <div className="hud-badge">
                        <span className="blink-dot"></span> Online
                    </div>
                </div>

                {/* LEFT MODULE */}
                <div className="sys-module">
                    <div className="sys-tag">Portfolio 2026</div>
                    <h1 className="sys-name">Rohan<br/>Chakravarty</h1>
                    <p className="sys-role-text">
                        <span>Backend & Cloud Engineer.</span> Building scalable microservices, distributed systems, and DevOps pipelines.
                    </p>
                    <div className="sys-actions">
                        <button className="sys-btn primary" onClick={() => window.open('/assets/RohanChakravarty.pdf')}>
                            Download CV
                        </button>
                        <button className="sys-btn" onClick={() => location.href = './#contact'}>
                            Contact Me
                        </button>
                    </div>
                </div>

                {/* RIGHT TERMINAL */}
                <div className="sys-terminal">
                    <div className="term-header">
                        <span>// LIVE_TELEMETRY</span>
                        <span>[ACTIVE]</span>
                    </div>
                    
                    <div className="term-body">
                        <div className="term-grid">
                            <div className="metric-block">
                                <span className="mb-label">Total Solved</span>
                                <span className="mb-value">{stats.loaded ? stats.q : "..."}</span>
                            </div>
                            <div className="metric-block">
                                <span className="mb-label">Streak</span>
                                <span className="mb-value">{stats.loaded ? stats.streak : "0"}</span>
                                <span className="mb-sub">DAYS</span>
                            </div>
                            <div className="metric-block">
                                <span className="mb-label">Rank</span>
                                <span className="mb-value">{stats.loaded ? `Top ${parseFloat(stats.sub)}%` : "..."}</span>
                                <span className="mb-sub">LEETCODE</span>
                            </div>
                            <div className="metric-block">
                                <span className="mb-label">Rating</span>
                                <span className="mb-value" style={{color: '#fbbf24'}}>{stats.loaded ? stats.stars : "2"}★</span>
                                <span className="mb-sub">CODECHEF</span>
                            </div>
                        </div>
                    </div>

                    {/* DESKTOP FOOTER (Hidden on Mobile) */}
                    <div className="term-footer">
                        <div className="tf-item">
                            <span className="blink-dot"></span> SERVER ONLINE
                        </div>
                        <div className="tf-item">
                            {weather ? `${weather.city} ${weather.current?.temp_c}°C` : "SCANNING..."}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}