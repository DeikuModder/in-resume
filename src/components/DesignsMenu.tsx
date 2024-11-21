import { useState } from "react";
import useCVInfo from "../hooks/useCVInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import CVDesigns from "../utils/cvDesign";
import DesignOption from "./DesignOption";
import SaveInfoButton from "./SaveInfoButton";

const Menu = ({ onClose }: { onClose: () => void }) => {
  const { setDesign } = useCVInfo();

  return (
    <aside className="fixed top-0 left-0 h-dvh w-[300px] bg-neutral-900 p-4 z-30">
      <button onClick={onClose}>
        <FontAwesomeIcon icon={faX} className="text-2xl font-bold" />
      </button>
      <ul className="py-4 list-none flex flex-col items-center gap-4 overflow-auto max-h-[525px]">
        {Object.keys(CVDesigns).map((title, index) => {
          return (
            <li
              onClick={() => setDesign(index)}
              key={`design-${index}`}
              className="w-[160px] cursor-pointer"
            >
              <DesignOption title={title} img={CVDesigns[title]} />
            </li>
          );
        })}
      </ul>
      <div className="fixed bottom-0 p-2">
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
