"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function ExperienceLayer() {
  const progressRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.9,
      infinite: false,
      smoothWheel: true,
    });

    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    } catch {}

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const onAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!(target instanceof HTMLAnchorElement)) return;
      const href = target.getAttribute("href") || "";
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        lenis.scrollTo(el, { offset: -80 });
      }
    };
    document.addEventListener("click", onAnchorClick);

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, window.scrollY / h));
      if (progressRef.current) {
        progressRef.current.style.height = `${p * 100}vh`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div ref={progressRef} className="scroll-progress" />
      <div ref={cursorRef} className="cursor-glow" />
    </>
  );
}
