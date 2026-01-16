"use client";

import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import "./not-found.css";

interface UserData {
    ip: string;
    city: string;
    isp: string;
    timezone: string;
}

export default function NotFound() {
    const router = useRouter();

    // Data State
    const [data, setData] = useState<UserData | null>(null);
    const [currentUrl, setCurrentUrl] = useState("");
    const [inputVal, setInputVal] = useState("");
    const [history, setHistory] = useState<{ cmd: string; output: React.ReactNode }[]>([]);

    // UI State
    const [windowState, setWindowState] = useState<"normal" | "max" | "min">("normal");

    // Drag State
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({x: 0, y: 0});

    // Refs
    const inputRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    // 1. Initial Setup
    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(window.location.href);
            inputRef.current?.focus();
        }
        fetch("https://apis.byrohan.in/v1/your_ip")
            .then((res) => res.json())
            .then((json) => {
                setData({
                    ip: json.ip || "Unknown",
                    city: json.cityName || "Unknown City",
                    isp: json.autonomousSystemOrganization || "Unknown ISP",
                    timezone: json.timezone || "UTC",
                });
            })
            .catch(() => setData({ip: "127.0.0.1", city: "Localhost", isp: "Offline", timezone: "UTC"}));
    }, []);

    // 2. Drag Logic (Global Event Listeners)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;

            // Calculate new position based on initial offset
            const newX = e.clientX - dragOffset.current.x;
            const newY = e.clientY - dragOffset.current.y;

            setPosition({x: newX, y: newY});
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    // 3. Auto Scroll
    useEffect(() => {
        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }, [history, inputVal, data]);

    // 4. Start Dragging (Attached to Header)
    const startDrag = (e: React.MouseEvent) => {
        // Only drag if 'normal' state (not maximized or minimized)
        if (windowState !== "normal") return;

        // Prevent dragging if clicking buttons
        if ((e.target as HTMLElement).closest(".Menu_BTN")) return;

        setIsDragging(true);
        // Calculate where mouse clicked relative to current window position
        dragOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    // --- COMMAND HANDLERS ---
    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();
        if (!cleanCmd) return;

        if (cleanCmd === "cls" || cleanCmd === "clear") {
            setHistory([]);
            return;
        }
        if (cleanCmd === "exit") {
            router.push("/");
            return;
        }

        let outputNode: React.ReactNode;
        switch (cleanCmd) {
            case "help":
                outputNode = (
                    <div className="line">
                        Available commands:<br/>
                        <span className="yellow">help</span> - Show menu | <span className="yellow">whoami</span> - Info
                        | <span className="yellow">report</span> - Log error | <span className="yellow">exit</span> -
                        Home
                    </div>
                );
                break;
            case "whoami":
                outputNode = <div className="line">User: <span className="blue">Guest</span> | Session: <span
                    className="green">Active</span></div>;
                break;
            case "report":
                outputNode = <div className="line"><span className="green">✓ Report sent.</span></div>;
                break;
            default:
                outputNode = <div className="line">Command not found: <span className="red">{cleanCmd}</span></div>;
        }
        setHistory((prev) => [...prev, {cmd, output: outputNode}]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(inputVal);
            setInputVal("");
        }
    };

    // --- WINDOW CONTROLS ---
    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push("/");
    };
    const handleMinimize = (e: React.MouseEvent) => {
        e.stopPropagation();
        setWindowState("min");
    };
    const handleMaximize = (e: React.MouseEvent) => {
        e.stopPropagation();
        // Reset position when maximizing so it fills screen properly
        setPosition({x: 0, y: 0});
        setWindowState(prev => prev === "max" ? "normal" : "max");
    };
    const handleRestore = (e: React.MouseEvent) => {
        e.stopPropagation();
        setWindowState("normal");
        // Optional: Reset position on restore or keep it where it was
    };

    // 🔴 THE FIX: Wrap everything in html/body tags
    return (
        <html lang="en">
        {/* Added style to prevent default browser margins */}
        <body style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
        <div className={`not-found-wrapper ${windowState}`} onClick={() => inputRef.current?.focus()}>

            {/* TERMINAL WINDOW */}
            <div
                className="terminal-window"
                // Apply Drag Position via Inline Styles
                style={{
                    left: windowState === 'normal' ? `${position.x}px` : '0px',
                    top: windowState === 'normal' ? `${position.y}px` : '0px'
                }}
            >
                {/* HEADER (Draggable Target) */}
                <div className="Menubar" onMouseDown={startDrag}>
                    <div className="Menu_BTN">
                        <span onClick={handleClose} title="Close"></span>
                        <span onClick={handleMinimize} title="Minimize"></span>
                        <span onClick={handleMaximize} title="Zoom"></span>
                    </div>
                    <div className="title_Terminal">guest — -zsh — 80x24</div>
                    <div className="title_404">404</div>
                </div>

                {/* BODY */}
                <div className="Terminal_body" ref={bodyRef}>
                    <div className="line">Last login: {new Date().toLocaleDateString()} on <span
                        className="purple">ttys001</span></div>
                    <div className="line" style={{marginTop: '10px'}}>
                        Connection: <span className="green">{data ? data.ip : "Loading..."}</span> via <span
                        className="blue">{data ? data.isp : "..."}</span>.
                        <br/>
                        Location: <span
                        className="yellow">{data ? data.city : "..."}</span> ({data ? data.timezone : "..."}).
                    </div>
                    <div className="line" style={{marginTop: '10px', marginBottom: '20px'}}>
                        <span className="red">[ERROR 404]</span> Target not found: <span
                        className="dim">{currentUrl}</span>
                        <br/>System halted. Type <span className="yellow">help</span> for options.
                    </div>

                    {history.map((item, i) => (
                        <div key={i}>
                            <div className="line"><span className="green">➜</span> <span className="blue">~</span> <span
                                className="dim">{item.cmd}</span></div>
                            {item.output}
                        </div>
                    ))}

                    <div className="input-row">
                        <span className="green">➜</span> &nbsp;<span className="blue">~</span> &nbsp;
                        <span className="input-text">{inputVal}</span>
                        <span className="cursor"></span>
                    </div>

                    <input
                        ref={inputRef}
                        className="hidden-input"
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>
            </div>

            {/* DOCK ICON */}
            <div className="dock-icon" onClick={handleRestore}>
                <img src="https://rcxdev.com/assets/terminal.webp" alt="Terminal"/>
            </div>

        </div>
        </body>
        </html>
    );
}