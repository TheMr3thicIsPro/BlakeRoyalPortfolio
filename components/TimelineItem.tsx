"use client";
import { motion } from "framer-motion";

type Props = {
  title: string;
  side: "left" | "right";
};

export default function TimelineItem({ title, side }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative flex items-center gap-4 py-6"
    >
      <div className="w-3 h-3 rounded-full bg-[color:var(--highlight-blue)] shadow-[0_0_12px_var(--hover-glow)]" />
      <p className="text-gray-300">{title}</p>
    </motion.div>
  );
}
