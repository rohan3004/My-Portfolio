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
  const chartInstance = useRef<Chart | null>(null);
  const [platform, setPlatform] = useState("leetcode");
  const [summary, setSummary] = useState("");
  const [apiData, setApiData] = useState<any>(null);

  // Fetch Data
  useEffect(() => {
    // Using the production URL to ensure it works, change to localhost if debugging locally
    fetch('http://localhost:8443/v1/reports/rohan.chakravarty02@gmail.com')
      .then(res => res.json())
      .then(data => setApiData(data))
      .catch(err => console.error("Stats fetch error:", err));
  }, []);

  // Pie Chart Effect
  useEffect(() => {
    if (!apiData || !pieChartRef.current) return;
    
    const dataValues = [
      apiData.codechef?.problems_solved_total || 0,
      apiData.codeforces?.problems_solved_total || 0,
      apiData.leetcode?.problems_solved_easy || 0,
      apiData.leetcode?.problems_solved_medium || 0,
      apiData.leetcode?.problems_solved_hard || 0,
      apiData.geeksforgeeks?.problems_solved_total || 0
    ];

    const centerTextPlugin = {
      id: 'centerText',
      beforeDraw: function(chart: any) {
        const { ctx } = chart;
        ctx.restore();
        const total = chart.config.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
        const meta = chart.getDatasetMeta(0);
        if (!meta.data[0]) return;
        
        const innerRadius = meta.data[0].innerRadius;
        const centerX = meta.data[0].x;
        const centerY = meta.data[0].y;

        ctx.font = `bold ${(innerRadius * 0.6).toFixed(2)}px Poppins`;
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

    const chart = new Chart(pieChartRef.current, {
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

    return () => chart.destroy();
  }, [apiData]);

  // Line Chart Effect
  useEffect(() => {
    if (!apiData || !lineChartRef.current) return;

    let trend: { labels: string[], data: number[] } = { labels: [], data: [] };
    let html = "";
    
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

    if (chartInstance.current) chartInstance.current.destroy();

    const ctx = lineChartRef.current.getContext('2d');
    if(ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, COLORS.lineFillTop);
      gradient.addColorStop(1, COLORS.lineFillBottom);

      chartInstance.current = new Chart(lineChartRef.current, {
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
            maintainAspectRatio: true, 
            aspectRatio: 2,
            plugins: { legend: { display: false } },
            scales: {
                x: { display: false },
                y: { border: { display: false }, grid: { color: COLORS.grid, borderDash: [5, 5] }, ticks: { color: COLORS.textDim } }
            }
        }
      });
    }

  }, [platform, apiData]);

  return (
    <section id="about">
      <p className="section__text__p1">Get To Know My Statistics</p>
      <h1 className="title">Fundamentals</h1>
      <div className="section-container">
        {/* Pie Chart Container - Inline style copied exactly from HTML to ensure centering */}
        <div 
          className="section__pic-container" 
          style={{ 
            position: 'relative', 
            width: '100%', 
            maxWidth: '800px', 
            margin: 'auto', 
            height: '500px' 
          }}
        >
          <canvas ref={pieChartRef}></canvas>
        </div>

        <div className="about-details-container">
          {/* Line Chart & Controls */}
          <div className="about-containers chart-container">
            <div>
              <form>
                {['leetcode', 'codechef', 'codeforces', 'geeksforgeeks'].map(p => (
                   <label key={p}>
                    <input 
                      type="radio" 
                      name="platform" 
                      value={p} 
                      checked={platform === p} 
                      onChange={(e) => setPlatform(e.target.value)} 
                    />
                    <span style={{textTransform: 'capitalize'}}>
                        {p === 'geeksforgeeks' ? 'GeeksforGeeks' : 
                         p === 'leetcode' ? 'LeetCode' : 
                         p === 'codechef' ? 'CodeChef' : 'Codeforces'}
                    </span>
                  </label> 
                ))}
              </form>
            </div>
            <canvas ref={lineChartRef}></canvas>
          </div>

          {/* Text Container with FULL details from HTML */}
          <div className="text-container">
            <p>
              I’m a developer with hands-on experience in <span className="highlight">Java</span>, <span className="highlight">C/C++</span>, <span className="highlight">Python</span>, <span className="highlight">JavaScript</span>, and <span className="highlight">SQL</span>. I build robust, scalable solutions using <span className="highlight">Spring Boot</span>, <span className="highlight">RESTful APIs</span>, and modern frontend tools like <span className="highlight">Tailwind CSS</span> and <span className="highlight">Sass</span>. Skilled in cloud platforms like <span className="highlight">AWS</span> and <span className="highlight">GCP</span>, I also bring expertise in <span className="highlight">Docker</span>, <span className="highlight">Terraform</span>, and working across <span className="highlight">Linux</span> and <span className="highlight">Windows</span> environments. I'm passionate about <span className="highlight">clean code</span>, <span className="highlight">system design</span>, and solving <span className="highlight">real-world problems</span>.
              <span id="platform-summary" style={{ marginLeft: "5px" }} dangerouslySetInnerHTML={{ __html: summary }}></span>
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