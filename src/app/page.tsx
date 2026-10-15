import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhatIDo from "@/components/WhatIDo";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Achievements from "@/components/Achievements";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <div id="expertise" className="scroll-mt-20">
          <WhatIDo />
          <Skills />
        </div>
        <Projects />
        <div id="journey" className="scroll-mt-20">
          <Achievements />
          <Experience />
          <Education />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
