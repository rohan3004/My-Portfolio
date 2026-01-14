"use client";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const modalRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    // Disable scrolling when modal is open
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Music visibility handler
    const handleVisibilityChange = () => {
      if (document.hidden) {
        audioRef.current?.pause();
      } else if (!audioRef.current?.paused) {
        audioRef.current?.play();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [showModal]);

  const playMusic = () => {
    const songs = ['music1.mp3', 'music2.mp3', 'music3.mp3', 'music4.mp3', 'music5.mp3'];
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    
    if (audioRef.current) {
      audioRef.current.src = `https://rcxdev.com/assets/music/${randomSong}`;
      audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
      closeModal();
    }
  };

  const closeModal = () => {
    // Add fade-out class logic if desired, for now we simply unmount
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="modal fade-in" id="musicModal" style={{ display: "flex" }} ref={modalRef}>
          <div className="modal-content" id="musicModalContainer">
            <h2>Enable Music?</h2>
            <img src="/assets/modal.webp" alt="Music Modal" />
            <button className="btn btn-color-1" onClick={playMusic}>
              <i className="fa-regular fa-face-laugh-wink"></i> Yes
            </button>
            <button className="btn btn-color-2" onClick={closeModal}>
              <i className="fa-regular fa-face-sad-cry"></i> No
            </button>
          </div>
        </div>
      )}
      <audio ref={audioRef} loop preload="auto" />
    </>
  );
}