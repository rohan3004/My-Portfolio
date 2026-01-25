"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface StatsData {
    q: number;
    sub: string;
    streak: number;
    stars: number;
    badges: number;
    activeDays: number;
}

export default function Hero() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [weather, setWeather] = useState<any>(null);
    const [stats, setStats] = useState<StatsData>({
        q: 0, sub: "0%", streak: 0, stars: 0, badges: 0, activeDays: 0
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
                setWeather({city: city.toUpperCase(), ...wData});

                // 2. Stats
                const res = await fetch('https://apis.byrohan.in/v1/reports/rohan.chakravarty02@gmail.com');
                const data = await res.json();
                
                let total = 0;
                if (data.codechef?.problems_solved_total) total += data.codechef.problems_solved_total;
                if (data.leetcode?.problems_solved_total) total += data.leetcode.problems_solved_total;
                if (data.geeksforgeeks?.problems_solved_total) total += data.geeksforgeeks.problems_solved_total;
                if (data.codeforces?.problems_solved_total) total += data.codeforces.problems_solved_total;

                setStats({
                    q: total,
                    sub: data.leetcode?.platform_specific?.top_percentage || "1%", 
                    streak: data.leetcode?.streak_max || 0,
                    stars: parseInt(data.codechef?.platform_specific?.contest_rank_stars || "0"), 
                    badges: data.leetcode?.platform_specific?.badges || 0,
                    activeDays: data.leetcode?.platform_specific?.total_active_days || 0,
                });
            } catch (e) {
                // Keep loaded false on error to show placeholders or fail gracefully
                setStats(prev => ({...prev, loaded: true})); 
                setWeather({city: "Kolkata", current: {temp_c: "24", condition: {text: "Online"}}});
            }
        };
        fetchData();
    }, []);

    return (
        <div className="sys-hero-container" id="hero">
            
            <div className="sys-video-layer">
                <video ref={videoRef} id="player" autoPlay muted loop playsInline></video>
            </div>
            <div className="sys-grid-overlay"></div>

            <div className="sys-interface">
                
                {/* Mobile HUD */}
                <div className="sys-top-bar">
                    <div className="hud-badge">
                        {weather ? `${weather.city} ${weather.current?.temp_c}°C` : "LOCATING..."}
                    </div>
                    <div className="hud-badge">
                        <span className="blink-dot"></span> Online
                    </div>
                </div>

                {/* LEFT */}
                <div className="sys-module">
                    <div className="sys-tag">&gt; Hello, World!</div>
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

                {/* RIGHT */}
                <div className="sys-terminal">
                    <div className="term-header">
                        <span>// WIDGET PANE</span>
                        <span></span>
                    </div>
                    
                    <div className="term-body">
                        {/* 1 */}
                        <div className="metric-block">
                            <span className="mb-label">Total Solved</span>
                            <span className="mb-value">{stats.q}</span>
                            <span className="mb-sub">ALL PLATFORMS</span>
                        </div>
                        {/* 2 */}
                        <div className="metric-block">
                            <span className="mb-label">Badges</span>
                            <span className="mb-value">{stats.badges}</span>
                            <span className="mb-sub">EARNED</span>
                        </div>
                        {/* 3 */}
                        <div className="metric-block">
                            <span className="mb-label">Global Rank</span>
                            <span className="mb-value">{ `Top ${parseFloat(stats.sub)}`}</span>
                            <span className="mb-sub">LEETCODE</span>
                        </div>
                        {/* 4 */}
                        <div className="metric-block">
                            <span className="mb-label">Max Streak</span>
                            <span className="mb-value">{stats.streak}</span>
                            <span className="mb-sub">DAYS ACTIVE</span>
                        </div>
                         {/* 5 */}
                        <div className="metric-block">
                            <span className="mb-label">Rating</span>
                            <span className="mb-value" style={{color: '#fbbf24'}}>{stats.stars}★</span>
                            <span className="mb-sub">CODECHEF</span>
                        </div>
                         {/* 6 */}
                        <div className="metric-block">
                            <span className="mb-label">Active Days</span>
                            <span className="mb-value">{stats.activeDays}</span>
                            <span className="mb-sub">TOTAL</span>
                        </div>
                    </div>

                    <div className="term-footer">
                        <div className="tf-item">
                            <span className="blink-dot"></span> SERVER ONLINE
                        </div>
                        <div className="tf-item">
                            {weather ? `${weather.city} ${weather.current?.temp_c}°C` : "LOADING..."}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}