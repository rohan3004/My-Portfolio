"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP
gsap.registerPlugin(ScrollTrigger);

// --- DATA SOURCE (Easily Add More) ---
const EXPERIENCE_DATA = [
  {
    role: "Software Engineer Intern",
    company: "Nielsen",
    location: "Bengaluru, India",
    date: "Mar 2025 - Present",
    description: "Building scalable microservices and distributed systems. Collaborating with cross-functional teams to optimize metadata pipelines and enhance data acquisition strategies using modern DevOps methodologies.",
    skills: ["Java", "Spring Boot", "Microservices", "AWS", "Kafka", "PostgreSQL"]
  },
  // Example of a second node to show the timeline effect
  {
    role: "Full Stack Developer",
    company: "Freelance / Projects",
    location: "Remote",
    date: "2023 - 2025",
    description: "Developed and deployed multiple full-stack applications. Specialized in creating high-performance web interfaces and secure backend architectures for diverse client needs.",
    skills: ["React", "Next.js", "Node.js", "Docker", "MongoDB"]
  }
];

export default function Experience() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Header Animation
      gsap.from(".chrono-header", {
        scrollTrigger: {
          trigger: ".chrono-header",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      // 2. Trace Line Draws Down
      gsap.from(".chrono-trace-line", {
        scrollTrigger: {
          trigger: ".chrono-system",
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1, // Links animation to scroll speed
        },
        scaleY: 0,
        transformOrigin: "top",
        ease: "none"
      });

      // 3. Cards Slide In
      const nodes = gsap.utils.toArray(".chrono-node");
      nodes.forEach((node: any) => {
        gsap.from(node, {
          scrollTrigger: {
            trigger: node,
            start: "top 85%",
          },
          x: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      });

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="chrono-wrapper" ref={wrapperRef}>
      
      {/* HEADER */}
      <div className="chrono-header">
        <span className="chrono-label">// Journey Log</span>
        <h2 className="chrono-title">Professional<br/>Milestones</h2>
      </div>

      {/* TIMELINE SYSTEM */}
      <div className="chrono-system">
        
        {/* The glowing line connecting everything */}
        <div className="chrono-trace-line"></div>

        {/* LOOP THROUGH DATA */}
        {EXPERIENCE_DATA.map((item, index) => (
          <div key={index} className="chrono-node">
            
            {/* Left: The Glowing Orb */}
            <div className="chrono-orb-container">
              <div className="chrono-orb"></div>
            </div>

            {/* Right: The Content Card */}
            <div className="chrono-card">
              
              <div className="chrono-meta">
                <div>
                  <h3 className="chrono-role">{item.role}</h3>
                  <span className="chrono-company">@ {item.company}</span>
                </div>
                <div className="chrono-date">
                  {item.date}
                </div>
              </div>

              <p className="chrono-desc">
                {item.description}
              </p>

              <div className="chrono-stack">
                {item.skills.map((skill, sIndex) => (
                  <span key={sIndex} className="chrono-chip">
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Decorative Navigation Arrow */}
      <div style={{textAlign: 'center', marginTop: '3rem', opacity: 0.5, cursor: 'pointer'}}>
         <img 
            src="/assets/arrow.svg" 
            alt="Next" 
            style={{width: '30px', filter: 'invert(1)'}}
            onClick={() => location.href = '#projects'}
         />
      </div>

    </section>
  );
}