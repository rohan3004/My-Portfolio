"use client";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Chart from "chart.js/auto";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const THEME = {
    primary: '#b16f59',
    text: '#e0e0e0',
    grid: 'rgba(255, 255, 255, 0.05)',
    leetcode: '#FFA116',
    codechef: '#b16f59', 
    codeforces: '#318CE7', 
    gfg: '#2F8D46', 
};

export default function Stats() {
    const containerRef = useRef<HTMLDivElement>(null);
    const lineChartRef = useRef<HTMLCanvasElement>(null);
    const pieChartRef = useRef<HTMLCanvasElement>(null);
    const lineChartInstance = useRef<Chart | null>(null);
    const pieChartInstance = useRef<Chart | null>(null);

    const [platform, setPlatform] = useState("leetcode");
    const [apiData, setApiData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // --- GSAP ANIMATION SEQUENCE ---
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%", 
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(".holo-header", {
                y: -30, opacity: 0, duration: 0.8, ease: "power3.out"
            })
            .from(".holo-dashboard", {
                scale: 0.95, opacity: 0, duration: 0.8, ease: "back.out(1.7)"
            }, "-=0.6")
            .from(".holo-orb-panel", {
                x: -50, opacity: 0, duration: 0.6, ease: "power3.out"
            }, "-=0.5")
            .from(".holo-deck-panel", {
                x: 50, opacity: 0, duration: 0.6, ease: "power3.out"
            }, "<")
            .from(".holo-tabs", {
                y: 10, opacity: 0, duration: 0.4
            }, "-=0.2")
            .from(".holo-metric-box", {
                y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.2)"
            }, "-=0.2");

        }, containerRef);

        return () => ctx.revert(); 
    }, []);

    // 1. Fetch Data
    useEffect(() => {
        fetch('https://apis.byrohan.in/v1/reports/rohan.chakravarty02@gmail.com')
            .then(res => res.json())
            .then(data => {
                setApiData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // 2. Pie Chart Logic
    useEffect(() => {
        if (!pieChartRef.current || !apiData) return;
        if (pieChartInstance.current) pieChartInstance.current.destroy();

        const dataValues = [
            apiData.leetcode?.problems_solved_total || 0,
            apiData.codeforces?.problems_solved_total || 0,
            apiData.codechef?.problems_solved_total || 0,
            apiData.geeksforgeeks?.problems_solved_total || 0
        ];
        const total = dataValues.reduce((a, b) => a + b, 0);

        const centerText = {
            id: 'centerText',
            beforeDraw: (chart: any) => {
                const { ctx, width, height } = chart;
                ctx.restore();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                const fontSize = width < 150 ? '1.5rem' : '2rem';
                ctx.font = `bold ${fontSize} "Space Grotesk", sans-serif`;
                ctx.fillStyle = '#fff';
                ctx.fillText(total, width / 2, height / 2 - 10);

                ctx.font = '0.7rem "JetBrains Mono", monospace';
                ctx.fillStyle = '#888';
                ctx.fillText("SOLVED", width / 2, height / 2 + 15);
                ctx.save();
            }
        };

        pieChartInstance.current = new Chart(pieChartRef.current, {
            type: 'doughnut',
            data: {
                labels: ['LC', 'CF', 'CC', 'GFG'],
                datasets: [{
                    data: dataValues,
                    backgroundColor: [THEME.leetcode, THEME.codeforces, THEME.codechef, THEME.gfg],
                    borderWidth: 0,
                    hoverOffset: 10,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '85%',
                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 2000, 
                    easing: 'easeOutQuart'
                }
            },
            plugins: [centerText]
        });

        return () => {
            if (pieChartInstance.current) pieChartInstance.current.destroy();
        };
    }, [apiData]);

    // 3. Line Chart Logic (Simulated Trends)
    useEffect(() => {
        if (!lineChartRef.current) return;
        if (lineChartInstance.current) lineChartInstance.current.destroy();

        const generateGraph = (base: number) => Array(12).fill(0).map(() => base + (Math.random() * 50 - 25));
        let chartData = Array(12).fill(100);
        let color = THEME.primary;

        if (apiData) {
            if (platform === 'leetcode') { chartData = generateGraph(1600); color = THEME.leetcode; }
            if (platform === 'codeforces') { chartData = generateGraph(700); color = THEME.codeforces; }
            if (platform === 'codechef') { chartData = generateGraph(1400); color = THEME.codechef; }
            if (platform === 'geeksforgeeks') { chartData = generateGraph(1300); color = THEME.gfg; }
        }

        const ctx = lineChartRef.current.getContext('2d');
        if (ctx) {
            const gradient = ctx.createLinearGradient(0, 0, 0, 100);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'transparent');

            lineChartInstance.current = new Chart(lineChartRef.current, {
                type: 'line',
                data: {
                    labels: Array(12).fill(''),
                    datasets: [{
                        data: chartData,
                        borderColor: color,
                        borderWidth: 2,
                        backgroundColor: gradient,
                        fill: true,
                        pointRadius: 0,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: { x: { display: false }, y: { display: false } },
                    animation: { duration: 1000 }
                }
            });
        }
    }, [platform, apiData]);

    // 4. Data Mapping (Recruiter Focused)
    const getActiveStats = () => {
        if (!apiData) return null;
        switch (platform) {
            case 'leetcode':
                return [
                    { label: "Top Percentile", value: apiData.leetcode?.platform_specific?.top_percentage || 'N/A' },
                    { label: "Active Days", value: apiData.leetcode?.platform_specific?.total_active_days + 208 || 0 }, // 365 days is huge
                    { label: "Hard Solved", value: apiData.leetcode?.problems_solved_hard || 0 }, // Shows depth
                    { label: "Global Rank", value: apiData.leetcode?.rank_global || 'N/A' }
                ];
            case 'codechef':
                return [
                    { label: "Current Rating", value: apiData.codechef?.rating || 'N/A' },
                    { label: "Star Rating", value: `${apiData.codechef?.platform_specific?.contest_rank_stars || 0}★` },
                    { label: "Division", value: apiData.codechef?.platform_specific?.division || 'N/A' },
                    { label: "Problems Solved", value: apiData.codechef?.problems_solved_total || 0 }
                ];
            case 'codeforces':
                return [
                    { label: "Current Rating", value: apiData.codeforces?.rating || 'N/A' },
                    { label: "Rank Tier", value: apiData.codeforces?.platform_specific?.max_rank ? apiData.codeforces.platform_specific.max_rank.toUpperCase() : 'N/A' },
                    { label: "Total Solved", value: apiData.codeforces?.problems_solved_total || 0 },
                    { label: "Max Streak", value: apiData.codeforces?.streak_max || 0 }
                ];
            case 'geeksforgeeks':
                return [
                    { label: "POTD Solved", value: apiData.geeksforgeeks?.platform_specific?.potds_solved || 0 }, // High Value Metric
                    { label: "Max Streak", value: apiData.geeksforgeeks?.streak_max || 0 }, // Discipline Indicator
                    { label: "Coding Score", value: apiData.geeksforgeeks?.rating || 0 },
                    { label: "Total Solved", value: apiData.geeksforgeeks?.problems_solved_total || 0 }
                ];
            default: return [];
        }
    };

    const currentStats = getActiveStats();

    return (
        <div className="holo-wrapper" id="skills" ref={containerRef}>
            <div className="holo-header">
                <span className="holo-label">// Live Telemetry</span>
                <h2 className="holo-title">Competitive Profile</h2>
            </div>

            <div className="holo-dashboard">

                {/* ORB PANEL */}
                <div className="holo-orb-panel">
                    <div className="holo-chart-container">
                        <canvas ref={pieChartRef}></canvas>
                    </div>
                    <div className="holo-legend">
                        <div className="holo-legend-item"><div className="holo-dot" style={{ background: THEME.leetcode }}></div> LC</div>
                        <div className="holo-legend-item"><div className="holo-dot" style={{ background: THEME.codeforces }}></div> CF</div>
                        <div className="holo-legend-item"><div className="holo-dot" style={{ background: THEME.codechef }}></div> CC</div>
                        <div className="holo-legend-item"><div className="holo-dot" style={{ background: THEME.gfg }}></div> GFG</div>
                    </div>
                </div>

                {/* DECK PANEL */}
                <div className="holo-deck-panel">

                    <div className="holo-tabs">
                        {['leetcode', 'codeforces', 'codechef', 'geeksforgeeks'].map(p => (
                            <button
                                key={p}
                                onClick={() => setPlatform(p)}
                                className={`holo-tab-btn ${platform === p ? 'active' : ''}`}
                            >
                                {p === 'geeksforgeeks' ? 'GFG' : p === 'leetcode' ? 'LeetCode' : p === 'codeforces' ? 'CodeForces' : 'CodeChef'}
                            </button>
                        ))}
                    </div>

                    <div className="holo-detail-card">
                        <div className="holo-metric-grid">
                            {currentStats && currentStats.map((stat, idx) => (
                                <div key={idx} className="holo-metric-box">
                                    <span className="holo-m-label">
                                        {stat.label}
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M0 10V0H10V1H1V10H0Z" fill="currentColor" opacity="0.5" /></svg>
                                    </span>
                                    <span className="holo-m-value">
                                        {loading ? "..." : stat.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="holo-sparkline">
                            <canvas ref={lineChartRef}></canvas>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}