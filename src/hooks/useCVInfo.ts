import { useInfoData } from "@/Providers/useInfoData";

const useCVInfo = () => {
  const useCV = useInfoData();
  const {
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
  } = useCV;

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

export default useCVInfo;
