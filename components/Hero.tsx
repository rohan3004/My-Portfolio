"use client";
import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [weather, setWeather] = useState<any>(null);
  const [stats, setStats] = useState({ q: 0, badges: 0, sub: 0, streak: 0, stars: 2 });

  useEffect(() => {
    // 1. HLS Video Logic
    const src = "https://stream.byrohan.in/hls/vid_bg1/master.m3u8";
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          videoRef.current?.play().catch(() => {});
        });
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = src;
        videoRef.current.addEventListener("loadedmetadata", () => {
          videoRef.current?.play().catch(() => {});
        });
      }
    }

    // 2. Weather Logic
    const fetchWeather = async () => {
      try {
        const ipRes = await fetch("http://localhost:8443/v1/your_ip");
        const ipData = await ipRes.json();
        const city = ipData?.cityNames?.en || "Kolkata";
        
        const wRes = await fetch(`https://api.weatherapi.com/v1/current.json?key=fc9c2d13772441e9b72191328240604&q=${city}`);
        const wData = await wRes.json();
        setWeather({ city, ...wData });
      } catch (e) {
        console.error("Weather error", e);
      }
    };

    // 3. Stats Logic (Quick Fetch)
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:8443/v1/reports/rohan.chakravarty02@gmail.com');
        const data = await res.json();
        const totalQ = (data.codechef?.problems_solved_total || 0) + (data.codeforces?.problems_solved_total || 0) + (data.geeksforgeeks?.problems_solved_total || 0) + (data.leetcode?.problems_solved_total || 0);
        setStats({
          q: totalQ,
          badges: data.leetcode?.platform_specific?.badges || 0,
          sub: data.leetcode?.platform_specific?.top_percentage || 0,
          streak: data.leetcode?.streak_max || 0,
          stars: data.codechef?.platform_specific?.contest_rank_stars || 2
        });
      } catch (e) {
        console.error(e);
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
          <div id="player02" className="player horizontal">
            <div className="wrapper">
              <div className="info-wrapper">
                <img src="/assets/Rohan Chakravarty.webp" alt="Rohan Chakravarty" />
                <div className="info">
                  <h1>Hello, World!</h1>
                  <p style={{ color: "white" }}>Top <span id="submissions">{stats.sub}%</span>😤 |🔥<span id="max-streak">{stats.streak}</span></p>
                </div>
              </div>
              <div id="weatherRohan">
                {weather ? (
                  <div className="weather-info">
                    <div className="details">
                      <p className="temperature">{weather.current?.temp_c}°C in {weather.city}</p>
                      <p className="condition">{weather.current?.condition?.text} {weather.current?.pressure_mb} hPa</p>
                    </div>
                    <img id="icon" src={weather.current?.condition?.icon.startsWith("//") ? `https:${weather.current.condition.icon}` : weather.current?.condition?.icon} alt="Weather Icon" />
                    <div className="details">
                      <p><i className="fas fa-tint"></i><span id="humidity">{weather.current?.humidity}</span>%</p>
                      <p><i className="fa-solid fa-wind"></i><span id="wind">{weather.current?.wind_dir} {weather.current?.wind_kph}</span> km/h</p>
                    </div>
                  </div>
                ) : (
                  <p>Loading Weather...</p>
                )}
              </div>
              <div className="track-time">
                <div className="track"></div>
                <div className="time">
                  <p><span>{stats.q}</span> Qs | <span>{stats.badges}</span> Badges | <span>{stats.stars}</span>⭐@Codechef</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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