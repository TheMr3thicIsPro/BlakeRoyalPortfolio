"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  title: string;
  url: string;
  description: string;
  bullets?: string[];
  icon?: string;
};

export default function ProjectShowcase({ title, url, description, bullets = [], icon }: Props) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = frameRef.current;
    const glare = glareRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `rotateX(${(-y / 40).toFixed(2)}deg) rotateY(${(x / 40).toFixed(2)}deg)`;
    if (glare) {
      const gx = e.clientX - rect.left;
      const gy = e.clientY - rect.top;
      glare.style.background = `radial-gradient(500px circle at ${gx}px ${gy}px, rgba(255,255,255,0.10), transparent 45%)`;
    }
  };
  const onMouseLeave = () => {
    const el = frameRef.current;
    const glare = glareRef.current;
    if (!el) return;
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
    if (glare) {
      glare.style.background = "radial-gradient(500px circle at 50% 50%, rgba(255,255,255,0.06), transparent 45%)";
    }
  };

  return (
    <section className="min-h-[90vh] py-24 border-t border-white/10" id="projects">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div
          className="relative rounded-xl border border-white/10 bg-black overflow-hidden shadow-lg will-change-transform [perspective:800px]"
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          ref={frameRef}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-auto text-xs text-gray-500">{new URL(url).hostname}</span>
          </div>
          <div className="relative">
            <div
              ref={glareRef}
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(500px circle at 50% 50%, rgba(255,255,255,0.06), transparent 45%)",
              }}
            />
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.03 }}
              className="absolute inset-0 ring-1 ring-[color:var(--hover-glow)] rounded-b-xl pointer-events-none"
            />
            <iframe
              src={url}
              title={title}
              loading="lazy"
              tabIndex={-1}
              className="w-full h-[50vh] md:h-[60vh] bg-[color:var(--accent-navy)]"
            />
          </div>
        </div>
        <div>
          <h3 className="text-white text-2xl font-bold flex items-center gap-2">
            {icon && (
              <Image
                src={icon}
                alt=""
                width={24}
                height={24}
                className="opacity-80"
              />
            )}
            <span>{title}</span>
          </h3>
          <a
            href={url}
            className="text-[color:var(--highlight-blue)] underline underline-offset-4 decoration-transparent hover:decoration-[color:var(--highlight-blue)] transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            {url}
          </a>
          <p className="mt-4 text-gray-300">{description}</p>
          {bullets.length > 0 && (
            <ul className="mt-4 space-y-2 text-gray-300">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[color:var(--highlight-blue)]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
