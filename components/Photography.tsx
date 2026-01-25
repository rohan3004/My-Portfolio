"use client";
import { useEffect, useState, useRef } from "react";

interface PhotoData {
  id: number;
  caption: string;
  device: string;
  imageUrl: string;
  rotation: number;
}

export default function Photography() {
  const [selectedImg, setSelectedImg] = useState<PhotoData | null>(null);
  const [photos, setPhotos] = useState<PhotoData[]>([]);
  const [developedId, setDevelopedId] = useState<number | null>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [parallaxOffsets, setParallaxOffsets] = useState<number[]>([]);

  // ORIGINAL DATA RESTORED
  const rawPhotos = [
    { caption: "Lost in Heaven", device: "Shot on Canon EOS R10", imageUrl: "/assets/photography/p11.png" },
    { caption: "Hadimba Temple", device: "Shot on Canon EOS R10", imageUrl: "/assets/photography/p12.png" },
    { caption: "You or Nobody", device: "Shot on Xiaomi 11T Pro", imageUrl: "/assets/photography/p10.jpeg" },
    { caption: "Sunset", device: "Shot on Xiaomi 11T Pro", imageUrl: "/assets/photography/p9.jpg" },
    { caption: "Kolkata XMas", device: "Shot on Xiaomi 11T Pro", imageUrl: "/assets/photography/p8.jpg" },
    { caption: "Khiderpore Docks", device: "Shot on Redmi Note 10 Pro Max", imageUrl: "/assets/photography/p7.jpg" },
    { caption: "Macro World", device: "Shot on Redmi Note 10 Pro Max", imageUrl: "/assets/photography/p6.jpg" },
    { caption: "Railway Tracks", device: "Shot on Redmi K30", imageUrl: "/assets/photography/p5.jpg" },
    { caption: "Fountain Freeze Frame", device: "Shot on Redmi K30", imageUrl: "/assets/photography/p4.jpg" },
    { caption: "Sunrise", device: "Shot on Redmi K30", imageUrl: "/assets/photography/p3.jpg" },
    { caption: "Bulb Mode", device: "Shot on Redmi Note 8 Pro", imageUrl: "/assets/photography/p2.jpg" },
    { caption: "Solar Eclipse", device: "Shot on Redmi Note 8 Pro", imageUrl: "/assets/photography/p1.jpg" },
  ];

  useEffect(() => {
    const processed = rawPhotos.map((p, idx) => ({
        ...p,
        id: idx,
        rotation: Math.random() * 4 - 2 
    }));
    setPhotos(processed);
    setParallaxOffsets(new Array(processed.length).fill(0));
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;
    
    const index = Math.round(scrollLeft / (width * 0.8));
    setActiveIndex(Math.min(Math.max(index, 0), photos.length - 1));

    if (window.innerWidth <= 768) {
        const newOffsets = photos.map((_, i) => {
            const cardCenter = (i * width * 0.85) + (width * 0.85 / 2);
            const viewCenter = scrollLeft + (width / 2);
            const dist = viewCenter - cardCenter;
            return dist * 0.15; 
        });
        setParallaxOffsets(newOffsets);
    }
  };

  const handlePhotoClick = (photo: PhotoData) => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      if (developedId === photo.id) setSelectedImg(photo);
      else setDevelopedId(photo.id);
    } else {
      setSelectedImg(photo);
    }
  };

  return (
    <div className="diary-wrapper">
      <div className="paper-grain"></div>

      <section id="photography">
        
        <div className="diary-header">
          <span className="diary-tag">// VISUAL ARCHIVES</span>
          <h1 className="diary-title">
            Chasing <span>Light</span>
          </h1>
        </div>

        <div className="marker-hint">
            <i className="fa-regular fa-hand-point-up"></i>
            <span>Tap to Develop</span>
        </div>

        <div 
            className="diary-grid" 
            ref={scrollContainerRef}
            onScroll={handleScroll}
        >
          {photos.map((photo, idx) => (
            <div 
              key={photo.id} 
              className={`polaroid ${developedId === photo.id ? 'developed' : ''}`}
              style={{ '--rotation': `${photo.rotation}deg` } as React.CSSProperties}
              onClick={() => handlePhotoClick(photo)}
            >
              <div className="polaroid-frame">
                  <img 
                    src={photo.imageUrl} 
                    alt={photo.caption} 
                    className="polaroid-img"
                    style={{
                        transform: `scale(1.2) translateX(${parallaxOffsets[idx] || 0}px)`
                    }}
                    loading="lazy" 
                  />
              </div>
              <div className="polaroid-text">
                  <span className="polaroid-caption">{photo.caption}</span>
                  <span className="polaroid-meta">{photo.device}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="carousel-indicators">
            {photos.map((_, i) => (
                <div 
                    key={i} 
                    className={`c-dot ${i === activeIndex ? 'active' : ''}`}
                ></div>
            ))}
        </div>

      </section>

      {selectedImg && (
        <div className="diary-lightbox" onClick={() => setSelectedImg(null)}>
          <div className="lb-close" onClick={() => setSelectedImg(null)}>&times;</div>
          <div className="lb-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImg.imageUrl} alt={selectedImg.caption} className="lb-img" />
            <div className="lb-text">{selectedImg.caption}</div>
            <div className="lb-meta">{selectedImg.device}</div>
          </div>
        </div>
      )}

    </div>
  );
}