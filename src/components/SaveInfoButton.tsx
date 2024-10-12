import { useTranslation } from "react-i18next";
import useCVInfo from "../hooks/useCVInfo";
import { ResumeInfo } from "../type";
import MODAL from "./MODAL";

const Slot = ({
  slot,
  setSlot,
  text,
}: {
  slot: ResumeInfo;
  setSlot: React.Dispatch<React.SetStateAction<ResumeInfo>>;
  text: string;
}) => {
  const { setCvInfo, cvInfo } = useCVInfo();
  const { t } = useTranslation("global");

  return (
    <div className="flex items-center gap-2">
      <abbr title={t("saves.slot-abbr")}>
        <button
          className={`hideOnPrint h-fit w-fit border rounded-xl p-2 font-bold bg-emerald-500 text-emerald-900 border-emerald-900 disabled:border-neutral-700 disabled:bg-neutral-300 disabled:text-neutral-700`}
          disabled={!slot.name}
          onClick={() => setCvInfo(slot)}
        >
          {text}
        </button>
      </abbr>

      <abbr title={t("saves.save-slot-abbr")}>
        <button
          className="hideOnPrint h-fit w-fit border border-neutral-700 rounded-xl p-2 bg-neutral-300 text-neutral-700 font-bold"
          disabled={!cvInfo.name}
          onClick={() => setSlot(cvInfo)}
        >
          +
        </button>
      </abbr>
    </div>
  );
};

const SaveInfoButton = () => {
  const {
    slot,
    setSlot,
    slotEnglish,
    setSlotEnglish,
    secondSlot,
    setSecondSlot,
    secondSlotEnglish,
    setSecondSlotEnglish,
    thirdSlot,
    thirdSlotEnglish,
    setThirdSlot,
    setThirdSlotEnglish,
  } = useCVInfo();
  const { t } = useTranslation("global");

  return (
    <MODAL
      buttonContent={t("saves.title")}
      buttonStyle="bg-neutral-100 font-bold text-lg text-neutral-900 p-2 rounded-lg"
      width="w-[300px]"
      height="h-[400px]"
      title={t("saves.title")}
    >
      <div className="flex flex-col items-center justify-between p-2 h-full">
        <Slot text={t("saves.select-slot-1")} slot={slot} setSlot={setSlot} />
        <Slot
          text={t("saves.select-slot-2")}
          slot={slotEnglish}
          setSlot={setSlotEnglish}
        />
        <Slot
          text={t("saves.select-slot-3")}
          slot={secondSlot}
          setSlot={setSecondSlot}
        />
        <Slot
          text={t("saves.select-slot-4")}
          slot={secondSlotEnglish}
          setSlot={setSecondSlotEnglish}
        />
        <Slot
          text={t("saves.select-slot-5")}
          slot={thirdSlot}
          setSlot={setThirdSlot}
        />
        <Slot
          text={t("saves.select-slot-6")}
          slot={thirdSlotEnglish}
          setSlot={setThirdSlotEnglish}
        />
      </div>
    </MODAL>
  );
};

export default SaveInfoButton;
