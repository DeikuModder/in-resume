import { useInfoData } from "@/Providers/useInfoData";

const useCVInfo = () => {
  const useCV = useInfoData();
  const { cvInfo, setCvInfo } = useCV;

  return {
    cvInfo,
    setCvInfo,
  };
};

export default useCVInfo;
