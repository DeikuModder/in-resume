import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ResumeDocument = HydratedDocument<Resume>;

@Schema({ _id: false })
class Education {
  @Prop() institution_name: string;
  @Prop() title: string;
  @Prop() start_date: string;
  @Prop() end_date: string;
}

@Schema({ _id: false })
class Job {
  @Prop() company_name: string;
  @Prop() company_link: string;
  @Prop() summary: string;
  @Prop() role: string;
  @Prop() start_date: string;
  @Prop() end_date: string;
}

@Schema({ _id: false })
class Project {
  @Prop() project_name: string;
  @Prop() project_link: string;
  @Prop() description: string;
  @Prop() tags: string;
}

@Schema({ _id: false })
class Language {
  @Prop() languageName: string;
  @Prop() level: string;
}

@Schema({ _id: false })
class Certificate {
  @Prop() title: string;
  @Prop() link: string;
  @Prop() issuing_authority: string;
  @Prop() date: string;
}

@Schema({ _id: false })
class SoftSkill {
  @Prop() name: string;
  @Prop() description: string;
}

@Schema({ timestamps: true })
export class Resume {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true, trim: true })
  slotName: string;

  @Prop({ default: '' }) name: string;
  @Prop({ default: '' }) pictureUrl: string;
  @Prop({ default: '' }) role: string;
  @Prop({ default: '' }) address: string;
  @Prop({ default: '' }) email: string;
  @Prop({ default: '' }) phone: string;
  @Prop({ default: '' }) secondaryPhone: string;
  @Prop({ default: '' }) gitHubUser: string;
  @Prop({ default: '' }) gitHubUrl: string;
  @Prop({ default: '' }) linkedinUser: string;
  @Prop({ default: '' }) linkedinUrl: string;
  @Prop({ default: '' }) aboutMe: string;

  @Prop({ type: [{ type: Object }], default: [] }) projects: Project[];
  @Prop({ type: [{ type: Object }], default: [] }) education: Education[];
  @Prop({ type: [{ type: Object }], default: [] }) experience: Job[];
  @Prop({ type: [{ type: Object }], default: [] }) languages: Language[];
  @Prop({ type: [String], default: [] }) skills: string[];
  @Prop({ type: [{ type: Object }], default: [] }) softSkills: SoftSkill[];
  @Prop({ type: [{ type: Object }], default: [] }) certificates: Certificate[];

  @Prop({ default: 0, min: 0, max: 2 }) designIndex: number;

  @Prop({ default: '' }) templateId: string;
  @Prop({ default: '' }) accentColor: string;
  @Prop({ type: [String], default: [] }) sectionOrder: string[];
  @Prop({ type: [String], default: [] }) sidebarOrder: string[];
  @Prop({ type: [String], default: [] }) hiddenSections: string[];

  @Prop({ default: false }) isPublic: boolean;
  @Prop({ default: false }) isPrimary: boolean;
  @Prop({ trim: true, lowercase: true, sparse: true }) publicSlug?: string;
}

export const ResumeSchema = SchemaFactory.createForClass(Resume);

ResumeSchema.index({ userId: 1, slotName: 1 }, { unique: true });
ResumeSchema.index({ userId: 1, publicSlug: 1 }, { unique: true, sparse: true });
