import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import { useTranslation } from "react-i18next";
import EditableTextArea from "@/components/editable/EditableTextArea";

const AboutMe = ({
  fontSize,
  additionClass,
  margin,
}: {
  fontSize?: string;
  additionClass?: string;
  margin?: string;
}) => {
  const { cvInfo, setCvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  return (
    <Section
      sectionId="about-me-section"
      sectionTitle={t("about-me.title")}
      additionClass={additionClass}
      margin={margin}
    >
      <EditableTextArea
        value={cvInfo.aboutMe}
        onChange={(v) => setCvInfo({ ...cvInfo, aboutMe: v })}
        placeholder={t("about-me.default-text")}
        className={`${fontSize} text`}
      />
    </Section>
  );
};

export default AboutMe;
