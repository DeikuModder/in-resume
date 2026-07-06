import { useRef, useState } from "react";
import {
  faCamera,
  faLayerGroup,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCVInfo from "@/hooks/useCVInfo";
import PrintButton from "./PrintButton";
import { useTranslation } from "react-i18next";

const ALL_SECTIONS = [
  { id: "about-me-section", labelKey: "about-me.title" },
  { id: "experience-section", labelKey: "experience.title" },
  { id: "education-section", labelKey: "education.title" },
  { id: "projects-section", labelKey: "projects.title" },
  { id: "certificates-section", labelKey: "certificates.title" },
  { id: "Languages-section", labelKey: "languages.title" },
  { id: "soft-skills-section", labelKey: "soft-skills.title" },
  { id: "skills-section", labelKey: "skills.title" },
] as const;

const Toolbar = () => {
  const { cvInfo, setCvInfo, showSection } = useCVInfo();
  const { t } = useTranslation("global");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [sectionsOpen, setSectionsOpen] = useState(false);

  const hiddenSections = cvInfo.hiddenSections ?? [];
  const hiddenList = ALL_SECTIONS.filter((s) => hiddenSections.includes(s.id));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCvInfo({ ...cvInfo, pictureUrl: url });
  };

  return (
    <div className="hideOnPrint fixed bottom-6 right-6 flex items-end gap-2 z-50">
      {/* Hidden sections restore panel */}
      {sectionsOpen && (
        <div className="mb-1 bg-white border border-neutral-200 rounded-xl shadow-xl p-3 min-w-[200px]">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">
            Hidden sections
          </p>
          {hiddenList.length === 0 ? (
            <p className="text-sm text-neutral-400 italic">
              All sections visible
            </p>
          ) : (
            <ul className="flex flex-col gap-1">
              {hiddenList.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => showSection(s.id)}
                    className="flex items-center gap-2 w-full text-left text-sm px-2 py-1 rounded-lg hover:bg-neutral-100 transition-colors text-neutral-700"
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-neutral-400"
                    />
                    {t(s.labelKey)}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="flex items-center gap-2">
        {/* Sections toggle */}
        <button
          onClick={() => setSectionsOpen((o) => !o)}
          className={`relative bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-full shadow-lg transition-colors ${sectionsOpen ? "ring-2 ring-white" : ""}`}
          title="Sections"
        >
          <FontAwesomeIcon icon={faLayerGroup} />
          {hiddenList.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {hiddenList.length}
            </span>
          )}
        </button>

        {/* Photo upload */}
        <label
          className="cursor-pointer bg-neutral-800 hover:bg-neutral-700 text-white p-3 rounded-full shadow-lg transition-colors"
          title="Upload photo"
        >
          <FontAwesomeIcon icon={faCamera} />
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        <PrintButton />
      </div>
    </div>
  );
};

export default Toolbar;
