"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface StatsData {
  q: number;
  badges: number;
  sub: number;
  streak: number;
  stars: number;
  loaded: boolean; 
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [weather, setWeather] = useState<any>(null);
  const [stats, setStats] = useState<StatsData>({ 
    q: 0, badges: 0, sub: 0, streak: 0, stars: 2, loaded: false 
  });

  useEffect(() => {
    // 1. Video Logic
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

    // 2. Weather
    const fetchWeather = async () => {
      try {
        const ipRes = await fetch("https://apis.byrohan.in/v1/your_ip");
        const ipData = await ipRes.json();
        const city = ipData?.cityNames?.en || "Bengaluru";
        const wRes = await fetch(`https://api.weatherapi.com/v1/current.json?key=fc9c2d13772441e9b72191328240604&q=${city}`);
        const wData = await wRes.json();
        setWeather({ city, ...wData });
      } catch (e) {
        setWeather({ city: "Unknown", current: { temp_c: "--", condition: { text: "Offline", icon: "" } } });
      }
    };

    // 3. Stats
    const fetchStats = async () => {
      try {
        const res = await fetch('https://apis.byrohan.in/v1/reports/rohan.chakravarty02@gmail.com');
        const data = await res.json();
        const totalQ = (data.codechef?.problems_solved_total || 0) + (data.codeforces?.problems_solved_total || 0) + (data.geeksforgeeks?.problems_solved_total || 0) + (data.leetcode?.problems_solved_total || 0);
        setStats({
          q: totalQ,
          badges: data.leetcode?.platform_specific?.badges || 0,
          sub: data.leetcode?.platform_specific?.top_percentage || 0,
          streak: data.leetcode?.streak_max || 0,
          stars: data.codechef?.platform_specific?.contest_rank_stars || 2,
          loaded: true
        });
      } catch (e) {
        setStats(prev => ({ ...prev, loaded: true }));
      }
    };

    fetchWeather();
    fetchStats();
  }, []);

  return (
    <div className="homeSection">
      <div className="video-background">
        <video ref={videoRef} id="player" autoPlay muted loop playsInline></video>
      </div>

      <section id="profile">
        <div id="boxes">
          <div className="apple-card">
            
            {/* Header */}
            <div className="ac-header">
              <img src="/assets/Rohan Chakravarty.webp" alt="Rohan" className="ac-avatar" />
              <div className="ac-profile">
                <h2>Hello, World!</h2>
                <div className="ac-badges">
                  {stats.loaded ? (
                    <>
                      <div className="ac-pill rank"><i className="fa-solid fa-chart-line"></i> Top {stats.sub}%</div>
                      <div className="ac-pill fire"><i className="fa-solid fa-fire"></i> {stats.streak} Days</div>
                    </>
                  ) : <div className="sk-anim sk-text" style={{width: '120px', height: '20px'}}></div>}
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="ac-grid">
              {/* Weather */}
              <div className="ac-widget">
                <div className="ac-label"><i className="fa-solid fa-location-arrow"></i> Location</div>
                <div className="ac-value">
                  {weather ? (
                    <>
                      {weather.current?.temp_c}°
                      {weather.current?.condition?.icon && (
                         <img src={weather.current.condition.icon.startsWith("//") ? `https:${weather.current.condition.icon}` : weather.current.condition.icon} alt="icon" style={{width: '24px', height: '24px', marginLeft: 'auto', opacity: 0.8}} />
                       )}
                    </>
                  ) : <div className="sk-anim sk-block"></div>}
                </div>
                <div className="ac-sub">
                  {weather ? `${weather.city}, ${weather.current?.condition?.text}` : <div className="sk-anim sk-text"></div>}
                </div>
              </div>

              {/* Badges */}
              <div className="ac-widget">
                <div className="ac-label"><i className="fa-solid fa-medal"></i> Badges</div>
                <div className="ac-value">
                   {stats.loaded ? stats.badges : <div className="sk-anim sk-block"></div>}
                </div>
                <div className="ac-sub">
                   {stats.loaded ? "LeetCode Mastery" : <div className="sk-anim sk-text"></div>}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="ac-footer">
              <div className="ac-stats-wrapper">
                <div className="ac-stat">
                  {stats.loaded ? <span>{stats.q}</span> : <div className="sk-anim sk-text" style={{width: '30px'}}></div>}
                  Solved
                </div>
                <div className="ac-stat">
                  {stats.loaded ? <span className="text-gold">{stats.stars}★</span> : <div className="sk-anim sk-text" style={{width: '30px'}}></div>}
                  CodeChef
                </div>
              </div>
              
              {/* RIGHT ALIGNED LIVE DOT */}
              <div className="live-indicator" title="Live Data">
                <div className="live-dot"></div>
                <div className="live-ripple"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Text Section (Unchanged) */}
        <div className="section__text">
          <p className="section__text__p1" style={{ color: "#F5F5F5" }}>Hello, I'm</p>
          <h1 className="title">Rohan Chakravarty</h1>
          <p className="section__text__p2" style={{ color: "#F5F5F5" }}>Software Developer</p>
          <div className="btn-container">
            <button className="btn specialBtn" onClick={() => window.open('/assets/RohanChakravarty.pdf')}>Resume <i className="fa-solid fa-file"></i></button>
            <button className="btn specialBtn" onClick={() => location.href = './#contact'}>Contact Me <i className="fa-solid fa-address-book"></i></button>
          </div>
          <div id="socials-container">
            <img src="/assets/health.svg" alt="Health" className="icon" onClick={() => location.href = 'https://rcxdev.com/health'} />
            <img src="/assets/mail.svg" alt="Email" className="icon" onClick={() => location.href = 'mailto:hello@rcxdev.com'} />
            <img src="/assets/linkedin.svg" alt="LinkedIn" className="icon" onClick={() => location.href = 'https://www.linkedin.com/in/rohan-chakravarty-/'} />
            <img src="/assets/github.svg" alt="Github" className="icon" onClick={() => location.href = 'https://github.com/rohan3004/'} />
          </div>
        </div>
      </section>
    </div>
  );
}