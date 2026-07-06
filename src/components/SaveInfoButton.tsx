import { useTranslation } from "react-i18next";
import useCVInfo from "../hooks/useCVInfo";
import { ResumeInfo } from "../type";
import MODAL from "./MODAL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const SLOT_KEYS = ["1", "2", "3", "4", "5", "6"];

const Slot = ({
  slotKey,
  slot,
  onSave,
}: {
  slotKey: string;
  slot: ResumeInfo | undefined;
  onSave: () => void;
}) => {
  const { setCvInfo, cvInfo } = useCVInfo();
  const [flag, setFlag] = useState(false);
  const { t } = useTranslation("global");

  useEffect(() => {
    setFlag(!!slot && slot.slot === cvInfo.slot);
  }, [slot, cvInfo.slot]);

  return (
    <div className="flex items-center gap-2">
      <abbr title={t("saves.slot-abbr")}>
        <button
          className={`hideOnPrint h-fit w-fit border rounded-xl p-2 font-bold disabled:border-neutral-700 disabled:bg-neutral-300 disabled:text-neutral-700 ${
            flag
              ? "bg-emerald-500 text-emerald-900 border-emerald-900"
              : "bg-orange-500 text-orange-900 border-orange-900"
          }`}
          disabled={!slot?.name}
          onClick={() => slot && setCvInfo(slot)}
        >
          {flag
            ? t("saves.selected")
            : !slot?.name
              ? `${t("saves.save-slot")} ${slotKey}`
              : `${t("saves.select-slot")} ${slotKey}`}
        </button>
      </abbr>

      <abbr title={t("saves.save-slot-abbr")}>
        <button
          className="hideOnPrint h-fit w-fit border border-neutral-700 rounded-xl p-2 bg-neutral-300 text-neutral-700 font-bold"
          disabled={!cvInfo.name}
          onClick={onSave}
        >
          <FontAwesomeIcon icon={faSave} />
        </button>
      </abbr>
    </div>
  );
};

const SaveInfoButton = () => {
  const { slots, setSlot, cvInfo } = useCVInfo();
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
        {SLOT_KEYS.map((key) => (
          <Slot
            key={key}
            slotKey={key}
            slot={slots[key]}
            onSave={() => setSlot(key, { ...cvInfo, slot: key })}
          />
        ))}
      </div>
    </MODAL>
  );
};

export default SaveInfoButton;
