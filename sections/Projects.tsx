"use client";
import ProjectShowcase from "../components/ProjectShowcase";
import FadeInBlock from "../components/FadeInBlock";

export default function Projects() {
  return (
    <div id="projects">
      <FadeInBlock>
        <ProjectShowcase
        title="VibeSchool"
        icon="/globe.svg"
        url="https://vibeschool.vercel.app"
        description="VibeSchool is a concept platform focused on teaching practical AI-assisted development in a structured, beginner-friendly way. The project explores how modern tools can accelerate learning while still encouraging foundational understanding. It demonstrates landing page architecture, structured content hierarchy, and interactive UI components designed to maintain engagement."
        bullets={[
          "Branded, scalable concept platform",
          "Strong visual identity and educational positioning",
        ]}
        />
      </FadeInBlock>
      <FadeInBlock delay={0.1}>
        <ProjectShowcase
        title="ZombieKiller6032"
        icon="/projects/roblox.svg"
        url="https://zombiekiller6032.pages.dev"
        description="ZombieKiller6032 is an experimental game concept project focused on mechanics, interaction, and player engagement. It explores how lightweight web technologies can be used to prototype gameplay systems directly in the browser."
        bullets={[
          "Game development interest and prototyping",
          "Logic structuring and interactive design",
        ]}
        />
      </FadeInBlock>
      <FadeInBlock delay={0.2}>
        <ProjectShowcase
        title="Twin City Home & Garden"
        icon="/shop.svg"
        url="https://twincityhomegarden.pages.dev"
        description="Twin City Home & Garden is a small business website concept built to simulate a real-world client scenario. The focus was on clean layout, service clarity, and strong call-to-action placement."
        bullets={[
          "Business outcomes over aesthetics",
          "Usability, trust-building, conversion-focused structure",
        ]}
        />
      </FadeInBlock>
      <FadeInBlock delay={0.3}>
        <ProjectShowcase
        title="YourSiteCoded"
        icon="/window.svg"
        url="https://yoursitecoded.pages.dev"
        description="YourSiteCoded is a concept brand exploring modern web development services. The project focuses on strong positioning, bold messaging, and structured information hierarchy."
        bullets={[
          "Brand identity development",
          "Persuasive layout and scalable landing architecture",
        ]}
        />
      </FadeInBlock>
      <FadeInBlock delay={0.4}>
        <ProjectShowcase
        title="Turtle Project"
        icon="/globe.svg"
        url="https://turtle-project.vercel.app"
        description="The Turtle Project is a creatively themed portfolio concept focused on immersive design and interactive storytelling. It experiments with layered layouts, visual depth, and engaging transitions."
        bullets={[
          "Visually distinctive experiences",
          "Structured design principles with creative theming",
        ]}
        />
      </FadeInBlock>
    </div>
  );
}
