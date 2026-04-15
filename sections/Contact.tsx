"use client";
import { useState } from "react";
import AnimatedHeading from "../components/AnimatedHeading";
import MagneticButton from "../components/MagneticButton";

const EMAIL = "Broyal0110@icloud.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <section id="contact" className="min-h-[70vh] py-24">
      <div className="container">
        <AnimatedHeading>Let’s Build Something.</AnimatedHeading>
        <div className="mt-8 flex items-center gap-6">
          <a
            href={`mailto:${EMAIL}`}
            className="text-white text-xl font-semibold"
          >
            {EMAIL}
          </a>
          <MagneticButton onClick={copyEmail}>
            {copied ? "Copied ✓" : "Copy"}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
