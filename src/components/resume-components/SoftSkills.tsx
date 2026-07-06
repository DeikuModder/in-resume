import useCVInfo from "@/hooks/useCVInfo";
import { useTranslation } from "react-i18next";
import Section from "../Section";
import { Orientation } from "@/src/type";
import DeleteButton from "../DeleteButton";
import EditableText from "@/components/editable/EditableText";
import EditableTextArea from "@/components/editable/EditableTextArea";
import AddButton from "@/components/editable/AddButton";
import { SoftSkill as SoftSkillType } from "@/src/type";

const SoftSkills = ({
  border,
  orientation,
  titleOrientation,
  fontSize,
  margin,
  additionClass,
}: {
  border?: boolean;
  orientation?: Orientation;
  titleOrientation?: Orientation;
  fontSize?: string;
  margin?: string;
  additionClass?: string;
}) => {
  const { cvInfo, setCvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  const updateSkill = (
    index: number,
    field: keyof SoftSkillType,
    value: string,
  ) => {
    const newSkills = [...cvInfo.softSkills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setCvInfo({ ...cvInfo, softSkills: newSkills });
  };

  const handleDelete = (index: number) => {
    const newSkills = [...cvInfo.softSkills];
    newSkills.splice(index, 1);
    setCvInfo({ ...cvInfo, softSkills: newSkills });
  };

  const handleAdd = () => {
    setCvInfo({
      ...cvInfo,
      softSkills: [...cvInfo.softSkills, { name: "", description: "" }],
    });
  };

  return (
    <Section
      sectionTitle={t("soft-skills.title")}
      sectionId="soft-skills-section"
      margin={margin}
      additionClass={`${additionClass ?? ""} ${cvInfo.softSkills.length === 0 ? "print:hidden" : ""}`}
    >
      <ul className={`${fontSize}`}>
        {cvInfo.softSkills.map((skill, index) => (
          <li
            className={`${margin} ${border && "border border-neutral-500 p-2"} rounded-lg flex ${orientation}`}
            key={`softSkill-${index}`}
          >
            <div className={`flex items-center ${titleOrientation}`}>
              <EditableText
                tag="h3"
                value={skill.name}
                onChange={(v) => updateSkill(index, "name", v)}
                placeholder="Skill name"
                className={`text-lg font-semibold ${titleOrientation === "flex-row" ? "w-[50%]" : ""}`}
              />
              <DeleteButton handleDelete={handleDelete} index={index} />
            </div>
            <EditableTextArea
              value={skill.description}
              onChange={(v) => updateSkill(index, "description", v)}
              placeholder="Brief description…"
            />
          </li>
        ))}
      </ul>
      <AddButton onClick={handleAdd} label={t("soft-skills.add")} />
    </Section>
  );
};

export default SoftSkills;
