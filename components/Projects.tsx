"use client";
import { useEffect, useState, useRef } from "react";

// --- Types ---
interface RepoData {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string;
  img: string;
  hosted: string; // The specific hosted link you requested
  languages: Record<string, number>;
  topLangPercent: { name: string; percent: number; color: string }[];
}

const LANG_COLORS: Record<string, string> = {
  Java: "#b07219",
  Python: "#3572A5",
  TypeScript: "#2b7489",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  "C++": "#f34b7d",
  C: "#555555",
};

export default function Projects() {
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.getElementsByClassName("spotlight-card");
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
      (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
    }
  };

  useEffect(() => {
    const fetchRepos = async () => {
      const username = "rohan3004";
      const repoMap: Record<string, string> = {
        "404-Page": "/assets/projects/p1.png",
        "Queen-s-Quest": "/assets/projects/p2.png",
        "DevOps-Showcase": "/assets/projects/p3.png",
        "Evaluator-System": "/assets/projects/p6.png",
        "Face-Frenzy": "/assets/projects/p4.png",
        "chessMind": "/assets/projects/p5.png",
      };

      try {
        const res = await fetch("https://apis.byrohan.in/v1/github/repositories");
        const data = await res.json();

        const filtered = data
          .filter((repo: any) => repoMap.hasOwnProperty(repo.name))
          .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);

        const processed = await Promise.all(filtered.map(async (repo: any) => {
          let langs = {};
          try {
            const langRes = await fetch(`https://apis.byrohan.in/v1/github/languages/${repo.name}`);
            langs = await langRes.json();
          } catch (e) { console.warn("Lang fetch failed", e); }

          const totalBytes = Object.values(langs).reduce((a: any, b: any) => a + b, 0) as number;
          const topLangPercent = Object.entries(langs)
            .map(([name, bytes]) => ({
              name,
              percent: Math.round(((bytes as number) / totalBytes) * 100),
              color: LANG_COLORS[name] || "#ccc"
            }))
            .sort((a, b) => b.percent - a.percent)
            .slice(0, 3);

          return {
            ...repo,
            img: repoMap[repo.name],
            languages: langs,
            topLangPercent,
            // Strictly using your original hosted link logic
            hosted: `https://${username}.github.io/${repo.name}`
          };
        }));

        setRepos(processed);
        setLoading(false);
      } catch (e) {
        console.error("Github error", e);
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  const timeAgo = (dateString: string) => {
    const days = Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24));
    return days < 7 ? `${days}d ago` : days < 30 ? `${Math.floor(days / 7)}w ago` : `${Math.floor(days / 30)}mo ago`;
  };

  return (
    <div className="projects-section">
      <div className="bg-grid-animate"></div>

      <section id="projects" style={{ position: 'relative', zIndex: 10 }}>

        {/* Header - Now neutral grey */}
        <div className="projects-header">
          <span className="sys-label">// System Architecture</span>
          <h1 className="deploy-title">
            Deployed <span className="highlight-text">Units</span>
          </h1>
        </div>

        {/* Grid Container */}
        <div
          className="repo-grid"
          ref={containerRef}
          onMouseMove={handleMouseMove}
        >
          {loading
            ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            : repos.map((repo) => (
              <div
                key={repo.id}
                className="spotlight-card"
                // --- CLICK LOGIC RESTORED ---
                // Opens the hosted link (Live Demo) in the same tab, exactly like before
                onClick={() => window.location.href = repo.hosted}
              >
                <div className="card-image-wrapper">
                  <img src={repo.img} alt={repo.name} className="card-img" />
                  <div className="img-overlay"></div>
                  <div className="live-badge">
                    <div className="live-dot"></div>
                    <span className="live-text">LIVE</span>
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-header">
                    <div>
                      <h3 className="repo-title">{repo.name}</h3>
                      <span className="update-time">UPDATED: {timeAgo(repo.updated_at)}</span>
                    </div>
                    {/* GitHub Icon Link - Opens repo in new tab, stops card click */}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: '#a0a0a0', zIndex: 20 }}
                    >
                      <i className="fa-brands fa-github" style={{ fontSize: '1.5rem' }}></i>
                    </a>
                  </div>

                  <p className="repo-desc">
                    {repo.description || "System architecture details unavailable."}
                  </p>

                  <div className="lang-distribution">
                    <div className="lang-header">
                      <span>Code Composition</span>
                      <span>{repo.language || "Unknown"}</span>
                    </div>

                    <div className="progress-bar">
                      {repo.topLangPercent.map((lang, idx) => (
                        <div
                          key={idx}
                          className="progress-segment"
                          style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
                          title={`${lang.name}: ${lang.percent}%`}
                        ></div>
                      ))}
                    </div>

                    <div className="lang-legend">
                      {repo.topLangPercent.map((lang, idx) => (
                        <div key={idx} className="legend-item">
                          <div className="color-dot" style={{ backgroundColor: lang.color }}></div>
                          <span className="legend-text">{lang.name} {lang.percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card-footer">
                    <span><i className="fa-solid fa-code-branch"></i> {repo.forks_count} Forks</span>
                    <span style={{ color: '#FFD60A' }}><i className="fa-solid fa-star"></i> {repo.stargazers_count} Stars</span>
                  </div>

                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-shimmer"></div>
      <div className="sk-img w-full"></div>
      <div className="sk-line w-80"></div>
      <div className="sk-line w-50"></div>
      <div className="sk-line w-full" style={{ marginTop: '2rem' }}></div>
    </div>
  );
}