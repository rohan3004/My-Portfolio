import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";
import Stats from "@/components/Stats";
import Experience from "@/components/Experience"; // You create this from HTML
import Projects from "@/components/Projects";
import Skills from "@/components/Skills"; // You create this from HTML
import Photography from "@/components/Photography";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
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