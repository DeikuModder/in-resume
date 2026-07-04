import { ResumeInfo } from "@/src/type";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getTemplate, getAllTemplates } from "@/templates/index";
import React, { useEffect } from "react";

export const InfoContext = React.createContext({} as ReturnType<typeof useCV>);

type useCVReturnType = {
  cvInfo: ResumeInfo;
  setCvInfo: (cvObj: ResumeInfo) => void;
  design: number;
  setDesign: (designNumber: number) => void;
  templateId: string;
  setTemplateId: (id: string) => void;
  sectionOrder: string[];
  setSectionOrder: (order: string[]) => void;
  sidebarOrder: string[];
  setSidebarOrder: (order: string[]) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
  slot: ResumeInfo;
  setSlot: React.Dispatch<React.SetStateAction<ResumeInfo>>;
  slotEnglish: ResumeInfo;
  setSlotEnglish: React.Dispatch<React.SetStateAction<ResumeInfo>>;
  secondSlot: ResumeInfo;
  setSecondSlot: React.Dispatch<React.SetStateAction<ResumeInfo>>;
  secondSlotEnglish: ResumeInfo;
  setSecondSlotEnglish: React.Dispatch<React.SetStateAction<ResumeInfo>>;
  thirdSlot: ResumeInfo;
  setThirdSlot: React.Dispatch<React.SetStateAction<ResumeInfo>>;
  thirdSlotEnglish: ResumeInfo;
  setThirdSlotEnglish: React.Dispatch<React.SetStateAction<ResumeInfo>>;
};

const useCV = (): useCVReturnType => {
  const cvEmptyInfo: ResumeInfo = {
    name: "",
    pictureUrl: "",
    role: "",
    address: "",
    email: "",
    phone: "",
    secondaryPhone: "",
    linkedinUrl: "",
    linkedinUser: "",
    gitHubUser: "",
    gitHubUrl: "",
    aboutMe: "",
    projects: [],
    education: [],
    experience: [],
    languages: [],
    skills: [],
    softSkills: [],
    certificates: [],
    slot: "main",
  };

  const [cvInfo, setCvInfo] = useLocalStorage("cvInfo", cvEmptyInfo);
  const [design, setDesign] = useLocalStorage("design", 0);

  const allTemplates = getAllTemplates();
  const defaultTemplateId = allTemplates[0].id;
  const [templateId, setTemplateIdRaw] = useLocalStorage("templateId", defaultTemplateId);
  const [sectionOrder, setSectionOrder] = useLocalStorage("sectionOrder", getTemplate(defaultTemplateId).main.map((s) => s.id));
  const [sidebarOrder, setSidebarOrder] = useLocalStorage("sidebarOrder", getTemplate(defaultTemplateId).sidebar?.map((s) => s.id) ?? []);
  const [accentColor, setAccentColor] = useLocalStorage("accentColor", getTemplate(defaultTemplateId).styles.defaultAccent);

  const setTemplateId = (id: string) => {
    const tpl = getTemplate(id);
    setTemplateIdRaw(id);
    setSectionOrder(tpl.main.map((s) => s.id));
    setSidebarOrder(tpl.sidebar?.map((s) => s.id) ?? []);
    setAccentColor(tpl.styles.defaultAccent);
  };

  // Sync sectionOrder/sidebarOrder when templateId changes (e.g. from localStorage)
  useEffect(() => {
    const tpl = getTemplate(templateId);
    const mainIds = tpl.main.map((s) => s.id);
    const sidebarIds = tpl.sidebar?.map((s) => s.id) ?? [];
    // Only reset if the stored order contains unknown ids for this template
    const mainValid = mainIds.every((id) => (sectionOrder as string[]).includes(id)) &&
      (sectionOrder as string[]).every((id) => (mainIds as string[]).includes(id));
    const sidebarValid = sidebarIds.every((id) => (sidebarOrder as string[]).includes(id)) &&
      (sidebarOrder as string[]).every((id) => (sidebarIds as string[]).includes(id));
    if (!mainValid) setSectionOrder(mainIds);
    if (!sidebarValid) setSidebarOrder(sidebarIds);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);
  const [slot1, setSlot1] = useLocalStorage("slot1", {});
  const [slot2, setSlot2] = useLocalStorage("slot2", {});
  const [slot3, setSlot3] = useLocalStorage("slot3", {});
  const [slot4, setSlot4] = useLocalStorage("slot4", {});
  const [slot5, setSlot5] = useLocalStorage("slot5", {});
  const [slot6, setSlot6] = useLocalStorage("slot6", {});

  const slot = slot1 as ResumeInfo;
  const setSlot = setSlot1 as React.Dispatch<React.SetStateAction<ResumeInfo>>;

  const slotEnglish = slot2 as ResumeInfo;
  const setSlotEnglish = setSlot2 as React.Dispatch<
    React.SetStateAction<ResumeInfo>
  >;

  const secondSlot = slot3 as ResumeInfo;
  const setSecondSlot = setSlot3 as React.Dispatch<
    React.SetStateAction<ResumeInfo>
  >;

  const secondSlotEnglish = slot4 as ResumeInfo;
  const setSecondSlotEnglish = setSlot4 as React.Dispatch<
    React.SetStateAction<ResumeInfo>
  >;

  const thirdSlot = slot5 as ResumeInfo;
  const setThirdSlot = setSlot5 as React.Dispatch<
    React.SetStateAction<ResumeInfo>
  >;

  const thirdSlotEnglish = slot6 as ResumeInfo;
  const setThirdSlotEnglish = setSlot6 as React.Dispatch<
    React.SetStateAction<ResumeInfo>
  >;

  return {
    cvInfo,
    setCvInfo,
    design,
    setDesign,
    templateId,
    setTemplateId,
    sectionOrder: sectionOrder as string[],
    setSectionOrder,
    sidebarOrder: sidebarOrder as string[],
    setSidebarOrder,
    accentColor: accentColor as string,
    setAccentColor,
    slot,
    setSlot,
    slotEnglish,
    setSlotEnglish,
    secondSlot,
    setSecondSlot,
    secondSlotEnglish,
    setSecondSlotEnglish,
    thirdSlot,
    setThirdSlot,
    thirdSlotEnglish,
    setThirdSlotEnglish,
  };
};

const CVInfoProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <InfoContext.Provider value={useCV()}>{children}</InfoContext.Provider>
  );
};

export default CVInfoProvider;
