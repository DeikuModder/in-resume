import useCVInfo from "@/hooks/useCVInfo";
import Section from "../Section";
import SkillsMenu from "./SkillsMenu";
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
import DeleteButton from "../DeleteButton";

const SKILLS = {
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
  Git,
  GitHub,
  Node,
  Electron,
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
};

const Skills = () => {
  const { cvInfo, setCvInfo } = useCVInfo();

  const handleRemoveSkill = (index: number) => {
    const newCv = { ...cvInfo };
    newCv.skills.splice(index, 1);
    setCvInfo(newCv);
  };

  return (
    <Section
      sectionTitle="Skills"
      sectionId="skills-section"
      additionClass={`${cvInfo.skills.length <= 0 && "hideOnPrint"}`}
    >
      <ul className="inline-flex flex-wrap gap-4 list-none">
        {cvInfo.skills.map((name, index) => {
          const Icon = SKILLS[name];

          return (
            <div>
              <li key={`skills-${name}`}>{Icon && <Icon />}</li>
              <DeleteButton handleDelete={handleRemoveSkill} index={index} />
            </div>
          );
        })}
        <SkillsMenu />
      </ul>
    </Section>
  );
};

export default Skills;
