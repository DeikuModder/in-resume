import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import DeleteButton from "../DeleteButton";
import { useTranslation } from "react-i18next";

const Language = ({ border }: { border?: boolean }) => {
  const { cvInfo, setCvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  const handleDeleteLanguage = (index: number) => {
    const newCv = { ...cvInfo };
    newCv.languages.splice(index, 1);
    setCvInfo(newCv);
  };

  return (
    <>
      {cvInfo.languages.length <= 0 ? (
        <></>
      ) : (
        <Section
          sectionTitle={t("languages.title")}
          sectionId="Languages-section"
        >
          <ul className="flex gap-8 list-none">
            {cvInfo.languages.map((language, index) => {
              return (
                <li
                  className={`mb-2 ${
                    border && "border border-neutral-500"
                  } p-2 w-[120px] rounded-lg`}
                  key={`Language-${index}`}
                >
                  <div className="flex gap-2">
                    <h4 className="text-lg font-semibold">
                      {language.languageName}
                    </h4>
                    <DeleteButton
                      handleDelete={handleDeleteLanguage}
                      index={index}
                    />
                  </div>
                  <p>{language.level}</p>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </>
  );
};

export default Language;
