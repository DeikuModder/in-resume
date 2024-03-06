import useCVInfo from "@/hooks/useCVInfo";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Hero = () => {
  const { cvInfo, setCvInfo } = useCVInfo();

  const handleDeleteImage = () => {
    setCvInfo({ ...cvInfo, pictureUrl: "" });
  };

  return (
    <header className="mb-4" id="hero-header">
      <div className="flex gap-12">
        <h3 className="text-5xl font-bold mb-2 w-fit">
          {cvInfo.name ? cvInfo.name : "Type your name here"}
        </h3>

        {cvInfo?.pictureUrl && (
          <div>
            <img
              src={cvInfo.pictureUrl}
              alt="Profile"
              className=" aspect-square w-[150px] object-contain "
            />
            <button
              onClick={handleDeleteImage}
              className="hideOnPrint relative right-0 top-0 text-2xl font-bold opacity-20 hover:opacity-100"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        )}
      </div>

      <h3 className="text-4xl">
        {cvInfo.role ? cvInfo.role : "Your role here"}
      </h3>
      <p className="text-lg text-neutral-800">
        {cvInfo.address ? cvInfo.address : "Address"}
      </p>

      <div className="flex gap-4 text-neutral-800">
        <p>{cvInfo.email ? cvInfo.email : "yourmail@example.com"}</p>
        <p>{cvInfo.phone ? cvInfo.phone : "+55 55555"}</p>
        <a href={cvInfo.linkedinUrl} target="_blank">
          {cvInfo.linkedinUrl ? cvInfo.linkedinUrl : ""}
        </a>
        <a href={cvInfo.gitHubUrl} target="_blank">
          {cvInfo.gitHubUrl ? cvInfo.gitHubUrl : ""}
        </a>
      </div>
    </header>
  );
};

export default Hero;
