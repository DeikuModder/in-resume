import { ResumeInfo } from "@/src/type";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React from "react";

export const InfoContext = React.createContext({} as ReturnType<typeof useCV>);

type useCVReturnType = {
  cvInfo: ResumeInfo;
  setCvInfo: (cvObj: ResumeInfo) => void;
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
    gitHubUrl: "",
    aboutMe: "",
    projects: [],
    education: [],
    experience: [],
    languages: [],
    skills: [],
    certificates: [],
  };

  const [cvInfo, setCvInfo] = useLocalStorage("cvInfo", cvEmptyInfo);
  return {
    cvInfo,
    setCvInfo,
  };
};

const CVInfoProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <InfoContext.Provider value={useCV()}>{children}</InfoContext.Provider>
  );
};

export default CVInfoProvider;
