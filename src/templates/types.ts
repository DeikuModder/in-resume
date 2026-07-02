import { Orientation } from "@/src/type";

export type SectionId =
  | "hero"
  | "title"
  | "contact"
  | "aboutMe"
  | "experience"
  | "education"
  | "projects"
  | "skills"
  | "softSkills"
  | "languages"
  | "certificates";

export interface SectionConfig {
  orientation?: Orientation;
  titleOrientation?: Orientation;
  fontSize?: string;
  margin?: string;
  border?: boolean;
  additionClass?: string;
  // Title-specific
  extraStyle?: string;
  extraStyleTitle?: string;
  extraStyleSubTitle?: string;
  // Contact-specific
  title?: boolean;
  font?: string;
  textColor?: string;
}

export interface SectionEntry {
  id: SectionId;
  props: SectionConfig;
}

export interface TemplateStyles {
  pageWidth: string;
  font: string;
  headerBg: string;
  sectionTitleStyle: string;
  defaultAccent: string;
  spacing: string;
}

export interface TemplateConfig {
  id: string;
  name: string;
  thumbnail: string;
  premium: boolean;
  layout: "single-column" | "two-column";
  sidebarWidth?: string;
  sidebarBg?: string;
  sidebarTextColor?: string;
  sidebar?: SectionEntry[];
  main: SectionEntry[];
  styles: TemplateStyles;
}
