"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const sections = ["hero", "about", "timeline", "projects", "capabilities", "contact"];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (sections.includes(id)) setActive(id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0.01 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const linkClass = (id: string) =>
    `text-gray-300 hover:text-white transition ${
      active === id ? "text-white underline underline-offset-4 decoration-[color:var(--highlight-blue)]" : ""
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full transition-colors duration-300 z-40 ${
        solid ? "bg-black/80 backdrop-blur border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between py-4">
        <Link href="#hero" className="text-white font-bold tracking-wide">
          Blake Royal
        </Link>
        <div className="flex gap-6">
          <a href="#about" className={linkClass("about")}>
            About
          </a>
          <a href="#timeline" className={linkClass("timeline")}>
            Timeline
          </a>
          <a href="#projects" className={linkClass("projects")}>
            Projects
          </a>
          <a href="#capabilities" className={linkClass("capabilities")}>
            Capabilities
          </a>
          <a href="#contact" className={linkClass("contact")}>
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
