import Hero from "../sections/Hero";
import About from "../sections/About";
import Timeline from "../sections/Timeline";
import Projects from "../sections/Projects";
import Capabilities from "../sections/Capabilities";
import Contact from "../sections/Contact";
import MagneticButton from "../components/MagneticButton";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Timeline />
      <Projects />
      <Capabilities />
      <Contact />
      <footer className="container py-20 text-center">
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center gap-4">
            <a href="mailto:Broyal0110@icloud.com" className="text-white text-lg font-semibold">
              Broyal0110@icloud.com
            </a>
            <MagneticButton href="mailto:Broyal0110@icloud.com">Email Me</MagneticButton>
            <p className="mt-6 text-gray-400">Blake Royal © 2026</p>
            <p className="text-sm text-gray-500">Built with Next.js & TypeScript</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
