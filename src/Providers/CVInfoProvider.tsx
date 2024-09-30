import { ResumeInfo } from "@/src/type";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React from "react";

export const InfoContext = React.createContext({} as ReturnType<typeof useCV>);

type useCVReturnType = {
  cvInfo: ResumeInfo;
  setCvInfo: (cvObj: ResumeInfo) => void;
  design: number;
  setDesign: (designNumber: number) => void;
};

const useCV = (): useCVReturnType => {
  const cvEmptyInfo: ResumeInfo = {
    name: "",
    pictureUrl: "",
    role: "",
    address: "",
    email: "",
    phone: "",
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
  };

  const [cvInfo, setCvInfo] = useLocalStorage("cvInfo", cvEmptyInfo);
  const [design, setDesign] = useLocalStorage("design", 0);
  return {
    cvInfo,
    setCvInfo,
    design,
    setDesign,
  };
};

const CVInfoProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <InfoContext.Provider value={useCV()}>{children}</InfoContext.Provider>
  );
};

export default CVInfoProvider;
