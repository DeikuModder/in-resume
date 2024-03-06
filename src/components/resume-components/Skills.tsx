import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import SkillsMenu from "./SkillsMenu";
import DeleteButton from "../DeleteButton";
import SkillsObj from "./skills/index";

const Skills = () => {
  const { cvInfo, setCvInfo } = useCVInfo();

  const handleRemoveSkill = (index: number) => {
    const newCv = { ...cvInfo };
    newCv.skills.splice(index, 1);
    setCvInfo(newCv);
  };

  return (
    <Section
      sectionTitle="Skills"
      sectionId="skills-section"
      additionClass={`${cvInfo.skills.length <= 0 && "hideOnPrint"}`}
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
