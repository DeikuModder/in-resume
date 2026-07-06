import { ResumeInfo } from "@/src/type";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { getTemplate, getAllTemplates } from "@/templates/index";
import React, { useEffect, useRef } from "react";
import { useAuth } from "./useAuth";
import { API_BASE } from "../services/api";

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
  slots: Record<string, ResumeInfo>;
  setSlot: (key: string, info: ResumeInfo) => void;
};

const useCV = (): useCVReturnType => {
  const { token } = useAuth();

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

  const [cvInfo, setCvInfo] = useLocalStorage<ResumeInfo>(
    "cvInfo",
    cvEmptyInfo,
  );
  const [design, setDesign] = useLocalStorage<number>("design", 0);

  const allTemplates = getAllTemplates();
  const defaultTemplateId = allTemplates[0].id;
  const [templateId, setTemplateIdRaw] = useLocalStorage<string>(
    "templateId",
    defaultTemplateId,
  );
  const [sectionOrder, setSectionOrder] = useLocalStorage<string[]>(
    "sectionOrder",
    getTemplate(defaultTemplateId).main.map((s) => s.id),
  );
  const [sidebarOrder, setSidebarOrder] = useLocalStorage<string[]>(
    "sidebarOrder",
    getTemplate(defaultTemplateId).sidebar?.map((s) => s.id) ?? [],
  );
  const [accentColor, setAccentColor] = useLocalStorage<string>(
    "accentColor",
    getTemplate(defaultTemplateId).styles.defaultAccent,
  );

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
    const mainValid =
      mainIds.every((id) => (sectionOrder as string[]).includes(id)) &&
      sectionOrder.every((id) => (mainIds as string[]).includes(id));
    const sidebarValid =
      sidebarIds.every((id) => (sidebarOrder as string[]).includes(id)) &&
      sidebarOrder.every((id) => (sidebarIds as string[]).includes(id));
    if (!mainValid) setSectionOrder(mainIds);
    if (!sidebarValid) setSidebarOrder(sidebarIds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateId]);

  // â”€â”€â”€ Slots (single Record replaces slot1-slot6) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [slots, setSlotsRaw] = useLocalStorage<Record<string, ResumeInfo>>(
    "resumeSlots",
    {},
  );

  const setSlot = (key: string, info: ResumeInfo) => {
    setSlotsRaw({ ...slots, [key]: info });
  };

  // â”€â”€â”€ Autosave debounce (2 s) â€” syncs to backend when authenticated â”€â”€â”€â”€â”€â”€â”€â”€
  const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!token) return;
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(async () => {
      try {
        await fetch(`${API_BASE}/resumes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ slotName: "slot1", ...cvInfo }),
        });
      } catch {
        // silent â€” autosave is best-effort
      }
    }, 2000);

    return () => clearTimeout(debounceTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvInfo, token]);

  return {
    cvInfo,
    setCvInfo,
    design,
    setDesign,
    templateId,
    setTemplateId,
    sectionOrder,
    setSectionOrder,
    sidebarOrder,
    setSidebarOrder,
    accentColor,
    setAccentColor,
    slots,
    setSlot,
  };
};

const CVInfoProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <InfoContext.Provider value={useCV()}>{children}</InfoContext.Provider>
  );
};

export default CVInfoProvider;
