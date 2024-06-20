import Section from "../Section";
import DeleteButton from "../DeleteButton";
import useCVInfo from "@/hooks/useCVInfo";
import { useTranslation } from "react-i18next";
import { Orientation } from "@/src/type";

const Certificates = ({
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
    newCv.certificates.splice(index, 1);
    setCvInfo(newCv);
  };

  return (
    <>
      {cvInfo.certificates.length <= 0 ? (
        <></>
      ) : (
        <Section
          sectionTitle={t("certificates.title")}
          sectionId="certificates-section"
        >
          <ul>
            {cvInfo.certificates.map((certificate, index) => {
              return (
                <li
                  className={`mb-8 ${
                    border && "border border-neutral-500 p-2"
                  } rounded-lg  flex ${orientation}`}
                  key={`education-${index}`}
                >
                  <div className={`flex ${titleOrientation}`}>
                    <a
                      href={certificate.link}
                      target="_blank"
                      className={`${
                        titleOrientation === "flex-row" && "w-[80%]"
                      }`}
                    >
                      <h3 className="text-lg font-semibold">
                        {certificate.title}
                      </h3>
                    </a>
                    <p
                      className={`${
                        titleOrientation === "flex-row" && "w-[20%] text-end"
                      }`}
                    >
                      {certificate.date}
                    </p>
                    <DeleteButton handleDelete={handleDelete} index={index} />
                  </div>
                  <p>{certificate.issuing_authority}</p>
                </li>
              );
            })}
          </ul>
        </Section>
      )}
    </>
  );
};

export default Certificates;
