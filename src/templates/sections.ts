import AboutMe from "@/components/resume-components/AboutMe";
import Certificates from "@/components/resume-components/Certificates";
import Contact from "@/components/resume-components/Contact";
import Education from "@/components/resume-components/Education";
import Experience from "@/components/resume-components/Experience";
import Hero from "@/components/resume-components/Hero";
import Language from "@/components/resume-components/Language";
import Projects from "@/components/resume-components/Projects";
import Skills from "@/components/resume-components/Skills";
import SoftSkills from "@/components/resume-components/SoftSkills";
import Title from "@/components/resume-components/Title";
import { SectionConfig, SectionId } from "./types";
import React from "react";

type SectionComponent = React.ComponentType<SectionConfig>;

export const sectionComponents: Record<SectionId, SectionComponent> = {
  hero: Hero as SectionComponent,
  title: Title as SectionComponent,
  contact: Contact as SectionComponent,
  aboutMe: AboutMe as SectionComponent,
  experience: Experience as SectionComponent,
  education: Education as SectionComponent,
  projects: Projects as SectionComponent,
  skills: Skills as SectionComponent,
  softSkills: SoftSkills as SectionComponent,
  languages: Language as SectionComponent,
  certificates: Certificates as SectionComponent,
};
