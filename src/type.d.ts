export interface Education {
  institution_name: string;
  title: string;
  start_date: string;
  end_date: string;
}

export interface Jobs {
  company_name: string;
  company_link: string;
  summary: string;
  role: string;
  start_date: string;
  end_date: string;
}

export interface Projects {
  project_name: string;
  project_link: string;
  description: string;
  tags: string;
}

export interface Languages {
  languageName: string;
  level: string;
}

export interface Certificates {
  title: string;
  link: string;
  issuing_authority: string;
  date: string;
}

export interface ResumeInfo {
  name: string;
  pictureUrl?: string;
  role: string;
  address: string;
  email: string;
  phone: string;
  linkedinUrl?: string;
  gitHubUrl?: string;
  aboutMe: string;
  projects: Projects[];
  education: Education[];
  experience: Jobs[];
  languages: Languages[];
  skills: string[];
  certificates: Certificates[];
}

export type Orientation =
  | "flex-col"
  | "flex-row"
  | "flex-row-reverse"
  | "flex-col-reverse";
