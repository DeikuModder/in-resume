import Section from "../Section";
import DeleteButton from "../DeleteButton";
import useCVInfo from "@/hooks/useCVInfo";

const Certificates = () => {
  const { cvInfo, setCvInfo } = useCVInfo();

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
        <Section sectionTitle="Certificates" sectionId="certificates-section">
          <ul>
            {cvInfo.certificates.map((certificate, index) => {
              return (
                <li
                  className="mb-8 border border-neutral-500 rounded-lg p-2"
                  key={`education-${index}`}
                >
                  <div className="flex">
                    <h3 className="text-lg font-semibold w-[50%]">
                      {certificate.title}
                    </h3>
                    <p className="w-[50%] text-end">
                      {certificate.start_date}-{certificate.end_date}
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
