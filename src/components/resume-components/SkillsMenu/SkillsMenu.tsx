import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useCVInfo from "@/hooks/useCVInfo";
import SkillsObj from "../skills/index";
import "./scrollbar.css";

const keysToStrings = Object.keys(SkillsObj);

const Menu = ({ onClose }: { onClose: () => void }) => {
  const { cvInfo, setCvInfo } = useCVInfo();
  const [skillSearch, setSkillSearch] = useState("");

  const filteredArr = keysToStrings.filter((skillName) =>
    skillName.toLocaleLowerCase().includes(skillSearch.toLocaleLowerCase())
  );

  const handleAdd = (name: string) => {
    setCvInfo({ ...cvInfo, skills: [...cvInfo.skills, name] });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="hideOnPrint w-[310px] h-[400px] md:w-[400px] md:h-[500px] bg-neutral-100 rounded-lg shadow-lg shadow-neutral-900">
        <div className="p-2">
          <button onClick={onClose} className="font-bold text-2xl">
            X
          </button>
        </div>

        <div className="skillsMenu overflow-auto h-[80%] p-8 flex flex-col gap-2">
          <input
            className="bg-transparent border-b-2 border-black outline-none text-xl"
            placeholder="Search skill here"
            value={skillSearch}
            onChange={(e) => setSkillSearch(e.target.value)}
          />
          {filteredArr.map((skillName, index) => {
            return (
              !cvInfo.skills.includes(filteredArr[index]) && (
                <div
                  className="flex items-center gap-2"
                  key={filteredArr[index]}
                >
                  {SkillsObj[skillName]()}{" "}
                  <button onClick={() => handleAdd(filteredArr[index])}>
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

const SkillsMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      {openMenu ? (
        <Menu onClose={() => setOpenMenu(false)} />
      ) : (
        <button
          onClick={() => setOpenMenu(true)}
          className="hideOnPrint h-fit w-fit border border-neutral-700 rounded-xl p-2 bg-neutral-300 text-neutral-700 font-bold"
        >
          Add skill +
        </button>
      )}
    </>
  );
};

export default SkillsMenu;
