"use client";

import React from "react";

export default function Skills() {
    return (
        <div className="exp">
            <section id="experience">
                <p className="section__text__p1">Explore My</p>
                <h1 className="title">Languages and Tools</h1>
                <div
                    className="my-component-void"
                    id="my-component-void"
                    style={{marginTop: "50px"}}
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="200"
                >
                    <div className="my-component-crop">
                        {/* Note: Custom CSS variables (like --count) must be cast to
                React.CSSProperties to satisfy TypeScript.
            */}
                        <ul
                            id="my-component-card-list"
                            style={{"--count": 10} as React.CSSProperties}
                        >
                            <li>
                                <div className="my-component-card">
                                    <span className="my-component-model-name">Java</span>
                                </div>
                            </li>
                            <li>
                                <div className="my-component-card">
                                    <span className="my-component-model-name">C/C++</span>
                                </div>
                            </li>
                            <li>
                                <div className="my-component-card">
                                    <span className="my-component-model-name">Python</span>
                                </div>
                            </li>
                            <li>
                                <div className="my-component-card">
                                    <span className="my-component-model-name">JS</span>
                                </div>
                            </li>
                            <li>
                                <div className="my-component-card">
                                    <span className="my-component-model-name">SQL</span>
                                </div>
                            </li>
                            <li>
                                <div className="my-component-card">
                                    <span className="my-component-model-name">Git</span>
                                </div>
                            </li>
                            <li>
                                <div className="my-component-card">
                                    <span className="my-component-model-name">Bash</span>
                                </div>
                            </li>
                            <li>
                                <div className="my-component-card">
                                    <span className="my-component-model-name">GCP</span>
                                </div>
                            </li>
                            <li>
                                <div className="my-component-card">
                                    <span className="my-component-model-name">RHEL</span>
                                </div>
                            </li>
                        </ul>
                        <div className="my-component-last-circle"></div>
                        <div className="my-component-second-circle"></div>
                    </div>
                    <div className="my-component-mask"></div>
                    <div
                        className="my-component-center-circle"
                        style={{
                            background: "url('/assets/logo.webp')",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                        }}
                    ></div>
                </div>
                <img
                    src="/assets/arrow.svg"
                    alt="Arrow icon"
                    className="icon arrow"
                    onClick={() => (window.location.href = "./#photography")}
                />
            </section>
        </div>
    );
}