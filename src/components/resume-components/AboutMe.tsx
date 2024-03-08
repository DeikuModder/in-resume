import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import { useTranslation } from "react-i18next";

const AboutMe = () => {
  const { cvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  return (
    <Section sectionId="about-me-section" sectionTitle={t("about-me.title")}>
      <p>
        {cvInfo.aboutMe
          ? cvInfo.aboutMe
          : "(Put a brief description about you here) Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus suscipit cum dolore recusandae. Labore doloremque eligendi sequi accusamus ullam, illum nam debitis nobis? Eveniet, id. Maxime optio quidem velit repellendus."}
      </p>
    </Section>
  );
};

export default AboutMe;
