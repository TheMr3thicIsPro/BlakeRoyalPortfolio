"use client";
import { useEffect, useState } from "react";

type Props = {
  text?: string;
  speedMs?: number;
  className?: string;
};

export default function CodeColorTyping({ text = "Blake Royal", speedMs = 60, className }: Props) {
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reset = setTimeout(() => {
      setIdx(0);
      setDone(false);
    }, 0);
    let mounted = true;
    const t = setInterval(() => {
      if (!mounted) return;
      setIdx((v) => {
        if (v >= text.length) {
          clearInterval(t);
          setDone(true);
          return v;
        }
        return v + 1;
      });
    }, speedMs);
    return () => {
      mounted = false;
      clearInterval(t);
      clearTimeout(reset);
    };
  }, [text, speedMs]);

  const segments = [
    { start: 0, end: 5, className: "tok-var" }, // "Blake"
    { start: 5, end: 6, className: "" }, // space
    { start: 6, end: 11, className: "tok-string" }, // "Royal"
  ];

  const spans: React.ReactNode[] = [];
  for (const seg of segments) {
    const s = seg.start;
    const e = seg.end;
    const rs = s;
    const re = Math.min(e, idx);
    if (re > rs) {
      spans.push(
        <span key={s} className={seg.className}>
          {text.slice(rs, re)}
        </span>
      );
    }
  }

  return (
    <div className={`relative inline-block ${className || ""}`}>
      <span className="text-white">{spans}</span>
      {!done && <span className="caret" />}
    </div>
  );
}
