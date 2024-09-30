import useCVInfo from "../hooks/useCVInfo";
import BasicDesign from "./resume-designs/BasicDesign";
import AltDesign from "./resume-designs/AltDesign";
import { useEffect } from "react";
import { ResumeInfo } from "../type";

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

const DisplayDesign = () => {
  const { design, cvInfo, setCvInfo } = useCVInfo();

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

  const designsArr = [BasicDesign, AltDesign];

  return <>{designsArr[design]()}</>;
};

export default DisplayDesign;
