import { ResumeInfo } from "@/src/type";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React from "react";

export const InfoContext = React.createContext({} as ReturnType<typeof useCV>);

type useCVReturnType = {
  cvInfo: ResumeInfo;
  setCvInfo: (cvObj: ResumeInfo) => void;
  design: number;
  setDesign: (designNumber: number) => void;
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
  };

  const [cvInfo, setCvInfo] = useLocalStorage("cvInfo", cvEmptyInfo);
  const [design, setDesign] = useLocalStorage("design", 0);
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
