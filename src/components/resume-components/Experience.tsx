import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import DeleteButton from "../DeleteButton";
import { useTranslation } from "react-i18next";

const Experience = () => {
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
        >
          <ul>
            {cvInfo.experience.map((work, index) => {
              return (
                <li
                  className="mb-8 border border-neutral-500 rounded-lg p-2"
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
                      {work.start_date}-{work.end_date ? work.end_date : "Now"}
                    </p>
                    <DeleteButton handleDelete={handleDelete} index={index} />
                  </div>
                  <p>{work.summary}</p>
                  <p>{work.role}</p>
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
