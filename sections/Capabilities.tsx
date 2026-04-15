"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useSpring,
  useMotionValue,
  useTransform,
  useScroll,
  animate,
  type MotionValue,
} from "framer-motion";
import AnimatedHeading from "@/components/AnimatedHeading";
import FadeInBlock from "@/components/FadeInBlock";

// ─── 01: Tilt Card ────────────────────────────────────────────────────────────

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 160, damping: 22 });
  const rotateY = useSpring(rawY, { stiffness: 160, damping: 22 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const bgImage = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(37,99,235,0.3), transparent 60%)`
  );

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current!.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rawX.set((0.5 - y) * 18);
    rawY.set((x - 0.5) * 18);
    glowX.set(x * 100);
    glowY.set(y * 100);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900, backgroundImage: bgImage }}
      className={`relative rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(37,99,235,0.22)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── 02: Scroll Triggers ──────────────────────────────────────────────────────
// Card-level inView so children fire AFTER the card is visible, not before

function CountUpStat({
  to,
  suffix = "",
  label,
  active,
  delay = 0,
}: {
  to: number;
  suffix?: string;
  label: string;
  active: boolean;
  delay?: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => {
      const ctrl = animate(0, to, {
        duration: 1.6,
        ease: "easeOut",
        onUpdate: (v) => setDisplay(Math.round(v)),
      });
      return () => ctrl.stop();
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [active, to, delay]);

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl font-bold text-white tabular-nums">
        {display}{suffix}
      </span>
      <span className="text-xs text-white/40">{label}</span>
    </div>
  );
}

function ScrollTriggersCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  // Single inView on the card itself — children delay so they fire after fade-in
  const active = useInView(cardRef, { once: true, margin: "-5% 0px" });

  const bars = [
    { label: "UI Animation", value: 95 },
    { label: "3D / WebGL",   value: 78 },
    { label: "Performance",  value: 88 },
  ];

  return (
    <div ref={cardRef} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-xs font-mono text-blue-500 mb-5 uppercase tracking-widest">02 / Scroll Triggers</p>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { to: 20, suffix: "+", label: "Projects",    delay: 0.45 },
          { to: 3,  suffix: " yrs", label: "Experience", delay: 0.55 },
          { to: 98, suffix: "%", label: "Client Sat.",  delay: 0.65 },
        ].map((s) => (
          <CountUpStat key={s.label} {...s} active={active} />
        ))}
      </div>

      {bars.map(({ label, value }, i) => (
        <div key={label} className="mb-3">
          <div className="flex justify-between text-xs text-white/50 mb-1.5">
            <span>{label}</span><span>{value}%</span>
          </div>
          <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-blue-500"
              initial={{ width: 0 }}
              animate={active ? { width: `${value}%` } : { width: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 + i * 0.15 }}
            />
          </div>
        </div>
      ))}

      <p className="text-xs text-white/25 text-center mt-3">↑ scroll to trigger — numbers count up live</p>
    </div>
  );
}

// ─── 03: Parallax Motion ─────────────────────────────────────────────────────

function ParallaxLayer({
  mouseX, mouseY, speed, size, color, left, top, ring = false,
}: {
  mouseX: MotionValue<number>; mouseY: MotionValue<number>;
  speed: number; size: number; color: string; left: string; top: string; ring?: boolean;
}) {
  const x = useTransform(mouseX, [-0.5, 0.5], [-speed, speed]);
  const y = useTransform(mouseY, [-0.5, 0.5], [-speed, speed]);
  return (
    <div style={{ position: "absolute", left, top, transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
      <motion.div style={{ x, y, width: size, height: size, borderRadius: "50%",
        background: ring ? "transparent" : color,
        border: ring ? `2px solid ${color}` : undefined }} />
    </div>
  );
}

const PARALLAX_LAYERS = [
  { speed: 18, size: 72,  color: "rgba(37,99,235,0.55)",  left: "28%", top: "35%" },
  { speed: 32, size: 44,  color: "rgba(99,102,241,0.45)", left: "68%", top: "62%" },
  { speed: 50, size: 24,  color: "rgba(37,99,235,0.80)",  left: "18%", top: "72%" },
  { speed: 10, size: 110, color: "rgba(37,99,235,0.30)",  left: "72%", top: "22%", ring: true },
  { speed: 26, size: 18,  color: "rgba(255,255,255,0.25)",left: "50%", top: "20%" },
];

function ParallaxDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current!.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  }

  return (
    <div ref={containerRef} onMouseMove={onMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      className="relative w-full h-40 overflow-hidden select-none cursor-crosshair"
    >
      {PARALLAX_LAYERS.map((l, i) => <ParallaxLayer key={i} mouseX={mouseX} mouseY={mouseY} {...l} />)}
      <p className="absolute inset-0 flex items-end justify-center pb-2 text-xs text-white/30 pointer-events-none">
        move cursor — each orb moves at a different depth
      </p>
    </div>
  );
}

// ─── 04: Reveal Effects — shutter wipe (very visible) ────────────────────────
// A solid overlay slides away from right→left, revealing the text underneath.

const REVEAL_WORDS = ["Scroll.", "Build.", "Ship.", "Impress."];

function ShutterReveal({ text, delay = 0, active }: { text: string; delay?: number; active: boolean }) {
  return (
    <div className="relative overflow-hidden inline-block">
      {/* The text that gets revealed */}
      <span className="block text-3xl font-bold text-white leading-tight">{text}</span>
      {/* Blue shutter that slides left to reveal */}
      <motion.div
        className="absolute inset-0 bg-blue-600 origin-right"
        initial={{ scaleX: 1 }}
        animate={active ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1], delay }}
        style={{ transformOrigin: "right" }}
      />
    </div>
  );
}

function RevealEffectsCard() {
  const ref = useRef<HTMLDivElement>(null);
  // once:false so re-triggers when scrolled past and back
  const active = useInView(ref, { once: false, margin: "-10% 0px -10% 0px" });

  return (
    <div ref={ref} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-xs font-mono text-blue-500 mb-5 uppercase tracking-widest">04 / Reveal Effects</p>
      <div className="flex flex-col gap-3 my-2">
        {REVEAL_WORDS.map((word, i) => (
          <ShutterReveal key={word} text={word} delay={i * 0.12} active={active} />
        ))}
      </div>
      <p className="text-xs text-white/25 mt-4">
        Blue shutter wipes away to reveal — scroll past &amp; back to replay
      </p>
    </div>
  );
}

// ─── 05: Mini Carousel ───────────────────────────────────────────────────────

const CAROUSEL_SLIDES = [
  { icon: "✦", label: "Spring Physics",  desc: "Natural, satisfying motion" },
  { icon: "◈", label: "Snap Points",     desc: "Precise per-slide snapping"  },
  { icon: "⟳", label: "Infinite Loop",   desc: "Seamless wrap-around"        },
];

function MiniCarousel() {
  const [idx, setIdx] = useState(0);
  const n = CAROUSEL_SLIDES.length;
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border border-white/8 bg-white/[0.02]">
        <motion.div className="flex"
          animate={{ x: `-${idx * 100}%` }}
          transition={{ type: "spring", stiffness: 280, damping: 30 }}
        >
          {CAROUSEL_SLIDES.map((slide, i) => (
            <div key={i} className="min-w-full px-4 py-6 flex flex-col items-center gap-2 text-center">
              <span className="text-3xl text-blue-500">{slide.icon}</span>
              <p className="font-semibold text-white text-sm">{slide.label}</p>
              <p className="text-xs text-white/45">{slide.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex items-center justify-between mt-3 px-1">
        <button onClick={() => setIdx((i) => (i - 1 + n) % n)}
          className="text-white/35 hover:text-white transition-colors text-sm px-1">← Prev</button>
        <div className="flex gap-1.5 items-center">
          {CAROUSEL_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`rounded-full transition-all duration-300 ${i === idx ? "w-6 h-1.5 bg-blue-500" : "w-1.5 h-1.5 bg-white/20"}`}
            />
          ))}
        </div>
        <button onClick={() => setIdx((i) => (i + 1) % n)}
          className="text-white/35 hover:text-white transition-colors text-sm px-1">Next →</button>
      </div>
    </div>
  );
}

// ─── 06: Micro-interactions ───────────────────────────────────────────────────

function MicroButton({ label, variant }: { label: string; variant: "scale" | "glow" | "ripple" }) {
  const [rippling, setRippling] = useState(false);
  const extra =
    variant === "scale" ? { whileHover: { scale: 1.06 }, whileTap: { scale: 0.93 } } :
    variant === "glow"  ? { whileHover: { boxShadow: "0 0 22px rgba(37,99,235,0.7)" } } : {};

  return (
    <motion.button
      className="relative w-full py-2.5 px-4 rounded-lg border border-white/10 bg-white/[0.03] text-sm text-white/65 text-left overflow-hidden hover:text-white hover:border-blue-500/40 transition-colors duration-200"
      {...extra}
      onClick={() => { if (variant === "ripple") { setRippling(true); setTimeout(() => setRippling(false), 650); } }}
    >
      {label}
      {variant === "ripple" && rippling && (
        <motion.span className="absolute inset-0 bg-blue-500/20 rounded-lg origin-center"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2.8, opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
}

// ─── 07: Horizontal Scroll Section (scroll-jacked) ───────────────────────────
// A tall container with a sticky viewport. Scrolling DOWN moves content RIGHT→LEFT.

const H_PANELS = [
  {
    num: "01",
    title: "You're scrolling down.",
    sub: "The page is moving sideways. This is scroll-jacked horizontal navigation — built with sticky positioning and scroll progress mapped to translateX.",
    accent: "rgba(37,99,235,0.15)",
  },
  {
    num: "02",
    title: "Every pixel intentional.",
    sub: "Smooth scroll libraries like Lenis combined with Framer Motion's useScroll give precise, buttery control over how animation ties to user input.",
    accent: "rgba(99,102,241,0.15)",
  },
  {
    num: "03",
    title: "Not a gimmick.",
    sub: "Horizontal sections work when they serve the content — product timelines, feature reveals, story-driven pages. The tech enables the vision.",
    accent: "rgba(37,99,235,0.12)",
  },
  {
    num: "04",
    title: "This is what I build.",
    sub: "Interactions like this, made to feel effortless. Scroll back up to keep exploring — or reach out and let's make something together.",
    accent: "rgba(15,23,42,0.6)",
  },
];

function HorizontalScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 4 panels → track moves 0 to -300vw
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-300vw"]);
  const smoothX = useSpring(x, { stiffness: 80, damping: 20, restDelta: 0.001 });

  // Scroll hint arrow opacity fades as user starts scrolling
  const arrowOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    // Tall outer container creates the scroll distance
    <div ref={containerRef} style={{ height: "500vh" }}>
      {/* Sticky inner viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: arrowOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-xs text-white/40 uppercase tracking-widest">scroll down</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>

        {/* Moving track */}
        <motion.div className="flex h-full" style={{ x: smoothX, width: "400vw" }}>
          {H_PANELS.map((panel, i) => (
            <div
              key={i}
              className="w-screen h-full flex-shrink-0 flex items-center justify-center px-12 relative border-r border-white/5"
              style={{ background: `radial-gradient(ellipse at center, ${panel.accent}, transparent 70%)` }}
            >
              {/* Panel number */}
              <span
                className="absolute top-12 left-12 text-xs font-mono text-white/20 uppercase tracking-widest"
              >
                {panel.num} / {H_PANELS.length.toString().padStart(2, "0")}
              </span>

              {/* Progress dots */}
              <div className="absolute top-12 right-12 flex gap-2">
                {H_PANELS.map((_, j) => (
                  <div
                    key={j}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      j === i ? "w-6 bg-blue-500" : "w-1.5 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <div className="max-w-xl">
                <p className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
                  {panel.title}
                </p>
                <p className="text-white/50 text-lg leading-relaxed">{panel.sub}</p>
              </div>

              {/* Panel edge arrow (not on last) */}
              {i < H_PANELS.length - 1 && (
                <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white/15 text-4xl select-none">
                  →
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Marquee ─────────────────────────────────────────────────────────────────

const MARQUEE_ITEMS = [
  "Framer Motion", "Three.js", "Next.js", "React 19", "Tailwind CSS",
  "TypeScript", "Lenis Scroll", "GSAP", "WebGL", "CSS Animations",
  "Parallax", "Micro-interactions", "3D Transforms", "Scroll Triggers",
  "Interactive UI", "Spring Physics",
];

function MarqueeStrip() {
  return (
    <div className="relative w-full overflow-hidden py-4 select-none">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10 bg-gradient-to-l from-black to-transparent" />
      <motion.div className="flex gap-4 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i}
            className="px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/55 whitespace-nowrap cursor-default hover:border-blue-500/40 hover:text-white/80 transition-colors duration-200"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export default function Capabilities() {
  return (
    <>
      {/* Card grid section */}
      <section id="capabilities" className="py-24">
        <div className="container">
          <FadeInBlock>
            <AnimatedHeading>What I Can Build</AnimatedHeading>
            <p className="mt-4 text-white/50 text-lg max-w-2xl">
              Live demos of the interactive techniques I use across every project — not mockups.
            </p>
          </FadeInBlock>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* 01 — Interactive Cards */}
            <TiltCard className="p-6">
              <p className="text-xs font-mono text-blue-500 mb-5 uppercase tracking-widest">01 / Interactive Cards</p>
              <div className="flex flex-col items-center gap-3 py-3">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-2xl"
                  style={{ transform: "translateZ(24px)" }}>✦</div>
                <p className="text-white/55 text-sm text-center leading-relaxed">
                  3D tilt + dynamic cursor glow — mouse tracking &amp; CSS perspective
                </p>
              </div>
              <p className="text-xs text-white/25 text-center mt-2">← move your cursor around this card</p>
            </TiltCard>

            {/* 02 — Scroll Triggers */}
            <ScrollTriggersCard />

            {/* 03 — Parallax Motion */}
            <FadeInBlock delay={0.08} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-mono text-blue-500 mb-5 uppercase tracking-widest">03 / Parallax Motion</p>
              <ParallaxDemo />
            </FadeInBlock>

            {/* 04 — Reveal Effects */}
            <RevealEffectsCard />

            {/* 05 — Carousels */}
            <FadeInBlock delay={0.16} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-mono text-blue-500 mb-5 uppercase tracking-widest">05 / Carousels</p>
              <MiniCarousel />
              <p className="text-xs text-white/25 text-center mt-4">spring-animated, dot-controlled</p>
            </FadeInBlock>

            {/* 06 — Micro-interactions */}
            <FadeInBlock delay={0.2} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-mono text-blue-500 mb-5 uppercase tracking-widest">06 / Micro-interactions</p>
              <div className="flex flex-col gap-3">
                <MicroButton label="Scale on press" variant="scale" />
                <MicroButton label="Glow on hover" variant="glow" />
                <MicroButton label="Ripple on click" variant="ripple" />
              </div>
              <p className="text-xs text-white/25 text-center mt-4">click each button</p>
            </FadeInBlock>
          </div>

          {/* Marquee */}
          <FadeInBlock className="mt-16">
            <p className="text-xs font-mono text-white/25 uppercase tracking-widest mb-4 text-center">
              Technologies &amp; Techniques
            </p>
            <MarqueeStrip />
          </FadeInBlock>
        </div>
      </section>

      {/* Horizontal scroll-jacked section — full width, outside container */}
      <HorizontalScrollSection />
    </>
  );
}
