import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import DeleteButton from "../DeleteButton";
import { useTranslation } from "react-i18next";

const Projects = ({
  fontSize,
  margin,
  additionClass,
}: {
  fontSize?: string;
  margin?: string;
  additionClass?: string;
}) => {
  const { cvInfo, setCvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  const handleDelete = (index: number) => {
    const newCv = { ...cvInfo };
    newCv.projects.splice(index, 1);
    setCvInfo(newCv);
  };

  return (
    <>
      {cvInfo.projects.length <= 0 ? (
        <></>
      ) : (
        <Section
          sectionTitle={t("projects.title")}
          sectionId="projects-section"
          margin={margin}
          additionClass={additionClass}
        >
          <ul className={`inline-flex flex-wrap gap-4 list-none ${fontSize}`}>
            {cvInfo.projects.map((project, index) => {
              return (
                <li
                  className="mb-8 rounded-lg w-[200px] flex flex-col justify-between gap-2"
                  key={`project-${index}`}
                >
                  <div className="flex">
                    <a href={project.project_link} target="_blank">
                      <h3 className="text-lg font-semibold">
                        {project.project_name}
                      </h3>
                    </a>
                    <DeleteButton handleDelete={handleDelete} index={index} />
                  </div>
                  <p>{project.description}</p>
                  <div className="flex gap-2">
                    <p className="bg-neutral-300 min-h-[55px] p-1 rounded-lg">
                      {project.tags}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </>
  );
};

export default Projects;
