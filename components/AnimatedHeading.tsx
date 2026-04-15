"use client";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function AnimatedHeading({ children, className }: Props) {
  return (
    <div className={className}>
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-extrabold tracking-wide text-white"
      >
        {children}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="h-[2px] mt-3 bg-[color:var(--highlight-blue)] origin-left"
      />
    </div>
  );
}
