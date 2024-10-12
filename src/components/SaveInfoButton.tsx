import { useTranslation } from "react-i18next";
import useCVInfo from "../hooks/useCVInfo";
import { ResumeInfo } from "../type";
import MODAL from "./MODAL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

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
  const [flag, setFlag] = useState(false);
  const { t } = useTranslation("global");

  useEffect(() => {
    if (slot.slot === cvInfo.slot) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [slot.slot, cvInfo.slot, flag]);

  return (
    <div className="flex items-center gap-2">
      <abbr title={t("saves.slot-abbr")}>
        <button
          className={`hideOnPrint h-fit w-fit border rounded-xl p-2 font-bold disabled:border-neutral-700 disabled:bg-neutral-300 disabled:text-neutral-700 ${
            flag
              ? "bg-emerald-500 text-emerald-900 border-emerald-900"
              : "bg-orange-500 text-orange-900 border-orange-900"
          }`}
          disabled={!slot.name}
          onClick={() => setCvInfo(slot)}
        >
          {flag
            ? t("saves.selected")
            : !slot.name
            ? `${t("saves.save-slot")} ${text}`
            : `${t("saves.select-slot")} ${text}`}
        </button>
      </abbr>

      <abbr title={t("saves.save-slot-abbr")}>
        <button
          className="hideOnPrint h-fit w-fit border border-neutral-700 rounded-xl p-2 bg-neutral-300 text-neutral-700 font-bold"
          disabled={!cvInfo.name}
          onClick={() => setSlot({ ...cvInfo, slot: text })}
        >
          <FontAwesomeIcon icon={faSave} />
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
        <Slot text={"1"} slot={slot} setSlot={setSlot} />
        <Slot text={"2"} slot={slotEnglish} setSlot={setSlotEnglish} />
        <Slot text={"3"} slot={secondSlot} setSlot={setSecondSlot} />
        <Slot
          text={"4"}
          slot={secondSlotEnglish}
          setSlot={setSecondSlotEnglish}
        />
        <Slot text={"5"} slot={thirdSlot} setSlot={setThirdSlot} />
        <Slot
          text={"6"}
          slot={thirdSlotEnglish}
          setSlot={setThirdSlotEnglish}
        />
      </div>
    </MODAL>
  );
};

export default SaveInfoButton;
