import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";

const AboutMe = () => {
  const { cvInfo } = useCVInfo();

  return (
    <Section sectionId="about-me-section" sectionTitle="About me">
      <p>
        {cvInfo.aboutMe
          ? cvInfo.aboutMe
          : "(Put a brief description about you here) Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus suscipit cum dolore recusandae. Labore doloremque eligendi sequi accusamus ullam, illum nam debitis nobis? Eveniet, id. Maxime optio quidem velit repellendus."}
      </p>
    </Section>
  );
};

export default AboutMe;
