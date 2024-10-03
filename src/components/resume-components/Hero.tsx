import useCVInfo from "@/hooks/useCVInfo";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "./Title";
import Contact from "./Contact";

const Hero = () => {
  const { cvInfo, setCvInfo } = useCVInfo();

  const handleDeleteImage = () => {
    setCvInfo({ ...cvInfo, pictureUrl: "" });
  };

  return (
    <header className="mb-4 flex justify-between" id="hero-header">
      <div className="flex flex-col w-full">
        <Title orientation="flex-col" />
        <div className="w-[80%]">
          <Contact font="text-sm" orientation="flex-wrap" />
        </div>
      </div>
      {cvInfo?.pictureUrl && (
        <figure>
          <img
            src={cvInfo.pictureUrl}
            alt="Profile"
            className=" aspect-square w-[128px] object-cover rounded-md"
          />
          <button
            onClick={handleDeleteImage}
            className="hideOnPrint relative right-0 top-0 text-2xl font-bold opacity-20 hover:opacity-100"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </figure>
      )}
    </header>
  );
};

export default Hero;
