import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import DeleteButton from "../DeleteButton";
import { useTranslation } from "react-i18next";
import EditableText from "@/components/editable/EditableText";
import EditableTextArea from "@/components/editable/EditableTextArea";
import AddButton from "@/components/editable/AddButton";
import { Projects as ProjectType } from "@/src/type";

const Projects = ({
  fontSize,
  margin,
  additionClass,
}: {
  fontSize?: string;
  margin?: string;
  additionClass?: string;
}) => {
  const { cvInfo, setCvInfo, hideSection } = useCVInfo();
  const { t } = useTranslation("global");

  if ((cvInfo.hiddenSections ?? []).includes("projects-section")) return null;

  const updateProject = (
    index: number,
    field: keyof ProjectType,
    value: string,
  ) => {
    const newProjects = [...cvInfo.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setCvInfo({ ...cvInfo, projects: newProjects });
  };

  const handleDelete = (index: number) => {
    const newProjects = [...cvInfo.projects];
    newProjects.splice(index, 1);
    setCvInfo({ ...cvInfo, projects: newProjects });
  };

  const handleAdd = () => {
    setCvInfo({
      ...cvInfo,
      projects: [
        ...cvInfo.projects,
        { project_name: "", project_link: "", description: "", tags: "" },
      ],
    });
  };

  return (
    <Section
      sectionTitle={t("projects.title")}
      sectionId="projects-section"
      margin={margin}
      additionClass={`${additionClass ?? ""} ${cvInfo.projects.length === 0 ? "print:hidden" : ""}`}
      onHide={() => hideSection("projects-section")}
    >
      <ul className={`inline-flex flex-wrap gap-4 list-none ${fontSize}`}>
        {cvInfo.projects.map((project, index) => (
          <li
            className="mb-8 rounded-lg w-[200px] flex flex-col justify-between gap-2"
            key={`project-${index}`}
          >
            <div className="flex items-start gap-1">
              <EditableText
                tag="h3"
                value={project.project_name}
                onChange={(v) => updateProject(index, "project_name", v)}
                placeholder="Project name"
                className="text-lg font-semibold flex-1"
              />
              <DeleteButton handleDelete={handleDelete} index={index} />
            </div>
            <EditableTextArea
              value={project.description}
              onChange={(v) => updateProject(index, "description", v)}
              placeholder="Description…"
            />
            <EditableText
              value={project.tags}
              onChange={(v) => updateProject(index, "tags", v)}
              placeholder="React, Node, TS…"
              className="bg-neutral-300 min-h-[55px] p-1 rounded-lg text-sm block"
            />
            <EditableText
              value={project.project_link}
              onChange={(v) => updateProject(index, "project_link", v)}
              placeholder="https://github.com/… (optional)"
              className="text-xs text-neutral-400 hideOnPrint"
            />
          </li>
        ))}
      </ul>
      <AddButton onClick={handleAdd} label={t("projects.add")} />
    </Section>
  );
};

export default Projects;
