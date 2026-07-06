import { z } from "zod";

export const EducationSchema = z.object({
  institution_name: z.string(),
  title: z.string(),
  start_date: z.string(),
  end_date: z.string(),
});

export const JobSchema = z.object({
  company_name: z.string(),
  company_link: z.string(),
  summary: z.string(),
  role: z.string(),
  start_date: z.string(),
  end_date: z.string(),
});

export const ProjectSchema = z.object({
  project_name: z.string(),
  project_link: z.string(),
  description: z.string(),
  tags: z.string(),
});

export const LanguageSchema = z.object({
  languageName: z.string(),
  level: z.string(),
});

export const CertificateSchema = z.object({
  title: z.string(),
  link: z.string(),
  issuing_authority: z.string(),
  date: z.string(),
});

export const SoftSkillSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const ResumeInfoSchema = z.object({
  name: z.string(),
  pictureUrl: z.string().optional(),
  role: z.string(),
  address: z.string(),
  email: z.string(),
  phone: z.string(),
  secondaryPhone: z.string().optional(),
  gitHubUser: z.string().optional(),
  linkedinUser: z.string().optional(),
  linkedinUrl: z.string().optional(),
  gitHubUrl: z.string().optional(),
  aboutMe: z.string(),
  projects: z.array(ProjectSchema),
  education: z.array(EducationSchema),
  experience: z.array(JobSchema),
  languages: z.array(LanguageSchema),
  skills: z.array(z.string()),
  softSkills: z.array(SoftSkillSchema),
  certificates: z.array(CertificateSchema),
  slot: z.string(),
  hiddenSections: z.array(z.string()).optional(),
});

export type ResumeInfoInput = z.infer<typeof ResumeInfoSchema>;
