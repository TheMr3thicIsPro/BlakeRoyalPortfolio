"use client";
import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

export default function MagneticButton({ children, onClick, href }: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
  };

  const className =
    "inline-flex items-center justify-center rounded-full px-6 py-3 bg-[color:var(--highlight-blue)] text-white shadow-[0_0_20px_var(--hover-glow)] transition will-change-transform";

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      type="button"
    >
      {children}
    </button>
  );
}
