import { useInfoData } from "@/Providers/useInfoData";

const useCVInfo = () => {
  const useCV = useInfoData();
  const {
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
  } = useCV;

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

export default useCVInfo;
