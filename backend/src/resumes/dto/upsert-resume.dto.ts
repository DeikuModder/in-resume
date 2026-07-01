import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  ValidateNested,
  IsIn,
  Min,
  Max,
  ArrayMaxSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class EducationDto {
  @IsString() @IsOptional() institution_name?: string;
  @IsString() @IsOptional() title?: string;
  @IsString() @IsOptional() start_date?: string;
  @IsString() @IsOptional() end_date?: string;
}

export class JobDto {
  @IsString() @IsOptional() company_name?: string;
  @IsString() @IsOptional() company_link?: string;
  @IsString() @IsOptional() summary?: string;
  @IsString() @IsOptional() role?: string;
  @IsString() @IsOptional() start_date?: string;
  @IsString() @IsOptional() end_date?: string;
}

export class ProjectDto {
  @IsString() @IsOptional() project_name?: string;
  @IsString() @IsOptional() project_link?: string;
  @IsString() @IsOptional() description?: string;
  @IsString() @IsOptional() tags?: string;
}

export class LanguageDto {
  @IsString() @IsOptional() languageName?: string;
  @IsString() @IsOptional() level?: string;
}

export class CertificateDto {
  @IsString() @IsOptional() title?: string;
  @IsString() @IsOptional() link?: string;
  @IsString() @IsOptional() issuing_authority?: string;
  @IsString() @IsOptional() date?: string;
}

export class SoftSkillDto {
  @IsString() @IsOptional() name?: string;
  @IsString() @IsOptional() description?: string;
}

const VALID_SLOTS = ['slot1', 'slot2', 'slot3', 'slot4', 'slot5', 'slot6'];

export class UpsertResumeDto {
  @IsIn(VALID_SLOTS)
  slotName: string;

  @IsString() @IsOptional() name?: string;
  @IsString() @IsOptional() pictureUrl?: string;
  @IsString() @IsOptional() role?: string;
  @IsString() @IsOptional() address?: string;
  @IsString() @IsOptional() email?: string;
  @IsString() @IsOptional() phone?: string;
  @IsString() @IsOptional() secondaryPhone?: string;
  @IsString() @IsOptional() gitHubUser?: string;
  @IsString() @IsOptional() gitHubUrl?: string;
  @IsString() @IsOptional() linkedinUser?: string;
  @IsString() @IsOptional() linkedinUrl?: string;
  @IsString() @IsOptional() aboutMe?: string;

  @IsArray() @IsOptional() @ValidateNested({ each: true }) @Type(() => ProjectDto)
  projects?: ProjectDto[];

  @IsArray() @IsOptional() @ValidateNested({ each: true }) @Type(() => EducationDto)
  education?: EducationDto[];

  @IsArray() @IsOptional() @ValidateNested({ each: true }) @Type(() => JobDto)
  experience?: JobDto[];

  @IsArray() @IsOptional() @ValidateNested({ each: true }) @Type(() => LanguageDto)
  languages?: LanguageDto[];

  @IsArray() @IsOptional() @ArrayMaxSize(60) @IsString({ each: true })
  skills?: string[];

  @IsArray() @IsOptional() @ValidateNested({ each: true }) @Type(() => SoftSkillDto)
  softSkills?: SoftSkillDto[];

  @IsArray() @IsOptional() @ValidateNested({ each: true }) @Type(() => CertificateDto)
  certificates?: CertificateDto[];

  @IsNumber() @IsOptional() @Min(0) @Max(2)
  designIndex?: number;
}
