"use client";
import AnimatedHeading from "../components/AnimatedHeading";
import Image from "next/image";
import FadeInBlock from "../components/FadeInBlock";

export default function About() {
  return (
    <section id="about" className="min-h-[100vh] py-24">
      <div className="container grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-1">
          <AnimatedHeading>About Me</AnimatedHeading>
          <div className="mt-6 relative rounded-xl overflow-hidden border border-white/10">
            <Image
              src="/headshot.svg"
              alt="Professional headshot"
              width={800}
              height={1000}
              className="w-full h-[360px] object-cover"
              priority
            />
          </div>
        </div>
        <div className="lg:col-span-2 relative">
          <div className="absolute left-0 top-0 h-full w-[2px] bg-white/10" />
          <div className="pl-6">
            <div className="space-y-6 text-gray-300">
              <FadeInBlock>
                <p>
                My name is Blake Royal, a Year 11 student based in Wodonga with a genuine passion for technology, software, and artificial intelligence.
                </p>
              </FadeInBlock>
              <FadeInBlock delay={0.1}>
                <p>
                My journey started two years ago learning Python and experimenting with small Roblox game projects. What began as curiosity quickly evolved into a deep interest in building and understanding systems.
                </p>
              </FadeInBlock>
              <FadeInBlock delay={0.2}>
                <p>
                Around eight months ago, I began leveraging AI-assisted development to rapidly prototype and ship real projects. Since then, I’ve built multiple live websites and game concepts — not just as experiments, but as working products.
                </p>
              </FadeInBlock>
              <FadeInBlock delay={0.3}>
                <p>
                I view AI as a modern development tool, much like frameworks or libraries — powerful when used correctly. My focus is on problem-solving, iteration, and continuous improvement.
                </p>
              </FadeInBlock>
              <FadeInBlock delay={0.4}>
                <p>
                I genuinely enjoy solving technical problems. Not textbook problems — real ones. I’m currently studying Software Development to strengthen my foundations and deepen my understanding of how software works at a lower level.
                </p>
              </FadeInBlock>
              <FadeInBlock delay={0.5}>
                <p>
                I believe failure is feedback. Growth comes from building, testing, refining, and repeating.
                </p>
              </FadeInBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
