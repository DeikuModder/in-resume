import useCVInfo from "@/hooks/useCVInfo";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { cvInfo, setCvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  const handleDeleteImage = () => {
    setCvInfo({ ...cvInfo, pictureUrl: "" });
  };

  return (
    <header className="mb-4 flex justify-between" id="hero-header">
      <div className="flex flex-col">
        <h3 className="text-5xl font-bold mb-2 w-fit">
          {cvInfo.name ? cvInfo.name : t("personal-information.fallback-name")}
        </h3>

        <h3 className="text-4xl">
          {cvInfo.role ? cvInfo.role : t("personal-information.fallback-role")}
        </h3>
        <p className="text-lg text-neutral-800">
          {cvInfo.address
            ? cvInfo.address
            : t("personal-information.fallback-address")}
        </p>

        <div className="flex gap-4 text-neutral-800">
          <p>
            {cvInfo.email
              ? cvInfo.email
              : t("personal-information.fallback-email")}
          </p>
          <p>
            {cvInfo.phone
              ? cvInfo.phone
              : t("personal-information.fallback-phone")}
          </p>
          <a href={cvInfo.linkedinUrl} target="_blank">
            {cvInfo.linkedinUrl ? cvInfo.linkedinUrl : ""}
          </a>
          <a href={cvInfo.gitHubUrl} target="_blank">
            {cvInfo.gitHubUrl ? cvInfo.gitHubUrl : ""}
          </a>
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
