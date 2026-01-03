import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Projects } from "../components/Projects";
import { Skills } from "../components/Skills";
import { Writing } from "../components/Writing";
import { Contact } from "../components/Contact";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Ashish | Systems Engineer" },
    { name: "description", content: "Personal portfolio and engineering logs." },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Writing />
      <Contact />
    </>
  );
}
