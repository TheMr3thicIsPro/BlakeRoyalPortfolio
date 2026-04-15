"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import MagneticButton from "../components/MagneticButton";
import { Playfair_Display } from "next/font/google";
import TypingName from "../components/TypingName";
import type { Mesh } from "three";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-hero",
});

function Polyhedron() {
  const ref = useRef<Mesh>(null);
  useFrame(() => {
    if (ref && ref.current) {
      ref.current.rotation.y += 0.002;
      ref.current.rotation.x += 0.001;
    }
  });
  return (
    <mesh ref={ref} rotation={[0.3, 0.4, 0]}>
      <icosahedronGeometry args={[2.2, 0]} />
      <meshStandardMaterial color="#0f172a" roughness={1} metalness={0} />
    </mesh>
  );
}

export default function Hero() {
  return (
    <section id="hero" className={`relative h-[100vh] flex items-center justify-center overflow-hidden ${playfair.variable}`}>
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          <Polyhedron />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      <div className="container relative z-10 text-center">
        <div className="inline-block relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-[80vw] max-w-[1100px] h-[40vh] bg-[radial-gradient(ellipse_at_center,rgba(37,99,235,0.28),transparent_65%)] blur-3xl opacity-70" />
          </div>
          <h1 className="relative z-10 text-5xl md:text-7xl font-extrabold tracking-wider [font-family:var(--font-hero)]">
            <span className="inline-block rounded-lg bg-black/30 backdrop-blur-sm px-6 py-2">
              <motion.span initial={{ scale: 1, y: 0 }} whileHover={{ scale: 1.02, y: -2 }} transition={{ type: "spring", stiffness: 200, damping: 16 }}>
                <TypingName text="Blake Royal" className="text-3d" />
              </motion.span>
            </span>
          </h1>
        </div>
        <motion.p
          className="mt-6 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Building. Learning. Iterating.
        </motion.p>
        <div className="mt-10">
          <MagneticButton href="#projects">View My Work</MagneticButton>
        </div>
      </div>
    </section>
  );
}
