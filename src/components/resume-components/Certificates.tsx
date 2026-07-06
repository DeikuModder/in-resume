import Section from "../Section";
import DeleteButton from "../DeleteButton";
import useCVInfo from "@/hooks/useCVInfo";
import { useTranslation } from "react-i18next";
import { Orientation } from "@/src/type";
import EditableText from "@/components/editable/EditableText";
import AddButton from "@/components/editable/AddButton";
import { Certificates as CertType } from "@/src/type";

const Certificates = ({
  border,
  orientation,
  titleOrientation,
  margin,
  fontSize,
  additionClass,
}: {
  border?: boolean;
  orientation?: Orientation;
  titleOrientation?: Orientation;
  margin?: string;
  fontSize?: string;
  additionClass?: string;
}) => {
  const { cvInfo, setCvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  const updateCert = (index: number, field: keyof CertType, value: string) => {
    const newCerts = [...cvInfo.certificates];
    newCerts[index] = { ...newCerts[index], [field]: value };
    setCvInfo({ ...cvInfo, certificates: newCerts });
  };

  const handleDelete = (index: number) => {
    const newCerts = [...cvInfo.certificates];
    newCerts.splice(index, 1);
    setCvInfo({ ...cvInfo, certificates: newCerts });
  };

  const handleAdd = () => {
    setCvInfo({
      ...cvInfo,
      certificates: [
        ...cvInfo.certificates,
        { title: "", link: "", issuing_authority: "", date: "" },
      ],
    });
  };

  return (
    <Section
      sectionTitle={t("certificates.title")}
      sectionId="certificates-section"
      margin={margin}
      additionClass={`${additionClass ?? ""} ${cvInfo.certificates.length === 0 ? "print:hidden" : ""}`}
    >
      <ul className={`${fontSize}`}>
        {cvInfo.certificates.map((certificate, index) => (
          <li
            className={`${margin} ${border && "border border-neutral-500 p-2"} rounded-lg flex ${orientation}`}
            key={`certificate-${index}`}
          >
            <div className={`flex ${titleOrientation}`}>
              <EditableText
                tag="h3"
                value={certificate.title}
                onChange={(v) => updateCert(index, "title", v)}
                placeholder="Certificate title"
                className={`text-lg font-semibold ${titleOrientation === "flex-row" ? "w-[80%]" : ""}`}
              />
              <EditableText
                value={certificate.date}
                onChange={(v) => updateCert(index, "date", v)}
                placeholder="Date"
                className={
                  titleOrientation === "flex-row" ? "w-[20%] text-end" : ""
                }
              />
              <DeleteButton handleDelete={handleDelete} index={index} />
            </div>
            <EditableText
              value={certificate.issuing_authority}
              onChange={(v) => updateCert(index, "issuing_authority", v)}
              placeholder="Issuing authority"
            />
            <EditableText
              value={certificate.link}
              onChange={(v) => updateCert(index, "link", v)}
              placeholder="https://credential.url (optional)"
              className="text-xs text-neutral-400 hideOnPrint"
            />
          </li>
        ))}
      </ul>
      <AddButton onClick={handleAdd} label={t("certificates.add")} />
    </Section>
  );
};

export default Certificates;
