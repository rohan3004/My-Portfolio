import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";
import Stats from "@/components/Stats";
import Experience from "@/components/Experience"; 
import Projects from "@/components/Projects";
import Skills from "@/components/Skills"; 
import Photography from "@/components/Photography";
import Contact from "@/components/Contact";
import ScrollAnimations from "@/components/ScrollAnimations"; // Import the new component

export default function Home() {
  return (
    <main>
      <ScrollAnimations />
      <MusicPlayer />
      <Navbar />
      <Hero />
      <Stats />
      <Experience /> 
      <Projects />
      <Skills />
      <Photography />
      <Contact />
    </main>
  );
}