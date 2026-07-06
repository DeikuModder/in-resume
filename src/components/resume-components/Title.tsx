import useCVInfo from "@/hooks/useCVInfo";
import { Orientation } from "@/src/type";
import { useTranslation } from "react-i18next";
import EditableText from "@/components/editable/EditableText";

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
    <div className={`flex ${orientation} ${extraStyle}`}>
      <EditableText
        tag="h3"
        value={cvInfo.name}
        onChange={(v) => setCvInfo({ ...cvInfo, name: v })}
        placeholder={t("personal-information.fallback-name")}
        className={`font-bold mb-2 w-fit ${extraStyleTitle}`}
      />
      <EditableText
        tag="h3"
        value={cvInfo.role}
        onChange={(v) => setCvInfo({ ...cvInfo, role: v })}
        placeholder={t("personal-information.fallback-role")}
        className={extraStyleSubTitle}
      />
    </div>
  );
};

export default Title;
