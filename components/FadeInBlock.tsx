"use client";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function FadeInBlock({ children, delay = 0, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay }}
      viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
