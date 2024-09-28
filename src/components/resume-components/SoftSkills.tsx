import useCVInfo from "@/hooks/useCVInfo";
import { useTranslation } from "react-i18next";
import Section from "../Section";
import { Orientation } from "@/src/type";
import DeleteButton from "../DeleteButton";

const SoftSkills = ({
  border,
  orientation,
  titleOrientation,
}: {
  border?: boolean;
  orientation?: Orientation;
  titleOrientation?: Orientation;
}) => {
  const { cvInfo, setCvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  const handleDelete = (index: number) => {
    const newCv = { ...cvInfo };
    newCv.softSkills.splice(index, 1);
    setCvInfo(newCv);
  };

  return (
    <>
      {cvInfo.softSkills.length <= 0 ? (
        <></>
      ) : (
        <Section
          sectionTitle={t("soft-skills.title")}
          sectionId="soft-skills-section"
        >
          <ul>
            {cvInfo.softSkills.map((skill, index) => {
              return (
                <li
                  className={`mb-8 ${
                    border && "border border-neutral-500 p-2"
                  } rounded-lg flex ${orientation}`}
                  key={`softSkill-${index}`}
                >
                  <div className={`flex ${titleOrientation}`}>
                    <h3
                      className={`text-lg font-semibold ${
                        titleOrientation === "flex-row" && "w-[50%]"
                      }`}
                    >
                      {skill.name}
                    </h3>
                    <DeleteButton handleDelete={handleDelete} index={index} />
                  </div>
                  <p>{skill.description}</p>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </>
  );
};

export default SoftSkills;