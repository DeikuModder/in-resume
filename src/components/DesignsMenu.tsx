import { useState } from "react";
import useCVInfo from "../hooks/useCVInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import Design1 from "@/assets/design1.jpg";
import Design2 from "@/assets/design2.jpg";

const Menu = ({ onClose }: { onClose: () => void }) => {
  const { setDesign } = useCVInfo();
  const images = [Design1, Design2];

  return (
    <aside className="fixed top-0 left-0 h-dvh w-[300px] bg-neutral-900 p-4 z-30">
      <button onClick={onClose}>
        <FontAwesomeIcon icon={faX} className="text-2xl font-bold" />
      </button>
      <ul className="py-4 list-none flex flex-col items-center gap-4">
        {images.map((img, index) => {
          return (
            <li
              onClick={() => setDesign(index)}
              key={`design-${index}`}
              className="w-[160px] cursor-pointer"
            >
              <img src={img} alt="desing-preview" className="w-full" />
            </li>
          );
        })}
      </ul>
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
