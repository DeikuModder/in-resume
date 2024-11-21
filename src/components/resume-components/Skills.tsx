import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import SkillsMenu from "./SkillsMenu/SkillsMenu";
import DeleteButton from "../DeleteButton";
import SkillsObj from "./skills/index";
import { useTranslation } from "react-i18next";

const Skills = ({ margin }: { margin?: string }) => {
  const { cvInfo, setCvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  const handleRemoveSkill = (index: number) => {
    const newCv = { ...cvInfo };
    newCv.skills.splice(index, 1);
    setCvInfo(newCv);
  };

  return (
    <Section
      sectionTitle={t("skills.title")}
      sectionId="skills-section"
      additionClass={`${cvInfo.skills.length <= 0 && "hideOnPrint"}`}
      margin={margin}
    >
      <ul className="inline-flex flex-wrap gap-4 list-none">
        {cvInfo.skills.map((name, index) => {
          const Icon = SkillsObj[name];

          return (
            <div>
              <li key={`skills-${name}`}>{Icon && <Icon />}</li>
              <DeleteButton
                handleDelete={handleRemoveSkill}
                index={index}
                key={`delete-skill-${name}`}
              />
            </div>
          );
        })}
        <SkillsMenu />
      </ul>
    </Section>
  );
};

export default Skills;
