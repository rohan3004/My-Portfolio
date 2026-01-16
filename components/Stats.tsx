"use client";
import {useEffect, useRef, useState} from "react";
import Chart from "chart.js/auto";

const THEME = {
    primary: '#b16f59', // Rose Copper
    text: '#e0e0e0',
    textDim: '#7a7a7a',
    grid: 'rgba(255, 255, 255, 0.03)',
    leetcode: '#FFA116',
    codechef: '#b16f59',
    codeforces: '#1F8ACB',
    gfg: '#2F8D46',
};

// Typewriter Component for the "Sci-Fi" text effect
const Typewriter = ({text}: { text: string }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        setDisplayedText(""); // Reset
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText((prev) => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 20); // Typing Speed
        return () => clearInterval(timer);
    }, [text]);

    return (
        <span dangerouslySetInnerHTML={{__html: displayedText}}></span>
    );
};

export default function Stats() {
    const lineChartRef = useRef<HTMLCanvasElement>(null);
    const pieChartRef = useRef<HTMLCanvasElement>(null);
    const lineChartInstance = useRef<Chart | null>(null);
    const pieChartInstance = useRef<Chart | null>(null);

    const [platform, setPlatform] = useState("leetcode");
    const [logMessage, setLogMessage] = useState("Initializing System...");
    const [apiData, setApiData] = useState<any>(null);

    // 1. Fetch Data
    useEffect(() => {
        fetch('https://apis.byrohan.in/v1/reports/rohan.chakravarty02@gmail.com')
            .then(res => res.json())
            .then(data => {
                setApiData(data);
                // Set initial message
                if (data.leetcode) {
                    setLogMessage(`>> ACCESSING LEETCODE MAINFRAME...<br/>>> USER RANK: TOP <span class="sys-highlight">${data.leetcode.platform_specific?.top_percentage}%</span><br/>>> SOLVED: <span class="sys-highlight">${data.leetcode.problems_solved_total}</span> UNITS<br/>>> STATUS: ONLINE`);
                }
            })
            .catch(() => setLogMessage(">> ERROR: CONNECTION FAILED. RETRYING..."));
    }, []);

    // 2. Pie Chart
    useEffect(() => {
        if (!pieChartRef.current) return;
        if (pieChartInstance.current) pieChartInstance.current.destroy();

        const dataValues = apiData ? [
            apiData.leetcode?.problems_solved_total || 0,
            apiData.codeforces?.problems_solved_total || 0,
            apiData.codechef?.problems_solved_total || 0,
            apiData.geeksforgeeks?.problems_solved_total || 0
        ] : [1, 1, 1, 1];

        const total = dataValues.reduce((a: number, b: number) => a + b, 0);

        // Holographic Center Text
        const centerPlugin = {
            id: 'centerText',
            beforeDraw: function (chart: any) {
                const {ctx, width, height} = chart;
                ctx.restore();
                ctx.fillStyle = THEME.primary;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(total, width / 2, height / 2 - 10);
                ctx.fillStyle = THEME.textDim;
                ctx.fillText("SOLVED", width / 2, height / 2 + 20);
                ctx.save();
            }
        };

        pieChartInstance.current = new Chart(pieChartRef.current, {
            type: 'doughnut',
            data: {
                labels: ['LC', 'CF', 'CC', 'GFG'],
                datasets: [{
                    data: dataValues,
                    backgroundColor: [THEME.leetcode, THEME.codeforces, THEME.primary, THEME.gfg],
                    borderWidth: 0,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '85%',
                plugins: {legend: {display: false}} // Hide default legend for cleaner look
            },
            plugins: [centerPlugin]
        });

        return () => {
            if (pieChartInstance.current) pieChartInstance.current.destroy();
        };
    }, [apiData]);

    // 3. Line Chart & Text Update Logic
    useEffect(() => {
        if (!lineChartRef.current) return;
        if (lineChartInstance.current) lineChartInstance.current.destroy();

        // -- Update Text based on Platform --
        if (apiData) {
            let msg = "";
            if (platform === 'leetcode' && apiData.leetcode) {
                msg = `>> TARGET: LEETCODE<br/>>> RATING: <span class="sys-highlight">${apiData.leetcode.rating || 'N/A'}</span><br/>>> CONTESTS ATTENDED: <span class="sys-highlight">${apiData.leetcode.contests_attended || 0}</span><br/>>> GLOBAL RANKING: OPTIMIZED`;
            } else if (platform === 'codeforces' && apiData.codeforces) {
                msg = `>> TARGET: CODEFORCES<br/>>> MAX RATING: <span class="sys-highlight">${apiData.codeforces.rating_max || 'N/A'}</span><br/>>> CURRENT RANK: <span class="sys-highlight">${apiData.codeforces.rank || 'Unrated'}</span><br/>>> PROTOCOL: COMPETITIVE`;
            } else if (platform === 'codechef' && apiData.codechef) {
                msg = `>> TARGET: CODECHEF<br/>>> STAR RATING: <span class="sys-highlight">${apiData.codechef.platform_specific?.contest_rank_stars || 0}★</span><br/>>> CURRENT RATING: <span class="sys-highlight">${apiData.codechef.rating || 0}</span><br/>>> DEPLOYMENT: ACTIVE`;
            } else if (platform === 'geeksforgeeks') {
                msg = `>> TARGET: GFG<br/>>> STREAK INTEGRITY: <span class="sys-highlight">${apiData.geeksforgeeks?.streak_current || 0} DAYS</span><br/>>> TOTAL SOLVED: <span class="sys-highlight">${apiData.geeksforgeeks?.problems_solved_total || 0}</span><br/>>> CONSISTENCY: 100%`;
            }
            setLogMessage(msg);
        }

        // -- Generate Sci-Fi Chart Data --
        const generateNoise = (base: number) => Array(8).fill(0).map((_, i) => i === 7 ? base : base - Math.random() * 100);
        let chartData = Array(8).fill(0);
        let color = THEME.primary;

        if (apiData) {
            if (platform === 'leetcode') {
                chartData = generateNoise(apiData.leetcode?.rating || 1500);
                color = THEME.leetcode;
            }
            if (platform === 'codeforces') {
                chartData = generateNoise(apiData.codeforces?.rating || 800);
                color = THEME.codeforces;
            }
            if (platform === 'codechef') {
                chartData = generateNoise(apiData.codechef?.rating || 1000);
                color = THEME.primary;
            }
            if (platform === 'geeksforgeeks') {
                chartData = generateNoise(apiData.geeksforgeeks?.problems_solved_total || 500);
                color = THEME.gfg;
            }
        }

        const ctx = lineChartRef.current.getContext('2d');
        if (ctx) {
            const gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, 'transparent');

            lineChartInstance.current = new Chart(lineChartRef.current, {
                type: 'line',
                data: {
                    labels: ['', '', '', '', '', '', '', ''],
                    datasets: [{
                        data: chartData,
                        borderColor: color,
                        backgroundColor: gradient,
                        borderWidth: 2,
                        pointRadius: 3,
                        pointBackgroundColor: '#000',
                        pointBorderColor: color,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {legend: {display: false}},
                    scales: {
                        x: {display: false},
                        y: {display: false} // Hide Y axis for cleaner look
                    }
                }
            });
        }

        return () => {
            if (lineChartInstance.current) lineChartInstance.current.destroy();
        };
    }, [platform, apiData]);

    return (
        <section id="about" style={{position: 'relative', zIndex: 2}}>
            <p className="section__text__p1">System Analytics</p>
            <h1 className="title">Fundamentals</h1>

            <div className="bento-grid">

                {/* LEFT: DONUT VISUALIZER */}
                <div className="sci-card" style={{minHeight: '350px'}}>
                    <div className="hud-header">
                        <div className="hud-title"><i className="fa-solid fa-circle-nodes"></i> PLATFORM WISE</div>
                        <div style={{fontSize: '0.7rem', color: THEME.textDim}}>v2.4.0</div>
                    </div>
                    <div style={{flex: 1, position: 'relative'}}>
                        <canvas ref={pieChartRef}></canvas>
                    </div>
                    {/* Custom Legend */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '15px',
                        marginTop: '10px',
                        fontSize: '0.75rem',
                        color: THEME.textDim
                    }}>
                        <span style={{color: THEME.leetcode}}>● LC</span>
                        <span style={{color: THEME.codeforces}}>● CF</span>
                        <span style={{color: THEME.primary}}>● CC</span>
                        <span style={{color: THEME.gfg}}>● GFG</span>
                    </div>
                </div>

                {/* RIGHT: COMMAND DECK */}
                <div className="sci-card">
                    <div className="hud-header" style={{flexWrap: 'wrap', gap: '10px'}}>
                        <div className="hud-title"><i className="fa-solid fa-wave-square"></i> SUMMARY</div>

                        {/* Sci-Fi Tabs */}
                        <div className="cyber-tabs">
                            {['leetcode', 'codechef', 'codeforces', 'geeksforgeeks'].map(p => (
                                <button
                                    key={p}
                                    onClick={() => setPlatform(p)}
                                    className={`cyber-tab-btn ${platform === p ? 'active' : ''}`}
                                >
                                    {p === 'geeksforgeeks' ? 'GFG' : p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* CHART VIEWPORT */}
                    <div style={{
                        width: '100%',
                        height: '180px',
                        marginBottom: '20px',
                        borderBottom: '1px solid rgba(255,255,255,0.05)'
                    }}>
                        <canvas ref={lineChartRef}></canvas>
                    </div>

                    {/* TERMINAL LOG (Responsive Text Area) */}
                    <div className="hud-title" style={{marginBottom: '5px', fontSize: '0.75rem'}}>KEY_METRICS //</div>
                    <div className="terminal-box">
                        <Typewriter text={logMessage}/>
                        <span className="terminal-cursor"></span>
                    </div>
                </div>
            </div>

            {/* Decorative arrow */}
            <img src="/assets/arrow.svg" alt="Next" className="icon arrow"
                 onClick={() => location.href = './#company'}/>
        </section>
    );
}