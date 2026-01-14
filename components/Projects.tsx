"use client";
import { useEffect, useState } from "react";

export default function Projects() {
  const [repos, setRepos] = useState<any[]>([]);

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
        const filtered = data.filter((repo: any) => repoMap.hasOwnProperty(repo.name));
        
        const processed = await Promise.all(filtered.map(async (repo: any) => {
            const langRes = await fetch(`https://apis.byrohan.in/v1/github/languages/${repo.name}`);
            const langs = await langRes.json();
            return {
                ...repo,
                img: repoMap[repo.name],
                langs: Object.keys(langs).join(", "),
                hosted: `https://${username}.github.io/${repo.name}`
            };
        }));
        setRepos(processed);
      } catch (e) {
        console.error("Github error", e);
      }
    };
    fetchRepos();
  }, []);

  return (
    <div className="projectBG">
      <section id="projects">
        <p className="section__text__p1" style={{ color: "#faf9f6" }}>Browse My Recent</p>
        <h1 className="title" style={{ color: "white" }}>Projects</h1>
        <div className="experience-details-container">
          <div id="repo-container">
            {repos.map(repo => (
                <div className="repo-card" key={repo.id}>
                    <div className="article-container" onClick={() => window.location.href = repo.hosted}>
                        <img src={repo.img} alt={repo.name} loading="lazy" />
                        <div className="repo-content">
                            <h3>
                                <a href={repo.html_url} target="_blank">{repo.name}</a>
                                <span className="stars"><i className="fa-solid fa-star" style={{color:'yellow'}}></i> {repo.stargazers_count}</span>
                            </h3>
                            <div className="repo-stats">
                                <div className="language">{repo.langs || "N/A"}</div>
                            </div>
                            <p>{repo.description || "No description provided."}</p>
                        </div>
                    </div>
                </div>
            ))}
          </div>
        </div>
        <img src="/assets/arrow.svg" alt="Arrow" className="icon arrow" onClick={() => location.href = './#experience'} />
      </section>
    </div>
  );
}