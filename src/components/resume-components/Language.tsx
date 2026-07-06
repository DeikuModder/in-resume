import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import DeleteButton from "../DeleteButton";
import { useTranslation } from "react-i18next";
import EditableText from "@/components/editable/EditableText";
import AddButton from "@/components/editable/AddButton";
import { Languages as LangType } from "@/src/type";

const Language = ({
  border,
  fontSize,
  margin,
  additionClass,
}: {
  border?: boolean;
  fontSize?: string;
  margin?: string;
  additionClass?: string;
}) => {
  const { cvInfo, setCvInfo, hideSection } = useCVInfo();
  const { t } = useTranslation("global");

  if ((cvInfo.hiddenSections ?? []).includes("Languages-section")) return null;

  const updateLang = (index: number, field: keyof LangType, value: string) => {
    const newLangs = [...cvInfo.languages];
    newLangs[index] = { ...newLangs[index], [field]: value };
    setCvInfo({ ...cvInfo, languages: newLangs });
  };

  const handleDelete = (index: number) => {
    const newLangs = [...cvInfo.languages];
    newLangs.splice(index, 1);
    setCvInfo({ ...cvInfo, languages: newLangs });
  };

  const handleAdd = () => {
    setCvInfo({
      ...cvInfo,
      languages: [...cvInfo.languages, { languageName: "", level: "" }],
    });
  };

  return (
    <Section
      sectionTitle={t("languages.title")}
      sectionId="Languages-section"
      margin={margin}
      additionClass={`${additionClass ?? ""} ${cvInfo.languages.length === 0 ? "print:hidden" : ""}`}
      onHide={() => hideSection("Languages-section")}
    >
      <ul className={`flex gap-8 list-none ${fontSize}`}>
        {cvInfo.languages.map((language, index) => (
          <li
            className={`mb-2 ${border && "border border-neutral-500 p-2"} w-[120px] rounded-lg`}
            key={`Language-${index}`}
          >
            <div className="flex items-center gap-2">
              <EditableText
                tag="h4"
                value={language.languageName}
                onChange={(v) => updateLang(index, "languageName", v)}
                placeholder="Language"
                className="text-lg font-semibold flex-1"
              />
              <DeleteButton handleDelete={handleDelete} index={index} />
            </div>
            <EditableText
              value={language.level}
              onChange={(v) => updateLang(index, "level", v)}
              placeholder="Level"
            />
          </li>
        ))}
      </ul>
      <AddButton onClick={handleAdd} label={t("languages.add")} />
    </Section>
  );
};

export default Language;
