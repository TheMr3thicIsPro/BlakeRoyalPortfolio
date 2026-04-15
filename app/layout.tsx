import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "../components/Nav";
import ExperienceLayer from "../components/ExperienceLayer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "800"],
});

export const metadata: Metadata = {
  title: "Blake Royal – Developer Portfolio",
  description:
    "Professional junior developer portfolio. Minimal, premium, responsive, built with Next.js and TypeScript.",
  metadataBase: new URL("https://blakeroyal.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ExperienceLayer />
        <Nav />
        {children}
      </body>
    </html>
  );
}
