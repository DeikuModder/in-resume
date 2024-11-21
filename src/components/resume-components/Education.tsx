import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import DeleteButton from "../DeleteButton";
import { useTranslation } from "react-i18next";
import { Orientation } from "@/src/type";

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

  const handleDelete = (index: number) => {
    const newCv = { ...cvInfo };
    newCv.education.splice(index, 1);
    setCvInfo(newCv);
  };

  return (
    <>
      {cvInfo.education.length <= 0 ? (
        <></>
      ) : (
        <Section
          sectionTitle={t("education.title")}
          sectionId="education-section"
          margin={margin}
          additionClass={additionClass}
        >
          <ul className={`${fontSize}`}>
            {cvInfo.education.map((insitution, index) => {
              return (
                <li
                  className={`${margin} ${
                    border && "border border-neutral-500 p-2"
                  } rounded-lg flex ${orientation}`}
                  key={`education-${index}`}
                >
                  <div className={`flex ${titleOrientation}`}>
                    <h3
                      className={`text-base font-semibold ${
                        titleOrientation === "flex-row" && "w-[50%]"
                      }`}
                    >
                      {insitution.institution_name}
                    </h3>
                    <p
                      className={`${
                        titleOrientation === "flex-row" && "w-[50%] text-end"
                      }`}
                    >
                      {insitution.start_date}-
                      {insitution.end_date
                        ? insitution.end_date
                        : t("end-date-fallback")}
                    </p>
                    <DeleteButton handleDelete={handleDelete} index={index} />
                  </div>
                  <p>{insitution.title}</p>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </>
  );
};

export default Education;
