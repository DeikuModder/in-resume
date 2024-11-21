import AboutMe from "../resume-components/AboutMe";
import Education from "../resume-components/Education";
import Experience from "../resume-components/Experience";
import Language from "../resume-components/Language";
import Projects from "../resume-components/Projects";
import Certificates from "../resume-components/Certificates";
import SoftSkills from "../resume-components/SoftSkills";
import Title from "../resume-components/Title";
import Contact from "../resume-components/Contact";

const BasicDesign2 = () => {
  return (
    <div className="sm:w-[800px] p-4 tracking-wide">
      <Title
        extraStyle="w-full items-center justify-center poppins-bold tracking-wider"
        extraStyleTitle="text-4xl"
        orientation="flex-col"
        extraStyleSubTitle="text-2xl poppins-light"
      />
      <Contact extraStyle="justify-center items-center" />
      <AboutMe
        fontSize="text-sm poppins-light"
        additionClass="border-b border-black poppins-semibold text-xl"
        margin="mb-4"
      />
      <Experience
        fontSize="text-sm px-4 poppins-light"
        margin="mb-4"
        additionClass="border-b border-black poppins-semibold text-xl"
      />
      <Education
        titleOrientation="flex-row"
        orientation="flex-col"
        fontSize="text-sm px-4 poppins-light"
        margin="mb-4"
        additionClass="border-b border-black poppins-semibold text-xl"
      />
      <Certificates
        titleOrientation="flex-row"
        orientation="flex-col"
        fontSize="text-sm px-4 poppins-light"
        margin="mb-4"
        additionClass="border-b border-black poppins-semibold text-xl"
      />
      <Language
        fontSize="text-sm px-4 poppins-light"
        margin="mb-4"
        additionClass="border-b border-black poppins-semibold text-xl"
      />
      <Projects
        fontSize="text-sm poppins-light"
        margin="mb-4"
        additionClass="border-b border-black poppins-semibold text-xl"
      />
      <SoftSkills
        orientation="flex-col"
        fontSize="text-sm px-4 poppins-light"
        margin="mb-4"
        additionClass="border-b border-black poppins-semibold text-xl"
      />
    </div>
  );
};

export default BasicDesign2;
