import { useState } from "react";
import Html from "./skills/Html";
import Css from "./skills/Css";
import JavaScript from "./skills/JavaScript";
import React from "./skills/React";
import TypeScript from "./skills/TypeScript";
import Electron from "./skills/Electron";
import Git from "./skills/Git";
import GitHub from "./skills/GitHub";
import TailwindCss from "./skills/TailwindCss";
import Node from "./skills/Node";
import MySql from "./skills/MySql";
import PostgressSql from "./skills/PostgressSql";
import MongoDB from "./skills/MongoDB";
import Svelte from "./skills/Svelte";
import Vue from "./skills/Vue";
import Angular from "./skills/Angular";
import Python from "./skills/Python";
import Java from "./skills/Java";
import Astro from "./skills/Astro";
import AfterEffects from "./skills/AfterEffects";
import Figma from "./skills/Figma";
import Illustrator from "./skills/Illustrator";
import InDesign from "./skills/InDesign";
import Lightroom from "./skills/Lightroom";
import Photoshop from "./skills/Photoshop";
import Premiere from "./skills/Premiere";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import useCVInfo from "@/hooks/useCVInfo";

const SkillsArr = [
  Html,
  Css,
  JavaScript,
  TypeScript,
  TailwindCss,
  React,
  Angular,
  Vue,
  Svelte,
  Astro,
  Node,
  Electron,
  Git,
  GitHub,
  MySql,
  PostgressSql,
  MongoDB,
  Python,
  Java,
  AfterEffects,
  Figma,
  Illustrator,
  InDesign,
  Lightroom,
  Photoshop,
  Premiere,
];

const Menu = ({ onClose }: { onClose: () => void }) => {
  const { cvInfo, setCvInfo } = useCVInfo();

  const handleAdd = (name: string) => {
    setCvInfo({ ...cvInfo, skills: [...cvInfo.skills, name] });
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="w-[400px] h-[500px] bg-neutral-100 rounded-lg shadow-lg shadow-neutral-900">
        <div className="p-2">
          <button onClick={onClose}>X</button>
        </div>

        <div className="overflow-auto h-[80%] p-8 flex flex-col gap-2">
          {SkillsArr.map((skill) => {
            return (
              !cvInfo.skills.includes(skill.name) && (
                <div className="flex items-center gap-2" key={skill.name}>
                  {skill()}{" "}
                  <button onClick={() => handleAdd(skill.name)}>
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
