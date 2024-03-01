import { ResumeInfo } from "@/src/type";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React from "react";

export const InfoContext = React.createContext({} as ReturnType<typeof useCV>);

type useCVReturnType = {
  cvInfo: ResumeInfo;
  setCvInfo: (cvObj: ResumeInfo) => void;
  amountOfExperienceFields: string;
  setAmounOfExperienceFields: () => void;
  amountOfEducationFields: string;
  setAmountOfEducationFields: () => void;
  amountOfProjectFields: string;
  setAmountOfProjectFields: () => void;
  amountOfLanguages: string;
  setAmountOfLanguages: () => void;
};

const useCV = (): useCVReturnType => {
  const cvEmptyInfo: ResumeInfo = {
    name: "",
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
  };

  const [cvInfo, setCvInfo] = useLocalStorage("cvInfo", cvEmptyInfo);
  const [amountOfExperienceFields, setAmounOfExperienceFields] =
    useLocalStorage("amountOfExperienceFields", "0");
  const [amountOfEducationFields, setAmountOfEducationFields] = useLocalStorage(
    "amountOfEducationFields",
    "0"
  );
  const [amountOfProjectFields, setAmountOfProjectFields] = useLocalStorage(
    "amountOfProjectFields",
    "0"
  );
  const [amountOfLanguages, setAmountOfLanguages] = useLocalStorage(
    "amountOfLanguages",
    "0"
  );

  return {
    cvInfo,
    setCvInfo,
    amountOfExperienceFields,
    setAmounOfExperienceFields,
    amountOfEducationFields,
    setAmountOfEducationFields,
    amountOfProjectFields,
    setAmountOfProjectFields,
    amountOfLanguages,
    setAmountOfLanguages,
  };
};

const CVInfoProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <InfoContext.Provider value={useCV()}>{children}</InfoContext.Provider>
  );
};

export default CVInfoProvider;
