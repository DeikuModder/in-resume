import useCVInfo from "../hooks/useCVInfo";
import BasicDesign from "./resume-designs/BasicDesign";
import AltDesign from "./resume-designs/AltDesign";
import { useEffect } from "react";
import cvEmptyInfo from "../utils/cvEmpty";
import BasicDesign2 from "./resume-designs/BasicDesing2";

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

  const designsArr = [BasicDesign, AltDesign, BasicDesign2];

  return <>{designsArr[design]()}</>;
};

export default DisplayDesign;
