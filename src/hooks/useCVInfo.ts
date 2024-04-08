import { useInfoData } from "@/Providers/useInfoData";

const useCVInfo = () => {
  const useCV = useInfoData();
  const { cvInfo, setCvInfo, design, setDesign } = useCV;

  return {
    cvInfo,
    setCvInfo,
    design,
    setDesign,
  };
};

export default useCVInfo;
