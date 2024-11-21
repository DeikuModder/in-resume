import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import DeleteButton from "../DeleteButton";
import { useTranslation } from "react-i18next";

const Experience = ({
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
    newCv.experience.splice(index, 1);
    setCvInfo(newCv);
  };

  return (
    <>
      {cvInfo.experience.length <= 0 ? (
        <></>
      ) : (
        <Section
          sectionTitle={t("experience.title")}
          sectionId="experience-section"
          margin={margin}
          additionClass={additionClass}
        >
          <ul className={`${fontSize}`}>
            {cvInfo.experience.map((work, index) => {
              return (
                <li
                  className={`${margin} rounded-lg`}
                  key={`experience-${index}`}
                >
                  <div className="flex">
                    <a
                      href={work.company_link}
                      target="_blank"
                      className="w-[50%]"
                    >
                      <h3 className="text-lg font-semibold">
                        {work.company_name}
                      </h3>
                    </a>
                    <p className="w-[50%] text-end">
                      {work.start_date}-
                      {work.end_date ? work.end_date : t("end-date-fallback")}
                    </p>
                    <DeleteButton handleDelete={handleDelete} index={index} />
                  </div>
                  <p className="font-semibold">{work.role}</p>
                  <p>{work.summary}</p>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </>
  );
};

export default Experience;
