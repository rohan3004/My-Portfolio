"use client";
import {useState, useEffect} from "react";
import BongoCat from "./BongoCat";

export default function Contact() {
    // States: 'idle' | 'sending' | 'success' | 'error' | 'locked'
    const [formState, setFormState] = useState("idle");
    const [timeLeft, setTimeLeft] = useState<string>("");

    // CONSTANT: Cool-down time in milliseconds (e.g., 60 minutes)
    const COOL_DOWN_MS = 60 * 60 * 1000;

    // 1. CHECK ON MOUNT
    useEffect(() => {
        const checkLock = () => {
            const lastTime = localStorage.getItem("lastContactTime");
            if (lastTime) {
                const diff = Date.now() - parseInt(lastTime, 10);
                if (diff < COOL_DOWN_MS) {
                    setFormState("locked");
                    updateTimer(parseInt(lastTime, 10));
                } else {
                    // Time expired, clear it
                    localStorage.removeItem("lastContactTime");
                    setFormState("idle");
                }
            }
        };

        checkLock();
        // Optional: Re-check every minute to auto-unlock
        const interval = setInterval(checkLock, 60000);
        return () => clearInterval(interval);
    }, []);

    // Helper: Format remaining time for display
    const updateTimer = (startTime: number) => {
        const remaining = COOL_DOWN_MS - (Date.now() - startTime);
        const minutes = Math.floor(remaining / 60000);
        setTimeLeft(`${minutes} min`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("sending");

        const form = e.target as HTMLFormElement;
        const formData = {
            name: (form.elements.namedItem("name") as HTMLInputElement).value,
            email: (form.elements.namedItem("email") as HTMLInputElement).value,
            contactNo: (form.elements.namedItem("contactNo") as HTMLInputElement).value,
            message: (form.elements.namedItem("message") as HTMLInputElement).value,
        };

        try {
            // 1.5s delay for animation
            await new Promise(r => setTimeout(r, 1500));

            const res = await fetch("https://apis.byrohan.in/v1/contact", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setFormState("success");
                form.reset();

                // SAVE TIMESTAMP TO LOCAL STORAGE
                localStorage.setItem("lastContactTime", Date.now().toString());
            } else {
                throw new Error("Failed");
            }
        } catch (error) {
            console.error(error);
            setFormState("error");
        }
    };

    const clearForm = () => {
        const form = document.getElementById("form") as HTMLFormElement;
        if (form) form.reset();
    };

    return (
        <div className="contactContainer">
            <section id="contact">
                <div
                    className="background"
                    data-aos="fade-down-right"
                    data-aos-duration="1000"
                    data-aos-delay="200"
                >
                    <div className="container">
                        <div className="screen">

                            <div className="bongo-layer">
                                <BongoCat/>
                            </div>

                            <div className="screen-header">
                                <div className="screen-header-left">
                                    <div className="screen-header-button close"></div>
                                    <div className="screen-header-button maximize"></div>
                                    <div className="screen-header-button minimize"></div>
                                </div>
                                <div className="TitleBar" style={{opacity: 0.7, color: '#b16f59'}}>
                                    {formState === 'sending' ? 'Transmitting...' :
                                        formState === 'success' ? 'Sent' :
                                            formState === 'locked' ? 'Connection Cooldown' : 'New Message'}
                                </div>
                                <div className="screen-header-right">
                                    <div className="screen-header-ellipsis"></div>
                                    <div className="screen-header-ellipsis"></div>
                                    <div className="screen-header-ellipsis"></div>
                                </div>
                            </div>

                            <div className="screen-body">
                                <div className="screen-body-item left">
                                    <div className="app-title">
                                        <span>CONTACT</span>
                                        <span>ME</span>
                                    </div>
                                    <div className="app-contact">
                                        CONTACT INFO : hello@rcxdev.com
                                    </div>
                                </div>

                                {/* FORM CONTAINER - Applies blur if not idle */}
                                <div
                                    className={`screen-body-item form-glass ${formState !== 'idle' ? 'has-overlay' : ''}`}>

                                    {/* FORM (Always rendered, but blurred/disabled when locked) */}
                                    <form id="form" onSubmit={handleSubmit}>
                                        <div className="app-form">
                                            <div className="app-form-group">
                                                <input className="app-form-control" name="name" placeholder="NAME"
                                                       required disabled={formState === 'locked'}/>
                                            </div>
                                            <div className="app-form-group">
                                                <input className="app-form-control" name="email" type="email"
                                                       placeholder="EMAIL" required disabled={formState === 'locked'}/>
                                            </div>
                                            <div className="app-form-group">
                                                <input className="app-form-control" name="contactNo"
                                                       placeholder="CONTACT NO" required
                                                       disabled={formState === 'locked'}/>
                                            </div>
                                            <div className="app-form-group message">
                                                <input className="app-form-control" name="message" placeholder="MESSAGE"
                                                       required disabled={formState === 'locked'}/>
                                            </div>
                                            <div className="app-form-group buttons">
                                                <button type="button" className="app-form-button" onClick={clearForm}
                                                        disabled={formState === 'locked'}>
                                                    RESET
                                                </button>
                                                <button type="submit" className="app-form-button"
                                                        disabled={formState === 'locked'}>
                                                    SEND
                                                </button>
                                            </div>
                                        </div>
                                    </form>

                                    {/* --- OVERLAYS --- */}

                                    {/* 1. SENDING */}
                                    {formState === "sending" && (
                                        <div className="form-overlay">
                                            <div className="ripple-loader">
                                                <div></div>
                                                <div></div>
                                            </div>
                                            <p className="status-text"
                                               style={{fontSize: '0.9rem', opacity: 0.8}}>Sending...</p>
                                        </div>
                                    )}

                                    {/* 2. SUCCESS (Wait for Cooldown) */}
                                    {formState === "success" && (
                                        <div className="form-overlay">
                                            <div className="success-icon-circle">
                                                <svg viewBox="0 0 24 24">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                                                </svg>
                                            </div>
                                            <p className="status-text">Message Sent</p>
                                            <p className="status-sub">I'll get back to you shortly.</p>
                                            {/* Button removed because they can't send another yet */}
                                        </div>
                                    )}

                                    {/* 3. LOCKED (Cooldown Active) */}
                                    {formState === "locked" && (
                                        <div className="form-overlay">
                                            <div className="success-icon-circle" style={{borderColor: '#666'}}>
                                                <svg viewBox="0 0 24 24" style={{fill: '#aaa'}}>
                                                    <path
                                                        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                                                    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                                                </svg>
                                            </div>
                                            <p className="status-text">Message Limit</p>
                                            <p className="status-sub">Next message available in:</p>
                                            <p className="status-text" style={{
                                                fontSize: '1.5rem',
                                                marginTop: '5px',
                                                color: '#b16f59'
                                            }}>{timeLeft}</p>
                                        </div>
                                    )}

                                    {/* 4. ERROR */}
                                    {formState === "error" && (
                                        <div className="form-overlay">
                                            <p className="status-text" style={{color: '#ff605c'}}>Transmission Error</p>
                                            <button
                                                className="app-form-button"
                                                style={{marginTop: '15px'}}
                                                onClick={() => setFormState('idle')}
                                            >
                                                Retry
                                            </button>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="techstack" data-aos="fade-down-left" data-aos-duration="1000" data-aos-delay="200">
                    <p className="headingTS">Built Using</p>
                    {/* Tech Stack Icons (Unchanged) */}
                    <div className="ts">
                        <img src="/assets/html.svg" alt="HTML Logo" title="HTML Logo" loading="lazy"/>
                        <img src="/assets/css.svg" alt="CSS Logo" title="CSS Logo" loading="lazy"/>
                        <img src="/assets/sass.svg" alt="Sass Logo" title="Sass Logo" loading="lazy"/>
                        <img src="/assets/tailwind.svg" alt="Tailwindcss Logo" title="Tailwindcss Logo" loading="lazy"/>
                        <img src="/assets/postcss.svg" alt="Postcss Logo" title="Postcss Logo" loading="lazy"/>
                        <img src="/assets/typescript.svg" alt="Typescript Logo" title="Typescript Logo" loading="lazy"/>
                        <img src="/assets/nextjs.svg" alt="Next Js Logo" title="Next Js Logo" loading="lazy"/>
                    </div>
                    <div className="ts">
                        <img src="/assets/mysql.svg" alt="Mysql Logo" title="Mysql Logo" style={{width: "70px"}}
                             loading="lazy"/>
                        <img src="/assets/Spring_Boot.svg" alt="SpringBoot Logo" title="SpringBoot Logo"
                             loading="lazy"/>
                        <img src="/assets/java.svg" alt="Java Logo" title="Java Logo" loading="lazy"/>
                        <img src="/assets/python.svg" alt="Python Logo" title="Python Logo" loading="lazy"/>
                        <img src="/assets/nginx.svg" alt="Nginx Logo" title="Nginx Logo" loading="lazy"/>
                        <img src="/assets/apache.svg" alt="Apache Logo" title="Apache Logo" loading="lazy"/>
                        <img src="/assets/docker.svg" alt="Docker Logo" title="Docker Logo" loading="lazy"/>
                        <img src="/assets/aws.svg" alt="AWS Logo" title="AWS Logo" loading="lazy"/>
                        <img src="/assets/cloudflare.svg" alt="CloudFlare Logo" title="CloudFlare Logo" loading="lazy"/>
                    </div>
                </div>
            </section>

            <footer>
                <div className="footer-links">
                    <p>Copyright &copy; <span id="year">{new Date().getFullYear()}</span> Rohan Chakravarty. All Rights
                        Reserved.</p>
                    <a href="https://www.rcxdev.com/legal/privacy" target="_blank">Privacy Policy</a>
                    <a href="https://www.rcxdev.com/legal/terms" target="_blank">Terms of Use</a>
                    <p>India</p>
                </div>
            </footer>
        </div>
    );
}