import { useState } from "react";
import useCVInfo from "../hooks/useCVInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import DesignOption from "./DesignOption";
import SaveInfoButton from "./SaveInfoButton";
import ColorPalette from "./ColorPalette";
import { getAllTemplates } from "@/templates/index";

const Menu = ({ onClose }: { onClose: () => void }) => {
  const { setTemplateId, templateId, accentColor, setAccentColor } = useCVInfo();
  const templates = getAllTemplates();

  return (
    <aside className="fixed top-0 left-0 h-dvh w-[300px] bg-neutral-900 p-4 z-30 flex flex-col">
      <button onClick={onClose}>
        <FontAwesomeIcon icon={faX} className="text-2xl font-bold" />
      </button>
      <ul className="py-4 list-none flex flex-col items-center gap-4 overflow-auto flex-1">
        {templates.map((tpl) => (
          <li
            onClick={() => setTemplateId(tpl.id)}
            key={tpl.id}
            className="w-[160px] cursor-pointer relative"
          >
            <DesignOption
              title={tpl.name}
              img={tpl.thumbnail}
              selected={templateId === tpl.id}
            />
            {tpl.premium && (
              <span className="absolute top-1 right-1 bg-yellow-500 text-black text-[10px] font-bold px-1 rounded">
                PRO
              </span>
            )}
          </li>
        ))}
      </ul>
      <ColorPalette accentColor={accentColor} onSelect={setAccentColor} />
      <div className="p-2">
        <SaveInfoButton />
      </div>
    </aside>
  );
};

const DesignsMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <Menu onClose={() => setOpen(false)} />
      ) : (
        <button onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faBars} className="text-2xl font-bold" />
        </button>
      )}
    </>
  );
};

export default DesignsMenu;
