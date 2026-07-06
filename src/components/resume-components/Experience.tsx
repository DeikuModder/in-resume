import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import DeleteButton from "../DeleteButton";
import { useTranslation } from "react-i18next";
import EditableText from "@/components/editable/EditableText";
import EditableTextArea from "@/components/editable/EditableTextArea";
import AddButton from "@/components/editable/AddButton";
import { Jobs } from "@/src/type";

const Experience = ({
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

  if ((cvInfo.hiddenSections ?? []).includes("experience-section")) return null;

  const updateWork = (index: number, field: keyof Jobs, value: string) => {
    const newExp = [...cvInfo.experience];
    newExp[index] = { ...newExp[index], [field]: value };
    setCvInfo({ ...cvInfo, experience: newExp });
  };

  const handleDelete = (index: number) => {
    const newExp = [...cvInfo.experience];
    newExp.splice(index, 1);
    setCvInfo({ ...cvInfo, experience: newExp });
  };

  const handleAdd = () => {
    setCvInfo({
      ...cvInfo,
      experience: [
        ...cvInfo.experience,
        {
          company_name: "",
          company_link: "",
          role: "",
          summary: "",
          start_date: "",
          end_date: "",
        },
      ],
    });
  };

  return (
    <Section
      sectionTitle={t("experience.title")}
      sectionId="experience-section"
      margin={margin}
      additionClass={`${additionClass ?? ""} ${cvInfo.experience.length === 0 ? "print:hidden" : ""}`}
      onHide={() => hideSection("experience-section")}
    >
      <ul className={`${fontSize}`}>
        {cvInfo.experience.map((work, index) => (
          <li className={`${margin} rounded-lg`} key={`experience-${index}`}>
            <div className="flex items-start gap-1">
              <div className="flex-1">
                <EditableText
                  tag="h3"
                  value={work.company_name}
                  onChange={(v) => updateWork(index, "company_name", v)}
                  placeholder="Company name"
                  className="text-lg font-semibold"
                />
              </div>
              <div className="flex items-center gap-1 text-sm">
                <EditableText
                  value={work.start_date}
                  onChange={(v) => updateWork(index, "start_date", v)}
                  placeholder="Start"
                />
                {" – "}
                <EditableText
                  value={work.end_date}
                  onChange={(v) => updateWork(index, "end_date", v)}
                  placeholder={t("end-date-fallback")}
                />
              </div>
              <DeleteButton handleDelete={handleDelete} index={index} />
            </div>
            <EditableText
              value={work.role}
              onChange={(v) => updateWork(index, "role", v)}
              placeholder="Role / position"
              className="font-semibold"
            />
            <EditableTextArea
              value={work.summary}
              onChange={(v) => updateWork(index, "summary", v)}
              placeholder="Summary of responsibilities and achievements…"
            />
            <EditableText
              value={work.company_link}
              onChange={(v) => updateWork(index, "company_link", v)}
              placeholder="https://company.com (optional)"
              className="text-xs text-neutral-400 hideOnPrint"
            />
          </li>
        ))}
      </ul>
      <AddButton onClick={handleAdd} label={t("experience.add")} />
    </Section>
  );
};

export default Experience;
