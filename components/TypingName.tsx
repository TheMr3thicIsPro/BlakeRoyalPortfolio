"use client";
import { useEffect, useState } from "react";

type Props = {
  text?: string;
  className?: string;
  speedMs?: number;
};

export default function TypingName({
  text = "BLAKE ROYAL",
  className,
  speedMs = 90,
}: Props) {
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let mounted = true;
    const interval = setInterval(() => {
      if (!mounted) return;
      setIdx((v) => {
        if (v >= text.length) {
          clearInterval(interval);
          setDone(true);
          return v;
        }
        return v + 1;
      });
    }, speedMs);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [text, speedMs]);

  const visible = text.slice(0, idx);
  const caret = !done ? <span className="caret" /> : null;

  const letters = visible.split("").map((ch, i) => {
    return (
      <span key={i}>
        {ch}
      </span>
    );
  });

  return (
    <div className={`relative inline-block ${className || ""}`}>
      <span className="text-white">{letters}</span>
      {caret}
    </div>
  );
}
