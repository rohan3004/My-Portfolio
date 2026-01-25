"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SKILL_MODULES = [
  {
    title: "Distributed Systems",
    icon: (
      <svg className="flux-icon-svg" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
    ),
    desc: "Architecting highly available microservices using Event-Driven Architecture and ACID compliant databases.",
    skills: ["Microservices", "REST APIs", "PostgreSQL", "Redis", "System Design"]
  },
  {
    title: "Cloud Native Infra",
    icon: (
      <svg className="flux-icon-svg" viewBox="0 0 24 24"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>
    ),
    desc: "Deploying auto-scaling infrastructure on AWS & GCP using container orchestration and IaC principles.",
    skills: ["AWS EC2", "Docker", "Terraform", "GitHub Actions", "CloudFront", "CDN"]
  },
  {
    title: "Algorithm Engineering",
    icon: (
      <svg className="flux-icon-svg" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
    ),
    desc: "Implementing high-performance algorithms with a focus on memory safety, concurrency, and time complexity.",
    skills: ["Java", "Python", "Data Structures", "Algorithms", "LeetCode"]
  },
  {
    title: "DevOps & SRE",
    icon: (
      <svg className="flux-icon-svg" viewBox="0 0 24 24"><path d="M12 12c-2-2.5-5-2.5-7 0s-2.5 5 0 7 2.5 5 7 0c2 2.5 5 2.5 7 0s2.5-5 0-7-2.5-5-7 0z"></path></svg>
    ),
    desc: "Streamlining CI/CD pipelines and automating deployment workflows to ensure 99.9% uptime and reliability.",
    skills: ["CI/CD", "GitHub Actions", "Docker", "Linux", "Bash"]
  },
  {
    title: "Full Stack Engineering",
    icon: (
      <svg className="flux-icon-svg" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
    ),
    desc: "Building responsive, SSR-optimized web applications with modern component-based frameworks.",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind"]
  },
  {
    title: "API Development",
    icon: (
      <svg className="flux-icon-svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"></path></svg>
    ),
    desc: "Designing secure, documented RESTful and GraphQL APIs with robust authentication and rate limiting.",
    skills: ["REST APIs", "Spring Boot", "Postman", "JWT Auth", "MySQL"]
  }
];


export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Mouse Tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    const cards = gridRef.current.getElementsByClassName("flux-card");
    for (const card of cards as any) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".flux-header", {
        scrollTrigger: { trigger: ".flux-header", start: "top 80%" },
        y: 40, opacity: 0, duration: 1, ease: "power3.out"
      });

      gsap.from(".flux-card", {
        scrollTrigger: { trigger: ".flux-grid", start: "top 85%" },
        y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="flux-wrapper" ref={containerRef}>

      <div className="flux-header">
        <span className="flux-label">// Core Competencies</span>
        <h2 className="flux-title">Technical Expertise</h2>
      </div>

      <div
        className="flux-grid"
        ref={gridRef}
        onMouseMove={handleMouseMove}
      >
        {SKILL_MODULES.map((mod, index) => (
          <div key={index} className="flux-card">
            <div className="flux-inner">
              <div className="flux-icon-box">
                {mod.icon}
              </div>
              <div>
                <h3 className="flux-card-title">{mod.title}</h3>
                <p className="flux-desc">{mod.desc}</p>
              </div>
              <div className="flux-tags">
                {mod.skills.map((skill, sIndex) => (
                  <span key={sIndex} className="flux-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}