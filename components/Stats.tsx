"use client";
import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const COLORS = {
  lineBorder: '#a9b0f9',
  lineFillTop: 'rgba(169, 176, 249, 0.3)',
  lineFillBottom: 'rgba(169, 176, 249, 0.0)',
  text: '#f2e3ee',
  textDim: 'rgba(242, 227, 238, 0.6)',
  grid: 'rgba(242, 227, 238, 0.1)',
  pie: {
    codechef: '#F29F05', codeforces: '#4DB6AC',
    easy: '#673AB7', medium: '#E91E63', hard: '#2196F3', gfg: '#FF5722'
  }
};

export default function Stats() {
  const lineChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const lineChartInstance = useRef<Chart | null>(null);
  const pieChartInstance = useRef<Chart | null>(null);
  
  const [platform, setPlatform] = useState("leetcode");
  const [summary, setSummary] = useState("Loading stats...");
  const [apiData, setApiData] = useState<any>(null);

  // 1. Fetch Data
  useEffect(() => {
    fetch('https://apis.byrohan.in/v1/reports/rohan.chakravarty02@gmail.com')
      .then(res => res.json())
      .then(data => setApiData(data))
      .catch(err => {
        console.error("Stats fetch error:", err);
        setSummary("Failed to load statistics.");
      });
  }, []);

  // 2. Pie Chart Logic
  useEffect(() => {
    if (!pieChartRef.current) return;
    
    if (pieChartInstance.current) {
        pieChartInstance.current.destroy();
    }

    const dataValues = apiData ? [
      apiData.codechef?.problems_solved_total || 0,
      apiData.codeforces?.problems_solved_total || 0,
      apiData.leetcode?.problems_solved_easy || 0,
      apiData.leetcode?.problems_solved_medium || 0,
      apiData.leetcode?.problems_solved_hard || 0,
      apiData.geeksforgeeks?.problems_solved_total || 0
    ] : [1, 1, 1, 1, 1, 1]; 

    const centerTextPlugin = {
      id: 'centerText',
      beforeDraw: function(chart: any) {
        const { ctx } = chart;
        ctx.restore();
        const total = apiData ? chart.config.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0) : "...";
        const meta = chart.getDatasetMeta(0);
        if (!meta.data[0]) return;
        
        const innerRadius = meta.data[0].innerRadius;
        const centerX = meta.data[0].x;
        const centerY = meta.data[0].y;

        ctx.font = `bold ${(innerRadius * 0.5).toFixed(2)}px Poppins`;
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = COLORS.text;
        ctx.fillText(total, centerX, centerY - (innerRadius * 0.15));

        ctx.font = `500 ${(innerRadius * 0.2).toFixed(2)}px Poppins`;
        ctx.fillStyle = COLORS.textDim;
        ctx.fillText("Solved", centerX, centerY + (innerRadius * 0.25));
        ctx.save();
      }
    };

    pieChartInstance.current = new Chart(pieChartRef.current, {
      type: 'doughnut',
      data: {
        labels: ['CodeChef', 'Codeforces', 'LC Easy', 'LC Medium', 'LC Hard', 'GFG'],
        datasets: [{
          data: dataValues,
          backgroundColor: [COLORS.pie.codechef, COLORS.pie.codeforces, COLORS.pie.easy, COLORS.pie.medium, COLORS.pie.hard, COLORS.pie.gfg],
          borderWidth: 0,
          offset: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        cutout: '75%',
        layout: { padding: 20 },
        plugins: {
          legend: { display: true, position: 'bottom', labels: { color: COLORS.text, font: { family: 'Poppins', size: 11 }, usePointStyle: true, boxWidth: 8 } },
        }
      },
      plugins: [centerTextPlugin]
    });

    return () => {
        if(pieChartInstance.current) pieChartInstance.current.destroy();
    };
  }, [apiData]);

  // 3. Line Chart Logic
  useEffect(() => {
    if (!lineChartRef.current) return;
    if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
    }

    let trend: { labels: string[], data: number[] } = { 
        labels: Array(10).fill(''), 
        data: Array(10).fill(0) 
    };
    
    let html = `I have participated in <span class="highlight">...</span> LeetCode events.`;

    const generateSimulatedTrend = (plat: string, current: number, max: number, pointsCount: number) => {
      const data = [];
      const labels = [];
      const safeCurrent = current || 0;
      const safeMax = max || safeCurrent;
      const startRating = plat === 'LeetCode' ? 1500 : 0;
      for (let i = 0; i < pointsCount; i++) {
        let val;
        if (i === 0) val = startRating;
        else if (i === pointsCount - 1) val = safeCurrent;
        else if (i === Math.floor(pointsCount / 2)) val = safeMax;
        else {
           const mid = Math.floor(pointsCount / 2);
           let target = i < mid ? startRating + (safeMax - startRating) * (i / mid) : safeMax + (safeCurrent - safeMax) * ((i - mid) / mid);
           val = Math.floor(target + (Math.random() - 0.5) * (plat === 'LeetCode' ? 40 : 20));
        }
        data.push(Math.max(0, val));
        labels.push('');
      }
      return { labels, data };
    };

    if (apiData) {
        if (platform === 'leetcode' && apiData.leetcode) {
            const d = apiData.leetcode;
            trend = generateSimulatedTrend('LeetCode', d.rating, d.rating, 12);
            html = `I have participated in <span class="highlight">${d.contests_attended}</span> LeetCode events. Rating: <span class="highlight">${d.rating}</span>.`;
        } else if (platform === 'codeforces' && apiData.codeforces) {
            const d = apiData.codeforces;
            trend = generateSimulatedTrend('Codeforces', d.rating, d.rating_max, 10);
            html = `Codeforces Rating: <span class="highlight">${d.rating}</span> (Max: <span class="highlight">${d.rating_max}</span>).`;
        } else if (platform === 'codechef' && apiData.codechef) {
            const d = apiData.codechef;
            trend = generateSimulatedTrend('CodeChef', d.rating, d.rating, 8);
            html = `CodeChef Rating: <span class="highlight">${d.rating}</span>.`;
        } else if (platform === 'geeksforgeeks' && apiData.geeksforgeeks) {
            const d = apiData.geeksforgeeks;
            const score = d.problems_solved_total || 0;
            trend = generateSimulatedTrend('GFG', score, score, 15);
            html = `Solved <span class="highlight">${score}</span> problems on GFG. Streak: <span class="highlight">${d.streak_current}</span>.`;
        }
        setSummary(html);
    }

    const ctx = lineChartRef.current.getContext('2d');
    if(ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, COLORS.lineFillTop);
      gradient.addColorStop(1, COLORS.lineFillBottom);

      lineChartInstance.current = new Chart(lineChartRef.current, {
        type: 'line',
        data: {
            labels: trend.labels,
            datasets: [{
                label: 'Ratings',
                data: trend.data,
                borderColor: COLORS.lineBorder,
                backgroundColor: gradient,
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6,
                pointBackgroundColor: COLORS.lineBorder,
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { 
                  border: { display: false }, 
                  grid: { color: COLORS.grid, borderDash: [5, 5] } as any, 
                  ticks: { color: COLORS.textDim } 
                }
            }
        }
      });
    }

    return () => {
        if(lineChartInstance.current) lineChartInstance.current.destroy();
    };

  }, [platform, apiData]);

  return (
    <section id="about">
      <p className="section__text__p1">Get To Know My Statistics</p>
      <h1 className="title">Fundamentals</h1>
      <div className="section-container">
        
        {/* PIE CHART WRAPPER: Constrained Dimensions */}
        <div 
          className="section__pic-container" 
          style={{ 
            position: 'relative', 
            width: '100%', 
            maxWidth: '500px', 
            height: '400px', 
            margin: 'auto' 
          }}
        >
          <canvas ref={pieChartRef} style={{ width: '100%', height: '100%' }}></canvas>
        </div>

        <div className="about-details-container">
          
          {/* LINE CHART CONTAINER */}
          <div className="about-containers chart-container" style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
            
            {/* Radio Buttons */}
            <div style={{ marginBottom: '1rem', width: '100%' }}>
              <form style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {['leetcode', 'codechef', 'codeforces', 'geeksforgeeks'].map(p => (
                   <label key={p}>
                    <input 
                      type="radio" 
                      name="platform" 
                      value={p} 
                      checked={platform === p} 
                      onChange={(e) => setPlatform(e.target.value)} 
                    />
                    <span style={{textTransform: 'capitalize', fontSize: '0.9rem'}}>
                        {p === 'geeksforgeeks' ? 'GFG' : 
                         p === 'leetcode' ? 'LeetCode' : 
                         p === 'codechef' ? 'CodeChef' : 'Codeforces'}
                    </span>
                  </label> 
                ))}
              </form>
            </div>

            {/* LINE CHART WRAPPER */}
            <div style={{ position: 'relative', width: '100%', height: '300px' }}>
                <canvas ref={lineChartRef} style={{ width: '100%', height: '100%' }}></canvas>
            </div>

          </div>

          <div className="text-container">
            <p>
              I’m a developer with hands-on experience in <span className="highlight">Java</span>, <span className="highlight">C/C++</span>, <span className="highlight">Python</span>, <span className="highlight">JavaScript</span>, and <span className="highlight">SQL</span>. I build robust, scalable solutions using <span className="highlight">Spring Boot</span>, <span className="highlight">RESTful APIs</span>, and modern frontend tools like <span className="highlight">Tailwind CSS</span> and <span className="highlight">Sass</span>. Skilled in cloud platforms like <span className="highlight">AWS</span> and <span className="highlight">GCP</span>, I also bring expertise in <span className="highlight">Docker</span>, <span className="highlight">Terraform</span>, and working across <span className="highlight">Linux</span> and <span className="highlight">Windows</span> environments. I'm passionate about <span className="highlight">clean code</span>, <span className="highlight">system design</span>, and solving <span className="highlight">real-world problems</span>.
              <br/>
              <span id="platform-summary" dangerouslySetInnerHTML={{ __html: summary }}></span>
            </p>
          </div>
        </div>
      </div>
      <img 
        src="/assets/arrow.svg" 
        alt="Arrow icon" 
        className="icon arrow" 
        onClick={() => location.href = './#company'} 
      />
    </section>
  );
}