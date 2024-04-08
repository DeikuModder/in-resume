import useCVInfo from "@/hooks/useCVInfo";
import { Orientation } from "@/src/type";
import { useTranslation } from "react-i18next";

const Title = ({ orientation }: { orientation?: Orientation }) => {
  const { cvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  return (
    <>
      <div className={`flex ${orientation}`}>
        <h3 className="text-5xl font-bold mb-2 w-fit">
          {cvInfo.name ? cvInfo.name : t("personal-information.fallback-name")}
        </h3>

        <h3 className="text-4xl">
          {cvInfo.role ? cvInfo.role : t("personal-information.fallback-role")}
        </h3>
      </div>
    </>
  );
};

export default Title;
