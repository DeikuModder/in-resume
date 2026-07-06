import { useInfoData } from "@/Providers/useInfoData";

const useCVInfo = () => {
  const useCV = useInfoData();
  const {
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
  } = useCV;

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

export default useCVInfo;
