import AboutMe from "../resume-components/AboutMe";
import Education from "../resume-components/Education";
import Experience from "../resume-components/Experience";
import Hero from "../resume-components/Hero";
import Projects from "../resume-components/Projects";

const BasicDesign = () => {
  return (
    <div className="w-[800px] h-[100%] p-12">
      <Hero />
      <AboutMe />
      <Experience />
      <Education />
      <Projects />
    </div>
  );
};

export default BasicDesign;
