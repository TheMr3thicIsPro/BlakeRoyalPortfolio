"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeInBlock from "../components/FadeInBlock";

type Entry = {
  date: string;
  title: string;
  anecdote: string;
  tech: string[];
  challenge: string;
  outcome: string;
  image: string;
};

const entries: Entry[] = [
  {
    date: "Mar 2024",
    title: "Started learning Python",
    anecdote:
      "Began with scripts to automate small tasks and understand core programming concepts.",
    tech: ["Python", "VS Code"],
    challenge: "Building consistency and forming problem-solving habits.",
    outcome: "Created small utilities and built momentum for deeper development.",
    image: "/projects/python.svg",
  },
  {
    date: "Apr 2024",
    title: "Built Roblox game experiments",
    anecdote:
      "Prototyped gameplay loops to explore interaction and feedback cycles.",
    tech: ["Lua", "Roblox Studio"],
    challenge: "Designing engaging interactions with minimal tooling.",
    outcome: "Learned to align mechanics with user engagement.",
    image: "/projects/roblox.svg",
  },
  {
    date: "2024–2025",
    title: "On/off coding hobby phase",
    anecdote:
      "Balanced learning and shipping; focused on fundamentals over frameworks first.",
    tech: ["HTML", "CSS", "JavaScript"],
    challenge: "Avoiding tutorial loops and forming a build-first mindset.",
    outcome: "Built small sites and components to strengthen core skills.",
    image: "/projects/hobby.svg",
  },
  {
    date: "Jun 2025",
    title: "Discovered AI‑assisted development",
    anecdote:
      "Integrated AI into workflows to accelerate iteration without sacrificing quality.",
    tech: ["Next.js", "TypeScript", "TailwindCSS"],
    challenge: "Keeping outputs intentional and avoiding AI-feeling patterns.",
    outcome: "Shipped faster while maintaining design and code standards.",
    image: "/projects/ai-dev.svg",
  },
  {
    date: "Jul–Nov 2025",
    title: "Shipped Websites to business for free to improve skills",
    anecdote:
      "Built and delivered sites for local small businesses to gain real-world feedback.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Vercel"],
    challenge: "Translating business needs into clear UX and measurable outcomes.",
    outcome:
      "Helped home services and niche shops improve credibility and conversions; strengthened client communication and deployment skills.",
    image: "/projects/business.svg",
  },
  {
    date: "Now",
    title: "Studying Software Development + building consistently",
    anecdote:
      "Continuing structured learning while shipping projects to refine craft.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Three.js"],
    challenge: "Balancing exploration with disciplined delivery.",
    outcome:
      "Continual iteration and portfolio curation with measurable improvements.",
    image: "/projects/now.svg",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="min-h-[90vh] py-24 relative">
      <div className="absolute inset-0 opacity-[0.05]">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_60%)]" />
      </div>
      <div className="container relative">
        <div className="mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-300 mb-8"
          >
            A clear progression from fundamentals to shipping. Each milestone built
            skills in design, code, and delivery with tangible outcomes.
          </motion.p>
          <div className="space-y-12">
            {entries.map((e, i) => (
              <FadeInBlock
                key={e.title}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                delay={i * 0.08}
              >
                <div className={`${i % 2 ? "md:order-2" : ""}`}>
                  <div className="relative rounded-xl overflow-hidden border border-white/10">
                    <Image
                      src={e.image}
                      alt={e.title}
                      width={1200}
                      height={800}
                      className="w-full h-[260px] md:h-[320px] object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">{e.date}</span>
                    <span className="w-2 h-2 rounded-full bg-[color:var(--highlight-blue)] shadow-[0_0_12px_var(--hover-glow)]" />
                  </div>
                  <h3 className="text-white text-xl font-semibold">{e.title}</h3>
                  <p className="text-gray-300">{e.anecdote}</p>
                  <p className="text-gray-300">
                    <span className="text-white">Challenge:</span> {e.challenge}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-white">Outcome:</span> {e.outcome}
                  </p>
                  <ul className="flex flex-wrap gap-2 mt-2">
                    {e.tech.map((t) => (
                      <li
                        key={t}
                        className="px-3 py-1 rounded-full border border-white/10 text-gray-300"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInBlock>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
