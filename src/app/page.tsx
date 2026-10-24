import Desktop from "@/components/desktop/Desktop";
import Intro from "@/components/sections/Intro";
import Projects from "@/components/sections/Projects";
import Journey from "@/components/sections/Journey";
import Achievements from "@/components/sections/Achievements";
import Skills from "@/components/sections/Skills";
import Offscreen from "@/components/sections/Offscreen";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Desktop />
      <Intro />
      <Projects />
      <Journey />
      <Achievements />
      <Skills />
      <Offscreen />
      <Contact />
    </>
  );
}
