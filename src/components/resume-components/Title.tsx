import useCVInfo from "@/hooks/useCVInfo";
import { Orientation } from "@/src/type";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Title = ({
  orientation,
  extraStyle,
  extraStyleTitle = "text-5xl",
  extraStyleSubTitle = "text-4xl",
}: {
  orientation?: Orientation;
  extraStyle?: string;
  extraStyleTitle?: string;
  extraStyleSubTitle?: string;
}) => {
  const { cvInfo, setCvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  return (
    <>
      <div className={`flex ${orientation} ${extraStyle}`}>
        <h3 className={`font-bold mb-2 w-fit ${extraStyleTitle}`}>
          {cvInfo.name ? cvInfo.name : t("personal-information.fallback-name")}
        </h3>

        <div className="flex items-center">
          <h3 className={`${extraStyleSubTitle}`}>
            {cvInfo.role ? cvInfo.role : ""}
          </h3>
          {cvInfo.role ? (
            <button
              className="hideOnPrint relative right-0 top-0 text-2xl font-bold opacity-20 hover:opacity-100"
              onClick={() => setCvInfo({ ...cvInfo, role: "" })}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Title;
