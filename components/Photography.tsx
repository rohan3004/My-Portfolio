"use client";
import {useEffect, useState} from "react";

export default function Photography() {
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        // Complete list of all 12 photos from your original project
        const allCaptions = [
            {caption: "Lost in Heaven<br>Shot on Canon EOS R10", imageUrl: "/assets/photography/p11.png"},
            {caption: "Hadimba Temple<br>Shot on Canon EOS R10", imageUrl: "/assets/photography/p12.png"},
            {caption: "It's Either You or Nobody✨<br>Shot on Xiaomi 11T Pro", imageUrl: "/assets/photography/p10.jpeg"},
            {caption: "Sunset<br>Shot on Xiaomi 11T Pro", imageUrl: "/assets/photography/p9.jpg"},
            {caption: "Kolkata Christmas<br>Shot on Xiaomi 11T Pro", imageUrl: "/assets/photography/p8.jpg"},
            {caption: "Khiderpore Docks<br>Shot on Redmi Note 10 Pro Max", imageUrl: "/assets/photography/p7.jpg"},
            {caption: "Macro Photography<br>Shot on Redmi Note 10 Pro Max", imageUrl: "/assets/photography/p6.jpg"},
            {caption: "Railway Tracks<br>Shot on Redmi K30", imageUrl: "/assets/photography/p5.jpg"},
            {caption: "Fountain Stop Motion<br>Shot on Redmi K30", imageUrl: "/assets/photography/p4.jpg"},
            {caption: "Beautiful Sunrise Sky<br>Shot on Redmi K30", imageUrl: "/assets/photography/p3.jpg"},
            {
                caption: "Night Photography - Bulb Mode<br>Shot on Redmi Note 8 Pro",
                imageUrl: "/assets/photography/p2.jpg"
            },
            {caption: "Annual Solar Eclipse<br>Shot on Redmi Note 8 Pro", imageUrl: "/assets/photography/p1.jpg"},
        ];

        // Restoring your original logic: Only show first 4 images on mobile devices
        if (window.innerWidth <= 768) {
            setPosts(allCaptions.slice(0, 4));
        } else {
            setPosts(allCaptions);
        }

        // Optional: Handle resize to update the count dynamically
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setPosts(allCaptions.slice(0, 4));
            } else {
                setPosts(allCaptions);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);

    }, []);

    return (
        <div className="photographyDiv">
            <section id="photography">
                <p className="section__text__p1" style={{color: "#f2e4ef"}}>Exploring the art of storytelling through
                    visuals</p>
                <h1 className="title">Through My Lens</h1>
                <div className="experience-details-container">
                    <div id="sp">
                        {posts.map((post, idx) => (
                            <div className="repo-card" key={idx}>
                                <div className="instagram-photo">
                                    <div className="instagram-header">
                                        <figure>
                                            <img src="/assets/insta-pic.webp" alt="Rohan" width="42" height="42"
                                                 loading="lazy"/>
                                            <figcaption><h4>rohan.chakravarty</h4></figcaption>
                                        </figure>
                                    </div>
                                    <div className="insta-media"><img src={post.imageUrl} alt={`Photograph ${idx}`}
                                                                      loading="lazy"/></div>
                                    <div className="insta-buttons">
                                        <div className="left">
                                            <i className="fa-regular fa-heart"
                                               style={{fontSize: '1.5rem', marginRight: '10px'}}></i>
                                            <i className="fa-regular fa-comment"
                                               style={{fontSize: '1.5rem', marginRight: '10px'}}></i>
                                            <i className="fa-regular fa-paper-plane" style={{fontSize: '1.5rem'}}></i>
                                        </div>
                                        <div className="right">
                                            <i className="fa-regular fa-bookmark" style={{fontSize: '1.5rem'}}></i>
                                        </div>
                                    </div>
                                    <h2 className="sp-captions" dangerouslySetInnerHTML={{__html: post.caption}}></h2>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <img src="/assets/arrow.svg" alt="Arrow" className="icon arrow"
                     onClick={() => location.href = './#contact'}/>
            </section>
        </div>
    );
}