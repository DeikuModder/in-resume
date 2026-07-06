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
  const { cvInfo, setCvInfo, hideSection } = useCVInfo();
  const { t } = useTranslation("global");

  if ((cvInfo.hiddenSections ?? []).includes("about-me-section")) return null;

  return (
    <Section
      sectionId="about-me-section"
      sectionTitle={t("about-me.title")}
      additionClass={additionClass}
      margin={margin}
      onHide={() => hideSection("about-me-section")}
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
