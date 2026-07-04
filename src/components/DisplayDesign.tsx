import useCVInfo from "../hooks/useCVInfo";
import { useEffect } from "react";
import cvEmptyInfo from "../utils/cvEmpty";
import TemplateRenderer from "./TemplateRenderer";

const DisplayDesign = () => {
  const {
    cvInfo,
    setCvInfo,
    templateId,
    sectionOrder,
    sidebarOrder,
    accentColor,
    setSectionOrder,
    setSidebarOrder,
  } = useCVInfo();

  useEffect(() => {
    const keys = Object.keys(cvEmptyInfo);
    const updatedCvInfo = { ...cvInfo };

    keys.forEach((key) => {
      if (!cvInfo[key]) {
        updatedCvInfo[key] = cvEmptyInfo[key];
      }
    });

    if (JSON.stringify(cvInfo) !== JSON.stringify(updatedCvInfo)) {
      setCvInfo(updatedCvInfo);
    }
  }, [cvInfo, setCvInfo]);

  return (
    <TemplateRenderer
      templateId={templateId}
      sectionOrder={sectionOrder}
      sidebarOrder={sidebarOrder}
      accentColor={accentColor}
      onReorderMain={setSectionOrder}
      onReorderSidebar={setSidebarOrder}
    />
  );
};

export default DisplayDesign;
