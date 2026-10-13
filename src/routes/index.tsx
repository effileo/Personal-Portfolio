import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About, Education, Experience } from "@/components/portfolio/Sections";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { Skills } from "@/components/portfolio/SkillsMarquee";
import { Contact } from "@/components/portfolio/Contact";

const title = "Fita Alemayehu | Full-Stack Software Engineer";
const description =
  "Portfolio of Fita Alemayehu, a full-stack software engineer in Addis Ababa building web, mobile, and backend systems with a focus on practical performance.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <ProjectShowcase />
        <Skills />
        <Education />
        <Contact />
      </main>
    </>
  );
}
