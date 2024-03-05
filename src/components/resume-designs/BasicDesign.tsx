import AboutMe from "../resume-components/AboutMe";
import Education from "../resume-components/Education";
import Experience from "../resume-components/Experience";
import Hero from "../resume-components/Hero";
import Language from "../resume-components/Language";
import Projects from "../resume-components/Projects";
import Skills from "../resume-components/Skills";
import Certificates from "../resume-components/Certificates";

const BasicDesign = () => {
  return (
    <div className="w-[800px] p-12">
      <Hero />
      <AboutMe />
      <Experience />
      <Education />
      <Certificates />
      <Language />
      <Projects />
      <Skills />
    </div>
  );
};

export default BasicDesign;
