import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import DeleteButton from "../DeleteButton";
import { useTranslation } from "react-i18next";
import { Orientation } from "@/src/type";
import EditableText from "@/components/editable/EditableText";
import AddButton from "@/components/editable/AddButton";
import { Education as EducationType } from "@/src/type";

const Education = ({
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

  const updateEntry = (
    index: number,
    field: keyof EducationType,
    value: string,
  ) => {
    const newEdu = [...cvInfo.education];
    newEdu[index] = { ...newEdu[index], [field]: value };
    setCvInfo({ ...cvInfo, education: newEdu });
  };

  const handleDelete = (index: number) => {
    const newEdu = [...cvInfo.education];
    newEdu.splice(index, 1);
    setCvInfo({ ...cvInfo, education: newEdu });
  };

  const handleAdd = () => {
    setCvInfo({
      ...cvInfo,
      education: [
        ...cvInfo.education,
        { institution_name: "", title: "", start_date: "", end_date: "" },
      ],
    });
  };

  return (
    <Section
      sectionTitle={t("education.title")}
      sectionId="education-section"
      margin={margin}
      additionClass={`${additionClass ?? ""} ${cvInfo.education.length === 0 ? "print:hidden" : ""}`}
    >
      <ul className={`${fontSize}`}>
        {cvInfo.education.map((institution, index) => (
          <li
            className={`${margin} ${border && "border border-neutral-500 p-2"} rounded-lg flex ${orientation}`}
            key={`education-${index}`}
          >
            <div className={`flex ${titleOrientation}`}>
              <EditableText
                tag="h3"
                value={institution.institution_name}
                onChange={(v) => updateEntry(index, "institution_name", v)}
                placeholder="Institution name"
                className={`text-base font-semibold ${titleOrientation === "flex-row" ? "w-[50%]" : ""}`}
              />
              <div
                className={`flex items-center gap-1 text-sm ${titleOrientation === "flex-row" ? "w-[50%] justify-end" : ""}`}
              >
                <EditableText
                  value={institution.start_date}
                  onChange={(v) => updateEntry(index, "start_date", v)}
                  placeholder="Start"
                />
                {" – "}
                <EditableText
                  value={institution.end_date}
                  onChange={(v) => updateEntry(index, "end_date", v)}
                  placeholder={t("end-date-fallback")}
                />
              </div>
              <DeleteButton handleDelete={handleDelete} index={index} />
            </div>
            <EditableText
              value={institution.title}
              onChange={(v) => updateEntry(index, "title", v)}
              placeholder="Degree / certificate title"
            />
          </li>
        ))}
      </ul>
      <AddButton onClick={handleAdd} label={t("education.add")} />
    </Section>
  );
};

export default Education;
