import useCVInfo from "@/hooks/useCVInfo";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AboutMe from "../resume-components/AboutMe";
import Experience from "../resume-components/Experience";
import Skills from "../resume-components/Skills";
import Contact from "../resume-components/Contact";
import Education from "../resume-components/Education";
import Certificates from "../resume-components/Certificates";
import Language from "../resume-components/Language";
import Title from "../resume-components/Title";
import Projects from "../resume-components/Projects";

const AltDesign = () => {
  const { cvInfo, setCvInfo } = useCVInfo();

  const handleDeleteImage = () => {
    setCvInfo({ ...cvInfo, pictureUrl: "" });
  };

  return (
    <div className="w-[100%] flex min-h-[100dvh] sm:w-[1000px]">
      <div className="w-[35%] bg-blue-950 p-12 text-neutral-50">
        <div className="flex items-center mb-4">
          {cvInfo?.pictureUrl && (
            <figure className="w-[200px]">
              <img
                src={cvInfo.pictureUrl}
                alt="Profile"
                className="aspect-square w-full object-cover rounded-full"
              />
              <button
                onClick={handleDeleteImage}
                className="hideOnPrint relative right-0 top-0 text-2xl font-bold opacity-20 hover:opacity-100"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </figure>
          )}
        </div>

        <div className="border-b-2 border-neutral-500 border-dashed mb-4">
          <Contact title={true} orientation="flex-col" font="text-md" />
        </div>

        <div className="border-b-2 border-neutral-500 border-dashed mb-4">
          <Education orientation="flex-col" titleOrientation="flex-col" />
        </div>

        <div className="border-b-2 border-neutral-500 border-dashed mb-4">
          <Certificates orientation="flex-col" titleOrientation="flex-col" />
        </div>
      </div>
      <div className="w-[65%] pt-12">
        <div className="bg-neutral-100 p-4">
          <Title orientation="flex-col" />
        </div>

        <div className="p-12">
          <AboutMe />
          <Projects />
          <Experience />
          <Language />
          <Skills />
        </div>
      </div>
    </div>
  );
};

export default AltDesign;
